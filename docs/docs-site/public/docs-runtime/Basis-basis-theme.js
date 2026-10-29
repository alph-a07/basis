(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlinx-serialization-kotlinx-serialization-json.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlinx-serialization-kotlinx-serialization-json.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'Basis-basis-theme'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'Basis-basis-theme'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'Basis-basis-theme'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'Basis-basis-theme'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined') {
      throw new Error("Error loading module 'Basis-basis-theme'. Its dependency 'kotlinx-serialization-kotlinx-serialization-json' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-json' is loaded prior to 'Basis-basis-theme'.");
    }
    globalThis['Basis-basis-theme'] = factory(typeof globalThis['Basis-basis-theme'] === 'undefined' ? {} : globalThis['Basis-basis-theme'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlinx-serialization-kotlinx-serialization-json']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var hypot = Math.hypot;
  var sign = Math.sign;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.r2;
  var Unit_instance = kotlin_kotlin.$_$.i2;
  var createSimpleEnumSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u1;
  var Companion_instance = kotlin_kotlin.$_$.c2;
  var THROW_IAE = kotlin_kotlin.$_$.ra;
  var enumEntries = kotlin_kotlin.$_$.w5;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.q1;
  var lazy = kotlin_kotlin.$_$.ib;
  var protoOf = kotlin_kotlin.$_$.c8;
  var initMetadataForCompanion = kotlin_kotlin.$_$.h7;
  var Enum = kotlin_kotlin.$_$.ma;
  var initMetadataForClass = kotlin_kotlin.$_$.g7;
  var VOID = kotlin_kotlin.$_$.a;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kb;
  var SerializableWith = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e2;
  var isFinite = kotlin_kotlin.$_$.gb;
  var toString = kotlin_kotlin.$_$.f8;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.b3;
  var InlineClassDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var THROW_CCE = kotlin_kotlin.$_$.qa;
  var FloatSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var initMetadataForObject = kotlin_kotlin.$_$.l7;
  var getNumberHashCode = kotlin_kotlin.$_$.c7;
  var equals = kotlin_kotlin.$_$.z6;
  var Long = kotlin_kotlin.$_$.pa;
  var compare = kotlin_kotlin.$_$.z5;
  var LongSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var equalsLong = kotlin_kotlin.$_$.e6;
  var IntSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var StringSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var objectCreate = kotlin_kotlin.$_$.b8;
  var getStringHashCode = kotlin_kotlin.$_$.e7;
  var getKClass = kotlin_kotlin.$_$.v8;
  var SealedClassSerializer_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n;
  var initMetadataForInterface = kotlin_kotlin.$_$.j7;
  var coerceIn = kotlin_kotlin.$_$.p8;
  var coerceAtLeast = kotlin_kotlin.$_$.l8;
  var removePrefix = kotlin_kotlin.$_$.k9;
  var chunked = kotlin_kotlin.$_$.c9;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.r3;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.j2;
  var toIntOrNull = kotlin_kotlin.$_$.w9;
  var Collection = kotlin_kotlin.$_$.g3;
  var isInterface = kotlin_kotlin.$_$.t7;
  var filterNotNull = kotlin_kotlin.$_$.l4;
  var getOrNull = kotlin_kotlin.$_$.n4;
  var numberToInt = kotlin_kotlin.$_$.a8;
  var Triple = kotlin_kotlin.$_$.sa;
  var Regex_init_$Create$ = kotlin_kotlin.$_$.w2;
  var zipWithNext = kotlin_kotlin.$_$.r5;
  var hashCode = kotlin_kotlin.$_$.f7;
  var roundToLong = kotlin_kotlin.$_$.h8;
  var isNaN_0 = kotlin_kotlin.$_$.hb;
  var multiply = kotlin_kotlin.$_$.j6;
  var numberToLong = kotlin_kotlin.$_$.l6;
  var divide = kotlin_kotlin.$_$.d6;
  var toNumber = kotlin_kotlin.$_$.o6;
  var modulo = kotlin_kotlin.$_$.i6;
  var repeat = kotlin_kotlin.$_$.m9;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.c;
  var charArrayOf = kotlin_kotlin.$_$.s6;
  var trimEnd = kotlin_kotlin.$_$.da;
  var charSequenceLength = kotlin_kotlin.$_$.w6;
  var get_nullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r;
  var toString_0 = kotlin_kotlin.$_$.mb;
  var LinkedHashSetSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var emptySet = kotlin_kotlin.$_$.k4;
  var ArrayListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var emptyList = kotlin_kotlin.$_$.i4;
  var BooleanSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var getBooleanHashCode = kotlin_kotlin.$_$.b7;
  var coerceAtLeast_0 = kotlin_kotlin.$_$.k8;
  var setOfNotNull = kotlin_kotlin.$_$.f5;
  var distinct = kotlin_kotlin.$_$.h4;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.k2;
  var LinkedHashMapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var emptyMap = kotlin_kotlin.$_$.j4;
  var isBlank = kotlin_kotlin.$_$.i9;
  var setOf = kotlin_kotlin.$_$.g5;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z;
  var split = kotlin_kotlin.$_$.p9;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b2;
  var Json = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.a;
  var addAll = kotlin_kotlin.$_$.n3;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.d3;
  var toSet = kotlin_kotlin.$_$.p5;
  var listOf = kotlin_kotlin.$_$.y4;
  var coerceIn_0 = kotlin_kotlin.$_$.o8;
  var contentEquals = kotlin_kotlin.$_$.t3;
  var contentHashCode = kotlin_kotlin.$_$.v3;
  var getValue = kotlin_kotlin.$_$.o4;
  var to = kotlin_kotlin.$_$.nb;
  var mapOf = kotlin_kotlin.$_$.a5;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.u2;
  var roundToInt = kotlin_kotlin.$_$.g8;
  var fromInt = kotlin_kotlin.$_$.f6;
  var coerceAtLeast_1 = kotlin_kotlin.$_$.j8;
  var plus = kotlin_kotlin.$_$.lb;
  var plus_0 = kotlin_kotlin.$_$.d5;
  var max = kotlin_kotlin.$_$.b5;
  var first = kotlin_kotlin.$_$.m4;
  var joinToString = kotlin_kotlin.$_$.s4;
  var coerceAtMost = kotlin_kotlin.$_$.m8;
  var toMutableList = kotlin_kotlin.$_$.o5;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.u1;
  var floatFromBits = kotlin_kotlin.$_$.a7;
  var decodeToString = kotlin_kotlin.$_$.e9;
  var toShort = kotlin_kotlin.$_$.e8;
  var LinkedHashSet_init_$Create$_0 = kotlin_kotlin.$_$.t2;
  var KProperty1 = kotlin_kotlin.$_$.x8;
  var getPropertyCallableRef = kotlin_kotlin.$_$.d7;
  var isCharSequence = kotlin_kotlin.$_$.p7;
  var trim = kotlin_kotlin.$_$.fa;
  var replace = kotlin_kotlin.$_$.n9;
  var FunctionAdapter = kotlin_kotlin.$_$.p6;
  var Comparator = kotlin_kotlin.$_$.ja;
  var constructCallableReference = kotlin_kotlin.$_$.y6;
  var asSequence = kotlin_kotlin.$_$.p3;
  var filter = kotlin_kotlin.$_$.y8;
  var sortedWith = kotlin_kotlin.$_$.z8;
  var take = kotlin_kotlin.$_$.a9;
  var toList = kotlin_kotlin.$_$.b9;
  var compareValues = kotlin_kotlin.$_$.t5;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.q2;
  var lazy_0 = kotlin_kotlin.$_$.jb;
  var coerceIn_1 = kotlin_kotlin.$_$.q8;
  var substringBefore = kotlin_kotlin.$_$.s9;
  var mapCapacity = kotlin_kotlin.$_$.z4;
  var listOf_0 = kotlin_kotlin.$_$.x4;
  var take_0 = kotlin_kotlin.$_$.i5;
  var checkIndexOverflow = kotlin_kotlin.$_$.q3;
  var toList_0 = kotlin_kotlin.$_$.l5;
  var ObjectSerializer_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m;
  var isNumber = kotlin_kotlin.$_$.u7;
  var numberToByte = kotlin_kotlin.$_$.y7;
  //endregion
  //region block: pre-declaration
  initMetadataForCompanion(Companion);
  initMetadataForClass(ColorTokenPath, 'ColorTokenPath', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance});
  initMetadataForCompanion(Companion_0);
  initMetadataForClass(ControlSizeTokenPath, 'ControlSizeTokenPath', VOID, Enum);
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(DepthTokenPath, 'DepthTokenPath', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_0});
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(IconSizeTokenPath, 'IconSizeTokenPath', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_1});
  initMetadataForCompanion(Companion_3);
  initMetadataForClass(MotionTokenPath, 'MotionTokenPath', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_2});
  initMetadataForCompanion(Companion_4);
  initMetadataForClass(RadiusTokenPath, 'RadiusTokenPath', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_3});
  initMetadataForCompanion(Companion_5);
  initMetadataForClass(SpacingTokenPath, 'SpacingTokenPath', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_4});
  initMetadataForCompanion(Companion_6);
  initMetadataForClass(TypographyTokenPath, 'TypographyTokenPath', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_5});
  initMetadataForCompanion(Companion_7);
  initMetadataForObject($serializer, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(DpValue, 'DpValue', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
  initMetadataForCompanion(Companion_8);
  initMetadataForObject($serializer_0, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(DurationValue, 'DurationValue', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
  initMetadataForCompanion(Companion_9);
  initMetadataForObject($serializer_1, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(EmValue, 'EmValue', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_1});
  initMetadataForCompanion(Companion_10);
  initMetadataForObject($serializer_2, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(FontWeightValue, 'FontWeightValue', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_2});
  initMetadataForCompanion(Companion_11);
  initMetadataForObject($serializer_3, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(LineHeightValue, 'LineHeightValue', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_3});
  initMetadataForCompanion(Companion_12);
  initMetadataForObject($serializer_4, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(SpValue, 'SpValue', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_4});
  initMetadataForCompanion(Companion_13);
  initMetadataForClass(ThemeMode, 'ThemeMode', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_12});
  initMetadataForCompanion(Companion_14);
  initMetadataForObject($serializer_5, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_15);
  initMetadataForObject($serializer_6, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_16);
  initMetadataForObject($serializer_7, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForInterface(ColorSpec, 'ColorSpec', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_16});
  initMetadataForClass(Hex, 'Hex', VOID, VOID, [ColorSpec], VOID, VOID, {0: $serializer_getInstance_5});
  initMetadataForClass(Argb, 'Argb', VOID, VOID, [ColorSpec], VOID, VOID, {0: $serializer_getInstance_6});
  initMetadataForClass(Hsl, 'Hsl', VOID, VOID, [ColorSpec], VOID, VOID, {0: $serializer_getInstance_7});
  initMetadataForCompanion(Companion_17);
  initMetadataForClass(LinearSrgb, 'LinearSrgb');
  initMetadataForCompanion(Companion_18);
  initMetadataForObject($serializer_8, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(Oklch, 'Oklch', VOID, VOID, [ColorSpec], VOID, VOID, {0: $serializer_getInstance_8});
  initMetadataForClass(OklchGradient, 'OklchGradient');
  initMetadataForClass(OklchStop, 'OklchStop');
  initMetadataForClass(GradientDirection, 'GradientDirection', VOID, Enum);
  initMetadataForCompanion(Companion_19);
  initMetadataForClass(EasingKind, 'EasingKind', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_18});
  initMetadataForCompanion(Companion_20);
  initMetadataForObject($serializer_9, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(MotionSpec, 'MotionSpec', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_9});
  initMetadataForCompanion(Companion_21);
  initMetadataForObject($serializer_10, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(SpringParams, 'SpringParams', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_10});
  initMetadataForCompanion(Companion_22);
  initMetadataForObject($serializer_11, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(BasisIntent, 'BasisIntent', BasisIntent, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_11});
  initMetadataForCompanion(Companion_23);
  initMetadataForObject($serializer_12, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ControlIntent, 'ControlIntent', ControlIntent, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_12});
  initMetadataForCompanion(Companion_24);
  initMetadataForClass(ProductDomain, 'ProductDomain', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_23});
  initMetadataForCompanion(Companion_25);
  initMetadataForClass(InteractionPattern, 'InteractionPattern', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_24});
  initMetadataForCompanion(Companion_26);
  initMetadataForObject($serializer_13, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(DomainIntent, 'DomainIntent', DomainIntent, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_13});
  initMetadataForCompanion(Companion_27);
  initMetadataForObject($serializer_14, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(IdentityIntent, 'IdentityIntent', IdentityIntent, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_14});
  initMetadataForCompanion(Companion_28);
  initMetadataForClass(BrandPresence, 'BrandPresence', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_27});
  initMetadataForCompanion(Companion_29);
  initMetadataForObject($serializer_15, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(TypographyIdentity, 'TypographyIdentity', TypographyIdentity, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_15});
  initMetadataForCompanion(Companion_30);
  initMetadataForClass(MoodPreset, 'MoodPreset', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_29});
  initMetadataForCompanion(Companion_31);
  initMetadataForObject($serializer_16, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(MoodIntent, 'MoodIntent', MoodIntent, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_16});
  initMetadataForCompanion(Companion_32);
  initMetadataForObject($serializer_17, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(MoodKnobs, 'MoodKnobs', MoodKnobs, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_17});
  initMetadataForCompanion(Companion_33);
  initMetadataForObject($serializer_18, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ConstraintsControl, 'ConstraintsControl', ConstraintsControl, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_18});
  initMetadataForObject($serializer_19, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ContrastConstraint, 'ContrastConstraint', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_19});
  initMetadataForObject($serializer_20, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(TouchTargetConstraint, 'TouchTargetConstraint', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_20});
  initMetadataForCompanion(Companion_34);
  initMetadataForObject($serializer_21, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(TypographyConstraints, 'TypographyConstraints', TypographyConstraints, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_21});
  initMetadataForCompanion(Companion_35);
  initMetadataForObject($serializer_22, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(MinMaxLevels, 'MinMaxLevels', MinMaxLevels, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_22});
  initMetadataForCompanion(Companion_36);
  initMetadataForObject($serializer_23, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(MotionConstraint, 'MotionConstraint', MotionConstraint, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_23});
  initMetadataForCompanion(Companion_37);
  initMetadataForObject($serializer_24, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(FontControl, 'FontControl', FontControl, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_24});
  initMetadataForCompanion(Companion_38);
  initMetadataForObject($serializer_25, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(WeightClamp, 'WeightClamp', WeightClamp, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_25});
  initMetadataForCompanion(Companion_39);
  initMetadataForObject($serializer_26, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(FontFeatureSpec, 'FontFeatureSpec', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_26});
  initMetadataForCompanion(Companion_40);
  initMetadataForObject($serializer_27, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ModeControl, 'ModeControl', ModeControl, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_27});
  initMetadataForCompanion(Companion_41);
  initMetadataForObject($serializer_28, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_42);
  initMetadataForObject($serializer_29, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_43);
  initMetadataForObject($serializer_30, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_44);
  initMetadataForObject($serializer_31, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_45);
  initMetadataForObject($serializer_32, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForInterface(ComponentExtraPatch, 'ComponentExtraPatch', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_45});
  initMetadataForClass(Surface, 'Surface', Surface, VOID, [ComponentExtraPatch], VOID, VOID, {0: $serializer_getInstance_28});
  initMetadataForClass(Icon, 'Icon', Icon, VOID, [ComponentExtraPatch], VOID, VOID, {0: $serializer_getInstance_29});
  initMetadataForClass(Divider, 'Divider', Divider, VOID, [ComponentExtraPatch], VOID, VOID, {0: $serializer_getInstance_30});
  initMetadataForClass(Interactive, 'Interactive', Interactive, VOID, [ComponentExtraPatch], VOID, VOID, {0: $serializer_getInstance_31});
  initMetadataForClass(Spacer, 'Spacer', Spacer, VOID, [ComponentExtraPatch], VOID, VOID, {0: $serializer_getInstance_32});
  initMetadataForCompanion(Companion_46);
  initMetadataForCompanion(Companion_47);
  initMetadataForClass(ComponentId, 'ComponentId', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_46});
  initMetadataForCompanion(Companion_48);
  initMetadataForObject($serializer_33, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ComponentOverride, 'ComponentOverride', ComponentOverride, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_33});
  initMetadataForCompanion(Companion_49);
  initMetadataForObject($serializer_34, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ComponentOverrides, 'ComponentOverrides', ComponentOverrides, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_34});
  initMetadataForCompanion(Companion_50);
  initMetadataForObject($serializer_35, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ComponentStylePatch, 'ComponentStylePatch', ComponentStylePatch, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_35});
  initMetadataForCompanion(Companion_51);
  initMetadataForClass($serializer_36, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_52);
  initMetadataForClass($serializer_37, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_53);
  initMetadataForClass($serializer_38, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_54);
  initMetadataForClass($serializer_39, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForInterface(OverrideMode, 'OverrideMode');
  initMetadataForClass(Both, 'Both', VOID, VOID, [OverrideMode], VOID, VOID, {0: Companion_getInstance_50});
  initMetadataForClass(LightOnly, 'LightOnly', VOID, VOID, [OverrideMode], VOID, VOID, {0: Companion_getInstance_51});
  initMetadataForClass(DarkOnly, 'DarkOnly', VOID, VOID, [OverrideMode], VOID, VOID, {0: Companion_getInstance_52});
  initMetadataForClass(Split, 'Split', VOID, VOID, [OverrideMode], VOID, VOID, {0: Companion_getInstance_53});
  initMetadataForCompanion(Companion_55);
  initMetadataForObject($serializer_40, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_56);
  initMetadataForObject($serializer_41, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_57);
  initMetadataForObject($serializer_42, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_58);
  initMetadataForObject($serializer_43, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_59);
  initMetadataForObject($serializer_44, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForInterface(OverrideValue, 'OverrideValue', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_59});
  initMetadataForClass(Color, 'Color', VOID, VOID, [OverrideValue], VOID, VOID, {0: $serializer_getInstance_36});
  initMetadataForClass(Dp, 'Dp', VOID, VOID, [OverrideValue], VOID, VOID, {0: $serializer_getInstance_37});
  initMetadataForClass(Typography, 'Typography', VOID, VOID, [OverrideValue], VOID, VOID, {0: $serializer_getInstance_38});
  initMetadataForClass(Motion, 'Motion', VOID, VOID, [OverrideValue], VOID, VOID, {0: $serializer_getInstance_39});
  initMetadataForClass(Depth, 'Depth', VOID, VOID, [OverrideValue], VOID, VOID, {0: $serializer_getInstance_40});
  initMetadataForCompanion(Companion_60);
  initMetadataForCompanion(Companion_61);
  initMetadataForClass(ProminenceTier, 'ProminenceTier', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_60});
  initMetadataForCompanion(Companion_62);
  initMetadataForClass(StateId, 'StateId', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_61});
  initMetadataForCompanion(Companion_63);
  initMetadataForObject($serializer_45, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(TokenOverrides, 'TokenOverrides', TokenOverrides, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_41});
  initMetadataForCompanion(Companion_64);
  initMetadataForClass(Treatment, 'Treatment', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_63});
  initMetadataForCompanion(Companion_65);
  initMetadataForObject($serializer_46, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(UniversalStylePatch, 'UniversalStylePatch', UniversalStylePatch, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_42});
  initMetadataForCompanion(Companion_66);
  initMetadataForClass(VariantId, 'VariantId', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_65});
  initMetadataForCompanion(Companion_67);
  initMetadataForClass(VariantStateKey, 'VariantStateKey', VOID, VOID, VOID, VOID, VOID, {0: VariantStateKeySerializer_getInstance});
  initMetadataForObject(VariantStateKeySerializer, 'VariantStateKeySerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ThemeInterchange, 'ThemeInterchange');
  initMetadataForClass(ResolutionContext, 'ResolutionContext');
  initMetadataForClass(ThemeDraft, 'ThemeDraft');
  initMetadataForCompanion(Companion_68);
  initMetadataForClass(ThemeProfile, 'ThemeProfile', ThemeProfile);
  initMetadataForObject(BaseStage, 'BaseStage');
  initMetadataForClass(NeutralTargets, 'NeutralTargets');
  initMetadataForClass(SynthesizedChroma, 'SynthesizedChroma');
  initMetadataForClass(BaseSchema, 'BaseSchema');
  initMetadataForClass(BaseNeutrals, 'BaseNeutrals');
  initMetadataForClass(BaseStatus, 'BaseStatus');
  initMetadataForClass(BaseTypeMetrics, 'BaseTypeMetrics');
  initMetadataForObject(BaseTables, 'BaseTables');
  initMetadataForObject(DefaultFontBias, 'DefaultFontBias');
  initMetadataForObject(ControlStage, 'ControlStage');
  initMetadataForClass(DerivationWeights, 'DerivationWeights');
  initMetadataForObject(DeriveStage, 'DeriveStage');
  initMetadataForClass(ScalarWeights, 'ScalarWeights');
  initMetadataForObject(DomainStage, 'DomainStage');
  initMetadataForClass(ContrastRepairResult, 'ContrastRepairResult');
  initMetadataForClass(OwnedContrastPair, 'OwnedContrastPair');
  initMetadataForObject(EnforceStage, 'EnforceStage');
  initMetadataForClass(AssignedLadders, 'AssignedLadders');
  initMetadataForObject(CandidateAssigner, 'CandidateAssigner');
  initMetadataForObject(FontCatalogDecoder, 'FontCatalogDecoder');
  initMetadataForObject(FontCatalogDerivation, 'FontCatalogDerivation');
  initMetadataForClass(GoogleFontsCategory, 'GoogleFontsCategory', VOID, Enum);
  initMetadataForClass(FontCatalogEntry, 'FontCatalogEntry');
  initMetadataForClass(FontAxis, 'FontAxis');
  initMetadataForObject(FontStage, 'FontStage');
  initMetadataForClass(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForClass(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForClass(sam$kotlin_Comparator$0_1, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForObject(GoogleFontCatalog, 'GoogleFontCatalog');
  initMetadataForClass(ResolvedFonts, 'ResolvedFonts');
  initMetadataForClass(BrandTints, 'BrandTints');
  initMetadataForObject(IdentityStage, 'IdentityStage');
  initMetadataForClass(MoodInfluenceGain, 'MoodInfluenceGain', VOID, Enum);
  initMetadataForObject(MoodStage, 'MoodStage');
  initMetadataForObject(NormalizeStage, 'NormalizeStage');
  initMetadataForClass(NormalizedIntent, 'NormalizedIntent');
  initMetadataForCompanion(Companion_69);
  initMetadataForObject($serializer_47, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ResolutionReport, 'ResolutionReport', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_43});
  initMetadataForCompanion(Companion_70);
  initMetadataForObject($serializer_48, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ReportEntry, 'ReportEntry', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_44});
  initMetadataForCompanion(Companion_71);
  initMetadataForObject($serializer_49, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(FontAssignmentReport, 'FontAssignmentReport', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_45});
  initMetadataForCompanion(Companion_72);
  initMetadataForClass(ReportStatus, 'ReportStatus', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_71});
  initMetadataForCompanion(Companion_73);
  initMetadataForClass(ResolutionStage, 'ResolutionStage', VOID, Enum, VOID, VOID, VOID, {0: Companion_getInstance_72});
  initMetadataForCompanion(Companion_74);
  initMetadataForObject($serializer_50, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ThemeViolation, 'ThemeViolation', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_46});
  initMetadataForClass(ColorTokens, 'ColorTokens');
  initMetadataForClass(SurfaceColors, 'SurfaceColors');
  initMetadataForClass(ContentColors, 'ContentColors');
  initMetadataForClass(IconColors, 'IconColors');
  initMetadataForClass(BorderColors, 'BorderColors');
  initMetadataForClass(SelectionColors, 'SelectionColors');
  initMetadataForClass(FocusColors, 'FocusColors');
  initMetadataForClass(StatusColors, 'StatusColors');
  initMetadataForClass(BrandColors, 'BrandColors');
  initMetadataForClass(GradientColors, 'GradientColors');
  initMetadataForClass(ResolvedTheme, 'ResolvedTheme');
  initMetadataForClass(ResolvedThemePair, 'ResolvedThemePair');
  initMetadataForClass(MotionTokens, 'MotionTokens');
  initMetadataForCompanion(Companion_75);
  initMetadataForObject($serializer_51, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(DepthSpec, 'DepthSpec', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_47});
  initMetadataForClass(DepthTokens, 'DepthTokens');
  initMetadataForClass(RadiusTokens, 'RadiusTokens');
  initMetadataForClass(IconSizes, 'IconSizes');
  initMetadataForClass(SizeTokens, 'SizeTokens');
  initMetadataForClass(ControlSizes, 'ControlSizes');
  initMetadataForClass(AvatarSizes, 'AvatarSizes');
  initMetadataForClass(DotSizes, 'DotSizes');
  initMetadataForClass(SpacingTokens, 'SpacingTokens');
  initMetadataForCompanion(Companion_76);
  initMetadataForObject($serializer_52, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForCompanion(Companion_77);
  initMetadataForObject($serializer_53, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForInterface(FontFamilyRef, 'FontFamilyRef', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_77});
  initMetadataForClass(Catalog, 'Catalog', VOID, VOID, [FontFamilyRef], VOID, VOID, {0: $serializer_getInstance_48});
  initMetadataForClass(Custom, 'Custom', VOID, VOID, [FontFamilyRef], VOID, VOID, {0: $serializer_getInstance_49});
  initMetadataForCompanion(Companion_78);
  initMetadataForCompanion(Companion_79);
  initMetadataForObject($serializer_54, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(GoogleFontId, 'GoogleFontId', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_50});
  initMetadataForCompanion(Companion_80);
  initMetadataForObject($serializer_55, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(CustomFontKey, 'CustomFontKey', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_51});
  initMetadataForCompanion(Companion_81);
  initMetadataForObject($serializer_56, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForInterface(TypeColorRef, 'TypeColorRef', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_81});
  initMetadataForObject(ContentDefault, 'ContentDefault', VOID, VOID, [TypeColorRef], VOID, VOID, {0: ContentDefault_getInstance});
  initMetadataForObject(ContentMuted, 'ContentMuted', VOID, VOID, [TypeColorRef], VOID, VOID, {0: ContentMuted_getInstance});
  initMetadataForObject(ContentInverse, 'ContentInverse', VOID, VOID, [TypeColorRef], VOID, VOID, {0: ContentInverse_getInstance});
  initMetadataForClass(Explicit, 'Explicit', VOID, VOID, [TypeColorRef], VOID, VOID, {0: $serializer_getInstance_52});
  initMetadataForCompanion(Companion_82);
  initMetadataForCompanion(Companion_83);
  initMetadataForObject($serializer_57, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(TypeRole, 'TypeRole', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_53});
  initMetadataForClass(TypographyTokens, 'TypographyTokens');
  initMetadataForClass(StructureType, 'StructureType');
  initMetadataForClass(ContentType, 'ContentType');
  initMetadataForClass(MetadataType, 'MetadataType');
  //endregion
  function knobEntries(_this__u8e3s4) {
    // Inline function 'kotlin.collections.buildMap' call
    // Inline function 'kotlin.collections.buildMapInternal' call
    // Inline function 'kotlin.apply' call
    var this_0 = LinkedHashMap_init_$Create$();
    var tmp0_safe_receiver = _this__u8e3s4.j18_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this_0.x1('mood.knobs.warmth', tmp0_safe_receiver);
    }
    var tmp1_safe_receiver = _this__u8e3s4.k18_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this_0.x1('mood.knobs.chroma', tmp1_safe_receiver);
    }
    var tmp2_safe_receiver = _this__u8e3s4.l18_1;
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this_0.x1('mood.knobs.contrast', tmp2_safe_receiver);
    }
    var tmp3_safe_receiver = _this__u8e3s4.m18_1;
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this_0.x1('mood.knobs.density', tmp3_safe_receiver);
    }
    var tmp4_safe_receiver = _this__u8e3s4.n18_1;
    if (tmp4_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this_0.x1('mood.knobs.roundness', tmp4_safe_receiver);
    }
    var tmp5_safe_receiver = _this__u8e3s4.o18_1;
    if (tmp5_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this_0.x1('mood.knobs.typographyExpressiveness', tmp5_safe_receiver);
    }
    var tmp6_safe_receiver = _this__u8e3s4.p18_1;
    if (tmp6_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this_0.x1('mood.knobs.motionEnergy', tmp6_safe_receiver);
    }
    var tmp7_safe_receiver = _this__u8e3s4.q18_1;
    if (tmp7_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this_0.x1('mood.knobs.playfulness', tmp7_safe_receiver);
    }
    return this_0.x6();
  }
  function _get_$cachedSerializer__te6jhj($this) {
    return $this.r18_1.q1();
  }
  function ColorTokenPath$Companion$_anonymous__6ym6no() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath', values());
  }
  var static_init_called;
  function static_init() {
    if (static_init_called)
      return Unit_instance;
    static_init_called = true;
    ColorTokenPath_SurfaceDefault_instance = new ColorTokenPath('SurfaceDefault', 0, 'color.surface.default');
    ColorTokenPath_SurfaceElevated_instance = new ColorTokenPath('SurfaceElevated', 1, 'color.surface.elevated');
    ColorTokenPath_SurfaceRecessed_instance = new ColorTokenPath('SurfaceRecessed', 2, 'color.surface.recessed');
    ColorTokenPath_SurfaceInverse_instance = new ColorTokenPath('SurfaceInverse', 3, 'color.surface.inverse');
    ColorTokenPath_ContentDefault_instance = new ColorTokenPath('ContentDefault', 4, 'color.content.default');
    ColorTokenPath_ContentMuted_instance = new ColorTokenPath('ContentMuted', 5, 'color.content.muted');
    ColorTokenPath_ContentInverse_instance = new ColorTokenPath('ContentInverse', 6, 'color.content.inverse');
    ColorTokenPath_IconDefault_instance = new ColorTokenPath('IconDefault', 7, 'color.icon.default');
    ColorTokenPath_IconMuted_instance = new ColorTokenPath('IconMuted', 8, 'color.icon.muted');
    ColorTokenPath_IconInverse_instance = new ColorTokenPath('IconInverse', 9, 'color.icon.inverse');
    ColorTokenPath_BorderDefault_instance = new ColorTokenPath('BorderDefault', 10, 'color.border.default');
    ColorTokenPath_BorderMuted_instance = new ColorTokenPath('BorderMuted', 11, 'color.border.muted');
    ColorTokenPath_BorderStrong_instance = new ColorTokenPath('BorderStrong', 12, 'color.border.strong');
    ColorTokenPath_BorderInverse_instance = new ColorTokenPath('BorderInverse', 13, 'color.border.inverse');
    ColorTokenPath_SelectionSurface_instance = new ColorTokenPath('SelectionSurface', 14, 'color.selection.surface');
    ColorTokenPath_SelectionContent_instance = new ColorTokenPath('SelectionContent', 15, 'color.selection.content');
    ColorTokenPath_SelectionBorder_instance = new ColorTokenPath('SelectionBorder', 16, 'color.selection.border');
    ColorTokenPath_FocusRing_instance = new ColorTokenPath('FocusRing', 17, 'color.focus.ring');
    ColorTokenPath_PositiveSurface_instance = new ColorTokenPath('PositiveSurface', 18, 'color.positive.surface');
    ColorTokenPath_PositiveContent_instance = new ColorTokenPath('PositiveContent', 19, 'color.positive.content');
    ColorTokenPath_PositiveBorder_instance = new ColorTokenPath('PositiveBorder', 20, 'color.positive.border');
    ColorTokenPath_PositiveIcon_instance = new ColorTokenPath('PositiveIcon', 21, 'color.positive.icon');
    ColorTokenPath_NegativeSurface_instance = new ColorTokenPath('NegativeSurface', 22, 'color.negative.surface');
    ColorTokenPath_NegativeContent_instance = new ColorTokenPath('NegativeContent', 23, 'color.negative.content');
    ColorTokenPath_NegativeBorder_instance = new ColorTokenPath('NegativeBorder', 24, 'color.negative.border');
    ColorTokenPath_NegativeIcon_instance = new ColorTokenPath('NegativeIcon', 25, 'color.negative.icon');
    ColorTokenPath_CautionSurface_instance = new ColorTokenPath('CautionSurface', 26, 'color.caution.surface');
    ColorTokenPath_CautionContent_instance = new ColorTokenPath('CautionContent', 27, 'color.caution.content');
    ColorTokenPath_CautionBorder_instance = new ColorTokenPath('CautionBorder', 28, 'color.caution.border');
    ColorTokenPath_CautionIcon_instance = new ColorTokenPath('CautionIcon', 29, 'color.caution.icon');
    ColorTokenPath_InfoSurface_instance = new ColorTokenPath('InfoSurface', 30, 'color.info.surface');
    ColorTokenPath_InfoContent_instance = new ColorTokenPath('InfoContent', 31, 'color.info.content');
    ColorTokenPath_InfoBorder_instance = new ColorTokenPath('InfoBorder', 32, 'color.info.border');
    ColorTokenPath_InfoIcon_instance = new ColorTokenPath('InfoIcon', 33, 'color.info.icon');
    ColorTokenPath_BrandPrimary_instance = new ColorTokenPath('BrandPrimary', 34, 'color.brand.primary');
    ColorTokenPath_BrandSecondary_instance = new ColorTokenPath('BrandSecondary', 35, 'color.brand.secondary');
    ColorTokenPath_BrandTertiary_instance = new ColorTokenPath('BrandTertiary', 36, 'color.brand.tertiary');
    ColorTokenPath_BrandQuaternary_instance = new ColorTokenPath('BrandQuaternary', 37, 'color.brand.quaternary');
    if (Companion_instance_0 == null) {
      Companion_instance;
      new Companion();
    }
  }
  var ColorTokenPath_SurfaceDefault_instance;
  var ColorTokenPath_SurfaceElevated_instance;
  var ColorTokenPath_SurfaceRecessed_instance;
  var ColorTokenPath_SurfaceInverse_instance;
  var ColorTokenPath_ContentDefault_instance;
  var ColorTokenPath_ContentMuted_instance;
  var ColorTokenPath_ContentInverse_instance;
  var ColorTokenPath_IconDefault_instance;
  var ColorTokenPath_IconMuted_instance;
  var ColorTokenPath_IconInverse_instance;
  var ColorTokenPath_BorderDefault_instance;
  var ColorTokenPath_BorderMuted_instance;
  var ColorTokenPath_BorderStrong_instance;
  var ColorTokenPath_BorderInverse_instance;
  var ColorTokenPath_SelectionSurface_instance;
  var ColorTokenPath_SelectionContent_instance;
  var ColorTokenPath_SelectionBorder_instance;
  var ColorTokenPath_FocusRing_instance;
  var ColorTokenPath_PositiveSurface_instance;
  var ColorTokenPath_PositiveContent_instance;
  var ColorTokenPath_PositiveBorder_instance;
  var ColorTokenPath_PositiveIcon_instance;
  var ColorTokenPath_NegativeSurface_instance;
  var ColorTokenPath_NegativeContent_instance;
  var ColorTokenPath_NegativeBorder_instance;
  var ColorTokenPath_NegativeIcon_instance;
  var ColorTokenPath_CautionSurface_instance;
  var ColorTokenPath_CautionContent_instance;
  var ColorTokenPath_CautionBorder_instance;
  var ColorTokenPath_CautionIcon_instance;
  var ColorTokenPath_InfoSurface_instance;
  var ColorTokenPath_InfoContent_instance;
  var ColorTokenPath_InfoBorder_instance;
  var ColorTokenPath_InfoIcon_instance;
  var ColorTokenPath_BrandPrimary_instance;
  var ColorTokenPath_BrandSecondary_instance;
  var ColorTokenPath_BrandTertiary_instance;
  var ColorTokenPath_BrandQuaternary_instance;
  function values() {
    static_init();
    return [ColorTokenPath_SurfaceDefault_getInstance(), ColorTokenPath_SurfaceElevated_getInstance(), ColorTokenPath_SurfaceRecessed_getInstance(), ColorTokenPath_SurfaceInverse_getInstance(), ColorTokenPath_ContentDefault_getInstance(), ColorTokenPath_ContentMuted_getInstance(), ColorTokenPath_ContentInverse_getInstance(), ColorTokenPath_IconDefault_getInstance(), ColorTokenPath_IconMuted_getInstance(), ColorTokenPath_IconInverse_getInstance(), ColorTokenPath_BorderDefault_getInstance(), ColorTokenPath_BorderMuted_getInstance(), ColorTokenPath_BorderStrong_getInstance(), ColorTokenPath_BorderInverse_getInstance(), ColorTokenPath_SelectionSurface_getInstance(), ColorTokenPath_SelectionContent_getInstance(), ColorTokenPath_SelectionBorder_getInstance(), ColorTokenPath_FocusRing_getInstance(), ColorTokenPath_PositiveSurface_getInstance(), ColorTokenPath_PositiveContent_getInstance(), ColorTokenPath_PositiveBorder_getInstance(), ColorTokenPath_PositiveIcon_getInstance(), ColorTokenPath_NegativeSurface_getInstance(), ColorTokenPath_NegativeContent_getInstance(), ColorTokenPath_NegativeBorder_getInstance(), ColorTokenPath_NegativeIcon_getInstance(), ColorTokenPath_CautionSurface_getInstance(), ColorTokenPath_CautionContent_getInstance(), ColorTokenPath_CautionBorder_getInstance(), ColorTokenPath_CautionIcon_getInstance(), ColorTokenPath_InfoSurface_getInstance(), ColorTokenPath_InfoContent_getInstance(), ColorTokenPath_InfoBorder_getInstance(), ColorTokenPath_InfoIcon_getInstance(), ColorTokenPath_BrandPrimary_getInstance(), ColorTokenPath_BrandSecondary_getInstance(), ColorTokenPath_BrandTertiary_getInstance(), ColorTokenPath_BrandQuaternary_getInstance()];
  }
  function valueOf(value) {
    static_init();
    switch (value) {
      case 'SurfaceDefault':
        return ColorTokenPath_SurfaceDefault_getInstance();
      case 'SurfaceElevated':
        return ColorTokenPath_SurfaceElevated_getInstance();
      case 'SurfaceRecessed':
        return ColorTokenPath_SurfaceRecessed_getInstance();
      case 'SurfaceInverse':
        return ColorTokenPath_SurfaceInverse_getInstance();
      case 'ContentDefault':
        return ColorTokenPath_ContentDefault_getInstance();
      case 'ContentMuted':
        return ColorTokenPath_ContentMuted_getInstance();
      case 'ContentInverse':
        return ColorTokenPath_ContentInverse_getInstance();
      case 'IconDefault':
        return ColorTokenPath_IconDefault_getInstance();
      case 'IconMuted':
        return ColorTokenPath_IconMuted_getInstance();
      case 'IconInverse':
        return ColorTokenPath_IconInverse_getInstance();
      case 'BorderDefault':
        return ColorTokenPath_BorderDefault_getInstance();
      case 'BorderMuted':
        return ColorTokenPath_BorderMuted_getInstance();
      case 'BorderStrong':
        return ColorTokenPath_BorderStrong_getInstance();
      case 'BorderInverse':
        return ColorTokenPath_BorderInverse_getInstance();
      case 'SelectionSurface':
        return ColorTokenPath_SelectionSurface_getInstance();
      case 'SelectionContent':
        return ColorTokenPath_SelectionContent_getInstance();
      case 'SelectionBorder':
        return ColorTokenPath_SelectionBorder_getInstance();
      case 'FocusRing':
        return ColorTokenPath_FocusRing_getInstance();
      case 'PositiveSurface':
        return ColorTokenPath_PositiveSurface_getInstance();
      case 'PositiveContent':
        return ColorTokenPath_PositiveContent_getInstance();
      case 'PositiveBorder':
        return ColorTokenPath_PositiveBorder_getInstance();
      case 'PositiveIcon':
        return ColorTokenPath_PositiveIcon_getInstance();
      case 'NegativeSurface':
        return ColorTokenPath_NegativeSurface_getInstance();
      case 'NegativeContent':
        return ColorTokenPath_NegativeContent_getInstance();
      case 'NegativeBorder':
        return ColorTokenPath_NegativeBorder_getInstance();
      case 'NegativeIcon':
        return ColorTokenPath_NegativeIcon_getInstance();
      case 'CautionSurface':
        return ColorTokenPath_CautionSurface_getInstance();
      case 'CautionContent':
        return ColorTokenPath_CautionContent_getInstance();
      case 'CautionBorder':
        return ColorTokenPath_CautionBorder_getInstance();
      case 'CautionIcon':
        return ColorTokenPath_CautionIcon_getInstance();
      case 'InfoSurface':
        return ColorTokenPath_InfoSurface_getInstance();
      case 'InfoContent':
        return ColorTokenPath_InfoContent_getInstance();
      case 'InfoBorder':
        return ColorTokenPath_InfoBorder_getInstance();
      case 'InfoIcon':
        return ColorTokenPath_InfoIcon_getInstance();
      case 'BrandPrimary':
        return ColorTokenPath_BrandPrimary_getInstance();
      case 'BrandSecondary':
        return ColorTokenPath_BrandSecondary_getInstance();
      case 'BrandTertiary':
        return ColorTokenPath_BrandTertiary_getInstance();
      case 'BrandQuaternary':
        return ColorTokenPath_BrandQuaternary_getInstance();
      default:
        THROW_IAE('No enum constant io.github.alph_a07.basis.theme.tokens.core.ColorTokenPath.' + value);
        break;
    }
  }
  function get_entries() {
    static_init();
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  function Companion() {
    Companion_instance_0 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.r18_1 = lazy(tmp_0, ColorTokenPath$Companion$_anonymous__6ym6no);
  }
  protoOf(Companion).s18 = function () {
    return _get_$cachedSerializer__te6jhj(this);
  };
  var Companion_instance_0;
  function Companion_getInstance() {
    static_init();
    return Companion_instance_0;
  }
  var $ENTRIES;
  function ColorTokenPath(name, ordinal, path) {
    Enum.call(this, name, ordinal);
    this.v18_1 = path;
  }
  function resolveIn(_this__u8e3s4, colors) {
    var tmp;
    switch (_this__u8e3s4.z1_1) {
      case 0:
        tmp = colors.a19_1.w18_1;
        break;
      case 1:
        tmp = colors.a19_1.x18_1;
        break;
      case 2:
        tmp = colors.a19_1.y18_1;
        break;
      case 3:
        tmp = colors.a19_1.z18_1;
        break;
      case 4:
        tmp = colors.b19_1.m19_1;
        break;
      case 5:
        tmp = colors.b19_1.n19_1;
        break;
      case 6:
        tmp = colors.b19_1.o19_1;
        break;
      case 7:
        tmp = colors.c19_1.p19_1;
        break;
      case 8:
        tmp = colors.c19_1.q19_1;
        break;
      case 9:
        tmp = colors.c19_1.r19_1;
        break;
      case 10:
        tmp = colors.d19_1.s19_1;
        break;
      case 11:
        tmp = colors.d19_1.t19_1;
        break;
      case 12:
        tmp = colors.d19_1.u19_1;
        break;
      case 13:
        tmp = colors.d19_1.v19_1;
        break;
      case 14:
        tmp = colors.e19_1.w19_1;
        break;
      case 15:
        tmp = colors.e19_1.x19_1;
        break;
      case 16:
        tmp = colors.e19_1.y19_1;
        break;
      case 17:
        tmp = colors.f19_1.z19_1;
        break;
      case 18:
        tmp = colors.g19_1.a1a_1;
        break;
      case 19:
        tmp = colors.g19_1.b1a_1;
        break;
      case 20:
        tmp = colors.g19_1.c1a_1;
        break;
      case 21:
        tmp = colors.g19_1.d1a_1;
        break;
      case 22:
        tmp = colors.h19_1.a1a_1;
        break;
      case 23:
        tmp = colors.h19_1.b1a_1;
        break;
      case 24:
        tmp = colors.h19_1.c1a_1;
        break;
      case 25:
        tmp = colors.h19_1.d1a_1;
        break;
      case 26:
        tmp = colors.i19_1.a1a_1;
        break;
      case 27:
        tmp = colors.i19_1.b1a_1;
        break;
      case 28:
        tmp = colors.i19_1.c1a_1;
        break;
      case 29:
        tmp = colors.i19_1.d1a_1;
        break;
      case 30:
        tmp = colors.j19_1.a1a_1;
        break;
      case 31:
        tmp = colors.j19_1.b1a_1;
        break;
      case 32:
        tmp = colors.j19_1.c1a_1;
        break;
      case 33:
        tmp = colors.j19_1.d1a_1;
        break;
      case 34:
        tmp = colors.l19_1.e1a_1;
        break;
      case 35:
        tmp = colors.l19_1.f1a_1;
        break;
      case 36:
        tmp = colors.l19_1.g1a_1;
        break;
      case 37:
        tmp = colors.l19_1.h1a_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function ColorTokenPath_SurfaceDefault_getInstance() {
    static_init();
    return ColorTokenPath_SurfaceDefault_instance;
  }
  function ColorTokenPath_SurfaceElevated_getInstance() {
    static_init();
    return ColorTokenPath_SurfaceElevated_instance;
  }
  function ColorTokenPath_SurfaceRecessed_getInstance() {
    static_init();
    return ColorTokenPath_SurfaceRecessed_instance;
  }
  function ColorTokenPath_SurfaceInverse_getInstance() {
    static_init();
    return ColorTokenPath_SurfaceInverse_instance;
  }
  function ColorTokenPath_ContentDefault_getInstance() {
    static_init();
    return ColorTokenPath_ContentDefault_instance;
  }
  function ColorTokenPath_ContentMuted_getInstance() {
    static_init();
    return ColorTokenPath_ContentMuted_instance;
  }
  function ColorTokenPath_ContentInverse_getInstance() {
    static_init();
    return ColorTokenPath_ContentInverse_instance;
  }
  function ColorTokenPath_IconDefault_getInstance() {
    static_init();
    return ColorTokenPath_IconDefault_instance;
  }
  function ColorTokenPath_IconMuted_getInstance() {
    static_init();
    return ColorTokenPath_IconMuted_instance;
  }
  function ColorTokenPath_IconInverse_getInstance() {
    static_init();
    return ColorTokenPath_IconInverse_instance;
  }
  function ColorTokenPath_BorderDefault_getInstance() {
    static_init();
    return ColorTokenPath_BorderDefault_instance;
  }
  function ColorTokenPath_BorderMuted_getInstance() {
    static_init();
    return ColorTokenPath_BorderMuted_instance;
  }
  function ColorTokenPath_BorderStrong_getInstance() {
    static_init();
    return ColorTokenPath_BorderStrong_instance;
  }
  function ColorTokenPath_BorderInverse_getInstance() {
    static_init();
    return ColorTokenPath_BorderInverse_instance;
  }
  function ColorTokenPath_SelectionSurface_getInstance() {
    static_init();
    return ColorTokenPath_SelectionSurface_instance;
  }
  function ColorTokenPath_SelectionContent_getInstance() {
    static_init();
    return ColorTokenPath_SelectionContent_instance;
  }
  function ColorTokenPath_SelectionBorder_getInstance() {
    static_init();
    return ColorTokenPath_SelectionBorder_instance;
  }
  function ColorTokenPath_FocusRing_getInstance() {
    static_init();
    return ColorTokenPath_FocusRing_instance;
  }
  function ColorTokenPath_PositiveSurface_getInstance() {
    static_init();
    return ColorTokenPath_PositiveSurface_instance;
  }
  function ColorTokenPath_PositiveContent_getInstance() {
    static_init();
    return ColorTokenPath_PositiveContent_instance;
  }
  function ColorTokenPath_PositiveBorder_getInstance() {
    static_init();
    return ColorTokenPath_PositiveBorder_instance;
  }
  function ColorTokenPath_PositiveIcon_getInstance() {
    static_init();
    return ColorTokenPath_PositiveIcon_instance;
  }
  function ColorTokenPath_NegativeSurface_getInstance() {
    static_init();
    return ColorTokenPath_NegativeSurface_instance;
  }
  function ColorTokenPath_NegativeContent_getInstance() {
    static_init();
    return ColorTokenPath_NegativeContent_instance;
  }
  function ColorTokenPath_NegativeBorder_getInstance() {
    static_init();
    return ColorTokenPath_NegativeBorder_instance;
  }
  function ColorTokenPath_NegativeIcon_getInstance() {
    static_init();
    return ColorTokenPath_NegativeIcon_instance;
  }
  function ColorTokenPath_CautionSurface_getInstance() {
    static_init();
    return ColorTokenPath_CautionSurface_instance;
  }
  function ColorTokenPath_CautionContent_getInstance() {
    static_init();
    return ColorTokenPath_CautionContent_instance;
  }
  function ColorTokenPath_CautionBorder_getInstance() {
    static_init();
    return ColorTokenPath_CautionBorder_instance;
  }
  function ColorTokenPath_CautionIcon_getInstance() {
    static_init();
    return ColorTokenPath_CautionIcon_instance;
  }
  function ColorTokenPath_InfoSurface_getInstance() {
    static_init();
    return ColorTokenPath_InfoSurface_instance;
  }
  function ColorTokenPath_InfoContent_getInstance() {
    static_init();
    return ColorTokenPath_InfoContent_instance;
  }
  function ColorTokenPath_InfoBorder_getInstance() {
    static_init();
    return ColorTokenPath_InfoBorder_instance;
  }
  function ColorTokenPath_InfoIcon_getInstance() {
    static_init();
    return ColorTokenPath_InfoIcon_instance;
  }
  function ColorTokenPath_BrandPrimary_getInstance() {
    static_init();
    return ColorTokenPath_BrandPrimary_instance;
  }
  function ColorTokenPath_BrandSecondary_getInstance() {
    static_init();
    return ColorTokenPath_BrandSecondary_instance;
  }
  function ColorTokenPath_BrandTertiary_getInstance() {
    static_init();
    return ColorTokenPath_BrandTertiary_instance;
  }
  function ColorTokenPath_BrandQuaternary_getInstance() {
    static_init();
    return ColorTokenPath_BrandQuaternary_instance;
  }
  function ControlSizeTokenPath$Companion$_anonymous__ngr4k1() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.tokens.core.ControlSizeTokenPath', values_0());
  }
  var static_init_called_0;
  function static_init_0() {
    if (static_init_called_0)
      return Unit_instance;
    static_init_called_0 = true;
    ControlSizeTokenPath_Level1_instance = new ControlSizeTokenPath('Level1', 0, 'size.control.level1');
    ControlSizeTokenPath_Level2_instance = new ControlSizeTokenPath('Level2', 1, 'size.control.level2');
    ControlSizeTokenPath_Level3_instance = new ControlSizeTokenPath('Level3', 2, 'size.control.level3');
    ControlSizeTokenPath_Level4_instance = new ControlSizeTokenPath('Level4', 3, 'size.control.level4');
    ControlSizeTokenPath_Level5_instance = new ControlSizeTokenPath('Level5', 4, 'size.control.level5');
    if (Companion_instance_1 == null) {
      Companion_instance;
      new Companion_0();
    }
  }
  var ControlSizeTokenPath_Level1_instance;
  var ControlSizeTokenPath_Level2_instance;
  var ControlSizeTokenPath_Level3_instance;
  var ControlSizeTokenPath_Level4_instance;
  var ControlSizeTokenPath_Level5_instance;
  function values_0() {
    static_init_0();
    return [ControlSizeTokenPath_Level1_getInstance(), ControlSizeTokenPath_Level2_getInstance(), ControlSizeTokenPath_Level3_getInstance(), ControlSizeTokenPath_Level4_getInstance(), ControlSizeTokenPath_Level5_getInstance()];
  }
  function get_entries_0() {
    static_init_0();
    if ($ENTRIES_0 == null)
      $ENTRIES_0 = enumEntries(values_0());
    return $ENTRIES_0;
  }
  function Companion_0() {
    Companion_instance_1 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.i1a_1 = lazy(tmp_0, ControlSizeTokenPath$Companion$_anonymous__ngr4k1);
  }
  var Companion_instance_1;
  var $ENTRIES_0;
  function ControlSizeTokenPath(name, ordinal, path) {
    Enum.call(this, name, ordinal);
    this.l1a_1 = path;
  }
  function resolveIn_0(_this__u8e3s4, control) {
    var tmp;
    switch (_this__u8e3s4.z1_1) {
      case 0:
        tmp = control.m1a_1;
        break;
      case 1:
        tmp = control.n1a_1;
        break;
      case 2:
        tmp = control.o1a_1;
        break;
      case 3:
        tmp = control.p1a_1;
        break;
      case 4:
        tmp = control.q1a_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function ControlSizeTokenPath_Level1_getInstance() {
    static_init_0();
    return ControlSizeTokenPath_Level1_instance;
  }
  function ControlSizeTokenPath_Level2_getInstance() {
    static_init_0();
    return ControlSizeTokenPath_Level2_instance;
  }
  function ControlSizeTokenPath_Level3_getInstance() {
    static_init_0();
    return ControlSizeTokenPath_Level3_instance;
  }
  function ControlSizeTokenPath_Level4_getInstance() {
    static_init_0();
    return ControlSizeTokenPath_Level4_instance;
  }
  function ControlSizeTokenPath_Level5_getInstance() {
    static_init_0();
    return ControlSizeTokenPath_Level5_instance;
  }
  function _get_$cachedSerializer__te6jhj_0($this) {
    return $this.r1a_1.q1();
  }
  function DepthTokenPath$Companion$_anonymous__unwoks() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.tokens.core.DepthTokenPath', values_1());
  }
  var static_init_called_1;
  function static_init_1() {
    if (static_init_called_1)
      return Unit_instance;
    static_init_called_1 = true;
    DepthTokenPath_Level1_instance = new DepthTokenPath('Level1', 0, 'depth.level1');
    DepthTokenPath_Level2_instance = new DepthTokenPath('Level2', 1, 'depth.level2');
    DepthTokenPath_Level3_instance = new DepthTokenPath('Level3', 2, 'depth.level3');
    DepthTokenPath_Level4_instance = new DepthTokenPath('Level4', 3, 'depth.level4');
    if (Companion_instance_2 == null) {
      Companion_instance;
      new Companion_1();
    }
  }
  var DepthTokenPath_Level1_instance;
  var DepthTokenPath_Level2_instance;
  var DepthTokenPath_Level3_instance;
  var DepthTokenPath_Level4_instance;
  function values_1() {
    static_init_1();
    return [DepthTokenPath_Level1_getInstance(), DepthTokenPath_Level2_getInstance(), DepthTokenPath_Level3_getInstance(), DepthTokenPath_Level4_getInstance()];
  }
  function get_entries_1() {
    static_init_1();
    if ($ENTRIES_1 == null)
      $ENTRIES_1 = enumEntries(values_1());
    return $ENTRIES_1;
  }
  function Companion_1() {
    Companion_instance_2 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.r1a_1 = lazy(tmp_0, DepthTokenPath$Companion$_anonymous__unwoks);
  }
  protoOf(Companion_1).s18 = function () {
    return _get_$cachedSerializer__te6jhj_0(this);
  };
  var Companion_instance_2;
  function Companion_getInstance_0() {
    static_init_1();
    return Companion_instance_2;
  }
  var $ENTRIES_1;
  function DepthTokenPath(name, ordinal, path) {
    Enum.call(this, name, ordinal);
    this.u1a_1 = path;
  }
  function resolveIn_1(_this__u8e3s4, depth) {
    var tmp;
    switch (_this__u8e3s4.z1_1) {
      case 0:
        tmp = depth.v1a_1;
        break;
      case 1:
        tmp = depth.w1a_1;
        break;
      case 2:
        tmp = depth.x1a_1;
        break;
      case 3:
        tmp = depth.y1a_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function DepthTokenPath_Level1_getInstance() {
    static_init_1();
    return DepthTokenPath_Level1_instance;
  }
  function DepthTokenPath_Level2_getInstance() {
    static_init_1();
    return DepthTokenPath_Level2_instance;
  }
  function DepthTokenPath_Level3_getInstance() {
    static_init_1();
    return DepthTokenPath_Level3_instance;
  }
  function DepthTokenPath_Level4_getInstance() {
    static_init_1();
    return DepthTokenPath_Level4_instance;
  }
  function _get_$cachedSerializer__te6jhj_1($this) {
    return $this.z1a_1.q1();
  }
  function IconSizeTokenPath$Companion$_anonymous__uld5o5() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.tokens.core.IconSizeTokenPath', values_2());
  }
  var static_init_called_2;
  function static_init_2() {
    if (static_init_called_2)
      return Unit_instance;
    static_init_called_2 = true;
    IconSizeTokenPath_Level1_instance = new IconSizeTokenPath('Level1', 0, 'size.icon.level1');
    IconSizeTokenPath_Level2_instance = new IconSizeTokenPath('Level2', 1, 'size.icon.level2');
    IconSizeTokenPath_Level3_instance = new IconSizeTokenPath('Level3', 2, 'size.icon.level3');
    IconSizeTokenPath_Level4_instance = new IconSizeTokenPath('Level4', 3, 'size.icon.level4');
    IconSizeTokenPath_Level5_instance = new IconSizeTokenPath('Level5', 4, 'size.icon.level5');
    if (Companion_instance_3 == null) {
      Companion_instance;
      new Companion_2();
    }
  }
  var IconSizeTokenPath_Level1_instance;
  var IconSizeTokenPath_Level2_instance;
  var IconSizeTokenPath_Level3_instance;
  var IconSizeTokenPath_Level4_instance;
  var IconSizeTokenPath_Level5_instance;
  function values_2() {
    static_init_2();
    return [IconSizeTokenPath_Level1_getInstance(), IconSizeTokenPath_Level2_getInstance(), IconSizeTokenPath_Level3_getInstance(), IconSizeTokenPath_Level4_getInstance(), IconSizeTokenPath_Level5_getInstance()];
  }
  function get_entries_2() {
    static_init_2();
    if ($ENTRIES_2 == null)
      $ENTRIES_2 = enumEntries(values_2());
    return $ENTRIES_2;
  }
  function Companion_2() {
    Companion_instance_3 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.z1a_1 = lazy(tmp_0, IconSizeTokenPath$Companion$_anonymous__uld5o5);
  }
  protoOf(Companion_2).s18 = function () {
    return _get_$cachedSerializer__te6jhj_1(this);
  };
  var Companion_instance_3;
  function Companion_getInstance_1() {
    static_init_2();
    return Companion_instance_3;
  }
  var $ENTRIES_2;
  function IconSizeTokenPath(name, ordinal, path) {
    Enum.call(this, name, ordinal);
    this.c1b_1 = path;
  }
  function resolveIn_2(_this__u8e3s4, icon) {
    var tmp;
    switch (_this__u8e3s4.z1_1) {
      case 0:
        tmp = icon.d1b_1;
        break;
      case 1:
        tmp = icon.e1b_1;
        break;
      case 2:
        tmp = icon.f1b_1;
        break;
      case 3:
        tmp = icon.g1b_1;
        break;
      case 4:
        tmp = icon.h1b_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function IconSizeTokenPath_Level1_getInstance() {
    static_init_2();
    return IconSizeTokenPath_Level1_instance;
  }
  function IconSizeTokenPath_Level2_getInstance() {
    static_init_2();
    return IconSizeTokenPath_Level2_instance;
  }
  function IconSizeTokenPath_Level3_getInstance() {
    static_init_2();
    return IconSizeTokenPath_Level3_instance;
  }
  function IconSizeTokenPath_Level4_getInstance() {
    static_init_2();
    return IconSizeTokenPath_Level4_instance;
  }
  function IconSizeTokenPath_Level5_getInstance() {
    static_init_2();
    return IconSizeTokenPath_Level5_instance;
  }
  function _get_$cachedSerializer__te6jhj_2($this) {
    return $this.i1b_1.q1();
  }
  function MotionTokenPath$Companion$_anonymous__2y99uv() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.tokens.core.MotionTokenPath', values_3());
  }
  var static_init_called_3;
  function static_init_3() {
    if (static_init_called_3)
      return Unit_instance;
    static_init_called_3 = true;
    MotionTokenPath_Feedback_instance = new MotionTokenPath('Feedback', 0, 'motion.feedback');
    MotionTokenPath_StateTransition_instance = new MotionTokenPath('StateTransition', 1, 'motion.stateTransition');
    MotionTokenPath_Transformation_instance = new MotionTokenPath('Transformation', 2, 'motion.transformation');
    MotionTokenPath_Expansion_instance = new MotionTokenPath('Expansion', 3, 'motion.expansion');
    MotionTokenPath_Reposition_instance = new MotionTokenPath('Reposition', 4, 'motion.reposition');
    MotionTokenPath_Emphasis_instance = new MotionTokenPath('Emphasis', 5, 'motion.emphasis');
    if (Companion_instance_4 == null) {
      Companion_instance;
      new Companion_3();
    }
  }
  var MotionTokenPath_Feedback_instance;
  var MotionTokenPath_StateTransition_instance;
  var MotionTokenPath_Transformation_instance;
  var MotionTokenPath_Expansion_instance;
  var MotionTokenPath_Reposition_instance;
  var MotionTokenPath_Emphasis_instance;
  function values_3() {
    static_init_3();
    return [MotionTokenPath_Feedback_getInstance(), MotionTokenPath_StateTransition_getInstance(), MotionTokenPath_Transformation_getInstance(), MotionTokenPath_Expansion_getInstance(), MotionTokenPath_Reposition_getInstance(), MotionTokenPath_Emphasis_getInstance()];
  }
  function get_entries_3() {
    static_init_3();
    if ($ENTRIES_3 == null)
      $ENTRIES_3 = enumEntries(values_3());
    return $ENTRIES_3;
  }
  function Companion_3() {
    Companion_instance_4 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.i1b_1 = lazy(tmp_0, MotionTokenPath$Companion$_anonymous__2y99uv);
  }
  protoOf(Companion_3).s18 = function () {
    return _get_$cachedSerializer__te6jhj_2(this);
  };
  var Companion_instance_4;
  function Companion_getInstance_2() {
    static_init_3();
    return Companion_instance_4;
  }
  var $ENTRIES_3;
  function MotionTokenPath(name, ordinal, path) {
    Enum.call(this, name, ordinal);
    this.l1b_1 = path;
  }
  function resolveIn_3(_this__u8e3s4, motion) {
    var tmp;
    switch (_this__u8e3s4.z1_1) {
      case 0:
        tmp = motion.m1b_1;
        break;
      case 1:
        tmp = motion.n1b_1;
        break;
      case 2:
        tmp = motion.o1b_1;
        break;
      case 3:
        tmp = motion.p1b_1;
        break;
      case 4:
        tmp = motion.q1b_1;
        break;
      case 5:
        tmp = motion.r1b_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function MotionTokenPath_Feedback_getInstance() {
    static_init_3();
    return MotionTokenPath_Feedback_instance;
  }
  function MotionTokenPath_StateTransition_getInstance() {
    static_init_3();
    return MotionTokenPath_StateTransition_instance;
  }
  function MotionTokenPath_Transformation_getInstance() {
    static_init_3();
    return MotionTokenPath_Transformation_instance;
  }
  function MotionTokenPath_Expansion_getInstance() {
    static_init_3();
    return MotionTokenPath_Expansion_instance;
  }
  function MotionTokenPath_Reposition_getInstance() {
    static_init_3();
    return MotionTokenPath_Reposition_instance;
  }
  function MotionTokenPath_Emphasis_getInstance() {
    static_init_3();
    return MotionTokenPath_Emphasis_instance;
  }
  function _get_$cachedSerializer__te6jhj_3($this) {
    return $this.s1b_1.q1();
  }
  function RadiusTokenPath$Companion$_anonymous__btv4vx() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.tokens.core.RadiusTokenPath', values_4());
  }
  var static_init_called_4;
  function static_init_4() {
    if (static_init_called_4)
      return Unit_instance;
    static_init_called_4 = true;
    RadiusTokenPath_None_instance = new RadiusTokenPath('None', 0, 'radius.none');
    RadiusTokenPath_Level1_instance = new RadiusTokenPath('Level1', 1, 'radius.level1');
    RadiusTokenPath_Level2_instance = new RadiusTokenPath('Level2', 2, 'radius.level2');
    RadiusTokenPath_Level3_instance = new RadiusTokenPath('Level3', 3, 'radius.level3');
    RadiusTokenPath_Level4_instance = new RadiusTokenPath('Level4', 4, 'radius.level4');
    RadiusTokenPath_Level5_instance = new RadiusTokenPath('Level5', 5, 'radius.level5');
    RadiusTokenPath_Level6_instance = new RadiusTokenPath('Level6', 6, 'radius.level6');
    RadiusTokenPath_Level7_instance = new RadiusTokenPath('Level7', 7, 'radius.level7');
    RadiusTokenPath_Level8_instance = new RadiusTokenPath('Level8', 8, 'radius.level8');
    RadiusTokenPath_Full_instance = new RadiusTokenPath('Full', 9, 'radius.full');
    if (Companion_instance_5 == null) {
      Companion_instance;
      new Companion_4();
    }
  }
  var RadiusTokenPath_None_instance;
  var RadiusTokenPath_Level1_instance;
  var RadiusTokenPath_Level2_instance;
  var RadiusTokenPath_Level3_instance;
  var RadiusTokenPath_Level4_instance;
  var RadiusTokenPath_Level5_instance;
  var RadiusTokenPath_Level6_instance;
  var RadiusTokenPath_Level7_instance;
  var RadiusTokenPath_Level8_instance;
  var RadiusTokenPath_Full_instance;
  function values_4() {
    static_init_4();
    return [RadiusTokenPath_None_getInstance(), RadiusTokenPath_Level1_getInstance(), RadiusTokenPath_Level2_getInstance(), RadiusTokenPath_Level3_getInstance(), RadiusTokenPath_Level4_getInstance(), RadiusTokenPath_Level5_getInstance(), RadiusTokenPath_Level6_getInstance(), RadiusTokenPath_Level7_getInstance(), RadiusTokenPath_Level8_getInstance(), RadiusTokenPath_Full_getInstance()];
  }
  function get_entries_4() {
    static_init_4();
    if ($ENTRIES_4 == null)
      $ENTRIES_4 = enumEntries(values_4());
    return $ENTRIES_4;
  }
  function Companion_4() {
    Companion_instance_5 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.s1b_1 = lazy(tmp_0, RadiusTokenPath$Companion$_anonymous__btv4vx);
  }
  protoOf(Companion_4).s18 = function () {
    return _get_$cachedSerializer__te6jhj_3(this);
  };
  var Companion_instance_5;
  function Companion_getInstance_3() {
    static_init_4();
    return Companion_instance_5;
  }
  var $ENTRIES_4;
  function RadiusTokenPath(name, ordinal, path) {
    Enum.call(this, name, ordinal);
    this.v1b_1 = path;
  }
  function resolveIn_4(_this__u8e3s4, radius) {
    var tmp;
    switch (_this__u8e3s4.z1_1) {
      case 0:
        tmp = radius.w1b_1;
        break;
      case 1:
        tmp = radius.x1b_1;
        break;
      case 2:
        tmp = radius.y1b_1;
        break;
      case 3:
        tmp = radius.z1b_1;
        break;
      case 4:
        tmp = radius.a1c_1;
        break;
      case 5:
        tmp = radius.b1c_1;
        break;
      case 6:
        tmp = radius.c1c_1;
        break;
      case 7:
        tmp = radius.d1c_1;
        break;
      case 8:
        tmp = radius.e1c_1;
        break;
      case 9:
        tmp = radius.f1c_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function RadiusTokenPath_None_getInstance() {
    static_init_4();
    return RadiusTokenPath_None_instance;
  }
  function RadiusTokenPath_Level1_getInstance() {
    static_init_4();
    return RadiusTokenPath_Level1_instance;
  }
  function RadiusTokenPath_Level2_getInstance() {
    static_init_4();
    return RadiusTokenPath_Level2_instance;
  }
  function RadiusTokenPath_Level3_getInstance() {
    static_init_4();
    return RadiusTokenPath_Level3_instance;
  }
  function RadiusTokenPath_Level4_getInstance() {
    static_init_4();
    return RadiusTokenPath_Level4_instance;
  }
  function RadiusTokenPath_Level5_getInstance() {
    static_init_4();
    return RadiusTokenPath_Level5_instance;
  }
  function RadiusTokenPath_Level6_getInstance() {
    static_init_4();
    return RadiusTokenPath_Level6_instance;
  }
  function RadiusTokenPath_Level7_getInstance() {
    static_init_4();
    return RadiusTokenPath_Level7_instance;
  }
  function RadiusTokenPath_Level8_getInstance() {
    static_init_4();
    return RadiusTokenPath_Level8_instance;
  }
  function RadiusTokenPath_Full_getInstance() {
    static_init_4();
    return RadiusTokenPath_Full_instance;
  }
  function _get_$cachedSerializer__te6jhj_4($this) {
    return $this.g1c_1.q1();
  }
  function SpacingTokenPath$Companion$_anonymous__eemluc() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.tokens.core.SpacingTokenPath', values_5());
  }
  var static_init_called_5;
  function static_init_5() {
    if (static_init_called_5)
      return Unit_instance;
    static_init_called_5 = true;
    SpacingTokenPath_Level1_instance = new SpacingTokenPath('Level1', 0, 'spacing.level1');
    SpacingTokenPath_Level2_instance = new SpacingTokenPath('Level2', 1, 'spacing.level2');
    SpacingTokenPath_Level3_instance = new SpacingTokenPath('Level3', 2, 'spacing.level3');
    SpacingTokenPath_Level4_instance = new SpacingTokenPath('Level4', 3, 'spacing.level4');
    SpacingTokenPath_Level5_instance = new SpacingTokenPath('Level5', 4, 'spacing.level5');
    SpacingTokenPath_Level6_instance = new SpacingTokenPath('Level6', 5, 'spacing.level6');
    SpacingTokenPath_Level7_instance = new SpacingTokenPath('Level7', 6, 'spacing.level7');
    SpacingTokenPath_Level8_instance = new SpacingTokenPath('Level8', 7, 'spacing.level8');
    if (Companion_instance_6 == null) {
      Companion_instance;
      new Companion_5();
    }
  }
  var SpacingTokenPath_Level1_instance;
  var SpacingTokenPath_Level2_instance;
  var SpacingTokenPath_Level3_instance;
  var SpacingTokenPath_Level4_instance;
  var SpacingTokenPath_Level5_instance;
  var SpacingTokenPath_Level6_instance;
  var SpacingTokenPath_Level7_instance;
  var SpacingTokenPath_Level8_instance;
  function values_5() {
    static_init_5();
    return [SpacingTokenPath_Level1_getInstance(), SpacingTokenPath_Level2_getInstance(), SpacingTokenPath_Level3_getInstance(), SpacingTokenPath_Level4_getInstance(), SpacingTokenPath_Level5_getInstance(), SpacingTokenPath_Level6_getInstance(), SpacingTokenPath_Level7_getInstance(), SpacingTokenPath_Level8_getInstance()];
  }
  function get_entries_5() {
    static_init_5();
    if ($ENTRIES_5 == null)
      $ENTRIES_5 = enumEntries(values_5());
    return $ENTRIES_5;
  }
  function Companion_5() {
    Companion_instance_6 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.g1c_1 = lazy(tmp_0, SpacingTokenPath$Companion$_anonymous__eemluc);
  }
  protoOf(Companion_5).s18 = function () {
    return _get_$cachedSerializer__te6jhj_4(this);
  };
  var Companion_instance_6;
  function Companion_getInstance_4() {
    static_init_5();
    return Companion_instance_6;
  }
  var $ENTRIES_5;
  function SpacingTokenPath(name, ordinal, path) {
    Enum.call(this, name, ordinal);
    this.j1c_1 = path;
  }
  function resolveIn_5(_this__u8e3s4, spacing) {
    var tmp;
    switch (_this__u8e3s4.z1_1) {
      case 0:
        tmp = spacing.k1c_1;
        break;
      case 1:
        tmp = spacing.l1c_1;
        break;
      case 2:
        tmp = spacing.m1c_1;
        break;
      case 3:
        tmp = spacing.n1c_1;
        break;
      case 4:
        tmp = spacing.o1c_1;
        break;
      case 5:
        tmp = spacing.p1c_1;
        break;
      case 6:
        tmp = spacing.q1c_1;
        break;
      case 7:
        tmp = spacing.r1c_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function SpacingTokenPath_Level1_getInstance() {
    static_init_5();
    return SpacingTokenPath_Level1_instance;
  }
  function SpacingTokenPath_Level2_getInstance() {
    static_init_5();
    return SpacingTokenPath_Level2_instance;
  }
  function SpacingTokenPath_Level3_getInstance() {
    static_init_5();
    return SpacingTokenPath_Level3_instance;
  }
  function SpacingTokenPath_Level4_getInstance() {
    static_init_5();
    return SpacingTokenPath_Level4_instance;
  }
  function SpacingTokenPath_Level5_getInstance() {
    static_init_5();
    return SpacingTokenPath_Level5_instance;
  }
  function SpacingTokenPath_Level6_getInstance() {
    static_init_5();
    return SpacingTokenPath_Level6_instance;
  }
  function SpacingTokenPath_Level7_getInstance() {
    static_init_5();
    return SpacingTokenPath_Level7_instance;
  }
  function SpacingTokenPath_Level8_getInstance() {
    static_init_5();
    return SpacingTokenPath_Level8_instance;
  }
  function _get_$cachedSerializer__te6jhj_5($this) {
    return $this.s1c_1.q1();
  }
  function TypographyTokenPath$Companion$_anonymous__ftw18g() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.tokens.core.TypographyTokenPath', values_6());
  }
  var static_init_called_6;
  function static_init_6() {
    if (static_init_called_6)
      return Unit_instance;
    static_init_called_6 = true;
    TypographyTokenPath_StructureLevel1_instance = new TypographyTokenPath('StructureLevel1', 0, 'typography.structure.level1');
    TypographyTokenPath_StructureLevel2_instance = new TypographyTokenPath('StructureLevel2', 1, 'typography.structure.level2');
    TypographyTokenPath_StructureLevel3_instance = new TypographyTokenPath('StructureLevel3', 2, 'typography.structure.level3');
    TypographyTokenPath_StructureLevel4_instance = new TypographyTokenPath('StructureLevel4', 3, 'typography.structure.level4');
    TypographyTokenPath_StructureLevel5_instance = new TypographyTokenPath('StructureLevel5', 4, 'typography.structure.level5');
    TypographyTokenPath_StructureLevel6_instance = new TypographyTokenPath('StructureLevel6', 5, 'typography.structure.level6');
    TypographyTokenPath_ContentLevel1_instance = new TypographyTokenPath('ContentLevel1', 6, 'typography.content.level1');
    TypographyTokenPath_ContentLevel2_instance = new TypographyTokenPath('ContentLevel2', 7, 'typography.content.level2');
    TypographyTokenPath_ContentLevel3_instance = new TypographyTokenPath('ContentLevel3', 8, 'typography.content.level3');
    TypographyTokenPath_ContentLevel4_instance = new TypographyTokenPath('ContentLevel4', 9, 'typography.content.level4');
    TypographyTokenPath_ContentLevel5_instance = new TypographyTokenPath('ContentLevel5', 10, 'typography.content.level5');
    TypographyTokenPath_MetadataLevel1_instance = new TypographyTokenPath('MetadataLevel1', 11, 'typography.metadata.level1');
    TypographyTokenPath_MetadataLevel2_instance = new TypographyTokenPath('MetadataLevel2', 12, 'typography.metadata.level2');
    TypographyTokenPath_MetadataLevel3_instance = new TypographyTokenPath('MetadataLevel3', 13, 'typography.metadata.level3');
    if (Companion_instance_7 == null) {
      Companion_instance;
      new Companion_6();
    }
  }
  var TypographyTokenPath_StructureLevel1_instance;
  var TypographyTokenPath_StructureLevel2_instance;
  var TypographyTokenPath_StructureLevel3_instance;
  var TypographyTokenPath_StructureLevel4_instance;
  var TypographyTokenPath_StructureLevel5_instance;
  var TypographyTokenPath_StructureLevel6_instance;
  var TypographyTokenPath_ContentLevel1_instance;
  var TypographyTokenPath_ContentLevel2_instance;
  var TypographyTokenPath_ContentLevel3_instance;
  var TypographyTokenPath_ContentLevel4_instance;
  var TypographyTokenPath_ContentLevel5_instance;
  var TypographyTokenPath_MetadataLevel1_instance;
  var TypographyTokenPath_MetadataLevel2_instance;
  var TypographyTokenPath_MetadataLevel3_instance;
  function values_6() {
    static_init_6();
    return [TypographyTokenPath_StructureLevel1_getInstance(), TypographyTokenPath_StructureLevel2_getInstance(), TypographyTokenPath_StructureLevel3_getInstance(), TypographyTokenPath_StructureLevel4_getInstance(), TypographyTokenPath_StructureLevel5_getInstance(), TypographyTokenPath_StructureLevel6_getInstance(), TypographyTokenPath_ContentLevel1_getInstance(), TypographyTokenPath_ContentLevel2_getInstance(), TypographyTokenPath_ContentLevel3_getInstance(), TypographyTokenPath_ContentLevel4_getInstance(), TypographyTokenPath_ContentLevel5_getInstance(), TypographyTokenPath_MetadataLevel1_getInstance(), TypographyTokenPath_MetadataLevel2_getInstance(), TypographyTokenPath_MetadataLevel3_getInstance()];
  }
  function get_entries_6() {
    static_init_6();
    if ($ENTRIES_6 == null)
      $ENTRIES_6 = enumEntries(values_6());
    return $ENTRIES_6;
  }
  function Companion_6() {
    Companion_instance_7 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.s1c_1 = lazy(tmp_0, TypographyTokenPath$Companion$_anonymous__ftw18g);
  }
  protoOf(Companion_6).s18 = function () {
    return _get_$cachedSerializer__te6jhj_5(this);
  };
  var Companion_instance_7;
  function Companion_getInstance_5() {
    static_init_6();
    return Companion_instance_7;
  }
  var $ENTRIES_6;
  function TypographyTokenPath(name, ordinal, path) {
    Enum.call(this, name, ordinal);
    this.v1c_1 = path;
  }
  function resolveIn_6(_this__u8e3s4, typography) {
    var tmp;
    switch (_this__u8e3s4.z1_1) {
      case 0:
        tmp = typography.c1d_1.w1c_1;
        break;
      case 1:
        tmp = typography.c1d_1.x1c_1;
        break;
      case 2:
        tmp = typography.c1d_1.y1c_1;
        break;
      case 3:
        tmp = typography.c1d_1.z1c_1;
        break;
      case 4:
        tmp = typography.c1d_1.a1d_1;
        break;
      case 5:
        tmp = typography.c1d_1.b1d_1;
        break;
      case 6:
        tmp = typography.d1d_1.f1d_1;
        break;
      case 7:
        tmp = typography.d1d_1.g1d_1;
        break;
      case 8:
        tmp = typography.d1d_1.h1d_1;
        break;
      case 9:
        tmp = typography.d1d_1.i1d_1;
        break;
      case 10:
        tmp = typography.d1d_1.j1d_1;
        break;
      case 11:
        tmp = typography.e1d_1.k1d_1;
        break;
      case 12:
        tmp = typography.e1d_1.l1d_1;
        break;
      case 13:
        tmp = typography.e1d_1.m1d_1;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function TypographyTokenPath_StructureLevel1_getInstance() {
    static_init_6();
    return TypographyTokenPath_StructureLevel1_instance;
  }
  function TypographyTokenPath_StructureLevel2_getInstance() {
    static_init_6();
    return TypographyTokenPath_StructureLevel2_instance;
  }
  function TypographyTokenPath_StructureLevel3_getInstance() {
    static_init_6();
    return TypographyTokenPath_StructureLevel3_instance;
  }
  function TypographyTokenPath_StructureLevel4_getInstance() {
    static_init_6();
    return TypographyTokenPath_StructureLevel4_instance;
  }
  function TypographyTokenPath_StructureLevel5_getInstance() {
    static_init_6();
    return TypographyTokenPath_StructureLevel5_instance;
  }
  function TypographyTokenPath_StructureLevel6_getInstance() {
    static_init_6();
    return TypographyTokenPath_StructureLevel6_instance;
  }
  function TypographyTokenPath_ContentLevel1_getInstance() {
    static_init_6();
    return TypographyTokenPath_ContentLevel1_instance;
  }
  function TypographyTokenPath_ContentLevel2_getInstance() {
    static_init_6();
    return TypographyTokenPath_ContentLevel2_instance;
  }
  function TypographyTokenPath_ContentLevel3_getInstance() {
    static_init_6();
    return TypographyTokenPath_ContentLevel3_instance;
  }
  function TypographyTokenPath_ContentLevel4_getInstance() {
    static_init_6();
    return TypographyTokenPath_ContentLevel4_instance;
  }
  function TypographyTokenPath_ContentLevel5_getInstance() {
    static_init_6();
    return TypographyTokenPath_ContentLevel5_instance;
  }
  function TypographyTokenPath_MetadataLevel1_getInstance() {
    static_init_6();
    return TypographyTokenPath_MetadataLevel1_instance;
  }
  function TypographyTokenPath_MetadataLevel2_getInstance() {
    static_init_6();
    return TypographyTokenPath_MetadataLevel2_instance;
  }
  function TypographyTokenPath_MetadataLevel3_getInstance() {
    static_init_6();
    return TypographyTokenPath_MetadataLevel3_instance;
  }
  function _DpValue___init__impl__w9byic(value) {
    // Inline function 'kotlin.require' call
    if (!(isFinite(_DpValue___get_value__impl__1j6qu0(value)) && _DpValue___get_value__impl__1j6qu0(value) >= 0.0)) {
      var message = 'DpValue must be finite and >= 0, was ' + _DpValue___get_value__impl__1j6qu0(value) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return value;
  }
  function _DpValue___get_value__impl__1j6qu0($this) {
    return $this;
  }
  function Companion_7() {
  }
  var Companion_instance_8;
  function Companion_getInstance_6() {
    return Companion_instance_8;
  }
  function $serializer() {
    $serializer_instance = this;
    var tmp0_serialDesc = new InlineClassDescriptor('io.github.alph_a07.basis.theme.core.DpValue', this);
    tmp0_serialDesc.lp('value', false);
    this.n1d_1 = tmp0_serialDesc;
  }
  protoOf($serializer).o1d = function (encoder, value) {
    var tmp0_inlineEncoder = encoder.dk(this.n1d_1);
    if (tmp0_inlineEncoder == null)
      null;
    else {
      tmp0_inlineEncoder.yj(_DpValue___get_value__impl__1j6qu0(value));
    }
  };
  protoOf($serializer).yf = function (encoder, value) {
    return this.o1d(encoder, value instanceof DpValue ? value.p1d_1 : THROW_CCE());
  };
  protoOf($serializer).q1d = function (decoder) {
    return _DpValue___init__impl__w9byic(decoder.ui(this.n1d_1).pi());
  };
  protoOf($serializer).zf = function (decoder) {
    return new DpValue(this.q1d(decoder));
  };
  protoOf($serializer).xf = function () {
    return this.n1d_1;
  };
  protoOf($serializer).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [FloatSerializer_getInstance()];
  };
  var $serializer_instance;
  function $serializer_getInstance() {
    if ($serializer_instance == null)
      new $serializer();
    return $serializer_instance;
  }
  function DpValue__toString_impl_qlaqm4($this) {
    return 'DpValue(value=' + $this + ')';
  }
  function DpValue__hashCode_impl_4u4tt9($this) {
    return getNumberHashCode($this);
  }
  function DpValue__equals_impl_sadbav($this, other) {
    if (!(other instanceof DpValue))
      return false;
    var tmp0_other_with_cast = other.p1d_1;
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function DpValue(value) {
    this.p1d_1 = value;
  }
  protoOf(DpValue).toString = function () {
    return DpValue__toString_impl_qlaqm4(this.p1d_1);
  };
  protoOf(DpValue).hashCode = function () {
    return DpValue__hashCode_impl_4u4tt9(this.p1d_1);
  };
  protoOf(DpValue).equals = function (other) {
    return DpValue__equals_impl_sadbav(this.p1d_1, other);
  };
  function _DurationValue___init__impl__1d0n0c(milliseconds) {
    // Inline function 'kotlin.require' call
    if (!(compare(_DurationValue___get_milliseconds__impl__sn32kr(milliseconds), new Long(0, 0)) >= 0)) {
      var message = 'DurationValue must be non-negative, was ' + _DurationValue___get_milliseconds__impl__sn32kr(milliseconds).toString() + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return milliseconds;
  }
  function _DurationValue___get_milliseconds__impl__sn32kr($this) {
    return $this;
  }
  function Companion_8() {
  }
  var Companion_instance_9;
  function Companion_getInstance_7() {
    return Companion_instance_9;
  }
  function $serializer_0() {
    $serializer_instance_0 = this;
    var tmp0_serialDesc = new InlineClassDescriptor('io.github.alph_a07.basis.theme.core.DurationValue', this);
    tmp0_serialDesc.lp('milliseconds', false);
    this.r1d_1 = tmp0_serialDesc;
  }
  protoOf($serializer_0).s1d = function (encoder, value) {
    var tmp0_inlineEncoder = encoder.dk(this.r1d_1);
    if (tmp0_inlineEncoder == null)
      null;
    else {
      tmp0_inlineEncoder.xj(_DurationValue___get_milliseconds__impl__sn32kr(value));
    }
  };
  protoOf($serializer_0).yf = function (encoder, value) {
    return this.s1d(encoder, value instanceof DurationValue ? value.t1d_1 : THROW_CCE());
  };
  protoOf($serializer_0).u1d = function (decoder) {
    return _DurationValue___init__impl__1d0n0c(decoder.ui(this.r1d_1).oi());
  };
  protoOf($serializer_0).zf = function (decoder) {
    return new DurationValue(this.u1d(decoder));
  };
  protoOf($serializer_0).xf = function () {
    return this.r1d_1;
  };
  protoOf($serializer_0).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [LongSerializer_getInstance()];
  };
  var $serializer_instance_0;
  function $serializer_getInstance_0() {
    if ($serializer_instance_0 == null)
      new $serializer_0();
    return $serializer_instance_0;
  }
  function DurationValue__toString_impl_uuoon0($this) {
    return 'DurationValue(milliseconds=' + $this.toString() + ')';
  }
  function DurationValue__hashCode_impl_if9gj9($this) {
    return $this.hashCode();
  }
  function DurationValue__equals_impl_iqgolt($this, other) {
    if (!(other instanceof DurationValue))
      return false;
    var tmp0_other_with_cast = other.t1d_1;
    if (!equalsLong($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function DurationValue(milliseconds) {
    this.t1d_1 = milliseconds;
  }
  protoOf(DurationValue).toString = function () {
    return DurationValue__toString_impl_uuoon0(this.t1d_1);
  };
  protoOf(DurationValue).hashCode = function () {
    return DurationValue__hashCode_impl_if9gj9(this.t1d_1);
  };
  protoOf(DurationValue).equals = function (other) {
    return DurationValue__equals_impl_iqgolt(this.t1d_1, other);
  };
  function _EmValue___init__impl__8haeq8(em) {
    // Inline function 'kotlin.require' call
    if (!isFinite(_EmValue___get_em__impl__1q8ktd(em))) {
      var message = 'EmValue must be finite, was ' + _EmValue___get_em__impl__1q8ktd(em) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return em;
  }
  function _EmValue___get_em__impl__1q8ktd($this) {
    return $this;
  }
  function Companion_9() {
  }
  var Companion_instance_10;
  function Companion_getInstance_8() {
    return Companion_instance_10;
  }
  function $serializer_1() {
    $serializer_instance_1 = this;
    var tmp0_serialDesc = new InlineClassDescriptor('io.github.alph_a07.basis.theme.core.EmValue', this);
    tmp0_serialDesc.lp('em', false);
    this.v1d_1 = tmp0_serialDesc;
  }
  protoOf($serializer_1).w1d = function (encoder, value) {
    var tmp0_inlineEncoder = encoder.dk(this.v1d_1);
    if (tmp0_inlineEncoder == null)
      null;
    else {
      tmp0_inlineEncoder.yj(_EmValue___get_em__impl__1q8ktd(value));
    }
  };
  protoOf($serializer_1).yf = function (encoder, value) {
    return this.w1d(encoder, value instanceof EmValue ? value.x1d_1 : THROW_CCE());
  };
  protoOf($serializer_1).y1d = function (decoder) {
    return _EmValue___init__impl__8haeq8(decoder.ui(this.v1d_1).pi());
  };
  protoOf($serializer_1).zf = function (decoder) {
    return new EmValue(this.y1d(decoder));
  };
  protoOf($serializer_1).xf = function () {
    return this.v1d_1;
  };
  protoOf($serializer_1).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [FloatSerializer_getInstance()];
  };
  var $serializer_instance_1;
  function $serializer_getInstance_1() {
    if ($serializer_instance_1 == null)
      new $serializer_1();
    return $serializer_instance_1;
  }
  function EmValue__toString_impl_hlltwo($this) {
    return 'EmValue(em=' + $this + ')';
  }
  function EmValue__hashCode_impl_vocb9l($this) {
    return getNumberHashCode($this);
  }
  function EmValue__equals_impl_6uk1wl($this, other) {
    if (!(other instanceof EmValue))
      return false;
    var tmp0_other_with_cast = other.x1d_1;
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function EmValue(em) {
    this.x1d_1 = em;
  }
  protoOf(EmValue).toString = function () {
    return EmValue__toString_impl_hlltwo(this.x1d_1);
  };
  protoOf(EmValue).hashCode = function () {
    return EmValue__hashCode_impl_vocb9l(this.x1d_1);
  };
  protoOf(EmValue).equals = function (other) {
    return EmValue__equals_impl_6uk1wl(this.x1d_1, other);
  };
  function _FontWeightValue___init__impl__p0bmnj(weight) {
    var tmp;
    var containsArg = _FontWeightValue___get_weight__impl__w0h7ri(weight);
    if (100 <= containsArg ? containsArg <= 900 : false) {
      tmp = (_FontWeightValue___get_weight__impl__w0h7ri(weight) % 100 | 0) === 0;
    } else {
      tmp = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp) {
      var message = 'FontWeightValue must be 100..900 in steps of 100, was ' + _FontWeightValue___get_weight__impl__w0h7ri(weight) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return weight;
  }
  function _FontWeightValue___get_weight__impl__w0h7ri($this) {
    return $this;
  }
  function Companion_10() {
    this.z1d_1 = 100;
    this.a1e_1 = 900;
    this.b1e_1 = 100;
  }
  var Companion_instance_11;
  function Companion_getInstance_9() {
    return Companion_instance_11;
  }
  function $serializer_2() {
    $serializer_instance_2 = this;
    var tmp0_serialDesc = new InlineClassDescriptor('io.github.alph_a07.basis.theme.core.FontWeightValue', this);
    tmp0_serialDesc.lp('weight', false);
    this.c1e_1 = tmp0_serialDesc;
  }
  protoOf($serializer_2).d1e = function (encoder, value) {
    var tmp0_inlineEncoder = encoder.dk(this.c1e_1);
    if (tmp0_inlineEncoder == null)
      null;
    else {
      tmp0_inlineEncoder.wj(_FontWeightValue___get_weight__impl__w0h7ri(value));
    }
  };
  protoOf($serializer_2).yf = function (encoder, value) {
    return this.d1e(encoder, value instanceof FontWeightValue ? value.e1e_1 : THROW_CCE());
  };
  protoOf($serializer_2).f1e = function (decoder) {
    return _FontWeightValue___init__impl__p0bmnj(decoder.ui(this.c1e_1).ni());
  };
  protoOf($serializer_2).zf = function (decoder) {
    return new FontWeightValue(this.f1e(decoder));
  };
  protoOf($serializer_2).xf = function () {
    return this.c1e_1;
  };
  protoOf($serializer_2).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [IntSerializer_getInstance()];
  };
  var $serializer_instance_2;
  function $serializer_getInstance_2() {
    if ($serializer_instance_2 == null)
      new $serializer_2();
    return $serializer_instance_2;
  }
  function FontWeightValue__toString_impl_1xdtxz($this) {
    return 'FontWeightValue(weight=' + $this + ')';
  }
  function FontWeightValue__hashCode_impl_jts2uw($this) {
    return $this;
  }
  function FontWeightValue__equals_impl_4ai718($this, other) {
    if (!(other instanceof FontWeightValue))
      return false;
    if (!($this === other.e1e_1))
      return false;
    return true;
  }
  function FontWeightValue(weight) {
    this.e1e_1 = weight;
  }
  protoOf(FontWeightValue).toString = function () {
    return FontWeightValue__toString_impl_1xdtxz(this.e1e_1);
  };
  protoOf(FontWeightValue).hashCode = function () {
    return FontWeightValue__hashCode_impl_jts2uw(this.e1e_1);
  };
  protoOf(FontWeightValue).equals = function (other) {
    return FontWeightValue__equals_impl_4ai718(this.e1e_1, other);
  };
  function _LineHeightValue___init__impl__8eeut9(multiplier) {
    // Inline function 'kotlin.require' call
    if (!(isFinite(_LineHeightValue___get_multiplier__impl__uy9oqd(multiplier)) && _LineHeightValue___get_multiplier__impl__uy9oqd(multiplier) > 0.0)) {
      var message = 'LineHeight must be finite and > 0, was ' + _LineHeightValue___get_multiplier__impl__uy9oqd(multiplier) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return multiplier;
  }
  function _LineHeightValue___get_multiplier__impl__uy9oqd($this) {
    return $this;
  }
  function Companion_11() {
  }
  var Companion_instance_12;
  function Companion_getInstance_10() {
    return Companion_instance_12;
  }
  function $serializer_3() {
    $serializer_instance_3 = this;
    var tmp0_serialDesc = new InlineClassDescriptor('io.github.alph_a07.basis.theme.core.LineHeightValue', this);
    tmp0_serialDesc.lp('multiplier', false);
    this.g1e_1 = tmp0_serialDesc;
  }
  protoOf($serializer_3).h1e = function (encoder, value) {
    var tmp0_inlineEncoder = encoder.dk(this.g1e_1);
    if (tmp0_inlineEncoder == null)
      null;
    else {
      tmp0_inlineEncoder.yj(_LineHeightValue___get_multiplier__impl__uy9oqd(value));
    }
  };
  protoOf($serializer_3).yf = function (encoder, value) {
    return this.h1e(encoder, value instanceof LineHeightValue ? value.i1e_1 : THROW_CCE());
  };
  protoOf($serializer_3).j1e = function (decoder) {
    return _LineHeightValue___init__impl__8eeut9(decoder.ui(this.g1e_1).pi());
  };
  protoOf($serializer_3).zf = function (decoder) {
    return new LineHeightValue(this.j1e(decoder));
  };
  protoOf($serializer_3).xf = function () {
    return this.g1e_1;
  };
  protoOf($serializer_3).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [FloatSerializer_getInstance()];
  };
  var $serializer_instance_3;
  function $serializer_getInstance_3() {
    if ($serializer_instance_3 == null)
      new $serializer_3();
    return $serializer_instance_3;
  }
  function LineHeightValue__toString_impl_ruhy8l($this) {
    return 'LineHeightValue(multiplier=' + $this + ')';
  }
  function LineHeightValue__hashCode_impl_lfg6xo($this) {
    return getNumberHashCode($this);
  }
  function LineHeightValue__equals_impl_j94bk8($this, other) {
    if (!(other instanceof LineHeightValue))
      return false;
    var tmp0_other_with_cast = other.i1e_1;
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function LineHeightValue(multiplier) {
    this.i1e_1 = multiplier;
  }
  protoOf(LineHeightValue).toString = function () {
    return LineHeightValue__toString_impl_ruhy8l(this.i1e_1);
  };
  protoOf(LineHeightValue).hashCode = function () {
    return LineHeightValue__hashCode_impl_lfg6xo(this.i1e_1);
  };
  protoOf(LineHeightValue).equals = function (other) {
    return LineHeightValue__equals_impl_j94bk8(this.i1e_1, other);
  };
  function _SpValue___init__impl__k65sm3(value) {
    // Inline function 'kotlin.require' call
    if (!(isFinite(_SpValue___get_value__impl__65u6pl(value)) && _SpValue___get_value__impl__65u6pl(value) >= 0.0)) {
      var message = 'SpValue must be finite and >= 0, was ' + _SpValue___get_value__impl__65u6pl(value) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return value;
  }
  function _SpValue___get_value__impl__65u6pl($this) {
    return $this;
  }
  function Companion_12() {
  }
  var Companion_instance_13;
  function Companion_getInstance_11() {
    return Companion_instance_13;
  }
  function $serializer_4() {
    $serializer_instance_4 = this;
    var tmp0_serialDesc = new InlineClassDescriptor('io.github.alph_a07.basis.theme.core.SpValue', this);
    tmp0_serialDesc.lp('value', false);
    this.k1e_1 = tmp0_serialDesc;
  }
  protoOf($serializer_4).l1e = function (encoder, value) {
    var tmp0_inlineEncoder = encoder.dk(this.k1e_1);
    if (tmp0_inlineEncoder == null)
      null;
    else {
      tmp0_inlineEncoder.yj(_SpValue___get_value__impl__65u6pl(value));
    }
  };
  protoOf($serializer_4).yf = function (encoder, value) {
    return this.l1e(encoder, value instanceof SpValue ? value.m1e_1 : THROW_CCE());
  };
  protoOf($serializer_4).n1e = function (decoder) {
    return _SpValue___init__impl__k65sm3(decoder.ui(this.k1e_1).pi());
  };
  protoOf($serializer_4).zf = function (decoder) {
    return new SpValue(this.n1e(decoder));
  };
  protoOf($serializer_4).xf = function () {
    return this.k1e_1;
  };
  protoOf($serializer_4).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [FloatSerializer_getInstance()];
  };
  var $serializer_instance_4;
  function $serializer_getInstance_4() {
    if ($serializer_instance_4 == null)
      new $serializer_4();
    return $serializer_instance_4;
  }
  function SpValue__toString_impl_i7ztzh($this) {
    return 'SpValue(value=' + $this + ')';
  }
  function SpValue__hashCode_impl_3j62te($this) {
    return getNumberHashCode($this);
  }
  function SpValue__equals_impl_ccsysa($this, other) {
    if (!(other instanceof SpValue))
      return false;
    var tmp0_other_with_cast = other.m1e_1;
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function SpValue(value) {
    this.m1e_1 = value;
  }
  protoOf(SpValue).toString = function () {
    return SpValue__toString_impl_i7ztzh(this.m1e_1);
  };
  protoOf(SpValue).hashCode = function () {
    return SpValue__hashCode_impl_3j62te(this.m1e_1);
  };
  protoOf(SpValue).equals = function (other) {
    return SpValue__equals_impl_ccsysa(this.m1e_1, other);
  };
  function _get_$cachedSerializer__te6jhj_6($this) {
    return $this.o1e_1.q1();
  }
  function ThemeMode$Companion$_anonymous__5ek77() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.core.ThemeMode', values_7());
  }
  var static_init_called_7;
  function static_init_7() {
    if (static_init_called_7)
      return Unit_instance;
    static_init_called_7 = true;
    ThemeMode_Light_instance = new ThemeMode('Light', 0);
    ThemeMode_Dark_instance = new ThemeMode('Dark', 1);
    if (Companion_instance_14 == null) {
      Companion_instance;
      new Companion_13();
    }
  }
  var ThemeMode_Light_instance;
  var ThemeMode_Dark_instance;
  function values_7() {
    static_init_7();
    return [ThemeMode_Light_getInstance(), ThemeMode_Dark_getInstance()];
  }
  function Companion_13() {
    Companion_instance_14 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.o1e_1 = lazy(tmp_0, ThemeMode$Companion$_anonymous__5ek77);
  }
  protoOf(Companion_13).s18 = function () {
    return _get_$cachedSerializer__te6jhj_6(this);
  };
  var Companion_instance_14;
  function Companion_getInstance_12() {
    static_init_7();
    return Companion_instance_14;
  }
  function ThemeMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ThemeMode_Light_getInstance() {
    static_init_7();
    return ThemeMode_Light_instance;
  }
  function ThemeMode_Dark_getInstance() {
    static_init_7();
    return ThemeMode_Dark_instance;
  }
  function Companion_14() {
  }
  var Companion_instance_15;
  function Companion_getInstance_13() {
    return Companion_instance_15;
  }
  function $serializer_5() {
    $serializer_instance_5 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', this, 1);
    tmp0_serialDesc.lp('value', false);
    this.p1e_1 = tmp0_serialDesc;
  }
  protoOf($serializer_5).q1e = function (encoder, value) {
    var tmp0_desc = this.p1e_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.mk(tmp0_desc, 0, value.r1e_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_5).yf = function (encoder, value) {
    return this.q1e(encoder, value instanceof Hex ? value : THROW_CCE());
  };
  protoOf($serializer_5).zf = function (decoder) {
    var tmp0_desc = this.p1e_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.hj(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.hj(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Hex_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_5).xf = function () {
    return this.p1e_1;
  };
  protoOf($serializer_5).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance()];
  };
  var $serializer_instance_5;
  function $serializer_getInstance_5() {
    if ($serializer_instance_5 == null)
      new $serializer_5();
    return $serializer_instance_5;
  }
  function Hex_init_$Init$(seen0, value, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_5().p1e_1);
    }
    $this.r1e_1 = value;
    return $this;
  }
  function Hex_init_$Create$(seen0, value, serializationConstructorMarker) {
    return Hex_init_$Init$(seen0, value, serializationConstructorMarker, objectCreate(protoOf(Hex)));
  }
  function Companion_15() {
  }
  var Companion_instance_16;
  function Companion_getInstance_14() {
    return Companion_instance_16;
  }
  function $serializer_6() {
    $serializer_instance_6 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.core.color.ColorSpec.Argb', this, 1);
    tmp0_serialDesc.lp('argb', false);
    this.s1e_1 = tmp0_serialDesc;
  }
  protoOf($serializer_6).t1e = function (encoder, value) {
    var tmp0_desc = this.s1e_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.hk(tmp0_desc, 0, value.u1e_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_6).yf = function (encoder, value) {
    return this.t1e(encoder, value instanceof Argb ? value : THROW_CCE());
  };
  protoOf($serializer_6).zf = function (decoder) {
    var tmp0_desc = this.s1e_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = 0;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.cj(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.cj(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Argb_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_6).xf = function () {
    return this.s1e_1;
  };
  protoOf($serializer_6).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [IntSerializer_getInstance()];
  };
  var $serializer_instance_6;
  function $serializer_getInstance_6() {
    if ($serializer_instance_6 == null)
      new $serializer_6();
    return $serializer_instance_6;
  }
  function Argb_init_$Init$(seen0, argb, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_6().s1e_1);
    }
    $this.u1e_1 = argb;
    return $this;
  }
  function Argb_init_$Create$(seen0, argb, serializationConstructorMarker) {
    return Argb_init_$Init$(seen0, argb, serializationConstructorMarker, objectCreate(protoOf(Argb)));
  }
  function Companion_16() {
  }
  var Companion_instance_17;
  function Companion_getInstance_15() {
    return Companion_instance_17;
  }
  function $serializer_7() {
    $serializer_instance_7 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.core.color.ColorSpec.Hsl', this, 4);
    tmp0_serialDesc.lp('h', false);
    tmp0_serialDesc.lp('s', false);
    tmp0_serialDesc.lp('l', false);
    tmp0_serialDesc.lp('a', true);
    this.v1e_1 = tmp0_serialDesc;
  }
  protoOf($serializer_7).w1e = function (encoder, value) {
    var tmp0_desc = this.v1e_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.jk(tmp0_desc, 0, value.x1e_1);
    tmp1_output.jk(tmp0_desc, 1, value.y1e_1);
    tmp1_output.jk(tmp0_desc, 2, value.z1e_1);
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !equals(value.a1f_1, 1.0)) {
      tmp1_output.jk(tmp0_desc, 3, value.a1f_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_7).yf = function (encoder, value) {
    return this.w1e(encoder, value instanceof Hsl ? value : THROW_CCE());
  };
  protoOf($serializer_7).zf = function (decoder) {
    var tmp0_desc = this.v1e_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = 0.0;
    var tmp5_local1 = 0.0;
    var tmp6_local2 = 0.0;
    var tmp7_local3 = 0.0;
    var tmp8_input = decoder.xi(tmp0_desc);
    if (tmp8_input.nj()) {
      tmp4_local0 = tmp8_input.ej(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.ej(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.ej(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.ej(tmp0_desc, 3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.ej(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.ej(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.ej(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.ej(tmp0_desc, 3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.yi(tmp0_desc);
    return Hsl_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_7).xf = function () {
    return this.v1e_1;
  };
  protoOf($serializer_7).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [FloatSerializer_getInstance(), FloatSerializer_getInstance(), FloatSerializer_getInstance(), FloatSerializer_getInstance()];
  };
  var $serializer_instance_7;
  function $serializer_getInstance_7() {
    if ($serializer_instance_7 == null)
      new $serializer_7();
    return $serializer_instance_7;
  }
  function Hsl_init_$Init$(seen0, h, s, l, a, serializationConstructorMarker, $this) {
    if (!(7 === (7 & seen0))) {
      throwMissingFieldException(seen0, 7, $serializer_getInstance_7().v1e_1);
    }
    $this.x1e_1 = h;
    $this.y1e_1 = s;
    $this.z1e_1 = l;
    if (0 === (seen0 & 8))
      $this.a1f_1 = 1.0;
    else
      $this.a1f_1 = a;
    return $this;
  }
  function Hsl_init_$Create$(seen0, h, s, l, a, serializationConstructorMarker) {
    return Hsl_init_$Init$(seen0, h, s, l, a, serializationConstructorMarker, objectCreate(protoOf(Hsl)));
  }
  function Hex(value) {
    this.r1e_1 = value;
  }
  protoOf(Hex).toString = function () {
    return 'Hex(value=' + this.r1e_1 + ')';
  };
  protoOf(Hex).hashCode = function () {
    return getStringHashCode(this.r1e_1);
  };
  protoOf(Hex).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Hex))
      return false;
    if (!(this.r1e_1 === other.r1e_1))
      return false;
    return true;
  };
  function Argb(argb) {
    this.u1e_1 = argb;
  }
  protoOf(Argb).toString = function () {
    return 'Argb(argb=' + this.u1e_1 + ')';
  };
  protoOf(Argb).hashCode = function () {
    return this.u1e_1;
  };
  protoOf(Argb).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Argb))
      return false;
    if (!(this.u1e_1 === other.u1e_1))
      return false;
    return true;
  };
  function Hsl(h, s, l, a) {
    a = a === VOID ? 1.0 : a;
    this.x1e_1 = h;
    this.y1e_1 = s;
    this.z1e_1 = l;
    this.a1f_1 = a;
  }
  protoOf(Hsl).toString = function () {
    return 'Hsl(h=' + this.x1e_1 + ', s=' + this.y1e_1 + ', l=' + this.z1e_1 + ', a=' + this.a1f_1 + ')';
  };
  protoOf(Hsl).hashCode = function () {
    var result = getNumberHashCode(this.x1e_1);
    result = imul(result, 31) + getNumberHashCode(this.y1e_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.z1e_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.a1f_1) | 0;
    return result;
  };
  protoOf(Hsl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Hsl))
      return false;
    if (!equals(this.x1e_1, other.x1e_1))
      return false;
    if (!equals(this.y1e_1, other.y1e_1))
      return false;
    if (!equals(this.z1e_1, other.z1e_1))
      return false;
    if (!equals(this.a1f_1, other.a1f_1))
      return false;
    return true;
  };
  function Companion_17() {
  }
  protoOf(Companion_17).s18 = function () {
    var tmp = getKClass(ColorSpec);
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [getKClass(Argb), getKClass(Hex), getKClass(Hsl), getKClass(Oklch)];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_1 = [$serializer_getInstance_6(), $serializer_getInstance_5(), $serializer_getInstance_7(), $serializer_getInstance_8()];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$6 = [];
    return SealedClassSerializer_init_$Create$('io.github.alph_a07.basis.theme.core.color.ColorSpec', tmp, tmp_0, tmp_1, tmp$ret$6);
  };
  var Companion_instance_18;
  function Companion_getInstance_16() {
    return Companion_instance_18;
  }
  function ColorSpec() {
  }
  function LinearSrgb(r, g, b) {
    this.b1f_1 = r;
    this.c1f_1 = g;
    this.d1f_1 = b;
  }
  protoOf(LinearSrgb).toString = function () {
    return 'LinearSrgb(r=' + this.b1f_1 + ', g=' + this.c1f_1 + ', b=' + this.d1f_1 + ')';
  };
  protoOf(LinearSrgb).hashCode = function () {
    var result = getNumberHashCode(this.b1f_1);
    result = imul(result, 31) + getNumberHashCode(this.c1f_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.d1f_1) | 0;
    return result;
  };
  protoOf(LinearSrgb).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LinearSrgb))
      return false;
    if (!equals(this.b1f_1, other.b1f_1))
      return false;
    if (!equals(this.c1f_1, other.c1f_1))
      return false;
    if (!equals(this.d1f_1, other.d1f_1))
      return false;
    return true;
  };
  function Companion_18() {
  }
  var Companion_instance_19;
  function Companion_getInstance_17() {
    return Companion_instance_19;
  }
  function $serializer_8() {
    $serializer_instance_8 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.core.color.Oklch', this, 4);
    tmp0_serialDesc.lp('l', false);
    tmp0_serialDesc.lp('c', false);
    tmp0_serialDesc.lp('h', false);
    tmp0_serialDesc.lp('a', true);
    this.e1f_1 = tmp0_serialDesc;
  }
  protoOf($serializer_8).f1f = function (encoder, value) {
    var tmp0_desc = this.e1f_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.jk(tmp0_desc, 0, value.g1f_1);
    tmp1_output.jk(tmp0_desc, 1, value.h1f_1);
    tmp1_output.jk(tmp0_desc, 2, value.i1f_1);
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !equals(value.j1f_1, 1.0)) {
      tmp1_output.jk(tmp0_desc, 3, value.j1f_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_8).yf = function (encoder, value) {
    return this.f1f(encoder, value instanceof Oklch ? value : THROW_CCE());
  };
  protoOf($serializer_8).zf = function (decoder) {
    var tmp0_desc = this.e1f_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = 0.0;
    var tmp5_local1 = 0.0;
    var tmp6_local2 = 0.0;
    var tmp7_local3 = 0.0;
    var tmp8_input = decoder.xi(tmp0_desc);
    if (tmp8_input.nj()) {
      tmp4_local0 = tmp8_input.ej(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.ej(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.ej(tmp0_desc, 2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.ej(tmp0_desc, 3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.ej(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.ej(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.ej(tmp0_desc, 2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.ej(tmp0_desc, 3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.yi(tmp0_desc);
    return Oklch_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_8).xf = function () {
    return this.e1f_1;
  };
  protoOf($serializer_8).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [FloatSerializer_getInstance(), FloatSerializer_getInstance(), FloatSerializer_getInstance(), FloatSerializer_getInstance()];
  };
  var $serializer_instance_8;
  function $serializer_getInstance_8() {
    if ($serializer_instance_8 == null)
      new $serializer_8();
    return $serializer_instance_8;
  }
  function Oklch_init_$Init$(seen0, l, c, h, a, serializationConstructorMarker, $this) {
    if (!(7 === (7 & seen0))) {
      throwMissingFieldException(seen0, 7, $serializer_getInstance_8().e1f_1);
    }
    $this.g1f_1 = l;
    $this.h1f_1 = c;
    $this.i1f_1 = h;
    if (0 === (seen0 & 8))
      $this.j1f_1 = 1.0;
    else
      $this.j1f_1 = a;
    var tmp;
    if (isFinite($this.g1f_1)) {
      var containsArg = $this.g1f_1;
      tmp = 0.0 <= containsArg ? containsArg <= 1.0 : false;
    } else {
      tmp = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp) {
      var message = 'Oklch.l must be in 0..1, was ' + $this.g1f_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(isFinite($this.h1f_1) && $this.h1f_1 >= 0.0)) {
      var message_0 = 'Oklch.c must be finite and >= 0, was ' + $this.h1f_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var tmp_0;
    if (isFinite($this.i1f_1)) {
      var containsArg_0 = $this.i1f_1;
      tmp_0 = 0.0 <= containsArg_0 ? containsArg_0 <= 360.0 : false;
    } else {
      tmp_0 = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp_0) {
      var message_1 = 'Oklch.h must be in [0, 360], was ' + $this.i1f_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
    var tmp_1;
    if (isFinite($this.j1f_1)) {
      var containsArg_1 = $this.j1f_1;
      tmp_1 = 0.0 <= containsArg_1 ? containsArg_1 <= 1.0 : false;
    } else {
      tmp_1 = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp_1) {
      var message_2 = 'Oklch.a must be in 0..1, was ' + $this.j1f_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_2));
    }
    return $this;
  }
  function Oklch_init_$Create$(seen0, l, c, h, a, serializationConstructorMarker) {
    return Oklch_init_$Init$(seen0, l, c, h, a, serializationConstructorMarker, objectCreate(protoOf(Oklch)));
  }
  function Oklch(l, c, h, a) {
    a = a === VOID ? 1.0 : a;
    this.g1f_1 = l;
    this.h1f_1 = c;
    this.i1f_1 = h;
    this.j1f_1 = a;
    var tmp;
    if (isFinite(this.g1f_1)) {
      var containsArg = this.g1f_1;
      tmp = 0.0 <= containsArg ? containsArg <= 1.0 : false;
    } else {
      tmp = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp) {
      var message = 'Oklch.l must be in 0..1, was ' + this.g1f_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(isFinite(this.h1f_1) && this.h1f_1 >= 0.0)) {
      var message_0 = 'Oklch.c must be finite and >= 0, was ' + this.h1f_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var tmp_0;
    if (isFinite(this.i1f_1)) {
      var containsArg_0 = this.i1f_1;
      tmp_0 = 0.0 <= containsArg_0 ? containsArg_0 <= 360.0 : false;
    } else {
      tmp_0 = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp_0) {
      var message_1 = 'Oklch.h must be in [0, 360], was ' + this.i1f_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
    var tmp_1;
    if (isFinite(this.j1f_1)) {
      var containsArg_1 = this.j1f_1;
      tmp_1 = 0.0 <= containsArg_1 ? containsArg_1 <= 1.0 : false;
    } else {
      tmp_1 = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp_1) {
      var message_2 = 'Oklch.a must be in 0..1, was ' + this.j1f_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_2));
    }
  }
  protoOf(Oklch).toString = function () {
    return 'Oklch(l=' + formatDeterministic(this.g1f_1) + ', c=' + formatDeterministic(this.h1f_1) + ', h=' + formatDeterministic(this.i1f_1) + ', a=' + formatDeterministic(this.j1f_1) + ')';
  };
  protoOf(Oklch).k1f = function (l, c, h, a) {
    return new Oklch(l, c, h, a);
  };
  protoOf(Oklch).l1f = function (l, c, h, a, $super) {
    l = l === VOID ? this.g1f_1 : l;
    c = c === VOID ? this.h1f_1 : c;
    h = h === VOID ? this.i1f_1 : h;
    a = a === VOID ? this.j1f_1 : a;
    return $super === VOID ? this.k1f(l, c, h, a) : $super.k1f.call(this, l, c, h, a);
  };
  protoOf(Oklch).hashCode = function () {
    var result = getNumberHashCode(this.g1f_1);
    result = imul(result, 31) + getNumberHashCode(this.h1f_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.i1f_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.j1f_1) | 0;
    return result;
  };
  protoOf(Oklch).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Oklch))
      return false;
    if (!equals(this.g1f_1, other.g1f_1))
      return false;
    if (!equals(this.h1f_1, other.h1f_1))
      return false;
    if (!equals(this.i1f_1, other.i1f_1))
      return false;
    if (!equals(this.j1f_1, other.j1f_1))
      return false;
    return true;
  };
  function get_HEX_SHAPE() {
    _init_properties_OklchConversion_kt__7rmdo9();
    return HEX_SHAPE;
  }
  var HEX_SHAPE;
  function get_OKLAB_MATRIX() {
    _init_properties_OklchConversion_kt__7rmdo9();
    return OKLAB_MATRIX;
  }
  var OKLAB_MATRIX;
  function get_OKLAB_LIGHTNESS() {
    _init_properties_OklchConversion_kt__7rmdo9();
    return OKLAB_LIGHTNESS;
  }
  var OKLAB_LIGHTNESS;
  function get_OKLAB_AXIS_A() {
    _init_properties_OklchConversion_kt__7rmdo9();
    return OKLAB_AXIS_A;
  }
  var OKLAB_AXIS_A;
  function get_OKLAB_AXIS_B() {
    _init_properties_OklchConversion_kt__7rmdo9();
    return OKLAB_AXIS_B;
  }
  var OKLAB_AXIS_B;
  function toOklchOrNull(_this__u8e3s4) {
    _init_properties_OklchConversion_kt__7rmdo9();
    var tmp;
    if (_this__u8e3s4 instanceof Hex) {
      tmp = hexToOklch(_this__u8e3s4.r1e_1);
    } else {
      if (_this__u8e3s4 instanceof Argb) {
        tmp = argbToOklch(_this__u8e3s4.u1e_1);
      } else {
        if (_this__u8e3s4 instanceof Hsl) {
          tmp = hslToOklch(_this__u8e3s4.x1e_1, _this__u8e3s4.y1e_1, _this__u8e3s4.z1e_1, _this__u8e3s4.a1f_1);
        } else {
          if (_this__u8e3s4 instanceof Oklch) {
            tmp = _this__u8e3s4;
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    return tmp;
  }
  function safeOklch(l, c, h, a) {
    a = a === VOID ? 1.0 : a;
    _init_properties_OklchConversion_kt__7rmdo9();
    return new Oklch(coerceToFloat32(coerceIn(l, 0.0, 1.0)), coerceToFloat32(coerceAtLeast(c, 0.0)), coerceToFloat32(wrapHue(h)), coerceToFloat32(coerceIn(a, 0.0, 1.0)));
  }
  function hexToOklch(value) {
    _init_properties_OklchConversion_kt__7rmdo9();
    var digits = removePrefix(value, '#');
    if (!get_HEX_SHAPE().w9(digits)) {
      return null;
    }
    // Inline function 'kotlin.collections.map' call
    var this_0 = chunked(digits, 2);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$2 = toIntOrNull(item, 16);
      destination.f(tmp$ret$2);
    }
    var channels = destination;
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var tmp;
      if (isInterface(channels, Collection)) {
        tmp = channels.p();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$3 = false;
        break $l$block_0;
      }
      var _iterator__ex2g4s_0 = channels.j();
      while (_iterator__ex2g4s_0.k()) {
        var element = _iterator__ex2g4s_0.l();
        if (element == null) {
          tmp$ret$3 = true;
          break $l$block_0;
        }
      }
      tmp$ret$3 = false;
    }
    if (tmp$ret$3) {
      return null;
    }
    var values = filterNotNull(channels);
    var tmp0_elvis_lhs = getOrNull(values, 3);
    var alpha = tmp0_elvis_lhs == null ? 255 : tmp0_elvis_lhs;
    return srgbToOklch(values.n(0) / 255.0, values.n(1) / 255.0, values.n(2) / 255.0, alpha / 255.0);
  }
  function argbToOklch(argb) {
    _init_properties_OklchConversion_kt__7rmdo9();
    return srgbToOklch(argbToOklch$channel(argb, 16), argbToOklch$channel(argb, 8), argbToOklch$channel(argb, 0), argbToOklch$channel(argb, 24));
  }
  function hslToOklch(h, s, l, a) {
    _init_properties_OklchConversion_kt__7rmdo9();
    // Inline function 'kotlin.math.abs' call
    var x = 2.0 * l - 1.0;
    var chroma = (1.0 - Math.abs(x)) * s;
    var huePrime = wrapHue(h) / 60.0;
    // Inline function 'kotlin.math.abs' call
    var x_0 = huePrime % 2.0 - 1.0;
    var secondary = chroma * (1.0 - Math.abs(x_0));
    var _destruct__k2r9zo = hueSector(numberToInt(huePrime), chroma, secondary);
    var red = _destruct__k2r9zo.bb();
    var green = _destruct__k2r9zo.cb();
    var blue = _destruct__k2r9zo.de();
    var lightness = l - chroma / 2.0;
    return srgbToOklch(red + lightness, green + lightness, blue + lightness, a);
  }
  function srgbToOklch(r, g, b, a) {
    _init_properties_OklchConversion_kt__7rmdo9();
    var linearR = toLinear(r);
    var linearG = toLinear(g);
    var linearB = toLinear(b);
    var lmsLong = get_OKLAB_MATRIX()[0] * linearR + get_OKLAB_MATRIX()[1] * linearG + get_OKLAB_MATRIX()[2] * linearB;
    var lmsMedium = get_OKLAB_MATRIX()[3] * linearR + get_OKLAB_MATRIX()[4] * linearG + get_OKLAB_MATRIX()[5] * linearB;
    var lmsShort = get_OKLAB_MATRIX()[6] * linearR + get_OKLAB_MATRIX()[7] * linearG + get_OKLAB_MATRIX()[8] * linearB;
    // Inline function 'kotlin.math.cbrt' call
    var rootLong = Math.cbrt(lmsLong);
    // Inline function 'kotlin.math.cbrt' call
    var rootMedium = Math.cbrt(lmsMedium);
    // Inline function 'kotlin.math.cbrt' call
    var rootShort = Math.cbrt(lmsShort);
    var axisA = get_OKLAB_AXIS_A()[0] * rootLong + get_OKLAB_AXIS_A()[1] * rootMedium + get_OKLAB_AXIS_A()[2] * rootShort;
    var axisB = get_OKLAB_AXIS_B()[0] * rootLong + get_OKLAB_AXIS_B()[1] * rootMedium + get_OKLAB_AXIS_B()[2] * rootShort;
    // Inline function 'kotlin.math.sqrt' call
    var x = axisA * axisA + axisB * axisB;
    var chroma = Math.sqrt(x);
    var effectiveChroma = chroma <= 1.0E-4 ? 0.0 : chroma;
    var tmp;
    if (effectiveChroma === 0.0) {
      tmp = 0.0;
    } else {
      // Inline function 'kotlin.math.atan2' call
      var deg = Math.atan2(axisB, axisA) * (180.0 / 3.141592653589793);
      tmp = deg < 0.0 ? deg + 360.0 : deg;
    }
    var hue = tmp;
    var lightness = get_OKLAB_LIGHTNESS()[0] * rootLong + get_OKLAB_LIGHTNESS()[1] * rootMedium + get_OKLAB_LIGHTNESS()[2] * rootShort;
    return safeOklch(toFloat32(lightness), toFloat32(effectiveChroma), toFloat32(hue), a);
  }
  function hueSector(sector, chroma, secondary) {
    _init_properties_OklchConversion_kt__7rmdo9();
    var tmp;
    switch (sector) {
      case 0:
        tmp = new Triple(chroma, secondary, 0.0);
        break;
      case 1:
        tmp = new Triple(secondary, chroma, 0.0);
        break;
      case 2:
        tmp = new Triple(0.0, chroma, secondary);
        break;
      case 3:
        tmp = new Triple(0.0, secondary, chroma);
        break;
      case 4:
        tmp = new Triple(secondary, 0.0, chroma);
        break;
      default:
        tmp = new Triple(chroma, 0.0, secondary);
        break;
    }
    return tmp;
  }
  function toLinear(channel) {
    _init_properties_OklchConversion_kt__7rmdo9();
    var tmp;
    if (channel <= 0.04045) {
      tmp = channel / 12.92;
    } else {
      // Inline function 'kotlin.math.pow' call
      var this_0 = (channel + 0.055) / 1.055;
      tmp = Math.pow(this_0, 2.4);
    }
    return tmp;
  }
  function argbToOklch$channel($argb, shift) {
    return (($argb >>> shift | 0) & 255) / 255.0;
  }
  var properties_initialized_OklchConversion_kt_43fcu3;
  function _init_properties_OklchConversion_kt__7rmdo9() {
    if (!properties_initialized_OklchConversion_kt_43fcu3) {
      properties_initialized_OklchConversion_kt_43fcu3 = true;
      HEX_SHAPE = Regex_init_$Create$('^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$');
      // Inline function 'kotlin.doubleArrayOf' call
      OKLAB_MATRIX = new Float64Array([0.41222146, 0.53633255, 0.051445995, 0.2119035, 0.6806995, 0.10739696, 0.08830246, 0.28171885, 0.6299787]);
      // Inline function 'kotlin.doubleArrayOf' call
      OKLAB_LIGHTNESS = new Float64Array([0.21045426, 0.7936178, -0.004072047]);
      // Inline function 'kotlin.doubleArrayOf' call
      OKLAB_AXIS_A = new Float64Array([1.9779985, -2.4285922, 0.4505937]);
      // Inline function 'kotlin.doubleArrayOf' call
      OKLAB_AXIS_B = new Float64Array([0.025904037, 0.78277177, -0.80867577]);
    }
  }
  function get_LUMINANCE_WEIGHTS() {
    _init_properties_OklchGamut_kt__udw0gz();
    return LUMINANCE_WEIGHTS;
  }
  var LUMINANCE_WEIGHTS;
  function gamutMapped(_this__u8e3s4) {
    _init_properties_OklchGamut_kt__udw0gz();
    if (isInGamut(_this__u8e3s4)) {
      return _this__u8e3s4;
    }
    var lower = 0.0;
    var upper = _this__u8e3s4.h1f_1;
    // Inline function 'kotlin.repeat' call
    var inductionVariable = 0;
    if (inductionVariable < 20)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var middle = (lower + upper) / 2.0;
        var candidate = _this__u8e3s4.l1f(VOID, toFloat32(middle));
        if (isInGamut(candidate)) {
          lower = middle;
        } else {
          upper = middle;
        }
      }
       while (inductionVariable < 20);
    return _this__u8e3s4.l1f(VOID, toFloat32(lower));
  }
  function shiftHue(_this__u8e3s4, degrees) {
    _init_properties_OklchGamut_kt__udw0gz();
    var shifted = (_this__u8e3s4 + degrees) % 360.0;
    var normalized = shifted < 0.0 ? shifted + 360.0 : shifted;
    return toFloat32(normalized) % 360.0;
  }
  function wrapHue(_this__u8e3s4) {
    _init_properties_OklchGamut_kt__udw0gz();
    var wrapped = _this__u8e3s4 % 360.0;
    return toFloat32(wrapped < 0.0 ? wrapped + 360.0 : wrapped) % 360.0;
  }
  function isInGamut(_this__u8e3s4) {
    _init_properties_OklchGamut_kt__udw0gz();
    var linear = toLinearSrgb(_this__u8e3s4);
    var low = -1.0E-4;
    var high = 1.0 + 1.0E-4;
    var tmp;
    var tmp_0;
    var containsArg = linear.b1f_1;
    if (low <= containsArg ? containsArg <= high : false) {
      var containsArg_0 = linear.c1f_1;
      tmp_0 = low <= containsArg_0 ? containsArg_0 <= high : false;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var containsArg_1 = linear.d1f_1;
      tmp = low <= containsArg_1 ? containsArg_1 <= high : false;
    } else {
      tmp = false;
    }
    return tmp;
  }
  function toLinearSrgb(_this__u8e3s4) {
    _init_properties_OklchGamut_kt__udw0gz();
    var hue = _this__u8e3s4.i1f_1 * (3.141592653589793 / 180.0);
    var tmp = _this__u8e3s4.h1f_1;
    // Inline function 'kotlin.math.cos' call
    var axisA = tmp * Math.cos(hue);
    var tmp_0 = _this__u8e3s4.h1f_1;
    // Inline function 'kotlin.math.sin' call
    var axisB = tmp_0 * Math.sin(hue);
    var lD = _this__u8e3s4.g1f_1;
    var rootLong = lD + 0.39633778 * axisA + 0.21580376 * axisB;
    var rootMedium = lD - 0.105561346 * axisA - 0.06385417 * axisB;
    var rootShort = lD - 0.08948418 * axisA - 1.2914855 * axisB;
    // Inline function 'kotlin.math.pow' call
    var lmsLong = Math.pow(rootLong, 3);
    // Inline function 'kotlin.math.pow' call
    var lmsMedium = Math.pow(rootMedium, 3);
    // Inline function 'kotlin.math.pow' call
    var lmsShort = Math.pow(rootShort, 3);
    return new LinearSrgb(toFloat32(4.0767417 * lmsLong - 3.3077116 * lmsMedium + 0.23096994 * lmsShort), toFloat32(-1.268438 * lmsLong + 2.6097574 * lmsMedium - 0.34131938 * lmsShort), toFloat32(-0.0041960864 * lmsLong - 0.7034186 * lmsMedium + 1.7076147 * lmsShort));
  }
  function mixOklch(from, to, amount) {
    _init_properties_OklchGamut_kt__udw0gz();
    var t = coerceIn(amount, 0.0, 1.0);
    return safeOklch(toFloat32(from.g1f_1 + (to.g1f_1 - from.g1f_1) * t), toFloat32(from.h1f_1 + (to.h1f_1 - from.h1f_1) * t), hueTowards(from.i1f_1, to.i1f_1, coerceIn(amount, 0.0, 1.0)), toFloat32(from.j1f_1 + (to.j1f_1 - from.j1f_1) * t));
  }
  function contrastRatio(first, second) {
    _init_properties_OklchGamut_kt__udw0gz();
    var firstLuminance = relativeLuminance(first);
    var secondLuminance = relativeLuminance(second);
    // Inline function 'kotlin.comparisons.maxOf' call
    var lighter = Math.max(firstLuminance, secondLuminance);
    // Inline function 'kotlin.comparisons.minOf' call
    var darker = Math.min(firstLuminance, secondLuminance);
    return (lighter + 0.05) / (darker + 0.05);
  }
  function hueTowards(_this__u8e3s4, target, amount) {
    _init_properties_OklchGamut_kt__udw0gz();
    var thisD = _this__u8e3s4;
    var targetD = target;
    var t = coerceIn(amount, 0.0, 1.0);
    var delta = (targetD - thisD + 180.0 + 360.0) % 360.0 - 180.0;
    var wrapped = (thisD % 360.0 + 360.0) % 360.0;
    var result = (wrapped + delta * t) % 360.0;
    var normalized = result < 0.0 ? result + 360.0 : result;
    return toFloat32(normalized) % 360.0;
  }
  function relativeLuminance(_this__u8e3s4) {
    _init_properties_OklchGamut_kt__udw0gz();
    var linear = toLinearSrgb(_this__u8e3s4);
    return coerceIn(get_LUMINANCE_WEIGHTS()[0] * linear.b1f_1 + get_LUMINANCE_WEIGHTS()[1] * linear.c1f_1 + get_LUMINANCE_WEIGHTS()[2] * linear.d1f_1, 0.0, 1.0);
  }
  var properties_initialized_OklchGamut_kt_ty1km9;
  function _init_properties_OklchGamut_kt__udw0gz() {
    if (!properties_initialized_OklchGamut_kt_ty1km9) {
      properties_initialized_OklchGamut_kt_ty1km9 = true;
      // Inline function 'kotlin.floatArrayOf' call
      LUMINANCE_WEIGHTS = new Float32Array([0.2126, 0.7152, 0.0722]);
    }
  }
  function OklchGradient(stops, direction) {
    this.m1f_1 = stops;
    this.n1f_1 = direction;
    // Inline function 'kotlin.require' call
    if (!(this.m1f_1.m() >= 2)) {
      var message = 'OklchGradient requires at least 2 stops.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp0 = zipWithNext(this.m1f_1);
    var tmp$ret$2;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var tmp;
      if (isInterface(tmp0, Collection)) {
        tmp = tmp0.p();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$2 = true;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        var a = element.bb();
        var b = element.cb();
        if (!(a.p1f_1 <= b.p1f_1)) {
          tmp$ret$2 = false;
          break $l$block_0;
        }
      }
      tmp$ret$2 = true;
    }
    // Inline function 'kotlin.require' call
    if (!tmp$ret$2) {
      var message_0 = 'OklchGradient stops must be sorted ascending by offset.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var tmp0_0 = this.m1f_1;
    var tmp$ret$6;
    $l$block_2: {
      // Inline function 'kotlin.collections.all' call
      var tmp_0;
      if (isInterface(tmp0_0, Collection)) {
        tmp_0 = tmp0_0.p();
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$6 = true;
        break $l$block_2;
      }
      var _iterator__ex2g4s_0 = tmp0_0.j();
      while (_iterator__ex2g4s_0.k()) {
        var element_0 = _iterator__ex2g4s_0.l();
        var containsArg = element_0.p1f_1;
        if (!(0.0 <= containsArg ? containsArg <= 1.0 : false)) {
          tmp$ret$6 = false;
          break $l$block_2;
        }
      }
      tmp$ret$6 = true;
    }
    // Inline function 'kotlin.require' call
    if (!tmp$ret$6) {
      var message_1 = 'OklchGradient offsets must be in 0..1.';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
  }
  protoOf(OklchGradient).toString = function () {
    return 'OklchGradient(stops=' + toString(this.m1f_1) + ', direction=' + this.n1f_1.toString() + ')';
  };
  protoOf(OklchGradient).hashCode = function () {
    var result = hashCode(this.m1f_1);
    result = imul(result, 31) + this.n1f_1.hashCode() | 0;
    return result;
  };
  protoOf(OklchGradient).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof OklchGradient))
      return false;
    if (!equals(this.m1f_1, other.m1f_1))
      return false;
    if (!this.n1f_1.equals(other.n1f_1))
      return false;
    return true;
  };
  function OklchStop(color, offset) {
    this.o1f_1 = color;
    this.p1f_1 = offset;
  }
  protoOf(OklchStop).toString = function () {
    return 'OklchStop(color=' + this.o1f_1.toString() + ', offset=' + this.p1f_1 + ')';
  };
  protoOf(OklchStop).hashCode = function () {
    var result = this.o1f_1.hashCode();
    result = imul(result, 31) + getNumberHashCode(this.p1f_1) | 0;
    return result;
  };
  protoOf(OklchStop).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof OklchStop))
      return false;
    if (!this.o1f_1.equals(other.o1f_1))
      return false;
    if (!equals(this.p1f_1, other.p1f_1))
      return false;
    return true;
  };
  var static_init_called_8;
  function static_init_8() {
    if (static_init_called_8)
      return Unit_instance;
    static_init_called_8 = true;
    GradientDirection_AngleDeg_instance = new GradientDirection('AngleDeg', 0);
    GradientDirection_Vertical_instance = new GradientDirection('Vertical', 1);
    GradientDirection_Horizontal_instance = new GradientDirection('Horizontal', 2);
  }
  var GradientDirection_AngleDeg_instance;
  var GradientDirection_Vertical_instance;
  var GradientDirection_Horizontal_instance;
  function GradientDirection(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function GradientDirection_Vertical_getInstance() {
    static_init_8();
    return GradientDirection_Vertical_instance;
  }
  function formatDeterministic(value, maxDecimals) {
    maxDecimals = maxDecimals === VOID ? 4 : maxDecimals;
    return formatDeterministic_0(value, maxDecimals);
  }
  function formatDeterministic_0(value, maxDecimals) {
    maxDecimals = maxDecimals === VOID ? 4 : maxDecimals;
    // Inline function 'kotlin.require' call
    if (!(maxDecimals >= 0)) {
      var message = 'maxDecimals must be non-negative, was ' + maxDecimals + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var special = formatSpecial(value);
    if (!(special == null)) {
      return special;
    }
    var isNegative = value < 0.0 || (value === 0.0 && 1.0 / value < 0.0);
    // Inline function 'kotlin.math.abs' call
    var absValue = Math.abs(value);
    if (maxDecimals === 0) {
      var rounded = roundToLong(absValue);
      return isNegative && !equalsLong(rounded, new Long(0, 0)) ? '-' + rounded.toString() : rounded.toString();
    }
    return formatFractional(absValue, isNegative, maxDecimals);
  }
  function formatSpecial(value) {
    return isNaN_0(value) ? 'NaN' : value === Infinity ? 'Infinity' : value === -Infinity ? '-Infinity' : null;
  }
  function formatFractional(absValue, isNegative, maxDecimals) {
    var factor = new Long(1, 0);
    // Inline function 'kotlin.repeat' call
    var inductionVariable = 0;
    if (inductionVariable < maxDecimals)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        factor = multiply(factor, new Long(10, 0));
      }
       while (inductionVariable < maxDecimals);
    if (absValue >= toNumber(divide(new Long(-1, 2147483647), factor))) {
      var longVal = numberToLong(absValue);
      return isNegative && !equalsLong(longVal, new Long(0, 0)) ? '-' + longVal.toString() : longVal.toString();
    }
    var rawScaled = absValue * toNumber(factor);
    var scaled = roundToLong(rawScaled);
    var integerPart = divide(scaled, factor);
    var fractionPart = modulo(scaled, factor);
    if (equalsLong(fractionPart, new Long(0, 0))) {
      var sign = isNegative && !equalsLong(integerPart, new Long(0, 0)) ? '-' : '';
      return sign + integerPart.toString();
    }
    var fractionStr = fractionPart.toString();
    var paddedFraction = repeat('0', maxDecimals - fractionStr.length | 0) + fractionStr;
    var trimmedFraction = trimEnd(paddedFraction, charArrayOf([_Char___init__impl__6a9atx(48)]));
    var tmp;
    var tmp_0;
    if (isNegative) {
      var tmp_1;
      if (!equalsLong(integerPart, new Long(0, 0))) {
        tmp_1 = true;
      } else {
        // Inline function 'kotlin.text.isNotEmpty' call
        tmp_1 = charSequenceLength(trimmedFraction) > 0;
      }
      tmp_0 = tmp_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = '-';
    } else {
      tmp = '';
    }
    var sign_0 = tmp;
    return sign_0 + integerPart.toString() + '.' + trimmedFraction;
  }
  function _get_$cachedSerializer__te6jhj_7($this) {
    return $this.q1f_1.q1();
  }
  function EasingKind$Companion$_anonymous__j9m0ls() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.core.motion.EasingKind', values_8());
  }
  var static_init_called_9;
  function static_init_9() {
    if (static_init_called_9)
      return Unit_instance;
    static_init_called_9 = true;
    EasingKind_Linear_instance = new EasingKind('Linear', 0);
    EasingKind_Standard_instance = new EasingKind('Standard', 1);
    EasingKind_Emphasized_instance = new EasingKind('Emphasized', 2);
    EasingKind_Decelerate_instance = new EasingKind('Decelerate', 3);
    EasingKind_Accelerate_instance = new EasingKind('Accelerate', 4);
    EasingKind_Spring_instance = new EasingKind('Spring', 5);
    if (Companion_instance_20 == null) {
      Companion_instance;
      new Companion_19();
    }
  }
  var EasingKind_Linear_instance;
  var EasingKind_Standard_instance;
  var EasingKind_Emphasized_instance;
  var EasingKind_Decelerate_instance;
  var EasingKind_Accelerate_instance;
  var EasingKind_Spring_instance;
  function values_8() {
    static_init_9();
    return [EasingKind_Linear_getInstance(), EasingKind_Standard_getInstance(), EasingKind_Emphasized_getInstance(), EasingKind_Decelerate_getInstance(), EasingKind_Accelerate_getInstance(), EasingKind_Spring_getInstance()];
  }
  function Companion_19() {
    Companion_instance_20 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.q1f_1 = lazy(tmp_0, EasingKind$Companion$_anonymous__j9m0ls);
  }
  protoOf(Companion_19).s18 = function () {
    return _get_$cachedSerializer__te6jhj_7(this);
  };
  var Companion_instance_20;
  function Companion_getInstance_18() {
    static_init_9();
    return Companion_instance_20;
  }
  function EasingKind(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function EasingKind_Linear_getInstance() {
    static_init_9();
    return EasingKind_Linear_instance;
  }
  function EasingKind_Standard_getInstance() {
    static_init_9();
    return EasingKind_Standard_instance;
  }
  function EasingKind_Emphasized_getInstance() {
    static_init_9();
    return EasingKind_Emphasized_instance;
  }
  function EasingKind_Decelerate_getInstance() {
    static_init_9();
    return EasingKind_Decelerate_instance;
  }
  function EasingKind_Accelerate_getInstance() {
    static_init_9();
    return EasingKind_Accelerate_instance;
  }
  function EasingKind_Spring_getInstance() {
    static_init_9();
    return EasingKind_Spring_instance;
  }
  function MotionSpec$Companion$$childSerializers$_anonymous__cd1ief() {
    return Companion_getInstance_18().s18();
  }
  function Companion_20() {
    Companion_instance_21 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.r1f_1 = [null, lazy(tmp_0, MotionSpec$Companion$$childSerializers$_anonymous__cd1ief), null, null];
  }
  var Companion_instance_21;
  function Companion_getInstance_19() {
    if (Companion_instance_21 == null)
      new Companion_20();
    return Companion_instance_21;
  }
  function $serializer_9() {
    $serializer_instance_9 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.core.motion.MotionSpec', this, 4);
    tmp0_serialDesc.lp('duration', false);
    tmp0_serialDesc.lp('easing', false);
    tmp0_serialDesc.lp('delay', true);
    tmp0_serialDesc.lp('spring', true);
    this.s1f_1 = tmp0_serialDesc;
  }
  protoOf($serializer_9).t1f = function (encoder, value) {
    var tmp0_desc = this.s1f_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_19().r1f_1;
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance_0(), new DurationValue(value.u1f_1));
    tmp1_output.ok(tmp0_desc, 1, tmp2_cached[1].q1(), value.v1f_1);
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !equals(value.w1f_1, _DurationValue___init__impl__1d0n0c(new Long(0, 0)))) {
      tmp1_output.ok(tmp0_desc, 2, $serializer_getInstance_0(), new DurationValue(value.w1f_1));
    }
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !(value.x1f_1 == null)) {
      tmp1_output.qk(tmp0_desc, 3, $serializer_getInstance_10(), value.x1f_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_9).yf = function (encoder, value) {
    return this.t1f(encoder, value instanceof MotionSpec ? value : THROW_CCE());
  };
  protoOf($serializer_9).zf = function (decoder) {
    var tmp0_desc = this.s1f_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_input = decoder.xi(tmp0_desc);
    var tmp9_cached = Companion_getInstance_19().r1f_1;
    if (tmp8_input.nj()) {
      var tmp = $serializer_getInstance_0();
      var tmp_0 = tmp4_local0;
      var tmp_1 = tmp8_input.jj(tmp0_desc, 0, tmp, tmp_0 == null ? null : new DurationValue(tmp_0));
      tmp4_local0 = tmp_1 == null ? null : tmp_1.t1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.jj(tmp0_desc, 1, tmp9_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      var tmp_2 = $serializer_getInstance_0();
      var tmp_3 = tmp6_local2;
      var tmp_4 = tmp8_input.jj(tmp0_desc, 2, tmp_2, tmp_3 == null ? null : new DurationValue(tmp_3));
      tmp6_local2 = tmp_4 == null ? null : tmp_4.t1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.lj(tmp0_desc, 3, $serializer_getInstance_10(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            var tmp_5 = $serializer_getInstance_0();
            var tmp_6 = tmp4_local0;
            var tmp_7 = tmp8_input.jj(tmp0_desc, 0, tmp_5, tmp_6 == null ? null : new DurationValue(tmp_6));
            tmp4_local0 = tmp_7 == null ? null : tmp_7.t1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.jj(tmp0_desc, 1, tmp9_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            var tmp_8 = $serializer_getInstance_0();
            var tmp_9 = tmp6_local2;
            var tmp_10 = tmp8_input.jj(tmp0_desc, 2, tmp_8, tmp_9 == null ? null : new DurationValue(tmp_9));
            tmp6_local2 = tmp_10 == null ? null : tmp_10.t1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.lj(tmp0_desc, 3, $serializer_getInstance_10(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.yi(tmp0_desc);
    return MotionSpec_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_9).xf = function () {
    return this.s1f_1;
  };
  protoOf($serializer_9).aq = function () {
    var tmp0_cached = Companion_getInstance_19().r1f_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance_0(), tmp0_cached[1].q1(), $serializer_getInstance_0(), get_nullable($serializer_getInstance_10())];
  };
  var $serializer_instance_9;
  function $serializer_getInstance_9() {
    if ($serializer_instance_9 == null)
      new $serializer_9();
    return $serializer_instance_9;
  }
  function MotionSpec_init_$Init$(seen0, duration, easing, delay, spring, serializationConstructorMarker, $this) {
    if (!(3 === (3 & seen0))) {
      throwMissingFieldException(seen0, 3, $serializer_getInstance_9().s1f_1);
    }
    $this.u1f_1 = duration;
    $this.v1f_1 = easing;
    if (0 === (seen0 & 4))
      $this.w1f_1 = _DurationValue___init__impl__1d0n0c(new Long(0, 0));
    else
      $this.w1f_1 = delay;
    if (0 === (seen0 & 8))
      $this.x1f_1 = null;
    else
      $this.x1f_1 = spring;
    return $this;
  }
  function MotionSpec_init_$Create$(seen0, duration, easing, delay, spring, serializationConstructorMarker) {
    return MotionSpec_init_$Init$(seen0, duration, easing, delay, spring, serializationConstructorMarker, objectCreate(protoOf(MotionSpec)));
  }
  function MotionSpec(duration, easing, delay, spring) {
    Companion_getInstance_19();
    delay = delay === VOID ? _DurationValue___init__impl__1d0n0c(new Long(0, 0)) : delay;
    spring = spring === VOID ? null : spring;
    this.u1f_1 = duration;
    this.v1f_1 = easing;
    this.w1f_1 = delay;
    this.x1f_1 = spring;
  }
  protoOf(MotionSpec).y1f = function (duration, easing, delay, spring) {
    return new MotionSpec(duration, easing, delay, spring);
  };
  protoOf(MotionSpec).z1f = function (duration, easing, delay, spring, $super) {
    duration = duration === VOID ? this.u1f_1 : duration;
    easing = easing === VOID ? this.v1f_1 : easing;
    delay = delay === VOID ? this.w1f_1 : delay;
    spring = spring === VOID ? this.x1f_1 : spring;
    return $super === VOID ? this.y1f(duration, easing, delay, spring) : $super.y1f.call(this, new DurationValue(duration), easing, new DurationValue(delay), spring);
  };
  protoOf(MotionSpec).toString = function () {
    return 'MotionSpec(duration=' + DurationValue__toString_impl_uuoon0(this.u1f_1) + ', easing=' + this.v1f_1.toString() + ', delay=' + DurationValue__toString_impl_uuoon0(this.w1f_1) + ', spring=' + toString_0(this.x1f_1) + ')';
  };
  protoOf(MotionSpec).hashCode = function () {
    var result = DurationValue__hashCode_impl_if9gj9(this.u1f_1);
    result = imul(result, 31) + this.v1f_1.hashCode() | 0;
    result = imul(result, 31) + DurationValue__hashCode_impl_if9gj9(this.w1f_1) | 0;
    result = imul(result, 31) + (this.x1f_1 == null ? 0 : this.x1f_1.hashCode()) | 0;
    return result;
  };
  protoOf(MotionSpec).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MotionSpec))
      return false;
    if (!equals(this.u1f_1, other.u1f_1))
      return false;
    if (!this.v1f_1.equals(other.v1f_1))
      return false;
    if (!equals(this.w1f_1, other.w1f_1))
      return false;
    if (!equals(this.x1f_1, other.x1f_1))
      return false;
    return true;
  };
  function Companion_21() {
  }
  var Companion_instance_22;
  function Companion_getInstance_20() {
    return Companion_instance_22;
  }
  function $serializer_10() {
    $serializer_instance_10 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.core.motion.SpringParams', this, 2);
    tmp0_serialDesc.lp('stiffness', false);
    tmp0_serialDesc.lp('dampingRatio', false);
    this.a1g_1 = tmp0_serialDesc;
  }
  protoOf($serializer_10).b1g = function (encoder, value) {
    var tmp0_desc = this.a1g_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.jk(tmp0_desc, 0, value.c1g_1);
    tmp1_output.jk(tmp0_desc, 1, value.d1g_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_10).yf = function (encoder, value) {
    return this.b1g(encoder, value instanceof SpringParams ? value : THROW_CCE());
  };
  protoOf($serializer_10).zf = function (decoder) {
    var tmp0_desc = this.a1g_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = 0.0;
    var tmp5_local1 = 0.0;
    var tmp6_input = decoder.xi(tmp0_desc);
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.ej(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.ej(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.ej(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.ej(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return SpringParams_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_10).xf = function () {
    return this.a1g_1;
  };
  protoOf($serializer_10).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [FloatSerializer_getInstance(), FloatSerializer_getInstance()];
  };
  var $serializer_instance_10;
  function $serializer_getInstance_10() {
    if ($serializer_instance_10 == null)
      new $serializer_10();
    return $serializer_instance_10;
  }
  function SpringParams_init_$Init$(seen0, stiffness, dampingRatio, serializationConstructorMarker, $this) {
    if (!(3 === (3 & seen0))) {
      throwMissingFieldException(seen0, 3, $serializer_getInstance_10().a1g_1);
    }
    $this.c1g_1 = stiffness;
    $this.d1g_1 = dampingRatio;
    return $this;
  }
  function SpringParams_init_$Create$(seen0, stiffness, dampingRatio, serializationConstructorMarker) {
    return SpringParams_init_$Init$(seen0, stiffness, dampingRatio, serializationConstructorMarker, objectCreate(protoOf(SpringParams)));
  }
  function SpringParams(stiffness, dampingRatio) {
    this.c1g_1 = stiffness;
    this.d1g_1 = dampingRatio;
  }
  protoOf(SpringParams).toString = function () {
    return 'SpringParams(stiffness=' + this.c1g_1 + ', dampingRatio=' + this.d1g_1 + ')';
  };
  protoOf(SpringParams).hashCode = function () {
    var result = getNumberHashCode(this.c1g_1);
    result = imul(result, 31) + getNumberHashCode(this.d1g_1) | 0;
    return result;
  };
  protoOf(SpringParams).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SpringParams))
      return false;
    if (!equals(this.c1g_1, other.c1g_1))
      return false;
    if (!equals(this.d1g_1, other.d1g_1))
      return false;
    return true;
  };
  function Companion_22() {
  }
  protoOf(Companion_22).s18 = function () {
    return $serializer_getInstance_11();
  };
  var Companion_instance_23;
  function Companion_getInstance_21() {
    return Companion_instance_23;
  }
  function $serializer_11() {
    $serializer_instance_11 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.BasisIntent', this, 4);
    tmp0_serialDesc.lp('identity', true);
    tmp0_serialDesc.lp('mood', true);
    tmp0_serialDesc.lp('domain', true);
    tmp0_serialDesc.lp('control', true);
    this.e1g_1 = tmp0_serialDesc;
  }
  protoOf($serializer_11).f1g = function (encoder, value) {
    var tmp0_desc = this.e1g_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.g1g_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, $serializer_getInstance_14(), value.g1g_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.h1g_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, $serializer_getInstance_16(), value.h1g_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !(value.i1g_1 == null)) {
      tmp1_output.qk(tmp0_desc, 2, $serializer_getInstance_13(), value.i1g_1);
    }
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !(value.j1g_1 == null)) {
      tmp1_output.qk(tmp0_desc, 3, $serializer_getInstance_12(), value.j1g_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_11).yf = function (encoder, value) {
    return this.f1g(encoder, value instanceof BasisIntent ? value : THROW_CCE());
  };
  protoOf($serializer_11).zf = function (decoder) {
    var tmp0_desc = this.e1g_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_input = decoder.xi(tmp0_desc);
    if (tmp8_input.nj()) {
      tmp4_local0 = tmp8_input.lj(tmp0_desc, 0, $serializer_getInstance_14(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.lj(tmp0_desc, 1, $serializer_getInstance_16(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.lj(tmp0_desc, 2, $serializer_getInstance_13(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.lj(tmp0_desc, 3, $serializer_getInstance_12(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.lj(tmp0_desc, 0, $serializer_getInstance_14(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.lj(tmp0_desc, 1, $serializer_getInstance_16(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.lj(tmp0_desc, 2, $serializer_getInstance_13(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.lj(tmp0_desc, 3, $serializer_getInstance_12(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.yi(tmp0_desc);
    return BasisIntent_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_11).xf = function () {
    return this.e1g_1;
  };
  protoOf($serializer_11).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable($serializer_getInstance_14()), get_nullable($serializer_getInstance_16()), get_nullable($serializer_getInstance_13()), get_nullable($serializer_getInstance_12())];
  };
  var $serializer_instance_11;
  function $serializer_getInstance_11() {
    if ($serializer_instance_11 == null)
      new $serializer_11();
    return $serializer_instance_11;
  }
  function BasisIntent_init_$Init$(seen0, identity, mood, domain, control, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_11().e1g_1);
    }
    if (0 === (seen0 & 1))
      $this.g1g_1 = null;
    else
      $this.g1g_1 = identity;
    if (0 === (seen0 & 2))
      $this.h1g_1 = null;
    else
      $this.h1g_1 = mood;
    if (0 === (seen0 & 4))
      $this.i1g_1 = null;
    else
      $this.i1g_1 = domain;
    if (0 === (seen0 & 8))
      $this.j1g_1 = null;
    else
      $this.j1g_1 = control;
    return $this;
  }
  function BasisIntent_init_$Create$(seen0, identity, mood, domain, control, serializationConstructorMarker) {
    return BasisIntent_init_$Init$(seen0, identity, mood, domain, control, serializationConstructorMarker, objectCreate(protoOf(BasisIntent)));
  }
  function BasisIntent(identity, mood, domain, control) {
    identity = identity === VOID ? null : identity;
    mood = mood === VOID ? null : mood;
    domain = domain === VOID ? null : domain;
    control = control === VOID ? null : control;
    this.g1g_1 = identity;
    this.h1g_1 = mood;
    this.i1g_1 = domain;
    this.j1g_1 = control;
  }
  protoOf(BasisIntent).toString = function () {
    return 'BasisIntent(identity=' + toString_0(this.g1g_1) + ', mood=' + toString_0(this.h1g_1) + ', domain=' + toString_0(this.i1g_1) + ', control=' + toString_0(this.j1g_1) + ')';
  };
  protoOf(BasisIntent).hashCode = function () {
    var result = this.g1g_1 == null ? 0 : this.g1g_1.hashCode();
    result = imul(result, 31) + (this.h1g_1 == null ? 0 : this.h1g_1.hashCode()) | 0;
    result = imul(result, 31) + (this.i1g_1 == null ? 0 : this.i1g_1.hashCode()) | 0;
    result = imul(result, 31) + (this.j1g_1 == null ? 0 : this.j1g_1.hashCode()) | 0;
    return result;
  };
  protoOf(BasisIntent).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BasisIntent))
      return false;
    if (!equals(this.g1g_1, other.g1g_1))
      return false;
    if (!equals(this.h1g_1, other.h1g_1))
      return false;
    if (!equals(this.i1g_1, other.i1g_1))
      return false;
    if (!equals(this.j1g_1, other.j1g_1))
      return false;
    return true;
  };
  function Companion_23() {
  }
  var Companion_instance_24;
  function Companion_getInstance_22() {
    return Companion_instance_24;
  }
  function $serializer_12() {
    $serializer_instance_12 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.ControlIntent', this, 5);
    tmp0_serialDesc.lp('tokens', true);
    tmp0_serialDesc.lp('components', true);
    tmp0_serialDesc.lp('mode', true);
    tmp0_serialDesc.lp('fonts', true);
    tmp0_serialDesc.lp('constraints', true);
    this.k1g_1 = tmp0_serialDesc;
  }
  protoOf($serializer_12).l1g = function (encoder, value) {
    var tmp0_desc = this.k1g_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.m1g_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, $serializer_getInstance_41(), value.m1g_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.n1g_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, $serializer_getInstance_34(), value.n1g_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !(value.o1g_1 == null)) {
      tmp1_output.qk(tmp0_desc, 2, $serializer_getInstance_27(), value.o1g_1);
    }
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !(value.p1g_1 == null)) {
      tmp1_output.qk(tmp0_desc, 3, $serializer_getInstance_24(), value.p1g_1);
    }
    if (tmp1_output.uk(tmp0_desc, 4) ? true : !(value.q1g_1 == null)) {
      tmp1_output.qk(tmp0_desc, 4, $serializer_getInstance_18(), value.q1g_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_12).yf = function (encoder, value) {
    return this.l1g(encoder, value instanceof ControlIntent ? value : THROW_CCE());
  };
  protoOf($serializer_12).zf = function (decoder) {
    var tmp0_desc = this.k1g_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = null;
    var tmp9_input = decoder.xi(tmp0_desc);
    if (tmp9_input.nj()) {
      tmp4_local0 = tmp9_input.lj(tmp0_desc, 0, $serializer_getInstance_41(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp9_input.lj(tmp0_desc, 1, $serializer_getInstance_34(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp9_input.lj(tmp0_desc, 2, $serializer_getInstance_27(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp9_input.lj(tmp0_desc, 3, $serializer_getInstance_24(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp9_input.lj(tmp0_desc, 4, $serializer_getInstance_18(), tmp8_local4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp9_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp9_input.lj(tmp0_desc, 0, $serializer_getInstance_41(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp9_input.lj(tmp0_desc, 1, $serializer_getInstance_34(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp9_input.lj(tmp0_desc, 2, $serializer_getInstance_27(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp9_input.lj(tmp0_desc, 3, $serializer_getInstance_24(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp9_input.lj(tmp0_desc, 4, $serializer_getInstance_18(), tmp8_local4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp9_input.yi(tmp0_desc);
    return ControlIntent_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, null);
  };
  protoOf($serializer_12).xf = function () {
    return this.k1g_1;
  };
  protoOf($serializer_12).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable($serializer_getInstance_41()), get_nullable($serializer_getInstance_34()), get_nullable($serializer_getInstance_27()), get_nullable($serializer_getInstance_24()), get_nullable($serializer_getInstance_18())];
  };
  var $serializer_instance_12;
  function $serializer_getInstance_12() {
    if ($serializer_instance_12 == null)
      new $serializer_12();
    return $serializer_instance_12;
  }
  function ControlIntent_init_$Init$(seen0, tokens, components, mode, fonts, constraints, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_12().k1g_1);
    }
    if (0 === (seen0 & 1))
      $this.m1g_1 = null;
    else
      $this.m1g_1 = tokens;
    if (0 === (seen0 & 2))
      $this.n1g_1 = null;
    else
      $this.n1g_1 = components;
    if (0 === (seen0 & 4))
      $this.o1g_1 = null;
    else
      $this.o1g_1 = mode;
    if (0 === (seen0 & 8))
      $this.p1g_1 = null;
    else
      $this.p1g_1 = fonts;
    if (0 === (seen0 & 16))
      $this.q1g_1 = null;
    else
      $this.q1g_1 = constraints;
    return $this;
  }
  function ControlIntent_init_$Create$(seen0, tokens, components, mode, fonts, constraints, serializationConstructorMarker) {
    return ControlIntent_init_$Init$(seen0, tokens, components, mode, fonts, constraints, serializationConstructorMarker, objectCreate(protoOf(ControlIntent)));
  }
  function ControlIntent(tokens, components, mode, fonts, constraints) {
    tokens = tokens === VOID ? null : tokens;
    components = components === VOID ? null : components;
    mode = mode === VOID ? null : mode;
    fonts = fonts === VOID ? null : fonts;
    constraints = constraints === VOID ? null : constraints;
    this.m1g_1 = tokens;
    this.n1g_1 = components;
    this.o1g_1 = mode;
    this.p1g_1 = fonts;
    this.q1g_1 = constraints;
  }
  protoOf(ControlIntent).toString = function () {
    return 'ControlIntent(tokens=' + toString_0(this.m1g_1) + ', components=' + toString_0(this.n1g_1) + ', mode=' + toString_0(this.o1g_1) + ', fonts=' + toString_0(this.p1g_1) + ', constraints=' + toString_0(this.q1g_1) + ')';
  };
  protoOf(ControlIntent).hashCode = function () {
    var result = this.m1g_1 == null ? 0 : this.m1g_1.hashCode();
    result = imul(result, 31) + (this.n1g_1 == null ? 0 : this.n1g_1.hashCode()) | 0;
    result = imul(result, 31) + (this.o1g_1 == null ? 0 : this.o1g_1.hashCode()) | 0;
    result = imul(result, 31) + (this.p1g_1 == null ? 0 : this.p1g_1.hashCode()) | 0;
    result = imul(result, 31) + (this.q1g_1 == null ? 0 : this.q1g_1.hashCode()) | 0;
    return result;
  };
  protoOf(ControlIntent).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ControlIntent))
      return false;
    if (!equals(this.m1g_1, other.m1g_1))
      return false;
    if (!equals(this.n1g_1, other.n1g_1))
      return false;
    if (!equals(this.o1g_1, other.o1g_1))
      return false;
    if (!equals(this.p1g_1, other.p1g_1))
      return false;
    if (!equals(this.q1g_1, other.q1g_1))
      return false;
    return true;
  };
  function _get_$cachedSerializer__te6jhj_8($this) {
    return $this.r1g_1.q1();
  }
  function ProductDomain$Companion$_anonymous__u92u10() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.intent.ProductDomain', values_9());
  }
  var static_init_called_10;
  function static_init_10() {
    if (static_init_called_10)
      return Unit_instance;
    static_init_called_10 = true;
    ProductDomain_Finance_instance = new ProductDomain('Finance', 0);
    ProductDomain_Health_instance = new ProductDomain('Health', 1);
    ProductDomain_Social_instance = new ProductDomain('Social', 2);
    ProductDomain_Productivity_instance = new ProductDomain('Productivity', 3);
    ProductDomain_Commerce_instance = new ProductDomain('Commerce', 4);
    ProductDomain_Media_instance = new ProductDomain('Media', 5);
    ProductDomain_Education_instance = new ProductDomain('Education', 6);
    ProductDomain_Travel_instance = new ProductDomain('Travel', 7);
    ProductDomain_Utilities_instance = new ProductDomain('Utilities', 8);
    ProductDomain_Other_instance = new ProductDomain('Other', 9);
    if (Companion_instance_25 == null) {
      Companion_instance;
      new Companion_24();
    }
  }
  var ProductDomain_Finance_instance;
  var ProductDomain_Health_instance;
  var ProductDomain_Social_instance;
  var ProductDomain_Productivity_instance;
  var ProductDomain_Commerce_instance;
  var ProductDomain_Media_instance;
  var ProductDomain_Education_instance;
  var ProductDomain_Travel_instance;
  var ProductDomain_Utilities_instance;
  var ProductDomain_Other_instance;
  function values_9() {
    static_init_10();
    return [ProductDomain_Finance_getInstance(), ProductDomain_Health_getInstance(), ProductDomain_Social_getInstance(), ProductDomain_Productivity_getInstance(), ProductDomain_Commerce_getInstance(), ProductDomain_Media_getInstance(), ProductDomain_Education_getInstance(), ProductDomain_Travel_getInstance(), ProductDomain_Utilities_getInstance(), ProductDomain_Other_getInstance()];
  }
  function Companion_24() {
    Companion_instance_25 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.r1g_1 = lazy(tmp_0, ProductDomain$Companion$_anonymous__u92u10);
  }
  protoOf(Companion_24).s18 = function () {
    return _get_$cachedSerializer__te6jhj_8(this);
  };
  var Companion_instance_25;
  function Companion_getInstance_23() {
    static_init_10();
    return Companion_instance_25;
  }
  function ProductDomain(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function _get_$cachedSerializer__te6jhj_9($this) {
    return $this.s1g_1.q1();
  }
  function InteractionPattern$Companion$_anonymous__jd2q5t() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.intent.InteractionPattern', values_10());
  }
  var static_init_called_11;
  function static_init_11() {
    if (static_init_called_11)
      return Unit_instance;
    static_init_called_11 = true;
    InteractionPattern_DataNavigation_instance = new InteractionPattern('DataNavigation', 0);
    InteractionPattern_FormsEntry_instance = new InteractionPattern('FormsEntry', 1);
    InteractionPattern_ChatMessaging_instance = new InteractionPattern('ChatMessaging', 2);
    InteractionPattern_ContentFeed_instance = new InteractionPattern('ContentFeed', 3);
    InteractionPattern_ContentReading_instance = new InteractionPattern('ContentReading', 4);
    InteractionPattern_SearchDiscovery_instance = new InteractionPattern('SearchDiscovery', 5);
    InteractionPattern_MediaBrowse_instance = new InteractionPattern('MediaBrowse', 6);
    InteractionPattern_DashboardMonitoring_instance = new InteractionPattern('DashboardMonitoring', 7);
    InteractionPattern_CheckoutCommerce_instance = new InteractionPattern('CheckoutCommerce', 8);
    InteractionPattern_AuthOnboarding_instance = new InteractionPattern('AuthOnboarding', 9);
    InteractionPattern_SettingsAdmin_instance = new InteractionPattern('SettingsAdmin', 10);
    if (Companion_instance_26 == null) {
      Companion_instance;
      new Companion_25();
    }
  }
  var InteractionPattern_DataNavigation_instance;
  var InteractionPattern_FormsEntry_instance;
  var InteractionPattern_ChatMessaging_instance;
  var InteractionPattern_ContentFeed_instance;
  var InteractionPattern_ContentReading_instance;
  var InteractionPattern_SearchDiscovery_instance;
  var InteractionPattern_MediaBrowse_instance;
  var InteractionPattern_DashboardMonitoring_instance;
  var InteractionPattern_CheckoutCommerce_instance;
  var InteractionPattern_AuthOnboarding_instance;
  var InteractionPattern_SettingsAdmin_instance;
  function values_10() {
    static_init_11();
    return [InteractionPattern_DataNavigation_getInstance(), InteractionPattern_FormsEntry_getInstance(), InteractionPattern_ChatMessaging_getInstance(), InteractionPattern_ContentFeed_getInstance(), InteractionPattern_ContentReading_getInstance(), InteractionPattern_SearchDiscovery_getInstance(), InteractionPattern_MediaBrowse_getInstance(), InteractionPattern_DashboardMonitoring_getInstance(), InteractionPattern_CheckoutCommerce_getInstance(), InteractionPattern_AuthOnboarding_getInstance(), InteractionPattern_SettingsAdmin_getInstance()];
  }
  function Companion_25() {
    Companion_instance_26 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.s1g_1 = lazy(tmp_0, InteractionPattern$Companion$_anonymous__jd2q5t);
  }
  protoOf(Companion_25).s18 = function () {
    return _get_$cachedSerializer__te6jhj_9(this);
  };
  var Companion_instance_26;
  function Companion_getInstance_24() {
    static_init_11();
    return Companion_instance_26;
  }
  function InteractionPattern(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function DomainIntent$Companion$$childSerializers$_anonymous__1wqbme() {
    return new LinkedHashSetSerializer(Companion_getInstance_23().s18());
  }
  function DomainIntent$Companion$$childSerializers$_anonymous__1wqbme_0() {
    return new LinkedHashSetSerializer(Companion_getInstance_24().s18());
  }
  function Companion_26() {
    Companion_instance_27 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, DomainIntent$Companion$$childSerializers$_anonymous__1wqbme);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.t1g_1 = [tmp_1, lazy(tmp_2, DomainIntent$Companion$$childSerializers$_anonymous__1wqbme_0)];
  }
  var Companion_instance_27;
  function Companion_getInstance_25() {
    if (Companion_instance_27 == null)
      new Companion_26();
    return Companion_instance_27;
  }
  function $serializer_13() {
    $serializer_instance_13 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.DomainIntent', this, 2);
    tmp0_serialDesc.lp('domains', true);
    tmp0_serialDesc.lp('interactions', true);
    this.u1g_1 = tmp0_serialDesc;
  }
  protoOf($serializer_13).v1g = function (encoder, value) {
    var tmp0_desc = this.u1g_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_25().t1g_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !equals(value.w1g_1, emptySet())) {
      tmp1_output.ok(tmp0_desc, 0, tmp2_cached[0].q1(), value.w1g_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !equals(value.x1g_1, emptySet())) {
      tmp1_output.ok(tmp0_desc, 1, tmp2_cached[1].q1(), value.x1g_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_13).yf = function (encoder, value) {
    return this.v1g(encoder, value instanceof DomainIntent ? value : THROW_CCE());
  };
  protoOf($serializer_13).zf = function (decoder) {
    var tmp0_desc = this.u1g_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    var tmp7_cached = Companion_getInstance_25().t1g_1;
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.jj(tmp0_desc, 0, tmp7_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.jj(tmp0_desc, 1, tmp7_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.jj(tmp0_desc, 0, tmp7_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.jj(tmp0_desc, 1, tmp7_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return DomainIntent_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_13).xf = function () {
    return this.u1g_1;
  };
  protoOf($serializer_13).aq = function () {
    var tmp0_cached = Companion_getInstance_25().t1g_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [tmp0_cached[0].q1(), tmp0_cached[1].q1()];
  };
  var $serializer_instance_13;
  function $serializer_getInstance_13() {
    if ($serializer_instance_13 == null)
      new $serializer_13();
    return $serializer_instance_13;
  }
  function DomainIntent_init_$Init$(seen0, domains, interactions, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_13().u1g_1);
    }
    if (0 === (seen0 & 1))
      $this.w1g_1 = emptySet();
    else
      $this.w1g_1 = domains;
    if (0 === (seen0 & 2))
      $this.x1g_1 = emptySet();
    else
      $this.x1g_1 = interactions;
    return $this;
  }
  function DomainIntent_init_$Create$(seen0, domains, interactions, serializationConstructorMarker) {
    return DomainIntent_init_$Init$(seen0, domains, interactions, serializationConstructorMarker, objectCreate(protoOf(DomainIntent)));
  }
  function DomainIntent(domains, interactions) {
    Companion_getInstance_25();
    domains = domains === VOID ? emptySet() : domains;
    interactions = interactions === VOID ? emptySet() : interactions;
    this.w1g_1 = domains;
    this.x1g_1 = interactions;
  }
  protoOf(DomainIntent).toString = function () {
    return 'DomainIntent(domains=' + toString(this.w1g_1) + ', interactions=' + toString(this.x1g_1) + ')';
  };
  protoOf(DomainIntent).hashCode = function () {
    var result = hashCode(this.w1g_1);
    result = imul(result, 31) + hashCode(this.x1g_1) | 0;
    return result;
  };
  protoOf(DomainIntent).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DomainIntent))
      return false;
    if (!equals(this.w1g_1, other.w1g_1))
      return false;
    if (!equals(this.x1g_1, other.x1g_1))
      return false;
    return true;
  };
  function ProductDomain_Finance_getInstance() {
    static_init_10();
    return ProductDomain_Finance_instance;
  }
  function ProductDomain_Health_getInstance() {
    static_init_10();
    return ProductDomain_Health_instance;
  }
  function ProductDomain_Social_getInstance() {
    static_init_10();
    return ProductDomain_Social_instance;
  }
  function ProductDomain_Productivity_getInstance() {
    static_init_10();
    return ProductDomain_Productivity_instance;
  }
  function ProductDomain_Commerce_getInstance() {
    static_init_10();
    return ProductDomain_Commerce_instance;
  }
  function ProductDomain_Media_getInstance() {
    static_init_10();
    return ProductDomain_Media_instance;
  }
  function ProductDomain_Education_getInstance() {
    static_init_10();
    return ProductDomain_Education_instance;
  }
  function ProductDomain_Travel_getInstance() {
    static_init_10();
    return ProductDomain_Travel_instance;
  }
  function ProductDomain_Utilities_getInstance() {
    static_init_10();
    return ProductDomain_Utilities_instance;
  }
  function ProductDomain_Other_getInstance() {
    static_init_10();
    return ProductDomain_Other_instance;
  }
  function InteractionPattern_DataNavigation_getInstance() {
    static_init_11();
    return InteractionPattern_DataNavigation_instance;
  }
  function InteractionPattern_FormsEntry_getInstance() {
    static_init_11();
    return InteractionPattern_FormsEntry_instance;
  }
  function InteractionPattern_ChatMessaging_getInstance() {
    static_init_11();
    return InteractionPattern_ChatMessaging_instance;
  }
  function InteractionPattern_ContentFeed_getInstance() {
    static_init_11();
    return InteractionPattern_ContentFeed_instance;
  }
  function InteractionPattern_ContentReading_getInstance() {
    static_init_11();
    return InteractionPattern_ContentReading_instance;
  }
  function InteractionPattern_SearchDiscovery_getInstance() {
    static_init_11();
    return InteractionPattern_SearchDiscovery_instance;
  }
  function InteractionPattern_MediaBrowse_getInstance() {
    static_init_11();
    return InteractionPattern_MediaBrowse_instance;
  }
  function InteractionPattern_DashboardMonitoring_getInstance() {
    static_init_11();
    return InteractionPattern_DashboardMonitoring_instance;
  }
  function InteractionPattern_CheckoutCommerce_getInstance() {
    static_init_11();
    return InteractionPattern_CheckoutCommerce_instance;
  }
  function InteractionPattern_AuthOnboarding_getInstance() {
    static_init_11();
    return InteractionPattern_AuthOnboarding_instance;
  }
  function InteractionPattern_SettingsAdmin_getInstance() {
    static_init_11();
    return InteractionPattern_SettingsAdmin_instance;
  }
  function IdentityIntent$Companion$$childSerializers$_anonymous__t40tzk() {
    return Companion_instance_18.s18();
  }
  function IdentityIntent$Companion$$childSerializers$_anonymous__t40tzk_0() {
    return new ArrayListSerializer(Companion_instance_18.s18());
  }
  function IdentityIntent$Companion$$childSerializers$_anonymous__t40tzk_1() {
    return Companion_getInstance_27().s18();
  }
  function Companion_27() {
    Companion_instance_28 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, IdentityIntent$Companion$$childSerializers$_anonymous__t40tzk);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_3 = lazy(tmp_2, IdentityIntent$Companion$$childSerializers$_anonymous__t40tzk_0);
    var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.z1g_1 = [tmp_1, tmp_3, lazy(tmp_4, IdentityIntent$Companion$$childSerializers$_anonymous__t40tzk_1), null, null];
  }
  var Companion_instance_28;
  function Companion_getInstance_26() {
    if (Companion_instance_28 == null)
      new Companion_27();
    return Companion_instance_28;
  }
  function $serializer_14() {
    $serializer_instance_14 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.IdentityIntent', this, 5);
    tmp0_serialDesc.lp('brandColor', true);
    tmp0_serialDesc.lp('supportingColors', true);
    tmp0_serialDesc.lp('presence', true);
    tmp0_serialDesc.lp('typography', true);
    tmp0_serialDesc.lp('deriveColors', true);
    this.a1h_1 = tmp0_serialDesc;
  }
  protoOf($serializer_14).b1h = function (encoder, value) {
    var tmp0_desc = this.a1h_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_26().z1g_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.c1h_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.c1h_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !equals(value.d1h_1, emptyList())) {
      tmp1_output.ok(tmp0_desc, 1, tmp2_cached[1].q1(), value.d1h_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !(value.e1h_1 == null)) {
      tmp1_output.qk(tmp0_desc, 2, tmp2_cached[2].q1(), value.e1h_1);
    }
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !(value.f1h_1 == null)) {
      tmp1_output.qk(tmp0_desc, 3, $serializer_getInstance_15(), value.f1h_1);
    }
    if (tmp1_output.uk(tmp0_desc, 4) ? true : !(value.g1h_1 === true)) {
      tmp1_output.ek(tmp0_desc, 4, value.g1h_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_14).yf = function (encoder, value) {
    return this.b1h(encoder, value instanceof IdentityIntent ? value : THROW_CCE());
  };
  protoOf($serializer_14).zf = function (decoder) {
    var tmp0_desc = this.a1h_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = false;
    var tmp9_input = decoder.xi(tmp0_desc);
    var tmp10_cached = Companion_getInstance_26().z1g_1;
    if (tmp9_input.nj()) {
      tmp4_local0 = tmp9_input.lj(tmp0_desc, 0, tmp10_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp9_input.jj(tmp0_desc, 1, tmp10_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp9_input.lj(tmp0_desc, 2, tmp10_cached[2].q1(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp9_input.lj(tmp0_desc, 3, $serializer_getInstance_15(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp9_input.zi(tmp0_desc, 4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp9_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp9_input.lj(tmp0_desc, 0, tmp10_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp9_input.jj(tmp0_desc, 1, tmp10_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp9_input.lj(tmp0_desc, 2, tmp10_cached[2].q1(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp9_input.lj(tmp0_desc, 3, $serializer_getInstance_15(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp9_input.zi(tmp0_desc, 4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp9_input.yi(tmp0_desc);
    return IdentityIntent_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, null);
  };
  protoOf($serializer_14).xf = function () {
    return this.a1h_1;
  };
  protoOf($serializer_14).aq = function () {
    var tmp0_cached = Companion_getInstance_26().z1g_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1()), tmp0_cached[1].q1(), get_nullable(tmp0_cached[2].q1()), get_nullable($serializer_getInstance_15()), BooleanSerializer_getInstance()];
  };
  var $serializer_instance_14;
  function $serializer_getInstance_14() {
    if ($serializer_instance_14 == null)
      new $serializer_14();
    return $serializer_instance_14;
  }
  function IdentityIntent_init_$Init$(seen0, brandColor, supportingColors, presence, typography, deriveColors, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_14().a1h_1);
    }
    if (0 === (seen0 & 1))
      $this.c1h_1 = null;
    else
      $this.c1h_1 = brandColor;
    if (0 === (seen0 & 2))
      $this.d1h_1 = emptyList();
    else
      $this.d1h_1 = supportingColors;
    if (0 === (seen0 & 4))
      $this.e1h_1 = null;
    else
      $this.e1h_1 = presence;
    if (0 === (seen0 & 8))
      $this.f1h_1 = null;
    else
      $this.f1h_1 = typography;
    if (0 === (seen0 & 16))
      $this.g1h_1 = true;
    else
      $this.g1h_1 = deriveColors;
    return $this;
  }
  function IdentityIntent_init_$Create$(seen0, brandColor, supportingColors, presence, typography, deriveColors, serializationConstructorMarker) {
    return IdentityIntent_init_$Init$(seen0, brandColor, supportingColors, presence, typography, deriveColors, serializationConstructorMarker, objectCreate(protoOf(IdentityIntent)));
  }
  function IdentityIntent(brandColor, supportingColors, presence, typography, deriveColors) {
    Companion_getInstance_26();
    brandColor = brandColor === VOID ? null : brandColor;
    supportingColors = supportingColors === VOID ? emptyList() : supportingColors;
    presence = presence === VOID ? null : presence;
    typography = typography === VOID ? null : typography;
    deriveColors = deriveColors === VOID ? true : deriveColors;
    this.c1h_1 = brandColor;
    this.d1h_1 = supportingColors;
    this.e1h_1 = presence;
    this.f1h_1 = typography;
    this.g1h_1 = deriveColors;
  }
  protoOf(IdentityIntent).toString = function () {
    return 'IdentityIntent(brandColor=' + toString_0(this.c1h_1) + ', supportingColors=' + toString(this.d1h_1) + ', presence=' + toString_0(this.e1h_1) + ', typography=' + toString_0(this.f1h_1) + ', deriveColors=' + this.g1h_1 + ')';
  };
  protoOf(IdentityIntent).hashCode = function () {
    var result = this.c1h_1 == null ? 0 : hashCode(this.c1h_1);
    result = imul(result, 31) + hashCode(this.d1h_1) | 0;
    result = imul(result, 31) + (this.e1h_1 == null ? 0 : this.e1h_1.hashCode()) | 0;
    result = imul(result, 31) + (this.f1h_1 == null ? 0 : this.f1h_1.hashCode()) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.g1h_1) | 0;
    return result;
  };
  protoOf(IdentityIntent).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IdentityIntent))
      return false;
    if (!equals(this.c1h_1, other.c1h_1))
      return false;
    if (!equals(this.d1h_1, other.d1h_1))
      return false;
    if (!equals(this.e1h_1, other.e1h_1))
      return false;
    if (!equals(this.f1h_1, other.f1h_1))
      return false;
    if (!(this.g1h_1 === other.g1h_1))
      return false;
    return true;
  };
  function _get_$cachedSerializer__te6jhj_10($this) {
    return $this.y1g_1.q1();
  }
  function BrandPresence$Companion$_anonymous__vi4jal() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.intent.BrandPresence', values_11());
  }
  var static_init_called_12;
  function static_init_12() {
    if (static_init_called_12)
      return Unit_instance;
    static_init_called_12 = true;
    BrandPresence_Subtle_instance = new BrandPresence('Subtle', 0);
    BrandPresence_Balanced_instance = new BrandPresence('Balanced', 1);
    BrandPresence_Strong_instance = new BrandPresence('Strong', 2);
    BrandPresence_Dominant_instance = new BrandPresence('Dominant', 3);
    if (Companion_instance_29 == null) {
      Companion_instance;
      new Companion_28();
    }
  }
  var BrandPresence_Subtle_instance;
  var BrandPresence_Balanced_instance;
  var BrandPresence_Strong_instance;
  var BrandPresence_Dominant_instance;
  function values_11() {
    static_init_12();
    return [BrandPresence_Subtle_getInstance(), BrandPresence_Balanced_getInstance(), BrandPresence_Strong_getInstance(), BrandPresence_Dominant_getInstance()];
  }
  function Companion_28() {
    Companion_instance_29 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.y1g_1 = lazy(tmp_0, BrandPresence$Companion$_anonymous__vi4jal);
  }
  protoOf(Companion_28).s18 = function () {
    return _get_$cachedSerializer__te6jhj_10(this);
  };
  var Companion_instance_29;
  function Companion_getInstance_27() {
    static_init_12();
    return Companion_instance_29;
  }
  function BrandPresence(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function TypographyIdentity$Companion$$childSerializers$_anonymous__wd8z6l() {
    return new ArrayListSerializer(Companion_instance_79.s18());
  }
  function TypographyIdentity$Companion$$childSerializers$_anonymous__wd8z6l_0() {
    return Companion_instance_79.s18();
  }
  function TypographyIdentity$Companion$$childSerializers$_anonymous__wd8z6l_1() {
    return Companion_instance_79.s18();
  }
  function TypographyIdentity$Companion$$childSerializers$_anonymous__wd8z6l_2() {
    return Companion_instance_79.s18();
  }
  function Companion_29() {
    Companion_instance_30 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, TypographyIdentity$Companion$$childSerializers$_anonymous__wd8z6l);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_3 = lazy(tmp_2, TypographyIdentity$Companion$$childSerializers$_anonymous__wd8z6l_0);
    var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_5 = lazy(tmp_4, TypographyIdentity$Companion$$childSerializers$_anonymous__wd8z6l_1);
    var tmp_6 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.h1h_1 = [tmp_1, tmp_3, tmp_5, lazy(tmp_6, TypographyIdentity$Companion$$childSerializers$_anonymous__wd8z6l_2)];
  }
  var Companion_instance_30;
  function Companion_getInstance_28() {
    if (Companion_instance_30 == null)
      new Companion_29();
    return Companion_instance_30;
  }
  function $serializer_15() {
    $serializer_instance_15 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.TypographyIdentity', this, 4);
    tmp0_serialDesc.lp('candidates', true);
    tmp0_serialDesc.lp('structure', true);
    tmp0_serialDesc.lp('content', true);
    tmp0_serialDesc.lp('metadata', true);
    this.i1h_1 = tmp0_serialDesc;
  }
  protoOf($serializer_15).j1h = function (encoder, value) {
    var tmp0_desc = this.i1h_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_28().h1h_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !equals(value.k1h_1, emptyList())) {
      tmp1_output.ok(tmp0_desc, 0, tmp2_cached[0].q1(), value.k1h_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.l1h_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, tmp2_cached[1].q1(), value.l1h_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !(value.m1h_1 == null)) {
      tmp1_output.qk(tmp0_desc, 2, tmp2_cached[2].q1(), value.m1h_1);
    }
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !(value.n1h_1 == null)) {
      tmp1_output.qk(tmp0_desc, 3, tmp2_cached[3].q1(), value.n1h_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_15).yf = function (encoder, value) {
    return this.j1h(encoder, value instanceof TypographyIdentity ? value : THROW_CCE());
  };
  protoOf($serializer_15).zf = function (decoder) {
    var tmp0_desc = this.i1h_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_input = decoder.xi(tmp0_desc);
    var tmp9_cached = Companion_getInstance_28().h1h_1;
    if (tmp8_input.nj()) {
      tmp4_local0 = tmp8_input.jj(tmp0_desc, 0, tmp9_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.lj(tmp0_desc, 1, tmp9_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.lj(tmp0_desc, 2, tmp9_cached[2].q1(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.lj(tmp0_desc, 3, tmp9_cached[3].q1(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.jj(tmp0_desc, 0, tmp9_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.lj(tmp0_desc, 1, tmp9_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.lj(tmp0_desc, 2, tmp9_cached[2].q1(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.lj(tmp0_desc, 3, tmp9_cached[3].q1(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.yi(tmp0_desc);
    return TypographyIdentity_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_15).xf = function () {
    return this.i1h_1;
  };
  protoOf($serializer_15).aq = function () {
    var tmp0_cached = Companion_getInstance_28().h1h_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [tmp0_cached[0].q1(), get_nullable(tmp0_cached[1].q1()), get_nullable(tmp0_cached[2].q1()), get_nullable(tmp0_cached[3].q1())];
  };
  var $serializer_instance_15;
  function $serializer_getInstance_15() {
    if ($serializer_instance_15 == null)
      new $serializer_15();
    return $serializer_instance_15;
  }
  function TypographyIdentity_init_$Init$(seen0, candidates, structure, content, metadata, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_15().i1h_1);
    }
    if (0 === (seen0 & 1))
      $this.k1h_1 = emptyList();
    else
      $this.k1h_1 = candidates;
    if (0 === (seen0 & 2))
      $this.l1h_1 = null;
    else
      $this.l1h_1 = structure;
    if (0 === (seen0 & 4))
      $this.m1h_1 = null;
    else
      $this.m1h_1 = content;
    if (0 === (seen0 & 8))
      $this.n1h_1 = null;
    else
      $this.n1h_1 = metadata;
    return $this;
  }
  function TypographyIdentity_init_$Create$(seen0, candidates, structure, content, metadata, serializationConstructorMarker) {
    return TypographyIdentity_init_$Init$(seen0, candidates, structure, content, metadata, serializationConstructorMarker, objectCreate(protoOf(TypographyIdentity)));
  }
  function TypographyIdentity(candidates, structure, content, metadata) {
    Companion_getInstance_28();
    candidates = candidates === VOID ? emptyList() : candidates;
    structure = structure === VOID ? null : structure;
    content = content === VOID ? null : content;
    metadata = metadata === VOID ? null : metadata;
    this.k1h_1 = candidates;
    this.l1h_1 = structure;
    this.m1h_1 = content;
    this.n1h_1 = metadata;
  }
  protoOf(TypographyIdentity).o1h = function (candidates, structure, content, metadata) {
    return new TypographyIdentity(candidates, structure, content, metadata);
  };
  protoOf(TypographyIdentity).p1h = function (candidates, structure, content, metadata, $super) {
    candidates = candidates === VOID ? this.k1h_1 : candidates;
    structure = structure === VOID ? this.l1h_1 : structure;
    content = content === VOID ? this.m1h_1 : content;
    metadata = metadata === VOID ? this.n1h_1 : metadata;
    return $super === VOID ? this.o1h(candidates, structure, content, metadata) : $super.o1h.call(this, candidates, structure, content, metadata);
  };
  protoOf(TypographyIdentity).toString = function () {
    return 'TypographyIdentity(candidates=' + toString(this.k1h_1) + ', structure=' + toString_0(this.l1h_1) + ', content=' + toString_0(this.m1h_1) + ', metadata=' + toString_0(this.n1h_1) + ')';
  };
  protoOf(TypographyIdentity).hashCode = function () {
    var result = hashCode(this.k1h_1);
    result = imul(result, 31) + (this.l1h_1 == null ? 0 : hashCode(this.l1h_1)) | 0;
    result = imul(result, 31) + (this.m1h_1 == null ? 0 : hashCode(this.m1h_1)) | 0;
    result = imul(result, 31) + (this.n1h_1 == null ? 0 : hashCode(this.n1h_1)) | 0;
    return result;
  };
  protoOf(TypographyIdentity).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TypographyIdentity))
      return false;
    if (!equals(this.k1h_1, other.k1h_1))
      return false;
    if (!equals(this.l1h_1, other.l1h_1))
      return false;
    if (!equals(this.m1h_1, other.m1h_1))
      return false;
    if (!equals(this.n1h_1, other.n1h_1))
      return false;
    return true;
  };
  function BrandPresence_Subtle_getInstance() {
    static_init_12();
    return BrandPresence_Subtle_instance;
  }
  function BrandPresence_Balanced_getInstance() {
    static_init_12();
    return BrandPresence_Balanced_instance;
  }
  function BrandPresence_Strong_getInstance() {
    static_init_12();
    return BrandPresence_Strong_instance;
  }
  function BrandPresence_Dominant_getInstance() {
    static_init_12();
    return BrandPresence_Dominant_instance;
  }
  function get_HEX_PATTERN() {
    _init_properties_IntentValidation_kt__3tsj6z();
    return HEX_PATTERN;
  }
  var HEX_PATTERN;
  function violatingKnobs(_this__u8e3s4) {
    _init_properties_IntentValidation_kt__3tsj6z();
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = knobEntries(_this__u8e3s4);
    // Inline function 'kotlin.collections.filterTo' call
    var destination = LinkedHashMap_init_$Create$();
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = tmp0.w1().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component2' call
      var value = element.q1();
      if (!isFinite(value) || value < -1.0 || value > 1.0) {
        destination.x1(element.p1(), element.q1());
      }
    }
    return destination;
  }
  function clamped(_this__u8e3s4) {
    _init_properties_IntentValidation_kt__3tsj6z();
    return new MoodKnobs(clampKnob(_this__u8e3s4.j18_1), clampKnob(_this__u8e3s4.k18_1), clampKnob(_this__u8e3s4.l18_1), clampKnob(_this__u8e3s4.m18_1), clampKnob(_this__u8e3s4.n18_1), clampKnob(_this__u8e3s4.o18_1), clampKnob(_this__u8e3s4.p18_1), clampKnob(_this__u8e3s4.q18_1));
  }
  function isWellFormed(_this__u8e3s4) {
    _init_properties_IntentValidation_kt__3tsj6z();
    var tmp;
    if (_this__u8e3s4 instanceof Hex) {
      var tmp0 = _this__u8e3s4.r1e_1;
      // Inline function 'kotlin.text.matches' call
      tmp = get_HEX_PATTERN().w9(tmp0);
    } else {
      if (_this__u8e3s4 instanceof Argb) {
        tmp = true;
      } else {
        if (_this__u8e3s4 instanceof Hsl) {
          tmp = (isFinite(_this__u8e3s4.x1e_1) && isFinite(_this__u8e3s4.y1e_1) && isFinite(_this__u8e3s4.z1e_1) && isFinite(_this__u8e3s4.a1f_1));
        } else {
          if (_this__u8e3s4 instanceof Oklch) {
            tmp = true;
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    return tmp;
  }
  function hasPresenceWithoutBrand(_this__u8e3s4) {
    _init_properties_IntentValidation_kt__3tsj6z();
    return !(_this__u8e3s4.e1h_1 == null) && _this__u8e3s4.c1h_1 == null;
  }
  function excessSupportingColorCount(_this__u8e3s4) {
    _init_properties_IntentValidation_kt__3tsj6z();
    return coerceAtLeast_0(_this__u8e3s4.d1h_1.m() - 3 | 0, 0);
  }
  function dedupedCandidates(_this__u8e3s4) {
    _init_properties_IntentValidation_kt__3tsj6z();
    var pins = setOfNotNull([_this__u8e3s4.l1h_1, _this__u8e3s4.m1h_1, _this__u8e3s4.n1h_1]);
    // Inline function 'kotlin.collections.filterNot' call
    var tmp0 = distinct(_this__u8e3s4.k1h_1);
    // Inline function 'kotlin.collections.filterNotTo' call
    var destination = ArrayList_init_$Create$_0();
    var _iterator__ex2g4s = tmp0.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      if (!pins.n1(element)) {
        destination.f(element);
      }
    }
    return destination;
  }
  function clampKnob(value) {
    _init_properties_IntentValidation_kt__3tsj6z();
    var tmp;
    if (value == null) {
      tmp = null;
    } else if (!isFinite(value)) {
      tmp = null;
    } else {
      tmp = coerceIn(value, -1.0, 1.0);
    }
    return tmp;
  }
  var properties_initialized_IntentValidation_kt_wfapnt;
  function _init_properties_IntentValidation_kt__3tsj6z() {
    if (!properties_initialized_IntentValidation_kt_wfapnt) {
      properties_initialized_IntentValidation_kt_wfapnt = true;
      HEX_PATTERN = Regex_init_$Create$('^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$');
    }
  }
  function _get_$cachedSerializer__te6jhj_11($this) {
    return $this.q1h_1.q1();
  }
  function MoodPreset$Companion$_anonymous__fxgl2f() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.intent.MoodPreset', values_12());
  }
  var static_init_called_13;
  function static_init_13() {
    if (static_init_called_13)
      return Unit_instance;
    static_init_called_13 = true;
    MoodPreset_Neutral_instance = new MoodPreset('Neutral', 0);
    MoodPreset_Calm_instance = new MoodPreset('Calm', 1);
    MoodPreset_Professional_instance = new MoodPreset('Professional', 2);
    MoodPreset_Bold_instance = new MoodPreset('Bold', 3);
    MoodPreset_Playful_instance = new MoodPreset('Playful', 4);
    MoodPreset_Minimal_instance = new MoodPreset('Minimal', 5);
    MoodPreset_Expressive_instance = new MoodPreset('Expressive', 6);
    if (Companion_instance_31 == null) {
      Companion_instance;
      new Companion_30();
    }
  }
  var MoodPreset_Neutral_instance;
  var MoodPreset_Calm_instance;
  var MoodPreset_Professional_instance;
  var MoodPreset_Bold_instance;
  var MoodPreset_Playful_instance;
  var MoodPreset_Minimal_instance;
  var MoodPreset_Expressive_instance;
  function values_12() {
    static_init_13();
    return [MoodPreset_Neutral_getInstance(), MoodPreset_Calm_getInstance(), MoodPreset_Professional_getInstance(), MoodPreset_Bold_getInstance(), MoodPreset_Playful_getInstance(), MoodPreset_Minimal_getInstance(), MoodPreset_Expressive_getInstance()];
  }
  function Companion_30() {
    Companion_instance_31 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.q1h_1 = lazy(tmp_0, MoodPreset$Companion$_anonymous__fxgl2f);
  }
  protoOf(Companion_30).s18 = function () {
    return _get_$cachedSerializer__te6jhj_11(this);
  };
  var Companion_instance_31;
  function Companion_getInstance_29() {
    static_init_13();
    return Companion_instance_31;
  }
  function MoodPreset(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function MoodIntent$Companion$$childSerializers$_anonymous__6qy7ux() {
    return Companion_getInstance_29().s18();
  }
  function Companion_31() {
    Companion_instance_32 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.r1h_1 = [lazy(tmp_0, MoodIntent$Companion$$childSerializers$_anonymous__6qy7ux), null];
  }
  var Companion_instance_32;
  function Companion_getInstance_30() {
    if (Companion_instance_32 == null)
      new Companion_31();
    return Companion_instance_32;
  }
  function $serializer_16() {
    $serializer_instance_16 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.MoodIntent', this, 2);
    tmp0_serialDesc.lp('preset', true);
    tmp0_serialDesc.lp('knobs', true);
    this.s1h_1 = tmp0_serialDesc;
  }
  protoOf($serializer_16).t1h = function (encoder, value) {
    var tmp0_desc = this.s1h_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_30().r1h_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.u1h_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.u1h_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.v1h_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, $serializer_getInstance_17(), value.v1h_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_16).yf = function (encoder, value) {
    return this.t1h(encoder, value instanceof MoodIntent ? value : THROW_CCE());
  };
  protoOf($serializer_16).zf = function (decoder) {
    var tmp0_desc = this.s1h_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    var tmp7_cached = Companion_getInstance_30().r1h_1;
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.lj(tmp0_desc, 0, tmp7_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, $serializer_getInstance_17(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.lj(tmp0_desc, 0, tmp7_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, $serializer_getInstance_17(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return MoodIntent_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_16).xf = function () {
    return this.s1h_1;
  };
  protoOf($serializer_16).aq = function () {
    var tmp0_cached = Companion_getInstance_30().r1h_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1()), get_nullable($serializer_getInstance_17())];
  };
  var $serializer_instance_16;
  function $serializer_getInstance_16() {
    if ($serializer_instance_16 == null)
      new $serializer_16();
    return $serializer_instance_16;
  }
  function MoodIntent_init_$Init$(seen0, preset, knobs, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_16().s1h_1);
    }
    if (0 === (seen0 & 1))
      $this.u1h_1 = null;
    else
      $this.u1h_1 = preset;
    if (0 === (seen0 & 2))
      $this.v1h_1 = null;
    else
      $this.v1h_1 = knobs;
    return $this;
  }
  function MoodIntent_init_$Create$(seen0, preset, knobs, serializationConstructorMarker) {
    return MoodIntent_init_$Init$(seen0, preset, knobs, serializationConstructorMarker, objectCreate(protoOf(MoodIntent)));
  }
  function MoodIntent(preset, knobs) {
    Companion_getInstance_30();
    preset = preset === VOID ? null : preset;
    knobs = knobs === VOID ? null : knobs;
    this.u1h_1 = preset;
    this.v1h_1 = knobs;
  }
  protoOf(MoodIntent).toString = function () {
    return 'MoodIntent(preset=' + toString_0(this.u1h_1) + ', knobs=' + toString_0(this.v1h_1) + ')';
  };
  protoOf(MoodIntent).hashCode = function () {
    var result = this.u1h_1 == null ? 0 : this.u1h_1.hashCode();
    result = imul(result, 31) + (this.v1h_1 == null ? 0 : this.v1h_1.hashCode()) | 0;
    return result;
  };
  protoOf(MoodIntent).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MoodIntent))
      return false;
    if (!equals(this.u1h_1, other.u1h_1))
      return false;
    if (!equals(this.v1h_1, other.v1h_1))
      return false;
    return true;
  };
  function Companion_32() {
  }
  var Companion_instance_33;
  function Companion_getInstance_31() {
    return Companion_instance_33;
  }
  function $serializer_17() {
    $serializer_instance_17 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.MoodKnobs', this, 8);
    tmp0_serialDesc.lp('warmth', true);
    tmp0_serialDesc.lp('chroma', true);
    tmp0_serialDesc.lp('contrast', true);
    tmp0_serialDesc.lp('density', true);
    tmp0_serialDesc.lp('roundness', true);
    tmp0_serialDesc.lp('typographyExpressiveness', true);
    tmp0_serialDesc.lp('motionEnergy', true);
    tmp0_serialDesc.lp('playfulness', true);
    this.w1h_1 = tmp0_serialDesc;
  }
  protoOf($serializer_17).x1h = function (encoder, value) {
    var tmp0_desc = this.w1h_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.j18_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, FloatSerializer_getInstance(), value.j18_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.k18_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, FloatSerializer_getInstance(), value.k18_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !(value.l18_1 == null)) {
      tmp1_output.qk(tmp0_desc, 2, FloatSerializer_getInstance(), value.l18_1);
    }
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !(value.m18_1 == null)) {
      tmp1_output.qk(tmp0_desc, 3, FloatSerializer_getInstance(), value.m18_1);
    }
    if (tmp1_output.uk(tmp0_desc, 4) ? true : !(value.n18_1 == null)) {
      tmp1_output.qk(tmp0_desc, 4, FloatSerializer_getInstance(), value.n18_1);
    }
    if (tmp1_output.uk(tmp0_desc, 5) ? true : !(value.o18_1 == null)) {
      tmp1_output.qk(tmp0_desc, 5, FloatSerializer_getInstance(), value.o18_1);
    }
    if (tmp1_output.uk(tmp0_desc, 6) ? true : !(value.p18_1 == null)) {
      tmp1_output.qk(tmp0_desc, 6, FloatSerializer_getInstance(), value.p18_1);
    }
    if (tmp1_output.uk(tmp0_desc, 7) ? true : !(value.q18_1 == null)) {
      tmp1_output.qk(tmp0_desc, 7, FloatSerializer_getInstance(), value.q18_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_17).yf = function (encoder, value) {
    return this.x1h(encoder, value instanceof MoodKnobs ? value : THROW_CCE());
  };
  protoOf($serializer_17).zf = function (decoder) {
    var tmp0_desc = this.w1h_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = null;
    var tmp9_local5 = null;
    var tmp10_local6 = null;
    var tmp11_local7 = null;
    var tmp12_input = decoder.xi(tmp0_desc);
    if (tmp12_input.nj()) {
      tmp4_local0 = tmp12_input.lj(tmp0_desc, 0, FloatSerializer_getInstance(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp12_input.lj(tmp0_desc, 1, FloatSerializer_getInstance(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp12_input.lj(tmp0_desc, 2, FloatSerializer_getInstance(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp12_input.lj(tmp0_desc, 3, FloatSerializer_getInstance(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp12_input.lj(tmp0_desc, 4, FloatSerializer_getInstance(), tmp8_local4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp12_input.lj(tmp0_desc, 5, FloatSerializer_getInstance(), tmp9_local5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
      tmp10_local6 = tmp12_input.lj(tmp0_desc, 6, FloatSerializer_getInstance(), tmp10_local6);
      tmp3_bitMask0 = tmp3_bitMask0 | 64;
      tmp11_local7 = tmp12_input.lj(tmp0_desc, 7, FloatSerializer_getInstance(), tmp11_local7);
      tmp3_bitMask0 = tmp3_bitMask0 | 128;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp12_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp12_input.lj(tmp0_desc, 0, FloatSerializer_getInstance(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp12_input.lj(tmp0_desc, 1, FloatSerializer_getInstance(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp12_input.lj(tmp0_desc, 2, FloatSerializer_getInstance(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp12_input.lj(tmp0_desc, 3, FloatSerializer_getInstance(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp12_input.lj(tmp0_desc, 4, FloatSerializer_getInstance(), tmp8_local4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp12_input.lj(tmp0_desc, 5, FloatSerializer_getInstance(), tmp9_local5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          case 6:
            tmp10_local6 = tmp12_input.lj(tmp0_desc, 6, FloatSerializer_getInstance(), tmp10_local6);
            tmp3_bitMask0 = tmp3_bitMask0 | 64;
            break;
          case 7:
            tmp11_local7 = tmp12_input.lj(tmp0_desc, 7, FloatSerializer_getInstance(), tmp11_local7);
            tmp3_bitMask0 = tmp3_bitMask0 | 128;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp12_input.yi(tmp0_desc);
    return MoodKnobs_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, null);
  };
  protoOf($serializer_17).xf = function () {
    return this.w1h_1;
  };
  protoOf($serializer_17).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(FloatSerializer_getInstance()), get_nullable(FloatSerializer_getInstance()), get_nullable(FloatSerializer_getInstance()), get_nullable(FloatSerializer_getInstance()), get_nullable(FloatSerializer_getInstance()), get_nullable(FloatSerializer_getInstance()), get_nullable(FloatSerializer_getInstance()), get_nullable(FloatSerializer_getInstance())];
  };
  var $serializer_instance_17;
  function $serializer_getInstance_17() {
    if ($serializer_instance_17 == null)
      new $serializer_17();
    return $serializer_instance_17;
  }
  function MoodKnobs_init_$Init$(seen0, warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_17().w1h_1);
    }
    if (0 === (seen0 & 1))
      $this.j18_1 = null;
    else
      $this.j18_1 = warmth;
    if (0 === (seen0 & 2))
      $this.k18_1 = null;
    else
      $this.k18_1 = chroma;
    if (0 === (seen0 & 4))
      $this.l18_1 = null;
    else
      $this.l18_1 = contrast;
    if (0 === (seen0 & 8))
      $this.m18_1 = null;
    else
      $this.m18_1 = density;
    if (0 === (seen0 & 16))
      $this.n18_1 = null;
    else
      $this.n18_1 = roundness;
    if (0 === (seen0 & 32))
      $this.o18_1 = null;
    else
      $this.o18_1 = typographyExpressiveness;
    if (0 === (seen0 & 64))
      $this.p18_1 = null;
    else
      $this.p18_1 = motionEnergy;
    if (0 === (seen0 & 128))
      $this.q18_1 = null;
    else
      $this.q18_1 = playfulness;
    return $this;
  }
  function MoodKnobs_init_$Create$(seen0, warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness, serializationConstructorMarker) {
    return MoodKnobs_init_$Init$(seen0, warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness, serializationConstructorMarker, objectCreate(protoOf(MoodKnobs)));
  }
  function MoodKnobs(warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness) {
    warmth = warmth === VOID ? null : warmth;
    chroma = chroma === VOID ? null : chroma;
    contrast = contrast === VOID ? null : contrast;
    density = density === VOID ? null : density;
    roundness = roundness === VOID ? null : roundness;
    typographyExpressiveness = typographyExpressiveness === VOID ? null : typographyExpressiveness;
    motionEnergy = motionEnergy === VOID ? null : motionEnergy;
    playfulness = playfulness === VOID ? null : playfulness;
    this.j18_1 = warmth;
    this.k18_1 = chroma;
    this.l18_1 = contrast;
    this.m18_1 = density;
    this.n18_1 = roundness;
    this.o18_1 = typographyExpressiveness;
    this.p18_1 = motionEnergy;
    this.q18_1 = playfulness;
  }
  protoOf(MoodKnobs).toString = function () {
    return 'MoodKnobs(warmth=' + this.j18_1 + ', chroma=' + this.k18_1 + ', contrast=' + this.l18_1 + ', density=' + this.m18_1 + ', roundness=' + this.n18_1 + ', typographyExpressiveness=' + this.o18_1 + ', motionEnergy=' + this.p18_1 + ', playfulness=' + this.q18_1 + ')';
  };
  protoOf(MoodKnobs).hashCode = function () {
    var result = this.j18_1 == null ? 0 : getNumberHashCode(this.j18_1);
    result = imul(result, 31) + (this.k18_1 == null ? 0 : getNumberHashCode(this.k18_1)) | 0;
    result = imul(result, 31) + (this.l18_1 == null ? 0 : getNumberHashCode(this.l18_1)) | 0;
    result = imul(result, 31) + (this.m18_1 == null ? 0 : getNumberHashCode(this.m18_1)) | 0;
    result = imul(result, 31) + (this.n18_1 == null ? 0 : getNumberHashCode(this.n18_1)) | 0;
    result = imul(result, 31) + (this.o18_1 == null ? 0 : getNumberHashCode(this.o18_1)) | 0;
    result = imul(result, 31) + (this.p18_1 == null ? 0 : getNumberHashCode(this.p18_1)) | 0;
    result = imul(result, 31) + (this.q18_1 == null ? 0 : getNumberHashCode(this.q18_1)) | 0;
    return result;
  };
  protoOf(MoodKnobs).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MoodKnobs))
      return false;
    if (!equals(this.j18_1, other.j18_1))
      return false;
    if (!equals(this.k18_1, other.k18_1))
      return false;
    if (!equals(this.l18_1, other.l18_1))
      return false;
    if (!equals(this.m18_1, other.m18_1))
      return false;
    if (!equals(this.n18_1, other.n18_1))
      return false;
    if (!equals(this.o18_1, other.o18_1))
      return false;
    if (!equals(this.p18_1, other.p18_1))
      return false;
    if (!equals(this.q18_1, other.q18_1))
      return false;
    return true;
  };
  function isSpecified(_this__u8e3s4) {
    return !isUnspecified(_this__u8e3s4);
  }
  function isUnspecified(_this__u8e3s4) {
    var activeKnobs = _this__u8e3s4 == null ? null : _this__u8e3s4.v1h_1;
    var specified = _this__u8e3s4 == null ? false : !(_this__u8e3s4.u1h_1 == null) ? true : activeKnobs == null ? false : !(activeKnobs.j18_1 == null) || !(activeKnobs.k18_1 == null) || !(activeKnobs.l18_1 == null) || !(activeKnobs.m18_1 == null) || !(activeKnobs.n18_1 == null) || !(activeKnobs.o18_1 == null) || !(activeKnobs.p18_1 == null) || !(activeKnobs.q18_1 == null);
    return !specified;
  }
  function MoodPreset_Neutral_getInstance() {
    static_init_13();
    return MoodPreset_Neutral_instance;
  }
  function MoodPreset_Calm_getInstance() {
    static_init_13();
    return MoodPreset_Calm_instance;
  }
  function MoodPreset_Professional_getInstance() {
    static_init_13();
    return MoodPreset_Professional_instance;
  }
  function MoodPreset_Bold_getInstance() {
    static_init_13();
    return MoodPreset_Bold_instance;
  }
  function MoodPreset_Playful_getInstance() {
    static_init_13();
    return MoodPreset_Playful_instance;
  }
  function MoodPreset_Minimal_getInstance() {
    static_init_13();
    return MoodPreset_Minimal_instance;
  }
  function MoodPreset_Expressive_getInstance() {
    static_init_13();
    return MoodPreset_Expressive_instance;
  }
  function Companion_33() {
  }
  var Companion_instance_34;
  function Companion_getInstance_32() {
    return Companion_instance_34;
  }
  function $serializer_18() {
    $serializer_instance_18 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.ConstraintsControl', this, 7);
    tmp0_serialDesc.lp('minContrast', true);
    tmp0_serialDesc.lp('minTouchTarget', true);
    tmp0_serialDesc.lp('spacing', true);
    tmp0_serialDesc.lp('size', true);
    tmp0_serialDesc.lp('radius', true);
    tmp0_serialDesc.lp('motion', true);
    tmp0_serialDesc.lp('typography', true);
    this.y1h_1 = tmp0_serialDesc;
  }
  protoOf($serializer_18).z1h = function (encoder, value) {
    var tmp0_desc = this.y1h_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.a1i_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, $serializer_getInstance_19(), value.a1i_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.b1i_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, $serializer_getInstance_20(), value.b1i_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !(value.c1i_1 == null)) {
      tmp1_output.qk(tmp0_desc, 2, $serializer_getInstance_22(), value.c1i_1);
    }
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !(value.d1i_1 == null)) {
      tmp1_output.qk(tmp0_desc, 3, $serializer_getInstance_22(), value.d1i_1);
    }
    if (tmp1_output.uk(tmp0_desc, 4) ? true : !(value.e1i_1 == null)) {
      tmp1_output.qk(tmp0_desc, 4, $serializer_getInstance_22(), value.e1i_1);
    }
    if (tmp1_output.uk(tmp0_desc, 5) ? true : !(value.f1i_1 == null)) {
      tmp1_output.qk(tmp0_desc, 5, $serializer_getInstance_23(), value.f1i_1);
    }
    if (tmp1_output.uk(tmp0_desc, 6) ? true : !(value.g1i_1 == null)) {
      tmp1_output.qk(tmp0_desc, 6, $serializer_getInstance_21(), value.g1i_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_18).yf = function (encoder, value) {
    return this.z1h(encoder, value instanceof ConstraintsControl ? value : THROW_CCE());
  };
  protoOf($serializer_18).zf = function (decoder) {
    var tmp0_desc = this.y1h_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = null;
    var tmp9_local5 = null;
    var tmp10_local6 = null;
    var tmp11_input = decoder.xi(tmp0_desc);
    if (tmp11_input.nj()) {
      tmp4_local0 = tmp11_input.lj(tmp0_desc, 0, $serializer_getInstance_19(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp11_input.lj(tmp0_desc, 1, $serializer_getInstance_20(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp11_input.lj(tmp0_desc, 2, $serializer_getInstance_22(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp11_input.lj(tmp0_desc, 3, $serializer_getInstance_22(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp11_input.lj(tmp0_desc, 4, $serializer_getInstance_22(), tmp8_local4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp11_input.lj(tmp0_desc, 5, $serializer_getInstance_23(), tmp9_local5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
      tmp10_local6 = tmp11_input.lj(tmp0_desc, 6, $serializer_getInstance_21(), tmp10_local6);
      tmp3_bitMask0 = tmp3_bitMask0 | 64;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp11_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp11_input.lj(tmp0_desc, 0, $serializer_getInstance_19(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp11_input.lj(tmp0_desc, 1, $serializer_getInstance_20(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp11_input.lj(tmp0_desc, 2, $serializer_getInstance_22(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp11_input.lj(tmp0_desc, 3, $serializer_getInstance_22(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp11_input.lj(tmp0_desc, 4, $serializer_getInstance_22(), tmp8_local4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp11_input.lj(tmp0_desc, 5, $serializer_getInstance_23(), tmp9_local5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          case 6:
            tmp10_local6 = tmp11_input.lj(tmp0_desc, 6, $serializer_getInstance_21(), tmp10_local6);
            tmp3_bitMask0 = tmp3_bitMask0 | 64;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp11_input.yi(tmp0_desc);
    return ConstraintsControl_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, null);
  };
  protoOf($serializer_18).xf = function () {
    return this.y1h_1;
  };
  protoOf($serializer_18).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable($serializer_getInstance_19()), get_nullable($serializer_getInstance_20()), get_nullable($serializer_getInstance_22()), get_nullable($serializer_getInstance_22()), get_nullable($serializer_getInstance_22()), get_nullable($serializer_getInstance_23()), get_nullable($serializer_getInstance_21())];
  };
  var $serializer_instance_18;
  function $serializer_getInstance_18() {
    if ($serializer_instance_18 == null)
      new $serializer_18();
    return $serializer_instance_18;
  }
  function ConstraintsControl_init_$Init$(seen0, minContrast, minTouchTarget, spacing, size, radius, motion, typography, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_18().y1h_1);
    }
    if (0 === (seen0 & 1))
      $this.a1i_1 = null;
    else
      $this.a1i_1 = minContrast;
    if (0 === (seen0 & 2))
      $this.b1i_1 = null;
    else
      $this.b1i_1 = minTouchTarget;
    if (0 === (seen0 & 4))
      $this.c1i_1 = null;
    else
      $this.c1i_1 = spacing;
    if (0 === (seen0 & 8))
      $this.d1i_1 = null;
    else
      $this.d1i_1 = size;
    if (0 === (seen0 & 16))
      $this.e1i_1 = null;
    else
      $this.e1i_1 = radius;
    if (0 === (seen0 & 32))
      $this.f1i_1 = null;
    else
      $this.f1i_1 = motion;
    if (0 === (seen0 & 64))
      $this.g1i_1 = null;
    else
      $this.g1i_1 = typography;
    return $this;
  }
  function ConstraintsControl_init_$Create$(seen0, minContrast, minTouchTarget, spacing, size, radius, motion, typography, serializationConstructorMarker) {
    return ConstraintsControl_init_$Init$(seen0, minContrast, minTouchTarget, spacing, size, radius, motion, typography, serializationConstructorMarker, objectCreate(protoOf(ConstraintsControl)));
  }
  function ConstraintsControl(minContrast, minTouchTarget, spacing, size, radius, motion, typography) {
    minContrast = minContrast === VOID ? null : minContrast;
    minTouchTarget = minTouchTarget === VOID ? null : minTouchTarget;
    spacing = spacing === VOID ? null : spacing;
    size = size === VOID ? null : size;
    radius = radius === VOID ? null : radius;
    motion = motion === VOID ? null : motion;
    typography = typography === VOID ? null : typography;
    this.a1i_1 = minContrast;
    this.b1i_1 = minTouchTarget;
    this.c1i_1 = spacing;
    this.d1i_1 = size;
    this.e1i_1 = radius;
    this.f1i_1 = motion;
    this.g1i_1 = typography;
  }
  protoOf(ConstraintsControl).toString = function () {
    return 'ConstraintsControl(minContrast=' + toString_0(this.a1i_1) + ', minTouchTarget=' + toString_0(this.b1i_1) + ', spacing=' + toString_0(this.c1i_1) + ', size=' + toString_0(this.d1i_1) + ', radius=' + toString_0(this.e1i_1) + ', motion=' + toString_0(this.f1i_1) + ', typography=' + toString_0(this.g1i_1) + ')';
  };
  protoOf(ConstraintsControl).hashCode = function () {
    var result = this.a1i_1 == null ? 0 : this.a1i_1.hashCode();
    result = imul(result, 31) + (this.b1i_1 == null ? 0 : this.b1i_1.hashCode()) | 0;
    result = imul(result, 31) + (this.c1i_1 == null ? 0 : this.c1i_1.hashCode()) | 0;
    result = imul(result, 31) + (this.d1i_1 == null ? 0 : this.d1i_1.hashCode()) | 0;
    result = imul(result, 31) + (this.e1i_1 == null ? 0 : this.e1i_1.hashCode()) | 0;
    result = imul(result, 31) + (this.f1i_1 == null ? 0 : this.f1i_1.hashCode()) | 0;
    result = imul(result, 31) + (this.g1i_1 == null ? 0 : this.g1i_1.hashCode()) | 0;
    return result;
  };
  protoOf(ConstraintsControl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ConstraintsControl))
      return false;
    if (!equals(this.a1i_1, other.a1i_1))
      return false;
    if (!equals(this.b1i_1, other.b1i_1))
      return false;
    if (!equals(this.c1i_1, other.c1i_1))
      return false;
    if (!equals(this.d1i_1, other.d1i_1))
      return false;
    if (!equals(this.e1i_1, other.e1i_1))
      return false;
    if (!equals(this.f1i_1, other.f1i_1))
      return false;
    if (!equals(this.g1i_1, other.g1i_1))
      return false;
    return true;
  };
  function $serializer_19() {
    $serializer_instance_19 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.ContrastConstraint', this, 1);
    tmp0_serialDesc.lp('minRatio', false);
    this.h1i_1 = tmp0_serialDesc;
  }
  protoOf($serializer_19).i1i = function (encoder, value) {
    var tmp0_desc = this.h1i_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.jk(tmp0_desc, 0, value.j1i_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_19).yf = function (encoder, value) {
    return this.i1i(encoder, value instanceof ContrastConstraint ? value : THROW_CCE());
  };
  protoOf($serializer_19).zf = function (decoder) {
    var tmp0_desc = this.h1i_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = 0.0;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.ej(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.ej(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return ContrastConstraint_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_19).xf = function () {
    return this.h1i_1;
  };
  protoOf($serializer_19).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [FloatSerializer_getInstance()];
  };
  var $serializer_instance_19;
  function $serializer_getInstance_19() {
    if ($serializer_instance_19 == null)
      new $serializer_19();
    return $serializer_instance_19;
  }
  function ContrastConstraint_init_$Init$(seen0, minRatio, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_19().h1i_1);
    }
    $this.j1i_1 = minRatio;
    var tmp;
    if (isFinite($this.j1i_1)) {
      var containsArg = $this.j1i_1;
      tmp = 1.0 <= containsArg ? containsArg <= 21.0 : false;
    } else {
      tmp = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp) {
      var message = 'ContrastConstraint.minRatio must be in ' + 1.0 + '..' + 21.0 + ', was ' + $this.j1i_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return $this;
  }
  function ContrastConstraint_init_$Create$(seen0, minRatio, serializationConstructorMarker) {
    return ContrastConstraint_init_$Init$(seen0, minRatio, serializationConstructorMarker, objectCreate(protoOf(ContrastConstraint)));
  }
  function ContrastConstraint() {
  }
  protoOf(ContrastConstraint).toString = function () {
    return 'ContrastConstraint(minRatio=' + this.j1i_1 + ')';
  };
  protoOf(ContrastConstraint).hashCode = function () {
    return getNumberHashCode(this.j1i_1);
  };
  protoOf(ContrastConstraint).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ContrastConstraint))
      return false;
    if (!equals(this.j1i_1, other.j1i_1))
      return false;
    return true;
  };
  function $serializer_20() {
    $serializer_instance_20 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.TouchTargetConstraint', this, 1);
    tmp0_serialDesc.lp('minSize', false);
    this.k1i_1 = tmp0_serialDesc;
  }
  protoOf($serializer_20).l1i = function (encoder, value) {
    var tmp0_desc = this.k1i_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance(), new DpValue(value.m1i_1));
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_20).yf = function (encoder, value) {
    return this.l1i(encoder, value instanceof TouchTargetConstraint ? value : THROW_CCE());
  };
  protoOf($serializer_20).zf = function (decoder) {
    var tmp0_desc = this.k1i_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      var tmp = $serializer_getInstance();
      var tmp_0 = tmp4_local0;
      var tmp_1 = tmp5_input.jj(tmp0_desc, 0, tmp, tmp_0 == null ? null : new DpValue(tmp_0));
      tmp4_local0 = tmp_1 == null ? null : tmp_1.p1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            var tmp_2 = $serializer_getInstance();
            var tmp_3 = tmp4_local0;
            var tmp_4 = tmp5_input.jj(tmp0_desc, 0, tmp_2, tmp_3 == null ? null : new DpValue(tmp_3));
            tmp4_local0 = tmp_4 == null ? null : tmp_4.p1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return TouchTargetConstraint_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_20).xf = function () {
    return this.k1i_1;
  };
  protoOf($serializer_20).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance()];
  };
  var $serializer_instance_20;
  function $serializer_getInstance_20() {
    if ($serializer_instance_20 == null)
      new $serializer_20();
    return $serializer_instance_20;
  }
  function TouchTargetConstraint_init_$Init$(seen0, minSize, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_20().k1i_1);
    }
    $this.m1i_1 = minSize;
    // Inline function 'kotlin.require' call
    if (!(_DpValue___get_value__impl__1j6qu0($this.m1i_1) > 0.0)) {
      var message = 'TouchTargetConstraint.minSize must be positive, was ' + DpValue__toString_impl_qlaqm4($this.m1i_1) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return $this;
  }
  function TouchTargetConstraint_init_$Create$(seen0, minSize, serializationConstructorMarker) {
    return TouchTargetConstraint_init_$Init$(seen0, minSize, serializationConstructorMarker, objectCreate(protoOf(TouchTargetConstraint)));
  }
  function TouchTargetConstraint() {
  }
  protoOf(TouchTargetConstraint).toString = function () {
    return 'TouchTargetConstraint(minSize=' + DpValue__toString_impl_qlaqm4(this.m1i_1) + ')';
  };
  protoOf(TouchTargetConstraint).hashCode = function () {
    return DpValue__hashCode_impl_4u4tt9(this.m1i_1);
  };
  protoOf(TouchTargetConstraint).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TouchTargetConstraint))
      return false;
    if (!equals(this.m1i_1, other.m1i_1))
      return false;
    return true;
  };
  function Companion_34() {
  }
  var Companion_instance_35;
  function Companion_getInstance_33() {
    return Companion_instance_35;
  }
  function $serializer_21() {
    $serializer_instance_21 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.TypographyConstraints', this, 2);
    tmp0_serialDesc.lp('minReadableSize', true);
    tmp0_serialDesc.lp('scaleFloor', true);
    this.n1i_1 = tmp0_serialDesc;
  }
  protoOf($serializer_21).o1i = function (encoder, value) {
    var tmp0_desc = this.n1i_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp;
    if (tmp1_output.uk(tmp0_desc, 0)) {
      tmp = true;
    } else {
      var tmp_0 = value.p1i_1;
      tmp = !((tmp_0 == null ? null : new SpValue(tmp_0)) == null);
    }
    if (tmp) {
      var tmp_1 = $serializer_getInstance_4();
      var tmp_2 = value.p1i_1;
      tmp1_output.qk(tmp0_desc, 0, tmp_1, tmp_2 == null ? null : new SpValue(tmp_2));
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.q1i_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, FloatSerializer_getInstance(), value.q1i_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_21).yf = function (encoder, value) {
    return this.o1i(encoder, value instanceof TypographyConstraints ? value : THROW_CCE());
  };
  protoOf($serializer_21).zf = function (decoder) {
    var tmp0_desc = this.n1i_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    if (tmp6_input.nj()) {
      var tmp = $serializer_getInstance_4();
      var tmp_0 = tmp4_local0;
      var tmp_1 = tmp6_input.lj(tmp0_desc, 0, tmp, tmp_0 == null ? null : new SpValue(tmp_0));
      tmp4_local0 = tmp_1 == null ? null : tmp_1.m1e_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, FloatSerializer_getInstance(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            var tmp_2 = $serializer_getInstance_4();
            var tmp_3 = tmp4_local0;
            var tmp_4 = tmp6_input.lj(tmp0_desc, 0, tmp_2, tmp_3 == null ? null : new SpValue(tmp_3));
            tmp4_local0 = tmp_4 == null ? null : tmp_4.m1e_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, FloatSerializer_getInstance(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return TypographyConstraints_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_21).xf = function () {
    return this.n1i_1;
  };
  protoOf($serializer_21).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable($serializer_getInstance_4()), get_nullable(FloatSerializer_getInstance())];
  };
  var $serializer_instance_21;
  function $serializer_getInstance_21() {
    if ($serializer_instance_21 == null)
      new $serializer_21();
    return $serializer_instance_21;
  }
  function TypographyConstraints_init_$Init$(seen0, minReadableSize, scaleFloor, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_21().n1i_1);
    }
    if (0 === (seen0 & 1))
      $this.p1i_1 = null;
    else
      $this.p1i_1 = minReadableSize;
    if (0 === (seen0 & 2))
      $this.q1i_1 = null;
    else
      $this.q1i_1 = scaleFloor;
    var floor = $this.q1i_1;
    // Inline function 'kotlin.require' call
    if (!(floor == null || (isFinite(floor) && floor >= 0.0))) {
      var message = 'TypographyConstraints.scaleFloor must be null or finite and >= 0, was ' + floor + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return $this;
  }
  function TypographyConstraints_init_$Create$(seen0, minReadableSize, scaleFloor, serializationConstructorMarker) {
    return TypographyConstraints_init_$Init$(seen0, minReadableSize, scaleFloor, serializationConstructorMarker, objectCreate(protoOf(TypographyConstraints)));
  }
  function TypographyConstraints(minReadableSize, scaleFloor) {
    minReadableSize = minReadableSize === VOID ? null : minReadableSize;
    scaleFloor = scaleFloor === VOID ? null : scaleFloor;
    this.p1i_1 = minReadableSize;
    this.q1i_1 = scaleFloor;
    var floor = this.q1i_1;
    // Inline function 'kotlin.require' call
    if (!(floor == null || (isFinite(floor) && floor >= 0.0))) {
      var message = 'TypographyConstraints.scaleFloor must be null or finite and >= 0, was ' + floor + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(TypographyConstraints).toString = function () {
    var tmp = this.p1i_1;
    return 'TypographyConstraints(minReadableSize=' + toString_0(tmp == null ? null : new SpValue(tmp)) + ', scaleFloor=' + this.q1i_1 + ')';
  };
  protoOf(TypographyConstraints).hashCode = function () {
    var tmp;
    var tmp_0 = this.p1i_1;
    if ((tmp_0 == null ? null : new SpValue(tmp_0)) == null) {
      tmp = 0;
    } else {
      tmp = SpValue__hashCode_impl_3j62te(this.p1i_1);
    }
    var result = tmp;
    result = imul(result, 31) + (this.q1i_1 == null ? 0 : getNumberHashCode(this.q1i_1)) | 0;
    return result;
  };
  protoOf(TypographyConstraints).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TypographyConstraints))
      return false;
    var tmp = this.p1i_1;
    var tmp_0 = tmp == null ? null : new SpValue(tmp);
    var tmp_1 = other.p1i_1;
    if (!equals(tmp_0, tmp_1 == null ? null : new SpValue(tmp_1)))
      return false;
    if (!equals(this.q1i_1, other.q1i_1))
      return false;
    return true;
  };
  function Companion_35() {
  }
  var Companion_instance_36;
  function Companion_getInstance_34() {
    return Companion_instance_36;
  }
  function $serializer_22() {
    $serializer_instance_22 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.MinMaxLevels', this, 2);
    tmp0_serialDesc.lp('min', true);
    tmp0_serialDesc.lp('max', true);
    this.r1i_1 = tmp0_serialDesc;
  }
  protoOf($serializer_22).s1i = function (encoder, value) {
    var tmp0_desc = this.r1i_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp;
    if (tmp1_output.uk(tmp0_desc, 0)) {
      tmp = true;
    } else {
      var tmp_0 = value.t1i_1;
      tmp = !((tmp_0 == null ? null : new DpValue(tmp_0)) == null);
    }
    if (tmp) {
      var tmp_1 = $serializer_getInstance();
      var tmp_2 = value.t1i_1;
      tmp1_output.qk(tmp0_desc, 0, tmp_1, tmp_2 == null ? null : new DpValue(tmp_2));
    }
    var tmp_3;
    if (tmp1_output.uk(tmp0_desc, 1)) {
      tmp_3 = true;
    } else {
      var tmp_4 = value.u1i_1;
      tmp_3 = !((tmp_4 == null ? null : new DpValue(tmp_4)) == null);
    }
    if (tmp_3) {
      var tmp_5 = $serializer_getInstance();
      var tmp_6 = value.u1i_1;
      tmp1_output.qk(tmp0_desc, 1, tmp_5, tmp_6 == null ? null : new DpValue(tmp_6));
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_22).yf = function (encoder, value) {
    return this.s1i(encoder, value instanceof MinMaxLevels ? value : THROW_CCE());
  };
  protoOf($serializer_22).zf = function (decoder) {
    var tmp0_desc = this.r1i_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    if (tmp6_input.nj()) {
      var tmp = $serializer_getInstance();
      var tmp_0 = tmp4_local0;
      var tmp_1 = tmp6_input.lj(tmp0_desc, 0, tmp, tmp_0 == null ? null : new DpValue(tmp_0));
      tmp4_local0 = tmp_1 == null ? null : tmp_1.p1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      var tmp_2 = $serializer_getInstance();
      var tmp_3 = tmp5_local1;
      var tmp_4 = tmp6_input.lj(tmp0_desc, 1, tmp_2, tmp_3 == null ? null : new DpValue(tmp_3));
      tmp5_local1 = tmp_4 == null ? null : tmp_4.p1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            var tmp_5 = $serializer_getInstance();
            var tmp_6 = tmp4_local0;
            var tmp_7 = tmp6_input.lj(tmp0_desc, 0, tmp_5, tmp_6 == null ? null : new DpValue(tmp_6));
            tmp4_local0 = tmp_7 == null ? null : tmp_7.p1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            var tmp_8 = $serializer_getInstance();
            var tmp_9 = tmp5_local1;
            var tmp_10 = tmp6_input.lj(tmp0_desc, 1, tmp_8, tmp_9 == null ? null : new DpValue(tmp_9));
            tmp5_local1 = tmp_10 == null ? null : tmp_10.p1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return MinMaxLevels_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_22).xf = function () {
    return this.r1i_1;
  };
  protoOf($serializer_22).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable($serializer_getInstance()), get_nullable($serializer_getInstance())];
  };
  var $serializer_instance_22;
  function $serializer_getInstance_22() {
    if ($serializer_instance_22 == null)
      new $serializer_22();
    return $serializer_instance_22;
  }
  function MinMaxLevels_init_$Init$(seen0, min, max, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_22().r1i_1);
    }
    if (0 === (seen0 & 1))
      $this.t1i_1 = null;
    else
      $this.t1i_1 = min;
    if (0 === (seen0 & 2))
      $this.u1i_1 = null;
    else
      $this.u1i_1 = max;
    var tmp0_safe_receiver = $this.t1i_1;
    var tmp;
    var tmp_0 = tmp0_safe_receiver;
    if ((tmp_0 == null ? null : new DpValue(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _DpValue___get_value__impl__1j6qu0(tmp0_safe_receiver);
    }
    var lower = tmp;
    var tmp1_safe_receiver = $this.u1i_1;
    var tmp_1;
    var tmp_2 = tmp1_safe_receiver;
    if ((tmp_2 == null ? null : new DpValue(tmp_2)) == null) {
      tmp_1 = null;
    } else {
      tmp_1 = _DpValue___get_value__impl__1j6qu0(tmp1_safe_receiver);
    }
    var upper = tmp_1;
    // Inline function 'kotlin.require' call
    if (!(lower == null || upper == null || lower <= upper)) {
      var tmp_3 = $this.t1i_1;
      var tmp_4 = toString_0(tmp_3 == null ? null : new DpValue(tmp_3));
      var tmp_5 = $this.u1i_1;
      var message = 'MinMaxLevels.min must be <= max, was ' + tmp_4 + ' > ' + toString_0(tmp_5 == null ? null : new DpValue(tmp_5)) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return $this;
  }
  function MinMaxLevels_init_$Create$(seen0, min, max, serializationConstructorMarker) {
    return MinMaxLevels_init_$Init$(seen0, min, max, serializationConstructorMarker, objectCreate(protoOf(MinMaxLevels)));
  }
  function MinMaxLevels(min, max) {
    min = min === VOID ? null : min;
    max = max === VOID ? null : max;
    this.t1i_1 = min;
    this.u1i_1 = max;
    var tmp0_safe_receiver = this.t1i_1;
    var tmp;
    var tmp_0 = tmp0_safe_receiver;
    if ((tmp_0 == null ? null : new DpValue(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _DpValue___get_value__impl__1j6qu0(tmp0_safe_receiver);
    }
    var lower = tmp;
    var tmp1_safe_receiver = this.u1i_1;
    var tmp_1;
    var tmp_2 = tmp1_safe_receiver;
    if ((tmp_2 == null ? null : new DpValue(tmp_2)) == null) {
      tmp_1 = null;
    } else {
      tmp_1 = _DpValue___get_value__impl__1j6qu0(tmp1_safe_receiver);
    }
    var upper = tmp_1;
    // Inline function 'kotlin.require' call
    if (!(lower == null || upper == null || lower <= upper)) {
      var tmp_3 = this.t1i_1;
      var tmp_4 = toString_0(tmp_3 == null ? null : new DpValue(tmp_3));
      var tmp_5 = this.u1i_1;
      var message = 'MinMaxLevels.min must be <= max, was ' + tmp_4 + ' > ' + toString_0(tmp_5 == null ? null : new DpValue(tmp_5)) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(MinMaxLevels).toString = function () {
    var tmp = this.t1i_1;
    var tmp_0 = toString_0(tmp == null ? null : new DpValue(tmp));
    var tmp_1 = this.u1i_1;
    return 'MinMaxLevels(min=' + tmp_0 + ', max=' + toString_0(tmp_1 == null ? null : new DpValue(tmp_1)) + ')';
  };
  protoOf(MinMaxLevels).hashCode = function () {
    var tmp;
    var tmp_0 = this.t1i_1;
    if ((tmp_0 == null ? null : new DpValue(tmp_0)) == null) {
      tmp = 0;
    } else {
      tmp = DpValue__hashCode_impl_4u4tt9(this.t1i_1);
    }
    var result = tmp;
    var tmp_1 = imul(result, 31);
    var tmp_2;
    var tmp_3 = this.u1i_1;
    if ((tmp_3 == null ? null : new DpValue(tmp_3)) == null) {
      tmp_2 = 0;
    } else {
      tmp_2 = DpValue__hashCode_impl_4u4tt9(this.u1i_1);
    }
    result = tmp_1 + tmp_2 | 0;
    return result;
  };
  protoOf(MinMaxLevels).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MinMaxLevels))
      return false;
    var tmp = this.t1i_1;
    var tmp_0 = tmp == null ? null : new DpValue(tmp);
    var tmp_1 = other.t1i_1;
    if (!equals(tmp_0, tmp_1 == null ? null : new DpValue(tmp_1)))
      return false;
    var tmp_2 = this.u1i_1;
    var tmp_3 = tmp_2 == null ? null : new DpValue(tmp_2);
    var tmp_4 = other.u1i_1;
    if (!equals(tmp_3, tmp_4 == null ? null : new DpValue(tmp_4)))
      return false;
    return true;
  };
  function Companion_36() {
    this.v1i_1 = -1.0;
    this.w1i_1 = 1.0;
  }
  var Companion_instance_37;
  function Companion_getInstance_35() {
    return Companion_instance_37;
  }
  function $serializer_23() {
    $serializer_instance_23 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.MotionConstraint', this, 2);
    tmp0_serialDesc.lp('preferReducedMotion', true);
    tmp0_serialDesc.lp('maxDurationBias', true);
    this.x1i_1 = tmp0_serialDesc;
  }
  protoOf($serializer_23).y1i = function (encoder, value) {
    var tmp0_desc = this.x1i_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.z1i_1 === false)) {
      tmp1_output.ek(tmp0_desc, 0, value.z1i_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.a1j_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, FloatSerializer_getInstance(), value.a1j_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_23).yf = function (encoder, value) {
    return this.y1i(encoder, value instanceof MotionConstraint ? value : THROW_CCE());
  };
  protoOf($serializer_23).zf = function (decoder) {
    var tmp0_desc = this.x1i_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = false;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.zi(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, FloatSerializer_getInstance(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.zi(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, FloatSerializer_getInstance(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return MotionConstraint_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_23).xf = function () {
    return this.x1i_1;
  };
  protoOf($serializer_23).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [BooleanSerializer_getInstance(), get_nullable(FloatSerializer_getInstance())];
  };
  var $serializer_instance_23;
  function $serializer_getInstance_23() {
    if ($serializer_instance_23 == null)
      new $serializer_23();
    return $serializer_instance_23;
  }
  function MotionConstraint_init_$Init$(seen0, preferReducedMotion, maxDurationBias, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_23().x1i_1);
    }
    if (0 === (seen0 & 1))
      $this.z1i_1 = false;
    else
      $this.z1i_1 = preferReducedMotion;
    if (0 === (seen0 & 2))
      $this.a1j_1 = null;
    else
      $this.a1j_1 = maxDurationBias;
    var bias = $this.a1j_1;
    var tmp;
    if (bias == null) {
      tmp = true;
    } else {
      var tmp_0;
      if (isFinite(bias)) {
        tmp_0 = -1.0 <= bias ? bias <= 1.0 : false;
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    // Inline function 'kotlin.require' call
    if (!tmp) {
      var message = 'MotionConstraint.maxDurationBias must be null or in ' + -1.0 + '..' + 1.0 + ', was ' + bias + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return $this;
  }
  function MotionConstraint_init_$Create$(seen0, preferReducedMotion, maxDurationBias, serializationConstructorMarker) {
    return MotionConstraint_init_$Init$(seen0, preferReducedMotion, maxDurationBias, serializationConstructorMarker, objectCreate(protoOf(MotionConstraint)));
  }
  function MotionConstraint(preferReducedMotion, maxDurationBias) {
    preferReducedMotion = preferReducedMotion === VOID ? false : preferReducedMotion;
    maxDurationBias = maxDurationBias === VOID ? null : maxDurationBias;
    this.z1i_1 = preferReducedMotion;
    this.a1j_1 = maxDurationBias;
    var bias = this.a1j_1;
    var tmp;
    if (bias == null) {
      tmp = true;
    } else {
      var tmp_0;
      if (isFinite(bias)) {
        tmp_0 = -1.0 <= bias ? bias <= 1.0 : false;
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    // Inline function 'kotlin.require' call
    if (!tmp) {
      var message = 'MotionConstraint.maxDurationBias must be null or in ' + -1.0 + '..' + 1.0 + ', was ' + bias + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(MotionConstraint).toString = function () {
    return 'MotionConstraint(preferReducedMotion=' + this.z1i_1 + ', maxDurationBias=' + this.a1j_1 + ')';
  };
  protoOf(MotionConstraint).hashCode = function () {
    var result = getBooleanHashCode(this.z1i_1);
    result = imul(result, 31) + (this.a1j_1 == null ? 0 : getNumberHashCode(this.a1j_1)) | 0;
    return result;
  };
  protoOf(MotionConstraint).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MotionConstraint))
      return false;
    if (!(this.z1i_1 === other.z1i_1))
      return false;
    if (!equals(this.a1j_1, other.a1j_1))
      return false;
    return true;
  };
  function FontControl$Companion$$childSerializers$_anonymous__w6ykys() {
    return new LinkedHashMapSerializer(Companion_getInstance_5().s18(), Companion_instance_79.s18());
  }
  function FontControl$Companion$$childSerializers$_anonymous__w6ykys_0() {
    return new LinkedHashMapSerializer(Companion_getInstance_5().s18(), $serializer_getInstance_25());
  }
  function FontControl$Companion$$childSerializers$_anonymous__w6ykys_1() {
    return new LinkedHashMapSerializer(Companion_getInstance_5().s18(), $serializer_getInstance_26());
  }
  function Companion_37() {
    Companion_instance_38 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, FontControl$Companion$$childSerializers$_anonymous__w6ykys);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_3 = lazy(tmp_2, FontControl$Companion$$childSerializers$_anonymous__w6ykys_0);
    var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.b1j_1 = [tmp_1, tmp_3, lazy(tmp_4, FontControl$Companion$$childSerializers$_anonymous__w6ykys_1)];
  }
  var Companion_instance_38;
  function Companion_getInstance_36() {
    if (Companion_instance_38 == null)
      new Companion_37();
    return Companion_instance_38;
  }
  function $serializer_24() {
    $serializer_instance_24 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.FontControl', this, 3);
    tmp0_serialDesc.lp('levelFamilies', true);
    tmp0_serialDesc.lp('weightClamps', true);
    tmp0_serialDesc.lp('features', true);
    this.c1j_1 = tmp0_serialDesc;
  }
  protoOf($serializer_24).d1j = function (encoder, value) {
    var tmp0_desc = this.c1j_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_36().b1j_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !equals(value.e1j_1, emptyMap())) {
      tmp1_output.ok(tmp0_desc, 0, tmp2_cached[0].q1(), value.e1j_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !equals(value.f1j_1, emptyMap())) {
      tmp1_output.ok(tmp0_desc, 1, tmp2_cached[1].q1(), value.f1j_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !equals(value.g1j_1, emptyMap())) {
      tmp1_output.ok(tmp0_desc, 2, tmp2_cached[2].q1(), value.g1j_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_24).yf = function (encoder, value) {
    return this.d1j(encoder, value instanceof FontControl ? value : THROW_CCE());
  };
  protoOf($serializer_24).zf = function (decoder) {
    var tmp0_desc = this.c1j_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_input = decoder.xi(tmp0_desc);
    var tmp8_cached = Companion_getInstance_36().b1j_1;
    if (tmp7_input.nj()) {
      tmp4_local0 = tmp7_input.jj(tmp0_desc, 0, tmp8_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp7_input.jj(tmp0_desc, 1, tmp8_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp7_input.jj(tmp0_desc, 2, tmp8_cached[2].q1(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp7_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp7_input.jj(tmp0_desc, 0, tmp8_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp7_input.jj(tmp0_desc, 1, tmp8_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp7_input.jj(tmp0_desc, 2, tmp8_cached[2].q1(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp7_input.yi(tmp0_desc);
    return FontControl_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
  };
  protoOf($serializer_24).xf = function () {
    return this.c1j_1;
  };
  protoOf($serializer_24).aq = function () {
    var tmp0_cached = Companion_getInstance_36().b1j_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [tmp0_cached[0].q1(), tmp0_cached[1].q1(), tmp0_cached[2].q1()];
  };
  var $serializer_instance_24;
  function $serializer_getInstance_24() {
    if ($serializer_instance_24 == null)
      new $serializer_24();
    return $serializer_instance_24;
  }
  function FontControl_init_$Init$(seen0, levelFamilies, weightClamps, features, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_24().c1j_1);
    }
    if (0 === (seen0 & 1))
      $this.e1j_1 = emptyMap();
    else
      $this.e1j_1 = levelFamilies;
    if (0 === (seen0 & 2))
      $this.f1j_1 = emptyMap();
    else
      $this.f1j_1 = weightClamps;
    if (0 === (seen0 & 4))
      $this.g1j_1 = emptyMap();
    else
      $this.g1j_1 = features;
    return $this;
  }
  function FontControl_init_$Create$(seen0, levelFamilies, weightClamps, features, serializationConstructorMarker) {
    return FontControl_init_$Init$(seen0, levelFamilies, weightClamps, features, serializationConstructorMarker, objectCreate(protoOf(FontControl)));
  }
  function FontControl(levelFamilies, weightClamps, features) {
    Companion_getInstance_36();
    levelFamilies = levelFamilies === VOID ? emptyMap() : levelFamilies;
    weightClamps = weightClamps === VOID ? emptyMap() : weightClamps;
    features = features === VOID ? emptyMap() : features;
    this.e1j_1 = levelFamilies;
    this.f1j_1 = weightClamps;
    this.g1j_1 = features;
  }
  protoOf(FontControl).toString = function () {
    return 'FontControl(levelFamilies=' + toString(this.e1j_1) + ', weightClamps=' + toString(this.f1j_1) + ', features=' + toString(this.g1j_1) + ')';
  };
  protoOf(FontControl).hashCode = function () {
    var result = hashCode(this.e1j_1);
    result = imul(result, 31) + hashCode(this.f1j_1) | 0;
    result = imul(result, 31) + hashCode(this.g1j_1) | 0;
    return result;
  };
  protoOf(FontControl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FontControl))
      return false;
    if (!equals(this.e1j_1, other.e1j_1))
      return false;
    if (!equals(this.f1j_1, other.f1j_1))
      return false;
    if (!equals(this.g1j_1, other.g1j_1))
      return false;
    return true;
  };
  function Companion_38() {
  }
  var Companion_instance_39;
  function Companion_getInstance_37() {
    return Companion_instance_39;
  }
  function $serializer_25() {
    $serializer_instance_25 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.WeightClamp', this, 2);
    tmp0_serialDesc.lp('min', true);
    tmp0_serialDesc.lp('max', true);
    this.h1j_1 = tmp0_serialDesc;
  }
  protoOf($serializer_25).i1j = function (encoder, value) {
    var tmp0_desc = this.h1j_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp;
    if (tmp1_output.uk(tmp0_desc, 0)) {
      tmp = true;
    } else {
      var tmp_0 = value.j1j_1;
      tmp = !((tmp_0 == null ? null : new FontWeightValue(tmp_0)) == null);
    }
    if (tmp) {
      var tmp_1 = $serializer_getInstance_2();
      var tmp_2 = value.j1j_1;
      tmp1_output.qk(tmp0_desc, 0, tmp_1, tmp_2 == null ? null : new FontWeightValue(tmp_2));
    }
    var tmp_3;
    if (tmp1_output.uk(tmp0_desc, 1)) {
      tmp_3 = true;
    } else {
      var tmp_4 = value.k1j_1;
      tmp_3 = !((tmp_4 == null ? null : new FontWeightValue(tmp_4)) == null);
    }
    if (tmp_3) {
      var tmp_5 = $serializer_getInstance_2();
      var tmp_6 = value.k1j_1;
      tmp1_output.qk(tmp0_desc, 1, tmp_5, tmp_6 == null ? null : new FontWeightValue(tmp_6));
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_25).yf = function (encoder, value) {
    return this.i1j(encoder, value instanceof WeightClamp ? value : THROW_CCE());
  };
  protoOf($serializer_25).zf = function (decoder) {
    var tmp0_desc = this.h1j_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    if (tmp6_input.nj()) {
      var tmp = $serializer_getInstance_2();
      var tmp_0 = tmp4_local0;
      var tmp_1 = tmp6_input.lj(tmp0_desc, 0, tmp, tmp_0 == null ? null : new FontWeightValue(tmp_0));
      tmp4_local0 = tmp_1 == null ? null : tmp_1.e1e_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      var tmp_2 = $serializer_getInstance_2();
      var tmp_3 = tmp5_local1;
      var tmp_4 = tmp6_input.lj(tmp0_desc, 1, tmp_2, tmp_3 == null ? null : new FontWeightValue(tmp_3));
      tmp5_local1 = tmp_4 == null ? null : tmp_4.e1e_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            var tmp_5 = $serializer_getInstance_2();
            var tmp_6 = tmp4_local0;
            var tmp_7 = tmp6_input.lj(tmp0_desc, 0, tmp_5, tmp_6 == null ? null : new FontWeightValue(tmp_6));
            tmp4_local0 = tmp_7 == null ? null : tmp_7.e1e_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            var tmp_8 = $serializer_getInstance_2();
            var tmp_9 = tmp5_local1;
            var tmp_10 = tmp6_input.lj(tmp0_desc, 1, tmp_8, tmp_9 == null ? null : new FontWeightValue(tmp_9));
            tmp5_local1 = tmp_10 == null ? null : tmp_10.e1e_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return WeightClamp_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_25).xf = function () {
    return this.h1j_1;
  };
  protoOf($serializer_25).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable($serializer_getInstance_2()), get_nullable($serializer_getInstance_2())];
  };
  var $serializer_instance_25;
  function $serializer_getInstance_25() {
    if ($serializer_instance_25 == null)
      new $serializer_25();
    return $serializer_instance_25;
  }
  function WeightClamp_init_$Init$(seen0, min, max, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_25().h1j_1);
    }
    if (0 === (seen0 & 1))
      $this.j1j_1 = null;
    else
      $this.j1j_1 = min;
    if (0 === (seen0 & 2))
      $this.k1j_1 = null;
    else
      $this.k1j_1 = max;
    var tmp0_safe_receiver = $this.j1j_1;
    var tmp;
    var tmp_0 = tmp0_safe_receiver;
    if ((tmp_0 == null ? null : new FontWeightValue(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _FontWeightValue___get_weight__impl__w0h7ri(tmp0_safe_receiver);
    }
    var lower = tmp;
    var tmp1_safe_receiver = $this.k1j_1;
    var tmp_1;
    var tmp_2 = tmp1_safe_receiver;
    if ((tmp_2 == null ? null : new FontWeightValue(tmp_2)) == null) {
      tmp_1 = null;
    } else {
      tmp_1 = _FontWeightValue___get_weight__impl__w0h7ri(tmp1_safe_receiver);
    }
    var upper = tmp_1;
    // Inline function 'kotlin.require' call
    if (!(lower == null || upper == null || lower <= upper)) {
      var tmp_3 = $this.j1j_1;
      var tmp_4 = toString_0(tmp_3 == null ? null : new FontWeightValue(tmp_3));
      var tmp_5 = $this.k1j_1;
      var message = 'WeightClamp.min must be <= max, was ' + tmp_4 + ' > ' + toString_0(tmp_5 == null ? null : new FontWeightValue(tmp_5)) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return $this;
  }
  function WeightClamp_init_$Create$(seen0, min, max, serializationConstructorMarker) {
    return WeightClamp_init_$Init$(seen0, min, max, serializationConstructorMarker, objectCreate(protoOf(WeightClamp)));
  }
  function WeightClamp(min, max) {
    min = min === VOID ? null : min;
    max = max === VOID ? null : max;
    this.j1j_1 = min;
    this.k1j_1 = max;
    var tmp0_safe_receiver = this.j1j_1;
    var tmp;
    var tmp_0 = tmp0_safe_receiver;
    if ((tmp_0 == null ? null : new FontWeightValue(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _FontWeightValue___get_weight__impl__w0h7ri(tmp0_safe_receiver);
    }
    var lower = tmp;
    var tmp1_safe_receiver = this.k1j_1;
    var tmp_1;
    var tmp_2 = tmp1_safe_receiver;
    if ((tmp_2 == null ? null : new FontWeightValue(tmp_2)) == null) {
      tmp_1 = null;
    } else {
      tmp_1 = _FontWeightValue___get_weight__impl__w0h7ri(tmp1_safe_receiver);
    }
    var upper = tmp_1;
    // Inline function 'kotlin.require' call
    if (!(lower == null || upper == null || lower <= upper)) {
      var tmp_3 = this.j1j_1;
      var tmp_4 = toString_0(tmp_3 == null ? null : new FontWeightValue(tmp_3));
      var tmp_5 = this.k1j_1;
      var message = 'WeightClamp.min must be <= max, was ' + tmp_4 + ' > ' + toString_0(tmp_5 == null ? null : new FontWeightValue(tmp_5)) + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(WeightClamp).toString = function () {
    var tmp = this.j1j_1;
    var tmp_0 = toString_0(tmp == null ? null : new FontWeightValue(tmp));
    var tmp_1 = this.k1j_1;
    return 'WeightClamp(min=' + tmp_0 + ', max=' + toString_0(tmp_1 == null ? null : new FontWeightValue(tmp_1)) + ')';
  };
  protoOf(WeightClamp).hashCode = function () {
    var tmp;
    var tmp_0 = this.j1j_1;
    if ((tmp_0 == null ? null : new FontWeightValue(tmp_0)) == null) {
      tmp = 0;
    } else {
      tmp = FontWeightValue__hashCode_impl_jts2uw(this.j1j_1);
    }
    var result = tmp;
    var tmp_1 = imul(result, 31);
    var tmp_2;
    var tmp_3 = this.k1j_1;
    if ((tmp_3 == null ? null : new FontWeightValue(tmp_3)) == null) {
      tmp_2 = 0;
    } else {
      tmp_2 = FontWeightValue__hashCode_impl_jts2uw(this.k1j_1);
    }
    result = tmp_1 + tmp_2 | 0;
    return result;
  };
  protoOf(WeightClamp).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof WeightClamp))
      return false;
    var tmp = this.j1j_1;
    var tmp_0 = tmp == null ? null : new FontWeightValue(tmp);
    var tmp_1 = other.j1j_1;
    if (!equals(tmp_0, tmp_1 == null ? null : new FontWeightValue(tmp_1)))
      return false;
    var tmp_2 = this.k1j_1;
    var tmp_3 = tmp_2 == null ? null : new FontWeightValue(tmp_2);
    var tmp_4 = other.k1j_1;
    if (!equals(tmp_3, tmp_4 == null ? null : new FontWeightValue(tmp_4)))
      return false;
    return true;
  };
  function FontFeatureSpec$Companion$$childSerializers$_anonymous__p10414() {
    return new LinkedHashSetSerializer(StringSerializer_getInstance());
  }
  function Companion_39() {
    Companion_instance_40 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.l1j_1 = [lazy(tmp_0, FontFeatureSpec$Companion$$childSerializers$_anonymous__p10414)];
  }
  var Companion_instance_40;
  function Companion_getInstance_38() {
    if (Companion_instance_40 == null)
      new Companion_39();
    return Companion_instance_40;
  }
  function $serializer_26() {
    $serializer_instance_26 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.FontFeatureSpec', this, 1);
    tmp0_serialDesc.lp('features', false);
    this.m1j_1 = tmp0_serialDesc;
  }
  protoOf($serializer_26).n1j = function (encoder, value) {
    var tmp0_desc = this.m1j_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_38().l1j_1;
    tmp1_output.ok(tmp0_desc, 0, tmp2_cached[0].q1(), value.o1j_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_26).yf = function (encoder, value) {
    return this.n1j(encoder, value instanceof FontFeatureSpec ? value : THROW_CCE());
  };
  protoOf($serializer_26).zf = function (decoder) {
    var tmp0_desc = this.m1j_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    var tmp6_cached = Companion_getInstance_38().l1j_1;
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return FontFeatureSpec_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_26).xf = function () {
    return this.m1j_1;
  };
  protoOf($serializer_26).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [Companion_getInstance_38().l1j_1[0].q1()];
  };
  var $serializer_instance_26;
  function $serializer_getInstance_26() {
    if ($serializer_instance_26 == null)
      new $serializer_26();
    return $serializer_instance_26;
  }
  function FontFeatureSpec_init_$Init$(seen0, features, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_26().m1j_1);
    }
    $this.o1j_1 = features;
    var tmp0 = $this.o1j_1;
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.none' call
      var tmp;
      if (isInterface(tmp0, Collection)) {
        tmp = tmp0.p();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (isBlank(element)) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    // Inline function 'kotlin.require' call
    if (!tmp$ret$0) {
      var message = 'FontFeatureSpec features must not contain blanks.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return $this;
  }
  function FontFeatureSpec_init_$Create$(seen0, features, serializationConstructorMarker) {
    return FontFeatureSpec_init_$Init$(seen0, features, serializationConstructorMarker, objectCreate(protoOf(FontFeatureSpec)));
  }
  function FontFeatureSpec() {
  }
  protoOf(FontFeatureSpec).toString = function () {
    return 'FontFeatureSpec(features=' + toString(this.o1j_1) + ')';
  };
  protoOf(FontFeatureSpec).hashCode = function () {
    return hashCode(this.o1j_1);
  };
  protoOf(FontFeatureSpec).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FontFeatureSpec))
      return false;
    if (!equals(this.o1j_1, other.o1j_1))
      return false;
    return true;
  };
  function ModeControl$Companion$$childSerializers$_anonymous__4tz3u8() {
    return Companion_getInstance_12().s18();
  }
  function ModeControl$Companion$$childSerializers$_anonymous__4tz3u8_0() {
    return new LinkedHashSetSerializer(Companion_getInstance_12().s18());
  }
  function Companion_40() {
    Companion_instance_41 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, ModeControl$Companion$$childSerializers$_anonymous__4tz3u8);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.p1j_1 = [tmp_1, lazy(tmp_2, ModeControl$Companion$$childSerializers$_anonymous__4tz3u8_0)];
  }
  var Companion_instance_41;
  function Companion_getInstance_39() {
    if (Companion_instance_41 == null)
      new Companion_40();
    return Companion_instance_41;
  }
  function $serializer_27() {
    $serializer_instance_27 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.ModeControl', this, 2);
    tmp0_serialDesc.lp('preferred', true);
    tmp0_serialDesc.lp('targets', true);
    this.q1j_1 = tmp0_serialDesc;
  }
  protoOf($serializer_27).r1j = function (encoder, value) {
    var tmp0_desc = this.q1j_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_39().p1j_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.s1j_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.s1j_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !equals(value.t1j_1, setOf([ThemeMode_Light_getInstance(), ThemeMode_Dark_getInstance()]))) {
      tmp1_output.ok(tmp0_desc, 1, tmp2_cached[1].q1(), value.t1j_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_27).yf = function (encoder, value) {
    return this.r1j(encoder, value instanceof ModeControl ? value : THROW_CCE());
  };
  protoOf($serializer_27).zf = function (decoder) {
    var tmp0_desc = this.q1j_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    var tmp7_cached = Companion_getInstance_39().p1j_1;
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.lj(tmp0_desc, 0, tmp7_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.jj(tmp0_desc, 1, tmp7_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.lj(tmp0_desc, 0, tmp7_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.jj(tmp0_desc, 1, tmp7_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return ModeControl_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_27).xf = function () {
    return this.q1j_1;
  };
  protoOf($serializer_27).aq = function () {
    var tmp0_cached = Companion_getInstance_39().p1j_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1()), tmp0_cached[1].q1()];
  };
  var $serializer_instance_27;
  function $serializer_getInstance_27() {
    if ($serializer_instance_27 == null)
      new $serializer_27();
    return $serializer_instance_27;
  }
  function ModeControl_init_$Init$(seen0, preferred, targets, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_27().q1j_1);
    }
    if (0 === (seen0 & 1))
      $this.s1j_1 = null;
    else
      $this.s1j_1 = preferred;
    if (0 === (seen0 & 2))
      $this.t1j_1 = setOf([ThemeMode_Light_getInstance(), ThemeMode_Dark_getInstance()]);
    else
      $this.t1j_1 = targets;
    return $this;
  }
  function ModeControl_init_$Create$(seen0, preferred, targets, serializationConstructorMarker) {
    return ModeControl_init_$Init$(seen0, preferred, targets, serializationConstructorMarker, objectCreate(protoOf(ModeControl)));
  }
  function ModeControl(preferred, targets) {
    Companion_getInstance_39();
    preferred = preferred === VOID ? null : preferred;
    targets = targets === VOID ? setOf([ThemeMode_Light_getInstance(), ThemeMode_Dark_getInstance()]) : targets;
    this.s1j_1 = preferred;
    this.t1j_1 = targets;
  }
  protoOf(ModeControl).toString = function () {
    return 'ModeControl(preferred=' + toString_0(this.s1j_1) + ', targets=' + toString(this.t1j_1) + ')';
  };
  protoOf(ModeControl).hashCode = function () {
    var result = this.s1j_1 == null ? 0 : this.s1j_1.hashCode();
    result = imul(result, 31) + hashCode(this.t1j_1) | 0;
    return result;
  };
  protoOf(ModeControl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ModeControl))
      return false;
    if (!equals(this.s1j_1, other.s1j_1))
      return false;
    if (!equals(this.t1j_1, other.t1j_1))
      return false;
    return true;
  };
  function ComponentExtraPatch$Surface$Companion$$childSerializers$_anonymous__by3sdw() {
    return Companion_getInstance_0().s18();
  }
  function ComponentExtraPatch$Surface$Companion$$childSerializers$_anonymous__by3sdw_0() {
    return Companion_getInstance_4().s18();
  }
  function Companion_41() {
    Companion_instance_42 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, ComponentExtraPatch$Surface$Companion$$childSerializers$_anonymous__by3sdw);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.u1j_1 = [tmp_1, lazy(tmp_2, ComponentExtraPatch$Surface$Companion$$childSerializers$_anonymous__by3sdw_0)];
  }
  var Companion_instance_42;
  function Companion_getInstance_40() {
    if (Companion_instance_42 == null)
      new Companion_41();
    return Companion_instance_42;
  }
  function $serializer_28() {
    $serializer_instance_28 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch.Surface', this, 2);
    tmp0_serialDesc.lp('depth', true);
    tmp0_serialDesc.lp('borderWidth', true);
    this.v1j_1 = tmp0_serialDesc;
  }
  protoOf($serializer_28).w1j = function (encoder, value) {
    var tmp0_desc = this.v1j_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_40().u1j_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.x1j_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.x1j_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.y1j_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, tmp2_cached[1].q1(), value.y1j_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_28).yf = function (encoder, value) {
    return this.w1j(encoder, value instanceof Surface ? value : THROW_CCE());
  };
  protoOf($serializer_28).zf = function (decoder) {
    var tmp0_desc = this.v1j_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    var tmp7_cached = Companion_getInstance_40().u1j_1;
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.lj(tmp0_desc, 0, tmp7_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, tmp7_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.lj(tmp0_desc, 0, tmp7_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, tmp7_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return Surface_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_28).xf = function () {
    return this.v1j_1;
  };
  protoOf($serializer_28).aq = function () {
    var tmp0_cached = Companion_getInstance_40().u1j_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1()), get_nullable(tmp0_cached[1].q1())];
  };
  var $serializer_instance_28;
  function $serializer_getInstance_28() {
    if ($serializer_instance_28 == null)
      new $serializer_28();
    return $serializer_instance_28;
  }
  function Surface_init_$Init$(seen0, depth, borderWidth, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_28().v1j_1);
    }
    if (0 === (seen0 & 1))
      $this.x1j_1 = null;
    else
      $this.x1j_1 = depth;
    if (0 === (seen0 & 2))
      $this.y1j_1 = null;
    else
      $this.y1j_1 = borderWidth;
    return $this;
  }
  function Surface_init_$Create$(seen0, depth, borderWidth, serializationConstructorMarker) {
    return Surface_init_$Init$(seen0, depth, borderWidth, serializationConstructorMarker, objectCreate(protoOf(Surface)));
  }
  function ComponentExtraPatch$Icon$Companion$$childSerializers$_anonymous__ubflj2() {
    return Companion_getInstance_1().s18();
  }
  function Companion_42() {
    Companion_instance_43 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.z1j_1 = [lazy(tmp_0, ComponentExtraPatch$Icon$Companion$$childSerializers$_anonymous__ubflj2)];
  }
  var Companion_instance_43;
  function Companion_getInstance_41() {
    if (Companion_instance_43 == null)
      new Companion_42();
    return Companion_instance_43;
  }
  function $serializer_29() {
    $serializer_instance_29 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch.Icon', this, 1);
    tmp0_serialDesc.lp('size', true);
    this.a1k_1 = tmp0_serialDesc;
  }
  protoOf($serializer_29).b1k = function (encoder, value) {
    var tmp0_desc = this.a1k_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_41().z1j_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.c1k_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.c1k_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_29).yf = function (encoder, value) {
    return this.b1k(encoder, value instanceof Icon ? value : THROW_CCE());
  };
  protoOf($serializer_29).zf = function (decoder) {
    var tmp0_desc = this.a1k_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    var tmp6_cached = Companion_getInstance_41().z1j_1;
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.lj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.lj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Icon_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_29).xf = function () {
    return this.a1k_1;
  };
  protoOf($serializer_29).aq = function () {
    var tmp0_cached = Companion_getInstance_41().z1j_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1())];
  };
  var $serializer_instance_29;
  function $serializer_getInstance_29() {
    if ($serializer_instance_29 == null)
      new $serializer_29();
    return $serializer_instance_29;
  }
  function Icon_init_$Init$(seen0, size, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_29().a1k_1);
    }
    if (0 === (seen0 & 1))
      $this.c1k_1 = null;
    else
      $this.c1k_1 = size;
    return $this;
  }
  function Icon_init_$Create$(seen0, size, serializationConstructorMarker) {
    return Icon_init_$Init$(seen0, size, serializationConstructorMarker, objectCreate(protoOf(Icon)));
  }
  function ComponentExtraPatch$Divider$Companion$$childSerializers$_anonymous__ck78io() {
    return Companion_getInstance_4().s18();
  }
  function Companion_43() {
    Companion_instance_44 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.d1k_1 = [lazy(tmp_0, ComponentExtraPatch$Divider$Companion$$childSerializers$_anonymous__ck78io)];
  }
  var Companion_instance_44;
  function Companion_getInstance_42() {
    if (Companion_instance_44 == null)
      new Companion_43();
    return Companion_instance_44;
  }
  function $serializer_30() {
    $serializer_instance_30 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch.Divider', this, 1);
    tmp0_serialDesc.lp('thickness', true);
    this.e1k_1 = tmp0_serialDesc;
  }
  protoOf($serializer_30).f1k = function (encoder, value) {
    var tmp0_desc = this.e1k_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_42().d1k_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.g1k_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.g1k_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_30).yf = function (encoder, value) {
    return this.f1k(encoder, value instanceof Divider ? value : THROW_CCE());
  };
  protoOf($serializer_30).zf = function (decoder) {
    var tmp0_desc = this.e1k_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    var tmp6_cached = Companion_getInstance_42().d1k_1;
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.lj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.lj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Divider_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_30).xf = function () {
    return this.e1k_1;
  };
  protoOf($serializer_30).aq = function () {
    var tmp0_cached = Companion_getInstance_42().d1k_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1())];
  };
  var $serializer_instance_30;
  function $serializer_getInstance_30() {
    if ($serializer_instance_30 == null)
      new $serializer_30();
    return $serializer_instance_30;
  }
  function Divider_init_$Init$(seen0, thickness, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_30().e1k_1);
    }
    if (0 === (seen0 & 1))
      $this.g1k_1 = null;
    else
      $this.g1k_1 = thickness;
    return $this;
  }
  function Divider_init_$Create$(seen0, thickness, serializationConstructorMarker) {
    return Divider_init_$Init$(seen0, thickness, serializationConstructorMarker, objectCreate(protoOf(Divider)));
  }
  function ComponentExtraPatch$Interactive$Companion$$childSerializers$_anonymous__lxftpl() {
    return Companion_getInstance_2().s18();
  }
  function Companion_44() {
    Companion_instance_45 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.h1k_1 = [lazy(tmp_0, ComponentExtraPatch$Interactive$Companion$$childSerializers$_anonymous__lxftpl)];
  }
  var Companion_instance_45;
  function Companion_getInstance_43() {
    if (Companion_instance_45 == null)
      new Companion_44();
    return Companion_instance_45;
  }
  function $serializer_31() {
    $serializer_instance_31 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch.Interactive', this, 1);
    tmp0_serialDesc.lp('motion', true);
    this.i1k_1 = tmp0_serialDesc;
  }
  protoOf($serializer_31).j1k = function (encoder, value) {
    var tmp0_desc = this.i1k_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_43().h1k_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.k1k_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.k1k_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_31).yf = function (encoder, value) {
    return this.j1k(encoder, value instanceof Interactive ? value : THROW_CCE());
  };
  protoOf($serializer_31).zf = function (decoder) {
    var tmp0_desc = this.i1k_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    var tmp6_cached = Companion_getInstance_43().h1k_1;
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.lj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.lj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Interactive_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_31).xf = function () {
    return this.i1k_1;
  };
  protoOf($serializer_31).aq = function () {
    var tmp0_cached = Companion_getInstance_43().h1k_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1())];
  };
  var $serializer_instance_31;
  function $serializer_getInstance_31() {
    if ($serializer_instance_31 == null)
      new $serializer_31();
    return $serializer_instance_31;
  }
  function Interactive_init_$Init$(seen0, motion, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_31().i1k_1);
    }
    if (0 === (seen0 & 1))
      $this.k1k_1 = null;
    else
      $this.k1k_1 = motion;
    return $this;
  }
  function Interactive_init_$Create$(seen0, motion, serializationConstructorMarker) {
    return Interactive_init_$Init$(seen0, motion, serializationConstructorMarker, objectCreate(protoOf(Interactive)));
  }
  function ComponentExtraPatch$Spacer$Companion$$childSerializers$_anonymous__1k6ki7() {
    return Companion_getInstance_4().s18();
  }
  function Companion_45() {
    Companion_instance_46 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.l1k_1 = [lazy(tmp_0, ComponentExtraPatch$Spacer$Companion$$childSerializers$_anonymous__1k6ki7)];
  }
  var Companion_instance_46;
  function Companion_getInstance_44() {
    if (Companion_instance_46 == null)
      new Companion_45();
    return Companion_instance_46;
  }
  function $serializer_32() {
    $serializer_instance_32 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch.Spacer', this, 1);
    tmp0_serialDesc.lp('size', true);
    this.m1k_1 = tmp0_serialDesc;
  }
  protoOf($serializer_32).n1k = function (encoder, value) {
    var tmp0_desc = this.m1k_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_44().l1k_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.o1k_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.o1k_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_32).yf = function (encoder, value) {
    return this.n1k(encoder, value instanceof Spacer ? value : THROW_CCE());
  };
  protoOf($serializer_32).zf = function (decoder) {
    var tmp0_desc = this.m1k_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    var tmp6_cached = Companion_getInstance_44().l1k_1;
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.lj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.lj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Spacer_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_32).xf = function () {
    return this.m1k_1;
  };
  protoOf($serializer_32).aq = function () {
    var tmp0_cached = Companion_getInstance_44().l1k_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1())];
  };
  var $serializer_instance_32;
  function $serializer_getInstance_32() {
    if ($serializer_instance_32 == null)
      new $serializer_32();
    return $serializer_instance_32;
  }
  function Spacer_init_$Init$(seen0, size, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_32().m1k_1);
    }
    if (0 === (seen0 & 1))
      $this.o1k_1 = null;
    else
      $this.o1k_1 = size;
    return $this;
  }
  function Spacer_init_$Create$(seen0, size, serializationConstructorMarker) {
    return Spacer_init_$Init$(seen0, size, serializationConstructorMarker, objectCreate(protoOf(Spacer)));
  }
  function Surface(depth, borderWidth) {
    Companion_getInstance_40();
    depth = depth === VOID ? null : depth;
    borderWidth = borderWidth === VOID ? null : borderWidth;
    this.x1j_1 = depth;
    this.y1j_1 = borderWidth;
  }
  protoOf(Surface).toString = function () {
    return 'Surface(depth=' + toString_0(this.x1j_1) + ', borderWidth=' + toString_0(this.y1j_1) + ')';
  };
  protoOf(Surface).hashCode = function () {
    var result = this.x1j_1 == null ? 0 : this.x1j_1.hashCode();
    result = imul(result, 31) + (this.y1j_1 == null ? 0 : this.y1j_1.hashCode()) | 0;
    return result;
  };
  protoOf(Surface).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Surface))
      return false;
    if (!equals(this.x1j_1, other.x1j_1))
      return false;
    if (!equals(this.y1j_1, other.y1j_1))
      return false;
    return true;
  };
  function Icon(size) {
    Companion_getInstance_41();
    size = size === VOID ? null : size;
    this.c1k_1 = size;
  }
  protoOf(Icon).toString = function () {
    return 'Icon(size=' + toString_0(this.c1k_1) + ')';
  };
  protoOf(Icon).hashCode = function () {
    return this.c1k_1 == null ? 0 : this.c1k_1.hashCode();
  };
  protoOf(Icon).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Icon))
      return false;
    if (!equals(this.c1k_1, other.c1k_1))
      return false;
    return true;
  };
  function Divider(thickness) {
    Companion_getInstance_42();
    thickness = thickness === VOID ? null : thickness;
    this.g1k_1 = thickness;
  }
  protoOf(Divider).toString = function () {
    return 'Divider(thickness=' + toString_0(this.g1k_1) + ')';
  };
  protoOf(Divider).hashCode = function () {
    return this.g1k_1 == null ? 0 : this.g1k_1.hashCode();
  };
  protoOf(Divider).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Divider))
      return false;
    if (!equals(this.g1k_1, other.g1k_1))
      return false;
    return true;
  };
  function Interactive(motion) {
    Companion_getInstance_43();
    motion = motion === VOID ? null : motion;
    this.k1k_1 = motion;
  }
  protoOf(Interactive).toString = function () {
    return 'Interactive(motion=' + toString_0(this.k1k_1) + ')';
  };
  protoOf(Interactive).hashCode = function () {
    return this.k1k_1 == null ? 0 : this.k1k_1.hashCode();
  };
  protoOf(Interactive).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Interactive))
      return false;
    if (!equals(this.k1k_1, other.k1k_1))
      return false;
    return true;
  };
  function Spacer(size) {
    Companion_getInstance_44();
    size = size === VOID ? null : size;
    this.o1k_1 = size;
  }
  protoOf(Spacer).toString = function () {
    return 'Spacer(size=' + toString_0(this.o1k_1) + ')';
  };
  protoOf(Spacer).hashCode = function () {
    return this.o1k_1 == null ? 0 : this.o1k_1.hashCode();
  };
  protoOf(Spacer).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Spacer))
      return false;
    if (!equals(this.o1k_1, other.o1k_1))
      return false;
    return true;
  };
  function Companion_46() {
  }
  protoOf(Companion_46).s18 = function () {
    var tmp = getKClass(ComponentExtraPatch);
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [getKClass(Divider), getKClass(Icon), getKClass(Interactive), getKClass(Spacer), getKClass(Surface)];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_1 = [$serializer_getInstance_30(), $serializer_getInstance_29(), $serializer_getInstance_31(), $serializer_getInstance_32(), $serializer_getInstance_28()];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$6 = [];
    return SealedClassSerializer_init_$Create$('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentExtraPatch', tmp, tmp_0, tmp_1, tmp$ret$6);
  };
  var Companion_instance_47;
  function Companion_getInstance_45() {
    return Companion_instance_47;
  }
  function ComponentExtraPatch() {
  }
  function _get_$cachedSerializer__te6jhj_12($this) {
    return $this.p1k_1.q1();
  }
  function ComponentId$Companion$_anonymous__vrmymv() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentId', values_13());
  }
  var static_init_called_14;
  function static_init_14() {
    if (static_init_called_14)
      return Unit_instance;
    static_init_called_14 = true;
    ComponentId_Surface_instance = new ComponentId('Surface', 0);
    ComponentId_Interactive_instance = new ComponentId('Interactive', 1);
    ComponentId_Text_instance = new ComponentId('Text', 2);
    ComponentId_Icon_instance = new ComponentId('Icon', 3);
    ComponentId_Divider_instance = new ComponentId('Divider', 4);
    ComponentId_Spacer_instance = new ComponentId('Spacer', 5);
    if (Companion_instance_48 == null) {
      Companion_instance;
      new Companion_47();
    }
  }
  var ComponentId_Surface_instance;
  var ComponentId_Interactive_instance;
  var ComponentId_Text_instance;
  var ComponentId_Icon_instance;
  var ComponentId_Divider_instance;
  var ComponentId_Spacer_instance;
  function values_13() {
    static_init_14();
    return [ComponentId_Surface_getInstance(), ComponentId_Interactive_getInstance(), ComponentId_Text_getInstance(), ComponentId_Icon_getInstance(), ComponentId_Divider_getInstance(), ComponentId_Spacer_getInstance()];
  }
  function Companion_47() {
    Companion_instance_48 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.p1k_1 = lazy(tmp_0, ComponentId$Companion$_anonymous__vrmymv);
  }
  protoOf(Companion_47).s18 = function () {
    return _get_$cachedSerializer__te6jhj_12(this);
  };
  var Companion_instance_48;
  function Companion_getInstance_46() {
    static_init_14();
    return Companion_instance_48;
  }
  function ComponentId(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ComponentId_Surface_getInstance() {
    static_init_14();
    return ComponentId_Surface_instance;
  }
  function ComponentId_Interactive_getInstance() {
    static_init_14();
    return ComponentId_Interactive_instance;
  }
  function ComponentId_Text_getInstance() {
    static_init_14();
    return ComponentId_Text_instance;
  }
  function ComponentId_Icon_getInstance() {
    static_init_14();
    return ComponentId_Icon_instance;
  }
  function ComponentId_Divider_getInstance() {
    static_init_14();
    return ComponentId_Divider_instance;
  }
  function ComponentId_Spacer_getInstance() {
    static_init_14();
    return ComponentId_Spacer_instance;
  }
  function ComponentOverride$Companion$$childSerializers$_anonymous__xcoqdb() {
    return new LinkedHashMapSerializer(Companion_getInstance_65().s18(), $serializer_getInstance_35());
  }
  function ComponentOverride$Companion$$childSerializers$_anonymous__xcoqdb_0() {
    return new LinkedHashMapSerializer(Companion_getInstance_61().s18(), $serializer_getInstance_35());
  }
  function ComponentOverride$Companion$$childSerializers$_anonymous__xcoqdb_1() {
    return new LinkedHashMapSerializer(VariantStateKeySerializer_getInstance(), $serializer_getInstance_35());
  }
  function Companion_48() {
    Companion_instance_49 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, ComponentOverride$Companion$$childSerializers$_anonymous__xcoqdb);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_3 = lazy(tmp_2, ComponentOverride$Companion$$childSerializers$_anonymous__xcoqdb_0);
    var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.s1k_1 = [null, tmp_1, tmp_3, lazy(tmp_4, ComponentOverride$Companion$$childSerializers$_anonymous__xcoqdb_1)];
  }
  var Companion_instance_49;
  function Companion_getInstance_47() {
    if (Companion_instance_49 == null)
      new Companion_48();
    return Companion_instance_49;
  }
  function $serializer_33() {
    $serializer_instance_33 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverride', this, 4);
    tmp0_serialDesc.lp('all', true);
    tmp0_serialDesc.lp('byVariant', true);
    tmp0_serialDesc.lp('byState', true);
    tmp0_serialDesc.lp('byVariantState', true);
    this.t1k_1 = tmp0_serialDesc;
  }
  protoOf($serializer_33).u1k = function (encoder, value) {
    var tmp0_desc = this.t1k_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_47().s1k_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.v1k_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, $serializer_getInstance_35(), value.v1k_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !equals(value.w1k_1, emptyMap())) {
      tmp1_output.ok(tmp0_desc, 1, tmp2_cached[1].q1(), value.w1k_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !equals(value.x1k_1, emptyMap())) {
      tmp1_output.ok(tmp0_desc, 2, tmp2_cached[2].q1(), value.x1k_1);
    }
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !equals(value.y1k_1, emptyMap())) {
      tmp1_output.ok(tmp0_desc, 3, tmp2_cached[3].q1(), value.y1k_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_33).yf = function (encoder, value) {
    return this.u1k(encoder, value instanceof ComponentOverride ? value : THROW_CCE());
  };
  protoOf($serializer_33).zf = function (decoder) {
    var tmp0_desc = this.t1k_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_input = decoder.xi(tmp0_desc);
    var tmp9_cached = Companion_getInstance_47().s1k_1;
    if (tmp8_input.nj()) {
      tmp4_local0 = tmp8_input.lj(tmp0_desc, 0, $serializer_getInstance_35(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.jj(tmp0_desc, 1, tmp9_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.jj(tmp0_desc, 2, tmp9_cached[2].q1(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.jj(tmp0_desc, 3, tmp9_cached[3].q1(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.lj(tmp0_desc, 0, $serializer_getInstance_35(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.jj(tmp0_desc, 1, tmp9_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.jj(tmp0_desc, 2, tmp9_cached[2].q1(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.jj(tmp0_desc, 3, tmp9_cached[3].q1(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.yi(tmp0_desc);
    return ComponentOverride_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_33).xf = function () {
    return this.t1k_1;
  };
  protoOf($serializer_33).aq = function () {
    var tmp0_cached = Companion_getInstance_47().s1k_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable($serializer_getInstance_35()), tmp0_cached[1].q1(), tmp0_cached[2].q1(), tmp0_cached[3].q1()];
  };
  var $serializer_instance_33;
  function $serializer_getInstance_33() {
    if ($serializer_instance_33 == null)
      new $serializer_33();
    return $serializer_instance_33;
  }
  function ComponentOverride_init_$Init$(seen0, all, byVariant, byState, byVariantState, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_33().t1k_1);
    }
    if (0 === (seen0 & 1))
      $this.v1k_1 = null;
    else
      $this.v1k_1 = all;
    if (0 === (seen0 & 2))
      $this.w1k_1 = emptyMap();
    else
      $this.w1k_1 = byVariant;
    if (0 === (seen0 & 4))
      $this.x1k_1 = emptyMap();
    else
      $this.x1k_1 = byState;
    if (0 === (seen0 & 8))
      $this.y1k_1 = emptyMap();
    else
      $this.y1k_1 = byVariantState;
    return $this;
  }
  function ComponentOverride_init_$Create$(seen0, all, byVariant, byState, byVariantState, serializationConstructorMarker) {
    return ComponentOverride_init_$Init$(seen0, all, byVariant, byState, byVariantState, serializationConstructorMarker, objectCreate(protoOf(ComponentOverride)));
  }
  function ComponentOverride(all, byVariant, byState, byVariantState) {
    Companion_getInstance_47();
    all = all === VOID ? null : all;
    byVariant = byVariant === VOID ? emptyMap() : byVariant;
    byState = byState === VOID ? emptyMap() : byState;
    byVariantState = byVariantState === VOID ? emptyMap() : byVariantState;
    this.v1k_1 = all;
    this.w1k_1 = byVariant;
    this.x1k_1 = byState;
    this.y1k_1 = byVariantState;
  }
  protoOf(ComponentOverride).toString = function () {
    return 'ComponentOverride(all=' + toString_0(this.v1k_1) + ', byVariant=' + toString(this.w1k_1) + ', byState=' + toString(this.x1k_1) + ', byVariantState=' + toString(this.y1k_1) + ')';
  };
  protoOf(ComponentOverride).hashCode = function () {
    var result = this.v1k_1 == null ? 0 : this.v1k_1.hashCode();
    result = imul(result, 31) + hashCode(this.w1k_1) | 0;
    result = imul(result, 31) + hashCode(this.x1k_1) | 0;
    result = imul(result, 31) + hashCode(this.y1k_1) | 0;
    return result;
  };
  protoOf(ComponentOverride).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ComponentOverride))
      return false;
    if (!equals(this.v1k_1, other.v1k_1))
      return false;
    if (!equals(this.w1k_1, other.w1k_1))
      return false;
    if (!equals(this.x1k_1, other.x1k_1))
      return false;
    if (!equals(this.y1k_1, other.y1k_1))
      return false;
    return true;
  };
  function ComponentOverrides$Companion$$childSerializers$_anonymous__4iyu80() {
    return new LinkedHashMapSerializer(Companion_getInstance_46().s18(), $serializer_getInstance_33());
  }
  function Companion_49() {
    Companion_instance_50 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.z1k_1 = [lazy(tmp_0, ComponentOverrides$Companion$$childSerializers$_anonymous__4iyu80)];
  }
  var Companion_instance_50;
  function Companion_getInstance_48() {
    if (Companion_instance_50 == null)
      new Companion_49();
    return Companion_instance_50;
  }
  function $serializer_34() {
    $serializer_instance_34 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentOverrides', this, 1);
    tmp0_serialDesc.lp('byComponent', true);
    this.a1l_1 = tmp0_serialDesc;
  }
  protoOf($serializer_34).b1l = function (encoder, value) {
    var tmp0_desc = this.a1l_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_48().z1k_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !equals(value.c1l_1, emptyMap())) {
      tmp1_output.ok(tmp0_desc, 0, tmp2_cached[0].q1(), value.c1l_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_34).yf = function (encoder, value) {
    return this.b1l(encoder, value instanceof ComponentOverrides ? value : THROW_CCE());
  };
  protoOf($serializer_34).zf = function (decoder) {
    var tmp0_desc = this.a1l_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    var tmp6_cached = Companion_getInstance_48().z1k_1;
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return ComponentOverrides_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_34).xf = function () {
    return this.a1l_1;
  };
  protoOf($serializer_34).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [Companion_getInstance_48().z1k_1[0].q1()];
  };
  var $serializer_instance_34;
  function $serializer_getInstance_34() {
    if ($serializer_instance_34 == null)
      new $serializer_34();
    return $serializer_instance_34;
  }
  function ComponentOverrides_init_$Init$(seen0, byComponent, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_34().a1l_1);
    }
    if (0 === (seen0 & 1))
      $this.c1l_1 = emptyMap();
    else
      $this.c1l_1 = byComponent;
    return $this;
  }
  function ComponentOverrides_init_$Create$(seen0, byComponent, serializationConstructorMarker) {
    return ComponentOverrides_init_$Init$(seen0, byComponent, serializationConstructorMarker, objectCreate(protoOf(ComponentOverrides)));
  }
  function ComponentOverrides(byComponent) {
    Companion_getInstance_48();
    byComponent = byComponent === VOID ? emptyMap() : byComponent;
    this.c1l_1 = byComponent;
  }
  protoOf(ComponentOverrides).toString = function () {
    return 'ComponentOverrides(byComponent=' + toString(this.c1l_1) + ')';
  };
  protoOf(ComponentOverrides).hashCode = function () {
    return hashCode(this.c1l_1);
  };
  protoOf(ComponentOverrides).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ComponentOverrides))
      return false;
    if (!equals(this.c1l_1, other.c1l_1))
      return false;
    return true;
  };
  function ComponentStylePatch$Companion$$childSerializers$_anonymous__51whoq() {
    return Companion_instance_47.s18();
  }
  function Companion_50() {
    Companion_instance_51 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.d1l_1 = [null, lazy(tmp_0, ComponentStylePatch$Companion$$childSerializers$_anonymous__51whoq)];
  }
  var Companion_instance_51;
  function Companion_getInstance_49() {
    if (Companion_instance_51 == null)
      new Companion_50();
    return Companion_instance_51;
  }
  function $serializer_35() {
    $serializer_instance_35 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.ComponentStylePatch', this, 2);
    tmp0_serialDesc.lp('universal', true);
    tmp0_serialDesc.lp('extra', true);
    this.e1l_1 = tmp0_serialDesc;
  }
  protoOf($serializer_35).f1l = function (encoder, value) {
    var tmp0_desc = this.e1l_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_49().d1l_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.g1l_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, $serializer_getInstance_42(), value.g1l_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.h1l_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, tmp2_cached[1].q1(), value.h1l_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_35).yf = function (encoder, value) {
    return this.f1l(encoder, value instanceof ComponentStylePatch ? value : THROW_CCE());
  };
  protoOf($serializer_35).zf = function (decoder) {
    var tmp0_desc = this.e1l_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    var tmp7_cached = Companion_getInstance_49().d1l_1;
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.lj(tmp0_desc, 0, $serializer_getInstance_42(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, tmp7_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.lj(tmp0_desc, 0, $serializer_getInstance_42(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.lj(tmp0_desc, 1, tmp7_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return ComponentStylePatch_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_35).xf = function () {
    return this.e1l_1;
  };
  protoOf($serializer_35).aq = function () {
    var tmp0_cached = Companion_getInstance_49().d1l_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable($serializer_getInstance_42()), get_nullable(tmp0_cached[1].q1())];
  };
  var $serializer_instance_35;
  function $serializer_getInstance_35() {
    if ($serializer_instance_35 == null)
      new $serializer_35();
    return $serializer_instance_35;
  }
  function ComponentStylePatch_init_$Init$(seen0, universal, extra, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_35().e1l_1);
    }
    if (0 === (seen0 & 1))
      $this.g1l_1 = null;
    else
      $this.g1l_1 = universal;
    if (0 === (seen0 & 2))
      $this.h1l_1 = null;
    else
      $this.h1l_1 = extra;
    return $this;
  }
  function ComponentStylePatch_init_$Create$(seen0, universal, extra, serializationConstructorMarker) {
    return ComponentStylePatch_init_$Init$(seen0, universal, extra, serializationConstructorMarker, objectCreate(protoOf(ComponentStylePatch)));
  }
  function ComponentStylePatch(universal, extra) {
    Companion_getInstance_49();
    universal = universal === VOID ? null : universal;
    extra = extra === VOID ? null : extra;
    this.g1l_1 = universal;
    this.h1l_1 = extra;
  }
  protoOf(ComponentStylePatch).toString = function () {
    return 'ComponentStylePatch(universal=' + toString_0(this.g1l_1) + ', extra=' + toString_0(this.h1l_1) + ')';
  };
  protoOf(ComponentStylePatch).hashCode = function () {
    var result = this.g1l_1 == null ? 0 : this.g1l_1.hashCode();
    result = imul(result, 31) + (this.h1l_1 == null ? 0 : hashCode(this.h1l_1)) | 0;
    return result;
  };
  protoOf(ComponentStylePatch).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ComponentStylePatch))
      return false;
    if (!equals(this.g1l_1, other.g1l_1))
      return false;
    if (!equals(this.h1l_1, other.h1l_1))
      return false;
    return true;
  };
  function $serializer_init_$Init$(typeSerial0, $this) {
    $serializer_36.call($this);
    $this.j1l_1 = typeSerial0;
    return $this;
  }
  function $serializer_init_$Create$(typeSerial0) {
    return $serializer_init_$Init$(typeSerial0, objectCreate(protoOf($serializer_36)));
  }
  function Companion_51() {
    Companion_instance_52 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode.Both', null, 1);
    tmp0_serialDesc.lp('value', false);
    this.k1l_1 = tmp0_serialDesc;
  }
  var Companion_instance_52;
  function Companion_getInstance_50() {
    if (Companion_instance_52 == null)
      new Companion_51();
    return Companion_instance_52;
  }
  function $serializer_36() {
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode.Both', this, 1);
    tmp0_serialDesc.lp('value', false);
    this.i1l_1 = tmp0_serialDesc;
  }
  protoOf($serializer_36).l1l = function (encoder, value) {
    var tmp0_desc = this.i1l_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, this.j1l_1, value.m1l_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_36).yf = function (encoder, value) {
    return this.l1l(encoder, value instanceof Both ? value : THROW_CCE());
  };
  protoOf($serializer_36).zf = function (decoder) {
    var tmp0_desc = this.i1l_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, this.j1l_1, tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, this.j1l_1, tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Both_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_36).xf = function () {
    return this.i1l_1;
  };
  protoOf($serializer_36).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.j1l_1];
  };
  protoOf($serializer_36).bq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.j1l_1];
  };
  function Both_init_$Init$(seen0, value, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, Companion_getInstance_50().k1l_1);
    }
    $this.m1l_1 = value;
    return $this;
  }
  function Both_init_$Create$(seen0, value, serializationConstructorMarker) {
    return Both_init_$Init$(seen0, value, serializationConstructorMarker, objectCreate(protoOf(Both)));
  }
  function $serializer_init_$Init$_0(typeSerial0, $this) {
    $serializer_37.call($this);
    $this.o1l_1 = typeSerial0;
    return $this;
  }
  function $serializer_init_$Create$_0(typeSerial0) {
    return $serializer_init_$Init$_0(typeSerial0, objectCreate(protoOf($serializer_37)));
  }
  function Companion_52() {
    Companion_instance_53 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode.LightOnly', null, 1);
    tmp0_serialDesc.lp('value', false);
    this.p1l_1 = tmp0_serialDesc;
  }
  var Companion_instance_53;
  function Companion_getInstance_51() {
    if (Companion_instance_53 == null)
      new Companion_52();
    return Companion_instance_53;
  }
  function $serializer_37() {
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode.LightOnly', this, 1);
    tmp0_serialDesc.lp('value', false);
    this.n1l_1 = tmp0_serialDesc;
  }
  protoOf($serializer_37).q1l = function (encoder, value) {
    var tmp0_desc = this.n1l_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, this.o1l_1, value.r1l_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_37).yf = function (encoder, value) {
    return this.q1l(encoder, value instanceof LightOnly ? value : THROW_CCE());
  };
  protoOf($serializer_37).zf = function (decoder) {
    var tmp0_desc = this.n1l_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, this.o1l_1, tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, this.o1l_1, tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return LightOnly_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_37).xf = function () {
    return this.n1l_1;
  };
  protoOf($serializer_37).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.o1l_1];
  };
  protoOf($serializer_37).bq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.o1l_1];
  };
  function LightOnly_init_$Init$(seen0, value, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, Companion_getInstance_51().p1l_1);
    }
    $this.r1l_1 = value;
    return $this;
  }
  function LightOnly_init_$Create$(seen0, value, serializationConstructorMarker) {
    return LightOnly_init_$Init$(seen0, value, serializationConstructorMarker, objectCreate(protoOf(LightOnly)));
  }
  function $serializer_init_$Init$_1(typeSerial0, $this) {
    $serializer_38.call($this);
    $this.t1l_1 = typeSerial0;
    return $this;
  }
  function $serializer_init_$Create$_1(typeSerial0) {
    return $serializer_init_$Init$_1(typeSerial0, objectCreate(protoOf($serializer_38)));
  }
  function Companion_53() {
    Companion_instance_54 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode.DarkOnly', null, 1);
    tmp0_serialDesc.lp('value', false);
    this.u1l_1 = tmp0_serialDesc;
  }
  var Companion_instance_54;
  function Companion_getInstance_52() {
    if (Companion_instance_54 == null)
      new Companion_53();
    return Companion_instance_54;
  }
  function $serializer_38() {
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode.DarkOnly', this, 1);
    tmp0_serialDesc.lp('value', false);
    this.s1l_1 = tmp0_serialDesc;
  }
  protoOf($serializer_38).v1l = function (encoder, value) {
    var tmp0_desc = this.s1l_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, this.t1l_1, value.w1l_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_38).yf = function (encoder, value) {
    return this.v1l(encoder, value instanceof DarkOnly ? value : THROW_CCE());
  };
  protoOf($serializer_38).zf = function (decoder) {
    var tmp0_desc = this.s1l_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, this.t1l_1, tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, this.t1l_1, tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return DarkOnly_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_38).xf = function () {
    return this.s1l_1;
  };
  protoOf($serializer_38).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.t1l_1];
  };
  protoOf($serializer_38).bq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.t1l_1];
  };
  function DarkOnly_init_$Init$(seen0, value, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, Companion_getInstance_52().u1l_1);
    }
    $this.w1l_1 = value;
    return $this;
  }
  function DarkOnly_init_$Create$(seen0, value, serializationConstructorMarker) {
    return DarkOnly_init_$Init$(seen0, value, serializationConstructorMarker, objectCreate(protoOf(DarkOnly)));
  }
  function $serializer_init_$Init$_2(typeSerial0, $this) {
    $serializer_39.call($this);
    $this.y1l_1 = typeSerial0;
    return $this;
  }
  function $serializer_init_$Create$_2(typeSerial0) {
    return $serializer_init_$Init$_2(typeSerial0, objectCreate(protoOf($serializer_39)));
  }
  function Companion_54() {
    Companion_instance_55 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode.Split', null, 2);
    tmp0_serialDesc.lp('light', false);
    tmp0_serialDesc.lp('dark', false);
    this.z1l_1 = tmp0_serialDesc;
  }
  var Companion_instance_55;
  function Companion_getInstance_53() {
    if (Companion_instance_55 == null)
      new Companion_54();
    return Companion_instance_55;
  }
  function $serializer_39() {
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode.Split', this, 2);
    tmp0_serialDesc.lp('light', false);
    tmp0_serialDesc.lp('dark', false);
    this.x1l_1 = tmp0_serialDesc;
  }
  protoOf($serializer_39).a1m = function (encoder, value) {
    var tmp0_desc = this.x1l_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, this.y1l_1, value.b1m_1);
    tmp1_output.ok(tmp0_desc, 1, this.y1l_1, value.c1m_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_39).yf = function (encoder, value) {
    return this.a1m(encoder, value instanceof Split ? value : THROW_CCE());
  };
  protoOf($serializer_39).zf = function (decoder) {
    var tmp0_desc = this.x1l_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.jj(tmp0_desc, 0, this.y1l_1, tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.jj(tmp0_desc, 1, this.y1l_1, tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.jj(tmp0_desc, 0, this.y1l_1, tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.jj(tmp0_desc, 1, this.y1l_1, tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return Split_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_39).xf = function () {
    return this.x1l_1;
  };
  protoOf($serializer_39).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.y1l_1, this.y1l_1];
  };
  protoOf($serializer_39).bq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.y1l_1];
  };
  function Split_init_$Init$(seen0, light, dark, serializationConstructorMarker, $this) {
    if (!(3 === (3 & seen0))) {
      throwMissingFieldException(seen0, 3, Companion_getInstance_53().z1l_1);
    }
    $this.b1m_1 = light;
    $this.c1m_1 = dark;
    return $this;
  }
  function Split_init_$Create$(seen0, light, dark, serializationConstructorMarker) {
    return Split_init_$Init$(seen0, light, dark, serializationConstructorMarker, objectCreate(protoOf(Split)));
  }
  function Both(value) {
    Companion_getInstance_50();
    this.m1l_1 = value;
  }
  protoOf(Both).toString = function () {
    return 'Both(value=' + toString_0(this.m1l_1) + ')';
  };
  protoOf(Both).hashCode = function () {
    return this.m1l_1 == null ? 0 : hashCode(this.m1l_1);
  };
  protoOf(Both).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Both))
      return false;
    if (!equals(this.m1l_1, other.m1l_1))
      return false;
    return true;
  };
  function LightOnly(value) {
    Companion_getInstance_51();
    this.r1l_1 = value;
  }
  protoOf(LightOnly).toString = function () {
    return 'LightOnly(value=' + toString_0(this.r1l_1) + ')';
  };
  protoOf(LightOnly).hashCode = function () {
    return this.r1l_1 == null ? 0 : hashCode(this.r1l_1);
  };
  protoOf(LightOnly).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LightOnly))
      return false;
    if (!equals(this.r1l_1, other.r1l_1))
      return false;
    return true;
  };
  function DarkOnly(value) {
    Companion_getInstance_52();
    this.w1l_1 = value;
  }
  protoOf(DarkOnly).toString = function () {
    return 'DarkOnly(value=' + toString_0(this.w1l_1) + ')';
  };
  protoOf(DarkOnly).hashCode = function () {
    return this.w1l_1 == null ? 0 : hashCode(this.w1l_1);
  };
  protoOf(DarkOnly).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DarkOnly))
      return false;
    if (!equals(this.w1l_1, other.w1l_1))
      return false;
    return true;
  };
  function Split(light, dark) {
    Companion_getInstance_53();
    this.b1m_1 = light;
    this.c1m_1 = dark;
  }
  protoOf(Split).toString = function () {
    return 'Split(light=' + toString_0(this.b1m_1) + ', dark=' + toString_0(this.c1m_1) + ')';
  };
  protoOf(Split).hashCode = function () {
    var result = this.b1m_1 == null ? 0 : hashCode(this.b1m_1);
    result = imul(result, 31) + (this.c1m_1 == null ? 0 : hashCode(this.c1m_1)) | 0;
    return result;
  };
  protoOf(Split).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Split))
      return false;
    if (!equals(this.b1m_1, other.b1m_1))
      return false;
    if (!equals(this.c1m_1, other.c1m_1))
      return false;
    return true;
  };
  function OverrideMode() {
  }
  function OverrideValue$Color$Companion$$childSerializers$_anonymous__3uae86() {
    var tmp = getKClass(OverrideMode);
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [getKClass(Both), getKClass(DarkOnly), getKClass(LightOnly), getKClass(Split)];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_1 = [$serializer_init_$Create$($serializer_getInstance_8()), $serializer_init_$Create$_1($serializer_getInstance_8()), $serializer_init_$Create$_0($serializer_getInstance_8()), $serializer_init_$Create$_2($serializer_getInstance_8())];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$6 = [];
    return SealedClassSerializer_init_$Create$('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideMode', tmp, tmp_0, tmp_1, tmp$ret$6);
  }
  function Companion_55() {
    Companion_instance_56 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.d1m_1 = [lazy(tmp_0, OverrideValue$Color$Companion$$childSerializers$_anonymous__3uae86)];
  }
  var Companion_instance_56;
  function Companion_getInstance_54() {
    if (Companion_instance_56 == null)
      new Companion_55();
    return Companion_instance_56;
  }
  function $serializer_40() {
    $serializer_instance_36 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Color', this, 1);
    tmp0_serialDesc.lp('value', false);
    this.e1m_1 = tmp0_serialDesc;
  }
  protoOf($serializer_40).f1m = function (encoder, value) {
    var tmp0_desc = this.e1m_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_54().d1m_1;
    tmp1_output.ok(tmp0_desc, 0, tmp2_cached[0].q1(), value.g1m_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_40).yf = function (encoder, value) {
    return this.f1m(encoder, value instanceof Color ? value : THROW_CCE());
  };
  protoOf($serializer_40).zf = function (decoder) {
    var tmp0_desc = this.e1m_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    var tmp6_cached = Companion_getInstance_54().d1m_1;
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, tmp6_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Color_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_40).xf = function () {
    return this.e1m_1;
  };
  protoOf($serializer_40).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [Companion_getInstance_54().d1m_1[0].q1()];
  };
  var $serializer_instance_36;
  function $serializer_getInstance_36() {
    if ($serializer_instance_36 == null)
      new $serializer_40();
    return $serializer_instance_36;
  }
  function Color_init_$Init$(seen0, value, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_36().e1m_1);
    }
    $this.g1m_1 = value;
    return $this;
  }
  function Color_init_$Create$(seen0, value, serializationConstructorMarker) {
    return Color_init_$Init$(seen0, value, serializationConstructorMarker, objectCreate(protoOf(Color)));
  }
  function Companion_56() {
  }
  var Companion_instance_57;
  function Companion_getInstance_55() {
    return Companion_instance_57;
  }
  function $serializer_41() {
    $serializer_instance_37 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Dp', this, 1);
    tmp0_serialDesc.lp('value', false);
    this.h1m_1 = tmp0_serialDesc;
  }
  protoOf($serializer_41).i1m = function (encoder, value) {
    var tmp0_desc = this.h1m_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance(), new DpValue(value.j1m_1));
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_41).yf = function (encoder, value) {
    return this.i1m(encoder, value instanceof Dp ? value : THROW_CCE());
  };
  protoOf($serializer_41).zf = function (decoder) {
    var tmp0_desc = this.h1m_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      var tmp = $serializer_getInstance();
      var tmp_0 = tmp4_local0;
      var tmp_1 = tmp5_input.jj(tmp0_desc, 0, tmp, tmp_0 == null ? null : new DpValue(tmp_0));
      tmp4_local0 = tmp_1 == null ? null : tmp_1.p1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            var tmp_2 = $serializer_getInstance();
            var tmp_3 = tmp4_local0;
            var tmp_4 = tmp5_input.jj(tmp0_desc, 0, tmp_2, tmp_3 == null ? null : new DpValue(tmp_3));
            tmp4_local0 = tmp_4 == null ? null : tmp_4.p1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Dp_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_41).xf = function () {
    return this.h1m_1;
  };
  protoOf($serializer_41).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance()];
  };
  var $serializer_instance_37;
  function $serializer_getInstance_37() {
    if ($serializer_instance_37 == null)
      new $serializer_41();
    return $serializer_instance_37;
  }
  function Dp_init_$Init$(seen0, value, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_37().h1m_1);
    }
    $this.j1m_1 = value;
    return $this;
  }
  function Dp_init_$Create$(seen0, value, serializationConstructorMarker) {
    return Dp_init_$Init$(seen0, value, serializationConstructorMarker, objectCreate(protoOf(Dp)));
  }
  function Companion_57() {
  }
  var Companion_instance_58;
  function Companion_getInstance_56() {
    return Companion_instance_58;
  }
  function $serializer_42() {
    $serializer_instance_38 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Typography', this, 1);
    tmp0_serialDesc.lp('value', false);
    this.k1m_1 = tmp0_serialDesc;
  }
  protoOf($serializer_42).l1m = function (encoder, value) {
    var tmp0_desc = this.k1m_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance_53(), value.m1m_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_42).yf = function (encoder, value) {
    return this.l1m(encoder, value instanceof Typography ? value : THROW_CCE());
  };
  protoOf($serializer_42).zf = function (decoder) {
    var tmp0_desc = this.k1m_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, $serializer_getInstance_53(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, $serializer_getInstance_53(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Typography_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_42).xf = function () {
    return this.k1m_1;
  };
  protoOf($serializer_42).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance_53()];
  };
  var $serializer_instance_38;
  function $serializer_getInstance_38() {
    if ($serializer_instance_38 == null)
      new $serializer_42();
    return $serializer_instance_38;
  }
  function Typography_init_$Init$(seen0, value, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_38().k1m_1);
    }
    $this.m1m_1 = value;
    return $this;
  }
  function Typography_init_$Create$(seen0, value, serializationConstructorMarker) {
    return Typography_init_$Init$(seen0, value, serializationConstructorMarker, objectCreate(protoOf(Typography)));
  }
  function Companion_58() {
  }
  var Companion_instance_59;
  function Companion_getInstance_57() {
    return Companion_instance_59;
  }
  function $serializer_43() {
    $serializer_instance_39 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Motion', this, 1);
    tmp0_serialDesc.lp('value', false);
    this.n1m_1 = tmp0_serialDesc;
  }
  protoOf($serializer_43).o1m = function (encoder, value) {
    var tmp0_desc = this.n1m_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance_9(), value.p1m_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_43).yf = function (encoder, value) {
    return this.o1m(encoder, value instanceof Motion ? value : THROW_CCE());
  };
  protoOf($serializer_43).zf = function (decoder) {
    var tmp0_desc = this.n1m_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, $serializer_getInstance_9(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, $serializer_getInstance_9(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Motion_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_43).xf = function () {
    return this.n1m_1;
  };
  protoOf($serializer_43).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance_9()];
  };
  var $serializer_instance_39;
  function $serializer_getInstance_39() {
    if ($serializer_instance_39 == null)
      new $serializer_43();
    return $serializer_instance_39;
  }
  function Motion_init_$Init$(seen0, value, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_39().n1m_1);
    }
    $this.p1m_1 = value;
    return $this;
  }
  function Motion_init_$Create$(seen0, value, serializationConstructorMarker) {
    return Motion_init_$Init$(seen0, value, serializationConstructorMarker, objectCreate(protoOf(Motion)));
  }
  function Companion_59() {
  }
  var Companion_instance_60;
  function Companion_getInstance_58() {
    return Companion_instance_60;
  }
  function $serializer_44() {
    $serializer_instance_40 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Depth', this, 1);
    tmp0_serialDesc.lp('value', false);
    this.q1m_1 = tmp0_serialDesc;
  }
  protoOf($serializer_44).r1m = function (encoder, value) {
    var tmp0_desc = this.q1m_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance_47(), value.s1m_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_44).yf = function (encoder, value) {
    return this.r1m(encoder, value instanceof Depth ? value : THROW_CCE());
  };
  protoOf($serializer_44).zf = function (decoder) {
    var tmp0_desc = this.q1m_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, $serializer_getInstance_47(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, $serializer_getInstance_47(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Depth_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_44).xf = function () {
    return this.q1m_1;
  };
  protoOf($serializer_44).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance_47()];
  };
  var $serializer_instance_40;
  function $serializer_getInstance_40() {
    if ($serializer_instance_40 == null)
      new $serializer_44();
    return $serializer_instance_40;
  }
  function Depth_init_$Init$(seen0, value, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_40().q1m_1);
    }
    $this.s1m_1 = value;
    return $this;
  }
  function Depth_init_$Create$(seen0, value, serializationConstructorMarker) {
    return Depth_init_$Init$(seen0, value, serializationConstructorMarker, objectCreate(protoOf(Depth)));
  }
  function Color(value) {
    Companion_getInstance_54();
    this.g1m_1 = value;
  }
  protoOf(Color).toString = function () {
    return 'Color(value=' + toString(this.g1m_1) + ')';
  };
  protoOf(Color).hashCode = function () {
    return hashCode(this.g1m_1);
  };
  protoOf(Color).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Color))
      return false;
    if (!equals(this.g1m_1, other.g1m_1))
      return false;
    return true;
  };
  function Dp(value) {
    this.j1m_1 = value;
  }
  protoOf(Dp).toString = function () {
    return 'Dp(value=' + DpValue__toString_impl_qlaqm4(this.j1m_1) + ')';
  };
  protoOf(Dp).hashCode = function () {
    return DpValue__hashCode_impl_4u4tt9(this.j1m_1);
  };
  protoOf(Dp).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Dp))
      return false;
    if (!equals(this.j1m_1, other.j1m_1))
      return false;
    return true;
  };
  function Typography(value) {
    this.m1m_1 = value;
  }
  protoOf(Typography).toString = function () {
    return 'Typography(value=' + this.m1m_1.toString() + ')';
  };
  protoOf(Typography).hashCode = function () {
    return this.m1m_1.hashCode();
  };
  protoOf(Typography).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Typography))
      return false;
    if (!this.m1m_1.equals(other.m1m_1))
      return false;
    return true;
  };
  function Motion(value) {
    this.p1m_1 = value;
  }
  protoOf(Motion).toString = function () {
    return 'Motion(value=' + this.p1m_1.toString() + ')';
  };
  protoOf(Motion).hashCode = function () {
    return this.p1m_1.hashCode();
  };
  protoOf(Motion).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Motion))
      return false;
    if (!this.p1m_1.equals(other.p1m_1))
      return false;
    return true;
  };
  function Depth(value) {
    this.s1m_1 = value;
  }
  protoOf(Depth).toString = function () {
    return 'Depth(value=' + this.s1m_1.toString() + ')';
  };
  protoOf(Depth).hashCode = function () {
    return this.s1m_1.hashCode();
  };
  protoOf(Depth).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Depth))
      return false;
    if (!this.s1m_1.equals(other.s1m_1))
      return false;
    return true;
  };
  function Companion_60() {
  }
  protoOf(Companion_60).s18 = function () {
    var tmp = getKClass(OverrideValue);
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [getKClass(Color), getKClass(Depth), getKClass(Dp), getKClass(Motion), getKClass(Typography)];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_1 = [$serializer_getInstance_36(), $serializer_getInstance_40(), $serializer_getInstance_37(), $serializer_getInstance_39(), $serializer_getInstance_38()];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$6 = [];
    return SealedClassSerializer_init_$Create$('io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue', tmp, tmp_0, tmp_1, tmp$ret$6);
  };
  var Companion_instance_61;
  function Companion_getInstance_59() {
    return Companion_instance_61;
  }
  function OverrideValue() {
  }
  function _get_$cachedSerializer__te6jhj_13($this) {
    return $this.t1m_1.q1();
  }
  function ProminenceTier$Companion$_anonymous__4sa2il() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.intent.controls.overrides.ProminenceTier', values_14());
  }
  var static_init_called_15;
  function static_init_15() {
    if (static_init_called_15)
      return Unit_instance;
    static_init_called_15 = true;
    ProminenceTier_Primary_instance = new ProminenceTier('Primary', 0);
    ProminenceTier_Secondary_instance = new ProminenceTier('Secondary', 1);
    ProminenceTier_Tertiary_instance = new ProminenceTier('Tertiary', 2);
    ProminenceTier_Quiet_instance = new ProminenceTier('Quiet', 3);
    if (Companion_instance_62 == null) {
      Companion_instance;
      new Companion_61();
    }
  }
  var ProminenceTier_Primary_instance;
  var ProminenceTier_Secondary_instance;
  var ProminenceTier_Tertiary_instance;
  var ProminenceTier_Quiet_instance;
  function values_14() {
    static_init_15();
    return [ProminenceTier_Primary_getInstance(), ProminenceTier_Secondary_getInstance(), ProminenceTier_Tertiary_getInstance(), ProminenceTier_Quiet_getInstance()];
  }
  function Companion_61() {
    Companion_instance_62 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.t1m_1 = lazy(tmp_0, ProminenceTier$Companion$_anonymous__4sa2il);
  }
  protoOf(Companion_61).s18 = function () {
    return _get_$cachedSerializer__te6jhj_13(this);
  };
  var Companion_instance_62;
  function Companion_getInstance_60() {
    static_init_15();
    return Companion_instance_62;
  }
  function ProminenceTier(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ProminenceTier_Primary_getInstance() {
    static_init_15();
    return ProminenceTier_Primary_instance;
  }
  function ProminenceTier_Secondary_getInstance() {
    static_init_15();
    return ProminenceTier_Secondary_instance;
  }
  function ProminenceTier_Tertiary_getInstance() {
    static_init_15();
    return ProminenceTier_Tertiary_instance;
  }
  function ProminenceTier_Quiet_getInstance() {
    static_init_15();
    return ProminenceTier_Quiet_instance;
  }
  function _get_$cachedSerializer__te6jhj_14($this) {
    return $this.r1k_1.q1();
  }
  function StateId$Companion$_anonymous__7bgegz() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.intent.controls.overrides.StateId', values_15());
  }
  var static_init_called_16;
  function static_init_16() {
    if (static_init_called_16)
      return Unit_instance;
    static_init_called_16 = true;
    StateId_Default_instance = new StateId('Default', 0);
    StateId_Pressed_instance = new StateId('Pressed', 1);
    StateId_Focused_instance = new StateId('Focused', 2);
    StateId_Hovered_instance = new StateId('Hovered', 3);
    StateId_Dragged_instance = new StateId('Dragged', 4);
    StateId_Disabled_instance = new StateId('Disabled', 5);
    StateId_Selected_instance = new StateId('Selected', 6);
    if (Companion_instance_63 == null) {
      Companion_instance;
      new Companion_62();
    }
  }
  var StateId_Default_instance;
  var StateId_Pressed_instance;
  var StateId_Focused_instance;
  var StateId_Hovered_instance;
  var StateId_Dragged_instance;
  var StateId_Disabled_instance;
  var StateId_Selected_instance;
  function values_15() {
    static_init_16();
    return [StateId_Default_getInstance(), StateId_Pressed_getInstance(), StateId_Focused_getInstance(), StateId_Hovered_getInstance(), StateId_Dragged_getInstance(), StateId_Disabled_getInstance(), StateId_Selected_getInstance()];
  }
  function valueOf_0(value) {
    static_init_16();
    switch (value) {
      case 'Default':
        return StateId_Default_getInstance();
      case 'Pressed':
        return StateId_Pressed_getInstance();
      case 'Focused':
        return StateId_Focused_getInstance();
      case 'Hovered':
        return StateId_Hovered_getInstance();
      case 'Dragged':
        return StateId_Dragged_getInstance();
      case 'Disabled':
        return StateId_Disabled_getInstance();
      case 'Selected':
        return StateId_Selected_getInstance();
      default:
        THROW_IAE('No enum constant io.github.alph_a07.basis.theme.intent.controls.overrides.StateId.' + value);
        break;
    }
  }
  function Companion_62() {
    Companion_instance_63 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.r1k_1 = lazy(tmp_0, StateId$Companion$_anonymous__7bgegz);
  }
  protoOf(Companion_62).s18 = function () {
    return _get_$cachedSerializer__te6jhj_14(this);
  };
  var Companion_instance_63;
  function Companion_getInstance_61() {
    static_init_16();
    return Companion_instance_63;
  }
  function StateId(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function StateId_Default_getInstance() {
    static_init_16();
    return StateId_Default_instance;
  }
  function StateId_Pressed_getInstance() {
    static_init_16();
    return StateId_Pressed_instance;
  }
  function StateId_Focused_getInstance() {
    static_init_16();
    return StateId_Focused_instance;
  }
  function StateId_Hovered_getInstance() {
    static_init_16();
    return StateId_Hovered_instance;
  }
  function StateId_Dragged_getInstance() {
    static_init_16();
    return StateId_Dragged_instance;
  }
  function StateId_Disabled_getInstance() {
    static_init_16();
    return StateId_Disabled_instance;
  }
  function StateId_Selected_getInstance() {
    static_init_16();
    return StateId_Selected_instance;
  }
  function TokenOverrides$Companion$$childSerializers$_anonymous__adxj0() {
    return new LinkedHashMapSerializer(StringSerializer_getInstance(), Companion_instance_61.s18());
  }
  function Companion_63() {
    Companion_instance_64 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.u1m_1 = [lazy(tmp_0, TokenOverrides$Companion$$childSerializers$_anonymous__adxj0)];
  }
  var Companion_instance_64;
  function Companion_getInstance_62() {
    if (Companion_instance_64 == null)
      new Companion_63();
    return Companion_instance_64;
  }
  function $serializer_45() {
    $serializer_instance_41 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.TokenOverrides', this, 1);
    tmp0_serialDesc.lp('paths', true);
    this.v1m_1 = tmp0_serialDesc;
  }
  protoOf($serializer_45).w1m = function (encoder, value) {
    var tmp0_desc = this.v1m_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_62().u1m_1;
    tmp1_output.ok(tmp0_desc, 0, tmp2_cached[0].q1(), value.e1n_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_45).yf = function (encoder, value) {
    return this.w1m(encoder, value instanceof TokenOverrides ? value : THROW_CCE());
  };
  protoOf($serializer_45).zf = function (decoder) {
    var tmp0_desc = this.v1m_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp12_input = decoder.xi(tmp0_desc);
    var tmp13_cached = Companion_getInstance_62().u1m_1;
    if (tmp12_input.nj()) {
      tmp4_local0 = tmp12_input.jj(tmp0_desc, 0, tmp13_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp12_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp12_input.jj(tmp0_desc, 0, tmp13_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp12_input.yi(tmp0_desc);
    return TokenOverrides_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_45).xf = function () {
    return this.v1m_1;
  };
  protoOf($serializer_45).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [Companion_getInstance_62().u1m_1[0].q1()];
  };
  var $serializer_instance_41;
  function $serializer_getInstance_41() {
    if ($serializer_instance_41 == null)
      new $serializer_45();
    return $serializer_instance_41;
  }
  function TokenOverrides_init_$Init$(seen0, paths, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_41().v1m_1);
    }
    $this.x1m_1 = null;
    $this.y1m_1 = null;
    $this.z1m_1 = null;
    $this.a1n_1 = null;
    $this.b1n_1 = null;
    $this.c1n_1 = null;
    $this.d1n_1 = null;
    if (0 === (seen0 & 1))
      $this.e1n_1 = flattenTokenOverrides($this.x1m_1, $this.z1m_1, $this.a1n_1, $this.c1n_1);
    else
      $this.e1n_1 = paths;
    var flattened = flattenTokenOverrides($this.x1m_1, $this.z1m_1, $this.a1n_1, $this.c1n_1);
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = flattened.w1().j();
    while (_iterator__ex2g4s.k()) {
      var _destruct__k2r9zo = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var path = _destruct__k2r9zo.p1();
      // Inline function 'kotlin.collections.component2' call
      var value = _destruct__k2r9zo.q1();
      var explicit = $this.e1n_1.t1(path);
      // Inline function 'kotlin.require' call
      if (!(explicit == null || equals(explicit, value))) {
        var message = "TokenOverrides conflict: typed property for '" + path + "' has value " + toString(value) + ' but explicit path has ' + toString_0(explicit);
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
    return $this;
  }
  function TokenOverrides_init_$Create$(seen0, paths, serializationConstructorMarker) {
    return TokenOverrides_init_$Init$(seen0, paths, serializationConstructorMarker, objectCreate(protoOf(TokenOverrides)));
  }
  function TokenOverrides(color, typography, spacing, radius, depth, size, motion, paths) {
    Companion_getInstance_62();
    color = color === VOID ? null : color;
    typography = typography === VOID ? null : typography;
    spacing = spacing === VOID ? null : spacing;
    radius = radius === VOID ? null : radius;
    depth = depth === VOID ? null : depth;
    size = size === VOID ? null : size;
    motion = motion === VOID ? null : motion;
    paths = paths === VOID ? flattenTokenOverrides(color, spacing, radius, size) : paths;
    this.x1m_1 = color;
    this.y1m_1 = typography;
    this.z1m_1 = spacing;
    this.a1n_1 = radius;
    this.b1n_1 = depth;
    this.c1n_1 = size;
    this.d1n_1 = motion;
    this.e1n_1 = paths;
    var flattened = flattenTokenOverrides(this.x1m_1, this.z1m_1, this.a1n_1, this.c1n_1);
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = flattened.w1().j();
    while (_iterator__ex2g4s.k()) {
      var _destruct__k2r9zo = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var path = _destruct__k2r9zo.p1();
      // Inline function 'kotlin.collections.component2' call
      var value = _destruct__k2r9zo.q1();
      var explicit = this.e1n_1.t1(path);
      // Inline function 'kotlin.require' call
      if (!(explicit == null || equals(explicit, value))) {
        var message = "TokenOverrides conflict: typed property for '" + path + "' has value " + toString(value) + ' but explicit path has ' + toString_0(explicit);
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(TokenOverrides).toString = function () {
    return 'TokenOverrides(color=' + toString_0(this.x1m_1) + ', typography=' + toString_0(this.y1m_1) + ', spacing=' + toString_0(this.z1m_1) + ', radius=' + toString_0(this.a1n_1) + ', depth=' + toString_0(this.b1n_1) + ', size=' + toString_0(this.c1n_1) + ', motion=' + toString_0(this.d1n_1) + ', paths=' + toString(this.e1n_1) + ')';
  };
  protoOf(TokenOverrides).hashCode = function () {
    var result = this.x1m_1 == null ? 0 : this.x1m_1.hashCode();
    result = imul(result, 31) + (this.y1m_1 == null ? 0 : this.y1m_1.hashCode()) | 0;
    result = imul(result, 31) + (this.z1m_1 == null ? 0 : this.z1m_1.hashCode()) | 0;
    result = imul(result, 31) + (this.a1n_1 == null ? 0 : this.a1n_1.hashCode()) | 0;
    result = imul(result, 31) + (this.b1n_1 == null ? 0 : this.b1n_1.hashCode()) | 0;
    result = imul(result, 31) + (this.c1n_1 == null ? 0 : this.c1n_1.hashCode()) | 0;
    result = imul(result, 31) + (this.d1n_1 == null ? 0 : this.d1n_1.hashCode()) | 0;
    result = imul(result, 31) + hashCode(this.e1n_1) | 0;
    return result;
  };
  protoOf(TokenOverrides).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TokenOverrides))
      return false;
    if (!equals(this.x1m_1, other.x1m_1))
      return false;
    if (!equals(this.y1m_1, other.y1m_1))
      return false;
    if (!equals(this.z1m_1, other.z1m_1))
      return false;
    if (!equals(this.a1n_1, other.a1n_1))
      return false;
    if (!equals(this.b1n_1, other.b1n_1))
      return false;
    if (!equals(this.c1n_1, other.c1n_1))
      return false;
    if (!equals(this.d1n_1, other.d1n_1))
      return false;
    if (!equals(this.e1n_1, other.e1n_1))
      return false;
    return true;
  };
  function flattenTokenOverrides(color, spacing, radius, size) {
    var map = LinkedHashMap_init_$Create$();
    if (!(color == null)) {
      flattenColorOverrides(color, map);
    }
    if (!(spacing == null)) {
      flattenSpacingOverrides(spacing, map);
    }
    if (!(radius == null)) {
      flattenRadiusOverrides(radius, map);
    }
    if (!(size == null)) {
      flattenSizeOverrides(size, map);
    }
    return map;
  }
  function flattenColorOverrides(color, map) {
    flattenSurfaceColor(color.f1n_1, map);
    flattenContentAndIconColor(color.g1n_1, color.h1n_1, map);
    flattenBorderAndSelection(color.i1n_1, color.j1n_1, map);
    flattenStatusAndBrandColor(color, map);
  }
  function flattenSpacingOverrides(spacing, map) {
    var tmp0_safe_receiver = spacing.r1n_1;
    var tmp = tmp0_safe_receiver;
    if ((tmp == null ? null : new DpValue(tmp)) == null)
      null;
    else {
      var tmp_0 = tmp0_safe_receiver;
      // Inline function 'kotlin.let' call
      var it = (tmp_0 == null ? null : new DpValue(tmp_0)).p1d_1;
      var tmp2 = SpacingTokenPath_Level1_getInstance().j1c_1;
      // Inline function 'kotlin.collections.set' call
      var value = new Dp(it);
      map.x1(tmp2, value);
    }
    var tmp1_safe_receiver = spacing.s1n_1;
    var tmp_1 = tmp1_safe_receiver;
    if ((tmp_1 == null ? null : new DpValue(tmp_1)) == null)
      null;
    else {
      var tmp_2 = tmp1_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_0 = (tmp_2 == null ? null : new DpValue(tmp_2)).p1d_1;
      var tmp2_0 = SpacingTokenPath_Level2_getInstance().j1c_1;
      // Inline function 'kotlin.collections.set' call
      var value_0 = new Dp(it_0);
      map.x1(tmp2_0, value_0);
    }
    var tmp2_safe_receiver = spacing.t1n_1;
    var tmp_3 = tmp2_safe_receiver;
    if ((tmp_3 == null ? null : new DpValue(tmp_3)) == null)
      null;
    else {
      var tmp_4 = tmp2_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_1 = (tmp_4 == null ? null : new DpValue(tmp_4)).p1d_1;
      var tmp2_1 = SpacingTokenPath_Level3_getInstance().j1c_1;
      // Inline function 'kotlin.collections.set' call
      var value_1 = new Dp(it_1);
      map.x1(tmp2_1, value_1);
    }
    var tmp3_safe_receiver = spacing.u1n_1;
    var tmp_5 = tmp3_safe_receiver;
    if ((tmp_5 == null ? null : new DpValue(tmp_5)) == null)
      null;
    else {
      var tmp_6 = tmp3_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_2 = (tmp_6 == null ? null : new DpValue(tmp_6)).p1d_1;
      var tmp2_2 = SpacingTokenPath_Level4_getInstance().j1c_1;
      // Inline function 'kotlin.collections.set' call
      var value_2 = new Dp(it_2);
      map.x1(tmp2_2, value_2);
    }
    var tmp4_safe_receiver = spacing.v1n_1;
    var tmp_7 = tmp4_safe_receiver;
    if ((tmp_7 == null ? null : new DpValue(tmp_7)) == null)
      null;
    else {
      var tmp_8 = tmp4_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_3 = (tmp_8 == null ? null : new DpValue(tmp_8)).p1d_1;
      var tmp2_3 = SpacingTokenPath_Level5_getInstance().j1c_1;
      // Inline function 'kotlin.collections.set' call
      var value_3 = new Dp(it_3);
      map.x1(tmp2_3, value_3);
    }
    var tmp5_safe_receiver = spacing.w1n_1;
    var tmp_9 = tmp5_safe_receiver;
    if ((tmp_9 == null ? null : new DpValue(tmp_9)) == null)
      null;
    else {
      var tmp_10 = tmp5_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_4 = (tmp_10 == null ? null : new DpValue(tmp_10)).p1d_1;
      var tmp2_4 = SpacingTokenPath_Level6_getInstance().j1c_1;
      // Inline function 'kotlin.collections.set' call
      var value_4 = new Dp(it_4);
      map.x1(tmp2_4, value_4);
    }
    var tmp6_safe_receiver = spacing.x1n_1;
    var tmp_11 = tmp6_safe_receiver;
    if ((tmp_11 == null ? null : new DpValue(tmp_11)) == null)
      null;
    else {
      var tmp_12 = tmp6_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_5 = (tmp_12 == null ? null : new DpValue(tmp_12)).p1d_1;
      var tmp2_5 = SpacingTokenPath_Level7_getInstance().j1c_1;
      // Inline function 'kotlin.collections.set' call
      var value_5 = new Dp(it_5);
      map.x1(tmp2_5, value_5);
    }
    var tmp7_safe_receiver = spacing.y1n_1;
    var tmp_13 = tmp7_safe_receiver;
    if ((tmp_13 == null ? null : new DpValue(tmp_13)) == null)
      null;
    else {
      var tmp_14 = tmp7_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_6 = (tmp_14 == null ? null : new DpValue(tmp_14)).p1d_1;
      var tmp2_6 = SpacingTokenPath_Level8_getInstance().j1c_1;
      // Inline function 'kotlin.collections.set' call
      var value_6 = new Dp(it_6);
      map.x1(tmp2_6, value_6);
    }
  }
  function flattenRadiusOverrides(radius, map) {
    var tmp0_safe_receiver = radius.z1n_1;
    var tmp = tmp0_safe_receiver;
    if ((tmp == null ? null : new DpValue(tmp)) == null)
      null;
    else {
      var tmp_0 = tmp0_safe_receiver;
      // Inline function 'kotlin.let' call
      var it = (tmp_0 == null ? null : new DpValue(tmp_0)).p1d_1;
      var tmp2 = RadiusTokenPath_Level1_getInstance().v1b_1;
      // Inline function 'kotlin.collections.set' call
      var value = new Dp(it);
      map.x1(tmp2, value);
    }
    var tmp1_safe_receiver = radius.a1o_1;
    var tmp_1 = tmp1_safe_receiver;
    if ((tmp_1 == null ? null : new DpValue(tmp_1)) == null)
      null;
    else {
      var tmp_2 = tmp1_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_0 = (tmp_2 == null ? null : new DpValue(tmp_2)).p1d_1;
      var tmp2_0 = RadiusTokenPath_Level2_getInstance().v1b_1;
      // Inline function 'kotlin.collections.set' call
      var value_0 = new Dp(it_0);
      map.x1(tmp2_0, value_0);
    }
    var tmp2_safe_receiver = radius.b1o_1;
    var tmp_3 = tmp2_safe_receiver;
    if ((tmp_3 == null ? null : new DpValue(tmp_3)) == null)
      null;
    else {
      var tmp_4 = tmp2_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_1 = (tmp_4 == null ? null : new DpValue(tmp_4)).p1d_1;
      var tmp2_1 = RadiusTokenPath_Level3_getInstance().v1b_1;
      // Inline function 'kotlin.collections.set' call
      var value_1 = new Dp(it_1);
      map.x1(tmp2_1, value_1);
    }
    var tmp3_safe_receiver = radius.c1o_1;
    var tmp_5 = tmp3_safe_receiver;
    if ((tmp_5 == null ? null : new DpValue(tmp_5)) == null)
      null;
    else {
      var tmp_6 = tmp3_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_2 = (tmp_6 == null ? null : new DpValue(tmp_6)).p1d_1;
      var tmp2_2 = RadiusTokenPath_Level4_getInstance().v1b_1;
      // Inline function 'kotlin.collections.set' call
      var value_2 = new Dp(it_2);
      map.x1(tmp2_2, value_2);
    }
    var tmp4_safe_receiver = radius.d1o_1;
    var tmp_7 = tmp4_safe_receiver;
    if ((tmp_7 == null ? null : new DpValue(tmp_7)) == null)
      null;
    else {
      var tmp_8 = tmp4_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_3 = (tmp_8 == null ? null : new DpValue(tmp_8)).p1d_1;
      var tmp2_3 = RadiusTokenPath_Level5_getInstance().v1b_1;
      // Inline function 'kotlin.collections.set' call
      var value_3 = new Dp(it_3);
      map.x1(tmp2_3, value_3);
    }
    var tmp5_safe_receiver = radius.e1o_1;
    var tmp_9 = tmp5_safe_receiver;
    if ((tmp_9 == null ? null : new DpValue(tmp_9)) == null)
      null;
    else {
      var tmp_10 = tmp5_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_4 = (tmp_10 == null ? null : new DpValue(tmp_10)).p1d_1;
      var tmp2_4 = RadiusTokenPath_Level6_getInstance().v1b_1;
      // Inline function 'kotlin.collections.set' call
      var value_4 = new Dp(it_4);
      map.x1(tmp2_4, value_4);
    }
    var tmp6_safe_receiver = radius.f1o_1;
    var tmp_11 = tmp6_safe_receiver;
    if ((tmp_11 == null ? null : new DpValue(tmp_11)) == null)
      null;
    else {
      var tmp_12 = tmp6_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_5 = (tmp_12 == null ? null : new DpValue(tmp_12)).p1d_1;
      var tmp2_5 = RadiusTokenPath_Level7_getInstance().v1b_1;
      // Inline function 'kotlin.collections.set' call
      var value_5 = new Dp(it_5);
      map.x1(tmp2_5, value_5);
    }
    var tmp7_safe_receiver = radius.g1o_1;
    var tmp_13 = tmp7_safe_receiver;
    if ((tmp_13 == null ? null : new DpValue(tmp_13)) == null)
      null;
    else {
      var tmp_14 = tmp7_safe_receiver;
      // Inline function 'kotlin.let' call
      var it_6 = (tmp_14 == null ? null : new DpValue(tmp_14)).p1d_1;
      var tmp2_6 = RadiusTokenPath_Level8_getInstance().v1b_1;
      // Inline function 'kotlin.collections.set' call
      var value_6 = new Dp(it_6);
      map.x1(tmp2_6, value_6);
    }
  }
  function flattenSizeOverrides(size, map) {
    var tmp0_safe_receiver = size.h1o_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_0 = tmp0_safe_receiver.l1o_1;
      var tmp = tmp0_safe_receiver_0;
      if ((tmp == null ? null : new DpValue(tmp)) == null)
        null;
      else {
        var tmp_0 = tmp0_safe_receiver_0;
        // Inline function 'kotlin.let' call
        var it = (tmp_0 == null ? null : new DpValue(tmp_0)).p1d_1;
        var tmp2 = IconSizeTokenPath_Level1_getInstance().c1b_1;
        // Inline function 'kotlin.collections.set' call
        var value = new Dp(it);
        map.x1(tmp2, value);
      }
      var tmp1_safe_receiver = tmp0_safe_receiver.m1o_1;
      var tmp_1 = tmp1_safe_receiver;
      if ((tmp_1 == null ? null : new DpValue(tmp_1)) == null)
        null;
      else {
        var tmp_2 = tmp1_safe_receiver;
        // Inline function 'kotlin.let' call
        var it_0 = (tmp_2 == null ? null : new DpValue(tmp_2)).p1d_1;
        var tmp2_0 = IconSizeTokenPath_Level2_getInstance().c1b_1;
        // Inline function 'kotlin.collections.set' call
        var value_0 = new Dp(it_0);
        map.x1(tmp2_0, value_0);
      }
      var tmp2_safe_receiver = tmp0_safe_receiver.n1o_1;
      var tmp_3 = tmp2_safe_receiver;
      if ((tmp_3 == null ? null : new DpValue(tmp_3)) == null)
        null;
      else {
        var tmp_4 = tmp2_safe_receiver;
        // Inline function 'kotlin.let' call
        var it_1 = (tmp_4 == null ? null : new DpValue(tmp_4)).p1d_1;
        var tmp2_1 = IconSizeTokenPath_Level3_getInstance().c1b_1;
        // Inline function 'kotlin.collections.set' call
        var value_1 = new Dp(it_1);
        map.x1(tmp2_1, value_1);
      }
      var tmp3_safe_receiver = tmp0_safe_receiver.o1o_1;
      var tmp_5 = tmp3_safe_receiver;
      if ((tmp_5 == null ? null : new DpValue(tmp_5)) == null)
        null;
      else {
        var tmp_6 = tmp3_safe_receiver;
        // Inline function 'kotlin.let' call
        var it_2 = (tmp_6 == null ? null : new DpValue(tmp_6)).p1d_1;
        var tmp2_2 = IconSizeTokenPath_Level4_getInstance().c1b_1;
        // Inline function 'kotlin.collections.set' call
        var value_2 = new Dp(it_2);
        map.x1(tmp2_2, value_2);
      }
      var tmp4_safe_receiver = tmp0_safe_receiver.p1o_1;
      var tmp_7;
      var tmp_8 = tmp4_safe_receiver;
      if ((tmp_8 == null ? null : new DpValue(tmp_8)) == null) {
        tmp_7 = null;
      } else {
        var tmp_9 = tmp4_safe_receiver;
        // Inline function 'kotlin.let' call
        var it_3 = (tmp_9 == null ? null : new DpValue(tmp_9)).p1d_1;
        var tmp2_3 = IconSizeTokenPath_Level5_getInstance().c1b_1;
        // Inline function 'kotlin.collections.set' call
        var value_3 = new Dp(it_3);
        map.x1(tmp2_3, value_3);
        tmp_7 = Unit_instance;
      }
    }
    var tmp1_safe_receiver_0 = size.j1o_1;
    if (tmp1_safe_receiver_0 == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_1 = tmp1_safe_receiver_0.q1o_1;
      var tmp_10 = tmp0_safe_receiver_1;
      if ((tmp_10 == null ? null : new DpValue(tmp_10)) == null)
        null;
      else {
        var tmp_11 = tmp0_safe_receiver_1;
        // Inline function 'kotlin.let' call
        var it_4 = (tmp_11 == null ? null : new DpValue(tmp_11)).p1d_1;
        var tmp2_4 = ControlSizeTokenPath_Level1_getInstance().l1a_1;
        // Inline function 'kotlin.collections.set' call
        var value_4 = new Dp(it_4);
        map.x1(tmp2_4, value_4);
      }
      var tmp1_safe_receiver_1 = tmp1_safe_receiver_0.r1o_1;
      var tmp_12 = tmp1_safe_receiver_1;
      if ((tmp_12 == null ? null : new DpValue(tmp_12)) == null)
        null;
      else {
        var tmp_13 = tmp1_safe_receiver_1;
        // Inline function 'kotlin.let' call
        var it_5 = (tmp_13 == null ? null : new DpValue(tmp_13)).p1d_1;
        var tmp2_5 = ControlSizeTokenPath_Level2_getInstance().l1a_1;
        // Inline function 'kotlin.collections.set' call
        var value_5 = new Dp(it_5);
        map.x1(tmp2_5, value_5);
      }
      var tmp2_safe_receiver_0 = tmp1_safe_receiver_0.s1o_1;
      var tmp_14 = tmp2_safe_receiver_0;
      if ((tmp_14 == null ? null : new DpValue(tmp_14)) == null)
        null;
      else {
        var tmp_15 = tmp2_safe_receiver_0;
        // Inline function 'kotlin.let' call
        var it_6 = (tmp_15 == null ? null : new DpValue(tmp_15)).p1d_1;
        var tmp2_6 = ControlSizeTokenPath_Level3_getInstance().l1a_1;
        // Inline function 'kotlin.collections.set' call
        var value_6 = new Dp(it_6);
        map.x1(tmp2_6, value_6);
      }
      var tmp3_safe_receiver_0 = tmp1_safe_receiver_0.t1o_1;
      var tmp_16 = tmp3_safe_receiver_0;
      if ((tmp_16 == null ? null : new DpValue(tmp_16)) == null)
        null;
      else {
        var tmp_17 = tmp3_safe_receiver_0;
        // Inline function 'kotlin.let' call
        var it_7 = (tmp_17 == null ? null : new DpValue(tmp_17)).p1d_1;
        var tmp2_7 = ControlSizeTokenPath_Level4_getInstance().l1a_1;
        // Inline function 'kotlin.collections.set' call
        var value_7 = new Dp(it_7);
        map.x1(tmp2_7, value_7);
      }
      var tmp4_safe_receiver_0 = tmp1_safe_receiver_0.u1o_1;
      var tmp_18;
      var tmp_19 = tmp4_safe_receiver_0;
      if ((tmp_19 == null ? null : new DpValue(tmp_19)) == null) {
        tmp_18 = null;
      } else {
        var tmp_20 = tmp4_safe_receiver_0;
        // Inline function 'kotlin.let' call
        var it_8 = (tmp_20 == null ? null : new DpValue(tmp_20)).p1d_1;
        var tmp2_8 = ControlSizeTokenPath_Level5_getInstance().l1a_1;
        // Inline function 'kotlin.collections.set' call
        var value_8 = new Dp(it_8);
        map.x1(tmp2_8, value_8);
        tmp_18 = Unit_instance;
      }
    }
  }
  function flattenSurfaceColor(surface, map) {
    var tmp1_safe_receiver = surface == null ? null : surface.v1o_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2 = ColorTokenPath_SurfaceDefault_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value = new Color(tmp1_safe_receiver);
      map.x1(tmp2, value);
    }
    var tmp3_safe_receiver = surface == null ? null : surface.w1o_1;
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_0 = ColorTokenPath_SurfaceElevated_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_0 = new Color(tmp3_safe_receiver);
      map.x1(tmp2_0, value_0);
    }
    var tmp5_safe_receiver = surface == null ? null : surface.x1o_1;
    if (tmp5_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_1 = ColorTokenPath_SurfaceRecessed_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_1 = new Color(tmp5_safe_receiver);
      map.x1(tmp2_1, value_1);
    }
    var tmp7_safe_receiver = surface == null ? null : surface.y1o_1;
    if (tmp7_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_2 = ColorTokenPath_SurfaceInverse_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_2 = new Color(tmp7_safe_receiver);
      map.x1(tmp2_2, value_2);
    }
  }
  function flattenContentAndIconColor(content, icon, map) {
    var tmp1_safe_receiver = content == null ? null : content.z1o_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2 = ColorTokenPath_ContentDefault_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value = new Color(tmp1_safe_receiver);
      map.x1(tmp2, value);
    }
    var tmp3_safe_receiver = content == null ? null : content.a1p_1;
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_0 = ColorTokenPath_ContentMuted_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_0 = new Color(tmp3_safe_receiver);
      map.x1(tmp2_0, value_0);
    }
    var tmp5_safe_receiver = content == null ? null : content.b1p_1;
    if (tmp5_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_1 = ColorTokenPath_ContentInverse_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_1 = new Color(tmp5_safe_receiver);
      map.x1(tmp2_1, value_1);
    }
    var tmp7_safe_receiver = icon == null ? null : icon.c1p_1;
    if (tmp7_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_2 = ColorTokenPath_IconDefault_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_2 = new Color(tmp7_safe_receiver);
      map.x1(tmp2_2, value_2);
    }
    var tmp9_safe_receiver = icon == null ? null : icon.d1p_1;
    if (tmp9_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_3 = ColorTokenPath_IconMuted_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_3 = new Color(tmp9_safe_receiver);
      map.x1(tmp2_3, value_3);
    }
    var tmp11_safe_receiver = icon == null ? null : icon.e1p_1;
    if (tmp11_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_4 = ColorTokenPath_IconInverse_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_4 = new Color(tmp11_safe_receiver);
      map.x1(tmp2_4, value_4);
    }
  }
  function flattenBorderAndSelection(border, selection, map) {
    var tmp1_safe_receiver = border == null ? null : border.f1p_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2 = ColorTokenPath_BorderDefault_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value = new Color(tmp1_safe_receiver);
      map.x1(tmp2, value);
    }
    var tmp3_safe_receiver = border == null ? null : border.g1p_1;
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_0 = ColorTokenPath_BorderMuted_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_0 = new Color(tmp3_safe_receiver);
      map.x1(tmp2_0, value_0);
    }
    var tmp5_safe_receiver = border == null ? null : border.h1p_1;
    if (tmp5_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_1 = ColorTokenPath_BorderStrong_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_1 = new Color(tmp5_safe_receiver);
      map.x1(tmp2_1, value_1);
    }
    var tmp7_safe_receiver = border == null ? null : border.i1p_1;
    if (tmp7_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_2 = ColorTokenPath_BorderInverse_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_2 = new Color(tmp7_safe_receiver);
      map.x1(tmp2_2, value_2);
    }
    var tmp9_safe_receiver = selection == null ? null : selection.j1p_1;
    if (tmp9_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_3 = ColorTokenPath_SelectionSurface_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_3 = new Color(tmp9_safe_receiver);
      map.x1(tmp2_3, value_3);
    }
    var tmp11_safe_receiver = selection == null ? null : selection.k1p_1;
    if (tmp11_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_4 = ColorTokenPath_SelectionContent_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_4 = new Color(tmp11_safe_receiver);
      map.x1(tmp2_4, value_4);
    }
    var tmp13_safe_receiver = selection == null ? null : selection.l1p_1;
    if (tmp13_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_5 = ColorTokenPath_SelectionBorder_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_5 = new Color(tmp13_safe_receiver);
      map.x1(tmp2_5, value_5);
    }
  }
  function flattenStatusAndBrandColor(color, map) {
    var tmp0_safe_receiver = color.k1n_1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m1p_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2 = ColorTokenPath_FocusRing_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value = new Color(tmp1_safe_receiver);
      map.x1(tmp2, value);
    }
    var tmp2_safe_receiver = color.l1n_1;
    var tmp3_safe_receiver = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.n1p_1;
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_0 = ColorTokenPath_PositiveSurface_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_0 = new Color(tmp3_safe_receiver);
      map.x1(tmp2_0, value_0);
    }
    var tmp4_safe_receiver = color.m1n_1;
    var tmp5_safe_receiver = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.n1p_1;
    if (tmp5_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_1 = ColorTokenPath_NegativeSurface_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_1 = new Color(tmp5_safe_receiver);
      map.x1(tmp2_1, value_1);
    }
    var tmp6_safe_receiver = color.n1n_1;
    var tmp7_safe_receiver = tmp6_safe_receiver == null ? null : tmp6_safe_receiver.n1p_1;
    if (tmp7_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_2 = ColorTokenPath_CautionSurface_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_2 = new Color(tmp7_safe_receiver);
      map.x1(tmp2_2, value_2);
    }
    var tmp8_safe_receiver = color.o1n_1;
    var tmp9_safe_receiver = tmp8_safe_receiver == null ? null : tmp8_safe_receiver.n1p_1;
    if (tmp9_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_3 = ColorTokenPath_InfoSurface_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_3 = new Color(tmp9_safe_receiver);
      map.x1(tmp2_3, value_3);
    }
    var tmp10_safe_receiver = color.q1n_1;
    var tmp11_safe_receiver = tmp10_safe_receiver == null ? null : tmp10_safe_receiver.r1p_1;
    if (tmp11_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_4 = ColorTokenPath_BrandPrimary_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_4 = new Color(tmp11_safe_receiver);
      map.x1(tmp2_4, value_4);
    }
    var tmp12_safe_receiver = color.q1n_1;
    var tmp13_safe_receiver = tmp12_safe_receiver == null ? null : tmp12_safe_receiver.s1p_1;
    if (tmp13_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_5 = ColorTokenPath_BrandSecondary_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_5 = new Color(tmp13_safe_receiver);
      map.x1(tmp2_5, value_5);
    }
    var tmp14_safe_receiver = color.q1n_1;
    var tmp15_safe_receiver = tmp14_safe_receiver == null ? null : tmp14_safe_receiver.t1p_1;
    if (tmp15_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_6 = ColorTokenPath_BrandTertiary_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_6 = new Color(tmp15_safe_receiver);
      map.x1(tmp2_6, value_6);
    }
    var tmp16_safe_receiver = color.q1n_1;
    var tmp17_safe_receiver = tmp16_safe_receiver == null ? null : tmp16_safe_receiver.u1p_1;
    if (tmp17_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp2_7 = ColorTokenPath_BrandQuaternary_getInstance().v18_1;
      // Inline function 'kotlin.collections.set' call
      var value_7 = new Color(tmp17_safe_receiver);
      map.x1(tmp2_7, value_7);
    }
  }
  function _get_$cachedSerializer__te6jhj_15($this) {
    return $this.v1p_1.q1();
  }
  function Treatment$Companion$_anonymous__p2ztex() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.intent.controls.overrides.Treatment', values_16());
  }
  var static_init_called_17;
  function static_init_17() {
    if (static_init_called_17)
      return Unit_instance;
    static_init_called_17 = true;
    Treatment_Fill_instance = new Treatment('Fill', 0);
    Treatment_Outline_instance = new Treatment('Outline', 1);
    Treatment_Soft_instance = new Treatment('Soft', 2);
    Treatment_Ghost_instance = new Treatment('Ghost', 3);
    Treatment_Inverse_instance = new Treatment('Inverse', 4);
    if (Companion_instance_65 == null) {
      Companion_instance;
      new Companion_64();
    }
  }
  var Treatment_Fill_instance;
  var Treatment_Outline_instance;
  var Treatment_Soft_instance;
  var Treatment_Ghost_instance;
  var Treatment_Inverse_instance;
  function values_16() {
    static_init_17();
    return [Treatment_Fill_getInstance(), Treatment_Outline_getInstance(), Treatment_Soft_getInstance(), Treatment_Ghost_getInstance(), Treatment_Inverse_getInstance()];
  }
  function Companion_64() {
    Companion_instance_65 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.v1p_1 = lazy(tmp_0, Treatment$Companion$_anonymous__p2ztex);
  }
  protoOf(Companion_64).s18 = function () {
    return _get_$cachedSerializer__te6jhj_15(this);
  };
  var Companion_instance_65;
  function Companion_getInstance_63() {
    static_init_17();
    return Companion_instance_65;
  }
  function Treatment(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Treatment_Fill_getInstance() {
    static_init_17();
    return Treatment_Fill_instance;
  }
  function Treatment_Outline_getInstance() {
    static_init_17();
    return Treatment_Outline_instance;
  }
  function Treatment_Soft_getInstance() {
    static_init_17();
    return Treatment_Soft_instance;
  }
  function Treatment_Ghost_getInstance() {
    static_init_17();
    return Treatment_Ghost_instance;
  }
  function Treatment_Inverse_getInstance() {
    static_init_17();
    return Treatment_Inverse_instance;
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk() {
    return Companion_getInstance_60().s18();
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_0() {
    return Companion_getInstance_63().s18();
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_1() {
    return Companion_getInstance().s18();
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_2() {
    return Companion_getInstance().s18();
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_3() {
    return Companion_getInstance().s18();
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_4() {
    return Companion_getInstance_3().s18();
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_5() {
    return Companion_getInstance_5().s18();
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_6() {
    return Companion_getInstance_4().s18();
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_7() {
    return Companion_getInstance_4().s18();
  }
  function UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_8() {
    return Companion_getInstance_0().s18();
  }
  function Companion_65() {
    Companion_instance_66 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_3 = lazy(tmp_2, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_0);
    var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_5 = lazy(tmp_4, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_1);
    var tmp_6 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_7 = lazy(tmp_6, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_2);
    var tmp_8 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_9 = lazy(tmp_8, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_3);
    var tmp_10 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_11 = lazy(tmp_10, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_4);
    var tmp_12 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_13 = lazy(tmp_12, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_5);
    var tmp_14 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_15 = lazy(tmp_14, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_6);
    var tmp_16 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_17 = lazy(tmp_16, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_7);
    var tmp_18 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.w1p_1 = [tmp_1, tmp_3, tmp_5, tmp_7, tmp_9, tmp_11, tmp_13, tmp_15, tmp_17, lazy(tmp_18, UniversalStylePatch$Companion$$childSerializers$_anonymous__f9n0pk_8)];
  }
  var Companion_instance_66;
  function Companion_getInstance_64() {
    if (Companion_instance_66 == null)
      new Companion_65();
    return Companion_instance_66;
  }
  function $serializer_46() {
    $serializer_instance_42 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.intent.controls.overrides.UniversalStylePatch', this, 10);
    tmp0_serialDesc.lp('prominence', true);
    tmp0_serialDesc.lp('treatment', true);
    tmp0_serialDesc.lp('surface', true);
    tmp0_serialDesc.lp('content', true);
    tmp0_serialDesc.lp('border', true);
    tmp0_serialDesc.lp('radius', true);
    tmp0_serialDesc.lp('typography', true);
    tmp0_serialDesc.lp('padding', true);
    tmp0_serialDesc.lp('gap', true);
    tmp0_serialDesc.lp('depth', true);
    this.x1p_1 = tmp0_serialDesc;
  }
  protoOf($serializer_46).y1p = function (encoder, value) {
    var tmp0_desc = this.x1p_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_64().w1p_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.z1p_1 == null)) {
      tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.z1p_1);
    }
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.a1q_1 == null)) {
      tmp1_output.qk(tmp0_desc, 1, tmp2_cached[1].q1(), value.a1q_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !(value.b1q_1 == null)) {
      tmp1_output.qk(tmp0_desc, 2, tmp2_cached[2].q1(), value.b1q_1);
    }
    if (tmp1_output.uk(tmp0_desc, 3) ? true : !(value.c1q_1 == null)) {
      tmp1_output.qk(tmp0_desc, 3, tmp2_cached[3].q1(), value.c1q_1);
    }
    if (tmp1_output.uk(tmp0_desc, 4) ? true : !(value.d1q_1 == null)) {
      tmp1_output.qk(tmp0_desc, 4, tmp2_cached[4].q1(), value.d1q_1);
    }
    if (tmp1_output.uk(tmp0_desc, 5) ? true : !(value.e1q_1 == null)) {
      tmp1_output.qk(tmp0_desc, 5, tmp2_cached[5].q1(), value.e1q_1);
    }
    if (tmp1_output.uk(tmp0_desc, 6) ? true : !(value.f1q_1 == null)) {
      tmp1_output.qk(tmp0_desc, 6, tmp2_cached[6].q1(), value.f1q_1);
    }
    if (tmp1_output.uk(tmp0_desc, 7) ? true : !(value.g1q_1 == null)) {
      tmp1_output.qk(tmp0_desc, 7, tmp2_cached[7].q1(), value.g1q_1);
    }
    if (tmp1_output.uk(tmp0_desc, 8) ? true : !(value.h1q_1 == null)) {
      tmp1_output.qk(tmp0_desc, 8, tmp2_cached[8].q1(), value.h1q_1);
    }
    if (tmp1_output.uk(tmp0_desc, 9) ? true : !(value.i1q_1 == null)) {
      tmp1_output.qk(tmp0_desc, 9, tmp2_cached[9].q1(), value.i1q_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_46).yf = function (encoder, value) {
    return this.y1p(encoder, value instanceof UniversalStylePatch ? value : THROW_CCE());
  };
  protoOf($serializer_46).zf = function (decoder) {
    var tmp0_desc = this.x1p_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = null;
    var tmp9_local5 = null;
    var tmp10_local6 = null;
    var tmp11_local7 = null;
    var tmp12_local8 = null;
    var tmp13_local9 = null;
    var tmp14_input = decoder.xi(tmp0_desc);
    var tmp15_cached = Companion_getInstance_64().w1p_1;
    if (tmp14_input.nj()) {
      tmp4_local0 = tmp14_input.lj(tmp0_desc, 0, tmp15_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp14_input.lj(tmp0_desc, 1, tmp15_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp14_input.lj(tmp0_desc, 2, tmp15_cached[2].q1(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp14_input.lj(tmp0_desc, 3, tmp15_cached[3].q1(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp14_input.lj(tmp0_desc, 4, tmp15_cached[4].q1(), tmp8_local4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp14_input.lj(tmp0_desc, 5, tmp15_cached[5].q1(), tmp9_local5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
      tmp10_local6 = tmp14_input.lj(tmp0_desc, 6, tmp15_cached[6].q1(), tmp10_local6);
      tmp3_bitMask0 = tmp3_bitMask0 | 64;
      tmp11_local7 = tmp14_input.lj(tmp0_desc, 7, tmp15_cached[7].q1(), tmp11_local7);
      tmp3_bitMask0 = tmp3_bitMask0 | 128;
      tmp12_local8 = tmp14_input.lj(tmp0_desc, 8, tmp15_cached[8].q1(), tmp12_local8);
      tmp3_bitMask0 = tmp3_bitMask0 | 256;
      tmp13_local9 = tmp14_input.lj(tmp0_desc, 9, tmp15_cached[9].q1(), tmp13_local9);
      tmp3_bitMask0 = tmp3_bitMask0 | 512;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp14_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp14_input.lj(tmp0_desc, 0, tmp15_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp14_input.lj(tmp0_desc, 1, tmp15_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp14_input.lj(tmp0_desc, 2, tmp15_cached[2].q1(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp14_input.lj(tmp0_desc, 3, tmp15_cached[3].q1(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp14_input.lj(tmp0_desc, 4, tmp15_cached[4].q1(), tmp8_local4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp14_input.lj(tmp0_desc, 5, tmp15_cached[5].q1(), tmp9_local5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          case 6:
            tmp10_local6 = tmp14_input.lj(tmp0_desc, 6, tmp15_cached[6].q1(), tmp10_local6);
            tmp3_bitMask0 = tmp3_bitMask0 | 64;
            break;
          case 7:
            tmp11_local7 = tmp14_input.lj(tmp0_desc, 7, tmp15_cached[7].q1(), tmp11_local7);
            tmp3_bitMask0 = tmp3_bitMask0 | 128;
            break;
          case 8:
            tmp12_local8 = tmp14_input.lj(tmp0_desc, 8, tmp15_cached[8].q1(), tmp12_local8);
            tmp3_bitMask0 = tmp3_bitMask0 | 256;
            break;
          case 9:
            tmp13_local9 = tmp14_input.lj(tmp0_desc, 9, tmp15_cached[9].q1(), tmp13_local9);
            tmp3_bitMask0 = tmp3_bitMask0 | 512;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp14_input.yi(tmp0_desc);
    return UniversalStylePatch_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, tmp13_local9, null);
  };
  protoOf($serializer_46).xf = function () {
    return this.x1p_1;
  };
  protoOf($serializer_46).aq = function () {
    var tmp0_cached = Companion_getInstance_64().w1p_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1()), get_nullable(tmp0_cached[1].q1()), get_nullable(tmp0_cached[2].q1()), get_nullable(tmp0_cached[3].q1()), get_nullable(tmp0_cached[4].q1()), get_nullable(tmp0_cached[5].q1()), get_nullable(tmp0_cached[6].q1()), get_nullable(tmp0_cached[7].q1()), get_nullable(tmp0_cached[8].q1()), get_nullable(tmp0_cached[9].q1())];
  };
  var $serializer_instance_42;
  function $serializer_getInstance_42() {
    if ($serializer_instance_42 == null)
      new $serializer_46();
    return $serializer_instance_42;
  }
  function UniversalStylePatch_init_$Init$(seen0, prominence, treatment, surface, content, border, radius, typography, padding, gap, depth, serializationConstructorMarker, $this) {
    if (!(0 === (0 & seen0))) {
      throwMissingFieldException(seen0, 0, $serializer_getInstance_42().x1p_1);
    }
    if (0 === (seen0 & 1))
      $this.z1p_1 = null;
    else
      $this.z1p_1 = prominence;
    if (0 === (seen0 & 2))
      $this.a1q_1 = null;
    else
      $this.a1q_1 = treatment;
    if (0 === (seen0 & 4))
      $this.b1q_1 = null;
    else
      $this.b1q_1 = surface;
    if (0 === (seen0 & 8))
      $this.c1q_1 = null;
    else
      $this.c1q_1 = content;
    if (0 === (seen0 & 16))
      $this.d1q_1 = null;
    else
      $this.d1q_1 = border;
    if (0 === (seen0 & 32))
      $this.e1q_1 = null;
    else
      $this.e1q_1 = radius;
    if (0 === (seen0 & 64))
      $this.f1q_1 = null;
    else
      $this.f1q_1 = typography;
    if (0 === (seen0 & 128))
      $this.g1q_1 = null;
    else
      $this.g1q_1 = padding;
    if (0 === (seen0 & 256))
      $this.h1q_1 = null;
    else
      $this.h1q_1 = gap;
    if (0 === (seen0 & 512))
      $this.i1q_1 = null;
    else
      $this.i1q_1 = depth;
    return $this;
  }
  function UniversalStylePatch_init_$Create$(seen0, prominence, treatment, surface, content, border, radius, typography, padding, gap, depth, serializationConstructorMarker) {
    return UniversalStylePatch_init_$Init$(seen0, prominence, treatment, surface, content, border, radius, typography, padding, gap, depth, serializationConstructorMarker, objectCreate(protoOf(UniversalStylePatch)));
  }
  function UniversalStylePatch(prominence, treatment, surface, content, border, radius, typography, padding, gap, depth) {
    Companion_getInstance_64();
    prominence = prominence === VOID ? null : prominence;
    treatment = treatment === VOID ? null : treatment;
    surface = surface === VOID ? null : surface;
    content = content === VOID ? null : content;
    border = border === VOID ? null : border;
    radius = radius === VOID ? null : radius;
    typography = typography === VOID ? null : typography;
    padding = padding === VOID ? null : padding;
    gap = gap === VOID ? null : gap;
    depth = depth === VOID ? null : depth;
    this.z1p_1 = prominence;
    this.a1q_1 = treatment;
    this.b1q_1 = surface;
    this.c1q_1 = content;
    this.d1q_1 = border;
    this.e1q_1 = radius;
    this.f1q_1 = typography;
    this.g1q_1 = padding;
    this.h1q_1 = gap;
    this.i1q_1 = depth;
  }
  protoOf(UniversalStylePatch).toString = function () {
    return 'UniversalStylePatch(prominence=' + toString_0(this.z1p_1) + ', treatment=' + toString_0(this.a1q_1) + ', surface=' + toString_0(this.b1q_1) + ', content=' + toString_0(this.c1q_1) + ', border=' + toString_0(this.d1q_1) + ', radius=' + toString_0(this.e1q_1) + ', typography=' + toString_0(this.f1q_1) + ', padding=' + toString_0(this.g1q_1) + ', gap=' + toString_0(this.h1q_1) + ', depth=' + toString_0(this.i1q_1) + ')';
  };
  protoOf(UniversalStylePatch).hashCode = function () {
    var result = this.z1p_1 == null ? 0 : this.z1p_1.hashCode();
    result = imul(result, 31) + (this.a1q_1 == null ? 0 : this.a1q_1.hashCode()) | 0;
    result = imul(result, 31) + (this.b1q_1 == null ? 0 : this.b1q_1.hashCode()) | 0;
    result = imul(result, 31) + (this.c1q_1 == null ? 0 : this.c1q_1.hashCode()) | 0;
    result = imul(result, 31) + (this.d1q_1 == null ? 0 : this.d1q_1.hashCode()) | 0;
    result = imul(result, 31) + (this.e1q_1 == null ? 0 : this.e1q_1.hashCode()) | 0;
    result = imul(result, 31) + (this.f1q_1 == null ? 0 : this.f1q_1.hashCode()) | 0;
    result = imul(result, 31) + (this.g1q_1 == null ? 0 : this.g1q_1.hashCode()) | 0;
    result = imul(result, 31) + (this.h1q_1 == null ? 0 : this.h1q_1.hashCode()) | 0;
    result = imul(result, 31) + (this.i1q_1 == null ? 0 : this.i1q_1.hashCode()) | 0;
    return result;
  };
  protoOf(UniversalStylePatch).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof UniversalStylePatch))
      return false;
    if (!equals(this.z1p_1, other.z1p_1))
      return false;
    if (!equals(this.a1q_1, other.a1q_1))
      return false;
    if (!equals(this.b1q_1, other.b1q_1))
      return false;
    if (!equals(this.c1q_1, other.c1q_1))
      return false;
    if (!equals(this.d1q_1, other.d1q_1))
      return false;
    if (!equals(this.e1q_1, other.e1q_1))
      return false;
    if (!equals(this.f1q_1, other.f1q_1))
      return false;
    if (!equals(this.g1q_1, other.g1q_1))
      return false;
    if (!equals(this.h1q_1, other.h1q_1))
      return false;
    if (!equals(this.i1q_1, other.i1q_1))
      return false;
    return true;
  };
  function _get_$cachedSerializer__te6jhj_16($this) {
    return $this.q1k_1.q1();
  }
  function VariantId$Companion$_anonymous__x3uo27() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.intent.controls.overrides.VariantId', values_17());
  }
  var static_init_called_18;
  function static_init_18() {
    if (static_init_called_18)
      return Unit_instance;
    static_init_called_18 = true;
    VariantId_Primary_instance = new VariantId('Primary', 0);
    VariantId_Secondary_instance = new VariantId('Secondary', 1);
    VariantId_Tertiary_instance = new VariantId('Tertiary', 2);
    VariantId_Filled_instance = new VariantId('Filled', 3);
    VariantId_Outlined_instance = new VariantId('Outlined', 4);
    VariantId_Soft_instance = new VariantId('Soft', 5);
    VariantId_Ghost_instance = new VariantId('Ghost', 6);
    VariantId_Elevated_instance = new VariantId('Elevated', 7);
    VariantId_Tonal_instance = new VariantId('Tonal', 8);
    if (Companion_instance_67 == null) {
      Companion_instance;
      new Companion_66();
    }
  }
  var VariantId_Primary_instance;
  var VariantId_Secondary_instance;
  var VariantId_Tertiary_instance;
  var VariantId_Filled_instance;
  var VariantId_Outlined_instance;
  var VariantId_Soft_instance;
  var VariantId_Ghost_instance;
  var VariantId_Elevated_instance;
  var VariantId_Tonal_instance;
  function values_17() {
    static_init_18();
    return [VariantId_Primary_getInstance(), VariantId_Secondary_getInstance(), VariantId_Tertiary_getInstance(), VariantId_Filled_getInstance(), VariantId_Outlined_getInstance(), VariantId_Soft_getInstance(), VariantId_Ghost_getInstance(), VariantId_Elevated_getInstance(), VariantId_Tonal_getInstance()];
  }
  function valueOf_1(value) {
    static_init_18();
    switch (value) {
      case 'Primary':
        return VariantId_Primary_getInstance();
      case 'Secondary':
        return VariantId_Secondary_getInstance();
      case 'Tertiary':
        return VariantId_Tertiary_getInstance();
      case 'Filled':
        return VariantId_Filled_getInstance();
      case 'Outlined':
        return VariantId_Outlined_getInstance();
      case 'Soft':
        return VariantId_Soft_getInstance();
      case 'Ghost':
        return VariantId_Ghost_getInstance();
      case 'Elevated':
        return VariantId_Elevated_getInstance();
      case 'Tonal':
        return VariantId_Tonal_getInstance();
      default:
        THROW_IAE('No enum constant io.github.alph_a07.basis.theme.intent.controls.overrides.VariantId.' + value);
        break;
    }
  }
  function Companion_66() {
    Companion_instance_67 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.q1k_1 = lazy(tmp_0, VariantId$Companion$_anonymous__x3uo27);
  }
  protoOf(Companion_66).s18 = function () {
    return _get_$cachedSerializer__te6jhj_16(this);
  };
  var Companion_instance_67;
  function Companion_getInstance_65() {
    static_init_18();
    return Companion_instance_67;
  }
  function VariantId(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function VariantId_Primary_getInstance() {
    static_init_18();
    return VariantId_Primary_instance;
  }
  function VariantId_Secondary_getInstance() {
    static_init_18();
    return VariantId_Secondary_instance;
  }
  function VariantId_Tertiary_getInstance() {
    static_init_18();
    return VariantId_Tertiary_instance;
  }
  function VariantId_Filled_getInstance() {
    static_init_18();
    return VariantId_Filled_instance;
  }
  function VariantId_Outlined_getInstance() {
    static_init_18();
    return VariantId_Outlined_instance;
  }
  function VariantId_Soft_getInstance() {
    static_init_18();
    return VariantId_Soft_instance;
  }
  function VariantId_Ghost_getInstance() {
    static_init_18();
    return VariantId_Ghost_instance;
  }
  function VariantId_Elevated_getInstance() {
    static_init_18();
    return VariantId_Elevated_instance;
  }
  function VariantId_Tonal_getInstance() {
    static_init_18();
    return VariantId_Tonal_instance;
  }
  function Companion_67() {
  }
  var Companion_instance_68;
  function Companion_getInstance_66() {
    return Companion_instance_68;
  }
  function VariantStateKey(variant, state) {
    this.j1q_1 = variant;
    this.k1q_1 = state;
  }
  protoOf(VariantStateKey).toString = function () {
    return 'VariantStateKey(variant=' + this.j1q_1.toString() + ', state=' + this.k1q_1.toString() + ')';
  };
  protoOf(VariantStateKey).hashCode = function () {
    var result = this.j1q_1.hashCode();
    result = imul(result, 31) + this.k1q_1.hashCode() | 0;
    return result;
  };
  protoOf(VariantStateKey).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof VariantStateKey))
      return false;
    if (!this.j1q_1.equals(other.j1q_1))
      return false;
    if (!this.k1q_1.equals(other.k1q_1))
      return false;
    return true;
  };
  function VariantStateKeySerializer() {
    VariantStateKeySerializer_instance = this;
    this.l1q_1 = PrimitiveSerialDescriptor('VariantStateKey', STRING_getInstance());
  }
  protoOf(VariantStateKeySerializer).xf = function () {
    return this.l1q_1;
  };
  protoOf(VariantStateKeySerializer).m1q = function (encoder, value) {
    encoder.bk(value.j1q_1.y1_1 + '.' + value.k1q_1.y1_1);
  };
  protoOf(VariantStateKeySerializer).yf = function (encoder, value) {
    return this.m1q(encoder, value instanceof VariantStateKey ? value : THROW_CCE());
  };
  protoOf(VariantStateKeySerializer).zf = function (decoder) {
    var raw = decoder.si();
    var parts = split(raw, charArrayOf([_Char___init__impl__6a9atx(46)]), VOID, 2);
    // Inline function 'kotlin.require' call
    if (!(parts.m() === 2)) {
      var message = "Expected format 'Variant.State', was '" + raw + "'.";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return new VariantStateKey(valueOf_1(parts.n(0)), valueOf_0(parts.n(1)));
  };
  var VariantStateKeySerializer_instance;
  function VariantStateKeySerializer_getInstance() {
    if (VariantStateKeySerializer_instance == null)
      new VariantStateKeySerializer();
    return VariantStateKeySerializer_instance;
  }
  function ThemeInterchange$json$lambda($this$Json) {
    $this$Json.sy_1 = true;
    $this$Json.ty_1 = true;
    $this$Json.fz_1 = true;
    $this$Json.qy_1 = false;
    $this$Json.ez_1 = true;
    return Unit_instance;
  }
  function ThemeInterchange() {
    ThemeInterchange_instance = this;
    var tmp = this;
    tmp.n1q_1 = Json(VOID, ThemeInterchange$json$lambda);
  }
  protoOf(ThemeInterchange).o1q = function (jsonString) {
    return this.n1q_1.ay(Companion_instance_23.s18(), jsonString);
  };
  var ThemeInterchange_instance;
  function ThemeInterchange_getInstance() {
    if (ThemeInterchange_instance == null)
      new ThemeInterchange();
    return ThemeInterchange_instance;
  }
  function ResolutionContext(intent, normalized, modes, baseTables, lockedPaths) {
    this.p1q_1 = intent;
    this.q1q_1 = normalized;
    this.r1q_1 = modes;
    this.s1q_1 = baseTables;
    this.t1q_1 = lockedPaths;
    this.u1q_1 = Companion_getInstance_67().b1r_1;
    this.v1q_1 = null;
    this.w1q_1 = null;
    this.x1q_1 = null;
    this.y1q_1 = emptyMap();
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.z1q_1 = LinkedHashMap_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_0.a1r_1 = ArrayList_init_$Create$_0();
    var tmp0 = this.a1r_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var elements = this.q1q_1.k1r_1;
    addAll(tmp0, elements);
  }
  protoOf(ResolutionContext).l1r = function (entry) {
    // Inline function 'kotlin.collections.plusAssign' call
    this.a1r_1.f(entry);
  };
  protoOf(ResolutionContext).m1r = function (newEntries) {
    // Inline function 'kotlin.collections.plusAssign' call
    var this_0 = this.a1r_1;
    addAll(this_0, newEntries);
  };
  protoOf(ResolutionContext).n1r = function () {
    var tmp0 = this.w1q_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.checkNotNull' call
      if (tmp0 == null) {
        var message = 'Fonts have not been planned.';
        throw IllegalStateException_init_$Create$(toString(message));
      } else {
        tmp$ret$0 = tmp0;
        break $l$block;
      }
    }
    var resolved = tmp$ret$0;
    return new FontAssignmentReport(resolved.o1r_1, resolved.p1r_1, resolved.q1r_1, resolved.s1r_1);
  };
  function resolve(intent) {
    var context = NormalizeStage_instance.u1r(intent);
    DomainStage_instance.v1r(context);
    MoodStage_instance.v1r(context);
    IdentityStage_instance.v1r(context);
    FontStage_instance.w1r(context);
    var _iterator__ex2g4s = context.r1q_1.j();
    while (_iterator__ex2g4s.k()) {
      var mode = _iterator__ex2g4s.l();
      BaseStage_instance.x1r(context, mode);
      DeriveStage_instance.x1r(context, mode);
      FontStage_instance.x1r(context, mode);
      ControlStage_instance.x1r(context, mode);
      EnforceStage_instance.x1r(context, mode);
    }
    var tmp0_safe_receiver = context.z1q_1.t1(ThemeMode_Light_getInstance());
    var light = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.i1s();
    var tmp1_safe_receiver = context.z1q_1.t1(ThemeMode_Dark_getInstance());
    var dark = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.i1s();
    return new ResolvedThemePair(light, dark, new ResolutionReport(context.a1r_1, context.s1q_1.j1s_1, toSet(context.r1q_1), context.n1r()));
  }
  function ThemeDraft(mode, color, typography, spacing, radius, depth, size, motion, neutralHue, brandTints) {
    neutralHue = neutralHue === VOID ? 0.0 : neutralHue;
    brandTints = brandTints === VOID ? null : brandTints;
    this.y1r_1 = mode;
    this.z1r_1 = color;
    this.a1s_1 = typography;
    this.b1s_1 = spacing;
    this.c1s_1 = radius;
    this.d1s_1 = depth;
    this.e1s_1 = size;
    this.f1s_1 = motion;
    this.g1s_1 = neutralHue;
    this.h1s_1 = brandTints;
  }
  protoOf(ThemeDraft).i1s = function () {
    return new ResolvedTheme(this.y1r_1, this.z1r_1, this.a1s_1, this.b1s_1, this.c1s_1, this.d1s_1, this.e1s_1, this.f1s_1);
  };
  protoOf(ThemeDraft).x1s = function (mode, color, typography, spacing, radius, depth, size, motion, neutralHue, brandTints) {
    return new ThemeDraft(mode, color, typography, spacing, radius, depth, size, motion, neutralHue, brandTints);
  };
  protoOf(ThemeDraft).y1s = function (mode, color, typography, spacing, radius, depth, size, motion, neutralHue, brandTints, $super) {
    mode = mode === VOID ? this.y1r_1 : mode;
    color = color === VOID ? this.z1r_1 : color;
    typography = typography === VOID ? this.a1s_1 : typography;
    spacing = spacing === VOID ? this.b1s_1 : spacing;
    radius = radius === VOID ? this.c1s_1 : radius;
    depth = depth === VOID ? this.d1s_1 : depth;
    size = size === VOID ? this.e1s_1 : size;
    motion = motion === VOID ? this.f1s_1 : motion;
    neutralHue = neutralHue === VOID ? this.g1s_1 : neutralHue;
    brandTints = brandTints === VOID ? this.h1s_1 : brandTints;
    return $super === VOID ? this.x1s(mode, color, typography, spacing, radius, depth, size, motion, neutralHue, brandTints) : $super.x1s.call(this, mode, color, typography, spacing, radius, depth, size, motion, neutralHue, brandTints);
  };
  protoOf(ThemeDraft).toString = function () {
    return 'ThemeDraft(mode=' + this.y1r_1.toString() + ', color=' + this.z1r_1.toString() + ', typography=' + this.a1s_1.toString() + ', spacing=' + this.b1s_1.toString() + ', radius=' + this.c1s_1.toString() + ', depth=' + this.d1s_1.toString() + ', size=' + this.e1s_1.toString() + ', motion=' + this.f1s_1.toString() + ', neutralHue=' + this.g1s_1 + ', brandTints=' + toString_0(this.h1s_1) + ')';
  };
  protoOf(ThemeDraft).hashCode = function () {
    var result = this.y1r_1.hashCode();
    result = imul(result, 31) + this.z1r_1.hashCode() | 0;
    result = imul(result, 31) + this.a1s_1.hashCode() | 0;
    result = imul(result, 31) + this.b1s_1.hashCode() | 0;
    result = imul(result, 31) + this.c1s_1.hashCode() | 0;
    result = imul(result, 31) + this.d1s_1.hashCode() | 0;
    result = imul(result, 31) + this.e1s_1.hashCode() | 0;
    result = imul(result, 31) + this.f1s_1.hashCode() | 0;
    result = imul(result, 31) + getNumberHashCode(this.g1s_1) | 0;
    result = imul(result, 31) + (this.h1s_1 == null ? 0 : this.h1s_1.hashCode()) | 0;
    return result;
  };
  protoOf(ThemeDraft).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ThemeDraft))
      return false;
    if (!this.y1r_1.equals(other.y1r_1))
      return false;
    if (!this.z1r_1.equals(other.z1r_1))
      return false;
    if (!this.a1s_1.equals(other.a1s_1))
      return false;
    if (!this.b1s_1.equals(other.b1s_1))
      return false;
    if (!this.c1s_1.equals(other.c1s_1))
      return false;
    if (!this.d1s_1.equals(other.d1s_1))
      return false;
    if (!this.e1s_1.equals(other.e1s_1))
      return false;
    if (!this.f1s_1.equals(other.f1s_1))
      return false;
    if (!equals(this.g1s_1, other.g1s_1))
      return false;
    if (!equals(this.h1s_1, other.h1s_1))
      return false;
    return true;
  };
  function Companion_68() {
    Companion_instance_69 = this;
    this.b1r_1 = new ThemeProfile();
  }
  var Companion_instance_69;
  function Companion_getInstance_67() {
    if (Companion_instance_69 == null)
      new Companion_68();
    return Companion_instance_69;
  }
  function ThemeProfile(warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness, ctaEmphasis, depthEmphasis, borderClarity, statusClarity, focusEmphasis, avatarBias, dataDensity, inputHeaviness, transactionality, socialPresence, trustStrictness, riskSensitivity, contentVelocity, mediaRichness) {
    Companion_getInstance_67();
    warmth = warmth === VOID ? 0.0 : warmth;
    chroma = chroma === VOID ? 0.0 : chroma;
    contrast = contrast === VOID ? 0.0 : contrast;
    density = density === VOID ? 0.0 : density;
    roundness = roundness === VOID ? 0.0 : roundness;
    typographyExpressiveness = typographyExpressiveness === VOID ? 0.0 : typographyExpressiveness;
    motionEnergy = motionEnergy === VOID ? 0.0 : motionEnergy;
    playfulness = playfulness === VOID ? 0.0 : playfulness;
    ctaEmphasis = ctaEmphasis === VOID ? 0.0 : ctaEmphasis;
    depthEmphasis = depthEmphasis === VOID ? 0.0 : depthEmphasis;
    borderClarity = borderClarity === VOID ? 0.0 : borderClarity;
    statusClarity = statusClarity === VOID ? 0.0 : statusClarity;
    focusEmphasis = focusEmphasis === VOID ? 0.0 : focusEmphasis;
    avatarBias = avatarBias === VOID ? 0.0 : avatarBias;
    dataDensity = dataDensity === VOID ? 0.0 : dataDensity;
    inputHeaviness = inputHeaviness === VOID ? 0.0 : inputHeaviness;
    transactionality = transactionality === VOID ? 0.0 : transactionality;
    socialPresence = socialPresence === VOID ? 0.0 : socialPresence;
    trustStrictness = trustStrictness === VOID ? 0.0 : trustStrictness;
    riskSensitivity = riskSensitivity === VOID ? 0.0 : riskSensitivity;
    contentVelocity = contentVelocity === VOID ? 0.0 : contentVelocity;
    mediaRichness = mediaRichness === VOID ? 0.0 : mediaRichness;
    this.z1s_1 = warmth;
    this.a1t_1 = chroma;
    this.b1t_1 = contrast;
    this.c1t_1 = density;
    this.d1t_1 = roundness;
    this.e1t_1 = typographyExpressiveness;
    this.f1t_1 = motionEnergy;
    this.g1t_1 = playfulness;
    this.h1t_1 = ctaEmphasis;
    this.i1t_1 = depthEmphasis;
    this.j1t_1 = borderClarity;
    this.k1t_1 = statusClarity;
    this.l1t_1 = focusEmphasis;
    this.m1t_1 = avatarBias;
    this.n1t_1 = dataDensity;
    this.o1t_1 = inputHeaviness;
    this.p1t_1 = transactionality;
    this.q1t_1 = socialPresence;
    this.r1t_1 = trustStrictness;
    this.s1t_1 = riskSensitivity;
    this.t1t_1 = contentVelocity;
    this.u1t_1 = mediaRichness;
  }
  protoOf(ThemeProfile).v1t = function (warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness, ctaEmphasis, depthEmphasis, borderClarity, statusClarity, focusEmphasis, avatarBias, dataDensity, inputHeaviness, transactionality, socialPresence, trustStrictness, riskSensitivity, contentVelocity, mediaRichness) {
    return new ThemeProfile(warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness, ctaEmphasis, depthEmphasis, borderClarity, statusClarity, focusEmphasis, avatarBias, dataDensity, inputHeaviness, transactionality, socialPresence, trustStrictness, riskSensitivity, contentVelocity, mediaRichness);
  };
  protoOf(ThemeProfile).w1t = function (warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness, ctaEmphasis, depthEmphasis, borderClarity, statusClarity, focusEmphasis, avatarBias, dataDensity, inputHeaviness, transactionality, socialPresence, trustStrictness, riskSensitivity, contentVelocity, mediaRichness, $super) {
    warmth = warmth === VOID ? this.z1s_1 : warmth;
    chroma = chroma === VOID ? this.a1t_1 : chroma;
    contrast = contrast === VOID ? this.b1t_1 : contrast;
    density = density === VOID ? this.c1t_1 : density;
    roundness = roundness === VOID ? this.d1t_1 : roundness;
    typographyExpressiveness = typographyExpressiveness === VOID ? this.e1t_1 : typographyExpressiveness;
    motionEnergy = motionEnergy === VOID ? this.f1t_1 : motionEnergy;
    playfulness = playfulness === VOID ? this.g1t_1 : playfulness;
    ctaEmphasis = ctaEmphasis === VOID ? this.h1t_1 : ctaEmphasis;
    depthEmphasis = depthEmphasis === VOID ? this.i1t_1 : depthEmphasis;
    borderClarity = borderClarity === VOID ? this.j1t_1 : borderClarity;
    statusClarity = statusClarity === VOID ? this.k1t_1 : statusClarity;
    focusEmphasis = focusEmphasis === VOID ? this.l1t_1 : focusEmphasis;
    avatarBias = avatarBias === VOID ? this.m1t_1 : avatarBias;
    dataDensity = dataDensity === VOID ? this.n1t_1 : dataDensity;
    inputHeaviness = inputHeaviness === VOID ? this.o1t_1 : inputHeaviness;
    transactionality = transactionality === VOID ? this.p1t_1 : transactionality;
    socialPresence = socialPresence === VOID ? this.q1t_1 : socialPresence;
    trustStrictness = trustStrictness === VOID ? this.r1t_1 : trustStrictness;
    riskSensitivity = riskSensitivity === VOID ? this.s1t_1 : riskSensitivity;
    contentVelocity = contentVelocity === VOID ? this.t1t_1 : contentVelocity;
    mediaRichness = mediaRichness === VOID ? this.u1t_1 : mediaRichness;
    return $super === VOID ? this.v1t(warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness, ctaEmphasis, depthEmphasis, borderClarity, statusClarity, focusEmphasis, avatarBias, dataDensity, inputHeaviness, transactionality, socialPresence, trustStrictness, riskSensitivity, contentVelocity, mediaRichness) : $super.v1t.call(this, warmth, chroma, contrast, density, roundness, typographyExpressiveness, motionEnergy, playfulness, ctaEmphasis, depthEmphasis, borderClarity, statusClarity, focusEmphasis, avatarBias, dataDensity, inputHeaviness, transactionality, socialPresence, trustStrictness, riskSensitivity, contentVelocity, mediaRichness);
  };
  protoOf(ThemeProfile).toString = function () {
    return 'ThemeProfile(warmth=' + this.z1s_1 + ', chroma=' + this.a1t_1 + ', contrast=' + this.b1t_1 + ', density=' + this.c1t_1 + ', roundness=' + this.d1t_1 + ', typographyExpressiveness=' + this.e1t_1 + ', motionEnergy=' + this.f1t_1 + ', playfulness=' + this.g1t_1 + ', ctaEmphasis=' + this.h1t_1 + ', depthEmphasis=' + this.i1t_1 + ', borderClarity=' + this.j1t_1 + ', statusClarity=' + this.k1t_1 + ', focusEmphasis=' + this.l1t_1 + ', avatarBias=' + this.m1t_1 + ', dataDensity=' + this.n1t_1 + ', inputHeaviness=' + this.o1t_1 + ', transactionality=' + this.p1t_1 + ', socialPresence=' + this.q1t_1 + ', trustStrictness=' + this.r1t_1 + ', riskSensitivity=' + this.s1t_1 + ', contentVelocity=' + this.t1t_1 + ', mediaRichness=' + this.u1t_1 + ')';
  };
  protoOf(ThemeProfile).hashCode = function () {
    var result = getNumberHashCode(this.z1s_1);
    result = imul(result, 31) + getNumberHashCode(this.a1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.b1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.c1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.d1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.e1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.f1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.g1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.h1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.i1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.j1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.k1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.l1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.m1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.n1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.o1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.p1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.q1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.r1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.s1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.t1t_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.u1t_1) | 0;
    return result;
  };
  protoOf(ThemeProfile).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ThemeProfile))
      return false;
    if (!equals(this.z1s_1, other.z1s_1))
      return false;
    if (!equals(this.a1t_1, other.a1t_1))
      return false;
    if (!equals(this.b1t_1, other.b1t_1))
      return false;
    if (!equals(this.c1t_1, other.c1t_1))
      return false;
    if (!equals(this.d1t_1, other.d1t_1))
      return false;
    if (!equals(this.e1t_1, other.e1t_1))
      return false;
    if (!equals(this.f1t_1, other.f1t_1))
      return false;
    if (!equals(this.g1t_1, other.g1t_1))
      return false;
    if (!equals(this.h1t_1, other.h1t_1))
      return false;
    if (!equals(this.i1t_1, other.i1t_1))
      return false;
    if (!equals(this.j1t_1, other.j1t_1))
      return false;
    if (!equals(this.k1t_1, other.k1t_1))
      return false;
    if (!equals(this.l1t_1, other.l1t_1))
      return false;
    if (!equals(this.m1t_1, other.m1t_1))
      return false;
    if (!equals(this.n1t_1, other.n1t_1))
      return false;
    if (!equals(this.o1t_1, other.o1t_1))
      return false;
    if (!equals(this.p1t_1, other.p1t_1))
      return false;
    if (!equals(this.q1t_1, other.q1t_1))
      return false;
    if (!equals(this.r1t_1, other.r1t_1))
      return false;
    if (!equals(this.s1t_1, other.s1t_1))
      return false;
    if (!equals(this.t1t_1, other.t1t_1))
      return false;
    if (!equals(this.u1t_1, other.u1t_1))
      return false;
    return true;
  };
  function get_typographyExpressiveness01(_this__u8e3s4) {
    return coerceIn((_this__u8e3s4.e1t_1 + 1.0) * 0.5, 0.0, 1.0);
  }
  function get_roundness01(_this__u8e3s4) {
    return coerceIn((_this__u8e3s4.d1t_1 + 1.0) * 0.5, 0.0, 1.0);
  }
  function get_trustStrictness01(_this__u8e3s4) {
    return coerceIn((_this__u8e3s4.r1t_1 + 1.0) * 0.5, 0.0, 1.0);
  }
  function get_dataDensity01(_this__u8e3s4) {
    return coerceIn((_this__u8e3s4.n1t_1 + 1.0) * 0.5, 0.0, 1.0);
  }
  function resolveSynthesizedHue($this, context, deriveColors) {
    var tmp;
    if (deriveColors && context.q1q_1.c1r_1 == null) {
      tmp = synthesizeNeutralHue(context.u1q_1, context.q1q_1.h1r_1.w1g_1, context.u1q_1.z1s_1);
    } else {
      tmp = 255.0;
    }
    return tmp;
  }
  function recordBaseReport($this, context, deriveColors, hue) {
    var tmp0 = context.a1r_1;
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.none' call
      var tmp;
      if (isInterface(tmp0, Collection)) {
        tmp = tmp0.p();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (element.x1t_1 === 'color.derivation') {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    if (tmp$ret$0) {
      var tmp_0 = ResolutionStage_Base_getInstance();
      var tmp_1 = deriveColors ? ReportStatus_Honored_getInstance() : ReportStatus_Absent_getInstance();
      var tmp_2;
      if (deriveColors) {
        tmp_2 = 'Color tokens derived from mood, brand, and domain signals.';
      } else {
        tmp_2 = 'Color derivation disabled; fully achromatic base generated.';
      }
      context.l1r(new ReportEntry('color.derivation', tmp_0, tmp_1, tmp_2, VOID, deriveColors ? formatDeterministic(hue) : null));
    }
  }
  function BaseStage() {
  }
  protoOf(BaseStage).x1r = function (context, mode) {
    var deriveColors = context.q1q_1.j1r_1;
    var synthesizedHue = resolveSynthesizedHue(this, context, deriveColors);
    var tmp;
    if (deriveColors) {
      tmp = synthesizeNeutralChroma(context.u1q_1.a1t_1);
    } else {
      tmp = new SynthesizedChroma(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
    }
    var synthesizedChromas = tmp;
    recordBaseReport(this, context, deriveColors, synthesizedHue);
    var isLight = mode.equals(ThemeMode_Light_getInstance());
    var tables = context.s1q_1;
    var neutralTargets = NeutralTargets_init_$Create$(isLight ? tables.t1s_1 : tables.u1s_1, isLight);
    var tmp0 = context.w1q_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Fonts must be planned before BaseStage.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$0 = tmp0;
        break $l$block;
      }
    }
    var fonts = tmp$ret$0;
    var neutralHue = deriveColors ? synthesizedHue : 255.0;
    var brandTints = context.y1q_1.t1(mode);
    var tmp0_0 = context.z1q_1;
    // Inline function 'kotlin.collections.set' call
    var value = new ThemeDraft(mode, baseColorTokens(neutralTargets, isLight ? tables.v1s_1 : tables.w1s_1, deriveColors, synthesizedHue, synthesizedChromas), baseTypographyTokens(tables.r1s_1, fonts.o1r_1, fonts.p1r_1, fonts.q1r_1), baseSpacingTokens(tables.k1s_1), baseRadiusTokens(tables.l1s_1), baseDepthTokens(tables.m1s_1), baseSizeTokens(tables.n1s_1, tables.o1s_1, tables.p1s_1, tables.q1s_1), tables.s1s_1, neutralHue, brandTints);
    tmp0_0.x1(mode, value);
  };
  var BaseStage_instance;
  function BaseStage_getInstance() {
    return BaseStage_instance;
  }
  function baseColorTokens(targets, status, deriveColors, hue, chroma) {
    deriveColors = deriveColors === VOID ? true : deriveColors;
    hue = hue === VOID ? 255.0 : hue;
    chroma = chroma === VOID ? null : chroma;
    var effectiveHue = deriveColors ? hue : 255.0;
    var chromas = resolveEffectiveChromas(deriveColors, chroma, targets);
    return new ColorTokens(baseSurfaceColors(targets, chromas.d1u_1, effectiveHue), baseContentColors(targets, chromas.e1u_1, effectiveHue), baseIconColors(targets, chromas.f1u_1, effectiveHue), baseBorderColors(targets, chromas.g1u_1, effectiveHue), baseSelectionColors(targets, chromas.h1u_1, chromas.e1u_1, chromas.g1u_1, effectiveHue), new FocusColors(safeOklch(targets.p1u_1, chromas.i1u_1, effectiveHue)), baseStatus(status.a1v_1, status.b1v_1, 145.0), baseStatus(status.c1v_1, status.d1v_1, 25.0), baseStatus(status.e1v_1, status.f1v_1, 85.0), baseStatus(status.g1v_1, status.h1v_1, 250.0), new GradientColors(flatGradient(targets.x1u_1, chromas.h1u_1, effectiveHue), flatGradient(targets.k1u_1, chromas.d1u_1, effectiveHue)), new BrandColors(safeOklch(targets.p1u_1, chromas.j1u_1, effectiveHue), null, null, null));
  }
  function resolveEffectiveChromas(deriveColors, chroma, targets) {
    var tmp;
    if (!deriveColors) {
      tmp = new SynthesizedChroma(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
    } else {
      var tmp1_elvis_lhs = chroma == null ? null : chroma.d1u_1;
      var tmp_0 = tmp1_elvis_lhs == null ? targets.l1u_1 : tmp1_elvis_lhs;
      var tmp3_elvis_lhs = chroma == null ? null : chroma.e1u_1;
      var tmp_1 = tmp3_elvis_lhs == null ? targets.q1u_1 : tmp3_elvis_lhs;
      var tmp5_elvis_lhs = chroma == null ? null : chroma.f1u_1;
      var tmp_2 = tmp5_elvis_lhs == null ? targets.q1u_1 : tmp5_elvis_lhs;
      var tmp7_elvis_lhs = chroma == null ? null : chroma.g1u_1;
      var tmp_3 = tmp7_elvis_lhs == null ? targets.w1u_1 : tmp7_elvis_lhs;
      var tmp9_elvis_lhs = chroma == null ? null : chroma.h1u_1;
      var tmp_4 = tmp9_elvis_lhs == null ? targets.y1u_1 : tmp9_elvis_lhs;
      var tmp11_elvis_lhs = chroma == null ? null : chroma.i1u_1;
      var tmp_5 = tmp11_elvis_lhs == null ? 0.14 : tmp11_elvis_lhs;
      var tmp13_elvis_lhs = chroma == null ? null : chroma.j1u_1;
      tmp = new SynthesizedChroma(tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp13_elvis_lhs == null ? 0.1 : tmp13_elvis_lhs);
    }
    return tmp;
  }
  function baseSurfaceColors(targets, chroma, hue) {
    return new SurfaceColors(safeOklch(targets.k1u_1, chroma, hue), safeOklch(targets.m1u_1, chroma, hue), safeOklch(targets.n1u_1, chroma, hue), safeOklch(targets.o1u_1, chroma, hue));
  }
  function baseContentColors(targets, chroma, hue) {
    return new ContentColors(safeOklch(targets.p1u_1, chroma, hue), safeOklch(targets.r1u_1, chroma, hue), safeOklch(targets.s1u_1, chroma, hue));
  }
  function baseIconColors(targets, chroma, hue) {
    return new IconColors(safeOklch(targets.p1u_1, chroma, hue), safeOklch(targets.r1u_1, chroma, hue), safeOklch(targets.s1u_1, chroma, hue));
  }
  function baseBorderColors(targets, chroma, hue) {
    return new BorderColors(safeOklch(targets.t1u_1, chroma, hue), safeOklch(targets.u1u_1, chroma, hue), safeOklch(targets.v1u_1, chroma, hue), safeOklch(targets.s1u_1, chroma, hue));
  }
  function baseSelectionColors(targets, selectionChroma, contentChroma, borderChroma, hue) {
    return new SelectionColors(safeOklch(targets.x1u_1, selectionChroma, hue), safeOklch(targets.z1u_1, contentChroma, hue), safeOklch(targets.v1u_1, borderChroma, hue));
  }
  function baseStatus(surfaceL, contentL, hue) {
    return new StatusColors(safeOklch(surfaceL, 0.05, hue), safeOklch(contentL, 0.13, hue), safeOklch(contentL, 0.09, hue), safeOklch(contentL, 0.13, hue));
  }
  function flatGradient(lightness, chroma, hue) {
    var color = safeOklch(lightness, chroma, hue);
    return new OklchGradient(listOf([new OklchStop(color, 0.0), new OklchStop(color, 1.0)]), GradientDirection_Vertical_getInstance());
  }
  function synthesizeNeutralChroma(effectiveChroma) {
    var t = coerceIn_0((coerceToFloat32(effectiveChroma) + 1.0) / 2.0, 0.0, 1.0);
    var surface = toFloat32(coerceToFloat32(0.015) * t);
    var content = toFloat32(coerceToFloat32(0.06) * t);
    var icon = toFloat32(coerceToFloat32(0.07) * t);
    var border = toFloat32(coerceToFloat32(0.03) * t);
    var selection = toFloat32(coerceToFloat32(0.08) * t);
    var focus = toFloat32(coerceToFloat32(0.14) * t);
    var brand = toFloat32(coerceToFloat32(0.12) * t);
    return new SynthesizedChroma(surface, content, icon, border, selection, focus, brand);
  }
  function synthesizeNeutralHue(profile, domains, effectiveWarmth) {
    var tmp;
    if (domains.p()) {
      tmp = 255.0;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(domains, 10));
      var _iterator__ex2g4s = domains.j();
      while (_iterator__ex2g4s.k()) {
        var item = _iterator__ex2g4s.l();
        var tmp$ret$2 = domainHueAnchor(item);
        destination.f(tmp$ret$2);
      }
      var anchors = destination;
      tmp = circularMean(anchors);
    }
    var domainAnchorHue = tmp;
    var interactionHueDelta = profile.q1t_1 * 8.0 + profile.u1t_1 * -6.0;
    var baseWithInteractions = normalizeHue(domainAnchorHue + interactionHueDelta);
    return applyWarmth(baseWithInteractions, effectiveWarmth);
  }
  function circularMean(hues) {
    if (hues.p())
      return 255.0;
    var sinSum = 0.0;
    var cosSum = 0.0;
    var _iterator__ex2g4s = hues.j();
    while (_iterator__ex2g4s.k()) {
      var hue = _iterator__ex2g4s.l();
      var rad = hue * (3.141592653589793 / 180.0);
      var tmp = sinSum;
      // Inline function 'kotlin.math.sin' call
      sinSum = tmp + Math.sin(rad);
      var tmp_0 = cosSum;
      // Inline function 'kotlin.math.cos' call
      cosSum = tmp_0 + Math.cos(rad);
    }
    var tmp0 = sinSum;
    // Inline function 'kotlin.math.hypot' call
    var y = cosSum;
    if (hypot(tmp0, y) < 1.0E-4) {
      return 255.0;
    }
    var tmp0_0 = sinSum;
    // Inline function 'kotlin.math.atan2' call
    var x = cosSum;
    var meanRad = Math.atan2(tmp0_0, x);
    var deg = meanRad * 180.0 / 3.141592653589793;
    return normalizeHue(deg);
  }
  function normalizeHue(hue) {
    return (hue % 360.0 + 360.0) % 360.0;
  }
  function applyWarmth(hue, warmth) {
    if (warmth === 0.0)
      return normalizeHue(hue);
    var deltaToWarm = shortestAngleDelta(hue, 65.0);
    var tmp;
    if (warmth > 0.0) {
      // Inline function 'kotlin.math.abs' call
      // Inline function 'kotlin.comparisons.minOf' call
      var a = Math.abs(deltaToWarm);
      var step = Math.min(a, 25.0);
      // Inline function 'kotlin.math.sign' call
      tmp = sign(deltaToWarm) * step * warmth;
    } else {
      // Inline function 'kotlin.math.sign' call
      var tmp_0 = -sign(deltaToWarm) * 25.0;
      // Inline function 'kotlin.math.abs' call
      tmp = tmp_0 * Math.abs(warmth);
    }
    var shift = tmp;
    return normalizeHue(hue + shift);
  }
  function shortestAngleDelta(from, to) {
    var diff = (to - from) % 360.0;
    return diff > 180.0 ? diff - 360.0 : diff < -180.0 ? diff + 360.0 : diff;
  }
  function NeutralTargets_init_$Init$(base, isLight, $this) {
    var tmp;
    if (isLight) {
      tmp = 1.0;
    } else {
      tmp = 0.22;
    }
    var tmp_0 = tmp;
    var tmp_1;
    if (isLight) {
      tmp_1 = 0.94;
    } else {
      tmp_1 = 0.12;
    }
    var tmp_2 = tmp_1;
    var tmp_3;
    if (isLight) {
      tmp_3 = 0.18;
    } else {
      tmp_3 = 0.92;
    }
    var tmp_4 = tmp_3;
    var tmp_5;
    if (isLight) {
      tmp_5 = 0.45;
    } else {
      tmp_5 = 0.7;
    }
    var tmp_6 = tmp_5;
    var tmp_7;
    if (isLight) {
      tmp_7 = 0.96;
    } else {
      tmp_7 = 0.18;
    }
    var tmp_8 = tmp_7;
    var tmp_9;
    if (isLight) {
      tmp_9 = 0.82;
    } else {
      tmp_9 = 0.42;
    }
    var tmp_10 = tmp_9;
    var tmp_11;
    if (isLight) {
      tmp_11 = 0.89;
    } else {
      tmp_11 = 0.32;
    }
    var tmp_12 = tmp_11;
    var tmp_13;
    if (isLight) {
      tmp_13 = 0.66;
    } else {
      tmp_13 = 0.58;
    }
    var tmp_14 = tmp_13;
    var tmp_15;
    if (isLight) {
      tmp_15 = 0.9;
    } else {
      tmp_15 = 0.3;
    }
    var tmp_16 = tmp_15;
    var tmp_17;
    if (isLight) {
      tmp_17 = 0.25;
    } else {
      tmp_17 = 0.92;
    }
    NeutralTargets.call($this, base.i1v_1, base.j1v_1, tmp_0, tmp_2, tmp_4, base.k1v_1, base.l1v_1, tmp_6, tmp_8, tmp_10, tmp_12, tmp_14, 0.02, tmp_16, 0.04, tmp_17);
    return $this;
  }
  function NeutralTargets_init_$Create$(base, isLight) {
    return NeutralTargets_init_$Init$(base, isLight, objectCreate(protoOf(NeutralTargets)));
  }
  function NeutralTargets(surfaceL, surfaceC, elevatedL, recessedL, inverseSurfaceL, contentL, contentC, mutedL, inverseContentL, borderL, borderMutedL, borderStrongL, borderC, selectionL, selectionC, selectionContentL) {
    this.k1u_1 = surfaceL;
    this.l1u_1 = surfaceC;
    this.m1u_1 = elevatedL;
    this.n1u_1 = recessedL;
    this.o1u_1 = inverseSurfaceL;
    this.p1u_1 = contentL;
    this.q1u_1 = contentC;
    this.r1u_1 = mutedL;
    this.s1u_1 = inverseContentL;
    this.t1u_1 = borderL;
    this.u1u_1 = borderMutedL;
    this.v1u_1 = borderStrongL;
    this.w1u_1 = borderC;
    this.x1u_1 = selectionL;
    this.y1u_1 = selectionC;
    this.z1u_1 = selectionContentL;
  }
  protoOf(NeutralTargets).toString = function () {
    return 'NeutralTargets(surfaceL=' + this.k1u_1 + ', surfaceC=' + this.l1u_1 + ', elevatedL=' + this.m1u_1 + ', recessedL=' + this.n1u_1 + ', inverseSurfaceL=' + this.o1u_1 + ', contentL=' + this.p1u_1 + ', contentC=' + this.q1u_1 + ', mutedL=' + this.r1u_1 + ', inverseContentL=' + this.s1u_1 + ', borderL=' + this.t1u_1 + ', borderMutedL=' + this.u1u_1 + ', borderStrongL=' + this.v1u_1 + ', borderC=' + this.w1u_1 + ', selectionL=' + this.x1u_1 + ', selectionC=' + this.y1u_1 + ', selectionContentL=' + this.z1u_1 + ')';
  };
  protoOf(NeutralTargets).hashCode = function () {
    var result = getNumberHashCode(this.k1u_1);
    result = imul(result, 31) + getNumberHashCode(this.l1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.m1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.n1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.o1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.p1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.q1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.r1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.s1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.t1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.u1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.v1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.w1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.x1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.y1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.z1u_1) | 0;
    return result;
  };
  protoOf(NeutralTargets).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof NeutralTargets))
      return false;
    if (!equals(this.k1u_1, other.k1u_1))
      return false;
    if (!equals(this.l1u_1, other.l1u_1))
      return false;
    if (!equals(this.m1u_1, other.m1u_1))
      return false;
    if (!equals(this.n1u_1, other.n1u_1))
      return false;
    if (!equals(this.o1u_1, other.o1u_1))
      return false;
    if (!equals(this.p1u_1, other.p1u_1))
      return false;
    if (!equals(this.q1u_1, other.q1u_1))
      return false;
    if (!equals(this.r1u_1, other.r1u_1))
      return false;
    if (!equals(this.s1u_1, other.s1u_1))
      return false;
    if (!equals(this.t1u_1, other.t1u_1))
      return false;
    if (!equals(this.u1u_1, other.u1u_1))
      return false;
    if (!equals(this.v1u_1, other.v1u_1))
      return false;
    if (!equals(this.w1u_1, other.w1u_1))
      return false;
    if (!equals(this.x1u_1, other.x1u_1))
      return false;
    if (!equals(this.y1u_1, other.y1u_1))
      return false;
    if (!equals(this.z1u_1, other.z1u_1))
      return false;
    return true;
  };
  function baseSpacingTokens(spacing) {
    return new SpacingTokens(_DpValue___init__impl__w9byic(spacing[0]), _DpValue___init__impl__w9byic(spacing[1]), _DpValue___init__impl__w9byic(spacing[2]), _DpValue___init__impl__w9byic(spacing[3]), _DpValue___init__impl__w9byic(spacing[4]), _DpValue___init__impl__w9byic(spacing[5]), _DpValue___init__impl__w9byic(spacing[6]), _DpValue___init__impl__w9byic(spacing[7]));
  }
  function baseRadiusTokens(radiusLevels) {
    return new RadiusTokens(_DpValue___init__impl__w9byic(0.0), _DpValue___init__impl__w9byic(radiusLevels[0]), _DpValue___init__impl__w9byic(radiusLevels[1]), _DpValue___init__impl__w9byic(radiusLevels[2]), _DpValue___init__impl__w9byic(radiusLevels[3]), _DpValue___init__impl__w9byic(radiusLevels[4]), _DpValue___init__impl__w9byic(radiusLevels[5]), _DpValue___init__impl__w9byic(radiusLevels[6]), _DpValue___init__impl__w9byic(radiusLevels[7]), _DpValue___init__impl__w9byic(9999.0));
  }
  function baseDepthTokens(depth) {
    return new DepthTokens(depth.n(0), depth.n(1), depth.n(2), depth.n(3));
  }
  function baseSizeTokens(iconSizes, avatarSizes, controlSizes, dotSizes) {
    return new SizeTokens(new IconSizes(_DpValue___init__impl__w9byic(iconSizes[0]), _DpValue___init__impl__w9byic(iconSizes[1]), _DpValue___init__impl__w9byic(iconSizes[2]), _DpValue___init__impl__w9byic(iconSizes[3]), _DpValue___init__impl__w9byic(iconSizes[4])), new AvatarSizes(_DpValue___init__impl__w9byic(avatarSizes[0]), _DpValue___init__impl__w9byic(avatarSizes[1]), _DpValue___init__impl__w9byic(avatarSizes[2]), _DpValue___init__impl__w9byic(avatarSizes[3]), _DpValue___init__impl__w9byic(avatarSizes[4])), new ControlSizes(_DpValue___init__impl__w9byic(controlSizes[0]), _DpValue___init__impl__w9byic(controlSizes[1]), _DpValue___init__impl__w9byic(controlSizes[2]), _DpValue___init__impl__w9byic(controlSizes[3]), _DpValue___init__impl__w9byic(controlSizes[4])), new DotSizes(_DpValue___init__impl__w9byic(dotSizes[0]), _DpValue___init__impl__w9byic(dotSizes[1]), _DpValue___init__impl__w9byic(dotSizes[2])));
  }
  function SynthesizedChroma(surface, content, icon, border, selection, focus, brand) {
    this.d1u_1 = surface;
    this.e1u_1 = content;
    this.f1u_1 = icon;
    this.g1u_1 = border;
    this.h1u_1 = selection;
    this.i1u_1 = focus;
    this.j1u_1 = brand;
  }
  protoOf(SynthesizedChroma).toString = function () {
    return 'SynthesizedChroma(surface=' + this.d1u_1 + ', content=' + this.e1u_1 + ', icon=' + this.f1u_1 + ', border=' + this.g1u_1 + ', selection=' + this.h1u_1 + ', focus=' + this.i1u_1 + ', brand=' + this.j1u_1 + ')';
  };
  protoOf(SynthesizedChroma).hashCode = function () {
    var result = getNumberHashCode(this.d1u_1);
    result = imul(result, 31) + getNumberHashCode(this.e1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.f1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.g1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.h1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.i1u_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.j1u_1) | 0;
    return result;
  };
  protoOf(SynthesizedChroma).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SynthesizedChroma))
      return false;
    if (!equals(this.d1u_1, other.d1u_1))
      return false;
    if (!equals(this.e1u_1, other.e1u_1))
      return false;
    if (!equals(this.f1u_1, other.f1u_1))
      return false;
    if (!equals(this.g1u_1, other.g1u_1))
      return false;
    if (!equals(this.h1u_1, other.h1u_1))
      return false;
    if (!equals(this.i1u_1, other.i1u_1))
      return false;
    if (!equals(this.j1u_1, other.j1u_1))
      return false;
    return true;
  };
  function baseTypographyTokens(metrics, structure, content, metadata) {
    var weight = _FontWeightValue___init__impl__p0bmnj(metrics.p1v_1);
    var lineHeight = _LineHeightValue___init__impl__8eeut9(metrics.q1v_1);
    var tracking = _EmValue___init__impl__8haeq8(metrics.r1v_1);
    var structureSizes = baseTypographyTokens$ladder(metrics.m1v_1, 1.22, 6);
    var contentSizes = baseTypographyTokens$ladder(metrics.n1v_1, 1.15, 5);
    var metadataSizes = baseTypographyTokens$ladder(metrics.o1v_1, 1.12, 3);
    return new TypographyTokens(new StructureType(baseTypographyTokens$role(weight, lineHeight, tracking, structureSizes.n(0), ContentDefault_getInstance(), structure), baseTypographyTokens$role(weight, lineHeight, tracking, structureSizes.n(1), ContentDefault_getInstance(), structure), baseTypographyTokens$role(weight, lineHeight, tracking, structureSizes.n(2), ContentDefault_getInstance(), structure), baseTypographyTokens$role(weight, lineHeight, tracking, structureSizes.n(3), ContentDefault_getInstance(), structure), baseTypographyTokens$role(weight, lineHeight, tracking, structureSizes.n(4), ContentDefault_getInstance(), structure), baseTypographyTokens$role(weight, lineHeight, tracking, structureSizes.n(5), ContentDefault_getInstance(), structure)), new ContentType(baseTypographyTokens$role(weight, lineHeight, tracking, contentSizes.n(0), ContentDefault_getInstance(), content), baseTypographyTokens$role(weight, lineHeight, tracking, contentSizes.n(1), ContentDefault_getInstance(), content), baseTypographyTokens$role(weight, lineHeight, tracking, contentSizes.n(2), ContentDefault_getInstance(), content), baseTypographyTokens$role(weight, lineHeight, tracking, contentSizes.n(3), ContentDefault_getInstance(), content), baseTypographyTokens$role(weight, lineHeight, tracking, contentSizes.n(4), ContentDefault_getInstance(), content)), new MetadataType(baseTypographyTokens$role(weight, lineHeight, tracking, metadataSizes.n(0), ContentMuted_getInstance(), metadata), baseTypographyTokens$role(weight, lineHeight, tracking, metadataSizes.n(1), ContentMuted_getInstance(), metadata), baseTypographyTokens$role(weight, lineHeight, tracking, metadataSizes.n(2), ContentMuted_getInstance(), metadata)));
  }
  function baseTypographyTokens$role(weight, lineHeight, tracking, size, color, family) {
    return new TypeRole(family, _SpValue___init__impl__k65sm3(size), weight, lineHeight, tracking, color);
  }
  function baseTypographyTokens$ladder(base, ratio, levels) {
    // Inline function 'kotlin.collections.List' call
    // Inline function 'kotlin.collections.MutableList' call
    var list = ArrayList_init_$Create$(levels);
    // Inline function 'kotlin.repeat' call
    var inductionVariable = 0;
    if (inductionVariable < levels)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = base;
        // Inline function 'kotlin.math.pow' call
        var tmp$ret$5 = Math.pow(ratio, index);
        var tmp$ret$4 = toFloat32(tmp / tmp$ret$5);
        list.f(tmp$ret$4);
      }
       while (inductionVariable < levels);
    return list;
  }
  function BaseSchema(version, spacing, radiusLevels, depth, iconSizes, avatarSizes, controlSizes, dotSizes, typeMetrics, motion, lightNeutrals, darkNeutrals, statusLight, statusDark) {
    this.j1s_1 = version;
    this.k1s_1 = spacing;
    this.l1s_1 = radiusLevels;
    this.m1s_1 = depth;
    this.n1s_1 = iconSizes;
    this.o1s_1 = avatarSizes;
    this.p1s_1 = controlSizes;
    this.q1s_1 = dotSizes;
    this.r1s_1 = typeMetrics;
    this.s1s_1 = motion;
    this.t1s_1 = lightNeutrals;
    this.u1s_1 = darkNeutrals;
    this.v1s_1 = statusLight;
    this.w1s_1 = statusDark;
  }
  protoOf(BaseSchema).toString = function () {
    return 'BaseSchema(v=' + this.j1s_1 + ')';
  };
  protoOf(BaseSchema).equals = function (other) {
    if (this === other) {
      return true;
    }
    if (!(other instanceof BaseSchema)) {
      return false;
    }
    return this.j1s_1 === other.j1s_1 && contentEquals(this.k1s_1, other.k1s_1) && contentEquals(this.l1s_1, other.l1s_1) && equals(this.m1s_1, other.m1s_1) && contentEquals(this.n1s_1, other.n1s_1) && contentEquals(this.o1s_1, other.o1s_1) && contentEquals(this.p1s_1, other.p1s_1) && contentEquals(this.q1s_1, other.q1s_1) && this.r1s_1.equals(other.r1s_1) && this.s1s_1.equals(other.s1s_1) && this.t1s_1.equals(other.t1s_1) && this.u1s_1.equals(other.u1s_1) && this.v1s_1.equals(other.v1s_1) && this.w1s_1.equals(other.w1s_1);
  };
  protoOf(BaseSchema).hashCode = function () {
    var result = this.j1s_1;
    result = imul(31, result) + contentHashCode(this.k1s_1) | 0;
    result = imul(31, result) + contentHashCode(this.l1s_1) | 0;
    result = imul(31, result) + hashCode(this.m1s_1) | 0;
    result = imul(31, result) + contentHashCode(this.n1s_1) | 0;
    result = imul(31, result) + contentHashCode(this.o1s_1) | 0;
    result = imul(31, result) + contentHashCode(this.p1s_1) | 0;
    result = imul(31, result) + contentHashCode(this.q1s_1) | 0;
    result = imul(31, result) + this.r1s_1.hashCode() | 0;
    result = imul(31, result) + this.s1s_1.hashCode() | 0;
    result = imul(31, result) + this.t1s_1.hashCode() | 0;
    result = imul(31, result) + this.u1s_1.hashCode() | 0;
    result = imul(31, result) + this.v1s_1.hashCode() | 0;
    result = imul(31, result) + this.w1s_1.hashCode() | 0;
    return result;
  };
  function BaseNeutrals(surfaceL, surfaceC, contentL, contentC) {
    this.i1v_1 = surfaceL;
    this.j1v_1 = surfaceC;
    this.k1v_1 = contentL;
    this.l1v_1 = contentC;
  }
  protoOf(BaseNeutrals).toString = function () {
    return 'BaseNeutrals(surfaceL=' + this.i1v_1 + ', surfaceC=' + this.j1v_1 + ', contentL=' + this.k1v_1 + ', contentC=' + this.l1v_1 + ')';
  };
  protoOf(BaseNeutrals).hashCode = function () {
    var result = getNumberHashCode(this.i1v_1);
    result = imul(result, 31) + getNumberHashCode(this.j1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.k1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.l1v_1) | 0;
    return result;
  };
  protoOf(BaseNeutrals).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BaseNeutrals))
      return false;
    if (!equals(this.i1v_1, other.i1v_1))
      return false;
    if (!equals(this.j1v_1, other.j1v_1))
      return false;
    if (!equals(this.k1v_1, other.k1v_1))
      return false;
    if (!equals(this.l1v_1, other.l1v_1))
      return false;
    return true;
  };
  function BaseStatus(positiveSurfaceL, positiveContentL, negativeSurfaceL, negativeContentL, cautionSurfaceL, cautionContentL, infoSurfaceL, infoContentL) {
    this.a1v_1 = positiveSurfaceL;
    this.b1v_1 = positiveContentL;
    this.c1v_1 = negativeSurfaceL;
    this.d1v_1 = negativeContentL;
    this.e1v_1 = cautionSurfaceL;
    this.f1v_1 = cautionContentL;
    this.g1v_1 = infoSurfaceL;
    this.h1v_1 = infoContentL;
  }
  protoOf(BaseStatus).toString = function () {
    return 'BaseStatus(positiveSurfaceL=' + this.a1v_1 + ', positiveContentL=' + this.b1v_1 + ', negativeSurfaceL=' + this.c1v_1 + ', negativeContentL=' + this.d1v_1 + ', cautionSurfaceL=' + this.e1v_1 + ', cautionContentL=' + this.f1v_1 + ', infoSurfaceL=' + this.g1v_1 + ', infoContentL=' + this.h1v_1 + ')';
  };
  protoOf(BaseStatus).hashCode = function () {
    var result = getNumberHashCode(this.a1v_1);
    result = imul(result, 31) + getNumberHashCode(this.b1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.c1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.d1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.e1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.f1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.g1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.h1v_1) | 0;
    return result;
  };
  protoOf(BaseStatus).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BaseStatus))
      return false;
    if (!equals(this.a1v_1, other.a1v_1))
      return false;
    if (!equals(this.b1v_1, other.b1v_1))
      return false;
    if (!equals(this.c1v_1, other.c1v_1))
      return false;
    if (!equals(this.d1v_1, other.d1v_1))
      return false;
    if (!equals(this.e1v_1, other.e1v_1))
      return false;
    if (!equals(this.f1v_1, other.f1v_1))
      return false;
    if (!equals(this.g1v_1, other.g1v_1))
      return false;
    if (!equals(this.h1v_1, other.h1v_1))
      return false;
    return true;
  };
  function BaseTypeMetrics(structureSizeDp, contentSizeDp, metadataSizeDp, weight, lineHeight, letterSpacingEm) {
    this.m1v_1 = structureSizeDp;
    this.n1v_1 = contentSizeDp;
    this.o1v_1 = metadataSizeDp;
    this.p1v_1 = weight;
    this.q1v_1 = lineHeight;
    this.r1v_1 = letterSpacingEm;
  }
  protoOf(BaseTypeMetrics).toString = function () {
    return 'BaseTypeMetrics(structureSizeDp=' + this.m1v_1 + ', contentSizeDp=' + this.n1v_1 + ', metadataSizeDp=' + this.o1v_1 + ', weight=' + this.p1v_1 + ', lineHeight=' + this.q1v_1 + ', letterSpacingEm=' + this.r1v_1 + ')';
  };
  protoOf(BaseTypeMetrics).hashCode = function () {
    var result = getNumberHashCode(this.m1v_1);
    result = imul(result, 31) + getNumberHashCode(this.n1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.o1v_1) | 0;
    result = imul(result, 31) + this.p1v_1 | 0;
    result = imul(result, 31) + getNumberHashCode(this.q1v_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.r1v_1) | 0;
    return result;
  };
  protoOf(BaseTypeMetrics).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BaseTypeMetrics))
      return false;
    if (!equals(this.m1v_1, other.m1v_1))
      return false;
    if (!equals(this.n1v_1, other.n1v_1))
      return false;
    if (!equals(this.o1v_1, other.o1v_1))
      return false;
    if (!(this.p1v_1 === other.p1v_1))
      return false;
    if (!equals(this.q1v_1, other.q1v_1))
      return false;
    if (!equals(this.r1v_1, other.r1v_1))
      return false;
    return true;
  };
  function BaseTables() {
    this.s1v_1 = 1;
  }
  protoOf(BaseTables).n = function (version) {
    // Inline function 'kotlin.require' call
    if (!(version === 1)) {
      var message = 'Unknown BaseTables version: ' + version;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.floatArrayOf' call
    var tmp = new Float32Array([4.0, 8.0, 12.0, 16.0, 24.0, 32.0, 40.0, 48.0]);
    // Inline function 'kotlin.floatArrayOf' call
    var tmp_0 = new Float32Array([2.0, 4.0, 6.0, 8.0, 12.0, 16.0, 24.0, 32.0]);
    // Inline function 'kotlin.collections.List' call
    // Inline function 'kotlin.collections.MutableList' call
    var list = ArrayList_init_$Create$(4);
    // Inline function 'kotlin.repeat' call
    var inductionVariable = 0;
    if (inductionVariable < 4)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp$ret$8 = new DepthSpec(_DpValue___init__impl__w9byic(2.0), 0.2, _DpValue___init__impl__w9byic(4.0), _DpValue___init__impl__w9byic(1.0));
        list.f(tmp$ret$8);
      }
       while (inductionVariable < 4);
    var tmp_1 = list;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp_2 = new Float32Array([12.0, 16.0, 20.0, 24.0, 32.0]);
    // Inline function 'kotlin.floatArrayOf' call
    var tmp_3 = new Float32Array([24.0, 32.0, 40.0, 56.0, 72.0]);
    // Inline function 'kotlin.floatArrayOf' call
    var tmp_4 = new Float32Array([32.0, 40.0, 48.0, 56.0, 64.0]);
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$12 = new Float32Array([6.0, 8.0, 10.0]);
    return new BaseSchema(version, tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp$ret$12, new BaseTypeMetrics(24.0, 16.0, 12.0, 400, 1.25, -0.01), new MotionTokens(new MotionSpec(_DurationValue___init__impl__1d0n0c(new Long(200, 0)), EasingKind_Standard_getInstance()), new MotionSpec(_DurationValue___init__impl__1d0n0c(new Long(200, 0)), EasingKind_Standard_getInstance()), new MotionSpec(_DurationValue___init__impl__1d0n0c(new Long(200, 0)), EasingKind_Standard_getInstance()), new MotionSpec(_DurationValue___init__impl__1d0n0c(new Long(200, 0)), EasingKind_Standard_getInstance()), new MotionSpec(_DurationValue___init__impl__1d0n0c(new Long(200, 0)), EasingKind_Standard_getInstance()), new MotionSpec(_DurationValue___init__impl__1d0n0c(new Long(200, 0)), EasingKind_Standard_getInstance())), new BaseNeutrals(0.98, 0.01, 0.2, 0.05), new BaseNeutrals(0.16, 0.01, 0.93, 0.05), new BaseStatus(0.94, 0.35, 0.94, 0.35, 0.94, 0.35, 0.94, 0.35), new BaseStatus(0.28, 0.85, 0.28, 0.85, 0.28, 0.85, 0.28, 0.85));
  };
  protoOf(BaseTables).t1v = function (version, $super) {
    version = version === VOID ? 1 : version;
    return $super === VOID ? this.n(version) : $super.n.call(this, version);
  };
  var BaseTables_instance;
  function BaseTables_getInstance() {
    return BaseTables_instance;
  }
  function get_DOMAIN_HUE_ANCHORS() {
    _init_properties_ColorTables_kt__g9f5yu();
    return DOMAIN_HUE_ANCHORS;
  }
  var DOMAIN_HUE_ANCHORS;
  function domainHueAnchor(domain) {
    _init_properties_ColorTables_kt__g9f5yu();
    return getValue(get_DOMAIN_HUE_ANCHORS(), domain);
  }
  var properties_initialized_ColorTables_kt_5f4048;
  function _init_properties_ColorTables_kt__g9f5yu() {
    if (!properties_initialized_ColorTables_kt_5f4048) {
      properties_initialized_ColorTables_kt_5f4048 = true;
      DOMAIN_HUE_ANCHORS = mapOf([to(ProductDomain_Finance_getInstance(), 210.0), to(ProductDomain_Health_getInstance(), 160.0), to(ProductDomain_Social_getInstance(), 295.0), to(ProductDomain_Productivity_getInstance(), 230.0), to(ProductDomain_Commerce_getInstance(), 30.0), to(ProductDomain_Media_getInstance(), 270.0), to(ProductDomain_Education_getInstance(), 195.0), to(ProductDomain_Travel_getInstance(), 185.0), to(ProductDomain_Utilities_getInstance(), 240.0), to(ProductDomain_Other_getInstance(), 255.0)]);
    }
  }
  function DefaultFontBias() {
    DefaultFontBias_instance = this;
    this.u1v_1 = new Catalog(_GoogleFontId___init__impl__gzte8y('inter'));
    this.v1v_1 = new Catalog(_GoogleFontId___init__impl__gzte8y('archivo'));
    this.w1v_1 = new Catalog(_GoogleFontId___init__impl__gzte8y('inter'));
    this.x1v_1 = 0.35;
  }
  var DefaultFontBias_instance;
  function DefaultFontBias_getInstance() {
    if (DefaultFontBias_instance == null)
      new DefaultFontBias();
    return DefaultFontBias_instance;
  }
  function get_PRODUCT_DOMAIN_INFLUENCES() {
    _init_properties_DomainTables_kt__fvudz();
    return PRODUCT_DOMAIN_INFLUENCES;
  }
  var PRODUCT_DOMAIN_INFLUENCES;
  function get_INTERACTION_INFLUENCES() {
    _init_properties_DomainTables_kt__fvudz();
    return INTERACTION_INFLUENCES;
  }
  var INTERACTION_INFLUENCES;
  function toThemeProfile(_this__u8e3s4) {
    _init_properties_DomainTables_kt__fvudz();
    return getValue(get_PRODUCT_DOMAIN_INFLUENCES(), _this__u8e3s4);
  }
  function toThemeProfile_0(_this__u8e3s4) {
    _init_properties_DomainTables_kt__fvudz();
    return getValue(get_INTERACTION_INFLUENCES(), _this__u8e3s4);
  }
  var properties_initialized_DomainTables_kt_86ki1h;
  function _init_properties_DomainTables_kt__fvudz() {
    if (!properties_initialized_DomainTables_kt_86ki1h) {
      properties_initialized_DomainTables_kt_86ki1h = true;
      var tmp = ProductDomain_Finance_getInstance();
      var tmp0_contentVelocity = -0.3;
      var tmp1_socialPresence = -0.5;
      var tmp2_mediaRichness = -0.4;
      var tmp_0 = to(tmp, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.55, 0.35, 0.4, tmp1_socialPresence, 0.75, 0.8, tmp0_contentVelocity, tmp2_mediaRichness));
      var tmp_1 = ProductDomain_Health_getInstance();
      var tmp3_contentVelocity = -0.35;
      var tmp4_socialPresence = -0.2;
      var tmp5_transactionality = -0.1;
      var tmp6_mediaRichness = -0.2;
      var tmp_2 = to(tmp_1, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.2, 0.4, tmp5_transactionality, tmp4_socialPresence, 0.8, 0.7, tmp3_contentVelocity, tmp6_mediaRichness));
      var tmp_3 = ProductDomain_Social_getInstance();
      var tmp7_riskSensitivity = -0.3;
      var tmp8_trustStrictness = -0.2;
      var tmp9_dataDensity = -0.1;
      var tmp10_transactionality = -0.1;
      var tmp11_inputHeaviness = -0.1;
      var tmp_4 = to(tmp_3, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp9_dataDensity, tmp11_inputHeaviness, tmp10_transactionality, 0.85, tmp8_trustStrictness, tmp7_riskSensitivity, 0.7, 0.45));
      var tmp_5 = ProductDomain_Productivity_getInstance();
      var tmp12_contentVelocity = -0.15;
      var tmp13_socialPresence = -0.4;
      var tmp14_transactionality = -0.2;
      var tmp15_mediaRichness = -0.35;
      var tmp_6 = to(tmp_5, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.65, 0.55, tmp14_transactionality, tmp13_socialPresence, 0.35, 0.1, tmp12_contentVelocity, tmp15_mediaRichness));
      var tmp_7 = to(ProductDomain_Commerce_getInstance(), new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.15, 0.3, 0.85, 0.1, 0.4, 0.25, 0.35, 0.4));
      var tmp_8 = ProductDomain_Media_getInstance();
      var tmp16_riskSensitivity = -0.2;
      var tmp17_trustStrictness = -0.1;
      var tmp18_dataDensity = -0.2;
      var tmp19_inputHeaviness = -0.2;
      var tmp_9 = to(tmp_8, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp18_dataDensity, tmp19_inputHeaviness, 0.1, 0.2, tmp17_trustStrictness, tmp16_riskSensitivity, 0.5, 0.9));
      var tmp_10 = ProductDomain_Education_getInstance();
      var tmp20_contentVelocity = -0.1;
      var tmp21_socialPresence = -0.15;
      var tmp22_transactionality = -0.3;
      var tmp_11 = to(tmp_10, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.25, 0.35, tmp22_transactionality, tmp21_socialPresence, 0.5, 0.15, tmp20_contentVelocity, 0.15));
      var tmp_12 = ProductDomain_Travel_getInstance();
      var tmp23_dataDensity = -0.05;
      var tmp_13 = to(tmp_12, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp23_dataDensity, 0.2, 0.45, 0.15, 0.25, 0.1, 0.3, 0.55));
      var tmp_14 = ProductDomain_Utilities_getInstance();
      var tmp24_contentVelocity = -0.4;
      var tmp25_socialPresence = -0.55;
      var tmp26_transactionality = -0.2;
      var tmp27_mediaRichness = -0.5;
      PRODUCT_DOMAIN_INFLUENCES = mapOf([tmp_0, tmp_2, tmp_4, tmp_6, tmp_7, tmp_9, tmp_11, tmp_13, to(tmp_14, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.1, 0.15, tmp26_transactionality, tmp25_socialPresence, 0.3, 0.2, tmp24_contentVelocity, tmp27_mediaRichness)), to(ProductDomain_Other_getInstance(), Companion_getInstance_67().b1r_1)]);
      var tmp_15 = InteractionPattern_DataNavigation_getInstance();
      var tmp0_contentVelocity_0 = -0.2;
      var tmp1_socialPresence_0 = -0.4;
      var tmp2_transactionality = -0.1;
      var tmp3_mediaRichness = -0.3;
      var tmp_16 = to(tmp_15, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.85, 0.3, tmp2_transactionality, tmp1_socialPresence_0, 0.25, 0.2, tmp0_contentVelocity_0, tmp3_mediaRichness));
      var tmp_17 = InteractionPattern_FormsEntry_getInstance();
      var tmp4_contentVelocity = -0.35;
      var tmp5_socialPresence = -0.3;
      var tmp6_mediaRichness_0 = -0.4;
      var tmp_18 = to(tmp_17, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.35, 0.85, 0.1, tmp5_socialPresence, 0.3, 0.15, tmp4_contentVelocity, tmp6_mediaRichness_0));
      var tmp_19 = InteractionPattern_ChatMessaging_getInstance();
      var tmp7_riskSensitivity_0 = -0.1;
      var tmp8_dataDensity = -0.2;
      var tmp9_transactionality = -0.2;
      var tmp_20 = to(tmp_19, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp8_dataDensity, 0.4, tmp9_transactionality, 0.7, 0.0, tmp7_riskSensitivity_0, 0.55, 0.1));
      var tmp_21 = InteractionPattern_ContentFeed_getInstance();
      var tmp10_riskSensitivity = -0.2;
      var tmp11_trustStrictness = -0.15;
      var tmp12_dataDensity = -0.15;
      var tmp13_transactionality = -0.1;
      var tmp14_inputHeaviness = -0.2;
      var tmp_22 = to(tmp_21, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp12_dataDensity, tmp14_inputHeaviness, tmp13_transactionality, 0.5, tmp11_trustStrictness, tmp10_riskSensitivity, 0.85, 0.45));
      var tmp_23 = InteractionPattern_ContentReading_getInstance();
      var tmp15_riskSensitivity = -0.1;
      var tmp16_dataDensity = -0.25;
      var tmp17_contentVelocity = -0.3;
      var tmp18_socialPresence = -0.2;
      var tmp19_transactionality = -0.3;
      var tmp20_inputHeaviness = -0.3;
      var tmp_24 = to(tmp_23, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp16_dataDensity, tmp20_inputHeaviness, tmp19_transactionality, tmp18_socialPresence, 0.2, tmp15_riskSensitivity, tmp17_contentVelocity, 0.1));
      var tmp_25 = InteractionPattern_SearchDiscovery_getInstance();
      var tmp21_socialPresence_0 = -0.1;
      var tmp22_mediaRichness = -0.1;
      var tmp_26 = to(tmp_25, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.4, 0.45, 0.1, tmp21_socialPresence_0, 0.1, 0.0, 0.35, tmp22_mediaRichness));
      var tmp_27 = InteractionPattern_MediaBrowse_getInstance();
      var tmp23_riskSensitivity = -0.15;
      var tmp24_trustStrictness = -0.1;
      var tmp25_dataDensity = -0.25;
      var tmp26_inputHeaviness = -0.25;
      var tmp_28 = to(tmp_27, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp25_dataDensity, tmp26_inputHeaviness, 0.15, 0.15, tmp24_trustStrictness, tmp23_riskSensitivity, 0.4, 0.9));
      var tmp_29 = InteractionPattern_DashboardMonitoring_getInstance();
      var tmp27_socialPresence = -0.45;
      var tmp28_transactionality = -0.15;
      var tmp29_mediaRichness = -0.2;
      var tmp_30 = to(tmp_29, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.8, 0.2, tmp28_transactionality, tmp27_socialPresence, 0.4, 0.35, 0.15, tmp29_mediaRichness));
      var tmp_31 = InteractionPattern_CheckoutCommerce_getInstance();
      var tmp30_contentVelocity = -0.1;
      var tmp31_socialPresence = -0.2;
      var tmp_32 = to(tmp_31, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.2, 0.5, 0.9, tmp31_socialPresence, 0.55, 0.4, tmp30_contentVelocity, 0.2));
      var tmp_33 = InteractionPattern_AuthOnboarding_getInstance();
      var tmp32_dataDensity = -0.2;
      var tmp33_contentVelocity = -0.25;
      var tmp34_socialPresence = -0.15;
      var tmp35_mediaRichness = -0.2;
      var tmp_34 = to(tmp_33, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp32_dataDensity, 0.55, 0.2, tmp34_socialPresence, 0.6, 0.45, tmp33_contentVelocity, tmp35_mediaRichness));
      var tmp_35 = InteractionPattern_SettingsAdmin_getInstance();
      var tmp36_contentVelocity = -0.4;
      var tmp37_socialPresence = -0.5;
      var tmp38_transactionality = -0.3;
      var tmp39_mediaRichness = -0.45;
      INTERACTION_INFLUENCES = mapOf([tmp_16, tmp_18, tmp_20, tmp_22, tmp_24, tmp_26, tmp_28, tmp_30, tmp_32, tmp_34, to(tmp_35, new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.5, 0.4, tmp38_transactionality, tmp37_socialPresence, 0.35, 0.15, tmp36_contentVelocity, tmp39_mediaRichness))]);
    }
  }
  function get_MOOD_PRESET_PROFILES() {
    _init_properties_MoodTables_kt__jbc4rg();
    return MOOD_PRESET_PROFILES;
  }
  var MOOD_PRESET_PROFILES;
  var properties_initialized_MoodTables_kt_wlw0qm;
  function _init_properties_MoodTables_kt__jbc4rg() {
    if (!properties_initialized_MoodTables_kt_wlw0qm) {
      properties_initialized_MoodTables_kt_wlw0qm = true;
      MOOD_PRESET_PROFILES = mapOf([to(MoodPreset_Calm_getInstance(), new ThemeProfile(0.15, -0.45, -0.35, -0.4, 0.25, -0.3, -0.55, -0.4)), to(MoodPreset_Professional_getInstance(), new ThemeProfile(0.0, -0.25, 0.15, 0.25, -0.2, -0.45, -0.2, -0.6)), to(MoodPreset_Bold_getInstance(), new ThemeProfile(0.0, 0.35, 0.55, 0.1, -0.35, 0.25, 0.35, -0.15)), to(MoodPreset_Playful_getInstance(), new ThemeProfile(0.25, 0.4, 0.1, -0.1, 0.65, 0.35, 0.55, 0.75)), to(MoodPreset_Minimal_getInstance(), new ThemeProfile(0.0, -0.55, 0.05, -0.35, -0.5, -0.55, -0.4, -0.5)), to(MoodPreset_Expressive_getInstance(), new ThemeProfile(0.1, 0.65, 0.25, 0.0, 0.35, 0.7, 0.45, 0.4))]);
    }
  }
  function get_POSITIVE() {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    return POSITIVE;
  }
  var POSITIVE;
  function get_NEGATIVE() {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    return NEGATIVE;
  }
  var NEGATIVE;
  function get_CAUTION() {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    return CAUTION;
  }
  var CAUTION;
  function get_INFO() {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    return INFO;
  }
  var INFO;
  function applyColorOverrides(color, overrides, mode, locked) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    if (overrides == null) {
      return color;
    }
    var tmp = applyOverrides(color.a19_1, overrides.f1n_1, mode, locked);
    var tmp_0 = applyOverrides_0(color.b19_1, overrides.g1n_1, mode, locked);
    var tmp_1 = applyOverrides_1(color.c19_1, overrides.h1n_1, mode, locked);
    var tmp_2 = applyOverrides_2(color.d19_1, overrides.i1n_1, mode, locked);
    var tmp_3 = applyOverrides_3(color.e19_1, overrides.j1n_1, mode, locked);
    var tmp0_safe_receiver = overrides.k1n_1;
    var tmp_4 = color.f19_1.y1v(orOverride(color.f19_1.z19_1, tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m1p_1, mode, ColorTokenPath_FocusRing_getInstance(), locked));
    var tmp_5 = applyOverrides_4(color.g19_1, overrides.l1n_1, get_POSITIVE(), mode, locked);
    var tmp_6 = applyOverrides_4(color.h19_1, overrides.m1n_1, get_NEGATIVE(), mode, locked);
    var tmp_7 = applyOverrides_4(color.i19_1, overrides.n1n_1, get_CAUTION(), mode, locked);
    var tmp_8 = applyOverrides_4(color.j19_1, overrides.o1n_1, get_INFO(), mode, locked);
    var tmp1_safe_receiver = overrides.p1n_1;
    var tmp_9 = orOverride(color.k19_1.z1v_1, tmp1_safe_receiver == null ? null : tmp1_safe_receiver.b1w_1, mode);
    var tmp2_safe_receiver = overrides.p1n_1;
    return color.e1w(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, color.k19_1.d1w(tmp_9, orOverride(color.k19_1.a1w_1, tmp2_safe_receiver == null ? null : tmp2_safe_receiver.c1w_1, mode)), applyOverrides_5(color.l19_1, overrides.q1n_1, mode, locked));
  }
  function applyOverrides(_this__u8e3s4, overrides, mode, locked) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    var tmp = orOverride(_this__u8e3s4.w18_1, overrides == null ? null : overrides.v1o_1, mode, ColorTokenPath_SurfaceDefault_getInstance(), locked);
    var tmp_0 = orOverride(_this__u8e3s4.x18_1, overrides == null ? null : overrides.w1o_1, mode, ColorTokenPath_SurfaceElevated_getInstance(), locked);
    var tmp_1 = orOverride(_this__u8e3s4.y18_1, overrides == null ? null : overrides.x1o_1, mode, ColorTokenPath_SurfaceRecessed_getInstance(), locked);
    return _this__u8e3s4.f1w(tmp, tmp_0, tmp_1, orOverride(_this__u8e3s4.z18_1, overrides == null ? null : overrides.y1o_1, mode, ColorTokenPath_SurfaceInverse_getInstance(), locked));
  }
  function applyOverrides_0(_this__u8e3s4, overrides, mode, locked) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    var tmp = orOverride(_this__u8e3s4.m19_1, overrides == null ? null : overrides.z1o_1, mode, ColorTokenPath_ContentDefault_getInstance(), locked);
    var tmp_0 = orOverride(_this__u8e3s4.n19_1, overrides == null ? null : overrides.a1p_1, mode, ColorTokenPath_ContentMuted_getInstance(), locked);
    return _this__u8e3s4.g1w(tmp, tmp_0, orOverride(_this__u8e3s4.o19_1, overrides == null ? null : overrides.b1p_1, mode, ColorTokenPath_ContentInverse_getInstance(), locked));
  }
  function applyOverrides_1(_this__u8e3s4, overrides, mode, locked) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    var tmp = orOverride(_this__u8e3s4.p19_1, overrides == null ? null : overrides.c1p_1, mode, ColorTokenPath_IconDefault_getInstance(), locked);
    var tmp_0 = orOverride(_this__u8e3s4.q19_1, overrides == null ? null : overrides.d1p_1, mode, ColorTokenPath_IconMuted_getInstance(), locked);
    return _this__u8e3s4.g1w(tmp, tmp_0, orOverride(_this__u8e3s4.r19_1, overrides == null ? null : overrides.e1p_1, mode, ColorTokenPath_IconInverse_getInstance(), locked));
  }
  function applyOverrides_2(_this__u8e3s4, overrides, mode, locked) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    var tmp = orOverride(_this__u8e3s4.s19_1, overrides == null ? null : overrides.f1p_1, mode, ColorTokenPath_BorderDefault_getInstance(), locked);
    var tmp_0 = orOverride(_this__u8e3s4.t19_1, overrides == null ? null : overrides.g1p_1, mode, ColorTokenPath_BorderMuted_getInstance(), locked);
    var tmp_1 = orOverride(_this__u8e3s4.u19_1, overrides == null ? null : overrides.h1p_1, mode, ColorTokenPath_BorderStrong_getInstance(), locked);
    return _this__u8e3s4.f1w(tmp, tmp_0, tmp_1, orOverride(_this__u8e3s4.v19_1, overrides == null ? null : overrides.i1p_1, mode, ColorTokenPath_BorderInverse_getInstance(), locked));
  }
  function applyOverrides_3(_this__u8e3s4, overrides, mode, locked) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    var tmp = orOverride(_this__u8e3s4.w19_1, overrides == null ? null : overrides.j1p_1, mode, ColorTokenPath_SelectionSurface_getInstance(), locked);
    var tmp_0 = orOverride(_this__u8e3s4.x19_1, overrides == null ? null : overrides.k1p_1, mode, ColorTokenPath_SelectionContent_getInstance(), locked);
    return _this__u8e3s4.g1w(tmp, tmp_0, orOverride(_this__u8e3s4.y19_1, overrides == null ? null : overrides.l1p_1, mode, ColorTokenPath_SelectionBorder_getInstance(), locked));
  }
  function orOverride(_this__u8e3s4, override, mode, path, locked) {
    path = path === VOID ? null : path;
    locked = locked === VOID ? null : locked;
    _init_properties_ColorOverrideApplication_kt__e4178f();
    var tmp0_elvis_lhs = forMode(override, mode);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return _this__u8e3s4;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var value = tmp;
    if (!(path == null) && !(locked == null)) {
      // Inline function 'kotlin.collections.plusAssign' call
      locked.f(path);
    }
    return value;
  }
  function applyOverrides_4(_this__u8e3s4, overrides, pathOf, mode, locked) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    var tmp = orOverride(_this__u8e3s4.a1a_1, overrides == null ? null : overrides.n1p_1, mode, pathOf('Surface'), locked);
    var tmp_0 = orOverride(_this__u8e3s4.b1a_1, overrides == null ? null : overrides.o1p_1, mode, pathOf('Content'), locked);
    var tmp_1 = orOverride(_this__u8e3s4.c1a_1, overrides == null ? null : overrides.p1p_1, mode, pathOf('Border'), locked);
    return _this__u8e3s4.f1w(tmp, tmp_0, tmp_1, orOverride(_this__u8e3s4.d1a_1, overrides == null ? null : overrides.q1p_1, mode, pathOf('Icon'), locked));
  }
  function applyOverrides_5(_this__u8e3s4, overrides, mode, locked) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    var tmp = orOverride(_this__u8e3s4.e1a_1, overrides == null ? null : overrides.r1p_1, mode, ColorTokenPath_BrandPrimary_getInstance(), locked);
    var tmp_0 = orOverride(_this__u8e3s4.f1a_1, overrides == null ? null : overrides.s1p_1, mode, ColorTokenPath_BrandSecondary_getInstance(), locked);
    var tmp_1 = orOverride(_this__u8e3s4.g1a_1, overrides == null ? null : overrides.t1p_1, mode, ColorTokenPath_BrandTertiary_getInstance(), locked);
    return _this__u8e3s4.h1w(tmp, tmp_0, tmp_1, orOverride(_this__u8e3s4.h1a_1, overrides == null ? null : overrides.u1p_1, mode, ColorTokenPath_BrandQuaternary_getInstance(), locked));
  }
  function POSITIVE$lambda(role) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    return valueOf('Positive' + role);
  }
  function NEGATIVE$lambda(role) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    return valueOf('Negative' + role);
  }
  function CAUTION$lambda(role) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    return valueOf('Caution' + role);
  }
  function INFO$lambda(role) {
    _init_properties_ColorOverrideApplication_kt__e4178f();
    return valueOf('Info' + role);
  }
  var properties_initialized_ColorOverrideApplication_kt_5p47kz;
  function _init_properties_ColorOverrideApplication_kt__e4178f() {
    if (!properties_initialized_ColorOverrideApplication_kt_5p47kz) {
      properties_initialized_ColorOverrideApplication_kt_5p47kz = true;
      POSITIVE = POSITIVE$lambda;
      NEGATIVE = NEGATIVE$lambda;
      CAUTION = CAUTION$lambda;
      INFO = INFO$lambda;
    }
  }
  function ControlStage() {
  }
  protoOf(ControlStage).x1r = function (context, mode) {
    var tmp0_safe_receiver = context.q1q_1.i1r_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m1g_1;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var overrides = tmp;
    // Inline function 'kotlin.requireNotNull' call
    var tmp0 = context.z1q_1.t1(mode);
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Required value was null.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = tmp0;
        break $l$block;
      }
    }
    var draft = tmp$ret$1;
    // Inline function 'kotlin.collections.mutableSetOf' call
    var locked = LinkedHashSet_init_$Create$();
    var withFamilyOverrides = draft.y1s(VOID, applyColorOverrides(draft.z1r_1, overrides.x1m_1, mode, locked), applyTypographyOverrides(draft.a1s_1, overrides), applySpacingOverrides(draft.b1s_1, overrides), applyRadiusOverrides(draft.c1s_1, overrides), applyDepthOverrides(draft.d1s_1, overrides.b1n_1, mode), VOID, applyMotionOverrides(draft.f1s_1, overrides));
    var tmp0_0 = context.z1q_1;
    // Inline function 'kotlin.collections.set' call
    var value = applyPathOverrides(withFamilyOverrides, overrides.e1n_1, mode, context.a1r_1);
    tmp0_0.x1(mode, value);
  };
  var ControlStage_instance;
  function ControlStage_getInstance() {
    return ControlStage_instance;
  }
  function applyMotionOverrides(motion, overrides) {
    var tmp1_elvis_lhs = overrides == null ? null : overrides.d1n_1;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      return motion;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var patch = tmp;
    return motion.o1w(applyPatch(motion.m1b_1, patch.i1w_1), applyPatch(motion.n1b_1, patch.j1w_1), applyPatch(motion.o1b_1, patch.k1w_1), applyPatch(motion.p1b_1, patch.l1w_1), applyPatch(motion.q1b_1, patch.m1w_1), applyPatch(motion.r1b_1, patch.n1w_1));
  }
  function applyPatch(_this__u8e3s4, patch) {
    if (patch == null) {
      return _this__u8e3s4;
    }
    var tmp0_elvis_lhs = patch.p1w_1;
    var tmp;
    var tmp_0 = tmp0_elvis_lhs;
    if ((tmp_0 == null ? null : new DurationValue(tmp_0)) == null) {
      tmp = _this__u8e3s4.u1f_1;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tmp_1 = tmp;
    var tmp1_elvis_lhs = patch.q1w_1;
    var tmp_2 = tmp1_elvis_lhs == null ? _this__u8e3s4.v1f_1 : tmp1_elvis_lhs;
    var tmp2_elvis_lhs = patch.r1w_1;
    var tmp_3;
    var tmp_4 = tmp2_elvis_lhs;
    if ((tmp_4 == null ? null : new DurationValue(tmp_4)) == null) {
      tmp_3 = _this__u8e3s4.w1f_1;
    } else {
      tmp_3 = tmp2_elvis_lhs;
    }
    var tmp_5 = tmp_3;
    var tmp3_elvis_lhs = patch.s1w_1;
    return _this__u8e3s4.y1f(tmp_1, tmp_2, tmp_5, tmp3_elvis_lhs == null ? _this__u8e3s4.x1f_1 : tmp3_elvis_lhs);
  }
  function forMode(_this__u8e3s4, mode) {
    if (_this__u8e3s4 == null) {
      return null;
    }
    var tmp;
    if (_this__u8e3s4 instanceof Both) {
      tmp = _this__u8e3s4.m1l_1;
    } else {
      if (_this__u8e3s4 instanceof LightOnly) {
        // Inline function 'kotlin.takeIf' call
        var this_0 = _this__u8e3s4.r1l_1;
        var tmp_0;
        if (mode.equals(ThemeMode_Light_getInstance())) {
          tmp_0 = this_0;
        } else {
          tmp_0 = null;
        }
        tmp = tmp_0;
      } else {
        if (_this__u8e3s4 instanceof DarkOnly) {
          // Inline function 'kotlin.takeIf' call
          var this_1 = _this__u8e3s4.w1l_1;
          var tmp_1;
          if (mode.equals(ThemeMode_Dark_getInstance())) {
            tmp_1 = this_1;
          } else {
            tmp_1 = null;
          }
          tmp = tmp_1;
        } else {
          if (_this__u8e3s4 instanceof Split) {
            var tmp_2;
            if (mode.equals(ThemeMode_Light_getInstance())) {
              tmp_2 = _this__u8e3s4.b1m_1;
            } else {
              tmp_2 = _this__u8e3s4.c1m_1;
            }
            tmp = tmp_2;
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    return tmp;
  }
  function applyPathOverrides(draft, paths, mode, entries) {
    var current = draft;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = paths.w1().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var path = element.p1();
      // Inline function 'kotlin.collections.component2' call
      var value = element.q1();
      current = applyPath(current, path, value, mode, entries);
    }
    return current;
  }
  function applyPath(draft, path, value, mode, entries) {
    var tmp;
    if (value instanceof Color) {
      tmp = applyColorPath(draft, path, value, mode, entries);
    } else {
      if (value instanceof Dp) {
        tmp = applyDpPath(draft, path, value, entries);
      } else {
        if (value instanceof Depth) {
          tmp = applyDepthPath(draft, path, value, entries);
        } else {
          if (value instanceof Motion) {
            tmp = applyMotionPath(draft, path, value, entries);
          } else {
            if (value instanceof Typography) {
              tmp = applyTypographyPath(draft, path, value, entries);
            } else {
              noWhenBranchMatchedException();
            }
          }
        }
      }
    }
    return tmp;
  }
  function applyColorPath(draft, path, value, mode, entries) {
    var tmp0 = get_entries();
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (element.v18_1 === path) {
          tmp$ret$0 = element;
          break $l$block;
        }
      }
      tmp$ret$0 = null;
    }
    var token = tmp$ret$0;
    if (token == null) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element_0 = unknownPath(path);
      entries.f(element_0);
      return draft;
    }
    var resolved = forMode(value.g1m_1, mode);
    if (resolved == null) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element_1 = skippedPath(path);
      entries.f(element_1);
      return draft;
    }
    return draft.y1s(VOID, replaceToken(draft.z1r_1, token, resolved));
  }
  function applyDpPath(draft, path, value, entries) {
    var tmp0 = get_entries_5();
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (element.j1c_1 === path) {
          tmp$ret$0 = element;
          break $l$block;
        }
      }
      tmp$ret$0 = null;
    }
    var spacingPath = tmp$ret$0;
    if (!(spacingPath == null)) {
      return draft.y1s(VOID, VOID, VOID, replaceSpacing(draft.b1s_1, spacingPath, value.j1m_1));
    }
    var tmp0_0 = get_entries_4();
    var tmp$ret$2;
    $l$block_0: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s_0 = tmp0_0.j();
      while (_iterator__ex2g4s_0.k()) {
        var element_0 = _iterator__ex2g4s_0.l();
        if (element_0.v1b_1 === path) {
          tmp$ret$2 = element_0;
          break $l$block_0;
        }
      }
      tmp$ret$2 = null;
    }
    var radiusPath = tmp$ret$2;
    if (!(radiusPath == null)) {
      return draft.y1s(VOID, VOID, VOID, VOID, replaceRadius(draft.c1s_1, radiusPath, value.j1m_1));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    var element_1 = unknownPath(path);
    entries.f(element_1);
    return draft;
  }
  function applyDepthPath(draft, path, value, entries) {
    var tmp0 = get_entries_1();
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (element.u1a_1 === path) {
          tmp$ret$0 = element;
          break $l$block;
        }
      }
      tmp$ret$0 = null;
    }
    var token = tmp$ret$0;
    if (token == null) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element_0 = unknownPath(path);
      entries.f(element_0);
      return draft;
    }
    return draft.y1s(VOID, VOID, VOID, VOID, VOID, replaceDepth(draft.d1s_1, token, value.s1m_1));
  }
  function applyMotionPath(draft, path, value, entries) {
    var tmp0 = get_entries_3();
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (element.l1b_1 === path) {
          tmp$ret$0 = element;
          break $l$block;
        }
      }
      tmp$ret$0 = null;
    }
    var token = tmp$ret$0;
    if (token == null) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element_0 = unknownPath(path);
      entries.f(element_0);
      return draft;
    }
    return draft.y1s(VOID, VOID, VOID, VOID, VOID, VOID, VOID, replaceMotion(draft.f1s_1, token, value.p1m_1));
  }
  function applyTypographyPath(draft, path, value, entries) {
    var tmp0 = get_entries_6();
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (element.v1c_1 === path) {
          tmp$ret$0 = element;
          break $l$block;
        }
      }
      tmp$ret$0 = null;
    }
    var token = tmp$ret$0;
    if (token == null) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element_0 = unknownPath(path);
      entries.f(element_0);
      return draft;
    }
    return draft.y1s(VOID, VOID, replaceRole(draft.a1s_1, token, value.m1m_1));
  }
  function unknownPath(path) {
    return new ReportEntry(path, ResolutionStage_Control_getInstance(), ReportStatus_Rejected_getInstance(), 'Override path does not address a known token.');
  }
  function skippedPath(path) {
    return new ReportEntry(path, ResolutionStage_Control_getInstance(), ReportStatus_Rejected_getInstance(), 'Override value is scoped to a mode that was not generated.');
  }
  function replaceSpacing(spacing, path, value) {
    return spacing.t1w(path.equals(SpacingTokenPath_Level1_getInstance()) ? value : spacing.k1c_1, path.equals(SpacingTokenPath_Level2_getInstance()) ? value : spacing.l1c_1, path.equals(SpacingTokenPath_Level3_getInstance()) ? value : spacing.m1c_1, path.equals(SpacingTokenPath_Level4_getInstance()) ? value : spacing.n1c_1, path.equals(SpacingTokenPath_Level5_getInstance()) ? value : spacing.o1c_1, path.equals(SpacingTokenPath_Level6_getInstance()) ? value : spacing.p1c_1, path.equals(SpacingTokenPath_Level7_getInstance()) ? value : spacing.q1c_1, path.equals(SpacingTokenPath_Level8_getInstance()) ? value : spacing.r1c_1);
  }
  function replaceRadius(radius, path, value) {
    return radius.u1w(path.equals(RadiusTokenPath_None_getInstance()) ? value : radius.w1b_1, path.equals(RadiusTokenPath_Level1_getInstance()) ? value : radius.x1b_1, path.equals(RadiusTokenPath_Level2_getInstance()) ? value : radius.y1b_1, path.equals(RadiusTokenPath_Level3_getInstance()) ? value : radius.z1b_1, path.equals(RadiusTokenPath_Level4_getInstance()) ? value : radius.a1c_1, path.equals(RadiusTokenPath_Level5_getInstance()) ? value : radius.b1c_1, path.equals(RadiusTokenPath_Level6_getInstance()) ? value : radius.c1c_1, path.equals(RadiusTokenPath_Level7_getInstance()) ? value : radius.d1c_1, path.equals(RadiusTokenPath_Level8_getInstance()) ? value : radius.e1c_1, path.equals(RadiusTokenPath_Full_getInstance()) ? value : radius.f1c_1);
  }
  function replaceDepth(depth, path, value) {
    return depth.v1w(path.equals(DepthTokenPath_Level1_getInstance()) ? value : depth.v1a_1, path.equals(DepthTokenPath_Level2_getInstance()) ? value : depth.w1a_1, path.equals(DepthTokenPath_Level3_getInstance()) ? value : depth.x1a_1, path.equals(DepthTokenPath_Level4_getInstance()) ? value : depth.y1a_1);
  }
  function replaceMotion(motion, path, value) {
    return motion.o1w(path.equals(MotionTokenPath_Feedback_getInstance()) ? value : motion.m1b_1, path.equals(MotionTokenPath_StateTransition_getInstance()) ? value : motion.n1b_1, path.equals(MotionTokenPath_Transformation_getInstance()) ? value : motion.o1b_1, path.equals(MotionTokenPath_Expansion_getInstance()) ? value : motion.p1b_1, path.equals(MotionTokenPath_Reposition_getInstance()) ? value : motion.q1b_1, path.equals(MotionTokenPath_Emphasis_getInstance()) ? value : motion.r1b_1);
  }
  function replaceRole(typography, path, value) {
    return typography.w1w(replaceStructure(typography.c1d_1, path, value), replaceContent(typography.d1d_1, path, value), replaceMetadata(typography.e1d_1, path, value));
  }
  function replaceStructure(structure, path, value) {
    return structure.x1w(path.equals(TypographyTokenPath_StructureLevel1_getInstance()) ? value : structure.w1c_1, path.equals(TypographyTokenPath_StructureLevel2_getInstance()) ? value : structure.x1c_1, path.equals(TypographyTokenPath_StructureLevel3_getInstance()) ? value : structure.y1c_1, path.equals(TypographyTokenPath_StructureLevel4_getInstance()) ? value : structure.z1c_1, path.equals(TypographyTokenPath_StructureLevel5_getInstance()) ? value : structure.a1d_1, path.equals(TypographyTokenPath_StructureLevel6_getInstance()) ? value : structure.b1d_1);
  }
  function replaceContent(content, path, value) {
    return content.y1w(path.equals(TypographyTokenPath_ContentLevel1_getInstance()) ? value : content.f1d_1, path.equals(TypographyTokenPath_ContentLevel2_getInstance()) ? value : content.g1d_1, path.equals(TypographyTokenPath_ContentLevel3_getInstance()) ? value : content.h1d_1, path.equals(TypographyTokenPath_ContentLevel4_getInstance()) ? value : content.i1d_1, path.equals(TypographyTokenPath_ContentLevel5_getInstance()) ? value : content.j1d_1);
  }
  function replaceMetadata(metadata, path, value) {
    return metadata.z1w(path.equals(TypographyTokenPath_MetadataLevel1_getInstance()) ? value : metadata.k1d_1, path.equals(TypographyTokenPath_MetadataLevel2_getInstance()) ? value : metadata.l1d_1, path.equals(TypographyTokenPath_MetadataLevel3_getInstance()) ? value : metadata.m1d_1);
  }
  function applySpacingOverrides(spacing, overrides) {
    var tmp1_elvis_lhs = overrides == null ? null : overrides.z1m_1;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      return spacing;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var patch = tmp;
    var tmp2_elvis_lhs = patch.r1n_1;
    var tmp_0;
    var tmp_1 = tmp2_elvis_lhs;
    if ((tmp_1 == null ? null : new DpValue(tmp_1)) == null) {
      tmp_0 = spacing.k1c_1;
    } else {
      tmp_0 = tmp2_elvis_lhs;
    }
    var tmp_2 = tmp_0;
    var tmp3_elvis_lhs = patch.s1n_1;
    var tmp_3;
    var tmp_4 = tmp3_elvis_lhs;
    if ((tmp_4 == null ? null : new DpValue(tmp_4)) == null) {
      tmp_3 = spacing.l1c_1;
    } else {
      tmp_3 = tmp3_elvis_lhs;
    }
    var tmp_5 = tmp_3;
    var tmp4_elvis_lhs = patch.t1n_1;
    var tmp_6;
    var tmp_7 = tmp4_elvis_lhs;
    if ((tmp_7 == null ? null : new DpValue(tmp_7)) == null) {
      tmp_6 = spacing.m1c_1;
    } else {
      tmp_6 = tmp4_elvis_lhs;
    }
    var tmp_8 = tmp_6;
    var tmp5_elvis_lhs = patch.u1n_1;
    var tmp_9;
    var tmp_10 = tmp5_elvis_lhs;
    if ((tmp_10 == null ? null : new DpValue(tmp_10)) == null) {
      tmp_9 = spacing.n1c_1;
    } else {
      tmp_9 = tmp5_elvis_lhs;
    }
    var tmp_11 = tmp_9;
    var tmp6_elvis_lhs = patch.v1n_1;
    var tmp_12;
    var tmp_13 = tmp6_elvis_lhs;
    if ((tmp_13 == null ? null : new DpValue(tmp_13)) == null) {
      tmp_12 = spacing.o1c_1;
    } else {
      tmp_12 = tmp6_elvis_lhs;
    }
    var tmp_14 = tmp_12;
    var tmp7_elvis_lhs = patch.w1n_1;
    var tmp_15;
    var tmp_16 = tmp7_elvis_lhs;
    if ((tmp_16 == null ? null : new DpValue(tmp_16)) == null) {
      tmp_15 = spacing.p1c_1;
    } else {
      tmp_15 = tmp7_elvis_lhs;
    }
    var tmp_17 = tmp_15;
    var tmp8_elvis_lhs = patch.x1n_1;
    var tmp_18;
    var tmp_19 = tmp8_elvis_lhs;
    if ((tmp_19 == null ? null : new DpValue(tmp_19)) == null) {
      tmp_18 = spacing.q1c_1;
    } else {
      tmp_18 = tmp8_elvis_lhs;
    }
    var tmp_20 = tmp_18;
    var tmp9_elvis_lhs = patch.y1n_1;
    var tmp_21;
    var tmp_22 = tmp9_elvis_lhs;
    if ((tmp_22 == null ? null : new DpValue(tmp_22)) == null) {
      tmp_21 = spacing.r1c_1;
    } else {
      tmp_21 = tmp9_elvis_lhs;
    }
    return spacing.t1w(tmp_2, tmp_5, tmp_8, tmp_11, tmp_14, tmp_17, tmp_20, tmp_21);
  }
  function applyRadiusOverrides(radius, overrides) {
    var tmp1_elvis_lhs = overrides == null ? null : overrides.a1n_1;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      return radius;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var patch = tmp;
    var tmp2_elvis_lhs = patch.z1n_1;
    var tmp_0;
    var tmp_1 = tmp2_elvis_lhs;
    if ((tmp_1 == null ? null : new DpValue(tmp_1)) == null) {
      tmp_0 = radius.x1b_1;
    } else {
      tmp_0 = tmp2_elvis_lhs;
    }
    var tmp_2 = tmp_0;
    var tmp3_elvis_lhs = patch.a1o_1;
    var tmp_3;
    var tmp_4 = tmp3_elvis_lhs;
    if ((tmp_4 == null ? null : new DpValue(tmp_4)) == null) {
      tmp_3 = radius.y1b_1;
    } else {
      tmp_3 = tmp3_elvis_lhs;
    }
    var tmp_5 = tmp_3;
    var tmp4_elvis_lhs = patch.b1o_1;
    var tmp_6;
    var tmp_7 = tmp4_elvis_lhs;
    if ((tmp_7 == null ? null : new DpValue(tmp_7)) == null) {
      tmp_6 = radius.z1b_1;
    } else {
      tmp_6 = tmp4_elvis_lhs;
    }
    var tmp_8 = tmp_6;
    var tmp5_elvis_lhs = patch.c1o_1;
    var tmp_9;
    var tmp_10 = tmp5_elvis_lhs;
    if ((tmp_10 == null ? null : new DpValue(tmp_10)) == null) {
      tmp_9 = radius.a1c_1;
    } else {
      tmp_9 = tmp5_elvis_lhs;
    }
    var tmp_11 = tmp_9;
    var tmp6_elvis_lhs = patch.d1o_1;
    var tmp_12;
    var tmp_13 = tmp6_elvis_lhs;
    if ((tmp_13 == null ? null : new DpValue(tmp_13)) == null) {
      tmp_12 = radius.b1c_1;
    } else {
      tmp_12 = tmp6_elvis_lhs;
    }
    var tmp_14 = tmp_12;
    var tmp7_elvis_lhs = patch.e1o_1;
    var tmp_15;
    var tmp_16 = tmp7_elvis_lhs;
    if ((tmp_16 == null ? null : new DpValue(tmp_16)) == null) {
      tmp_15 = radius.c1c_1;
    } else {
      tmp_15 = tmp7_elvis_lhs;
    }
    var tmp_17 = tmp_15;
    var tmp8_elvis_lhs = patch.f1o_1;
    var tmp_18;
    var tmp_19 = tmp8_elvis_lhs;
    if ((tmp_19 == null ? null : new DpValue(tmp_19)) == null) {
      tmp_18 = radius.d1c_1;
    } else {
      tmp_18 = tmp8_elvis_lhs;
    }
    var tmp_20 = tmp_18;
    var tmp9_elvis_lhs = patch.g1o_1;
    var tmp_21;
    var tmp_22 = tmp9_elvis_lhs;
    if ((tmp_22 == null ? null : new DpValue(tmp_22)) == null) {
      tmp_21 = radius.e1c_1;
    } else {
      tmp_21 = tmp9_elvis_lhs;
    }
    return radius.a1x(VOID, tmp_2, tmp_5, tmp_8, tmp_11, tmp_14, tmp_17, tmp_20, tmp_21);
  }
  function applyDepthOverrides(depth, overrides, mode) {
    if (overrides == null) {
      return depth;
    }
    return depth.v1w(applyPatch_0(depth.v1a_1, overrides.b1x_1, mode), applyPatch_0(depth.w1a_1, overrides.c1x_1, mode), applyPatch_0(depth.x1a_1, overrides.d1x_1, mode), applyPatch_0(depth.y1a_1, overrides.e1x_1, mode));
  }
  function applyPatch_0(_this__u8e3s4, patch, mode) {
    if (patch == null) {
      return _this__u8e3s4;
    }
    var tmp0_elvis_lhs = patch.f1x_1;
    var tmp;
    var tmp_0 = tmp0_elvis_lhs;
    if ((tmp_0 == null ? null : new DpValue(tmp_0)) == null) {
      tmp = _this__u8e3s4.j1x_1;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tmp_1 = tmp;
    var tmp1_elvis_lhs = forMode(patch.g1x_1, mode);
    var tmp_2 = tmp1_elvis_lhs == null ? _this__u8e3s4.k1x_1 : tmp1_elvis_lhs;
    var tmp2_elvis_lhs = patch.h1x_1;
    var tmp_3;
    var tmp_4 = tmp2_elvis_lhs;
    if ((tmp_4 == null ? null : new DpValue(tmp_4)) == null) {
      tmp_3 = _this__u8e3s4.l1x_1;
    } else {
      tmp_3 = tmp2_elvis_lhs;
    }
    var tmp_5 = tmp_3;
    var tmp3_elvis_lhs = patch.i1x_1;
    var tmp_6;
    var tmp_7 = tmp3_elvis_lhs;
    if ((tmp_7 == null ? null : new DpValue(tmp_7)) == null) {
      tmp_6 = _this__u8e3s4.m1x_1;
    } else {
      tmp_6 = tmp3_elvis_lhs;
    }
    return _this__u8e3s4.n1x(tmp_1, tmp_2, tmp_5, tmp_6);
  }
  function applyTypographyOverrides(typography, overrides) {
    var tmp1_elvis_lhs = overrides == null ? null : overrides.y1m_1;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      return typography;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var patch = tmp;
    return typography.w1w(applyOverrides_6(typography.c1d_1, patch.o1x_1), applyOverrides_7(typography.d1d_1, patch.p1x_1), applyOverrides_8(typography.e1d_1, patch.q1x_1));
  }
  function applyOverrides_6(_this__u8e3s4, overrides) {
    if (overrides == null) {
      return _this__u8e3s4;
    }
    return _this__u8e3s4.x1w(applyPatch_1(_this__u8e3s4.w1c_1, overrides.r1x_1), applyPatch_1(_this__u8e3s4.x1c_1, overrides.s1x_1), applyPatch_1(_this__u8e3s4.y1c_1, overrides.t1x_1), applyPatch_1(_this__u8e3s4.z1c_1, overrides.u1x_1), applyPatch_1(_this__u8e3s4.a1d_1, overrides.v1x_1), applyPatch_1(_this__u8e3s4.b1d_1, overrides.w1x_1));
  }
  function applyOverrides_7(_this__u8e3s4, overrides) {
    if (overrides == null) {
      return _this__u8e3s4;
    }
    return _this__u8e3s4.y1w(applyPatch_1(_this__u8e3s4.f1d_1, overrides.x1x_1), applyPatch_1(_this__u8e3s4.g1d_1, overrides.y1x_1), applyPatch_1(_this__u8e3s4.h1d_1, overrides.z1x_1), applyPatch_1(_this__u8e3s4.i1d_1, overrides.a1y_1), applyPatch_1(_this__u8e3s4.j1d_1, overrides.b1y_1));
  }
  function applyOverrides_8(_this__u8e3s4, overrides) {
    if (overrides == null) {
      return _this__u8e3s4;
    }
    return _this__u8e3s4.z1w(applyPatch_1(_this__u8e3s4.k1d_1, overrides.c1y_1), applyPatch_1(_this__u8e3s4.l1d_1, overrides.d1y_1), applyPatch_1(_this__u8e3s4.m1d_1, overrides.e1y_1));
  }
  function applyPatch_1(_this__u8e3s4, patch) {
    if (patch == null) {
      return _this__u8e3s4;
    }
    var tmp0_elvis_lhs = patch.f1y_1;
    var tmp = tmp0_elvis_lhs == null ? _this__u8e3s4.l1y_1 : tmp0_elvis_lhs;
    var tmp1_elvis_lhs = patch.g1y_1;
    var tmp_0;
    var tmp_1 = tmp1_elvis_lhs;
    if ((tmp_1 == null ? null : new SpValue(tmp_1)) == null) {
      tmp_0 = _this__u8e3s4.m1y_1;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var tmp_2 = tmp_0;
    var tmp2_elvis_lhs = patch.h1y_1;
    var tmp_3;
    var tmp_4 = tmp2_elvis_lhs;
    if ((tmp_4 == null ? null : new FontWeightValue(tmp_4)) == null) {
      tmp_3 = _this__u8e3s4.n1y_1;
    } else {
      tmp_3 = tmp2_elvis_lhs;
    }
    var tmp_5 = tmp_3;
    var tmp3_elvis_lhs = patch.i1y_1;
    var tmp_6;
    var tmp_7 = tmp3_elvis_lhs;
    if ((tmp_7 == null ? null : new LineHeightValue(tmp_7)) == null) {
      tmp_6 = _this__u8e3s4.o1y_1;
    } else {
      tmp_6 = tmp3_elvis_lhs;
    }
    var tmp_8 = tmp_6;
    var tmp4_elvis_lhs = patch.j1y_1;
    var tmp_9;
    var tmp_10 = tmp4_elvis_lhs;
    if ((tmp_10 == null ? null : new EmValue(tmp_10)) == null) {
      tmp_9 = _this__u8e3s4.p1y_1;
    } else {
      tmp_9 = tmp4_elvis_lhs;
    }
    var tmp_11 = tmp_9;
    var tmp5_elvis_lhs = patch.k1y_1;
    return _this__u8e3s4.r1y(tmp, tmp_2, tmp_5, tmp_8, tmp_11, tmp5_elvis_lhs == null ? _this__u8e3s4.q1y_1 : tmp5_elvis_lhs);
  }
  function deriveColorTokens(base, neutralHue, brand, tints, weights) {
    var tmp1_elvis_lhs = brand == null ? null : brand.e1a_1;
    var anchor = gamutMapped(tmp1_elvis_lhs == null ? base.l19_1.e1a_1 : tmp1_elvis_lhs);
    var surfaces = deriveSurfaces(base.a19_1, neutralHue, weights, anchor, tints);
    var tmp3_elvis_lhs = tints == null ? null : tints.v1y_1;
    var selectionTint = tmp3_elvis_lhs == null ? 0.0 : tmp3_elvis_lhs;
    var tmp = deriveContents(base.b19_1, surfaces, neutralHue, weights);
    var tmp_0 = deriveIcons(base.c19_1, surfaces, neutralHue, weights);
    var tmp_1 = deriveBorders(base.d19_1, neutralHue, weights, anchor, tints);
    var tmp_2 = deriveSelection(base.e19_1, surfaces, anchor, neutralHue, weights, selectionTint);
    var tmp_3 = deriveFocus(anchor, weights);
    var tmp_4 = deriveStatus(base.g19_1, weights);
    var tmp_5 = deriveStatus(base.h19_1, weights);
    var tmp_6 = deriveStatus(base.i19_1, weights);
    var tmp_7 = deriveStatus(base.j19_1, weights);
    var tmp_8 = deriveGradients(base, anchor, brand, weights);
    return new ColorTokens(surfaces, tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, mapBrandGamut(brand == null ? base.l19_1 : brand));
  }
  function deriveFocus(anchor, weights) {
    var chroma = (anchor.h1f_1 + 0.12 * weights.s1z_1) * weights.y1y_1;
    return new FocusColors(gamutMapped(safeOklch(anchor.g1f_1, chroma, anchor.i1f_1)));
  }
  function deriveGradients(base, anchor, brand, weights) {
    var fallbackHue = shiftHue(anchor.i1f_1, 28.0);
    var tmp1_elvis_lhs = brand == null ? null : brand.f1a_1;
    var second = gamutMapped((tmp1_elvis_lhs == null ? anchor.l1f(VOID, VOID, fallbackHue) : tmp1_elvis_lhs).l1f(VOID, anchor.h1f_1 * weights.y1y_1));
    return new GradientColors(verticalGradient(anchor, second), verticalGradient(base.a19_1.w18_1, base.a19_1.x18_1));
  }
  function mapBrandGamut(brand) {
    var primaryMapped = gamutMapped(brand.e1a_1);
    var tmp0_safe_receiver = brand.f1a_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : gamutMapped(tmp0_safe_receiver);
    var secondaryMapped = tmp1_elvis_lhs == null ? deriveHarmonicSecondary(primaryMapped) : tmp1_elvis_lhs;
    var tmp2_safe_receiver = brand.g1a_1;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : gamutMapped(tmp2_safe_receiver);
    var tertiaryMapped = tmp3_elvis_lhs == null ? deriveHarmonicTertiary(primaryMapped) : tmp3_elvis_lhs;
    var tmp4_safe_receiver = brand.h1a_1;
    var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : gamutMapped(tmp4_safe_receiver);
    var quaternaryMapped = tmp5_elvis_lhs == null ? deriveHarmonicQuaternary(primaryMapped) : tmp5_elvis_lhs;
    return new BrandColors(primaryMapped, secondaryMapped, tertiaryMapped, quaternaryMapped);
  }
  function verticalGradient(from, to) {
    return new OklchGradient(listOf([new OklchStop(from, 0.0), new OklchStop(to, 1.0)]), GradientDirection_Vertical_getInstance());
  }
  function deriveHarmonicSecondary(primary) {
    if (primary.h1f_1 <= 0.01)
      return null;
    var tmp0_h = shiftHue(primary.i1f_1, 35.0);
    var tmp1_c = toFloat32(coerceToFloat32(primary.h1f_1) * coerceToFloat32(0.85));
    return gamutMapped(primary.l1f(VOID, tmp1_c, tmp0_h));
  }
  function deriveHarmonicTertiary(primary) {
    if (primary.h1f_1 <= 0.01)
      return null;
    var tmp0_h = shiftHue(primary.i1f_1, 135.0);
    var tmp1_c = toFloat32(coerceToFloat32(primary.h1f_1) * coerceToFloat32(0.75));
    return gamutMapped(primary.l1f(VOID, tmp1_c, tmp0_h));
  }
  function deriveHarmonicQuaternary(primary) {
    if (primary.h1f_1 <= 0.01)
      return null;
    var tmp0_h = shiftHue(primary.i1f_1, 70.0);
    var tmp1_c = toFloat32(coerceToFloat32(primary.h1f_1) * coerceToFloat32(0.65));
    return gamutMapped(primary.l1f(VOID, tmp1_c, tmp0_h));
  }
  function deriveSurfaces(surfaces, neutralHue, weights, anchor, tints) {
    var tmp = neutral(surfaces.w18_1, neutralHue, weights);
    var tmp1_elvis_lhs = tints == null ? null : tints.s1y_1;
    var tmp_0 = tint(tmp, anchor, tmp1_elvis_lhs == null ? 0.0 : tmp1_elvis_lhs);
    var tmp_1 = neutral(surfaces.x18_1, neutralHue, weights);
    var tmp3_elvis_lhs = tints == null ? null : tints.t1y_1;
    return new SurfaceColors(tmp_0, tint(tmp_1, anchor, tmp3_elvis_lhs == null ? 0.0 : tmp3_elvis_lhs), neutral(surfaces.y18_1, neutralHue, weights), neutral(surfaces.z18_1, neutralHue, weights));
  }
  function deriveContents(contents, surfaces, neutralHue, weights) {
    return new ContentColors(scaleContent(contents.m19_1, surfaces.w18_1.g1f_1, neutralHue, weights), scaleContent(contents.n19_1, surfaces.w18_1.g1f_1, neutralHue, weights), scaleContent(contents.o19_1, surfaces.z18_1.g1f_1, neutralHue, weights));
  }
  function deriveIcons(icons, surfaces, neutralHue, weights) {
    return new IconColors(scaleContent(icons.p19_1, surfaces.w18_1.g1f_1, neutralHue, weights), scaleContent(icons.q19_1, surfaces.w18_1.g1f_1, neutralHue, weights), scaleContent(icons.r19_1, surfaces.z18_1.g1f_1, neutralHue, weights));
  }
  function deriveBorders(borders, neutralHue, weights, anchor, tints) {
    var tmp = strengthen(borders.s19_1, neutralHue, weights);
    var tmp_0 = strengthen(borders.t19_1, neutralHue, weights);
    var tmp_1 = strengthen(borders.u19_1, neutralHue, weights);
    var tmp1_elvis_lhs = tints == null ? null : tints.u1y_1;
    return new BorderColors(tmp, tmp_0, tint(tmp_1, anchor, tmp1_elvis_lhs == null ? 0.0 : tmp1_elvis_lhs), strengthen(borders.v19_1, neutralHue, weights));
  }
  function deriveSelection(selection, surfaces, anchor, neutralHue, weights, tint_0) {
    return new SelectionColors(tint(selection.w19_1, anchor, tint_0), scaleContent(selection.x19_1, surfaces.w18_1.g1f_1, neutralHue, weights), tint(selection.y19_1, anchor, tint_0));
  }
  function deriveStatus(status, weights) {
    var scale = weights.t1z();
    return new StatusColors(status.a1a_1.l1f(VOID, status.a1a_1.h1f_1 * scale), status.b1a_1.l1f(VOID, status.b1a_1.h1f_1 * scale), status.c1a_1.l1f(VOID, status.c1a_1.h1f_1 * scale), status.d1a_1.l1f(VOID, status.d1a_1.h1f_1 * scale));
  }
  function tint(color, anchor, amount) {
    return gamutMapped(mixOklch(color, anchor, amount));
  }
  function neutral(color, neutralHue, weights) {
    return safeOklch(color.g1f_1, color.h1f_1 * weights.z1y_1, neutralHue, color.j1f_1);
  }
  function scaleContent(color, surfaceL, neutralHue, weights) {
    var scaled = neutral(color, neutralHue, weights);
    var delta = (surfaceL - scaled.g1f_1) * weights.a1z_1;
    return safeOklch(surfaceL - delta, scaled.h1f_1, neutralHue, color.j1f_1);
  }
  function strengthen(color, neutralHue, weights) {
    return safeOklch(color.g1f_1, color.h1f_1 * weights.u1z(), neutralHue, color.j1f_1);
  }
  function DerivationWeights(neutralHueShiftDegrees, brandDerivativeMaxShiftDegrees, accentChromaScale, neutralChromaScale, lightnessDeltaScale, borderStrengthScale, statusChromaScale, clarityBorderScale, spacingScale, radiusScale, depthScale, controlScale, avatarScale, iconDotScale, structureDisplayScale, typeRatioScale, contentBodyScale, structureTrackingScale, structureWeightBias, durationScale, emphasisBoost, ctaEmphasis, focusEmphasis) {
    this.w1y_1 = neutralHueShiftDegrees;
    this.x1y_1 = brandDerivativeMaxShiftDegrees;
    this.y1y_1 = accentChromaScale;
    this.z1y_1 = neutralChromaScale;
    this.a1z_1 = lightnessDeltaScale;
    this.b1z_1 = borderStrengthScale;
    this.c1z_1 = statusChromaScale;
    this.d1z_1 = clarityBorderScale;
    this.e1z_1 = spacingScale;
    this.f1z_1 = radiusScale;
    this.g1z_1 = depthScale;
    this.h1z_1 = controlScale;
    this.i1z_1 = avatarScale;
    this.j1z_1 = iconDotScale;
    this.k1z_1 = structureDisplayScale;
    this.l1z_1 = typeRatioScale;
    this.m1z_1 = contentBodyScale;
    this.n1z_1 = structureTrackingScale;
    this.o1z_1 = structureWeightBias;
    this.p1z_1 = durationScale;
    this.q1z_1 = emphasisBoost;
    this.r1z_1 = ctaEmphasis;
    this.s1z_1 = focusEmphasis;
  }
  protoOf(DerivationWeights).u1z = function () {
    return this.b1z_1 * this.d1z_1;
  };
  protoOf(DerivationWeights).t1z = function () {
    return this.y1y_1 * this.c1z_1;
  };
  protoOf(DerivationWeights).toString = function () {
    return 'DerivationWeights(neutralHueShiftDegrees=' + this.w1y_1 + ', brandDerivativeMaxShiftDegrees=' + this.x1y_1 + ', accentChromaScale=' + this.y1y_1 + ', neutralChromaScale=' + this.z1y_1 + ', lightnessDeltaScale=' + this.a1z_1 + ', borderStrengthScale=' + this.b1z_1 + ', statusChromaScale=' + this.c1z_1 + ', clarityBorderScale=' + this.d1z_1 + ', spacingScale=' + this.e1z_1 + ', radiusScale=' + this.f1z_1 + ', depthScale=' + this.g1z_1 + ', controlScale=' + this.h1z_1 + ', avatarScale=' + this.i1z_1 + ', iconDotScale=' + this.j1z_1 + ', structureDisplayScale=' + this.k1z_1 + ', typeRatioScale=' + this.l1z_1 + ', contentBodyScale=' + this.m1z_1 + ', structureTrackingScale=' + this.n1z_1 + ', structureWeightBias=' + this.o1z_1 + ', durationScale=' + this.p1z_1 + ', emphasisBoost=' + this.q1z_1 + ', ctaEmphasis=' + this.r1z_1 + ', focusEmphasis=' + this.s1z_1 + ')';
  };
  protoOf(DerivationWeights).hashCode = function () {
    var result = getNumberHashCode(this.w1y_1);
    result = imul(result, 31) + getNumberHashCode(this.x1y_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.y1y_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.z1y_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.a1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.b1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.c1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.d1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.e1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.f1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.g1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.h1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.i1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.j1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.k1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.l1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.m1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.n1z_1) | 0;
    result = imul(result, 31) + this.o1z_1 | 0;
    result = imul(result, 31) + getNumberHashCode(this.p1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.q1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.r1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.s1z_1) | 0;
    return result;
  };
  protoOf(DerivationWeights).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DerivationWeights))
      return false;
    if (!equals(this.w1y_1, other.w1y_1))
      return false;
    if (!equals(this.x1y_1, other.x1y_1))
      return false;
    if (!equals(this.y1y_1, other.y1y_1))
      return false;
    if (!equals(this.z1y_1, other.z1y_1))
      return false;
    if (!equals(this.a1z_1, other.a1z_1))
      return false;
    if (!equals(this.b1z_1, other.b1z_1))
      return false;
    if (!equals(this.c1z_1, other.c1z_1))
      return false;
    if (!equals(this.d1z_1, other.d1z_1))
      return false;
    if (!equals(this.e1z_1, other.e1z_1))
      return false;
    if (!equals(this.f1z_1, other.f1z_1))
      return false;
    if (!equals(this.g1z_1, other.g1z_1))
      return false;
    if (!equals(this.h1z_1, other.h1z_1))
      return false;
    if (!equals(this.i1z_1, other.i1z_1))
      return false;
    if (!equals(this.j1z_1, other.j1z_1))
      return false;
    if (!equals(this.k1z_1, other.k1z_1))
      return false;
    if (!equals(this.l1z_1, other.l1z_1))
      return false;
    if (!equals(this.m1z_1, other.m1z_1))
      return false;
    if (!equals(this.n1z_1, other.n1z_1))
      return false;
    if (!(this.o1z_1 === other.o1z_1))
      return false;
    if (!equals(this.p1z_1, other.p1z_1))
      return false;
    if (!equals(this.q1z_1, other.q1z_1))
      return false;
    if (!equals(this.r1z_1, other.r1z_1))
      return false;
    if (!equals(this.s1z_1, other.s1z_1))
      return false;
    return true;
  };
  function calculateDerivationWeights(profile) {
    var densityT = (profile.c1t_1 + 1.0) / 2.0;
    var roundnessT = (profile.d1t_1 + 1.0) / 2.0;
    var motionT = (profile.f1t_1 + 1.0) / 2.0;
    var tmp = coerceToFloat32(profile.z1s_1 * 25.0);
    var tmp_0 = coerceToFloat32(profile.z1s_1 * 6.0);
    var tmp_1 = coerceToFloat32(calculateAccentChroma(profile.a1t_1, profile.b1t_1));
    var tmp_2 = coerceToFloat32(1.0 + profile.a1t_1 * 0.15);
    var tmp_3 = coerceToFloat32(calculateLightnessDelta(profile.b1t_1, profile.a1t_1));
    var tmp_4 = coerceToFloat32(1.0 + profile.b1t_1 * 0.2);
    var tmp_5 = coerceToFloat32(1.0 + profile.k1t_1 * 0.25);
    var tmp_6 = coerceToFloat32(1.0 + profile.j1t_1 * 0.25);
    var tmp_7 = coerceToFloat32(lerp(1.16, 0.84, smoothstep(densityT)));
    // Inline function 'kotlin.math.pow' call
    var this_0 = coerceIn(roundnessT, 0.0, 1.0);
    var tmp$ret$0 = Math.pow(this_0, 0.6);
    var tmp_8 = coerceToFloat32(lerp(0.5, 1.55, tmp$ret$0));
    var tmp_9 = coerceToFloat32(calculateDepthScale(profile.b1t_1, profile.i1t_1, profile.g1t_1));
    // Inline function 'kotlin.math.sqrt' call
    var x = coerceAtLeast(profile.o1t_1, 0.0);
    var tmp$ret$1 = Math.sqrt(x);
    return new DerivationWeights(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, tmp_9, coerceToFloat32(1.0 + tmp$ret$1 * 0.08 - profile.c1t_1 * 0.04), coerceToFloat32(1.0 + profile.m1t_1 * 0.12), coerceToFloat32(1.0 - profile.c1t_1 * 0.03), coerceToFloat32(1.0 + profile.e1t_1 * 0.12), coerceToFloat32(1.0 + profile.e1t_1 * 0.08), coerceToFloat32(1.0 - profile.c1t_1 * 0.04), coerceToFloat32(1.0 - profile.e1t_1 * 0.15), calculateWeightBias(get_typographyExpressiveness01(profile)), coerceToFloat32(lerp(1.35, 0.65, smoothstep(motionT))), coerceToFloat32(calculateEmphasisBoost(profile.f1t_1, profile.g1t_1)), coerceToFloat32(profile.h1t_1), coerceToFloat32(profile.l1t_1));
  }
  function calculateAccentChroma(chroma, contrast) {
    var pullback = 1.0 - coerceAtLeast(contrast, 0.0) * coerceAtLeast(chroma, 0.0) * 0.12;
    return (1.0 + chroma * 0.4) * pullback;
  }
  function calculateLightnessDelta(contrast, chroma) {
    var deltaGain = 0.2 + 0.1 * coerceAtLeast(chroma, 0.0);
    return 1.0 + contrast * deltaGain * superlinear(contrast);
  }
  function lerp(a, b, t) {
    return a + (b - a) * coerceIn(t, 0.0, 1.0);
  }
  function smoothstep(t) {
    var x = coerceIn(t, 0.0, 1.0);
    return x * x * (3.0 - 2.0 * x);
  }
  function calculateDepthScale(contrast, depthEmphasis, playfulness) {
    var emphasisAmp = 1.0 + coerceAtLeast(contrast, 0.0) * 0.4;
    return 1.0 + contrast * 0.15 + depthEmphasis * 0.25 * emphasisAmp + playfulness * 0.05;
  }
  function calculateWeightBias(exprT) {
    return exprT < 0.3 ? 0 : exprT < 0.7 ? 1 : 2;
  }
  function calculateEmphasisBoost(motionEnergy, playfulness) {
    var linear = motionEnergy * 0.5 + playfulness * 0.4;
    var cross = motionEnergy * playfulness * 0.25;
    return coerceIn(linear + cross, -1.0, 1.0);
  }
  function superlinear(x) {
    return 1.0 + coerceAtLeast(x, 0.0) * 0.15;
  }
  function DeriveStage() {
  }
  protoOf(DeriveStage).x1r = function (context, mode) {
    // Inline function 'kotlin.requireNotNull' call
    var tmp0 = context.z1q_1.t1(mode);
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Required value was null.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = tmp0;
        break $l$block;
      }
    }
    var draft = tmp$ret$1;
    var tmp0_elvis_lhs = context.v1q_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = calculateDerivationWeights(context.u1q_1);
      context.v1q_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var weights = tmp;
    var neutralHue = draft.g1s_1 + weights.w1y_1;
    var brand = context.x1q_1;
    var tmp1_elvis_lhs = draft.h1s_1;
    var tints = tmp1_elvis_lhs == null ? context.y1q_1.t1(mode) : tmp1_elvis_lhs;
    var tmp0_0 = context.z1q_1;
    var tmp2_color = deriveColorTokens(draft.z1r_1, neutralHue, brand, tints, weights);
    var tmp3_typography = deriveTypographyTokens(draft.a1s_1, weights);
    var tmp4_spacing = deriveSpacingTokens(draft.b1s_1, weights);
    var tmp5_radius = deriveRadiusTokens(draft.c1s_1, weights);
    var tmp6_depth = deriveDepthTokens(draft.d1s_1, weights);
    var tmp7_size = deriveSizeTokens(draft.e1s_1, weights);
    var tmp8_motion = deriveMotionTokens(draft.f1s_1, weights);
    // Inline function 'kotlin.collections.set' call
    var value = draft.y1s(VOID, tmp2_color, tmp3_typography, tmp4_spacing, tmp5_radius, tmp6_depth, tmp7_size, tmp8_motion, neutralHue);
    tmp0_0.x1(mode, value);
  };
  var DeriveStage_instance;
  function DeriveStage_getInstance() {
    return DeriveStage_instance;
  }
  function deriveMotionTokens(motion, weights) {
    return deriveMotionTokens_0(motion, weights.p1z_1, weights.q1z_1);
  }
  function deriveMotionTokens_0(motion, durationScale, emphasisBoost) {
    var springy = emphasisBoost >= 0.35;
    return new MotionTokens(deriveMotionTokens$spec(durationScale, springy, motion.m1b_1, false), deriveMotionTokens$spec(durationScale, springy, motion.n1b_1, false), deriveMotionTokens$spec(durationScale, springy, motion.o1b_1, false), deriveMotionTokens$spec(durationScale, springy, motion.p1b_1, true), deriveMotionTokens$spec(durationScale, springy, motion.q1b_1, false), deriveMotionTokens$spec(durationScale, springy, motion.r1b_1, true));
  }
  function scaleMilliseconds(milliseconds, scale) {
    // Inline function 'kotlin.Long.times' call
    // Inline function 'kotlin.math.roundToInt' call
    var this_0 = toNumber(milliseconds) * scale;
    var tmp$ret$1 = roundToInt(this_0);
    return coerceAtLeast_1(fromInt(tmp$ret$1), new Long(0, 0));
  }
  function deriveMotionTokens$spec($durationScale, springy, value, emphasized) {
    var scaled = value.z1f(_DurationValue___init__impl__1d0n0c(scaleMilliseconds(_DurationValue___get_milliseconds__impl__sn32kr(value.u1f_1), $durationScale)));
    if (!emphasized || !springy) {
      return scaled;
    }
    return scaled.z1f(VOID, EasingKind_Spring_getInstance(), VOID, new SpringParams(380.0, 0.82));
  }
  function deriveSpacingTokens(spacing, weights) {
    return deriveSpacingTokens_0(spacing, toScalarWeights(weights));
  }
  function deriveRadiusTokens(radius, weights) {
    return deriveRadiusTokens_0(radius, toScalarWeights(weights));
  }
  function deriveDepthTokens(depth, weights) {
    return deriveDepthTokens_0(depth, toScalarWeights(weights));
  }
  function deriveSizeTokens(size, weights) {
    return deriveSizeTokens_0(size, toScalarWeights(weights));
  }
  function deriveSpacingTokens_0(spacing, weights) {
    return new SpacingTokens(deriveSpacingTokens$level(weights, spacing.k1c_1), deriveSpacingTokens$level(weights, spacing.l1c_1), deriveSpacingTokens$level(weights, spacing.m1c_1), deriveSpacingTokens$level(weights, spacing.n1c_1), deriveSpacingTokens$level(weights, spacing.o1c_1), deriveSpacingTokens$level(weights, spacing.p1c_1), deriveSpacingTokens$level(weights, spacing.q1c_1), deriveSpacingTokens$level(weights, spacing.r1c_1));
  }
  function deriveRadiusTokens_0(radius, weights) {
    return radius.a1x(VOID, deriveRadiusTokens$level(weights, radius.x1b_1), deriveRadiusTokens$level(weights, radius.y1b_1), deriveRadiusTokens$level(weights, radius.z1b_1), deriveRadiusTokens$level(weights, radius.a1c_1), deriveRadiusTokens$level(weights, radius.b1c_1), deriveRadiusTokens$level(weights, radius.c1c_1), deriveRadiusTokens$level(weights, radius.d1c_1), deriveRadiusTokens$level(weights, radius.e1c_1));
  }
  function deriveDepthTokens_0(depth, weights) {
    return new DepthTokens(scaled(depth.v1a_1, weights.x1z_1), scaled(depth.w1a_1, weights.x1z_1), scaled(depth.x1a_1, weights.x1z_1), scaled(depth.y1a_1, weights.x1z_1));
  }
  function deriveSizeTokens_0(size, weights) {
    return new SizeTokens(new IconSizes(deriveSizeTokens$icon(weights, size.b20_1.d1b_1), deriveSizeTokens$icon(weights, size.b20_1.e1b_1), deriveSizeTokens$icon(weights, size.b20_1.f1b_1), deriveSizeTokens$icon(weights, size.b20_1.g1b_1), deriveSizeTokens$icon(weights, size.b20_1.h1b_1)), new AvatarSizes(deriveSizeTokens$avatar(weights, size.c20_1.f20_1), deriveSizeTokens$avatar(weights, size.c20_1.g20_1), deriveSizeTokens$avatar(weights, size.c20_1.h20_1), deriveSizeTokens$avatar(weights, size.c20_1.i20_1), deriveSizeTokens$avatar(weights, size.c20_1.j20_1)), new ControlSizes(deriveSizeTokens$control(weights, size.d20_1.m1a_1), deriveSizeTokens$control(weights, size.d20_1.n1a_1), deriveSizeTokens$control(weights, size.d20_1.o1a_1), deriveSizeTokens$control(weights, size.d20_1.p1a_1), deriveSizeTokens$control(weights, size.d20_1.q1a_1)), new DotSizes(deriveSizeTokens$dot(weights, size.e20_1.k20_1), deriveSizeTokens$dot(weights, size.e20_1.l20_1), deriveSizeTokens$dot(weights, size.e20_1.m20_1)));
  }
  function snapToGrid(value) {
    // Inline function 'kotlin.math.roundToInt' call
    var tmp$ret$0 = roundToInt(value);
    return coerceAtLeast(tmp$ret$0, 0.0);
  }
  function scaled(_this__u8e3s4, scale) {
    return new DepthSpec(_DpValue___init__impl__w9byic(toFloat32(_DpValue___get_value__impl__1j6qu0(_this__u8e3s4.j1x_1) * scale)), _this__u8e3s4.k1x_1, _DpValue___init__impl__w9byic(toFloat32(_DpValue___get_value__impl__1j6qu0(_this__u8e3s4.l1x_1) * scale)), _DpValue___init__impl__w9byic(toFloat32(_DpValue___get_value__impl__1j6qu0(_this__u8e3s4.m1x_1) * scale)));
  }
  function deriveSpacingTokens$level($weights, value) {
    return _DpValue___init__impl__w9byic(snapToGrid(_DpValue___get_value__impl__1j6qu0(value) * $weights.v1z_1));
  }
  function deriveRadiusTokens$level($weights, value) {
    return _DpValue___init__impl__w9byic(snapToGrid(_DpValue___get_value__impl__1j6qu0(value) * $weights.w1z_1));
  }
  function deriveSizeTokens$icon($weights, value) {
    return _DpValue___init__impl__w9byic(toFloat32(_DpValue___get_value__impl__1j6qu0(value) * $weights.a20_1));
  }
  function deriveSizeTokens$avatar($weights, value) {
    return _DpValue___init__impl__w9byic(toFloat32(_DpValue___get_value__impl__1j6qu0(value) * $weights.z1z_1));
  }
  function deriveSizeTokens$control($weights, value) {
    return _DpValue___init__impl__w9byic(toFloat32(_DpValue___get_value__impl__1j6qu0(value) * $weights.y1z_1));
  }
  function deriveSizeTokens$dot($weights, value) {
    return _DpValue___init__impl__w9byic(toFloat32(_DpValue___get_value__impl__1j6qu0(value) * $weights.a20_1));
  }
  function ScalarWeights(spacing, radius, depth, control, avatar, iconDot) {
    this.v1z_1 = spacing;
    this.w1z_1 = radius;
    this.x1z_1 = depth;
    this.y1z_1 = control;
    this.z1z_1 = avatar;
    this.a20_1 = iconDot;
  }
  protoOf(ScalarWeights).toString = function () {
    return 'ScalarWeights(spacing=' + this.v1z_1 + ', radius=' + this.w1z_1 + ', depth=' + this.x1z_1 + ', control=' + this.y1z_1 + ', avatar=' + this.z1z_1 + ', iconDot=' + this.a20_1 + ')';
  };
  protoOf(ScalarWeights).hashCode = function () {
    var result = getNumberHashCode(this.v1z_1);
    result = imul(result, 31) + getNumberHashCode(this.w1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.x1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.y1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.z1z_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.a20_1) | 0;
    return result;
  };
  protoOf(ScalarWeights).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ScalarWeights))
      return false;
    if (!equals(this.v1z_1, other.v1z_1))
      return false;
    if (!equals(this.w1z_1, other.w1z_1))
      return false;
    if (!equals(this.x1z_1, other.x1z_1))
      return false;
    if (!equals(this.y1z_1, other.y1z_1))
      return false;
    if (!equals(this.z1z_1, other.z1z_1))
      return false;
    if (!equals(this.a20_1, other.a20_1))
      return false;
    return true;
  };
  function toScalarWeights(_this__u8e3s4) {
    return new ScalarWeights(_this__u8e3s4.e1z_1, _this__u8e3s4.f1z_1, _this__u8e3s4.g1z_1, _this__u8e3s4.h1z_1, _this__u8e3s4.i1z_1, _this__u8e3s4.j1z_1);
  }
  function deriveTypographyTokens(typography, weights) {
    var structure = typography.c1d_1;
    return typography.w1w(new StructureType(deriveTypographyTokens$structureRole(weights, structure.w1c_1, 0, true), deriveTypographyTokens$structureRole(weights, structure.x1c_1, 1, true), deriveTypographyTokens$structureRole(weights, structure.y1c_1, 2, false), deriveTypographyTokens$structureRole(weights, structure.z1c_1, 3, false), deriveTypographyTokens$structureRole(weights, structure.a1d_1, 4, false), deriveTypographyTokens$structureRole(weights, structure.b1d_1, 5, false)), new ContentType(deriveTypographyTokens$contentRole(weights, typography.d1d_1.f1d_1, 0), deriveTypographyTokens$contentRole(weights, typography.d1d_1.g1d_1, 1), deriveTypographyTokens$contentRole(weights, typography.d1d_1.h1d_1, 2), deriveTypographyTokens$contentRole(weights, typography.d1d_1.i1d_1, 3), deriveTypographyTokens$contentRole(weights, typography.d1d_1.j1d_1, 4)), new MetadataType(deriveTypographyTokens$metadataRole(weights, typography.e1d_1.k1d_1, 0), deriveTypographyTokens$metadataRole(weights, typography.e1d_1.l1d_1, 1), deriveTypographyTokens$metadataRole(weights, typography.e1d_1.m1d_1, 2)));
  }
  function deriveTypographyTokens$structureRole($weights, role, index, boosted) {
    var display = boosted ? $weights.k1z_1 : 1.0;
    // Inline function 'kotlin.math.pow' call
    var this_0 = $weights.l1z_1;
    var ratio = Math.pow(this_0, index);
    return role.n20(VOID, _SpValue___init__impl__k65sm3(toFloat32(_SpValue___get_value__impl__65u6pl(role.m1y_1) * display / ratio)), offsetWeight(role.n1y_1, boosted ? $weights.o1z_1 : 0), VOID, _EmValue___init__impl__8haeq8(toFloat32(_EmValue___get_em__impl__1q8ktd(role.p1y_1) * $weights.n1z_1)));
  }
  function deriveTypographyTokens$contentRole($weights, role, index) {
    // Inline function 'kotlin.math.pow' call
    var this_0 = $weights.l1z_1;
    var ratio = Math.pow(this_0, index);
    return role.n20(VOID, _SpValue___init__impl__k65sm3(toFloat32(_SpValue___get_value__impl__65u6pl(role.m1y_1) * $weights.m1z_1 / ratio)));
  }
  function deriveTypographyTokens$metadataRole($weights, role, index) {
    // Inline function 'kotlin.math.pow' call
    var this_0 = $weights.l1z_1;
    var ratio = Math.pow(this_0, index);
    return role.n20(VOID, _SpValue___init__impl__k65sm3(toFloat32(_SpValue___get_value__impl__65u6pl(role.m1y_1) * $weights.m1z_1 / ratio)));
  }
  function blendDomainInfluence(intent) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = intent.w1g_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$2 = toThemeProfile(item);
      destination.f(tmp$ret$2);
    }
    var domainProfiles = destination;
    // Inline function 'kotlin.collections.map' call
    var this_1 = intent.x1g_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s_0 = this_1.j();
    while (_iterator__ex2g4s_0.k()) {
      var item_0 = _iterator__ex2g4s_0.l();
      var tmp$ret$5 = toThemeProfile_0(item_0);
      destination_0.f(tmp$ret$5);
    }
    var interactionProfiles = destination_0;
    var domainGroup = mergeOrNull(domainProfiles);
    var interactionGroup = mergeOrNull(interactionProfiles);
    var tmp;
    if (domainProfiles.p() && interactionProfiles.p()) {
      tmp = Companion_getInstance_67().b1r_1;
    } else if (!(domainGroup == null) && !(interactionGroup == null)) {
      tmp = combineDomainAndInteractions(domainGroup, interactionGroup);
    } else if (!(domainGroup == null)) {
      tmp = domainGroup;
    } else {
      tmp = interactionGroup == null ? Companion_getInstance_67().b1r_1 : interactionGroup;
    }
    var blended = tmp;
    return clamped_0(blended);
  }
  function contributors(_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = _this__u8e3s4.w1g_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$2 = plus(getKClass(ProductDomain).a8(), '.') + item.y1_1;
      destination.f(tmp$ret$2);
    }
    var tmp = destination;
    // Inline function 'kotlin.collections.map' call
    var this_1 = _this__u8e3s4.x1g_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s_0 = this_1.j();
    while (_iterator__ex2g4s_0.k()) {
      var item_0 = _iterator__ex2g4s_0.l();
      var tmp$ret$5 = plus(getKClass(InteractionPattern).a8(), '.') + item_0.y1_1;
      destination_0.f(tmp$ret$5);
    }
    return plus_0(tmp, destination_0);
  }
  function mergeOrNull(_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
    var _iterator__ex2g4s = _this__u8e3s4.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$2 = item.s1t_1;
      destination.f(tmp$ret$2);
    }
    var risks = destination;
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
    var _iterator__ex2g4s_0 = _this__u8e3s4.j();
    while (_iterator__ex2g4s_0.k()) {
      var item_0 = _iterator__ex2g4s_0.l();
      var tmp$ret$5 = item_0.r1t_1;
      destination_0.f(tmp$ret$5);
    }
    var trusts = destination_0;
    var tmp;
    if (_this__u8e3s4.p()) {
      tmp = null;
    } else if (_this__u8e3s4.m() === 1) {
      tmp = first(_this__u8e3s4);
    } else {
      var tmp0_riskSensitivity = max(risks);
      var tmp1_trustStrictness = max(trusts);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_1 = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
      var _iterator__ex2g4s_1 = _this__u8e3s4.j();
      while (_iterator__ex2g4s_1.k()) {
        var item_1 = _iterator__ex2g4s_1.l();
        var tmp$ret$8 = item_1.n1t_1;
        destination_1.f(tmp$ret$8);
      }
      var tmp2_dataDensity = averageF(destination_1);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_2 = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
      var _iterator__ex2g4s_2 = _this__u8e3s4.j();
      while (_iterator__ex2g4s_2.k()) {
        var item_2 = _iterator__ex2g4s_2.l();
        var tmp$ret$11 = item_2.t1t_1;
        destination_2.f(tmp$ret$11);
      }
      var tmp3_contentVelocity = averageF(destination_2);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_3 = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
      var _iterator__ex2g4s_3 = _this__u8e3s4.j();
      while (_iterator__ex2g4s_3.k()) {
        var item_3 = _iterator__ex2g4s_3.l();
        var tmp$ret$14 = item_3.q1t_1;
        destination_3.f(tmp$ret$14);
      }
      var tmp4_socialPresence = averageF(destination_3);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_4 = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
      var _iterator__ex2g4s_4 = _this__u8e3s4.j();
      while (_iterator__ex2g4s_4.k()) {
        var item_4 = _iterator__ex2g4s_4.l();
        var tmp$ret$17 = item_4.p1t_1;
        destination_4.f(tmp$ret$17);
      }
      var tmp5_transactionality = averageF(destination_4);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_5 = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
      var _iterator__ex2g4s_5 = _this__u8e3s4.j();
      while (_iterator__ex2g4s_5.k()) {
        var item_5 = _iterator__ex2g4s_5.l();
        var tmp$ret$20 = item_5.u1t_1;
        destination_5.f(tmp$ret$20);
      }
      var tmp6_mediaRichness = averageF(destination_5);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_6 = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
      var _iterator__ex2g4s_6 = _this__u8e3s4.j();
      while (_iterator__ex2g4s_6.k()) {
        var item_6 = _iterator__ex2g4s_6.l();
        var tmp$ret$23 = item_6.o1t_1;
        destination_6.f(tmp$ret$23);
      }
      var tmp7_inputHeaviness = averageF(destination_6);
      tmp = new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp2_dataDensity, tmp7_inputHeaviness, tmp5_transactionality, tmp4_socialPresence, tmp1_trustStrictness, tmp0_riskSensitivity, tmp3_contentVelocity, tmp6_mediaRichness);
    }
    var merged = tmp;
    return merged;
  }
  function combineDomainAndInteractions(domain, interaction) {
    var tmp0 = domain.s1t_1;
    // Inline function 'kotlin.comparisons.maxOf' call
    var b = interaction.s1t_1;
    var tmp0_riskSensitivity = Math.max(tmp0, b);
    var tmp0_0 = domain.r1t_1;
    // Inline function 'kotlin.comparisons.maxOf' call
    var b_0 = interaction.r1t_1;
    var tmp1_trustStrictness = Math.max(tmp0_0, b_0);
    var tmp2_dataDensity = weighted(domain.n1t_1, interaction.n1t_1);
    var tmp3_contentVelocity = weighted(domain.t1t_1, interaction.t1t_1);
    var tmp4_socialPresence = weighted(domain.q1t_1, interaction.q1t_1);
    var tmp5_transactionality = weighted(domain.p1t_1, interaction.p1t_1);
    var tmp6_mediaRichness = weighted(domain.u1t_1, interaction.u1t_1);
    var tmp7_inputHeaviness = weighted(domain.o1t_1, interaction.o1t_1);
    return new ThemeProfile(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp2_dataDensity, tmp7_inputHeaviness, tmp5_transactionality, tmp4_socialPresence, tmp1_trustStrictness, tmp0_riskSensitivity, tmp3_contentVelocity, tmp6_mediaRichness);
  }
  function clamped_0(_this__u8e3s4) {
    var tmp0_riskSensitivity = coerceToFloat32(coerceIn(_this__u8e3s4.s1t_1, -1.0, 1.0));
    var tmp1_trustStrictness = coerceToFloat32(coerceIn(_this__u8e3s4.r1t_1, -1.0, 1.0));
    var tmp2_dataDensity = coerceToFloat32(coerceIn(_this__u8e3s4.n1t_1, -1.0, 1.0));
    var tmp3_contentVelocity = coerceToFloat32(coerceIn(_this__u8e3s4.t1t_1, -1.0, 1.0));
    var tmp4_socialPresence = coerceToFloat32(coerceIn(_this__u8e3s4.q1t_1, -1.0, 1.0));
    var tmp5_transactionality = coerceToFloat32(coerceIn(_this__u8e3s4.p1t_1, -1.0, 1.0));
    var tmp6_mediaRichness = coerceToFloat32(coerceIn(_this__u8e3s4.u1t_1, -1.0, 1.0));
    var tmp7_inputHeaviness = coerceToFloat32(coerceIn(_this__u8e3s4.o1t_1, -1.0, 1.0));
    return _this__u8e3s4.w1t(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp2_dataDensity, tmp7_inputHeaviness, tmp5_transactionality, tmp4_socialPresence, tmp1_trustStrictness, tmp0_riskSensitivity, tmp3_contentVelocity, tmp6_mediaRichness);
  }
  function averageF(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4.p()) {
      tmp = 0.0;
    } else {
      // Inline function 'kotlin.collections.sumOf' call
      var sum = 0;
      var _iterator__ex2g4s = _this__u8e3s4.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        var tmp_0 = sum;
        sum = tmp_0 + element;
      }
      var tmp$ret$0 = sum;
      tmp = toFloat32(tmp$ret$0 / _this__u8e3s4.m());
    }
    var mean = tmp;
    return mean;
  }
  function weighted(domain, interaction) {
    return toFloat32(0.45 * domain + 0.55 * interaction);
  }
  function DomainStage() {
  }
  protoOf(DomainStage).v1r = function (context) {
    context.u1q_1 = blendDomainInfluence(context.q1q_1.h1r_1);
    var contributors_0 = contributors(context.q1q_1.h1r_1);
    var tmp;
    if (contributors_0.p()) {
      tmp = new ReportEntry('domain', ResolutionStage_Domain_getInstance(), ReportStatus_Absent_getInstance(), 'No domain or interaction selected; influences carry no opinion.');
    } else {
      tmp = new ReportEntry('domain', ResolutionStage_Domain_getInstance(), ReportStatus_Honored_getInstance(), 'Domain and interaction influences blended into theme profile.', VOID, joinToString(contributors_0));
    }
    var entry = tmp;
    context.l1r(entry);
  };
  var DomainStage_instance;
  function DomainStage_getInstance() {
    return DomainStage_instance;
  }
  function meetsContrast(foreground, background, minRatio) {
    return contrastRatio(foreground, background) >= minRatio;
  }
  function ContrastRepairResult(foreground, background, achievedRatio, ratioMet) {
    this.o20_1 = foreground;
    this.p20_1 = background;
    this.q20_1 = achievedRatio;
    this.r20_1 = ratioMet;
  }
  protoOf(ContrastRepairResult).toString = function () {
    return 'ContrastRepairResult(foreground=' + this.o20_1.toString() + ', background=' + this.p20_1.toString() + ', achievedRatio=' + this.q20_1 + ', ratioMet=' + this.r20_1 + ')';
  };
  protoOf(ContrastRepairResult).hashCode = function () {
    var result = this.o20_1.hashCode();
    result = imul(result, 31) + this.p20_1.hashCode() | 0;
    result = imul(result, 31) + getNumberHashCode(this.q20_1) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.r20_1) | 0;
    return result;
  };
  protoOf(ContrastRepairResult).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ContrastRepairResult))
      return false;
    if (!this.o20_1.equals(other.o20_1))
      return false;
    if (!this.p20_1.equals(other.p20_1))
      return false;
    if (!equals(this.q20_1, other.q20_1))
      return false;
    if (!(this.r20_1 === other.r20_1))
      return false;
    return true;
  };
  function repairContrast(foreground, background, minRatio, isDark, backgroundLocked) {
    var initialRatio = contrastRatio(foreground, background);
    if (initialRatio >= minRatio) {
      return new ContrastRepairResult(foreground, background, initialRatio, true);
    }
    var direction = isDark ? 1.0 : -1.0;
    var lifted = liftLightness(foreground, background, minRatio, direction);
    var liftedRatio = contrastRatio(lifted, background);
    var relaxed = lifted.l1f(VOID, lifted.h1f_1 * 0.75);
    var relaxedRatio = contrastRatio(relaxed, background);
    var shifted = safeOklch(background.g1f_1 - direction * 0.04, background.h1f_1, background.i1f_1, background.j1f_1);
    var shiftedRatio = contrastRatio(relaxed, shifted);
    var result = liftedRatio >= minRatio ? new ContrastRepairResult(gamutMapped(lifted), background, liftedRatio, true) : relaxedRatio >= minRatio || backgroundLocked ? new ContrastRepairResult(gamutMapped(relaxed), background, relaxedRatio, relaxedRatio >= minRatio) : new ContrastRepairResult(gamutMapped(relaxed), gamutMapped(shifted), shiftedRatio, shiftedRatio >= minRatio);
    return result;
  }
  function liftLightness(foreground, background, minRatio, direction) {
    var candidate = foreground;
    // Inline function 'kotlin.repeat' call
    var inductionVariable = 0;
    if (inductionVariable < 60)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (meetsContrast(candidate, background, minRatio)) {
          return candidate;
        }
        candidate = safeOklch(candidate.g1f_1 + direction * 0.01, candidate.h1f_1, candidate.i1f_1, candidate.j1f_1);
      }
       while (inductionVariable < 60);
    return candidate;
  }
  function get_OWNED_CONTRAST_PAIRS() {
    _init_properties_ColorEnforcement_kt__ei5z7h();
    return OWNED_CONTRAST_PAIRS;
  }
  var OWNED_CONTRAST_PAIRS;
  function OwnedContrastPair(foreground, surface, secondaryForeground, customMinRatio, surfaceImmutable) {
    secondaryForeground = secondaryForeground === VOID ? null : secondaryForeground;
    customMinRatio = customMinRatio === VOID ? null : customMinRatio;
    surfaceImmutable = surfaceImmutable === VOID ? false : surfaceImmutable;
    this.s20_1 = foreground;
    this.t20_1 = surface;
    this.u20_1 = secondaryForeground;
    this.v20_1 = customMinRatio;
    this.w20_1 = surfaceImmutable;
  }
  protoOf(OwnedContrastPair).toString = function () {
    return 'OwnedContrastPair(foreground=' + this.s20_1.toString() + ', surface=' + this.t20_1.toString() + ', secondaryForeground=' + toString_0(this.u20_1) + ', customMinRatio=' + this.v20_1 + ', surfaceImmutable=' + this.w20_1 + ')';
  };
  protoOf(OwnedContrastPair).hashCode = function () {
    var result = this.s20_1.hashCode();
    result = imul(result, 31) + this.t20_1.hashCode() | 0;
    result = imul(result, 31) + (this.u20_1 == null ? 0 : this.u20_1.hashCode()) | 0;
    result = imul(result, 31) + (this.v20_1 == null ? 0 : getNumberHashCode(this.v20_1)) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.w20_1) | 0;
    return result;
  };
  protoOf(OwnedContrastPair).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof OwnedContrastPair))
      return false;
    if (!this.s20_1.equals(other.s20_1))
      return false;
    if (!this.t20_1.equals(other.t20_1))
      return false;
    if (!equals(this.u20_1, other.u20_1))
      return false;
    if (!equals(this.v20_1, other.v20_1))
      return false;
    if (!(this.w20_1 === other.w20_1))
      return false;
    return true;
  };
  function enforceContrast(color, minRatio, lockedColorPaths, isDark, entries) {
    _init_properties_ColorEnforcement_kt__ei5z7h();
    var tree = color;
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = get_OWNED_CONTRAST_PAIRS().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      $l$block: {
        var surface = resolveIn(element.t20_1, tree);
        var foreground = resolveIn(element.s20_1, tree);
        if (surface == null || foreground == null) {
          break $l$block;
        }
        var tmp0_elvis_lhs = element.v20_1;
        var floor = tmp0_elvis_lhs == null ? minRatio : tmp0_elvis_lhs;
        var surfaceLocked = element.w20_1 || lockedColorPaths.n1(element.t20_1.v18_1);
        if (!meetsContrast(foreground, surface, floor)) {
          var repair = repairContrast(foreground, surface, floor, isDark, surfaceLocked);
          tree = replaceToken(tree, element.s20_1, repair.o20_1);
          var tmp1_safe_receiver = element.u20_1;
          if (tmp1_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            tree = replaceToken(tree, tmp1_safe_receiver, repair.o20_1);
          }
          if (!surfaceLocked) {
            tree = replaceToken(tree, element.t20_1, repair.p20_1);
          }
          // Inline function 'kotlin.collections.plusAssign' call
          var element_0 = repairEntry(element.s20_1.v18_1, floor, repair.q20_1, repair.r20_1, surfaceLocked);
          entries.f(element_0);
        }
      }
    }
    return enforceContentHierarchy(tree, isDark, entries);
  }
  function repairEntry(path, requestedRatio, achievedRatio, ratioMet, locked) {
    _init_properties_ColorEnforcement_kt__ei5z7h();
    return new ReportEntry(path, ResolutionStage_Enforce_getInstance(), ReportStatus_OverriddenByConstraint_getInstance(), !ratioMet ? 'Contrast floor ' + formatDeterministic(requestedRatio) + ' could not be fully met; ' + ('best-effort achieved ' + formatDeterministic(achievedRatio) + '.') : locked ? 'Contrast floor ' + formatDeterministic(requestedRatio) + ' could not be met without moving ' + 'a Control-locked background.' : 'Contrast floor ' + formatDeterministic(requestedRatio) + ' applied by lifting lightness.', formatDeterministic(requestedRatio), formatDeterministic(achievedRatio));
  }
  function enforceContentHierarchy(tree, isDark, entries) {
    _init_properties_ColorEnforcement_kt__ei5z7h();
    var defaultContent = tree.b19_1.m19_1;
    var mutedContent = tree.b19_1.n19_1;
    // Inline function 'kotlin.math.abs' call
    var x = defaultContent.g1f_1 - mutedContent.g1f_1;
    var deltaL = Math.abs(x);
    if (deltaL >= 0.12) {
      return tree;
    }
    var tmp;
    if (isDark) {
      tmp = coerceAtLeast(defaultContent.g1f_1 - 0.12, 0.0);
    } else {
      tmp = coerceAtMost(defaultContent.g1f_1 + 0.12, 1.0);
    }
    var targetMutedL = tmp;
    var separatedMuted = mutedContent.l1f(targetMutedL);
    // Inline function 'kotlin.collections.plusAssign' call
    var element = new ReportEntry(ColorTokenPath_ContentMuted_getInstance().v18_1, ResolutionStage_Enforce_getInstance(), ReportStatus_OverriddenByConstraint_getInstance(), 'Separation constraint applied to preserve hierarchy between content.default and content.muted.', formatDeterministic(mutedContent.g1f_1), formatDeterministic(targetMutedL));
    entries.f(element);
    return tree.z20(VOID, tree.b19_1.x20(VOID, separatedMuted), tree.c19_1.y20(VOID, tree.c19_1.q19_1.l1f(targetMutedL)));
  }
  var properties_initialized_ColorEnforcement_kt_388ypt;
  function _init_properties_ColorEnforcement_kt__ei5z7h() {
    if (!properties_initialized_ColorEnforcement_kt_388ypt) {
      properties_initialized_ColorEnforcement_kt_388ypt = true;
      OWNED_CONTRAST_PAIRS = listOf([new OwnedContrastPair(ColorTokenPath_ContentDefault_getInstance(), ColorTokenPath_SurfaceDefault_getInstance()), new OwnedContrastPair(ColorTokenPath_ContentDefault_getInstance(), ColorTokenPath_SurfaceElevated_getInstance()), new OwnedContrastPair(ColorTokenPath_ContentDefault_getInstance(), ColorTokenPath_SurfaceRecessed_getInstance()), new OwnedContrastPair(ColorTokenPath_ContentInverse_getInstance(), ColorTokenPath_SurfaceInverse_getInstance()), new OwnedContrastPair(ColorTokenPath_SelectionContent_getInstance(), ColorTokenPath_SelectionSurface_getInstance()), new OwnedContrastPair(ColorTokenPath_PositiveContent_getInstance(), ColorTokenPath_PositiveSurface_getInstance(), ColorTokenPath_PositiveIcon_getInstance()), new OwnedContrastPair(ColorTokenPath_NegativeContent_getInstance(), ColorTokenPath_NegativeSurface_getInstance(), ColorTokenPath_NegativeIcon_getInstance()), new OwnedContrastPair(ColorTokenPath_CautionContent_getInstance(), ColorTokenPath_CautionSurface_getInstance(), ColorTokenPath_CautionIcon_getInstance()), new OwnedContrastPair(ColorTokenPath_InfoContent_getInstance(), ColorTokenPath_InfoSurface_getInstance(), ColorTokenPath_InfoIcon_getInstance()), new OwnedContrastPair(ColorTokenPath_FocusRing_getInstance(), ColorTokenPath_SurfaceDefault_getInstance(), VOID, 3.0, true)]);
    }
  }
  function get_DEFAULT_MIN_TOUCH_TARGET() {
    _init_properties_EnforceStage_kt__tsdh3w();
    return DEFAULT_MIN_TOUCH_TARGET;
  }
  var DEFAULT_MIN_TOUCH_TARGET;
  function get_DEFAULT_MIN_TEXT_SIZE() {
    _init_properties_EnforceStage_kt__tsdh3w();
    return DEFAULT_MIN_TEXT_SIZE;
  }
  var DEFAULT_MIN_TEXT_SIZE;
  function EnforceStage() {
  }
  protoOf(EnforceStage).x1r = function (context, mode) {
    // Inline function 'kotlin.requireNotNull' call
    var tmp0 = context.z1q_1.t1(mode);
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Required value was null.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = tmp0;
        break $l$block;
      }
    }
    var draft = tmp$ret$1;
    var tmp0_safe_receiver = context.q1q_1.i1r_1;
    var constraints = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q1g_1;
    var tmp2_safe_receiver = constraints == null ? null : constraints.a1i_1;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.j1i_1;
    var minContrast = tmp3_elvis_lhs == null ? 4.5 : tmp3_elvis_lhs;
    var tmp5_safe_receiver = constraints == null ? null : constraints.b1i_1;
    var tmp6_elvis_lhs = tmp5_safe_receiver == null ? null : tmp5_safe_receiver.m1i_1;
    var tmp;
    var tmp_0 = tmp6_elvis_lhs;
    if ((tmp_0 == null ? null : new DpValue(tmp_0)) == null) {
      tmp = get_DEFAULT_MIN_TOUCH_TARGET();
    } else {
      tmp = tmp6_elvis_lhs;
    }
    var minTouch = tmp;
    var tmp8_safe_receiver = constraints == null ? null : constraints.g1i_1;
    var tmp9_elvis_lhs = tmp8_safe_receiver == null ? null : tmp8_safe_receiver.p1i_1;
    var tmp_1;
    var tmp_2 = tmp9_elvis_lhs;
    if ((tmp_2 == null ? null : new SpValue(tmp_2)) == null) {
      tmp_1 = get_DEFAULT_MIN_TEXT_SIZE();
    } else {
      tmp_1 = tmp9_elvis_lhs;
    }
    var minText = tmp_1;
    var isDark = mode.equals(ThemeMode_Dark_getInstance());
    var color = enforceContrast(draft.z1r_1, minContrast, context.t1q_1, isDark, context.a1r_1);
    var tmp0_0 = context.z1q_1;
    var tmp13_size = enforceControlSizes(draft.e1s_1, minTouch, context.a1r_1);
    var tmp14_spacing = clampSpacing(draft.b1s_1, constraints == null ? null : constraints.c1i_1, context.a1r_1);
    var tmp15_radius = clampRadius(draft.c1s_1, constraints == null ? null : constraints.e1i_1, context.a1r_1);
    var tmp16_motion = enforceMotion(draft.f1s_1, constraints == null ? null : constraints.f1i_1, context.a1r_1);
    var tmp17_typography = enforceTypographyConstraints(draft.a1s_1, minText, isDark, context.a1r_1);
    // Inline function 'kotlin.collections.set' call
    var value = draft.y1s(VOID, color, tmp17_typography, tmp14_spacing, tmp15_radius, VOID, tmp13_size, tmp16_motion);
    tmp0_0.x1(mode, value);
  };
  var EnforceStage_instance;
  function EnforceStage_getInstance() {
    return EnforceStage_instance;
  }
  var properties_initialized_EnforceStage_kt_2a7mv6;
  function _init_properties_EnforceStage_kt__tsdh3w() {
    if (!properties_initialized_EnforceStage_kt_2a7mv6) {
      properties_initialized_EnforceStage_kt_2a7mv6 = true;
      DEFAULT_MIN_TOUCH_TARGET = _DpValue___init__impl__w9byic(48.0);
      DEFAULT_MIN_TEXT_SIZE = _SpValue___init__impl__k65sm3(11.0);
    }
  }
  function enforceMotion(motion, constraint, entries) {
    if (constraint == null) {
      return motion;
    }
    var bias = constraint.a1j_1;
    var tmp;
    if (bias == null) {
      tmp = motion;
    } else {
      tmp = motion.o1w(biased(motion.m1b_1, bias), biased(motion.n1b_1, bias), biased(motion.o1b_1, bias), biased(motion.p1b_1, bias), biased(motion.q1b_1, bias), biased(motion.r1b_1, bias));
    }
    var biased_0 = tmp;
    if (!constraint.z1i_1) {
      return biased_0;
    }
    // Inline function 'kotlin.collections.plusAssign' call
    var element = new ReportEntry('motion', ResolutionStage_Enforce_getInstance(), ReportStatus_OverriddenByConstraint_getInstance(), 'Reduced motion preference collapsed spatial motion to 0ms and retained a short fade for feedback.');
    entries.f(element);
    return biased_0.o1w(reducedFeedback(), reducedFeedback(), reducedSpatial(), reducedSpatial(), reducedSpatial(), reducedSpatial());
  }
  function biased(_this__u8e3s4, bias) {
    var tmp0 = _DurationValue___get_milliseconds__impl__sn32kr(_this__u8e3s4.u1f_1);
    // Inline function 'kotlin.Long.times' call
    var other = 1.0 + bias;
    var tmp$ret$0 = toNumber(tmp0) * other;
    return _this__u8e3s4.z1f(_DurationValue___init__impl__1d0n0c(coerceAtLeast_1(numberToLong(tmp$ret$0), new Long(0, 0))));
  }
  function reducedFeedback() {
    return new MotionSpec(_DurationValue___init__impl__1d0n0c(new Long(100, 0)), EasingKind_Linear_getInstance());
  }
  function reducedSpatial() {
    return new MotionSpec(_DurationValue___init__impl__1d0n0c(new Long(0, 0)), EasingKind_Linear_getInstance());
  }
  function enforceControlSizes(size, floor, entries) {
    return size.a21(VOID, VOID, new ControlSizes(raised(size.d20_1.m1a_1, floor, ControlSizeTokenPath_Level1_getInstance().l1a_1, entries), raised(size.d20_1.n1a_1, floor, ControlSizeTokenPath_Level2_getInstance().l1a_1, entries), raised(size.d20_1.o1a_1, floor, ControlSizeTokenPath_Level3_getInstance().l1a_1, entries), raised(size.d20_1.p1a_1, floor, ControlSizeTokenPath_Level4_getInstance().l1a_1, entries), raised(size.d20_1.q1a_1, floor, ControlSizeTokenPath_Level5_getInstance().l1a_1, entries)));
  }
  function clampSpacing(spacing, clamp, entries) {
    if (clamp == null) {
      return spacing;
    }
    return spacing.t1w(clamped_1(spacing.k1c_1, clamp, SpacingTokenPath_Level1_getInstance().j1c_1, entries), clamped_1(spacing.l1c_1, clamp, SpacingTokenPath_Level2_getInstance().j1c_1, entries), clamped_1(spacing.m1c_1, clamp, SpacingTokenPath_Level3_getInstance().j1c_1, entries), clamped_1(spacing.n1c_1, clamp, SpacingTokenPath_Level4_getInstance().j1c_1, entries), clamped_1(spacing.o1c_1, clamp, SpacingTokenPath_Level5_getInstance().j1c_1, entries), clamped_1(spacing.p1c_1, clamp, SpacingTokenPath_Level6_getInstance().j1c_1, entries), clamped_1(spacing.q1c_1, clamp, SpacingTokenPath_Level7_getInstance().j1c_1, entries), clamped_1(spacing.r1c_1, clamp, SpacingTokenPath_Level8_getInstance().j1c_1, entries));
  }
  function clampRadius(radius, clamp, entries) {
    if (clamp == null) {
      return radius;
    }
    return radius.a1x(VOID, clamped_1(radius.x1b_1, clamp, RadiusTokenPath_Level1_getInstance().v1b_1, entries), clamped_1(radius.y1b_1, clamp, RadiusTokenPath_Level2_getInstance().v1b_1, entries), clamped_1(radius.z1b_1, clamp, RadiusTokenPath_Level3_getInstance().v1b_1, entries), clamped_1(radius.a1c_1, clamp, RadiusTokenPath_Level4_getInstance().v1b_1, entries), clamped_1(radius.b1c_1, clamp, RadiusTokenPath_Level5_getInstance().v1b_1, entries), clamped_1(radius.c1c_1, clamp, RadiusTokenPath_Level6_getInstance().v1b_1, entries), clamped_1(radius.d1c_1, clamp, RadiusTokenPath_Level7_getInstance().v1b_1, entries), clamped_1(radius.e1c_1, clamp, RadiusTokenPath_Level8_getInstance().v1b_1, entries));
  }
  function raised(_this__u8e3s4, floor, path, entries) {
    if (_DpValue___get_value__impl__1j6qu0(_this__u8e3s4) >= _DpValue___get_value__impl__1j6qu0(floor)) {
      return _this__u8e3s4;
    }
    // Inline function 'kotlin.collections.plusAssign' call
    var element = new ReportEntry(path, ResolutionStage_Enforce_getInstance(), ReportStatus_OverriddenByConstraint_getInstance(), 'Control size raised to the minimum touch target.', formatDeterministic(_DpValue___get_value__impl__1j6qu0(_this__u8e3s4)), formatDeterministic(_DpValue___get_value__impl__1j6qu0(floor)));
    entries.f(element);
    return floor;
  }
  function clamped_1(_this__u8e3s4, clamp, path, entries) {
    var tmp0_safe_receiver = clamp.t1i_1;
    var tmp;
    var tmp_0 = tmp0_safe_receiver;
    if ((tmp_0 == null ? null : new DpValue(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _DpValue___get_value__impl__1j6qu0(tmp0_safe_receiver);
    }
    var lower = tmp;
    var tmp1_safe_receiver = clamp.u1i_1;
    var tmp_1;
    var tmp_2 = tmp1_safe_receiver;
    if ((tmp_2 == null ? null : new DpValue(tmp_2)) == null) {
      tmp_1 = null;
    } else {
      tmp_1 = _DpValue___get_value__impl__1j6qu0(tmp1_safe_receiver);
    }
    var upper = tmp_1;
    var tmp_3 = _DpValue___get_value__impl__1j6qu0(_this__u8e3s4);
    var tmp_4 = lower == null ? _DpValue___get_value__impl__1j6qu0(_this__u8e3s4) : lower;
    var target = coerceIn(tmp_3, tmp_4, upper == null ? _DpValue___get_value__impl__1j6qu0(_this__u8e3s4) : upper);
    if (target === _DpValue___get_value__impl__1j6qu0(_this__u8e3s4)) {
      return _this__u8e3s4;
    }
    // Inline function 'kotlin.collections.plusAssign' call
    var element = new ReportEntry(path, ResolutionStage_Enforce_getInstance(), ReportStatus_OverriddenByConstraint_getInstance(), 'Level clamped into the requested min/max range.', formatDeterministic(_DpValue___get_value__impl__1j6qu0(_this__u8e3s4)), formatDeterministic(target));
    entries.f(element);
    return _DpValue___init__impl__w9byic(target);
  }
  function enforceTypographyConstraints(typography, floor, isDark, entries) {
    return typography.w1w(new StructureType(enforceTypographyConstraints$role(floor, entries, isDark, typography.c1d_1.w1c_1, 'typography.structure.level1'), enforceTypographyConstraints$role(floor, entries, isDark, typography.c1d_1.x1c_1, 'typography.structure.level2'), enforceTypographyConstraints$role(floor, entries, isDark, typography.c1d_1.y1c_1, 'typography.structure.level3'), enforceTypographyConstraints$role(floor, entries, isDark, typography.c1d_1.z1c_1, 'typography.structure.level4'), enforceTypographyConstraints$role(floor, entries, isDark, typography.c1d_1.a1d_1, 'typography.structure.level5'), enforceTypographyConstraints$role(floor, entries, isDark, typography.c1d_1.b1d_1, 'typography.structure.level6')), new ContentType(enforceTypographyConstraints$role(floor, entries, isDark, typography.d1d_1.f1d_1, 'typography.content.level1'), enforceTypographyConstraints$role(floor, entries, isDark, typography.d1d_1.g1d_1, 'typography.content.level2'), enforceTypographyConstraints$role(floor, entries, isDark, typography.d1d_1.h1d_1, 'typography.content.level3'), enforceTypographyConstraints$role(floor, entries, isDark, typography.d1d_1.i1d_1, 'typography.content.level4'), enforceTypographyConstraints$role(floor, entries, isDark, typography.d1d_1.j1d_1, 'typography.content.level5')), new MetadataType(enforceTypographyConstraints$role(floor, entries, isDark, typography.e1d_1.k1d_1, 'typography.metadata.level1'), enforceTypographyConstraints$role(floor, entries, isDark, typography.e1d_1.l1d_1, 'typography.metadata.level2'), enforceTypographyConstraints$role(floor, entries, isDark, typography.e1d_1.m1d_1, 'typography.metadata.level3')));
  }
  function enforceTypographyConstraints$role($floor, $entries, $isDark, current, path) {
    var tmp = current.l1y_1;
    var tmp0_safe_receiver = tmp instanceof Catalog ? tmp : null;
    var tmp_0;
    if (tmp0_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_0 = GoogleFontCatalog_getInstance().i21(tmp0_safe_receiver.b21_1);
    }
    var entry = tmp_0;
    var tmp2_elvis_lhs = entry == null ? null : entry.x21_1;
    var opticalFloor = tmp2_elvis_lhs == null ? _SpValue___get_value__impl__65u6pl($floor) : tmp2_elvis_lhs;
    // Inline function 'kotlin.comparisons.maxOf' call
    var a = _SpValue___get_value__impl__65u6pl($floor);
    var effectiveFloor = Math.max(a, opticalFloor);
    var role = current;
    if (_SpValue___get_value__impl__65u6pl(role.m1y_1) < effectiveFloor) {
      var tmp_1;
      if (opticalFloor > _SpValue___get_value__impl__65u6pl($floor)) {
        tmp_1 = 'Display font size raised to optical legibility floor.';
      } else {
        tmp_1 = 'Text size raised to the minimum readable size.';
      }
      var message = tmp_1;
      // Inline function 'kotlin.collections.plusAssign' call
      var element = new ReportEntry(path, ResolutionStage_Enforce_getInstance(), ReportStatus_OverriddenByConstraint_getInstance(), message, formatDeterministic(_SpValue___get_value__impl__65u6pl(role.m1y_1)), formatDeterministic(effectiveFloor));
      $entries.f(element);
      role = role.n20(VOID, _SpValue___init__impl__k65sm3(effectiveFloor));
    }
    if (!$isDark && !(entry == null) && entry.w21_1 < 0.35) {
      if (equals(role.q1y_1, ContentMuted_getInstance())) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_0 = new ReportEntry(path + '.color', ResolutionStage_Enforce_getInstance(), ReportStatus_OverriddenByConstraint_getInstance(), 'Low-fill font in light mode promoted to default content color for optical legibility.', 'content.muted', 'content.default');
        $entries.f(element_0);
        role = role.n20(VOID, VOID, VOID, VOID, VOID, ContentDefault_getInstance());
      }
    }
    return role;
  }
  function resolveFontRoles(normalized, profile) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var entries = ArrayList_init_$Create$_0();
    var typography = normalized.f1r_1;
    var pinnedStructure = pinned(typography.l1h_1, 'structure', entries);
    var pinnedContent = pinned(typography.m1h_1, 'content', entries);
    var pinnedMetadata = pinned(typography.n1h_1, 'metadata', entries);
    var assigned = CandidateAssigner_instance.z21(typography.k1h_1, pinnedStructure, pinnedContent, pinnedMetadata, profile, entries);
    var intentSpecified = normalized.a22();
    var tmp0_elvis_lhs = assigned.b22_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var tmp0 = 'structure';
      var tmp_0;
      if (profile.e1t_1 >= 0.35) {
        tmp_0 = DefaultFontBias_getInstance().v1v_1;
      } else {
        tmp_0 = DefaultFontBias_getInstance().u1v_1;
      }
      // Inline function 'io.github.alph_a07.basis.theme.resolution.fonts.resolveLadderFallback' call
      var canonical = tmp_0;
      var tmp_1;
      if (intentSpecified) {
        var family = FontCatalogDerivation_instance.f22(profile);
        // Inline function 'kotlin.collections.plusAssign' call
        var element = fallbackEntry(tmp0, family, true);
        entries.f(element);
        tmp_1 = family;
      } else {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_0 = fallbackEntry(tmp0, canonical, false);
        entries.f(element_0);
        tmp_1 = canonical;
      }
      tmp = tmp_1;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var structureFamily = tmp;
    var tmp1_elvis_lhs = assigned.c22_1;
    var tmp_2;
    if (tmp1_elvis_lhs == null) {
      // Inline function 'io.github.alph_a07.basis.theme.resolution.fonts.resolveLadderFallback' call
      var canonical_0 = DefaultFontBias_getInstance().u1v_1;
      var tmp_3;
      if (intentSpecified) {
        var family_0 = FontCatalogDerivation_instance.g22(profile);
        // Inline function 'kotlin.collections.plusAssign' call
        var element_1 = fallbackEntry('content', family_0, true);
        entries.f(element_1);
        tmp_3 = family_0;
      } else {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_2 = fallbackEntry('content', canonical_0, false);
        entries.f(element_2);
        tmp_3 = canonical_0;
      }
      tmp_2 = tmp_3;
    } else {
      tmp_2 = tmp1_elvis_lhs;
    }
    var contentFamily = tmp_2;
    var tmp2_elvis_lhs = assigned.d22_1;
    var tmp_4;
    if (tmp2_elvis_lhs == null) {
      var tmp0_0 = 'metadata';
      // Inline function 'io.github.alph_a07.basis.theme.resolution.fonts.resolveLadderFallback' call
      var canonical_1 = DefaultFontBias_getInstance().w1v_1;
      var tmp_5;
      if (intentSpecified) {
        var family_1 = FontCatalogDerivation_instance.h22(profile);
        // Inline function 'kotlin.collections.plusAssign' call
        var element_3 = fallbackEntry(tmp0_0, family_1, true);
        entries.f(element_3);
        tmp_5 = family_1;
      } else {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_4 = fallbackEntry(tmp0_0, canonical_1, false);
        entries.f(element_4);
        tmp_5 = canonical_1;
      }
      tmp_4 = tmp_5;
    } else {
      tmp_4 = tmp2_elvis_lhs;
    }
    var metadataFamily = tmp_4;
    var tmp3_safe_receiver = normalized.i1r_1;
    var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.p1g_1;
    var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.e1j_1;
    var locks = tmp5_elvis_lhs == null ? emptyMap() : tmp5_elvis_lhs;
    // Inline function 'kotlin.collections.plusAssign' call
    var elements = lockEntries(locks);
    addAll(entries, elements);
    return new ResolvedFonts(structureFamily, contentFamily, metadataFamily, locks, assigned.e22_1, entries);
  }
  function pinned(_this__u8e3s4, ladder, entries) {
    if (_this__u8e3s4 == null) {
      return null;
    }
    // Inline function 'kotlin.collections.plusAssign' call
    var element = new ReportEntry('typography.' + ladder, ResolutionStage_Fonts_getInstance(), ReportStatus_Honored_getInstance(), 'Role pin locks the ' + ladder + ' ladder.', get_label(_this__u8e3s4));
    entries.f(element);
    return _this__u8e3s4;
  }
  function AssignedLadders(structure, content, metadata, unusedCandidates) {
    this.b22_1 = structure;
    this.c22_1 = content;
    this.d22_1 = metadata;
    this.e22_1 = unusedCandidates;
  }
  function assignSingle($this, single, pinnedStructure, pinnedContent, pinnedMetadata, entries) {
    var structure = pinnedStructure;
    var content = pinnedContent;
    var metadata = pinnedMetadata;
    var tmp;
    if (single instanceof Catalog) {
      var tmp1_safe_receiver = GoogleFontCatalog_getInstance().i21(single.b21_1);
      tmp = equals(tmp1_safe_receiver == null ? null : tmp1_safe_receiver.m21_1, GoogleFontsCategory_Display_getInstance());
    } else {
      if (single instanceof Custom) {
        tmp = false;
      } else {
        noWhenBranchMatchedException();
      }
    }
    var isDisplay = tmp;
    if (structure == null) {
      structure = single;
      // Inline function 'kotlin.collections.plusAssign' call
      var element = candidateEntry('structure', single, false);
      entries.f(element);
    }
    if (content == null && !isDisplay) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element_0 = candidateEntry('content', single, equals(structure, single));
      entries.f(element_0);
      content = single;
    }
    if (metadata == null) {
      var isReuse = equals(structure, single) || equals(content, single);
      // Inline function 'kotlin.collections.plusAssign' call
      var element_1 = candidateEntry('metadata', single, isReuse);
      entries.f(element_1);
      metadata = single;
    }
    return new AssignedLadders(structure, content, metadata, emptyList());
  }
  function assignMultiple($this, candidates, pinnedStructure, pinnedContent, pinnedMetadata, profile, entries) {
    var structure = pinnedStructure;
    var content = pinnedContent;
    var metadata = pinnedMetadata;
    var pool = toMutableList(candidates);
    var tmp;
    if (structure == null) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      tmp = !pool.p();
    } else {
      tmp = false;
    }
    if (tmp) {
      // Inline function 'io.github.alph_a07.basis.theme.resolution.fonts.CandidateAssigner.pickCandidate' call
      var bestIndex = 0;
      var it = pool.n(0);
      var bestScore = scoreCandidate(CandidateAssigner_instance, it, 'structure', profile);
      var inductionVariable = 1;
      var last = pool.m();
      if (inductionVariable < last)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var it_0 = pool.n(i);
          var score = scoreCandidate(CandidateAssigner_instance, it_0, 'structure', profile);
          if (score - bestScore > 0.05) {
            bestScore = score;
            bestIndex = i;
          }
        }
         while (inductionVariable < last);
      structure = pool.a3(bestIndex);
      // Inline function 'kotlin.collections.plusAssign' call
      var element = candidateEntry('structure', structure, false);
      entries.f(element);
    }
    var tmp_0;
    if (content == null) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      tmp_0 = !pool.p();
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      // Inline function 'io.github.alph_a07.basis.theme.resolution.fonts.CandidateAssigner.pickCandidate' call
      var bestIndex_0 = 0;
      var it_1 = pool.n(0);
      var bestScore_0 = scoreCandidate(CandidateAssigner_instance, it_1, 'content', profile);
      var inductionVariable_0 = 1;
      var last_0 = pool.m();
      if (inductionVariable_0 < last_0)
        do {
          var i_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var it_2 = pool.n(i_0);
          var score_0 = scoreCandidate(CandidateAssigner_instance, it_2, 'content', profile);
          if (score_0 - bestScore_0 > 0.05) {
            bestScore_0 = score_0;
            bestIndex_0 = i_0;
          }
        }
         while (inductionVariable_0 < last_0);
      content = pool.a3(bestIndex_0);
      // Inline function 'kotlin.collections.plusAssign' call
      var element_0 = candidateEntry('content', content, false);
      entries.f(element_0);
    }
    var tmp_1;
    if (metadata == null) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      tmp_1 = !pool.p();
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      // Inline function 'io.github.alph_a07.basis.theme.resolution.fonts.CandidateAssigner.pickCandidate' call
      var bestIndex_1 = 0;
      var it_3 = pool.n(0);
      var bestScore_1 = scoreCandidate(CandidateAssigner_instance, it_3, 'metadata', profile);
      var inductionVariable_1 = 1;
      var last_1 = pool.m();
      if (inductionVariable_1 < last_1)
        do {
          var i_1 = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          var it_4 = pool.n(i_1);
          var score_1 = scoreCandidate(CandidateAssigner_instance, it_4, 'metadata', profile);
          if (score_1 - bestScore_1 > 0.05) {
            bestScore_1 = score_1;
            bestIndex_1 = i_1;
          }
        }
         while (inductionVariable_1 < last_1);
      metadata = pool.a3(bestIndex_1);
      // Inline function 'kotlin.collections.plusAssign' call
      var element_1 = candidateEntry('metadata', metadata, false);
      entries.f(element_1);
    }
    return new AssignedLadders(structure, content, metadata, pool);
  }
  function scoreCandidate($this, ref, ladder, profile) {
    var tmp;
    if (ref instanceof Catalog) {
      tmp = GoogleFontCatalog_getInstance().i21(ref.b21_1);
    } else {
      if (ref instanceof Custom) {
        tmp = null;
      } else {
        noWhenBranchMatchedException();
      }
    }
    var tmp1_elvis_lhs = tmp;
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      return 0.5;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var entry = tmp_0;
    var tmp_1;
    switch (ladder) {
      case 'structure':
        // Inline function 'kotlin.math.abs' call

        var x = entry.r21_1 - get_typographyExpressiveness01(profile);
        var fit = 1.0 - Math.abs(x);
        tmp_1 = entry.o21_1 + 0.15 * fit;
        break;
      case 'content':
        tmp_1 = entry.p21_1;
        break;
      default:
        tmp_1 = entry.q21_1;
        break;
    }
    return tmp_1;
  }
  function CandidateAssigner() {
  }
  protoOf(CandidateAssigner).z21 = function (candidates, pinnedStructure, pinnedContent, pinnedMetadata, profile, entries) {
    var tmp;
    if (candidates.m() === 1) {
      tmp = assignSingle(this, candidates.n(0), pinnedStructure, pinnedContent, pinnedMetadata, entries);
    } else {
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!candidates.p()) {
        tmp = assignMultiple(this, candidates, pinnedStructure, pinnedContent, pinnedMetadata, profile, entries);
      } else {
        tmp = new AssignedLadders(pinnedStructure, pinnedContent, pinnedMetadata, emptyList());
      }
    }
    return tmp;
  };
  var CandidateAssigner_instance;
  function CandidateAssigner_getInstance() {
    return CandidateAssigner_instance;
  }
  function fallbackEntry(ladder, fallback, isDynamic) {
    var tmp = 'typography.' + ladder;
    var tmp_0 = ResolutionStage_Fonts_getInstance();
    var tmp_1 = ReportStatus_Absent_getInstance();
    var tmp_2;
    if (isDynamic) {
      tmp_2 = 'No requested family fills the ' + ladder + ' ladder; derived dynamically from catalog based on intent.';
    } else {
      tmp_2 = 'No requested family fills the ' + ladder + ' ladder; derivation bias applied.';
    }
    return new ReportEntry(tmp, tmp_0, tmp_1, tmp_2, VOID, get_label(fallback));
  }
  function lockEntries(locks) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(locks.m());
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = locks.w1().j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var path = item.p1();
      // Inline function 'kotlin.collections.component2' call
      var family = item.q1();
      var tmp$ret$3 = new ReportEntry(path.v1c_1, ResolutionStage_Fonts_getInstance(), ReportStatus_Honored_getInstance(), 'Per-level Control lock wins over the ladder family.', get_label(family));
      destination.f(tmp$ret$3);
    }
    return destination;
  }
  function get_label(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof Catalog) {
      tmp = 'catalog:' + _GoogleFontId___get_value__impl__s94bce(_this__u8e3s4.b21_1);
    } else {
      if (_this__u8e3s4 instanceof Custom) {
        tmp = 'custom:' + _CustomFontKey___get_value__impl__mpjcc2(_this__u8e3s4.i22_1);
      } else {
        noWhenBranchMatchedException();
      }
    }
    return tmp;
  }
  function candidateEntry(ladder, candidate, isReuse) {
    var tmp = 'typography.' + ladder;
    var tmp_0 = ResolutionStage_Fonts_getInstance();
    var tmp_1 = ReportStatus_Modulated_getInstance();
    var tmp_2;
    if (isReuse) {
      tmp_2 = 'Single candidate reused for the ' + ladder + ' ladder.';
    } else {
      tmp_2 = 'Candidate assigned to the ' + ladder + ' ladder by pairing order.';
    }
    return new ReportEntry(tmp, tmp_0, tmp_1, tmp_2, get_label(candidate));
  }
  function decode$readByte($bytes, pos) {
    var _unary__edvuaz = pos._v;
    pos._v = _unary__edvuaz + 1 | 0;
    return $bytes[_unary__edvuaz] & 255;
  }
  function decode$readShort($bytes, pos) {
    var _unary__edvuaz = pos._v;
    pos._v = _unary__edvuaz + 1 | 0;
    var b0 = $bytes[_unary__edvuaz] & 255;
    var _unary__edvuaz_0 = pos._v;
    pos._v = _unary__edvuaz_0 + 1 | 0;
    var b1 = $bytes[_unary__edvuaz_0] & 255;
    return b0 << 8 | b1;
  }
  function decode$readInt($bytes, pos) {
    var _unary__edvuaz = pos._v;
    pos._v = _unary__edvuaz + 1 | 0;
    var b0 = $bytes[_unary__edvuaz] & 255;
    var _unary__edvuaz_0 = pos._v;
    pos._v = _unary__edvuaz_0 + 1 | 0;
    var b1 = $bytes[_unary__edvuaz_0] & 255;
    var _unary__edvuaz_1 = pos._v;
    pos._v = _unary__edvuaz_1 + 1 | 0;
    var b2 = $bytes[_unary__edvuaz_1] & 255;
    var _unary__edvuaz_2 = pos._v;
    pos._v = _unary__edvuaz_2 + 1 | 0;
    var b3 = $bytes[_unary__edvuaz_2] & 255;
    return b0 << 24 | b1 << 16 | b2 << 8 | b3;
  }
  function decode$readFloat($bytes, pos) {
    // Inline function 'kotlin.fromBits' call
    var bits = decode$readInt($bytes, pos);
    return floatFromBits(bits);
  }
  function decode$readUtf($bytes, pos) {
    var len = decode$readShort($bytes, pos);
    var str = decodeToString($bytes, pos._v, pos._v + len | 0);
    pos._v = pos._v + len | 0;
    return str;
  }
  function FontCatalogDecoder() {
    this.j22_1 = 0;
    this.k22_1 = 1;
    this.l22_1 = 2;
    this.m22_1 = 3;
    this.n22_1 = 4;
    this.o22_1 = 10;
    this.p22_1 = 255;
    this.q22_1 = 8;
    this.r22_1 = 3;
    this.s22_1 = 1;
    this.t22_1 = 2;
    this.u22_1 = 66;
    this.v22_1 = 70;
    this.w22_1 = 78;
    this.x22_1 = 84;
  }
  protoOf(FontCatalogDecoder).y22 = function (bytes) {
    // Inline function 'kotlin.check' call
    if (!(bytes.length >= 10)) {
      var message = 'Font catalog buffer too small.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    var pos = {_v: 0};
    var _unary__edvuaz = pos._v;
    pos._v = _unary__edvuaz + 1 | 0;
    var magic0 = bytes[_unary__edvuaz];
    var _unary__edvuaz_0 = pos._v;
    pos._v = _unary__edvuaz_0 + 1 | 0;
    var magic1 = bytes[_unary__edvuaz_0];
    var _unary__edvuaz_1 = pos._v;
    pos._v = _unary__edvuaz_1 + 1 | 0;
    var magic2 = bytes[_unary__edvuaz_1];
    var _unary__edvuaz_2 = pos._v;
    pos._v = _unary__edvuaz_2 + 1 | 0;
    var magic3 = bytes[_unary__edvuaz_2];
    // Inline function 'kotlin.check' call
    if (!(magic0 === 66 && magic1 === 70 && magic2 === 78 && magic3 === 84)) {
      var message_0 = 'Invalid catalog asset magic bytes.';
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    var version = decode$readShort(bytes, pos);
    // Inline function 'kotlin.check' call
    if (!(version === 3)) {
      var message_1 = 'Unsupported catalog format version: ' + version;
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
    var count = decode$readInt(bytes, pos);
    var entries = ArrayList_init_$Create$(count);
    // Inline function 'kotlin.repeat' call
    var inductionVariable = 0;
    if (inductionVariable < count)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var id = _GoogleFontId___init__impl__gzte8y(decode$readUtf(bytes, pos));
        var familyName = decode$readUtf(bytes, pos);
        var googleFontsKey = decode$readUtf(bytes, pos);
        var category = FontCatalogDecoder_instance.z22(decode$readByte(bytes, pos));
        var flags = decode$readByte(bytes, pos);
        var serif = !((flags & 1) === 0);
        var mono = !((flags & 2) === 0);
        var weightsCount = decode$readByte(bytes, pos);
        var displayAffinity = decode$readFloat(bytes, pos);
        var textAffinity = decode$readFloat(bytes, pos);
        var metaAffinity = decode$readFloat(bytes, pos);
        var expressiveness = decode$readFloat(bytes, pos);
        var roundness = decode$readFloat(bytes, pos);
        var opticalDensity = decode$readFloat(bytes, pos);
        var minOpticalSizeDp = decode$readFloat(bytes, pos);
        var lightModeWeightBias = toShort(decode$readShort(bytes, pos));
        var axisCount = decode$readShort(bytes, pos);
        var tmp;
        if (axisCount === 0) {
          tmp = emptySet();
        } else {
          var set = LinkedHashSet_init_$Create$_0(axisCount);
          // Inline function 'kotlin.repeat' call
          var inductionVariable_0 = 0;
          if (inductionVariable_0 < axisCount)
            do {
              var index_0 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var tag = decode$readUtf(bytes, pos);
              var min = decode$readFloat(bytes, pos);
              var max = decode$readFloat(bytes, pos);
              var defaultValue = decode$readFloat(bytes, pos);
              set.f(new FontAxis(tag, min, max, defaultValue));
            }
             while (inductionVariable_0 < axisCount);
          tmp = set;
        }
        var axes = tmp;
        entries.f(new FontCatalogEntry(id, familyName, googleFontsKey, category, axes, displayAffinity, textAffinity, metaAffinity, expressiveness, roundness, serif, mono, weightsCount, opticalDensity, minOpticalSizeDp, lightModeWeightBias));
      }
       while (inductionVariable < count);
    return entries;
  };
  protoOf(FontCatalogDecoder).z22 = function (code) {
    var tmp;
    switch (code) {
      case 0:
        tmp = GoogleFontsCategory_SansSerif_getInstance();
        break;
      case 1:
        tmp = GoogleFontsCategory_Serif_getInstance();
        break;
      case 2:
        tmp = GoogleFontsCategory_Display_getInstance();
        break;
      case 3:
        tmp = GoogleFontsCategory_Handwriting_getInstance();
        break;
      case 4:
        tmp = GoogleFontsCategory_Monospace_getInstance();
        break;
      default:
        // Inline function 'kotlin.error' call

        var message = 'Unsupported Google Fonts category code: ' + code;
        throw IllegalStateException_init_$Create$(toString(message));
    }
    return tmp;
  };
  var FontCatalogDecoder_instance;
  function FontCatalogDecoder_getInstance() {
    return FontCatalogDecoder_instance;
  }
  function scoreStructureEntry($this, entry, targetExpr, targetRound, trust) {
    // Inline function 'kotlin.math.abs' call
    var x = entry.r21_1 - targetExpr;
    var exprFit = 1.0 - Math.abs(x);
    // Inline function 'kotlin.math.abs' call
    var x_0 = entry.s21_1 - targetRound;
    var roundFit = 1.0 - Math.abs(x_0);
    var trustPenalty = entry.r21_1 * trust * 0.25;
    var tmp;
    if (entry.v21_1 < 3 && (targetExpr < 0.6 || trust > 0.4)) {
      tmp = 0.3;
    } else {
      tmp = 0.0;
    }
    var weightPenalty = tmp;
    return 0.4 * entry.o21_1 + 0.3 * exprFit + 0.3 * roundFit - trustPenalty - weightPenalty;
  }
  function scoreContentEntry($this, entry, targetRound, trust) {
    // Inline function 'kotlin.math.abs' call
    var x = entry.s21_1 - targetRound;
    var roundFit = 1.0 - Math.abs(x);
    var trustBonus = trust * entry.p21_1 * 0.1;
    return entry.p21_1 + 0.15 * roundFit + trustBonus;
  }
  function scoreMetadataEntry($this, entry, targetRound, density) {
    // Inline function 'kotlin.math.abs' call
    var x = entry.s21_1 - targetRound;
    var roundFit = 1.0 - Math.abs(x);
    var tmp;
    if (entry.u21_1) {
      var tmp_0;
      if (density >= 0.6) {
        tmp_0 = 0.1 + density * 0.08;
      } else {
        tmp_0 = 0.0;
      }
      tmp = tmp_0;
    } else {
      tmp = 0.0;
    }
    var monoBonus = tmp;
    return entry.q21_1 + 0.1 * roundFit + monoBonus;
  }
  function isEligibleForContent($this, entry) {
    return !entry.u21_1 && !entry.m21_1.equals(GoogleFontsCategory_Display_getInstance()) && entry.p21_1 >= 0.5 && entry.w21_1 >= 0.35;
  }
  function isBetterCandidate($this, score, bestEntry, bestScore) {
    return bestEntry == null || score > bestScore + 1.0E-4;
  }
  function FontCatalogDerivation() {
  }
  protoOf(FontCatalogDerivation).f22 = function (profile) {
    var targetExpr = get_typographyExpressiveness01(profile);
    var targetRound = get_roundness01(profile);
    var trust = get_trustStrictness01(profile);
    var bestEntry = null;
    var bestScore = -Infinity;
    var _iterator__ex2g4s = GoogleFontCatalog_getInstance().a23().j();
    while (_iterator__ex2g4s.k()) {
      var entry = _iterator__ex2g4s.l();
      var score = scoreStructureEntry(this, entry, targetExpr, targetRound, trust);
      if (isBetterCandidate(this, score, bestEntry, bestScore)) {
        bestScore = score;
        bestEntry = entry;
      }
    }
    var tmp0_safe_receiver = bestEntry;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j21_1;
    var tmp;
    var tmp_0 = tmp1_elvis_lhs;
    if ((tmp_0 == null ? null : new GoogleFontId(tmp_0)) == null) {
      var tmp_1 = DefaultFontBias_getInstance().v1v_1;
      tmp = (tmp_1 instanceof Catalog ? tmp_1 : THROW_CCE()).b21_1;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var selectedId = tmp;
    return new Catalog(selectedId);
  };
  protoOf(FontCatalogDerivation).g22 = function (profile) {
    var targetRound = get_roundness01(profile);
    var trust = get_trustStrictness01(profile);
    var bestEntry = null;
    var bestScore = -Infinity;
    var _iterator__ex2g4s = GoogleFontCatalog_getInstance().a23().j();
    $l$loop: while (_iterator__ex2g4s.k()) {
      var entry = _iterator__ex2g4s.l();
      if (!isEligibleForContent(this, entry)) {
        continue $l$loop;
      }
      var score = scoreContentEntry(this, entry, targetRound, trust);
      if (isBetterCandidate(this, score, bestEntry, bestScore)) {
        bestScore = score;
        bestEntry = entry;
      }
    }
    var tmp0_safe_receiver = bestEntry;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j21_1;
    var tmp;
    var tmp_0 = tmp1_elvis_lhs;
    if ((tmp_0 == null ? null : new GoogleFontId(tmp_0)) == null) {
      var tmp_1 = DefaultFontBias_getInstance().u1v_1;
      tmp = (tmp_1 instanceof Catalog ? tmp_1 : THROW_CCE()).b21_1;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var selectedId = tmp;
    return new Catalog(selectedId);
  };
  protoOf(FontCatalogDerivation).h22 = function (profile) {
    var targetRound = get_roundness01(profile);
    var density = get_dataDensity01(profile);
    var bestEntry = null;
    var bestScore = -Infinity;
    var _iterator__ex2g4s = GoogleFontCatalog_getInstance().a23().j();
    $l$loop: while (_iterator__ex2g4s.k()) {
      var entry = _iterator__ex2g4s.l();
      if (entry.w21_1 < 0.35 || entry.q21_1 < 0.4) {
        continue $l$loop;
      }
      var score = scoreMetadataEntry(this, entry, targetRound, density);
      if (isBetterCandidate(this, score, bestEntry, bestScore)) {
        bestScore = score;
        bestEntry = entry;
      }
    }
    var tmp0_safe_receiver = bestEntry;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j21_1;
    var tmp;
    var tmp_0 = tmp1_elvis_lhs;
    if ((tmp_0 == null ? null : new GoogleFontId(tmp_0)) == null) {
      var tmp_1 = DefaultFontBias_getInstance().w1v_1;
      tmp = (tmp_1 instanceof Catalog ? tmp_1 : THROW_CCE()).b21_1;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var selectedId = tmp;
    return new Catalog(selectedId);
  };
  var FontCatalogDerivation_instance;
  function FontCatalogDerivation_getInstance() {
    return FontCatalogDerivation_instance;
  }
  var static_init_called_19;
  function static_init_19() {
    if (static_init_called_19)
      return Unit_instance;
    static_init_called_19 = true;
    GoogleFontsCategory_SansSerif_instance = new GoogleFontsCategory('SansSerif', 0);
    GoogleFontsCategory_Serif_instance = new GoogleFontsCategory('Serif', 1);
    GoogleFontsCategory_Display_instance = new GoogleFontsCategory('Display', 2);
    GoogleFontsCategory_Handwriting_instance = new GoogleFontsCategory('Handwriting', 3);
    GoogleFontsCategory_Monospace_instance = new GoogleFontsCategory('Monospace', 4);
  }
  var GoogleFontsCategory_SansSerif_instance;
  var GoogleFontsCategory_Serif_instance;
  var GoogleFontsCategory_Display_instance;
  var GoogleFontsCategory_Handwriting_instance;
  var GoogleFontsCategory_Monospace_instance;
  function GoogleFontsCategory(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function FontCatalogEntry(id, familyName, googleFontsKey, category, axes, displayAffinity, textAffinity, metaAffinity, expressiveness, roundness, serif, mono, weightsCount, opticalDensity, minOpticalSizeDp, lightModeWeightBias) {
    weightsCount = weightsCount === VOID ? 1 : weightsCount;
    opticalDensity = opticalDensity === VOID ? 0.5 : opticalDensity;
    minOpticalSizeDp = minOpticalSizeDp === VOID ? 11.0 : minOpticalSizeDp;
    lightModeWeightBias = lightModeWeightBias === VOID ? 0 : lightModeWeightBias;
    this.j21_1 = id;
    this.k21_1 = familyName;
    this.l21_1 = googleFontsKey;
    this.m21_1 = category;
    this.n21_1 = axes;
    this.o21_1 = displayAffinity;
    this.p21_1 = textAffinity;
    this.q21_1 = metaAffinity;
    this.r21_1 = expressiveness;
    this.s21_1 = roundness;
    this.t21_1 = serif;
    this.u21_1 = mono;
    this.v21_1 = weightsCount;
    this.w21_1 = opticalDensity;
    this.x21_1 = minOpticalSizeDp;
    this.y21_1 = lightModeWeightBias;
    // Inline function 'kotlin.text.isNotBlank' call
    var this_0 = this.k21_1;
    // Inline function 'kotlin.require' call
    if (!!isBlank(this_0)) {
      var message = 'FontCatalogEntry familyName must not be blank.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.text.isNotBlank' call
    var this_1 = this.l21_1;
    // Inline function 'kotlin.require' call
    if (!!isBlank(this_1)) {
      var message_0 = 'FontCatalogEntry googleFontsKey must not be blank.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var containsArg = this.o21_1;
    // Inline function 'kotlin.require' call
    if (!(0.0 <= containsArg ? containsArg <= 1.0 : false)) {
      var message_1 = 'displayAffinity must be between 0.0 and 1.0, was ' + this.o21_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
    var containsArg_0 = this.p21_1;
    // Inline function 'kotlin.require' call
    if (!(0.0 <= containsArg_0 ? containsArg_0 <= 1.0 : false)) {
      var message_2 = 'textAffinity must be between 0.0 and 1.0, was ' + this.p21_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_2));
    }
    var containsArg_1 = this.q21_1;
    // Inline function 'kotlin.require' call
    if (!(0.0 <= containsArg_1 ? containsArg_1 <= 1.0 : false)) {
      var message_3 = 'metaAffinity must be between 0.0 and 1.0, was ' + this.q21_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_3));
    }
    var containsArg_2 = this.r21_1;
    // Inline function 'kotlin.require' call
    if (!(0.0 <= containsArg_2 ? containsArg_2 <= 1.0 : false)) {
      var message_4 = 'expressiveness must be between 0.0 and 1.0, was ' + this.r21_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_4));
    }
    var containsArg_3 = this.s21_1;
    // Inline function 'kotlin.require' call
    if (!(0.0 <= containsArg_3 ? containsArg_3 <= 1.0 : false)) {
      var message_5 = 'roundness must be between 0.0 and 1.0, was ' + this.s21_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_5));
    }
    // Inline function 'kotlin.require' call
    if (!(this.v21_1 >= 1)) {
      var message_6 = 'weightsCount must be >= 1, was ' + this.v21_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_6));
    }
    var containsArg_4 = this.w21_1;
    // Inline function 'kotlin.require' call
    if (!(0.0 <= containsArg_4 ? containsArg_4 <= 1.0 : false)) {
      var message_7 = 'opticalDensity must be between 0.0 and 1.0, was ' + this.w21_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_7));
    }
    // Inline function 'kotlin.require' call
    if (!(this.x21_1 >= 0.0)) {
      var message_8 = 'minOpticalSizeDp must be >= 0.0, was ' + this.x21_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_8));
    }
    var containsArg_5 = this.y21_1;
    // Inline function 'kotlin.require' call
    if (!(0 <= containsArg_5 ? containsArg_5 <= 1000 : false)) {
      var message_9 = 'lightModeWeightBias must be between 0 and 1000, was ' + this.y21_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message_9));
    }
  }
  protoOf(FontCatalogEntry).toString = function () {
    return 'FontCatalogEntry(id=' + GoogleFontId__toString_impl_cx2z1e(this.j21_1) + ', familyName=' + this.k21_1 + ', googleFontsKey=' + this.l21_1 + ', category=' + this.m21_1.toString() + ', axes=' + toString(this.n21_1) + ', displayAffinity=' + this.o21_1 + ', textAffinity=' + this.p21_1 + ', metaAffinity=' + this.q21_1 + ', expressiveness=' + this.r21_1 + ', roundness=' + this.s21_1 + ', serif=' + this.t21_1 + ', mono=' + this.u21_1 + ', weightsCount=' + this.v21_1 + ', opticalDensity=' + this.w21_1 + ', minOpticalSizeDp=' + this.x21_1 + ', lightModeWeightBias=' + this.y21_1 + ')';
  };
  protoOf(FontCatalogEntry).hashCode = function () {
    var result = GoogleFontId__hashCode_impl_yo8vu9(this.j21_1);
    result = imul(result, 31) + getStringHashCode(this.k21_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.l21_1) | 0;
    result = imul(result, 31) + this.m21_1.hashCode() | 0;
    result = imul(result, 31) + hashCode(this.n21_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.o21_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.p21_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.q21_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.r21_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.s21_1) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.t21_1) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.u21_1) | 0;
    result = imul(result, 31) + this.v21_1 | 0;
    result = imul(result, 31) + getNumberHashCode(this.w21_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.x21_1) | 0;
    result = imul(result, 31) + this.y21_1 | 0;
    return result;
  };
  protoOf(FontCatalogEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FontCatalogEntry))
      return false;
    if (!(this.j21_1 === other.j21_1))
      return false;
    if (!(this.k21_1 === other.k21_1))
      return false;
    if (!(this.l21_1 === other.l21_1))
      return false;
    if (!this.m21_1.equals(other.m21_1))
      return false;
    if (!equals(this.n21_1, other.n21_1))
      return false;
    if (!equals(this.o21_1, other.o21_1))
      return false;
    if (!equals(this.p21_1, other.p21_1))
      return false;
    if (!equals(this.q21_1, other.q21_1))
      return false;
    if (!equals(this.r21_1, other.r21_1))
      return false;
    if (!equals(this.s21_1, other.s21_1))
      return false;
    if (!(this.t21_1 === other.t21_1))
      return false;
    if (!(this.u21_1 === other.u21_1))
      return false;
    if (!(this.v21_1 === other.v21_1))
      return false;
    if (!equals(this.w21_1, other.w21_1))
      return false;
    if (!equals(this.x21_1, other.x21_1))
      return false;
    if (!(this.y21_1 === other.y21_1))
      return false;
    return true;
  };
  function FontAxis(tag, min, max, defaultValue) {
    this.b23_1 = tag;
    this.c23_1 = min;
    this.d23_1 = max;
    this.e23_1 = defaultValue;
    // Inline function 'kotlin.text.isNotBlank' call
    var this_0 = this.b23_1;
    // Inline function 'kotlin.require' call
    if (!!isBlank(this_0)) {
      var message = 'FontAxis tag must not be blank.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(this.c23_1 <= this.d23_1)) {
      var message_0 = 'FontAxis min (' + this.c23_1 + ') must be <= max (' + this.d23_1 + ').';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  protoOf(FontAxis).toString = function () {
    return 'FontAxis(tag=' + this.b23_1 + ', min=' + this.c23_1 + ', max=' + this.d23_1 + ', defaultValue=' + this.e23_1 + ')';
  };
  protoOf(FontAxis).hashCode = function () {
    var result = getStringHashCode(this.b23_1);
    result = imul(result, 31) + getNumberHashCode(this.c23_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.d23_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.e23_1) | 0;
    return result;
  };
  protoOf(FontAxis).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FontAxis))
      return false;
    if (!(this.b23_1 === other.b23_1))
      return false;
    if (!equals(this.c23_1, other.c23_1))
      return false;
    if (!equals(this.d23_1, other.d23_1))
      return false;
    if (!equals(this.e23_1, other.e23_1))
      return false;
    return true;
  };
  function GoogleFontsCategory_SansSerif_getInstance() {
    static_init_19();
    return GoogleFontsCategory_SansSerif_instance;
  }
  function GoogleFontsCategory_Serif_getInstance() {
    static_init_19();
    return GoogleFontsCategory_Serif_instance;
  }
  function GoogleFontsCategory_Display_getInstance() {
    static_init_19();
    return GoogleFontsCategory_Display_instance;
  }
  function GoogleFontsCategory_Handwriting_getInstance() {
    static_init_19();
    return GoogleFontsCategory_Handwriting_instance;
  }
  function GoogleFontsCategory_Monospace_getInstance() {
    static_init_19();
    return GoogleFontsCategory_Monospace_instance;
  }
  function FontStage() {
  }
  protoOf(FontStage).w1r = function (context) {
    var fonts = resolveFontRoles(context.q1q_1, context.u1q_1);
    context.w1q_1 = fonts;
    context.m1r(fonts.t1r_1);
  };
  protoOf(FontStage).x1r = function (context, mode) {
    // Inline function 'kotlin.requireNotNull' call
    var tmp0 = context.z1q_1.t1(mode);
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Required value was null.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = tmp0;
        break $l$block;
      }
    }
    var draft = tmp$ret$1;
    var isDark = mode.equals(ThemeMode_Dark_getInstance());
    var tmp0_0 = context.z1q_1;
    // Inline function 'kotlin.requireNotNull' call
    var tmp0_1 = context.w1q_1;
    var tmp$ret$4;
    $l$block_0: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0_1 == null) {
        var message_0 = 'Required value was null.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      } else {
        tmp$ret$4 = tmp0_1;
        break $l$block_0;
      }
    }
    var tmp = tmp$ret$4;
    var tmp0_safe_receiver = context.q1q_1.i1r_1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.p1g_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.f1j_1;
    // Inline function 'kotlin.collections.set' call
    var value = draft.y1s(VOID, VOID, applyResolvedFonts(draft.a1s_1, tmp, tmp2_elvis_lhs == null ? emptyMap() : tmp2_elvis_lhs, isDark));
    tmp0_0.x1(mode, value);
  };
  var FontStage_instance;
  function FontStage_getInstance() {
    return FontStage_instance;
  }
  function _get_byNormalizedKey__357skg($this) {
    var tmp0 = $this.g21_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('byNormalizedKey', 1, tmp, GoogleFontCatalog$_get_byNormalizedKey_$ref_8mv6l8(), null);
    return tmp0.q1();
  }
  function normalizeKey($this, raw) {
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = toString(trim(isCharSequence(raw) ? raw : THROW_CCE())).toLowerCase();
    return replace(replace(tmp$ret$1, _Char___init__impl__6a9atx(95), _Char___init__impl__6a9atx(45)), _Char___init__impl__6a9atx(32), _Char___init__impl__6a9atx(45));
  }
  function sam$kotlin_Comparator$0(function_0) {
    this.f23_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).ba = function (a, b) {
    return this.f23_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.ba(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).i2 = function () {
    return this.f23_1;
  };
  protoOf(sam$kotlin_Comparator$0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.i2(), other.i2());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlin_Comparator$0).hashCode = function () {
    return hashCode(this.i2());
  };
  function sam$kotlin_Comparator$0_0(function_0) {
    this.g23_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_0).ba = function (a, b) {
    return this.g23_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).compare = function (a, b) {
    return this.ba(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).i2 = function () {
    return this.g23_1;
  };
  protoOf(sam$kotlin_Comparator$0_0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.i2(), other.i2());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlin_Comparator$0_0).hashCode = function () {
    return hashCode(this.i2());
  };
  function sam$kotlin_Comparator$0_1(function_0) {
    this.h23_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_1).ba = function (a, b) {
    return this.h23_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_1).compare = function (a, b) {
    return this.ba(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_1).i2 = function () {
    return this.h23_1;
  };
  protoOf(sam$kotlin_Comparator$0_1).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.i2(), other.i2());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlin_Comparator$0_1).hashCode = function () {
    return hashCode(this.i2());
  };
  function GoogleFontCatalog$all$delegate$lambda() {
    return loadFontCatalogEntries();
  }
  function GoogleFontCatalog$_get_all_$ref_vxc2to() {
    return constructCallableReference(function (p0) {
      return p0.a23();
    }, 1, 0, 9);
  }
  function GoogleFontCatalog$topStructureCandidates$delegate$lambda() {
    var tmp = asSequence(GoogleFontCatalog_getInstance().a23());
    // Inline function 'kotlin.sequences.sortedByDescending' call
    var this_0 = filter(tmp, GoogleFontCatalog$topStructureCandidates$delegate$lambda$lambda);
    // Inline function 'kotlin.comparisons.compareByDescending' call
    var tmp_0 = GoogleFontCatalog$topStructureCandidates$delegate$lambda$lambda_0;
    var tmp$ret$1 = new sam$kotlin_Comparator$0(tmp_0);
    var tmp$ret$0 = sortedWith(this_0, tmp$ret$1);
    return toList(take(tmp$ret$0, 50));
  }
  function GoogleFontCatalog$topStructureCandidates$delegate$lambda$lambda(it) {
    return it.o21_1 >= 0.6;
  }
  function GoogleFontCatalog$topStructureCandidates$delegate$lambda$lambda_0(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = b.o21_1;
    var tmp$ret$2 = a.o21_1;
    return compareValues(tmp, tmp$ret$2);
  }
  function GoogleFontCatalog$topContentCandidates$delegate$lambda() {
    var tmp = asSequence(GoogleFontCatalog_getInstance().a23());
    // Inline function 'kotlin.sequences.sortedByDescending' call
    var this_0 = filter(tmp, GoogleFontCatalog$topContentCandidates$delegate$lambda$lambda);
    // Inline function 'kotlin.comparisons.compareByDescending' call
    var tmp_0 = GoogleFontCatalog$topContentCandidates$delegate$lambda$lambda_0;
    var tmp$ret$1 = new sam$kotlin_Comparator$0_0(tmp_0);
    var tmp$ret$0 = sortedWith(this_0, tmp$ret$1);
    return toList(take(tmp$ret$0, 50));
  }
  function GoogleFontCatalog$topContentCandidates$delegate$lambda$lambda(it) {
    return it.p21_1 >= 0.7;
  }
  function GoogleFontCatalog$topContentCandidates$delegate$lambda$lambda_0(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = b.p21_1;
    var tmp$ret$2 = a.p21_1;
    return compareValues(tmp, tmp$ret$2);
  }
  function GoogleFontCatalog$topMetadataCandidates$delegate$lambda() {
    var tmp = asSequence(GoogleFontCatalog_getInstance().a23());
    // Inline function 'kotlin.sequences.sortedByDescending' call
    var this_0 = filter(tmp, GoogleFontCatalog$topMetadataCandidates$delegate$lambda$lambda);
    // Inline function 'kotlin.comparisons.compareByDescending' call
    var tmp_0 = GoogleFontCatalog$topMetadataCandidates$delegate$lambda$lambda_0;
    var tmp$ret$1 = new sam$kotlin_Comparator$0_1(tmp_0);
    var tmp$ret$0 = sortedWith(this_0, tmp$ret$1);
    return toList(take(tmp$ret$0, 50));
  }
  function GoogleFontCatalog$topMetadataCandidates$delegate$lambda$lambda(it) {
    return it.q21_1 >= 0.65;
  }
  function GoogleFontCatalog$topMetadataCandidates$delegate$lambda$lambda_0(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = b.q21_1;
    var tmp$ret$2 = a.q21_1;
    return compareValues(tmp, tmp$ret$2);
  }
  function GoogleFontCatalog$byNormalizedKey$delegate$lambda() {
    var map = LinkedHashMap_init_$Create$_0(imul(GoogleFontCatalog_getInstance().a23().m(), 2));
    var _iterator__ex2g4s = GoogleFontCatalog_getInstance().a23().j();
    while (_iterator__ex2g4s.k()) {
      var entry = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.set' call
      var key = normalizeKey(GoogleFontCatalog_getInstance(), _GoogleFontId___get_value__impl__s94bce(entry.j21_1));
      map.x1(key, entry);
      // Inline function 'kotlin.collections.set' call
      var key_0 = normalizeKey(GoogleFontCatalog_getInstance(), entry.k21_1);
      map.x1(key_0, entry);
    }
    return map;
  }
  function GoogleFontCatalog$_get_byNormalizedKey_$ref_8mv6l8() {
    return constructCallableReference(function (p0) {
      return _get_byNormalizedKey__357skg(p0);
    }, 1, 0, 10);
  }
  function GoogleFontCatalog$byCategoryMap$delegate$lambda() {
    // Inline function 'kotlin.collections.groupBy' call
    var tmp0 = GoogleFontCatalog_getInstance().a23();
    // Inline function 'kotlin.collections.groupByTo' call
    var destination = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s = tmp0.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      var key = element.m21_1;
      // Inline function 'kotlin.collections.getOrPut' call
      var value = destination.t1(key);
      var tmp;
      if (value == null) {
        var answer = ArrayList_init_$Create$_0();
        destination.x1(key, answer);
        tmp = answer;
      } else {
        tmp = value;
      }
      var list = tmp;
      list.f(element);
    }
    return destination;
  }
  function GoogleFontCatalog() {
    GoogleFontCatalog_instance = this;
    var tmp = this;
    tmp.c21_1 = lazy_0(GoogleFontCatalog$all$delegate$lambda);
    var tmp_0 = this;
    tmp_0.d21_1 = lazy_0(GoogleFontCatalog$topStructureCandidates$delegate$lambda);
    var tmp_1 = this;
    tmp_1.e21_1 = lazy_0(GoogleFontCatalog$topContentCandidates$delegate$lambda);
    var tmp_2 = this;
    tmp_2.f21_1 = lazy_0(GoogleFontCatalog$topMetadataCandidates$delegate$lambda);
    var tmp_3 = this;
    tmp_3.g21_1 = lazy_0(GoogleFontCatalog$byNormalizedKey$delegate$lambda);
    var tmp_4 = this;
    tmp_4.h21_1 = lazy_0(GoogleFontCatalog$byCategoryMap$delegate$lambda);
  }
  protoOf(GoogleFontCatalog).a23 = function () {
    var tmp0 = this.c21_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('all', 1, tmp, GoogleFontCatalog$_get_all_$ref_vxc2to(), null);
    return tmp0.q1();
  };
  protoOf(GoogleFontCatalog).i21 = function (id) {
    return _get_byNormalizedKey__357skg(this).t1(normalizeKey(this, _GoogleFontId___get_value__impl__s94bce(id)));
  };
  var GoogleFontCatalog_instance;
  function GoogleFontCatalog_getInstance() {
    if (GoogleFontCatalog_instance == null)
      new GoogleFontCatalog();
    return GoogleFontCatalog_instance;
  }
  function applyResolvedFonts(typography, fonts, weightClamps, isDark) {
    isDark = isDark === VOID ? true : isDark;
    return typography.w1w(new StructureType(applyResolvedFonts$role(fonts, isDark, weightClamps, typography.c1d_1.w1c_1, TypographyTokenPath_StructureLevel1_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.c1d_1.x1c_1, TypographyTokenPath_StructureLevel2_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.c1d_1.y1c_1, TypographyTokenPath_StructureLevel3_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.c1d_1.z1c_1, TypographyTokenPath_StructureLevel4_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.c1d_1.a1d_1, TypographyTokenPath_StructureLevel5_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.c1d_1.b1d_1, TypographyTokenPath_StructureLevel6_getInstance())), new ContentType(applyResolvedFonts$role(fonts, isDark, weightClamps, typography.d1d_1.f1d_1, TypographyTokenPath_ContentLevel1_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.d1d_1.g1d_1, TypographyTokenPath_ContentLevel2_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.d1d_1.h1d_1, TypographyTokenPath_ContentLevel3_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.d1d_1.i1d_1, TypographyTokenPath_ContentLevel4_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.d1d_1.j1d_1, TypographyTokenPath_ContentLevel5_getInstance())), new MetadataType(applyResolvedFonts$role(fonts, isDark, weightClamps, typography.e1d_1.k1d_1, TypographyTokenPath_MetadataLevel1_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.e1d_1.l1d_1, TypographyTokenPath_MetadataLevel2_getInstance()), applyResolvedFonts$role(fonts, isDark, weightClamps, typography.e1d_1.m1d_1, TypographyTokenPath_MetadataLevel3_getInstance())));
  }
  function offsetWeight(weight, steps) {
    var target = _FontWeightValue___get_weight__impl__w0h7ri(weight) + imul(steps, 100) | 0;
    return _FontWeightValue___init__impl__p0bmnj(roundedWeight(target));
  }
  function clamp(_this__u8e3s4, weight) {
    if (_this__u8e3s4 == null)
      return weight;
    var tmp0_safe_receiver = _this__u8e3s4.j1j_1;
    var tmp;
    var tmp_0 = tmp0_safe_receiver;
    if ((tmp_0 == null ? null : new FontWeightValue(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = _FontWeightValue___get_weight__impl__w0h7ri(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    var lower = tmp1_elvis_lhs == null ? 100 : tmp1_elvis_lhs;
    var tmp2_safe_receiver = _this__u8e3s4.k1j_1;
    var tmp_1;
    var tmp_2 = tmp2_safe_receiver;
    if ((tmp_2 == null ? null : new FontWeightValue(tmp_2)) == null) {
      tmp_1 = null;
    } else {
      tmp_1 = _FontWeightValue___get_weight__impl__w0h7ri(tmp2_safe_receiver);
    }
    var tmp3_elvis_lhs = tmp_1;
    var upper = tmp3_elvis_lhs == null ? 900 : tmp3_elvis_lhs;
    return clampWeight(coerceIn_1(_FontWeightValue___get_weight__impl__w0h7ri(weight), lower, upper));
  }
  function roundedWeight(weight) {
    var rounded = imul((weight + 50 | 0) / 100 | 0, 100);
    return coerceIn_1(rounded, 100, 900);
  }
  function clampWeight(weight) {
    return _FontWeightValue___init__impl__p0bmnj(roundedWeight(weight));
  }
  function applyResolvedFonts$role($fonts, $isDark, $weightClamps, current, path) {
    var family = $fonts.i23(path);
    var tmp;
    var tmp_0;
    if (!$isDark) {
      tmp_0 = family instanceof Catalog;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var entry = GoogleFontCatalog_getInstance().i21(family.b21_1);
      var tmp1_elvis_lhs = entry == null ? null : entry.y21_1;
      tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    } else {
      tmp = 0;
    }
    var opticalBias = tmp;
    var biasedWeight = offsetWeight(current.n1y_1, opticalBias / 100 | 0);
    var clampedWeight = clamp($weightClamps.t1(path), biasedWeight);
    return current.n20(family, VOID, clampedWeight);
  }
  function ladderFamily($this, path) {
    var ladder = substringBefore(path.y1_1, 'Level');
    var tmp;
    switch (ladder) {
      case 'Structure':
        tmp = $this.o1r_1;
        break;
      case 'Content':
        tmp = $this.p1r_1;
        break;
      default:
        tmp = $this.q1r_1;
        break;
    }
    return tmp;
  }
  function ResolvedFonts(structure, content, metadata, levelFamilies, unusedCandidates, entries) {
    this.o1r_1 = structure;
    this.p1r_1 = content;
    this.q1r_1 = metadata;
    this.r1r_1 = levelFamilies;
    this.s1r_1 = unusedCandidates;
    this.t1r_1 = entries;
  }
  protoOf(ResolvedFonts).i23 = function (path) {
    var tmp0_elvis_lhs = this.r1r_1.t1(path);
    return tmp0_elvis_lhs == null ? ladderFamily(this, path) : tmp0_elvis_lhs;
  };
  protoOf(ResolvedFonts).toString = function () {
    return 'ResolvedFonts(structure=' + toString(this.o1r_1) + ', content=' + toString(this.p1r_1) + ', metadata=' + toString(this.q1r_1) + ', levelFamilies=' + toString(this.r1r_1) + ', unusedCandidates=' + toString(this.s1r_1) + ', entries=' + toString(this.t1r_1) + ')';
  };
  protoOf(ResolvedFonts).hashCode = function () {
    var result = hashCode(this.o1r_1);
    result = imul(result, 31) + hashCode(this.p1r_1) | 0;
    result = imul(result, 31) + hashCode(this.q1r_1) | 0;
    result = imul(result, 31) + hashCode(this.r1r_1) | 0;
    result = imul(result, 31) + hashCode(this.s1r_1) | 0;
    result = imul(result, 31) + hashCode(this.t1r_1) | 0;
    return result;
  };
  protoOf(ResolvedFonts).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ResolvedFonts))
      return false;
    if (!equals(this.o1r_1, other.o1r_1))
      return false;
    if (!equals(this.p1r_1, other.p1r_1))
      return false;
    if (!equals(this.q1r_1, other.q1r_1))
      return false;
    if (!equals(this.r1r_1, other.r1r_1))
      return false;
    if (!equals(this.s1r_1, other.s1r_1))
      return false;
    if (!equals(this.t1r_1, other.t1r_1))
      return false;
    return true;
  };
  function BrandTints(defaultSurface, elevated, borderStrong, selection) {
    this.s1y_1 = defaultSurface;
    this.t1y_1 = elevated;
    this.u1y_1 = borderStrong;
    this.v1y_1 = selection;
  }
  protoOf(BrandTints).toString = function () {
    return 'BrandTints(defaultSurface=' + this.s1y_1 + ', elevated=' + this.t1y_1 + ', borderStrong=' + this.u1y_1 + ', selection=' + this.v1y_1 + ')';
  };
  protoOf(BrandTints).hashCode = function () {
    var result = getNumberHashCode(this.s1y_1);
    result = imul(result, 31) + getNumberHashCode(this.t1y_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.u1y_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.v1y_1) | 0;
    return result;
  };
  protoOf(BrandTints).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BrandTints))
      return false;
    if (!equals(this.s1y_1, other.s1y_1))
      return false;
    if (!equals(this.t1y_1, other.t1y_1))
      return false;
    if (!equals(this.u1y_1, other.u1y_1))
      return false;
    if (!equals(this.v1y_1, other.v1y_1))
      return false;
    return true;
  };
  function brandAnchors(primary, supporting) {
    if (primary == null) {
      return null;
    }
    return new BrandColors(primary, getOrNull(supporting, 0), getOrNull(supporting, 1), getOrNull(supporting, 2));
  }
  function resolveBrandTints(presence, isDark, brandChroma) {
    brandChroma = brandChroma === VOID ? 0.0 : brandChroma;
    var tier = presence == null ? inferPresenceFromChroma(brandChroma) : presence;
    var lift = isDark ? 1.25 : 1.0;
    var tmp;
    switch (tier.z1_1) {
      case 0:
        tmp = new BrandTints(0.0, 0.0, 0.0, 0.12 * lift);
        break;
      case 1:
        tmp = new BrandTints(0.0, 0.0, 0.0, 0.18 * lift);
        break;
      case 2:
        tmp = new BrandTints(0.0, 0.05 * lift, 0.35, 0.24 * lift);
        break;
      case 3:
        tmp = new BrandTints(0.06 * lift, 0.04 * lift, 0.35, 0.28 * lift);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function inferPresenceFromChroma(brandChroma) {
    return brandChroma < 0.08 ? BrandPresence_Subtle_getInstance() : brandChroma < 0.18 ? BrandPresence_Balanced_getInstance() : BrandPresence_Strong_getInstance();
  }
  function IdentityStage() {
  }
  protoOf(IdentityStage).v1r = function (context) {
    var brandColor = context.q1q_1.c1r_1;
    var brand = brandAnchors(brandColor, context.q1q_1.d1r_1);
    context.x1q_1 = brand;
    if (!(brand == null)) {
      var tmp = context;
      // Inline function 'kotlin.collections.associateWith' call
      var this_0 = context.r1q_1;
      var result = LinkedHashMap_init_$Create$_0(coerceAtLeast_0(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16));
      // Inline function 'kotlin.collections.associateWithTo' call
      var _iterator__ex2g4s = this_0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        var tmp$ret$2 = resolveBrandTints(context.q1q_1.e1r_1, element.equals(ThemeMode_Dark_getInstance()), brand.e1a_1.h1f_1);
        result.x1(element, tmp$ret$2);
      }
      tmp.y1q_1 = result;
    }
  };
  var IdentityStage_instance;
  function IdentityStage_getInstance() {
    return IdentityStage_instance;
  }
  function blendMoodInfluence(profile, mood) {
    var scaledProfile = scaleInfluenceBiases(profile, moodInfluenceGain(mood));
    var moodProfile = resolveMoodProfile(mood);
    return stackMoodProfile(scaledProfile, moodProfile);
  }
  function scaleInfluenceBiases(themeProfile, gain) {
    var scale = coerceToFloat32(gain.l23_1);
    var rawDensity = scaleInfluenceBiases$d(themeProfile.n1t_1) * scaleInfluenceBiases$d(0.7) + scaleInfluenceBiases$d(themeProfile.o1t_1) * scaleInfluenceBiases$d(0.3);
    var rawRoundness = scaleInfluenceBiases$d(themeProfile.q1t_1) * scaleInfluenceBiases$d(0.6) - scaleInfluenceBiases$d(themeProfile.r1t_1) * scaleInfluenceBiases$d(0.3) - scaleInfluenceBiases$d(themeProfile.s1t_1) * scaleInfluenceBiases$d(0.2);
    var rawChroma = scaleInfluenceBiases$d(themeProfile.t1t_1) * scaleInfluenceBiases$d(0.3) + scaleInfluenceBiases$d(themeProfile.u1t_1) * scaleInfluenceBiases$d(0.2) - scaleInfluenceBiases$d(themeProfile.r1t_1) * scaleInfluenceBiases$d(0.2);
    var rawContrast = scaleInfluenceBiases$d(themeProfile.s1t_1) * scaleInfluenceBiases$d(0.35) + scaleInfluenceBiases$d(themeProfile.r1t_1) * scaleInfluenceBiases$d(0.25);
    var rawMotionEnergy = scaleInfluenceBiases$d(themeProfile.t1t_1) * scaleInfluenceBiases$d(0.55) + scaleInfluenceBiases$d(themeProfile.o1t_1) * scaleInfluenceBiases$d(0.1);
    var rawPlayfulness = scaleInfluenceBiases$d(themeProfile.q1t_1) * scaleInfluenceBiases$d(0.6) - scaleInfluenceBiases$d(themeProfile.s1t_1) * scaleInfluenceBiases$d(0.5) - scaleInfluenceBiases$d(themeProfile.r1t_1) * scaleInfluenceBiases$d(0.3);
    var rawTypography = -scaleInfluenceBiases$d(themeProfile.r1t_1) * scaleInfluenceBiases$d(0.4) + scaleInfluenceBiases$d(themeProfile.u1t_1) * scaleInfluenceBiases$d(0.2) + scaleInfluenceBiases$d(themeProfile.q1t_1) * scaleInfluenceBiases$d(0.2);
    var rawCta = scaleInfluenceBiases$d(themeProfile.p1t_1);
    var rawDepth = scaleInfluenceBiases$d(themeProfile.u1t_1) * scaleInfluenceBiases$d(0.7) + scaleInfluenceBiases$d(themeProfile.n1t_1) * scaleInfluenceBiases$d(0.2);
    var rawBorder = scaleInfluenceBiases$d(themeProfile.s1t_1) * scaleInfluenceBiases$d(0.6) + scaleInfluenceBiases$d(themeProfile.r1t_1) * scaleInfluenceBiases$d(0.3);
    var rawStatus = scaleInfluenceBiases$d(themeProfile.s1t_1) * scaleInfluenceBiases$d(0.7);
    var rawFocus = scaleInfluenceBiases$d(themeProfile.o1t_1) * scaleInfluenceBiases$d(0.7) + scaleInfluenceBiases$d(themeProfile.s1t_1) * scaleInfluenceBiases$d(0.2);
    var rawAvatar = scaleInfluenceBiases$d(themeProfile.q1t_1) * scaleInfluenceBiases$d(0.6);
    return new ThemeProfile(0.0, toFloat32(coerceIn_0(rawChroma * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawContrast * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawDensity * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawRoundness * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawTypography * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawMotionEnergy * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawPlayfulness * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawCta * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawDepth * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawBorder * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawStatus * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawFocus * scale, -1.0, 1.0)), toFloat32(coerceIn_0(rawAvatar * scale, -1.0, 1.0)), themeProfile.n1t_1, themeProfile.o1t_1, themeProfile.p1t_1, themeProfile.q1t_1, themeProfile.r1t_1, themeProfile.s1t_1, themeProfile.t1t_1, themeProfile.u1t_1);
  }
  var static_init_called_20;
  function static_init_20() {
    if (static_init_called_20)
      return Unit_instance;
    static_init_called_20 = true;
    MoodInfluenceGain_UNSPECIFIED_instance = new MoodInfluenceGain('UNSPECIFIED', 0, 0.55);
    MoodInfluenceGain_SPECIFIED_instance = new MoodInfluenceGain('SPECIFIED', 1, 0.35);
  }
  var MoodInfluenceGain_UNSPECIFIED_instance;
  var MoodInfluenceGain_SPECIFIED_instance;
  function MoodInfluenceGain(name, ordinal, value) {
    Enum.call(this, name, ordinal);
    this.l23_1 = value;
  }
  function moodInfluenceGain(_this__u8e3s4) {
    return isUnspecified(_this__u8e3s4) ? MoodInfluenceGain_UNSPECIFIED_getInstance() : MoodInfluenceGain_SPECIFIED_getInstance();
  }
  function resolveMoodProfile(mood) {
    var tmp1_safe_receiver = mood == null ? null : mood.u1h_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : toThemeProfile_1(tmp1_safe_receiver);
    var base = tmp2_elvis_lhs == null ? Companion_getInstance_67().b1r_1 : tmp2_elvis_lhs;
    return applyMoodKnobs(base, mood == null ? null : mood.v1h_1);
  }
  function stackMoodProfile(profile, mood) {
    return profile.w1t(toFloat32(coerceIn_0(profile.z1s_1 + mood.z1s_1, -1.0, 1.0)), toFloat32(coerceIn_0(profile.a1t_1 + mood.a1t_1, -1.0, 1.0)), toFloat32(coerceIn_0(profile.b1t_1 + mood.b1t_1, -1.0, 1.0)), toFloat32(coerceIn_0(profile.c1t_1 + mood.c1t_1, -1.0, 1.0)), toFloat32(coerceIn_0(profile.d1t_1 + mood.d1t_1, -1.0, 1.0)), toFloat32(coerceIn_0(profile.e1t_1 + mood.e1t_1, -1.0, 1.0)), toFloat32(coerceIn_0(profile.f1t_1 + mood.f1t_1, -1.0, 1.0)), toFloat32(coerceIn_0(profile.g1t_1 + mood.g1t_1, -1.0, 1.0)));
  }
  function toThemeProfile_1(_this__u8e3s4) {
    var tmp0_elvis_lhs = get_MOOD_PRESET_PROFILES().t1(_this__u8e3s4);
    return tmp0_elvis_lhs == null ? Companion_getInstance_67().b1r_1 : tmp0_elvis_lhs;
  }
  function applyMoodKnobs(themeProfile, knobs) {
    var tmp;
    if (knobs == null) {
      tmp = themeProfile;
    } else {
      var tmp0_elvis_lhs = knobs.j18_1;
      var tmp_0 = coerceIn(tmp0_elvis_lhs == null ? themeProfile.z1s_1 : tmp0_elvis_lhs, -1.0, 1.0);
      var tmp1_elvis_lhs = knobs.k18_1;
      var tmp_1 = coerceIn(tmp1_elvis_lhs == null ? themeProfile.a1t_1 : tmp1_elvis_lhs, -1.0, 1.0);
      var tmp2_elvis_lhs = knobs.l18_1;
      var tmp_2 = coerceIn(tmp2_elvis_lhs == null ? themeProfile.b1t_1 : tmp2_elvis_lhs, -1.0, 1.0);
      var tmp3_elvis_lhs = knobs.m18_1;
      var tmp_3 = coerceIn(tmp3_elvis_lhs == null ? themeProfile.c1t_1 : tmp3_elvis_lhs, -1.0, 1.0);
      var tmp4_elvis_lhs = knobs.n18_1;
      var tmp_4 = coerceIn(tmp4_elvis_lhs == null ? themeProfile.d1t_1 : tmp4_elvis_lhs, -1.0, 1.0);
      var tmp5_elvis_lhs = knobs.o18_1;
      var tmp_5 = coerceIn(tmp5_elvis_lhs == null ? themeProfile.e1t_1 : tmp5_elvis_lhs, -1.0, 1.0);
      var tmp6_elvis_lhs = knobs.p18_1;
      var tmp_6 = coerceIn(tmp6_elvis_lhs == null ? themeProfile.f1t_1 : tmp6_elvis_lhs, -1.0, 1.0);
      var tmp7_elvis_lhs = knobs.q18_1;
      tmp = themeProfile.w1t(tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, coerceIn(tmp7_elvis_lhs == null ? themeProfile.g1t_1 : tmp7_elvis_lhs, -1.0, 1.0));
    }
    var overlaid = tmp;
    return overlaid;
  }
  function scaleInfluenceBiases$d(_this__u8e3s4) {
    return coerceToFloat32(_this__u8e3s4);
  }
  function MoodInfluenceGain_UNSPECIFIED_getInstance() {
    static_init_20();
    return MoodInfluenceGain_UNSPECIFIED_instance;
  }
  function MoodInfluenceGain_SPECIFIED_getInstance() {
    static_init_20();
    return MoodInfluenceGain_SPECIFIED_instance;
  }
  function MoodStage() {
  }
  protoOf(MoodStage).v1r = function (context) {
    var mood = context.q1q_1.g1r_1;
    context.u1q_1 = blendMoodInfluence(context.u1q_1, mood);
    var specified = isSpecified(mood);
    var tmp = ResolutionStage_Mood_getInstance();
    var tmp_0 = specified ? ReportStatus_Honored_getInstance() : ReportStatus_Absent_getInstance();
    var tmp_1;
    if (specified) {
      tmp_1 = 'Mood profile applied to theme profile.';
    } else {
      tmp_1 = 'No mood signal; the profile stays neutral.';
    }
    var entry = new ReportEntry('mood', tmp, tmp_0, tmp_1);
    context.l1r(entry);
  };
  var MoodStage_instance;
  function MoodStage_getInstance() {
    return MoodStage_instance;
  }
  function normalizeIntent(intent) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var entries = ArrayList_init_$Create$_0();
    var tmp0_elvis_lhs = intent.g1g_1;
    var identity = tmp0_elvis_lhs == null ? new IdentityIntent() : tmp0_elvis_lhs;
    var brand = toOklch(identity.c1h_1, 'identity.brandColor', entries);
    var tmp1_safe_receiver = intent.h1g_1;
    var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.v1h_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var elements = knobReportEntries(tmp2_safe_receiver == null ? null : violatingKnobs(tmp2_safe_receiver));
    addAll(entries, elements);
    // Inline function 'kotlin.collections.plusAssign' call
    var elements_0 = presenceReportEntries(identity);
    addAll(entries, elements_0);
    var tmp = supportingColors(identity, entries);
    var tmp_0 = brand == null ? null : identity.e1h_1;
    var tmp_1 = deduped(identity.f1h_1);
    var tmp3_safe_receiver = intent.h1g_1;
    var tmp_2 = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.u1h_1;
    var tmp4_safe_receiver = intent.h1g_1;
    var tmp5_safe_receiver = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.v1h_1;
    var tmp6_elvis_lhs = tmp5_safe_receiver == null ? null : clamped(tmp5_safe_receiver);
    var tmp_3 = new MoodIntent(tmp_2, tmp6_elvis_lhs == null ? new MoodKnobs() : tmp6_elvis_lhs);
    var tmp7_elvis_lhs = intent.i1g_1;
    var tmp_4 = tmp7_elvis_lhs == null ? new DomainIntent() : tmp7_elvis_lhs;
    var tmp8_safe_receiver = intent.g1g_1;
    var tmp9_elvis_lhs = tmp8_safe_receiver == null ? null : tmp8_safe_receiver.g1h_1;
    return new NormalizedIntent(brand, tmp, tmp_0, tmp_1, tmp_3, tmp_4, intent.j1g_1, tmp9_elvis_lhs == null ? true : tmp9_elvis_lhs, entries);
  }
  function toOklch(_this__u8e3s4, path, entries) {
    if (_this__u8e3s4 == null) {
      return null;
    }
    if (!isWellFormed(_this__u8e3s4)) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element = new ReportEntry(path, ResolutionStage_Normalize_getInstance(), ReportStatus_Rejected_getInstance(), 'Color specification could not be interpreted.', toString(_this__u8e3s4));
      entries.f(element);
      return null;
    }
    var tmp0_safe_receiver = toOklchOrNull(_this__u8e3s4);
    var converted = tmp0_safe_receiver == null ? null : gamutMapped(tmp0_safe_receiver);
    var tmp = ResolutionStage_Normalize_getInstance();
    var tmp_0 = ReportStatus_Honored_getInstance();
    var tmp_1 = toString(_this__u8e3s4);
    // Inline function 'kotlin.collections.plusAssign' call
    var element_0 = new ReportEntry(path, tmp, tmp_0, 'Color converted to OKLCH and mapped into the sRGB gamut.', tmp_1, converted == null ? null : converted.toString());
    entries.f(element_0);
    return converted;
  }
  function knobReportEntries(violating) {
    var tmp;
    if (violating == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(violating.m());
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s = violating.w1().j();
      while (_iterator__ex2g4s.k()) {
        var item = _iterator__ex2g4s.l();
        // Inline function 'kotlin.collections.component1' call
        var axis = item.p1();
        // Inline function 'kotlin.collections.component2' call
        var value = item.q1();
        var tmp$ret$3 = new ReportEntry('mood.knobs.' + axis, ResolutionStage_Normalize_getInstance(), ReportStatus_Rejected_getInstance(), 'Knob value is not finite or outside [-1, 1]; the axis falls back to the preset.', formatDeterministic(value));
        destination.f(tmp$ret$3);
      }
      tmp = destination;
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? emptyList() : tmp1_elvis_lhs;
  }
  function presenceReportEntries(identity) {
    if (!hasPresenceWithoutBrand(identity)) {
      return emptyList();
    }
    var tmp = ResolutionStage_Normalize_getInstance();
    var tmp_0 = ReportStatus_Modulated_getInstance();
    var tmp0_safe_receiver = identity.e1h_1;
    return listOf_0(new ReportEntry('identity.presence', tmp, tmp_0, 'Presence has no brand color to amplify and is ignored.', tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y1_1));
  }
  function supportingColors(identity, entries) {
    var excess = excessSupportingColorCount(identity);
    if (excess > 0) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element = new ReportEntry('identity.supportingColors', ResolutionStage_Normalize_getInstance(), ReportStatus_Rejected_getInstance(), 'At most 3 supporting colors are honored.', identity.d1h_1.m().toString(), '3');
      entries.f(element);
    }
    // Inline function 'kotlin.collections.mutableListOf' call
    var converted = ArrayList_init_$Create$_0();
    // Inline function 'kotlin.collections.forEachIndexed' call
    var index = 0;
    var _iterator__ex2g4s = take_0(identity.d1h_1, 3).j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      var path = 'identity.supportingColors[' + checkIndexOverflow(_unary__edvuaz) + ']';
      var tmp0_safe_receiver = toOklch(item, path, entries);
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.collections.plusAssign' call
        converted.f(tmp0_safe_receiver);
      }
    }
    return converted;
  }
  function deduped(_this__u8e3s4) {
    if (_this__u8e3s4 == null) {
      return new TypographyIdentity();
    }
    return _this__u8e3s4.p1h(dedupedCandidates(_this__u8e3s4));
  }
  function NormalizeStage() {
  }
  protoOf(NormalizeStage).u1r = function (intent) {
    var normalized = normalizeIntent(intent);
    var baseTables = BaseTables_instance.t1v();
    var tmp0_safe_receiver = normalized.i1r_1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m1g_1;
    var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.e1n_1;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.u1();
    var lockedPaths = tmp3_elvis_lhs == null ? emptySet() : tmp3_elvis_lhs;
    var tmp4_safe_receiver = normalized.i1r_1;
    var tmp5_safe_receiver = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.o1g_1;
    var tmp6_elvis_lhs = tmp5_safe_receiver == null ? null : tmp5_safe_receiver.t1j_1;
    var targets = tmp6_elvis_lhs == null ? setOf([ThemeMode_Light_getInstance(), ThemeMode_Dark_getInstance()]) : tmp6_elvis_lhs;
    var modes = toList_0(targets);
    return new ResolutionContext(intent, normalized, modes, baseTables, lockedPaths);
  };
  var NormalizeStage_instance;
  function NormalizeStage_getInstance() {
    return NormalizeStage_instance;
  }
  function NormalizedIntent(brandColor, supportingColors, presence, typography, mood, domain, control, deriveColors, entries) {
    this.c1r_1 = brandColor;
    this.d1r_1 = supportingColors;
    this.e1r_1 = presence;
    this.f1r_1 = typography;
    this.g1r_1 = mood;
    this.h1r_1 = domain;
    this.i1r_1 = control;
    this.j1r_1 = deriveColors;
    this.k1r_1 = entries;
  }
  protoOf(NormalizedIntent).a22 = function () {
    var tmp;
    var tmp_0;
    var tmp_1;
    if (isSpecified(this.g1r_1)) {
      tmp_1 = true;
    } else {
      // Inline function 'kotlin.collections.isNotEmpty' call
      tmp_1 = !this.h1r_1.w1g_1.p();
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.collections.isNotEmpty' call
      tmp_0 = !this.h1r_1.x1g_1.p();
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = !(this.c1r_1 == null);
    }
    return tmp;
  };
  protoOf(NormalizedIntent).toString = function () {
    return 'NormalizedIntent(brandColor=' + toString_0(this.c1r_1) + ', supportingColors=' + toString(this.d1r_1) + ', presence=' + toString_0(this.e1r_1) + ', typography=' + this.f1r_1.toString() + ', mood=' + this.g1r_1.toString() + ', domain=' + this.h1r_1.toString() + ', control=' + toString_0(this.i1r_1) + ', deriveColors=' + this.j1r_1 + ', entries=' + toString(this.k1r_1) + ')';
  };
  protoOf(NormalizedIntent).hashCode = function () {
    var result = this.c1r_1 == null ? 0 : this.c1r_1.hashCode();
    result = imul(result, 31) + hashCode(this.d1r_1) | 0;
    result = imul(result, 31) + (this.e1r_1 == null ? 0 : this.e1r_1.hashCode()) | 0;
    result = imul(result, 31) + this.f1r_1.hashCode() | 0;
    result = imul(result, 31) + this.g1r_1.hashCode() | 0;
    result = imul(result, 31) + this.h1r_1.hashCode() | 0;
    result = imul(result, 31) + (this.i1r_1 == null ? 0 : this.i1r_1.hashCode()) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.j1r_1) | 0;
    result = imul(result, 31) + hashCode(this.k1r_1) | 0;
    return result;
  };
  protoOf(NormalizedIntent).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof NormalizedIntent))
      return false;
    if (!equals(this.c1r_1, other.c1r_1))
      return false;
    if (!equals(this.d1r_1, other.d1r_1))
      return false;
    if (!equals(this.e1r_1, other.e1r_1))
      return false;
    if (!this.f1r_1.equals(other.f1r_1))
      return false;
    if (!this.g1r_1.equals(other.g1r_1))
      return false;
    if (!this.h1r_1.equals(other.h1r_1))
      return false;
    if (!equals(this.i1r_1, other.i1r_1))
      return false;
    if (!(this.j1r_1 === other.j1r_1))
      return false;
    if (!equals(this.k1r_1, other.k1r_1))
      return false;
    return true;
  };
  function ResolutionReport$Companion$$childSerializers$_anonymous__yq00ra() {
    return new ArrayListSerializer($serializer_getInstance_44());
  }
  function ResolutionReport$Companion$$childSerializers$_anonymous__yq00ra_0() {
    return new LinkedHashSetSerializer(Companion_getInstance_12().s18());
  }
  function Companion_69() {
    Companion_instance_70 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, ResolutionReport$Companion$$childSerializers$_anonymous__yq00ra);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.m23_1 = [tmp_1, null, lazy(tmp_2, ResolutionReport$Companion$$childSerializers$_anonymous__yq00ra_0), null];
  }
  var Companion_instance_70;
  function Companion_getInstance_68() {
    if (Companion_instance_70 == null)
      new Companion_69();
    return Companion_instance_70;
  }
  function $serializer_47() {
    $serializer_instance_43 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.resolution.report.ResolutionReport', this, 4);
    tmp0_serialDesc.lp('entries', false);
    tmp0_serialDesc.lp('baseVersion', true);
    tmp0_serialDesc.lp('modes', false);
    tmp0_serialDesc.lp('fontAssignments', false);
    this.n23_1 = tmp0_serialDesc;
  }
  protoOf($serializer_47).o23 = function (encoder, value) {
    var tmp0_desc = this.n23_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_68().m23_1;
    tmp1_output.ok(tmp0_desc, 0, tmp2_cached[0].q1(), value.p23_1);
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !(value.q23_1 === 1)) {
      tmp1_output.hk(tmp0_desc, 1, value.q23_1);
    }
    tmp1_output.ok(tmp0_desc, 2, tmp2_cached[2].q1(), value.r23_1);
    tmp1_output.ok(tmp0_desc, 3, $serializer_getInstance_45(), value.s23_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_47).yf = function (encoder, value) {
    return this.o23(encoder, value instanceof ResolutionReport ? value : THROW_CCE());
  };
  protoOf($serializer_47).zf = function (decoder) {
    var tmp0_desc = this.n23_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = 0;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_input = decoder.xi(tmp0_desc);
    var tmp9_cached = Companion_getInstance_68().m23_1;
    if (tmp8_input.nj()) {
      tmp4_local0 = tmp8_input.jj(tmp0_desc, 0, tmp9_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.cj(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.jj(tmp0_desc, 2, tmp9_cached[2].q1(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.jj(tmp0_desc, 3, $serializer_getInstance_45(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.jj(tmp0_desc, 0, tmp9_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.cj(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.jj(tmp0_desc, 2, tmp9_cached[2].q1(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.jj(tmp0_desc, 3, $serializer_getInstance_45(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.yi(tmp0_desc);
    return ResolutionReport_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_47).xf = function () {
    return this.n23_1;
  };
  protoOf($serializer_47).aq = function () {
    var tmp0_cached = Companion_getInstance_68().m23_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [tmp0_cached[0].q1(), IntSerializer_getInstance(), tmp0_cached[2].q1(), $serializer_getInstance_45()];
  };
  var $serializer_instance_43;
  function $serializer_getInstance_43() {
    if ($serializer_instance_43 == null)
      new $serializer_47();
    return $serializer_instance_43;
  }
  function ResolutionReport_init_$Init$(seen0, entries, baseVersion, modes, fontAssignments, serializationConstructorMarker, $this) {
    if (!(13 === (13 & seen0))) {
      throwMissingFieldException(seen0, 13, $serializer_getInstance_43().n23_1);
    }
    $this.p23_1 = entries;
    if (0 === (seen0 & 2))
      $this.q23_1 = 1;
    else
      $this.q23_1 = baseVersion;
    $this.r23_1 = modes;
    $this.s23_1 = fontAssignments;
    return $this;
  }
  function ResolutionReport_init_$Create$(seen0, entries, baseVersion, modes, fontAssignments, serializationConstructorMarker) {
    return ResolutionReport_init_$Init$(seen0, entries, baseVersion, modes, fontAssignments, serializationConstructorMarker, objectCreate(protoOf(ResolutionReport)));
  }
  function ResolutionReport(entries, baseVersion, modes, fontAssignments) {
    Companion_getInstance_68();
    baseVersion = baseVersion === VOID ? 1 : baseVersion;
    this.p23_1 = entries;
    this.q23_1 = baseVersion;
    this.r23_1 = modes;
    this.s23_1 = fontAssignments;
  }
  protoOf(ResolutionReport).toString = function () {
    return 'ResolutionReport(entries=' + toString(this.p23_1) + ', baseVersion=' + this.q23_1 + ', modes=' + toString(this.r23_1) + ', fontAssignments=' + this.s23_1.toString() + ')';
  };
  protoOf(ResolutionReport).hashCode = function () {
    var result = hashCode(this.p23_1);
    result = imul(result, 31) + this.q23_1 | 0;
    result = imul(result, 31) + hashCode(this.r23_1) | 0;
    result = imul(result, 31) + this.s23_1.hashCode() | 0;
    return result;
  };
  protoOf(ResolutionReport).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ResolutionReport))
      return false;
    if (!equals(this.p23_1, other.p23_1))
      return false;
    if (!(this.q23_1 === other.q23_1))
      return false;
    if (!equals(this.r23_1, other.r23_1))
      return false;
    if (!this.s23_1.equals(other.s23_1))
      return false;
    return true;
  };
  function ReportEntry$Companion$$childSerializers$_anonymous__5gcpu4() {
    return Companion_getInstance_72().s18();
  }
  function ReportEntry$Companion$$childSerializers$_anonymous__5gcpu4_0() {
    return Companion_getInstance_71().s18();
  }
  function Companion_70() {
    Companion_instance_71 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, ReportEntry$Companion$$childSerializers$_anonymous__5gcpu4);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.v23_1 = [null, tmp_1, lazy(tmp_2, ReportEntry$Companion$$childSerializers$_anonymous__5gcpu4_0), null, null, null];
  }
  var Companion_instance_71;
  function Companion_getInstance_69() {
    if (Companion_instance_71 == null)
      new Companion_70();
    return Companion_instance_71;
  }
  function $serializer_48() {
    $serializer_instance_44 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.resolution.report.ReportEntry', this, 6);
    tmp0_serialDesc.lp('path', false);
    tmp0_serialDesc.lp('stage', false);
    tmp0_serialDesc.lp('status', false);
    tmp0_serialDesc.lp('message', false);
    tmp0_serialDesc.lp('requested', true);
    tmp0_serialDesc.lp('enforced', true);
    this.w23_1 = tmp0_serialDesc;
  }
  protoOf($serializer_48).x23 = function (encoder, value) {
    var tmp0_desc = this.w23_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_69().v23_1;
    tmp1_output.mk(tmp0_desc, 0, value.x1t_1);
    tmp1_output.ok(tmp0_desc, 1, tmp2_cached[1].q1(), value.y1t_1);
    tmp1_output.ok(tmp0_desc, 2, tmp2_cached[2].q1(), value.z1t_1);
    tmp1_output.mk(tmp0_desc, 3, value.a1u_1);
    if (tmp1_output.uk(tmp0_desc, 4) ? true : !(value.b1u_1 == null)) {
      tmp1_output.qk(tmp0_desc, 4, StringSerializer_getInstance(), value.b1u_1);
    }
    if (tmp1_output.uk(tmp0_desc, 5) ? true : !(value.c1u_1 == null)) {
      tmp1_output.qk(tmp0_desc, 5, StringSerializer_getInstance(), value.c1u_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_48).yf = function (encoder, value) {
    return this.x23(encoder, value instanceof ReportEntry ? value : THROW_CCE());
  };
  protoOf($serializer_48).zf = function (decoder) {
    var tmp0_desc = this.w23_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = null;
    var tmp9_local5 = null;
    var tmp10_input = decoder.xi(tmp0_desc);
    var tmp11_cached = Companion_getInstance_69().v23_1;
    if (tmp10_input.nj()) {
      tmp4_local0 = tmp10_input.hj(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp10_input.jj(tmp0_desc, 1, tmp11_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp10_input.jj(tmp0_desc, 2, tmp11_cached[2].q1(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp10_input.hj(tmp0_desc, 3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp10_input.lj(tmp0_desc, 4, StringSerializer_getInstance(), tmp8_local4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp10_input.lj(tmp0_desc, 5, StringSerializer_getInstance(), tmp9_local5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp10_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp10_input.hj(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp10_input.jj(tmp0_desc, 1, tmp11_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp10_input.jj(tmp0_desc, 2, tmp11_cached[2].q1(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp10_input.hj(tmp0_desc, 3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp10_input.lj(tmp0_desc, 4, StringSerializer_getInstance(), tmp8_local4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp10_input.lj(tmp0_desc, 5, StringSerializer_getInstance(), tmp9_local5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp10_input.yi(tmp0_desc);
    return ReportEntry_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, null);
  };
  protoOf($serializer_48).xf = function () {
    return this.w23_1;
  };
  protoOf($serializer_48).aq = function () {
    var tmp0_cached = Companion_getInstance_69().v23_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), tmp0_cached[1].q1(), tmp0_cached[2].q1(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance())];
  };
  var $serializer_instance_44;
  function $serializer_getInstance_44() {
    if ($serializer_instance_44 == null)
      new $serializer_48();
    return $serializer_instance_44;
  }
  function ReportEntry_init_$Init$(seen0, path, stage, status, message, requested, enforced, serializationConstructorMarker, $this) {
    if (!(15 === (15 & seen0))) {
      throwMissingFieldException(seen0, 15, $serializer_getInstance_44().w23_1);
    }
    $this.x1t_1 = path;
    $this.y1t_1 = stage;
    $this.z1t_1 = status;
    $this.a1u_1 = message;
    if (0 === (seen0 & 16))
      $this.b1u_1 = null;
    else
      $this.b1u_1 = requested;
    if (0 === (seen0 & 32))
      $this.c1u_1 = null;
    else
      $this.c1u_1 = enforced;
    return $this;
  }
  function ReportEntry_init_$Create$(seen0, path, stage, status, message, requested, enforced, serializationConstructorMarker) {
    return ReportEntry_init_$Init$(seen0, path, stage, status, message, requested, enforced, serializationConstructorMarker, objectCreate(protoOf(ReportEntry)));
  }
  function ReportEntry(path, stage, status, message, requested, enforced) {
    Companion_getInstance_69();
    requested = requested === VOID ? null : requested;
    enforced = enforced === VOID ? null : enforced;
    this.x1t_1 = path;
    this.y1t_1 = stage;
    this.z1t_1 = status;
    this.a1u_1 = message;
    this.b1u_1 = requested;
    this.c1u_1 = enforced;
  }
  protoOf(ReportEntry).toString = function () {
    return 'ReportEntry(path=' + this.x1t_1 + ', stage=' + this.y1t_1.toString() + ', status=' + this.z1t_1.toString() + ', message=' + this.a1u_1 + ', requested=' + this.b1u_1 + ', enforced=' + this.c1u_1 + ')';
  };
  protoOf(ReportEntry).hashCode = function () {
    var result = getStringHashCode(this.x1t_1);
    result = imul(result, 31) + this.y1t_1.hashCode() | 0;
    result = imul(result, 31) + this.z1t_1.hashCode() | 0;
    result = imul(result, 31) + getStringHashCode(this.a1u_1) | 0;
    result = imul(result, 31) + (this.b1u_1 == null ? 0 : getStringHashCode(this.b1u_1)) | 0;
    result = imul(result, 31) + (this.c1u_1 == null ? 0 : getStringHashCode(this.c1u_1)) | 0;
    return result;
  };
  protoOf(ReportEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ReportEntry))
      return false;
    if (!(this.x1t_1 === other.x1t_1))
      return false;
    if (!this.y1t_1.equals(other.y1t_1))
      return false;
    if (!this.z1t_1.equals(other.z1t_1))
      return false;
    if (!(this.a1u_1 === other.a1u_1))
      return false;
    if (!(this.b1u_1 == other.b1u_1))
      return false;
    if (!(this.c1u_1 == other.c1u_1))
      return false;
    return true;
  };
  function FontAssignmentReport$Companion$$childSerializers$_anonymous__12bfl2() {
    return Companion_instance_79.s18();
  }
  function FontAssignmentReport$Companion$$childSerializers$_anonymous__12bfl2_0() {
    return Companion_instance_79.s18();
  }
  function FontAssignmentReport$Companion$$childSerializers$_anonymous__12bfl2_1() {
    return Companion_instance_79.s18();
  }
  function FontAssignmentReport$Companion$$childSerializers$_anonymous__12bfl2_2() {
    return new ArrayListSerializer(Companion_instance_79.s18());
  }
  function Companion_71() {
    Companion_instance_72 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, FontAssignmentReport$Companion$$childSerializers$_anonymous__12bfl2);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_3 = lazy(tmp_2, FontAssignmentReport$Companion$$childSerializers$_anonymous__12bfl2_0);
    var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_5 = lazy(tmp_4, FontAssignmentReport$Companion$$childSerializers$_anonymous__12bfl2_1);
    var tmp_6 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.y23_1 = [tmp_1, tmp_3, tmp_5, lazy(tmp_6, FontAssignmentReport$Companion$$childSerializers$_anonymous__12bfl2_2)];
  }
  var Companion_instance_72;
  function Companion_getInstance_70() {
    if (Companion_instance_72 == null)
      new Companion_71();
    return Companion_instance_72;
  }
  function $serializer_49() {
    $serializer_instance_45 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.resolution.report.FontAssignmentReport', this, 4);
    tmp0_serialDesc.lp('structure', false);
    tmp0_serialDesc.lp('content', false);
    tmp0_serialDesc.lp('metadata', false);
    tmp0_serialDesc.lp('unusedCandidates', false);
    this.z23_1 = tmp0_serialDesc;
  }
  protoOf($serializer_49).a24 = function (encoder, value) {
    var tmp0_desc = this.z23_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_70().y23_1;
    tmp1_output.qk(tmp0_desc, 0, tmp2_cached[0].q1(), value.b24_1);
    tmp1_output.qk(tmp0_desc, 1, tmp2_cached[1].q1(), value.c24_1);
    tmp1_output.qk(tmp0_desc, 2, tmp2_cached[2].q1(), value.d24_1);
    tmp1_output.ok(tmp0_desc, 3, tmp2_cached[3].q1(), value.e24_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_49).yf = function (encoder, value) {
    return this.a24(encoder, value instanceof FontAssignmentReport ? value : THROW_CCE());
  };
  protoOf($serializer_49).zf = function (decoder) {
    var tmp0_desc = this.z23_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_input = decoder.xi(tmp0_desc);
    var tmp9_cached = Companion_getInstance_70().y23_1;
    if (tmp8_input.nj()) {
      tmp4_local0 = tmp8_input.lj(tmp0_desc, 0, tmp9_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.lj(tmp0_desc, 1, tmp9_cached[1].q1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp8_input.lj(tmp0_desc, 2, tmp9_cached[2].q1(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp8_input.jj(tmp0_desc, 3, tmp9_cached[3].q1(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp8_input.lj(tmp0_desc, 0, tmp9_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.lj(tmp0_desc, 1, tmp9_cached[1].q1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp8_input.lj(tmp0_desc, 2, tmp9_cached[2].q1(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp8_input.jj(tmp0_desc, 3, tmp9_cached[3].q1(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.yi(tmp0_desc);
    return FontAssignmentReport_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_49).xf = function () {
    return this.z23_1;
  };
  protoOf($serializer_49).aq = function () {
    var tmp0_cached = Companion_getInstance_70().y23_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [get_nullable(tmp0_cached[0].q1()), get_nullable(tmp0_cached[1].q1()), get_nullable(tmp0_cached[2].q1()), tmp0_cached[3].q1()];
  };
  var $serializer_instance_45;
  function $serializer_getInstance_45() {
    if ($serializer_instance_45 == null)
      new $serializer_49();
    return $serializer_instance_45;
  }
  function FontAssignmentReport_init_$Init$(seen0, structure, content, metadata, unusedCandidates, serializationConstructorMarker, $this) {
    if (!(15 === (15 & seen0))) {
      throwMissingFieldException(seen0, 15, $serializer_getInstance_45().z23_1);
    }
    $this.b24_1 = structure;
    $this.c24_1 = content;
    $this.d24_1 = metadata;
    $this.e24_1 = unusedCandidates;
    return $this;
  }
  function FontAssignmentReport_init_$Create$(seen0, structure, content, metadata, unusedCandidates, serializationConstructorMarker) {
    return FontAssignmentReport_init_$Init$(seen0, structure, content, metadata, unusedCandidates, serializationConstructorMarker, objectCreate(protoOf(FontAssignmentReport)));
  }
  function FontAssignmentReport(structure, content, metadata, unusedCandidates) {
    Companion_getInstance_70();
    this.b24_1 = structure;
    this.c24_1 = content;
    this.d24_1 = metadata;
    this.e24_1 = unusedCandidates;
  }
  protoOf(FontAssignmentReport).toString = function () {
    return 'FontAssignmentReport(structure=' + toString_0(this.b24_1) + ', content=' + toString_0(this.c24_1) + ', metadata=' + toString_0(this.d24_1) + ', unusedCandidates=' + toString(this.e24_1) + ')';
  };
  protoOf(FontAssignmentReport).hashCode = function () {
    var result = this.b24_1 == null ? 0 : hashCode(this.b24_1);
    result = imul(result, 31) + (this.c24_1 == null ? 0 : hashCode(this.c24_1)) | 0;
    result = imul(result, 31) + (this.d24_1 == null ? 0 : hashCode(this.d24_1)) | 0;
    result = imul(result, 31) + hashCode(this.e24_1) | 0;
    return result;
  };
  protoOf(FontAssignmentReport).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FontAssignmentReport))
      return false;
    if (!equals(this.b24_1, other.b24_1))
      return false;
    if (!equals(this.c24_1, other.c24_1))
      return false;
    if (!equals(this.d24_1, other.d24_1))
      return false;
    if (!equals(this.e24_1, other.e24_1))
      return false;
    return true;
  };
  function _get_$cachedSerializer__te6jhj_17($this) {
    return $this.u23_1.q1();
  }
  function ReportStatus$Companion$_anonymous__8kq2fd() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.resolution.report.ReportStatus', values_18());
  }
  var static_init_called_21;
  function static_init_21() {
    if (static_init_called_21)
      return Unit_instance;
    static_init_called_21 = true;
    ReportStatus_Honored_instance = new ReportStatus('Honored', 0);
    ReportStatus_Modulated_instance = new ReportStatus('Modulated', 1);
    ReportStatus_OverriddenByConstraint_instance = new ReportStatus('OverriddenByConstraint', 2);
    ReportStatus_Rejected_instance = new ReportStatus('Rejected', 3);
    ReportStatus_Absent_instance = new ReportStatus('Absent', 4);
    if (Companion_instance_73 == null) {
      Companion_instance;
      new Companion_72();
    }
  }
  var ReportStatus_Honored_instance;
  var ReportStatus_Modulated_instance;
  var ReportStatus_OverriddenByConstraint_instance;
  var ReportStatus_Rejected_instance;
  var ReportStatus_Absent_instance;
  function values_18() {
    static_init_21();
    return [ReportStatus_Honored_getInstance(), ReportStatus_Modulated_getInstance(), ReportStatus_OverriddenByConstraint_getInstance(), ReportStatus_Rejected_getInstance(), ReportStatus_Absent_getInstance()];
  }
  function Companion_72() {
    Companion_instance_73 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.u23_1 = lazy(tmp_0, ReportStatus$Companion$_anonymous__8kq2fd);
  }
  protoOf(Companion_72).s18 = function () {
    return _get_$cachedSerializer__te6jhj_17(this);
  };
  var Companion_instance_73;
  function Companion_getInstance_71() {
    static_init_21();
    return Companion_instance_73;
  }
  function ReportStatus(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ReportStatus_Honored_getInstance() {
    static_init_21();
    return ReportStatus_Honored_instance;
  }
  function ReportStatus_Modulated_getInstance() {
    static_init_21();
    return ReportStatus_Modulated_instance;
  }
  function ReportStatus_OverriddenByConstraint_getInstance() {
    static_init_21();
    return ReportStatus_OverriddenByConstraint_instance;
  }
  function ReportStatus_Rejected_getInstance() {
    static_init_21();
    return ReportStatus_Rejected_instance;
  }
  function ReportStatus_Absent_getInstance() {
    static_init_21();
    return ReportStatus_Absent_instance;
  }
  function _get_$cachedSerializer__te6jhj_18($this) {
    return $this.t23_1.q1();
  }
  function ResolutionStage$Companion$_anonymous__o3lrvn() {
    return createSimpleEnumSerializer('io.github.alph_a07.basis.theme.resolution.report.ResolutionStage', values_19());
  }
  var static_init_called_22;
  function static_init_22() {
    if (static_init_called_22)
      return Unit_instance;
    static_init_called_22 = true;
    ResolutionStage_Normalize_instance = new ResolutionStage('Normalize', 0);
    ResolutionStage_Domain_instance = new ResolutionStage('Domain', 1);
    ResolutionStage_Mood_instance = new ResolutionStage('Mood', 2);
    ResolutionStage_Identity_instance = new ResolutionStage('Identity', 3);
    ResolutionStage_Fonts_instance = new ResolutionStage('Fonts', 4);
    ResolutionStage_Base_instance = new ResolutionStage('Base', 5);
    ResolutionStage_Derive_instance = new ResolutionStage('Derive', 6);
    ResolutionStage_Control_instance = new ResolutionStage('Control', 7);
    ResolutionStage_Enforce_instance = new ResolutionStage('Enforce', 8);
    ResolutionStage_Emit_instance = new ResolutionStage('Emit', 9);
    if (Companion_instance_74 == null) {
      Companion_instance;
      new Companion_73();
    }
  }
  var ResolutionStage_Normalize_instance;
  var ResolutionStage_Domain_instance;
  var ResolutionStage_Mood_instance;
  var ResolutionStage_Identity_instance;
  var ResolutionStage_Fonts_instance;
  var ResolutionStage_Base_instance;
  var ResolutionStage_Derive_instance;
  var ResolutionStage_Control_instance;
  var ResolutionStage_Enforce_instance;
  var ResolutionStage_Emit_instance;
  function values_19() {
    static_init_22();
    return [ResolutionStage_Normalize_getInstance(), ResolutionStage_Domain_getInstance(), ResolutionStage_Mood_getInstance(), ResolutionStage_Identity_getInstance(), ResolutionStage_Fonts_getInstance(), ResolutionStage_Base_getInstance(), ResolutionStage_Derive_getInstance(), ResolutionStage_Control_getInstance(), ResolutionStage_Enforce_getInstance(), ResolutionStage_Emit_getInstance()];
  }
  function Companion_73() {
    Companion_instance_74 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.t23_1 = lazy(tmp_0, ResolutionStage$Companion$_anonymous__o3lrvn);
  }
  protoOf(Companion_73).s18 = function () {
    return _get_$cachedSerializer__te6jhj_18(this);
  };
  var Companion_instance_74;
  function Companion_getInstance_72() {
    static_init_22();
    return Companion_instance_74;
  }
  function ResolutionStage(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ResolutionStage_Normalize_getInstance() {
    static_init_22();
    return ResolutionStage_Normalize_instance;
  }
  function ResolutionStage_Domain_getInstance() {
    static_init_22();
    return ResolutionStage_Domain_instance;
  }
  function ResolutionStage_Mood_getInstance() {
    static_init_22();
    return ResolutionStage_Mood_instance;
  }
  function ResolutionStage_Identity_getInstance() {
    static_init_22();
    return ResolutionStage_Identity_instance;
  }
  function ResolutionStage_Fonts_getInstance() {
    static_init_22();
    return ResolutionStage_Fonts_instance;
  }
  function ResolutionStage_Base_getInstance() {
    static_init_22();
    return ResolutionStage_Base_instance;
  }
  function ResolutionStage_Derive_getInstance() {
    static_init_22();
    return ResolutionStage_Derive_instance;
  }
  function ResolutionStage_Control_getInstance() {
    static_init_22();
    return ResolutionStage_Control_instance;
  }
  function ResolutionStage_Enforce_getInstance() {
    static_init_22();
    return ResolutionStage_Enforce_instance;
  }
  function ResolutionStage_Emit_getInstance() {
    static_init_22();
    return ResolutionStage_Emit_instance;
  }
  function Companion_74() {
  }
  var Companion_instance_75;
  function Companion_getInstance_73() {
    return Companion_instance_75;
  }
  function $serializer_50() {
    $serializer_instance_46 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.resolution.report.ThemeViolation', this, 2);
    tmp0_serialDesc.lp('path', false);
    tmp0_serialDesc.lp('message', false);
    this.f24_1 = tmp0_serialDesc;
  }
  protoOf($serializer_50).g24 = function (encoder, value) {
    var tmp0_desc = this.f24_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.mk(tmp0_desc, 0, value.h24_1);
    tmp1_output.mk(tmp0_desc, 1, value.i24_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_50).yf = function (encoder, value) {
    return this.g24(encoder, value instanceof ThemeViolation ? value : THROW_CCE());
  };
  protoOf($serializer_50).zf = function (decoder) {
    var tmp0_desc = this.f24_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.hj(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.hj(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.hj(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.hj(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.yi(tmp0_desc);
    return ThemeViolation_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_50).xf = function () {
    return this.f24_1;
  };
  protoOf($serializer_50).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), StringSerializer_getInstance()];
  };
  var $serializer_instance_46;
  function $serializer_getInstance_46() {
    if ($serializer_instance_46 == null)
      new $serializer_50();
    return $serializer_instance_46;
  }
  function ThemeViolation_init_$Init$(seen0, path, message, serializationConstructorMarker, $this) {
    if (!(3 === (3 & seen0))) {
      throwMissingFieldException(seen0, 3, $serializer_getInstance_46().f24_1);
    }
    $this.h24_1 = path;
    $this.i24_1 = message;
    return $this;
  }
  function ThemeViolation_init_$Create$(seen0, path, message, serializationConstructorMarker) {
    return ThemeViolation_init_$Init$(seen0, path, message, serializationConstructorMarker, objectCreate(protoOf(ThemeViolation)));
  }
  function ThemeViolation(path, message) {
    this.h24_1 = path;
    this.i24_1 = message;
  }
  protoOf(ThemeViolation).toString = function () {
    return 'ThemeViolation(path=' + this.h24_1 + ', message=' + this.i24_1 + ')';
  };
  protoOf(ThemeViolation).hashCode = function () {
    var result = getStringHashCode(this.h24_1);
    result = imul(result, 31) + getStringHashCode(this.i24_1) | 0;
    return result;
  };
  protoOf(ThemeViolation).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ThemeViolation))
      return false;
    if (!(this.h24_1 === other.h24_1))
      return false;
    if (!(this.i24_1 === other.i24_1))
      return false;
    return true;
  };
  function replaceToken(_this__u8e3s4, path, value) {
    var tmp;
    switch (path.z1_1) {
      case 0:
        tmp = _this__u8e3s4.z20(_this__u8e3s4.a19_1.j24(value));
        break;
      case 1:
        tmp = _this__u8e3s4.z20(_this__u8e3s4.a19_1.j24(VOID, value));
        break;
      case 2:
        tmp = _this__u8e3s4.z20(_this__u8e3s4.a19_1.j24(VOID, VOID, value));
        break;
      case 3:
        tmp = _this__u8e3s4.z20(_this__u8e3s4.a19_1.j24(VOID, VOID, VOID, value));
        break;
      case 4:
        tmp = _this__u8e3s4.z20(VOID, _this__u8e3s4.b19_1.x20(value));
        break;
      case 5:
        tmp = _this__u8e3s4.z20(VOID, _this__u8e3s4.b19_1.x20(VOID, value));
        break;
      case 6:
        tmp = _this__u8e3s4.z20(VOID, _this__u8e3s4.b19_1.x20(VOID, VOID, value));
        break;
      case 7:
        tmp = _this__u8e3s4.z20(VOID, VOID, _this__u8e3s4.c19_1.y20(value));
        break;
      case 8:
        tmp = _this__u8e3s4.z20(VOID, VOID, _this__u8e3s4.c19_1.y20(VOID, value));
        break;
      case 9:
        tmp = _this__u8e3s4.z20(VOID, VOID, _this__u8e3s4.c19_1.y20(VOID, VOID, value));
        break;
      case 10:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, _this__u8e3s4.d19_1.k24(value));
        break;
      case 11:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, _this__u8e3s4.d19_1.k24(VOID, value));
        break;
      case 12:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, _this__u8e3s4.d19_1.k24(VOID, VOID, value));
        break;
      case 13:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, _this__u8e3s4.d19_1.k24(VOID, VOID, VOID, value));
        break;
      case 14:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, _this__u8e3s4.e19_1.l24(value));
        break;
      case 15:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, _this__u8e3s4.e19_1.l24(VOID, value));
        break;
      case 16:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, _this__u8e3s4.e19_1.l24(VOID, VOID, value));
        break;
      case 17:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.f19_1.y1v(value));
        break;
      case 18:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.g19_1.m24(value));
        break;
      case 19:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.g19_1.m24(VOID, value));
        break;
      case 20:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.g19_1.m24(VOID, VOID, value));
        break;
      case 21:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.g19_1.m24(VOID, VOID, VOID, value));
        break;
      case 22:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.h19_1.m24(value));
        break;
      case 23:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.h19_1.m24(VOID, value));
        break;
      case 24:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.h19_1.m24(VOID, VOID, value));
        break;
      case 25:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.h19_1.m24(VOID, VOID, VOID, value));
        break;
      case 26:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.i19_1.m24(value));
        break;
      case 27:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.i19_1.m24(VOID, value));
        break;
      case 28:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.i19_1.m24(VOID, VOID, value));
        break;
      case 29:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.i19_1.m24(VOID, VOID, VOID, value));
        break;
      case 30:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.j19_1.m24(value));
        break;
      case 31:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.j19_1.m24(VOID, value));
        break;
      case 32:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.j19_1.m24(VOID, VOID, value));
        break;
      case 33:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.j19_1.m24(VOID, VOID, VOID, value));
        break;
      case 34:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.l19_1.n24(value));
        break;
      case 35:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.l19_1.n24(VOID, value));
        break;
      case 36:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.l19_1.n24(VOID, VOID, value));
        break;
      case 37:
        tmp = _this__u8e3s4.z20(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, _this__u8e3s4.l19_1.n24(VOID, VOID, VOID, value));
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function ColorTokens(surface, content, icon, border, selection, focus, positive, negative, caution, info, gradient, brand) {
    this.a19_1 = surface;
    this.b19_1 = content;
    this.c19_1 = icon;
    this.d19_1 = border;
    this.e19_1 = selection;
    this.f19_1 = focus;
    this.g19_1 = positive;
    this.h19_1 = negative;
    this.i19_1 = caution;
    this.j19_1 = info;
    this.k19_1 = gradient;
    this.l19_1 = brand;
  }
  protoOf(ColorTokens).e1w = function (surface, content, icon, border, selection, focus, positive, negative, caution, info, gradient, brand) {
    return new ColorTokens(surface, content, icon, border, selection, focus, positive, negative, caution, info, gradient, brand);
  };
  protoOf(ColorTokens).z20 = function (surface, content, icon, border, selection, focus, positive, negative, caution, info, gradient, brand, $super) {
    surface = surface === VOID ? this.a19_1 : surface;
    content = content === VOID ? this.b19_1 : content;
    icon = icon === VOID ? this.c19_1 : icon;
    border = border === VOID ? this.d19_1 : border;
    selection = selection === VOID ? this.e19_1 : selection;
    focus = focus === VOID ? this.f19_1 : focus;
    positive = positive === VOID ? this.g19_1 : positive;
    negative = negative === VOID ? this.h19_1 : negative;
    caution = caution === VOID ? this.i19_1 : caution;
    info = info === VOID ? this.j19_1 : info;
    gradient = gradient === VOID ? this.k19_1 : gradient;
    brand = brand === VOID ? this.l19_1 : brand;
    return $super === VOID ? this.e1w(surface, content, icon, border, selection, focus, positive, negative, caution, info, gradient, brand) : $super.e1w.call(this, surface, content, icon, border, selection, focus, positive, negative, caution, info, gradient, brand);
  };
  protoOf(ColorTokens).toString = function () {
    return 'ColorTokens(surface=' + this.a19_1.toString() + ', content=' + this.b19_1.toString() + ', icon=' + this.c19_1.toString() + ', border=' + this.d19_1.toString() + ', selection=' + this.e19_1.toString() + ', focus=' + this.f19_1.toString() + ', positive=' + this.g19_1.toString() + ', negative=' + this.h19_1.toString() + ', caution=' + this.i19_1.toString() + ', info=' + this.j19_1.toString() + ', gradient=' + this.k19_1.toString() + ', brand=' + this.l19_1.toString() + ')';
  };
  protoOf(ColorTokens).hashCode = function () {
    var result = this.a19_1.hashCode();
    result = imul(result, 31) + this.b19_1.hashCode() | 0;
    result = imul(result, 31) + this.c19_1.hashCode() | 0;
    result = imul(result, 31) + this.d19_1.hashCode() | 0;
    result = imul(result, 31) + this.e19_1.hashCode() | 0;
    result = imul(result, 31) + this.f19_1.hashCode() | 0;
    result = imul(result, 31) + this.g19_1.hashCode() | 0;
    result = imul(result, 31) + this.h19_1.hashCode() | 0;
    result = imul(result, 31) + this.i19_1.hashCode() | 0;
    result = imul(result, 31) + this.j19_1.hashCode() | 0;
    result = imul(result, 31) + this.k19_1.hashCode() | 0;
    result = imul(result, 31) + this.l19_1.hashCode() | 0;
    return result;
  };
  protoOf(ColorTokens).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ColorTokens))
      return false;
    if (!this.a19_1.equals(other.a19_1))
      return false;
    if (!this.b19_1.equals(other.b19_1))
      return false;
    if (!this.c19_1.equals(other.c19_1))
      return false;
    if (!this.d19_1.equals(other.d19_1))
      return false;
    if (!this.e19_1.equals(other.e19_1))
      return false;
    if (!this.f19_1.equals(other.f19_1))
      return false;
    if (!this.g19_1.equals(other.g19_1))
      return false;
    if (!this.h19_1.equals(other.h19_1))
      return false;
    if (!this.i19_1.equals(other.i19_1))
      return false;
    if (!this.j19_1.equals(other.j19_1))
      return false;
    if (!this.k19_1.equals(other.k19_1))
      return false;
    if (!this.l19_1.equals(other.l19_1))
      return false;
    return true;
  };
  function SurfaceColors(default_0, elevated, recessed, inverse) {
    this.w18_1 = default_0;
    this.x18_1 = elevated;
    this.y18_1 = recessed;
    this.z18_1 = inverse;
  }
  protoOf(SurfaceColors).f1w = function (default_0, elevated, recessed, inverse) {
    return new SurfaceColors(default_0, elevated, recessed, inverse);
  };
  protoOf(SurfaceColors).j24 = function (default_0, elevated, recessed, inverse, $super) {
    default_0 = default_0 === VOID ? this.w18_1 : default_0;
    elevated = elevated === VOID ? this.x18_1 : elevated;
    recessed = recessed === VOID ? this.y18_1 : recessed;
    inverse = inverse === VOID ? this.z18_1 : inverse;
    return $super === VOID ? this.f1w(default_0, elevated, recessed, inverse) : $super.f1w.call(this, default_0, elevated, recessed, inverse);
  };
  protoOf(SurfaceColors).toString = function () {
    return 'SurfaceColors(default=' + this.w18_1.toString() + ', elevated=' + this.x18_1.toString() + ', recessed=' + this.y18_1.toString() + ', inverse=' + this.z18_1.toString() + ')';
  };
  protoOf(SurfaceColors).hashCode = function () {
    var result = this.w18_1.hashCode();
    result = imul(result, 31) + this.x18_1.hashCode() | 0;
    result = imul(result, 31) + this.y18_1.hashCode() | 0;
    result = imul(result, 31) + this.z18_1.hashCode() | 0;
    return result;
  };
  protoOf(SurfaceColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SurfaceColors))
      return false;
    if (!this.w18_1.equals(other.w18_1))
      return false;
    if (!this.x18_1.equals(other.x18_1))
      return false;
    if (!this.y18_1.equals(other.y18_1))
      return false;
    if (!this.z18_1.equals(other.z18_1))
      return false;
    return true;
  };
  function ContentColors(default_0, muted, inverse) {
    this.m19_1 = default_0;
    this.n19_1 = muted;
    this.o19_1 = inverse;
  }
  protoOf(ContentColors).g1w = function (default_0, muted, inverse) {
    return new ContentColors(default_0, muted, inverse);
  };
  protoOf(ContentColors).x20 = function (default_0, muted, inverse, $super) {
    default_0 = default_0 === VOID ? this.m19_1 : default_0;
    muted = muted === VOID ? this.n19_1 : muted;
    inverse = inverse === VOID ? this.o19_1 : inverse;
    return $super === VOID ? this.g1w(default_0, muted, inverse) : $super.g1w.call(this, default_0, muted, inverse);
  };
  protoOf(ContentColors).toString = function () {
    return 'ContentColors(default=' + this.m19_1.toString() + ', muted=' + this.n19_1.toString() + ', inverse=' + this.o19_1.toString() + ')';
  };
  protoOf(ContentColors).hashCode = function () {
    var result = this.m19_1.hashCode();
    result = imul(result, 31) + this.n19_1.hashCode() | 0;
    result = imul(result, 31) + this.o19_1.hashCode() | 0;
    return result;
  };
  protoOf(ContentColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ContentColors))
      return false;
    if (!this.m19_1.equals(other.m19_1))
      return false;
    if (!this.n19_1.equals(other.n19_1))
      return false;
    if (!this.o19_1.equals(other.o19_1))
      return false;
    return true;
  };
  function IconColors(default_0, muted, inverse) {
    this.p19_1 = default_0;
    this.q19_1 = muted;
    this.r19_1 = inverse;
  }
  protoOf(IconColors).g1w = function (default_0, muted, inverse) {
    return new IconColors(default_0, muted, inverse);
  };
  protoOf(IconColors).y20 = function (default_0, muted, inverse, $super) {
    default_0 = default_0 === VOID ? this.p19_1 : default_0;
    muted = muted === VOID ? this.q19_1 : muted;
    inverse = inverse === VOID ? this.r19_1 : inverse;
    return $super === VOID ? this.g1w(default_0, muted, inverse) : $super.g1w.call(this, default_0, muted, inverse);
  };
  protoOf(IconColors).toString = function () {
    return 'IconColors(default=' + this.p19_1.toString() + ', muted=' + this.q19_1.toString() + ', inverse=' + this.r19_1.toString() + ')';
  };
  protoOf(IconColors).hashCode = function () {
    var result = this.p19_1.hashCode();
    result = imul(result, 31) + this.q19_1.hashCode() | 0;
    result = imul(result, 31) + this.r19_1.hashCode() | 0;
    return result;
  };
  protoOf(IconColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IconColors))
      return false;
    if (!this.p19_1.equals(other.p19_1))
      return false;
    if (!this.q19_1.equals(other.q19_1))
      return false;
    if (!this.r19_1.equals(other.r19_1))
      return false;
    return true;
  };
  function BorderColors(default_0, muted, strong, inverse) {
    this.s19_1 = default_0;
    this.t19_1 = muted;
    this.u19_1 = strong;
    this.v19_1 = inverse;
  }
  protoOf(BorderColors).f1w = function (default_0, muted, strong, inverse) {
    return new BorderColors(default_0, muted, strong, inverse);
  };
  protoOf(BorderColors).k24 = function (default_0, muted, strong, inverse, $super) {
    default_0 = default_0 === VOID ? this.s19_1 : default_0;
    muted = muted === VOID ? this.t19_1 : muted;
    strong = strong === VOID ? this.u19_1 : strong;
    inverse = inverse === VOID ? this.v19_1 : inverse;
    return $super === VOID ? this.f1w(default_0, muted, strong, inverse) : $super.f1w.call(this, default_0, muted, strong, inverse);
  };
  protoOf(BorderColors).toString = function () {
    return 'BorderColors(default=' + this.s19_1.toString() + ', muted=' + this.t19_1.toString() + ', strong=' + this.u19_1.toString() + ', inverse=' + this.v19_1.toString() + ')';
  };
  protoOf(BorderColors).hashCode = function () {
    var result = this.s19_1.hashCode();
    result = imul(result, 31) + this.t19_1.hashCode() | 0;
    result = imul(result, 31) + this.u19_1.hashCode() | 0;
    result = imul(result, 31) + this.v19_1.hashCode() | 0;
    return result;
  };
  protoOf(BorderColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BorderColors))
      return false;
    if (!this.s19_1.equals(other.s19_1))
      return false;
    if (!this.t19_1.equals(other.t19_1))
      return false;
    if (!this.u19_1.equals(other.u19_1))
      return false;
    if (!this.v19_1.equals(other.v19_1))
      return false;
    return true;
  };
  function SelectionColors(surface, content, border) {
    this.w19_1 = surface;
    this.x19_1 = content;
    this.y19_1 = border;
  }
  protoOf(SelectionColors).g1w = function (surface, content, border) {
    return new SelectionColors(surface, content, border);
  };
  protoOf(SelectionColors).l24 = function (surface, content, border, $super) {
    surface = surface === VOID ? this.w19_1 : surface;
    content = content === VOID ? this.x19_1 : content;
    border = border === VOID ? this.y19_1 : border;
    return $super === VOID ? this.g1w(surface, content, border) : $super.g1w.call(this, surface, content, border);
  };
  protoOf(SelectionColors).toString = function () {
    return 'SelectionColors(surface=' + this.w19_1.toString() + ', content=' + this.x19_1.toString() + ', border=' + this.y19_1.toString() + ')';
  };
  protoOf(SelectionColors).hashCode = function () {
    var result = this.w19_1.hashCode();
    result = imul(result, 31) + this.x19_1.hashCode() | 0;
    result = imul(result, 31) + this.y19_1.hashCode() | 0;
    return result;
  };
  protoOf(SelectionColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SelectionColors))
      return false;
    if (!this.w19_1.equals(other.w19_1))
      return false;
    if (!this.x19_1.equals(other.x19_1))
      return false;
    if (!this.y19_1.equals(other.y19_1))
      return false;
    return true;
  };
  function FocusColors(ring) {
    this.z19_1 = ring;
  }
  protoOf(FocusColors).y1v = function (ring) {
    return new FocusColors(ring);
  };
  protoOf(FocusColors).toString = function () {
    return 'FocusColors(ring=' + this.z19_1.toString() + ')';
  };
  protoOf(FocusColors).hashCode = function () {
    return this.z19_1.hashCode();
  };
  protoOf(FocusColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FocusColors))
      return false;
    if (!this.z19_1.equals(other.z19_1))
      return false;
    return true;
  };
  function StatusColors(surface, content, border, icon) {
    this.a1a_1 = surface;
    this.b1a_1 = content;
    this.c1a_1 = border;
    this.d1a_1 = icon;
  }
  protoOf(StatusColors).f1w = function (surface, content, border, icon) {
    return new StatusColors(surface, content, border, icon);
  };
  protoOf(StatusColors).m24 = function (surface, content, border, icon, $super) {
    surface = surface === VOID ? this.a1a_1 : surface;
    content = content === VOID ? this.b1a_1 : content;
    border = border === VOID ? this.c1a_1 : border;
    icon = icon === VOID ? this.d1a_1 : icon;
    return $super === VOID ? this.f1w(surface, content, border, icon) : $super.f1w.call(this, surface, content, border, icon);
  };
  protoOf(StatusColors).toString = function () {
    return 'StatusColors(surface=' + this.a1a_1.toString() + ', content=' + this.b1a_1.toString() + ', border=' + this.c1a_1.toString() + ', icon=' + this.d1a_1.toString() + ')';
  };
  protoOf(StatusColors).hashCode = function () {
    var result = this.a1a_1.hashCode();
    result = imul(result, 31) + this.b1a_1.hashCode() | 0;
    result = imul(result, 31) + this.c1a_1.hashCode() | 0;
    result = imul(result, 31) + this.d1a_1.hashCode() | 0;
    return result;
  };
  protoOf(StatusColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof StatusColors))
      return false;
    if (!this.a1a_1.equals(other.a1a_1))
      return false;
    if (!this.b1a_1.equals(other.b1a_1))
      return false;
    if (!this.c1a_1.equals(other.c1a_1))
      return false;
    if (!this.d1a_1.equals(other.d1a_1))
      return false;
    return true;
  };
  function BrandColors(primary, secondary, tertiary, quaternary) {
    this.e1a_1 = primary;
    this.f1a_1 = secondary;
    this.g1a_1 = tertiary;
    this.h1a_1 = quaternary;
  }
  protoOf(BrandColors).h1w = function (primary, secondary, tertiary, quaternary) {
    return new BrandColors(primary, secondary, tertiary, quaternary);
  };
  protoOf(BrandColors).n24 = function (primary, secondary, tertiary, quaternary, $super) {
    primary = primary === VOID ? this.e1a_1 : primary;
    secondary = secondary === VOID ? this.f1a_1 : secondary;
    tertiary = tertiary === VOID ? this.g1a_1 : tertiary;
    quaternary = quaternary === VOID ? this.h1a_1 : quaternary;
    return $super === VOID ? this.h1w(primary, secondary, tertiary, quaternary) : $super.h1w.call(this, primary, secondary, tertiary, quaternary);
  };
  protoOf(BrandColors).toString = function () {
    return 'BrandColors(primary=' + this.e1a_1.toString() + ', secondary=' + toString_0(this.f1a_1) + ', tertiary=' + toString_0(this.g1a_1) + ', quaternary=' + toString_0(this.h1a_1) + ')';
  };
  protoOf(BrandColors).hashCode = function () {
    var result = this.e1a_1.hashCode();
    result = imul(result, 31) + (this.f1a_1 == null ? 0 : this.f1a_1.hashCode()) | 0;
    result = imul(result, 31) + (this.g1a_1 == null ? 0 : this.g1a_1.hashCode()) | 0;
    result = imul(result, 31) + (this.h1a_1 == null ? 0 : this.h1a_1.hashCode()) | 0;
    return result;
  };
  protoOf(BrandColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BrandColors))
      return false;
    if (!this.e1a_1.equals(other.e1a_1))
      return false;
    if (!equals(this.f1a_1, other.f1a_1))
      return false;
    if (!equals(this.g1a_1, other.g1a_1))
      return false;
    if (!equals(this.h1a_1, other.h1a_1))
      return false;
    return true;
  };
  function GradientColors(brand, surface) {
    this.z1v_1 = brand;
    this.a1w_1 = surface;
  }
  protoOf(GradientColors).d1w = function (brand, surface) {
    return new GradientColors(brand, surface);
  };
  protoOf(GradientColors).toString = function () {
    return 'GradientColors(brand=' + this.z1v_1.toString() + ', surface=' + this.a1w_1.toString() + ')';
  };
  protoOf(GradientColors).hashCode = function () {
    var result = this.z1v_1.hashCode();
    result = imul(result, 31) + this.a1w_1.hashCode() | 0;
    return result;
  };
  protoOf(GradientColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof GradientColors))
      return false;
    if (!this.z1v_1.equals(other.z1v_1))
      return false;
    if (!this.a1w_1.equals(other.a1w_1))
      return false;
    return true;
  };
  function ResolvedTheme(mode, color, typography, spacing, radius, depth, size, motion) {
    this.o24_1 = mode;
    this.p24_1 = color;
    this.q24_1 = typography;
    this.r24_1 = spacing;
    this.s24_1 = radius;
    this.t24_1 = depth;
    this.u24_1 = size;
    this.v24_1 = motion;
  }
  protoOf(ResolvedTheme).toString = function () {
    return 'ResolvedTheme(mode=' + this.o24_1.toString() + ', color=' + this.p24_1.toString() + ', typography=' + this.q24_1.toString() + ', spacing=' + this.r24_1.toString() + ', radius=' + this.s24_1.toString() + ', depth=' + this.t24_1.toString() + ', size=' + this.u24_1.toString() + ', motion=' + this.v24_1.toString() + ')';
  };
  protoOf(ResolvedTheme).hashCode = function () {
    var result = this.o24_1.hashCode();
    result = imul(result, 31) + this.p24_1.hashCode() | 0;
    result = imul(result, 31) + this.q24_1.hashCode() | 0;
    result = imul(result, 31) + this.r24_1.hashCode() | 0;
    result = imul(result, 31) + this.s24_1.hashCode() | 0;
    result = imul(result, 31) + this.t24_1.hashCode() | 0;
    result = imul(result, 31) + this.u24_1.hashCode() | 0;
    result = imul(result, 31) + this.v24_1.hashCode() | 0;
    return result;
  };
  protoOf(ResolvedTheme).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ResolvedTheme))
      return false;
    if (!this.o24_1.equals(other.o24_1))
      return false;
    if (!this.p24_1.equals(other.p24_1))
      return false;
    if (!this.q24_1.equals(other.q24_1))
      return false;
    if (!this.r24_1.equals(other.r24_1))
      return false;
    if (!this.s24_1.equals(other.s24_1))
      return false;
    if (!this.t24_1.equals(other.t24_1))
      return false;
    if (!this.u24_1.equals(other.u24_1))
      return false;
    if (!this.v24_1.equals(other.v24_1))
      return false;
    return true;
  };
  function ResolvedThemePair(light, dark, report) {
    this.w24_1 = light;
    this.x24_1 = dark;
    this.y24_1 = report;
    // Inline function 'kotlin.require' call
    if (!(!(this.w24_1 == null) || !(this.x24_1 == null))) {
      var message = 'ResolvedThemePair requires at least one mode.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(ResolvedThemePair).toString = function () {
    return 'ResolvedThemePair(light=' + toString_0(this.w24_1) + ', dark=' + toString_0(this.x24_1) + ', report=' + this.y24_1.toString() + ')';
  };
  protoOf(ResolvedThemePair).hashCode = function () {
    var result = this.w24_1 == null ? 0 : this.w24_1.hashCode();
    result = imul(result, 31) + (this.x24_1 == null ? 0 : this.x24_1.hashCode()) | 0;
    result = imul(result, 31) + this.y24_1.hashCode() | 0;
    return result;
  };
  protoOf(ResolvedThemePair).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ResolvedThemePair))
      return false;
    if (!equals(this.w24_1, other.w24_1))
      return false;
    if (!equals(this.x24_1, other.x24_1))
      return false;
    if (!this.y24_1.equals(other.y24_1))
      return false;
    return true;
  };
  function MotionTokens(feedback, stateTransition, transformation, expansion, reposition, emphasis) {
    this.m1b_1 = feedback;
    this.n1b_1 = stateTransition;
    this.o1b_1 = transformation;
    this.p1b_1 = expansion;
    this.q1b_1 = reposition;
    this.r1b_1 = emphasis;
  }
  protoOf(MotionTokens).o1w = function (feedback, stateTransition, transformation, expansion, reposition, emphasis) {
    return new MotionTokens(feedback, stateTransition, transformation, expansion, reposition, emphasis);
  };
  protoOf(MotionTokens).toString = function () {
    return 'MotionTokens(feedback=' + this.m1b_1.toString() + ', stateTransition=' + this.n1b_1.toString() + ', transformation=' + this.o1b_1.toString() + ', expansion=' + this.p1b_1.toString() + ', reposition=' + this.q1b_1.toString() + ', emphasis=' + this.r1b_1.toString() + ')';
  };
  protoOf(MotionTokens).hashCode = function () {
    var result = this.m1b_1.hashCode();
    result = imul(result, 31) + this.n1b_1.hashCode() | 0;
    result = imul(result, 31) + this.o1b_1.hashCode() | 0;
    result = imul(result, 31) + this.p1b_1.hashCode() | 0;
    result = imul(result, 31) + this.q1b_1.hashCode() | 0;
    result = imul(result, 31) + this.r1b_1.hashCode() | 0;
    return result;
  };
  protoOf(MotionTokens).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MotionTokens))
      return false;
    if (!this.m1b_1.equals(other.m1b_1))
      return false;
    if (!this.n1b_1.equals(other.n1b_1))
      return false;
    if (!this.o1b_1.equals(other.o1b_1))
      return false;
    if (!this.p1b_1.equals(other.p1b_1))
      return false;
    if (!this.q1b_1.equals(other.q1b_1))
      return false;
    if (!this.r1b_1.equals(other.r1b_1))
      return false;
    return true;
  };
  function Companion_75() {
  }
  var Companion_instance_76;
  function Companion_getInstance_74() {
    return Companion_instance_76;
  }
  function $serializer_51() {
    $serializer_instance_47 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec', this, 4);
    tmp0_serialDesc.lp('elevation', false);
    tmp0_serialDesc.lp('shadowAlpha', false);
    tmp0_serialDesc.lp('shadowBlur', false);
    tmp0_serialDesc.lp('shadowYOffset', false);
    this.z24_1 = tmp0_serialDesc;
  }
  protoOf($serializer_51).a25 = function (encoder, value) {
    var tmp0_desc = this.z24_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance(), new DpValue(value.j1x_1));
    tmp1_output.jk(tmp0_desc, 1, value.k1x_1);
    tmp1_output.ok(tmp0_desc, 2, $serializer_getInstance(), new DpValue(value.l1x_1));
    tmp1_output.ok(tmp0_desc, 3, $serializer_getInstance(), new DpValue(value.m1x_1));
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_51).yf = function (encoder, value) {
    return this.a25(encoder, value instanceof DepthSpec ? value : THROW_CCE());
  };
  protoOf($serializer_51).zf = function (decoder) {
    var tmp0_desc = this.z24_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = 0.0;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_input = decoder.xi(tmp0_desc);
    if (tmp8_input.nj()) {
      var tmp = $serializer_getInstance();
      var tmp_0 = tmp4_local0;
      var tmp_1 = tmp8_input.jj(tmp0_desc, 0, tmp, tmp_0 == null ? null : new DpValue(tmp_0));
      tmp4_local0 = tmp_1 == null ? null : tmp_1.p1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp8_input.ej(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      var tmp_2 = $serializer_getInstance();
      var tmp_3 = tmp6_local2;
      var tmp_4 = tmp8_input.jj(tmp0_desc, 2, tmp_2, tmp_3 == null ? null : new DpValue(tmp_3));
      tmp6_local2 = tmp_4 == null ? null : tmp_4.p1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      var tmp_5 = $serializer_getInstance();
      var tmp_6 = tmp7_local3;
      var tmp_7 = tmp8_input.jj(tmp0_desc, 3, tmp_5, tmp_6 == null ? null : new DpValue(tmp_6));
      tmp7_local3 = tmp_7 == null ? null : tmp_7.p1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp8_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            var tmp_8 = $serializer_getInstance();
            var tmp_9 = tmp4_local0;
            var tmp_10 = tmp8_input.jj(tmp0_desc, 0, tmp_8, tmp_9 == null ? null : new DpValue(tmp_9));
            tmp4_local0 = tmp_10 == null ? null : tmp_10.p1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp8_input.ej(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            var tmp_11 = $serializer_getInstance();
            var tmp_12 = tmp6_local2;
            var tmp_13 = tmp8_input.jj(tmp0_desc, 2, tmp_11, tmp_12 == null ? null : new DpValue(tmp_12));
            tmp6_local2 = tmp_13 == null ? null : tmp_13.p1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            var tmp_14 = $serializer_getInstance();
            var tmp_15 = tmp7_local3;
            var tmp_16 = tmp8_input.jj(tmp0_desc, 3, tmp_14, tmp_15 == null ? null : new DpValue(tmp_15));
            tmp7_local3 = tmp_16 == null ? null : tmp_16.p1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp8_input.yi(tmp0_desc);
    return DepthSpec_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
  };
  protoOf($serializer_51).xf = function () {
    return this.z24_1;
  };
  protoOf($serializer_51).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance(), FloatSerializer_getInstance(), $serializer_getInstance(), $serializer_getInstance()];
  };
  var $serializer_instance_47;
  function $serializer_getInstance_47() {
    if ($serializer_instance_47 == null)
      new $serializer_51();
    return $serializer_instance_47;
  }
  function DepthSpec_init_$Init$(seen0, elevation, shadowAlpha, shadowBlur, shadowYOffset, serializationConstructorMarker, $this) {
    if (!(15 === (15 & seen0))) {
      throwMissingFieldException(seen0, 15, $serializer_getInstance_47().z24_1);
    }
    $this.j1x_1 = elevation;
    $this.k1x_1 = shadowAlpha;
    $this.l1x_1 = shadowBlur;
    $this.m1x_1 = shadowYOffset;
    var tmp;
    if (isFinite($this.k1x_1)) {
      var containsArg = $this.k1x_1;
      tmp = 0.0 <= containsArg ? containsArg <= 1.0 : false;
    } else {
      tmp = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp) {
      var message = 'DepthSpec.shadowAlpha must be in 0..1, was ' + $this.k1x_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return $this;
  }
  function DepthSpec_init_$Create$(seen0, elevation, shadowAlpha, shadowBlur, shadowYOffset, serializationConstructorMarker) {
    return DepthSpec_init_$Init$(seen0, elevation, shadowAlpha, shadowBlur, shadowYOffset, serializationConstructorMarker, objectCreate(protoOf(DepthSpec)));
  }
  function DepthSpec(elevation, shadowAlpha, shadowBlur, shadowYOffset) {
    this.j1x_1 = elevation;
    this.k1x_1 = shadowAlpha;
    this.l1x_1 = shadowBlur;
    this.m1x_1 = shadowYOffset;
    var tmp;
    if (isFinite(this.k1x_1)) {
      var containsArg = this.k1x_1;
      tmp = 0.0 <= containsArg ? containsArg <= 1.0 : false;
    } else {
      tmp = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp) {
      var message = 'DepthSpec.shadowAlpha must be in 0..1, was ' + this.k1x_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(DepthSpec).n1x = function (elevation, shadowAlpha, shadowBlur, shadowYOffset) {
    return new DepthSpec(elevation, shadowAlpha, shadowBlur, shadowYOffset);
  };
  protoOf(DepthSpec).toString = function () {
    return 'DepthSpec(elevation=' + DpValue__toString_impl_qlaqm4(this.j1x_1) + ', shadowAlpha=' + this.k1x_1 + ', shadowBlur=' + DpValue__toString_impl_qlaqm4(this.l1x_1) + ', shadowYOffset=' + DpValue__toString_impl_qlaqm4(this.m1x_1) + ')';
  };
  protoOf(DepthSpec).hashCode = function () {
    var result = DpValue__hashCode_impl_4u4tt9(this.j1x_1);
    result = imul(result, 31) + getNumberHashCode(this.k1x_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.l1x_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.m1x_1) | 0;
    return result;
  };
  protoOf(DepthSpec).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DepthSpec))
      return false;
    if (!equals(this.j1x_1, other.j1x_1))
      return false;
    if (!equals(this.k1x_1, other.k1x_1))
      return false;
    if (!equals(this.l1x_1, other.l1x_1))
      return false;
    if (!equals(this.m1x_1, other.m1x_1))
      return false;
    return true;
  };
  function DepthTokens(level1, level2, level3, level4) {
    this.v1a_1 = level1;
    this.w1a_1 = level2;
    this.x1a_1 = level3;
    this.y1a_1 = level4;
  }
  protoOf(DepthTokens).v1w = function (level1, level2, level3, level4) {
    return new DepthTokens(level1, level2, level3, level4);
  };
  protoOf(DepthTokens).toString = function () {
    return 'DepthTokens(level1=' + this.v1a_1.toString() + ', level2=' + this.w1a_1.toString() + ', level3=' + this.x1a_1.toString() + ', level4=' + this.y1a_1.toString() + ')';
  };
  protoOf(DepthTokens).hashCode = function () {
    var result = this.v1a_1.hashCode();
    result = imul(result, 31) + this.w1a_1.hashCode() | 0;
    result = imul(result, 31) + this.x1a_1.hashCode() | 0;
    result = imul(result, 31) + this.y1a_1.hashCode() | 0;
    return result;
  };
  protoOf(DepthTokens).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DepthTokens))
      return false;
    if (!this.v1a_1.equals(other.v1a_1))
      return false;
    if (!this.w1a_1.equals(other.w1a_1))
      return false;
    if (!this.x1a_1.equals(other.x1a_1))
      return false;
    if (!this.y1a_1.equals(other.y1a_1))
      return false;
    return true;
  };
  function RadiusTokens(none, level1, level2, level3, level4, level5, level6, level7, level8, full) {
    this.w1b_1 = none;
    this.x1b_1 = level1;
    this.y1b_1 = level2;
    this.z1b_1 = level3;
    this.a1c_1 = level4;
    this.b1c_1 = level5;
    this.c1c_1 = level6;
    this.d1c_1 = level7;
    this.e1c_1 = level8;
    this.f1c_1 = full;
  }
  protoOf(RadiusTokens).u1w = function (none, level1, level2, level3, level4, level5, level6, level7, level8, full) {
    return new RadiusTokens(none, level1, level2, level3, level4, level5, level6, level7, level8, full);
  };
  protoOf(RadiusTokens).a1x = function (none, level1, level2, level3, level4, level5, level6, level7, level8, full, $super) {
    none = none === VOID ? this.w1b_1 : none;
    level1 = level1 === VOID ? this.x1b_1 : level1;
    level2 = level2 === VOID ? this.y1b_1 : level2;
    level3 = level3 === VOID ? this.z1b_1 : level3;
    level4 = level4 === VOID ? this.a1c_1 : level4;
    level5 = level5 === VOID ? this.b1c_1 : level5;
    level6 = level6 === VOID ? this.c1c_1 : level6;
    level7 = level7 === VOID ? this.d1c_1 : level7;
    level8 = level8 === VOID ? this.e1c_1 : level8;
    full = full === VOID ? this.f1c_1 : full;
    return $super === VOID ? this.u1w(none, level1, level2, level3, level4, level5, level6, level7, level8, full) : $super.u1w.call(this, new DpValue(none), new DpValue(level1), new DpValue(level2), new DpValue(level3), new DpValue(level4), new DpValue(level5), new DpValue(level6), new DpValue(level7), new DpValue(level8), new DpValue(full));
  };
  protoOf(RadiusTokens).toString = function () {
    return 'RadiusTokens(none=' + DpValue__toString_impl_qlaqm4(this.w1b_1) + ', level1=' + DpValue__toString_impl_qlaqm4(this.x1b_1) + ', level2=' + DpValue__toString_impl_qlaqm4(this.y1b_1) + ', level3=' + DpValue__toString_impl_qlaqm4(this.z1b_1) + ', level4=' + DpValue__toString_impl_qlaqm4(this.a1c_1) + ', level5=' + DpValue__toString_impl_qlaqm4(this.b1c_1) + ', level6=' + DpValue__toString_impl_qlaqm4(this.c1c_1) + ', level7=' + DpValue__toString_impl_qlaqm4(this.d1c_1) + ', level8=' + DpValue__toString_impl_qlaqm4(this.e1c_1) + ', full=' + DpValue__toString_impl_qlaqm4(this.f1c_1) + ')';
  };
  protoOf(RadiusTokens).hashCode = function () {
    var result = DpValue__hashCode_impl_4u4tt9(this.w1b_1);
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.x1b_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.y1b_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.z1b_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.a1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.b1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.c1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.d1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.e1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.f1c_1) | 0;
    return result;
  };
  protoOf(RadiusTokens).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RadiusTokens))
      return false;
    if (!equals(this.w1b_1, other.w1b_1))
      return false;
    if (!equals(this.x1b_1, other.x1b_1))
      return false;
    if (!equals(this.y1b_1, other.y1b_1))
      return false;
    if (!equals(this.z1b_1, other.z1b_1))
      return false;
    if (!equals(this.a1c_1, other.a1c_1))
      return false;
    if (!equals(this.b1c_1, other.b1c_1))
      return false;
    if (!equals(this.c1c_1, other.c1c_1))
      return false;
    if (!equals(this.d1c_1, other.d1c_1))
      return false;
    if (!equals(this.e1c_1, other.e1c_1))
      return false;
    if (!equals(this.f1c_1, other.f1c_1))
      return false;
    return true;
  };
  function IconSizes(level1, level2, level3, level4, level5) {
    this.d1b_1 = level1;
    this.e1b_1 = level2;
    this.f1b_1 = level3;
    this.g1b_1 = level4;
    this.h1b_1 = level5;
  }
  protoOf(IconSizes).toString = function () {
    return 'IconSizes(level1=' + DpValue__toString_impl_qlaqm4(this.d1b_1) + ', level2=' + DpValue__toString_impl_qlaqm4(this.e1b_1) + ', level3=' + DpValue__toString_impl_qlaqm4(this.f1b_1) + ', level4=' + DpValue__toString_impl_qlaqm4(this.g1b_1) + ', level5=' + DpValue__toString_impl_qlaqm4(this.h1b_1) + ')';
  };
  protoOf(IconSizes).hashCode = function () {
    var result = DpValue__hashCode_impl_4u4tt9(this.d1b_1);
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.e1b_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.f1b_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.g1b_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.h1b_1) | 0;
    return result;
  };
  protoOf(IconSizes).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IconSizes))
      return false;
    if (!equals(this.d1b_1, other.d1b_1))
      return false;
    if (!equals(this.e1b_1, other.e1b_1))
      return false;
    if (!equals(this.f1b_1, other.f1b_1))
      return false;
    if (!equals(this.g1b_1, other.g1b_1))
      return false;
    if (!equals(this.h1b_1, other.h1b_1))
      return false;
    return true;
  };
  function SizeTokens(icon, avatar, control, dot) {
    this.b20_1 = icon;
    this.c20_1 = avatar;
    this.d20_1 = control;
    this.e20_1 = dot;
  }
  protoOf(SizeTokens).b25 = function (icon, avatar, control, dot) {
    return new SizeTokens(icon, avatar, control, dot);
  };
  protoOf(SizeTokens).a21 = function (icon, avatar, control, dot, $super) {
    icon = icon === VOID ? this.b20_1 : icon;
    avatar = avatar === VOID ? this.c20_1 : avatar;
    control = control === VOID ? this.d20_1 : control;
    dot = dot === VOID ? this.e20_1 : dot;
    return $super === VOID ? this.b25(icon, avatar, control, dot) : $super.b25.call(this, icon, avatar, control, dot);
  };
  protoOf(SizeTokens).toString = function () {
    return 'SizeTokens(icon=' + this.b20_1.toString() + ', avatar=' + this.c20_1.toString() + ', control=' + this.d20_1.toString() + ', dot=' + this.e20_1.toString() + ')';
  };
  protoOf(SizeTokens).hashCode = function () {
    var result = this.b20_1.hashCode();
    result = imul(result, 31) + this.c20_1.hashCode() | 0;
    result = imul(result, 31) + this.d20_1.hashCode() | 0;
    result = imul(result, 31) + this.e20_1.hashCode() | 0;
    return result;
  };
  protoOf(SizeTokens).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SizeTokens))
      return false;
    if (!this.b20_1.equals(other.b20_1))
      return false;
    if (!this.c20_1.equals(other.c20_1))
      return false;
    if (!this.d20_1.equals(other.d20_1))
      return false;
    if (!this.e20_1.equals(other.e20_1))
      return false;
    return true;
  };
  function ControlSizes(level1, level2, level3, level4, level5) {
    this.m1a_1 = level1;
    this.n1a_1 = level2;
    this.o1a_1 = level3;
    this.p1a_1 = level4;
    this.q1a_1 = level5;
  }
  protoOf(ControlSizes).toString = function () {
    return 'ControlSizes(level1=' + DpValue__toString_impl_qlaqm4(this.m1a_1) + ', level2=' + DpValue__toString_impl_qlaqm4(this.n1a_1) + ', level3=' + DpValue__toString_impl_qlaqm4(this.o1a_1) + ', level4=' + DpValue__toString_impl_qlaqm4(this.p1a_1) + ', level5=' + DpValue__toString_impl_qlaqm4(this.q1a_1) + ')';
  };
  protoOf(ControlSizes).hashCode = function () {
    var result = DpValue__hashCode_impl_4u4tt9(this.m1a_1);
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.n1a_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.o1a_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.p1a_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.q1a_1) | 0;
    return result;
  };
  protoOf(ControlSizes).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ControlSizes))
      return false;
    if (!equals(this.m1a_1, other.m1a_1))
      return false;
    if (!equals(this.n1a_1, other.n1a_1))
      return false;
    if (!equals(this.o1a_1, other.o1a_1))
      return false;
    if (!equals(this.p1a_1, other.p1a_1))
      return false;
    if (!equals(this.q1a_1, other.q1a_1))
      return false;
    return true;
  };
  function AvatarSizes(level1, level2, level3, level4, level5) {
    this.f20_1 = level1;
    this.g20_1 = level2;
    this.h20_1 = level3;
    this.i20_1 = level4;
    this.j20_1 = level5;
  }
  protoOf(AvatarSizes).toString = function () {
    return 'AvatarSizes(level1=' + DpValue__toString_impl_qlaqm4(this.f20_1) + ', level2=' + DpValue__toString_impl_qlaqm4(this.g20_1) + ', level3=' + DpValue__toString_impl_qlaqm4(this.h20_1) + ', level4=' + DpValue__toString_impl_qlaqm4(this.i20_1) + ', level5=' + DpValue__toString_impl_qlaqm4(this.j20_1) + ')';
  };
  protoOf(AvatarSizes).hashCode = function () {
    var result = DpValue__hashCode_impl_4u4tt9(this.f20_1);
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.g20_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.h20_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.i20_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.j20_1) | 0;
    return result;
  };
  protoOf(AvatarSizes).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AvatarSizes))
      return false;
    if (!equals(this.f20_1, other.f20_1))
      return false;
    if (!equals(this.g20_1, other.g20_1))
      return false;
    if (!equals(this.h20_1, other.h20_1))
      return false;
    if (!equals(this.i20_1, other.i20_1))
      return false;
    if (!equals(this.j20_1, other.j20_1))
      return false;
    return true;
  };
  function DotSizes(level1, level2, level3) {
    this.k20_1 = level1;
    this.l20_1 = level2;
    this.m20_1 = level3;
  }
  protoOf(DotSizes).toString = function () {
    return 'DotSizes(level1=' + DpValue__toString_impl_qlaqm4(this.k20_1) + ', level2=' + DpValue__toString_impl_qlaqm4(this.l20_1) + ', level3=' + DpValue__toString_impl_qlaqm4(this.m20_1) + ')';
  };
  protoOf(DotSizes).hashCode = function () {
    var result = DpValue__hashCode_impl_4u4tt9(this.k20_1);
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.l20_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.m20_1) | 0;
    return result;
  };
  protoOf(DotSizes).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DotSizes))
      return false;
    if (!equals(this.k20_1, other.k20_1))
      return false;
    if (!equals(this.l20_1, other.l20_1))
      return false;
    if (!equals(this.m20_1, other.m20_1))
      return false;
    return true;
  };
  function SpacingTokens(level1, level2, level3, level4, level5, level6, level7, level8) {
    this.k1c_1 = level1;
    this.l1c_1 = level2;
    this.m1c_1 = level3;
    this.n1c_1 = level4;
    this.o1c_1 = level5;
    this.p1c_1 = level6;
    this.q1c_1 = level7;
    this.r1c_1 = level8;
  }
  protoOf(SpacingTokens).t1w = function (level1, level2, level3, level4, level5, level6, level7, level8) {
    return new SpacingTokens(level1, level2, level3, level4, level5, level6, level7, level8);
  };
  protoOf(SpacingTokens).toString = function () {
    return 'SpacingTokens(level1=' + DpValue__toString_impl_qlaqm4(this.k1c_1) + ', level2=' + DpValue__toString_impl_qlaqm4(this.l1c_1) + ', level3=' + DpValue__toString_impl_qlaqm4(this.m1c_1) + ', level4=' + DpValue__toString_impl_qlaqm4(this.n1c_1) + ', level5=' + DpValue__toString_impl_qlaqm4(this.o1c_1) + ', level6=' + DpValue__toString_impl_qlaqm4(this.p1c_1) + ', level7=' + DpValue__toString_impl_qlaqm4(this.q1c_1) + ', level8=' + DpValue__toString_impl_qlaqm4(this.r1c_1) + ')';
  };
  protoOf(SpacingTokens).hashCode = function () {
    var result = DpValue__hashCode_impl_4u4tt9(this.k1c_1);
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.l1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.m1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.n1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.o1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.p1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.q1c_1) | 0;
    result = imul(result, 31) + DpValue__hashCode_impl_4u4tt9(this.r1c_1) | 0;
    return result;
  };
  protoOf(SpacingTokens).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SpacingTokens))
      return false;
    if (!equals(this.k1c_1, other.k1c_1))
      return false;
    if (!equals(this.l1c_1, other.l1c_1))
      return false;
    if (!equals(this.m1c_1, other.m1c_1))
      return false;
    if (!equals(this.n1c_1, other.n1c_1))
      return false;
    if (!equals(this.o1c_1, other.o1c_1))
      return false;
    if (!equals(this.p1c_1, other.p1c_1))
      return false;
    if (!equals(this.q1c_1, other.q1c_1))
      return false;
    if (!equals(this.r1c_1, other.r1c_1))
      return false;
    return true;
  };
  function Companion_76() {
  }
  var Companion_instance_77;
  function Companion_getInstance_75() {
    return Companion_instance_77;
  }
  function $serializer_52() {
    $serializer_instance_48 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef.Catalog', this, 1);
    tmp0_serialDesc.lp('id', false);
    this.c25_1 = tmp0_serialDesc;
  }
  protoOf($serializer_52).d25 = function (encoder, value) {
    var tmp0_desc = this.c25_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance_50(), new GoogleFontId(value.b21_1));
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_52).yf = function (encoder, value) {
    return this.d25(encoder, value instanceof Catalog ? value : THROW_CCE());
  };
  protoOf($serializer_52).zf = function (decoder) {
    var tmp0_desc = this.c25_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      var tmp = $serializer_getInstance_50();
      var tmp_0 = tmp4_local0;
      var tmp_1 = tmp5_input.jj(tmp0_desc, 0, tmp, tmp_0 == null ? null : new GoogleFontId(tmp_0));
      tmp4_local0 = tmp_1 == null ? null : tmp_1.e25_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            var tmp_2 = $serializer_getInstance_50();
            var tmp_3 = tmp4_local0;
            var tmp_4 = tmp5_input.jj(tmp0_desc, 0, tmp_2, tmp_3 == null ? null : new GoogleFontId(tmp_3));
            tmp4_local0 = tmp_4 == null ? null : tmp_4.e25_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Catalog_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_52).xf = function () {
    return this.c25_1;
  };
  protoOf($serializer_52).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance_50()];
  };
  var $serializer_instance_48;
  function $serializer_getInstance_48() {
    if ($serializer_instance_48 == null)
      new $serializer_52();
    return $serializer_instance_48;
  }
  function Catalog_init_$Init$(seen0, id, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_48().c25_1);
    }
    $this.b21_1 = id;
    return $this;
  }
  function Catalog_init_$Create$(seen0, id, serializationConstructorMarker) {
    return Catalog_init_$Init$(seen0, id, serializationConstructorMarker, objectCreate(protoOf(Catalog)));
  }
  function Companion_77() {
  }
  var Companion_instance_78;
  function Companion_getInstance_76() {
    return Companion_instance_78;
  }
  function $serializer_53() {
    $serializer_instance_49 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef.Custom', this, 1);
    tmp0_serialDesc.lp('key', false);
    this.f25_1 = tmp0_serialDesc;
  }
  protoOf($serializer_53).g25 = function (encoder, value) {
    var tmp0_desc = this.f25_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance_51(), new CustomFontKey(value.i22_1));
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_53).yf = function (encoder, value) {
    return this.g25(encoder, value instanceof Custom ? value : THROW_CCE());
  };
  protoOf($serializer_53).zf = function (decoder) {
    var tmp0_desc = this.f25_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      var tmp = $serializer_getInstance_51();
      var tmp_0 = tmp4_local0;
      var tmp_1 = tmp5_input.jj(tmp0_desc, 0, tmp, tmp_0 == null ? null : new CustomFontKey(tmp_0));
      tmp4_local0 = tmp_1 == null ? null : tmp_1.h25_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            var tmp_2 = $serializer_getInstance_51();
            var tmp_3 = tmp4_local0;
            var tmp_4 = tmp5_input.jj(tmp0_desc, 0, tmp_2, tmp_3 == null ? null : new CustomFontKey(tmp_3));
            tmp4_local0 = tmp_4 == null ? null : tmp_4.h25_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Custom_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_53).xf = function () {
    return this.f25_1;
  };
  protoOf($serializer_53).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance_51()];
  };
  var $serializer_instance_49;
  function $serializer_getInstance_49() {
    if ($serializer_instance_49 == null)
      new $serializer_53();
    return $serializer_instance_49;
  }
  function Custom_init_$Init$(seen0, key, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_49().f25_1);
    }
    $this.i22_1 = key;
    return $this;
  }
  function Custom_init_$Create$(seen0, key, serializationConstructorMarker) {
    return Custom_init_$Init$(seen0, key, serializationConstructorMarker, objectCreate(protoOf(Custom)));
  }
  function Catalog(id) {
    this.b21_1 = id;
  }
  protoOf(Catalog).toString = function () {
    return 'Catalog(id=' + GoogleFontId__toString_impl_cx2z1e(this.b21_1) + ')';
  };
  protoOf(Catalog).hashCode = function () {
    return GoogleFontId__hashCode_impl_yo8vu9(this.b21_1);
  };
  protoOf(Catalog).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Catalog))
      return false;
    if (!(this.b21_1 === other.b21_1))
      return false;
    return true;
  };
  function Custom(key) {
    this.i22_1 = key;
  }
  protoOf(Custom).toString = function () {
    return 'Custom(key=' + CustomFontKey__toString_impl_sw7wiq(this.i22_1) + ')';
  };
  protoOf(Custom).hashCode = function () {
    return CustomFontKey__hashCode_impl_751zpv(this.i22_1);
  };
  protoOf(Custom).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Custom))
      return false;
    if (!(this.i22_1 === other.i22_1))
      return false;
    return true;
  };
  function Companion_78() {
  }
  protoOf(Companion_78).s18 = function () {
    var tmp = getKClass(FontFamilyRef);
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [getKClass(Catalog), getKClass(Custom)];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_1 = [$serializer_getInstance_48(), $serializer_getInstance_49()];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$6 = [];
    return SealedClassSerializer_init_$Create$('io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef', tmp, tmp_0, tmp_1, tmp$ret$6);
  };
  var Companion_instance_79;
  function Companion_getInstance_77() {
    return Companion_instance_79;
  }
  function FontFamilyRef() {
  }
  function _GoogleFontId___init__impl__gzte8y(value) {
    // Inline function 'kotlin.text.isNotBlank' call
    var this_0 = _GoogleFontId___get_value__impl__s94bce(value);
    // Inline function 'kotlin.require' call
    if (!!isBlank(this_0)) {
      var message = 'GoogleFontId must not be blank.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return value;
  }
  function _GoogleFontId___get_value__impl__s94bce($this) {
    return $this;
  }
  function Companion_79() {
  }
  var Companion_instance_80;
  function Companion_getInstance_78() {
    return Companion_instance_80;
  }
  function $serializer_54() {
    $serializer_instance_50 = this;
    var tmp0_serialDesc = new InlineClassDescriptor('io.github.alph_a07.basis.theme.tokens.typography.GoogleFontId', this);
    tmp0_serialDesc.lp('value', false);
    this.i25_1 = tmp0_serialDesc;
  }
  protoOf($serializer_54).j25 = function (encoder, value) {
    var tmp0_inlineEncoder = encoder.dk(this.i25_1);
    if (tmp0_inlineEncoder == null)
      null;
    else {
      tmp0_inlineEncoder.bk(_GoogleFontId___get_value__impl__s94bce(value));
    }
  };
  protoOf($serializer_54).yf = function (encoder, value) {
    return this.j25(encoder, value instanceof GoogleFontId ? value.e25_1 : THROW_CCE());
  };
  protoOf($serializer_54).k25 = function (decoder) {
    return _GoogleFontId___init__impl__gzte8y(decoder.ui(this.i25_1).si());
  };
  protoOf($serializer_54).zf = function (decoder) {
    return new GoogleFontId(this.k25(decoder));
  };
  protoOf($serializer_54).xf = function () {
    return this.i25_1;
  };
  protoOf($serializer_54).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance()];
  };
  var $serializer_instance_50;
  function $serializer_getInstance_50() {
    if ($serializer_instance_50 == null)
      new $serializer_54();
    return $serializer_instance_50;
  }
  function GoogleFontId__toString_impl_cx2z1e($this) {
    return 'GoogleFontId(value=' + $this + ')';
  }
  function GoogleFontId__hashCode_impl_yo8vu9($this) {
    return getStringHashCode($this);
  }
  function GoogleFontId__equals_impl_jcf7cb($this, other) {
    if (!(other instanceof GoogleFontId))
      return false;
    if (!($this === other.e25_1))
      return false;
    return true;
  }
  function GoogleFontId(value) {
    this.e25_1 = value;
  }
  protoOf(GoogleFontId).toString = function () {
    return GoogleFontId__toString_impl_cx2z1e(this.e25_1);
  };
  protoOf(GoogleFontId).hashCode = function () {
    return GoogleFontId__hashCode_impl_yo8vu9(this.e25_1);
  };
  protoOf(GoogleFontId).equals = function (other) {
    return GoogleFontId__equals_impl_jcf7cb(this.e25_1, other);
  };
  function _CustomFontKey___init__impl__6b3gpm(value) {
    // Inline function 'kotlin.text.isNotBlank' call
    var this_0 = _CustomFontKey___get_value__impl__mpjcc2(value);
    // Inline function 'kotlin.require' call
    if (!!isBlank(this_0)) {
      var message = 'CustomFontKey must not be blank.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return value;
  }
  function _CustomFontKey___get_value__impl__mpjcc2($this) {
    return $this;
  }
  function Companion_80() {
  }
  var Companion_instance_81;
  function Companion_getInstance_79() {
    return Companion_instance_81;
  }
  function $serializer_55() {
    $serializer_instance_51 = this;
    var tmp0_serialDesc = new InlineClassDescriptor('io.github.alph_a07.basis.theme.tokens.typography.CustomFontKey', this);
    tmp0_serialDesc.lp('value', false);
    this.l25_1 = tmp0_serialDesc;
  }
  protoOf($serializer_55).m25 = function (encoder, value) {
    var tmp0_inlineEncoder = encoder.dk(this.l25_1);
    if (tmp0_inlineEncoder == null)
      null;
    else {
      tmp0_inlineEncoder.bk(_CustomFontKey___get_value__impl__mpjcc2(value));
    }
  };
  protoOf($serializer_55).yf = function (encoder, value) {
    return this.m25(encoder, value instanceof CustomFontKey ? value.h25_1 : THROW_CCE());
  };
  protoOf($serializer_55).n25 = function (decoder) {
    return _CustomFontKey___init__impl__6b3gpm(decoder.ui(this.l25_1).si());
  };
  protoOf($serializer_55).zf = function (decoder) {
    return new CustomFontKey(this.n25(decoder));
  };
  protoOf($serializer_55).xf = function () {
    return this.l25_1;
  };
  protoOf($serializer_55).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance()];
  };
  var $serializer_instance_51;
  function $serializer_getInstance_51() {
    if ($serializer_instance_51 == null)
      new $serializer_55();
    return $serializer_instance_51;
  }
  function CustomFontKey__toString_impl_sw7wiq($this) {
    return 'CustomFontKey(value=' + $this + ')';
  }
  function CustomFontKey__hashCode_impl_751zpv($this) {
    return getStringHashCode($this);
  }
  function CustomFontKey__equals_impl_rqo2zz($this, other) {
    if (!(other instanceof CustomFontKey))
      return false;
    if (!($this === other.h25_1))
      return false;
    return true;
  }
  function CustomFontKey(value) {
    this.h25_1 = value;
  }
  protoOf(CustomFontKey).toString = function () {
    return CustomFontKey__toString_impl_sw7wiq(this.h25_1);
  };
  protoOf(CustomFontKey).hashCode = function () {
    return CustomFontKey__hashCode_impl_751zpv(this.h25_1);
  };
  protoOf(CustomFontKey).equals = function (other) {
    return CustomFontKey__equals_impl_rqo2zz(this.h25_1, other);
  };
  function TypeColorRef$ContentDefault$_anonymous__2jin6z() {
    var tmp = ContentDefault_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$0 = [];
    return ObjectSerializer_init_$Create$('io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef.ContentDefault', tmp, tmp$ret$0);
  }
  function TypeColorRef$ContentMuted$_anonymous__i6w817() {
    var tmp = ContentMuted_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$0 = [];
    return ObjectSerializer_init_$Create$('io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef.ContentMuted', tmp, tmp$ret$0);
  }
  function TypeColorRef$ContentInverse$_anonymous__mxrh5y() {
    var tmp = ContentInverse_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$0 = [];
    return ObjectSerializer_init_$Create$('io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef.ContentInverse', tmp, tmp$ret$0);
  }
  function Companion_81() {
  }
  var Companion_instance_82;
  function Companion_getInstance_80() {
    return Companion_instance_82;
  }
  function $serializer_56() {
    $serializer_instance_52 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef.Explicit', this, 1);
    tmp0_serialDesc.lp('color', false);
    this.o25_1 = tmp0_serialDesc;
  }
  protoOf($serializer_56).p25 = function (encoder, value) {
    var tmp0_desc = this.o25_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    tmp1_output.ok(tmp0_desc, 0, $serializer_getInstance_8(), value.q25_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_56).yf = function (encoder, value) {
    return this.p25(encoder, value instanceof Explicit ? value : THROW_CCE());
  };
  protoOf($serializer_56).zf = function (decoder) {
    var tmp0_desc = this.o25_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_input = decoder.xi(tmp0_desc);
    if (tmp5_input.nj()) {
      tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, $serializer_getInstance_8(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp5_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp5_input.jj(tmp0_desc, 0, $serializer_getInstance_8(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp5_input.yi(tmp0_desc);
    return Explicit_init_$Create$(tmp3_bitMask0, tmp4_local0, null);
  };
  protoOf($serializer_56).xf = function () {
    return this.o25_1;
  };
  protoOf($serializer_56).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [$serializer_getInstance_8()];
  };
  var $serializer_instance_52;
  function $serializer_getInstance_52() {
    if ($serializer_instance_52 == null)
      new $serializer_56();
    return $serializer_instance_52;
  }
  function Explicit_init_$Init$(seen0, color, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_52().o25_1);
    }
    $this.q25_1 = color;
    return $this;
  }
  function Explicit_init_$Create$(seen0, color, serializationConstructorMarker) {
    return Explicit_init_$Init$(seen0, color, serializationConstructorMarker, objectCreate(protoOf(Explicit)));
  }
  function ContentDefault() {
    ContentDefault_instance = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.r25_1 = lazy(tmp_0, TypeColorRef$ContentDefault$_anonymous__2jin6z);
  }
  protoOf(ContentDefault).toString = function () {
    return 'ContentDefault';
  };
  protoOf(ContentDefault).hashCode = function () {
    return 2076011245;
  };
  protoOf(ContentDefault).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ContentDefault))
      return false;
    return true;
  };
  var ContentDefault_instance;
  function ContentDefault_getInstance() {
    if (ContentDefault_instance == null)
      new ContentDefault();
    return ContentDefault_instance;
  }
  function ContentMuted() {
    ContentMuted_instance = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.s25_1 = lazy(tmp_0, TypeColorRef$ContentMuted$_anonymous__i6w817);
  }
  protoOf(ContentMuted).toString = function () {
    return 'ContentMuted';
  };
  protoOf(ContentMuted).hashCode = function () {
    return -1303002857;
  };
  protoOf(ContentMuted).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ContentMuted))
      return false;
    return true;
  };
  var ContentMuted_instance;
  function ContentMuted_getInstance() {
    if (ContentMuted_instance == null)
      new ContentMuted();
    return ContentMuted_instance;
  }
  function ContentInverse() {
    ContentInverse_instance = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.t25_1 = lazy(tmp_0, TypeColorRef$ContentInverse$_anonymous__mxrh5y);
  }
  protoOf(ContentInverse).toString = function () {
    return 'ContentInverse';
  };
  protoOf(ContentInverse).hashCode = function () {
    return -1803849764;
  };
  protoOf(ContentInverse).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ContentInverse))
      return false;
    return true;
  };
  var ContentInverse_instance;
  function ContentInverse_getInstance() {
    if (ContentInverse_instance == null)
      new ContentInverse();
    return ContentInverse_instance;
  }
  function Explicit(color) {
    this.q25_1 = color;
  }
  protoOf(Explicit).toString = function () {
    return 'Explicit(color=' + this.q25_1.toString() + ')';
  };
  protoOf(Explicit).hashCode = function () {
    return this.q25_1.hashCode();
  };
  protoOf(Explicit).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Explicit))
      return false;
    if (!this.q25_1.equals(other.q25_1))
      return false;
    return true;
  };
  function Companion_82() {
  }
  protoOf(Companion_82).s18 = function () {
    var tmp = getKClass(TypeColorRef);
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [getKClass(ContentDefault), getKClass(ContentInverse), getKClass(ContentMuted), getKClass(Explicit)];
    var tmp_1 = ContentDefault_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$3 = [];
    var tmp_2 = ObjectSerializer_init_$Create$('io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef.ContentDefault', tmp_1, tmp$ret$3);
    var tmp_3 = ContentInverse_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$6 = [];
    var tmp_4 = ObjectSerializer_init_$Create$('io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef.ContentInverse', tmp_3, tmp$ret$6);
    var tmp_5 = ContentMuted_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$9 = [];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_6 = [tmp_2, tmp_4, ObjectSerializer_init_$Create$('io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef.ContentMuted', tmp_5, tmp$ret$9), $serializer_getInstance_52()];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$15 = [];
    return SealedClassSerializer_init_$Create$('io.github.alph_a07.basis.theme.tokens.typography.TypeColorRef', tmp, tmp_0, tmp_6, tmp$ret$15);
  };
  var Companion_instance_83;
  function Companion_getInstance_81() {
    return Companion_instance_83;
  }
  function TypeColorRef() {
  }
  function TypeRole$Companion$$childSerializers$_anonymous__imzzh6() {
    return Companion_instance_79.s18();
  }
  function TypeRole$Companion$$childSerializers$_anonymous__imzzh6_0() {
    return Companion_instance_83.s18();
  }
  function Companion_83() {
    Companion_instance_84 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, TypeRole$Companion$$childSerializers$_anonymous__imzzh6);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.u25_1 = [tmp_1, null, null, null, null, lazy(tmp_2, TypeRole$Companion$$childSerializers$_anonymous__imzzh6_0)];
  }
  var Companion_instance_84;
  function Companion_getInstance_82() {
    if (Companion_instance_84 == null)
      new Companion_83();
    return Companion_instance_84;
  }
  function $serializer_57() {
    $serializer_instance_53 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.theme.tokens.typography.TypeRole', this, 6);
    tmp0_serialDesc.lp('family', false);
    tmp0_serialDesc.lp('size', false);
    tmp0_serialDesc.lp('weight', false);
    tmp0_serialDesc.lp('lineHeight', false);
    tmp0_serialDesc.lp('letterSpacing', false);
    tmp0_serialDesc.lp('color', false);
    this.v25_1 = tmp0_serialDesc;
  }
  protoOf($serializer_57).w25 = function (encoder, value) {
    var tmp0_desc = this.v25_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_82().u25_1;
    tmp1_output.ok(tmp0_desc, 0, tmp2_cached[0].q1(), value.l1y_1);
    tmp1_output.ok(tmp0_desc, 1, $serializer_getInstance_4(), new SpValue(value.m1y_1));
    tmp1_output.ok(tmp0_desc, 2, $serializer_getInstance_2(), new FontWeightValue(value.n1y_1));
    tmp1_output.ok(tmp0_desc, 3, $serializer_getInstance_3(), new LineHeightValue(value.o1y_1));
    tmp1_output.ok(tmp0_desc, 4, $serializer_getInstance_1(), new EmValue(value.p1y_1));
    tmp1_output.ok(tmp0_desc, 5, tmp2_cached[5].q1(), value.q1y_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_57).yf = function (encoder, value) {
    return this.w25(encoder, value instanceof TypeRole ? value : THROW_CCE());
  };
  protoOf($serializer_57).zf = function (decoder) {
    var tmp0_desc = this.v25_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = null;
    var tmp9_local5 = null;
    var tmp10_input = decoder.xi(tmp0_desc);
    var tmp11_cached = Companion_getInstance_82().u25_1;
    if (tmp10_input.nj()) {
      tmp4_local0 = tmp10_input.jj(tmp0_desc, 0, tmp11_cached[0].q1(), tmp4_local0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      var tmp = $serializer_getInstance_4();
      var tmp_0 = tmp5_local1;
      var tmp_1 = tmp10_input.jj(tmp0_desc, 1, tmp, tmp_0 == null ? null : new SpValue(tmp_0));
      tmp5_local1 = tmp_1 == null ? null : tmp_1.m1e_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      var tmp_2 = $serializer_getInstance_2();
      var tmp_3 = tmp6_local2;
      var tmp_4 = tmp10_input.jj(tmp0_desc, 2, tmp_2, tmp_3 == null ? null : new FontWeightValue(tmp_3));
      tmp6_local2 = tmp_4 == null ? null : tmp_4.e1e_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      var tmp_5 = $serializer_getInstance_3();
      var tmp_6 = tmp7_local3;
      var tmp_7 = tmp10_input.jj(tmp0_desc, 3, tmp_5, tmp_6 == null ? null : new LineHeightValue(tmp_6));
      tmp7_local3 = tmp_7 == null ? null : tmp_7.i1e_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      var tmp_8 = $serializer_getInstance_1();
      var tmp_9 = tmp8_local4;
      var tmp_10 = tmp10_input.jj(tmp0_desc, 4, tmp_8, tmp_9 == null ? null : new EmValue(tmp_9));
      tmp8_local4 = tmp_10 == null ? null : tmp_10.x1d_1;
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp10_input.jj(tmp0_desc, 5, tmp11_cached[5].q1(), tmp9_local5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp10_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp10_input.jj(tmp0_desc, 0, tmp11_cached[0].q1(), tmp4_local0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            var tmp_11 = $serializer_getInstance_4();
            var tmp_12 = tmp5_local1;
            var tmp_13 = tmp10_input.jj(tmp0_desc, 1, tmp_11, tmp_12 == null ? null : new SpValue(tmp_12));
            tmp5_local1 = tmp_13 == null ? null : tmp_13.m1e_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            var tmp_14 = $serializer_getInstance_2();
            var tmp_15 = tmp6_local2;
            var tmp_16 = tmp10_input.jj(tmp0_desc, 2, tmp_14, tmp_15 == null ? null : new FontWeightValue(tmp_15));
            tmp6_local2 = tmp_16 == null ? null : tmp_16.e1e_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            var tmp_17 = $serializer_getInstance_3();
            var tmp_18 = tmp7_local3;
            var tmp_19 = tmp10_input.jj(tmp0_desc, 3, tmp_17, tmp_18 == null ? null : new LineHeightValue(tmp_18));
            tmp7_local3 = tmp_19 == null ? null : tmp_19.i1e_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            var tmp_20 = $serializer_getInstance_1();
            var tmp_21 = tmp8_local4;
            var tmp_22 = tmp10_input.jj(tmp0_desc, 4, tmp_20, tmp_21 == null ? null : new EmValue(tmp_21));
            tmp8_local4 = tmp_22 == null ? null : tmp_22.x1d_1;
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp10_input.jj(tmp0_desc, 5, tmp11_cached[5].q1(), tmp9_local5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp10_input.yi(tmp0_desc);
    return TypeRole_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, null);
  };
  protoOf($serializer_57).xf = function () {
    return this.v25_1;
  };
  protoOf($serializer_57).aq = function () {
    var tmp0_cached = Companion_getInstance_82().u25_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [tmp0_cached[0].q1(), $serializer_getInstance_4(), $serializer_getInstance_2(), $serializer_getInstance_3(), $serializer_getInstance_1(), tmp0_cached[5].q1()];
  };
  var $serializer_instance_53;
  function $serializer_getInstance_53() {
    if ($serializer_instance_53 == null)
      new $serializer_57();
    return $serializer_instance_53;
  }
  function TypeRole_init_$Init$(seen0, family, size, weight, lineHeight, letterSpacing, color, serializationConstructorMarker, $this) {
    if (!(63 === (63 & seen0))) {
      throwMissingFieldException(seen0, 63, $serializer_getInstance_53().v25_1);
    }
    $this.l1y_1 = family;
    $this.m1y_1 = size;
    $this.n1y_1 = weight;
    $this.o1y_1 = lineHeight;
    $this.p1y_1 = letterSpacing;
    $this.q1y_1 = color;
    return $this;
  }
  function TypeRole_init_$Create$(seen0, family, size, weight, lineHeight, letterSpacing, color, serializationConstructorMarker) {
    return TypeRole_init_$Init$(seen0, family, size, weight, lineHeight, letterSpacing, color, serializationConstructorMarker, objectCreate(protoOf(TypeRole)));
  }
  function TypeRole(family, size, weight, lineHeight, letterSpacing, color) {
    Companion_getInstance_82();
    this.l1y_1 = family;
    this.m1y_1 = size;
    this.n1y_1 = weight;
    this.o1y_1 = lineHeight;
    this.p1y_1 = letterSpacing;
    this.q1y_1 = color;
  }
  protoOf(TypeRole).r1y = function (family, size, weight, lineHeight, letterSpacing, color) {
    return new TypeRole(family, size, weight, lineHeight, letterSpacing, color);
  };
  protoOf(TypeRole).n20 = function (family, size, weight, lineHeight, letterSpacing, color, $super) {
    family = family === VOID ? this.l1y_1 : family;
    size = size === VOID ? this.m1y_1 : size;
    weight = weight === VOID ? this.n1y_1 : weight;
    lineHeight = lineHeight === VOID ? this.o1y_1 : lineHeight;
    letterSpacing = letterSpacing === VOID ? this.p1y_1 : letterSpacing;
    color = color === VOID ? this.q1y_1 : color;
    return $super === VOID ? this.r1y(family, size, weight, lineHeight, letterSpacing, color) : $super.r1y.call(this, family, new SpValue(size), new FontWeightValue(weight), new LineHeightValue(lineHeight), new EmValue(letterSpacing), color);
  };
  protoOf(TypeRole).toString = function () {
    return 'TypeRole(family=' + toString(this.l1y_1) + ', size=' + SpValue__toString_impl_i7ztzh(this.m1y_1) + ', weight=' + FontWeightValue__toString_impl_1xdtxz(this.n1y_1) + ', lineHeight=' + LineHeightValue__toString_impl_ruhy8l(this.o1y_1) + ', letterSpacing=' + EmValue__toString_impl_hlltwo(this.p1y_1) + ', color=' + toString(this.q1y_1) + ')';
  };
  protoOf(TypeRole).hashCode = function () {
    var result = hashCode(this.l1y_1);
    result = imul(result, 31) + SpValue__hashCode_impl_3j62te(this.m1y_1) | 0;
    result = imul(result, 31) + FontWeightValue__hashCode_impl_jts2uw(this.n1y_1) | 0;
    result = imul(result, 31) + LineHeightValue__hashCode_impl_lfg6xo(this.o1y_1) | 0;
    result = imul(result, 31) + EmValue__hashCode_impl_vocb9l(this.p1y_1) | 0;
    result = imul(result, 31) + hashCode(this.q1y_1) | 0;
    return result;
  };
  protoOf(TypeRole).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TypeRole))
      return false;
    if (!equals(this.l1y_1, other.l1y_1))
      return false;
    if (!equals(this.m1y_1, other.m1y_1))
      return false;
    if (!(this.n1y_1 === other.n1y_1))
      return false;
    if (!equals(this.o1y_1, other.o1y_1))
      return false;
    if (!equals(this.p1y_1, other.p1y_1))
      return false;
    if (!equals(this.q1y_1, other.q1y_1))
      return false;
    return true;
  };
  function TypographyTokens(structure, content, metadata) {
    this.c1d_1 = structure;
    this.d1d_1 = content;
    this.e1d_1 = metadata;
  }
  protoOf(TypographyTokens).w1w = function (structure, content, metadata) {
    return new TypographyTokens(structure, content, metadata);
  };
  protoOf(TypographyTokens).toString = function () {
    return 'TypographyTokens(structure=' + this.c1d_1.toString() + ', content=' + this.d1d_1.toString() + ', metadata=' + this.e1d_1.toString() + ')';
  };
  protoOf(TypographyTokens).hashCode = function () {
    var result = this.c1d_1.hashCode();
    result = imul(result, 31) + this.d1d_1.hashCode() | 0;
    result = imul(result, 31) + this.e1d_1.hashCode() | 0;
    return result;
  };
  protoOf(TypographyTokens).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TypographyTokens))
      return false;
    if (!this.c1d_1.equals(other.c1d_1))
      return false;
    if (!this.d1d_1.equals(other.d1d_1))
      return false;
    if (!this.e1d_1.equals(other.e1d_1))
      return false;
    return true;
  };
  function StructureType(level1, level2, level3, level4, level5, level6) {
    this.w1c_1 = level1;
    this.x1c_1 = level2;
    this.y1c_1 = level3;
    this.z1c_1 = level4;
    this.a1d_1 = level5;
    this.b1d_1 = level6;
  }
  protoOf(StructureType).x1w = function (level1, level2, level3, level4, level5, level6) {
    return new StructureType(level1, level2, level3, level4, level5, level6);
  };
  protoOf(StructureType).toString = function () {
    return 'StructureType(level1=' + this.w1c_1.toString() + ', level2=' + this.x1c_1.toString() + ', level3=' + this.y1c_1.toString() + ', level4=' + this.z1c_1.toString() + ', level5=' + this.a1d_1.toString() + ', level6=' + this.b1d_1.toString() + ')';
  };
  protoOf(StructureType).hashCode = function () {
    var result = this.w1c_1.hashCode();
    result = imul(result, 31) + this.x1c_1.hashCode() | 0;
    result = imul(result, 31) + this.y1c_1.hashCode() | 0;
    result = imul(result, 31) + this.z1c_1.hashCode() | 0;
    result = imul(result, 31) + this.a1d_1.hashCode() | 0;
    result = imul(result, 31) + this.b1d_1.hashCode() | 0;
    return result;
  };
  protoOf(StructureType).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof StructureType))
      return false;
    if (!this.w1c_1.equals(other.w1c_1))
      return false;
    if (!this.x1c_1.equals(other.x1c_1))
      return false;
    if (!this.y1c_1.equals(other.y1c_1))
      return false;
    if (!this.z1c_1.equals(other.z1c_1))
      return false;
    if (!this.a1d_1.equals(other.a1d_1))
      return false;
    if (!this.b1d_1.equals(other.b1d_1))
      return false;
    return true;
  };
  function ContentType(level1, level2, level3, level4, level5) {
    this.f1d_1 = level1;
    this.g1d_1 = level2;
    this.h1d_1 = level3;
    this.i1d_1 = level4;
    this.j1d_1 = level5;
  }
  protoOf(ContentType).y1w = function (level1, level2, level3, level4, level5) {
    return new ContentType(level1, level2, level3, level4, level5);
  };
  protoOf(ContentType).toString = function () {
    return 'ContentType(level1=' + this.f1d_1.toString() + ', level2=' + this.g1d_1.toString() + ', level3=' + this.h1d_1.toString() + ', level4=' + this.i1d_1.toString() + ', level5=' + this.j1d_1.toString() + ')';
  };
  protoOf(ContentType).hashCode = function () {
    var result = this.f1d_1.hashCode();
    result = imul(result, 31) + this.g1d_1.hashCode() | 0;
    result = imul(result, 31) + this.h1d_1.hashCode() | 0;
    result = imul(result, 31) + this.i1d_1.hashCode() | 0;
    result = imul(result, 31) + this.j1d_1.hashCode() | 0;
    return result;
  };
  protoOf(ContentType).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ContentType))
      return false;
    if (!this.f1d_1.equals(other.f1d_1))
      return false;
    if (!this.g1d_1.equals(other.g1d_1))
      return false;
    if (!this.h1d_1.equals(other.h1d_1))
      return false;
    if (!this.i1d_1.equals(other.i1d_1))
      return false;
    if (!this.j1d_1.equals(other.j1d_1))
      return false;
    return true;
  };
  function MetadataType(level1, level2, level3) {
    this.k1d_1 = level1;
    this.l1d_1 = level2;
    this.m1d_1 = level3;
  }
  protoOf(MetadataType).z1w = function (level1, level2, level3) {
    return new MetadataType(level1, level2, level3);
  };
  protoOf(MetadataType).toString = function () {
    return 'MetadataType(level1=' + this.k1d_1.toString() + ', level2=' + this.l1d_1.toString() + ', level3=' + this.m1d_1.toString() + ')';
  };
  protoOf(MetadataType).hashCode = function () {
    var result = this.k1d_1.hashCode();
    result = imul(result, 31) + this.l1d_1.hashCode() | 0;
    result = imul(result, 31) + this.m1d_1.hashCode() | 0;
    return result;
  };
  protoOf(MetadataType).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MetadataType))
      return false;
    if (!this.k1d_1.equals(other.k1d_1))
      return false;
    if (!this.l1d_1.equals(other.l1d_1))
      return false;
    if (!this.m1d_1.equals(other.m1d_1))
      return false;
    return true;
  };
  function coerceToFloat32(_this__u8e3s4) {
    var f = _this__u8e3s4;
    // Inline function 'kotlin.js.unsafeCast' call
    return Math.fround(f);
  }
  function toFloat32(_this__u8e3s4) {
    var d = _this__u8e3s4;
    // Inline function 'kotlin.js.unsafeCast' call
    return Math.fround(d);
  }
  function loadFontCatalogEntries() {
    var tmp0_elvis_lhs = readGzippedCatalogAsset();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return emptyList();
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var uncompressedBytes = tmp;
    return FontCatalogDecoder_instance.y22(uncompressedBytes);
  }
  function readGzippedCatalogAsset() {
    var tmp;
    try {
      var fs = require('fs');
      var zlib = require('zlib');
      var path = require('path');
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var candidates = [path.resolve(__dirname, 'basis/fonts/google-fonts-catalog.bin.gz'), path.resolve(__dirname, '../basis/fonts/google-fonts-catalog.bin.gz'), path.resolve(process.cwd(), 'build/js/packages/Basis-basis-theme-test/kotlin/basis/fonts/google-fonts-catalog.bin.gz'), path.resolve(process.cwd(), 'basis-theme/src/commonMain/resources/basis/fonts/google-fonts-catalog.bin.gz'), path.resolve(process.cwd(), 'basis-theme/build/processedResources/js/main/basis/fonts/google-fonts-catalog.bin.gz')];
      var foundPath = null;
      var inductionVariable = 0;
      var last = candidates.length;
      $l$loop: while (inductionVariable < last) {
        var candidate = candidates[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        var s = (!(candidate == null) ? typeof candidate === 'string' : false) ? candidate : THROW_CCE();
        var tmp_0 = fs.existsSync(s);
        if ((!(tmp_0 == null) ? typeof tmp_0 === 'boolean' : false) ? tmp_0 : THROW_CCE()) {
          foundPath = s;
          break $l$loop;
        }
      }
      var tmp_1;
      if (!(foundPath == null)) {
        var compressed = fs.readFileSync(foundPath);
        var decompressed = zlib.gunzipSync(compressed);
        var tmp_2 = decompressed.length;
        var len = (!(tmp_2 == null) ? typeof tmp_2 === 'number' : false) ? tmp_2 : THROW_CCE();
        var tmp_3 = 0;
        var tmp_4 = new Int8Array(len);
        while (tmp_3 < len) {
          var tmp_5 = tmp_3;
          var tmp_6 = decompressed[tmp_5];
          tmp_4[tmp_5] = numberToByte(isNumber(tmp_6) ? tmp_6 : THROW_CCE());
          tmp_3 = tmp_3 + 1 | 0;
        }
        tmp_1 = tmp_4;
      } else {
        tmp_1 = null;
      }
      tmp = tmp_1;
    } catch ($p) {
      var tmp_7;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_7 = null;
      } else {
        throw $p;
      }
      tmp = tmp_7;
    }
    return tmp;
  }
  //region block: post-declaration
  protoOf($serializer).bq = typeParametersSerializers;
  protoOf($serializer_0).bq = typeParametersSerializers;
  protoOf($serializer_1).bq = typeParametersSerializers;
  protoOf($serializer_2).bq = typeParametersSerializers;
  protoOf($serializer_3).bq = typeParametersSerializers;
  protoOf($serializer_4).bq = typeParametersSerializers;
  protoOf($serializer_5).bq = typeParametersSerializers;
  protoOf($serializer_6).bq = typeParametersSerializers;
  protoOf($serializer_7).bq = typeParametersSerializers;
  protoOf($serializer_8).bq = typeParametersSerializers;
  protoOf($serializer_9).bq = typeParametersSerializers;
  protoOf($serializer_10).bq = typeParametersSerializers;
  protoOf($serializer_11).bq = typeParametersSerializers;
  protoOf($serializer_12).bq = typeParametersSerializers;
  protoOf($serializer_13).bq = typeParametersSerializers;
  protoOf($serializer_14).bq = typeParametersSerializers;
  protoOf($serializer_15).bq = typeParametersSerializers;
  protoOf($serializer_16).bq = typeParametersSerializers;
  protoOf($serializer_17).bq = typeParametersSerializers;
  protoOf($serializer_18).bq = typeParametersSerializers;
  protoOf($serializer_19).bq = typeParametersSerializers;
  protoOf($serializer_20).bq = typeParametersSerializers;
  protoOf($serializer_21).bq = typeParametersSerializers;
  protoOf($serializer_22).bq = typeParametersSerializers;
  protoOf($serializer_23).bq = typeParametersSerializers;
  protoOf($serializer_24).bq = typeParametersSerializers;
  protoOf($serializer_25).bq = typeParametersSerializers;
  protoOf($serializer_26).bq = typeParametersSerializers;
  protoOf($serializer_27).bq = typeParametersSerializers;
  protoOf($serializer_28).bq = typeParametersSerializers;
  protoOf($serializer_29).bq = typeParametersSerializers;
  protoOf($serializer_30).bq = typeParametersSerializers;
  protoOf($serializer_31).bq = typeParametersSerializers;
  protoOf($serializer_32).bq = typeParametersSerializers;
  protoOf($serializer_33).bq = typeParametersSerializers;
  protoOf($serializer_34).bq = typeParametersSerializers;
  protoOf($serializer_35).bq = typeParametersSerializers;
  protoOf($serializer_40).bq = typeParametersSerializers;
  protoOf($serializer_41).bq = typeParametersSerializers;
  protoOf($serializer_42).bq = typeParametersSerializers;
  protoOf($serializer_43).bq = typeParametersSerializers;
  protoOf($serializer_44).bq = typeParametersSerializers;
  protoOf($serializer_45).bq = typeParametersSerializers;
  protoOf($serializer_46).bq = typeParametersSerializers;
  protoOf($serializer_47).bq = typeParametersSerializers;
  protoOf($serializer_48).bq = typeParametersSerializers;
  protoOf($serializer_49).bq = typeParametersSerializers;
  protoOf($serializer_50).bq = typeParametersSerializers;
  protoOf($serializer_51).bq = typeParametersSerializers;
  protoOf($serializer_52).bq = typeParametersSerializers;
  protoOf($serializer_53).bq = typeParametersSerializers;
  protoOf($serializer_54).bq = typeParametersSerializers;
  protoOf($serializer_55).bq = typeParametersSerializers;
  protoOf($serializer_56).bq = typeParametersSerializers;
  protoOf($serializer_57).bq = typeParametersSerializers;
  //endregion
  //region block: init
  Companion_instance_8 = new Companion_7();
  Companion_instance_9 = new Companion_8();
  Companion_instance_10 = new Companion_9();
  Companion_instance_11 = new Companion_10();
  Companion_instance_12 = new Companion_11();
  Companion_instance_13 = new Companion_12();
  Companion_instance_15 = new Companion_14();
  Companion_instance_16 = new Companion_15();
  Companion_instance_17 = new Companion_16();
  Companion_instance_18 = new Companion_17();
  Companion_instance_19 = new Companion_18();
  Companion_instance_22 = new Companion_21();
  Companion_instance_23 = new Companion_22();
  Companion_instance_24 = new Companion_23();
  Companion_instance_33 = new Companion_32();
  Companion_instance_34 = new Companion_33();
  Companion_instance_35 = new Companion_34();
  Companion_instance_36 = new Companion_35();
  Companion_instance_37 = new Companion_36();
  Companion_instance_39 = new Companion_38();
  Companion_instance_47 = new Companion_46();
  Companion_instance_57 = new Companion_56();
  Companion_instance_58 = new Companion_57();
  Companion_instance_59 = new Companion_58();
  Companion_instance_60 = new Companion_59();
  Companion_instance_61 = new Companion_60();
  Companion_instance_68 = new Companion_67();
  BaseStage_instance = new BaseStage();
  BaseTables_instance = new BaseTables();
  ControlStage_instance = new ControlStage();
  DeriveStage_instance = new DeriveStage();
  DomainStage_instance = new DomainStage();
  EnforceStage_instance = new EnforceStage();
  CandidateAssigner_instance = new CandidateAssigner();
  FontCatalogDecoder_instance = new FontCatalogDecoder();
  FontCatalogDerivation_instance = new FontCatalogDerivation();
  FontStage_instance = new FontStage();
  IdentityStage_instance = new IdentityStage();
  MoodStage_instance = new MoodStage();
  NormalizeStage_instance = new NormalizeStage();
  Companion_instance_75 = new Companion_74();
  Companion_instance_76 = new Companion_75();
  Companion_instance_77 = new Companion_76();
  Companion_instance_78 = new Companion_77();
  Companion_instance_79 = new Companion_78();
  Companion_instance_80 = new Companion_79();
  Companion_instance_81 = new Companion_80();
  Companion_instance_82 = new Companion_81();
  Companion_instance_83 = new Companion_82();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = _DpValue___get_value__impl__1j6qu0;
  _.$_$.b = _DurationValue___get_milliseconds__impl__sn32kr;
  _.$_$.c = _EmValue___get_em__impl__1q8ktd;
  _.$_$.d = _FontWeightValue___get_weight__impl__w0h7ri;
  _.$_$.e = _LineHeightValue___get_multiplier__impl__uy9oqd;
  _.$_$.f = _SpValue___get_value__impl__65u6pl;
  _.$_$.g = _CustomFontKey___get_value__impl__mpjcc2;
  _.$_$.h = _GoogleFontId___get_value__impl__s94bce;
  _.$_$.i = ThemeInterchange_getInstance;
  _.$_$.j = $serializer_getInstance_43;
  _.$_$.k = $serializer_getInstance_46;
  _.$_$.l = formatDeterministic;
  _.$_$.m = BasisIntent;
  _.$_$.n = ThemeViolation;
  _.$_$.o = resolve;
  _.$_$.p = get_entries;
  _.$_$.q = get_entries_0;
  _.$_$.r = get_entries_1;
  _.$_$.s = get_entries_2;
  _.$_$.t = get_entries_3;
  _.$_$.u = get_entries_4;
  _.$_$.v = get_entries_5;
  _.$_$.w = get_entries_6;
  _.$_$.x = resolveIn;
  _.$_$.y = resolveIn_1;
  _.$_$.z = resolveIn_4;
  _.$_$.a1 = resolveIn_2;
  _.$_$.b1 = resolveIn_6;
  _.$_$.c1 = resolveIn_3;
  _.$_$.d1 = resolveIn_0;
  _.$_$.e1 = resolveIn_5;
  _.$_$.f1 = Catalog;
  _.$_$.g1 = Custom;
  //endregion
  return _;
}));

//# sourceMappingURL=Basis-basis-theme.js.map
