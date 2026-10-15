package io.github.alph_a07.basis.ksp.knobs

/** One knob axis: its property name and stable dotted path. */
internal data class KnobEntry(
    val propertyName: String,
    val path: String,
)

/** Everything the emitter needs to render one knob entry-map function. */
internal data class KnobEntriesModel(
    val packageName: String,
    val receiverSimpleName: String,
    val entries: List<KnobEntry>,
)
