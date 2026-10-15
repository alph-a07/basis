package io.github.alph_a07.basis.ksp.common

import com.google.devtools.ksp.processing.SymbolProcessor
import com.google.devtools.ksp.processing.SymbolProcessorEnvironment
import com.google.devtools.ksp.processing.SymbolProcessorProvider

/** Provides [BasisTokenPathFamilyProcessor] to the KSP runtime. */
internal class BasisTokenPathFamilyProcessorProvider : SymbolProcessorProvider {
    override fun create(environment: SymbolProcessorEnvironment): SymbolProcessor =
        BasisTokenPathFamilyProcessor(environment.codeGenerator, environment.logger)
}
