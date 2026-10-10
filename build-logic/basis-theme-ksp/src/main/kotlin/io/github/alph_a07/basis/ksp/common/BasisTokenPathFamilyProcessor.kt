package io.github.alph_a07.basis.ksp.common

import com.google.devtools.ksp.processing.CodeGenerator
import com.google.devtools.ksp.processing.Dependencies
import com.google.devtools.ksp.processing.KSPLogger
import com.google.devtools.ksp.processing.Resolver
import com.google.devtools.ksp.processing.SymbolProcessor
import com.google.devtools.ksp.symbol.KSAnnotated
import com.google.devtools.ksp.symbol.KSAnnotation
import com.google.devtools.ksp.symbol.KSClassDeclaration
import com.google.devtools.ksp.symbol.KSPropertyDeclaration
import io.github.alph_a07.basis.ksp.family.FamilyConfig
import io.github.alph_a07.basis.ksp.family.FamilyEmitter
import io.github.alph_a07.basis.ksp.family.OUTPUT_PACKAGE
import io.github.alph_a07.basis.ksp.family.TokenFamilyWalker
import io.github.alph_a07.basis.ksp.family.WalkFailure
import io.github.alph_a07.basis.ksp.knobs.KnobEntriesEmitter
import io.github.alph_a07.basis.ksp.knobs.KnobEntriesWalker
import io.github.alph_a07.basis.ksp.knobs.KnobWalkResult

/**
 * Generates one typed path identifier enum per `@BasisTokenPathFamily` family: stable dotted
 * paths, enum entries, and the `resolveIn` mapping, all derived from the token data classes.
 */
internal class BasisTokenPathFamilyProcessor(
    private val codeGenerator: CodeGenerator,
    private val logger: KSPLogger,
) : SymbolProcessor {

    private val processed = mutableSetOf<String>()

    override fun process(resolver: Resolver): List<KSAnnotated> {
        resolver.getSymbolsWithAnnotation(FAMILY_ANNOTATION).forEach { symbol ->
            val annotation = symbol.familyAnnotation()

            if (annotation == null) {
                logger.error("Symbol does not resolve @BasisTokenPathFamily.", symbol)
            } else {
                when (symbol) {
                    is KSClassDeclaration -> generate(symbol, annotation, symbol)
                    is KSPropertyDeclaration -> generateFromProperty(symbol, annotation)
                    else -> logger.error(
                        "@BasisTokenPathFamily must annotate a class or a property.",
                        symbol,
                    )
                }
            }
        }

        resolver.getSymbolsWithAnnotation(KNOB_ANNOTATION).forEach { symbol ->
            val receiver = symbol as? KSClassDeclaration

            if (receiver == null) {
                logger.error("@BasisKnobEntries must annotate a class.", symbol)
            } else {
                generateKnobEntries(receiver)
            }
        }
        // Every input lives in module source and nothing depends on generated output, so no
        // symbol needs deferral to a later round.
        return emptyList()
    }

    private fun generateFromProperty(symbol: KSPropertyDeclaration, annotation: KSAnnotation) {
        val receiver = resolvePropertyReceiver(symbol, annotation) ?: return
        generate(receiver, annotation, symbol)
    }

    private fun resolvePropertyReceiver(
        symbol: KSPropertyDeclaration,
        annotation: KSAnnotation,
    ): KSClassDeclaration? {
        val propertyName = symbol.simpleName.asString()

        val config = try {
            annotation.toConfig()
        } catch (failure: WalkFailure) {
            logger.error(failure.reason, symbol)
            return null
        }

        return when {
            !config.prefix.endsWith(".$propertyName") -> {
                logger.error(
                    "Family prefix '${config.prefix}' must end with the property name '$propertyName'.",
                    symbol,
                )
                null
            }

            else -> {
                val receiver = symbol.type.resolve().declaration as? KSClassDeclaration
                if (receiver == null) {
                    logger.error("Property '$propertyName' must have a class type.", symbol)
                }
                receiver
            }
        }
    }

    @Suppress("SpreadOperator")
    private fun generate(receiver: KSClassDeclaration, annotation: KSAnnotation, origin: KSAnnotated) {
        val result = try {
            val receiverFqn = receiver.qualifiedName?.asString()
                ?: throw WalkFailure("Token path receiver has no qualified name.")
            val config = annotation.toConfig()

            if (processed.add("$receiverFqn#${config.prefix}")) {
                TokenFamilyWalker.walk(receiver, config)
            } else {
                null
            }
        } catch (failure: WalkFailure) {
            logger.error(failure.reason, origin)
            return
        }

        if (result == null) {
            return
        }

        codeGenerator.createNewFile(
            Dependencies(aggregating = false, *result.sources.toTypedArray()),
            OUTPUT_PACKAGE,
            result.model.enumName,
        ).bufferedWriter().use { it.write(FamilyEmitter.emit(result.model)) }
    }

    private fun KSAnnotated.familyAnnotation(): KSAnnotation? = annotations.firstOrNull { entry ->
        entry.annotationType.resolve().declaration.qualifiedName?.asString() == FAMILY_ANNOTATION
    }

    @Suppress("SpreadOperator")
    private fun generateKnobEntries(receiver: KSClassDeclaration) {
        val result = try {
            knobWalkResult(receiver)
        } catch (failure: WalkFailure) {
            logger.error(failure.reason, receiver)
            return
        }

        if (result == null) return

        codeGenerator.createNewFile(
            Dependencies(aggregating = false, *result.sources.toTypedArray()),
            result.model.packageName,
            "${result.model.receiverSimpleName}KnobEntries",
        ).bufferedWriter().use { it.write(KnobEntriesEmitter.emit(result.model)) }
    }

    private fun knobWalkResult(receiver: KSClassDeclaration): KnobWalkResult? {
        val (receiverFqn, prefix) = knobRequestOf(receiver)

        return if (processed.add("$receiverFqn#knobs#$prefix")) {
            KnobEntriesWalker.walk(receiver, prefix)
        } else {
            null
        }
    }

    private fun knobRequestOf(receiver: KSClassDeclaration): Pair<String, String> {
        val prefix = knobPrefixOf(receiver)
        val receiverFqn = receiver.qualifiedName?.asString()
            ?: throw WalkFailure("Knob entries receiver has no qualified name.")

        return receiverFqn to prefix
    }

    private fun knobPrefixOf(receiver: KSClassDeclaration): String {
        val annotation = receiver.annotations.firstOrNull { entry ->
            entry.annotationType.resolve().declaration.qualifiedName?.asString() == KNOB_ANNOTATION
        } ?: throw WalkFailure("Symbol does not resolve @BasisKnobEntries.")

        return annotation.arguments.firstOrNull { it.name?.asString() == "prefix" }?.value as? String
            ?: throw WalkFailure("@BasisKnobEntries requires a non-null 'prefix'.")
    }

    private fun KSAnnotation.toConfig(): FamilyConfig {
        fun arg(name: String): Any? = arguments.firstOrNull { it.name?.asString() == name }?.value
        val prefix = arg("prefix") as? String
            ?: throw WalkFailure("@BasisTokenPathFamily requires a non-null 'prefix'.")
        val kind = arg("kind") as? String
            ?: throw WalkFailure("@BasisTokenPathFamily requires a non-null 'kind'.")

        return FamilyConfig(
            prefix = prefix,
            kind = kind,
            excludes = (arg("excludes") as? List<*>).orEmpty().filterIsInstance<String>(),
            paramName = (arg("paramName") as? String).orEmpty(),
            enumDocNote = (arg("enumDocNote") as? String).orEmpty(),
            resolveDocNote = (arg("resolveDocNote") as? String).orEmpty(),
        )
    }

    private companion object {
        const val FAMILY_ANNOTATION = "io.github.alph_a07.basis.theme.core.codegen.BasisTokenPathFamily"
        const val KNOB_ANNOTATION = "io.github.alph_a07.basis.theme.core.codegen.BasisKnobEntries"
    }
}
