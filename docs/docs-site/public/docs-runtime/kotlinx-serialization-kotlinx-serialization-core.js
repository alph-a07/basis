(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-core'.");
    }
    globalThis['kotlinx-serialization-kotlinx-serialization-core'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.c8;
  var initMetadataForInterface = kotlin_kotlin.$_$.j7;
  var VOID = kotlin_kotlin.$_$.a;
  var getKClassFromExpression = kotlin_kotlin.$_$.u8;
  var asList = kotlin_kotlin.$_$.o3;
  var objectCreate = kotlin_kotlin.$_$.b8;
  var Unit_instance = kotlin_kotlin.$_$.i2;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.x1;
  var constructCallableReference = kotlin_kotlin.$_$.y6;
  var initMetadataForClass = kotlin_kotlin.$_$.g7;
  var emptyList = kotlin_kotlin.$_$.i4;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.q1;
  var lazy = kotlin_kotlin.$_$.ib;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.b3;
  var zip = kotlin_kotlin.$_$.s5;
  var toMap = kotlin_kotlin.$_$.n5;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.r2;
  var toString = kotlin_kotlin.$_$.f8;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.d3;
  var mapCapacity = kotlin_kotlin.$_$.z4;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.q2;
  var KProperty1 = kotlin_kotlin.$_$.x8;
  var getPropertyCallableRef = kotlin_kotlin.$_$.d7;
  var THROW_CCE = kotlin_kotlin.$_$.qa;
  var KtMap = kotlin_kotlin.$_$.k3;
  var isInterface = kotlin_kotlin.$_$.t7;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.z2;
  var captureStack = kotlin_kotlin.$_$.r6;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.a3;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.c3;
  var IllegalArgumentException = kotlin_kotlin.$_$.na;
  var isBlank = kotlin_kotlin.$_$.i9;
  var equals = kotlin_kotlin.$_$.z6;
  var toList = kotlin_kotlin.$_$.m5;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.k2;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.p2;
  var toHashSet = kotlin_kotlin.$_$.k5;
  var copyToArray = kotlin_kotlin.$_$.g4;
  var toBooleanArray = kotlin_kotlin.$_$.j5;
  var withIndex = kotlin_kotlin.$_$.q5;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.r3;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.j2;
  var to = kotlin_kotlin.$_$.nb;
  var lazy_0 = kotlin_kotlin.$_$.jb;
  var contentEquals = kotlin_kotlin.$_$.s3;
  var until = kotlin_kotlin.$_$.t8;
  var joinToString = kotlin_kotlin.$_$.s4;
  var initMetadataForObject = kotlin_kotlin.$_$.l7;
  var ensureNotNull = kotlin_kotlin.$_$.db;
  var getStringHashCode = kotlin_kotlin.$_$.e7;
  var Long = kotlin_kotlin.$_$.pa;
  var Char = kotlin_kotlin.$_$.ia;
  var Duration__toIsoString_impl_9h6wsm = kotlin_kotlin.$_$.b;
  var Duration = kotlin_kotlin.$_$.ga;
  var Companion_getInstance = kotlin_kotlin.$_$.z1;
  var Uuid = kotlin_kotlin.$_$.ha;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.a2;
  var toIntOrNull = kotlin_kotlin.$_$.x9;
  var hashCode = kotlin_kotlin.$_$.f7;
  var ArrayList = kotlin_kotlin.$_$.f3;
  var ArrayList_init_$Create$_1 = kotlin_kotlin.$_$.l2;
  var KtList = kotlin_kotlin.$_$.j3;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.u2;
  var LinkedHashSet = kotlin_kotlin.$_$.i3;
  var LinkedHashSet_init_$Create$_0 = kotlin_kotlin.$_$.v2;
  var KtSet = kotlin_kotlin.$_$.m3;
  var LinkedHashMap = kotlin_kotlin.$_$.h3;
  var LinkedHashMap_init_$Create$_1 = kotlin_kotlin.$_$.s2;
  var Collection = kotlin_kotlin.$_$.g3;
  var step = kotlin_kotlin.$_$.s8;
  var KtMutableMap = kotlin_kotlin.$_$.l3;
  var getValue = kotlin_kotlin.$_$.o4;
  var longArray = kotlin_kotlin.$_$.w7;
  var initMetadataForCompanion = kotlin_kotlin.$_$.h7;
  var get_lastIndex = kotlin_kotlin.$_$.t4;
  var shiftLeft = kotlin_kotlin.$_$.m6;
  var bitwiseOr = kotlin_kotlin.$_$.y5;
  var equalsLong = kotlin_kotlin.$_$.e6;
  var invert = kotlin_kotlin.$_$.g6;
  var countTrailingZeroBits = kotlin_kotlin.$_$.cb;
  var indexOf = kotlin_kotlin.$_$.p4;
  var contentToString = kotlin_kotlin.$_$.w3;
  var Enum = kotlin_kotlin.$_$.ma;
  var HashSet_init_$Create$_0 = kotlin_kotlin.$_$.o2;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.n2;
  var booleanArray = kotlin_kotlin.$_$.q6;
  var emptyMap = kotlin_kotlin.$_$.j4;
  var contentHashCode = kotlin_kotlin.$_$.u3;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.b2;
  var isCharArray = kotlin_kotlin.$_$.o7;
  var charArray = kotlin_kotlin.$_$.t6;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.t1;
  var isDoubleArray = kotlin_kotlin.$_$.q7;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.u1;
  var isFloatArray = kotlin_kotlin.$_$.r7;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.d2;
  var isLongArray = kotlin_kotlin.$_$.h6;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.g2;
  var _ULongArray___get_size__impl__ju6dtr = kotlin_kotlin.$_$.f1;
  var ULongArray = kotlin_kotlin.$_$.xa;
  var _ULongArray___init__impl__twm1l3 = kotlin_kotlin.$_$.b1;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.y;
  var ULongArray__get_impl_pr71q9 = kotlin_kotlin.$_$.d1;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.z;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.v1;
  var isIntArray = kotlin_kotlin.$_$.s7;
  var Companion_getInstance_4 = kotlin_kotlin.$_$.f2;
  var _UIntArray___get_size__impl__r6l8ci = kotlin_kotlin.$_$.w;
  var UIntArray = kotlin_kotlin.$_$.va;
  var _UIntArray___init__impl__ghjpc6 = kotlin_kotlin.$_$.s;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.p;
  var UIntArray__get_impl_gp5kza = kotlin_kotlin.$_$.u;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.q;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.w1;
  var isShortArray = kotlin_kotlin.$_$.v7;
  var Companion_getInstance_5 = kotlin_kotlin.$_$.h2;
  var _UShortArray___get_size__impl__jqto1b = kotlin_kotlin.$_$.o1;
  var UShortArray = kotlin_kotlin.$_$.za;
  var _UShortArray___init__impl__9b26ef = kotlin_kotlin.$_$.k1;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.h1;
  var UShortArray__get_impl_fnbhmx = kotlin_kotlin.$_$.m1;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.i1;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.s1;
  var isByteArray = kotlin_kotlin.$_$.n7;
  var Companion_getInstance_6 = kotlin_kotlin.$_$.e2;
  var _UByteArray___get_size__impl__h6pkdv = kotlin_kotlin.$_$.n;
  var UByteArray = kotlin_kotlin.$_$.ta;
  var _UByteArray___init__impl__ip4y9n = kotlin_kotlin.$_$.k;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.g;
  var UByteArray__get_impl_t5f3hv = kotlin_kotlin.$_$.l;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.h;
  var BooleanCompanionObject_instance = kotlin_kotlin.$_$.r1;
  var isBooleanArray = kotlin_kotlin.$_$.m7;
  var coerceAtLeast = kotlin_kotlin.$_$.k8;
  var copyOf = kotlin_kotlin.$_$.a4;
  var copyOf_0 = kotlin_kotlin.$_$.c4;
  var copyOf_1 = kotlin_kotlin.$_$.d4;
  var copyOf_2 = kotlin_kotlin.$_$.y3;
  var _ULongArray___get_storage__impl__28e64j = kotlin_kotlin.$_$.g1;
  var _ULongArray___init__impl__twm1l3_0 = kotlin_kotlin.$_$.c1;
  var ULongArray__set_impl_z19mvh = kotlin_kotlin.$_$.e1;
  var copyOf_3 = kotlin_kotlin.$_$.f4;
  var _UIntArray___get_storage__impl__92a0v0 = kotlin_kotlin.$_$.x;
  var _UIntArray___init__impl__ghjpc6_0 = kotlin_kotlin.$_$.t;
  var UIntArray__set_impl_7f2zu2 = kotlin_kotlin.$_$.v;
  var copyOf_4 = kotlin_kotlin.$_$.x3;
  var _UShortArray___get_storage__impl__t2jpv5 = kotlin_kotlin.$_$.p1;
  var _UShortArray___init__impl__9b26ef_0 = kotlin_kotlin.$_$.l1;
  var UShortArray__set_impl_6d8whp = kotlin_kotlin.$_$.n1;
  var copyOf_5 = kotlin_kotlin.$_$.b4;
  var _UByteArray___get_storage__impl__d4kctt = kotlin_kotlin.$_$.o;
  var _UByteArray___init__impl__ip4y9n_0 = kotlin_kotlin.$_$.j;
  var UByteArray__set_impl_jvcicn = kotlin_kotlin.$_$.m;
  var copyOf_6 = kotlin_kotlin.$_$.z3;
  var Unit = kotlin_kotlin.$_$.bb;
  var trimIndent = kotlin_kotlin.$_$.ea;
  var charSequenceLength = kotlin_kotlin.$_$.w6;
  var lastOrNull = kotlin_kotlin.$_$.v4;
  var get_lastIndex_0 = kotlin_kotlin.$_$.u4;
  var UInt = kotlin_kotlin.$_$.wa;
  var ULong = kotlin_kotlin.$_$.ya;
  var UByte = kotlin_kotlin.$_$.ua;
  var UShort = kotlin_kotlin.$_$.ab;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kb;
  var KClass = kotlin_kotlin.$_$.w8;
  var get_indices = kotlin_kotlin.$_$.r4;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.e3;
  var get_indices_0 = kotlin_kotlin.$_$.q4;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.y1;
  var getKClass = kotlin_kotlin.$_$.v8;
  var mapOf = kotlin_kotlin.$_$.a5;
  //endregion
  //region block: pre-declaration
  initMetadataForInterface(SerializationStrategy, 'SerializationStrategy');
  initMetadataForInterface(DeserializationStrategy, 'DeserializationStrategy');
  initMetadataForInterface(KSerializer, 'KSerializer', VOID, VOID, [SerializationStrategy, DeserializationStrategy]);
  initMetadataForClass(SealedClassSerializer$$inlined$groupingBy$1);
  initMetadataForClass(AbstractPolymorphicSerializer, 'AbstractPolymorphicSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(SealedClassSerializer, 'SealedClassSerializer', VOID, AbstractPolymorphicSerializer);
  initMetadataForClass(SerializationException, 'SerializationException', SerializationException_init_$Create$, IllegalArgumentException);
  initMetadataForClass(UnknownFieldException, 'UnknownFieldException', VOID, SerializationException);
  initMetadataForClass(MissingFieldException, 'MissingFieldException', VOID, SerializationException);
  function get_isNullable() {
    return false;
  }
  function get_isInline() {
    return false;
  }
  function get_annotations() {
    return emptyList();
  }
  initMetadataForInterface(SerialDescriptor, 'SerialDescriptor');
  initMetadataForClass(ContextDescriptor, 'ContextDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(elementNames$1);
  initMetadataForClass(elementNames$$inlined$Iterable$1);
  initMetadataForClass(elementDescriptors$1);
  initMetadataForClass(elementDescriptors$$inlined$Iterable$1);
  initMetadataForClass(ClassSerialDescriptorBuilder, 'ClassSerialDescriptorBuilder');
  initMetadataForInterface(CachedNames, 'CachedNames');
  initMetadataForClass(SerialDescriptorImpl, 'SerialDescriptorImpl', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(SerialKind, 'SerialKind');
  initMetadataForObject(ENUM, 'ENUM', VOID, SerialKind);
  initMetadataForObject(CONTEXTUAL, 'CONTEXTUAL', VOID, SerialKind);
  initMetadataForClass(StructureKind, 'StructureKind', VOID, SerialKind);
  initMetadataForObject(CLASS, 'CLASS', VOID, StructureKind);
  initMetadataForObject(LIST, 'LIST', VOID, StructureKind);
  initMetadataForObject(MAP, 'MAP', VOID, StructureKind);
  initMetadataForObject(OBJECT, 'OBJECT', VOID, StructureKind);
  initMetadataForClass(PrimitiveKind, 'PrimitiveKind', VOID, SerialKind);
  initMetadataForObject(BOOLEAN, 'BOOLEAN', VOID, PrimitiveKind);
  initMetadataForObject(BYTE, 'BYTE', VOID, PrimitiveKind);
  initMetadataForObject(CHAR, 'CHAR', VOID, PrimitiveKind);
  initMetadataForObject(SHORT, 'SHORT', VOID, PrimitiveKind);
  initMetadataForObject(INT, 'INT', VOID, PrimitiveKind);
  initMetadataForObject(LONG, 'LONG', VOID, PrimitiveKind);
  initMetadataForObject(FLOAT, 'FLOAT', VOID, PrimitiveKind);
  initMetadataForObject(DOUBLE, 'DOUBLE', VOID, PrimitiveKind);
  initMetadataForObject(STRING, 'STRING', VOID, PrimitiveKind);
  initMetadataForClass(PolymorphicKind, 'PolymorphicKind', VOID, SerialKind);
  initMetadataForObject(SEALED, 'SEALED', VOID, PolymorphicKind);
  function decodeSerializableValue(deserializer) {
    return deserializer.zf(this);
  }
  initMetadataForInterface(Decoder, 'Decoder');
  function decodeSequentially() {
    return false;
  }
  function decodeCollectionSize(descriptor) {
    return -1;
  }
  function decodeSerializableElement$default(descriptor, index, deserializer, previousValue, $super) {
    previousValue = previousValue === VOID ? null : previousValue;
    return $super === VOID ? this.jj(descriptor, index, deserializer, previousValue) : $super.jj.call(this, descriptor, index, deserializer, previousValue);
  }
  initMetadataForInterface(CompositeDecoder, 'CompositeDecoder');
  initMetadataForClass(AbstractDecoder, 'AbstractDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  function encodeNotNullMark() {
  }
  function beginCollection(descriptor, collectionSize) {
    return this.xi(descriptor);
  }
  function encodeSerializableValue(serializer, value) {
    serializer.yf(this, value);
  }
  function encodeNullableSerializableValue(serializer, value) {
    var isNullabilitySupported = serializer.xf().yg();
    if (isNullabilitySupported) {
      return this.pk(isInterface(serializer, SerializationStrategy) ? serializer : THROW_CCE(), value);
    }
    if (value == null) {
      this.sj();
    } else {
      this.sk();
      this.pk(serializer, value);
    }
  }
  initMetadataForInterface(Encoder, 'Encoder');
  function shouldEncodeElementDefault(descriptor, index) {
    return true;
  }
  initMetadataForInterface(CompositeEncoder, 'CompositeEncoder');
  initMetadataForClass(AbstractEncoder, 'AbstractEncoder', VOID, VOID, [Encoder, CompositeEncoder]);
  initMetadataForObject(NothingSerializer_0, 'NothingSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DurationSerializer, 'DurationSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UuidSerializer, 'UuidSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(ListLikeDescriptor, 'ListLikeDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(ArrayListClassDesc, 'ArrayListClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(LinkedHashSetClassDesc, 'LinkedHashSetClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(MapLikeDescriptor, 'MapLikeDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(LinkedHashMapClassDesc, 'LinkedHashMapClassDesc', VOID, MapLikeDescriptor);
  initMetadataForClass(PrimitiveArrayDescriptor, 'PrimitiveArrayDescriptor', VOID, ListLikeDescriptor);
  initMetadataForClass(AbstractCollectionSerializer, 'AbstractCollectionSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(CollectionLikeSerializer, 'CollectionLikeSerializer', VOID, AbstractCollectionSerializer);
  initMetadataForClass(CollectionSerializer, 'CollectionSerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(ArrayListSerializer, 'ArrayListSerializer', VOID, CollectionSerializer);
  initMetadataForClass(LinkedHashSetSerializer, 'LinkedHashSetSerializer', VOID, CollectionSerializer);
  initMetadataForClass(MapLikeSerializer, 'MapLikeSerializer', VOID, AbstractCollectionSerializer);
  initMetadataForClass(LinkedHashMapSerializer, 'LinkedHashMapSerializer', VOID, MapLikeSerializer);
  initMetadataForClass(PrimitiveArraySerializer, 'PrimitiveArraySerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(PrimitiveArrayBuilder, 'PrimitiveArrayBuilder');
  initMetadataForCompanion(Companion);
  initMetadataForClass(ElementMarker, 'ElementMarker');
  initMetadataForClass(EnumSerializer, 'EnumSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PluginGeneratedSerialDescriptor, 'PluginGeneratedSerialDescriptor', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(EnumDescriptor, 'EnumDescriptor', VOID, PluginGeneratedSerialDescriptor);
  initMetadataForClass(InlineClassDescriptor, 'InlineClassDescriptor', VOID, PluginGeneratedSerialDescriptor);
  function typeParametersSerializers() {
    return get_EMPTY_SERIALIZER_ARRAY();
  }
  initMetadataForInterface(GeneratedSerializer, 'GeneratedSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(InlinePrimitiveDescriptor$1, VOID, VOID, VOID, [GeneratedSerializer]);
  initMetadataForObject(NoOpEncoder, 'NoOpEncoder', VOID, AbstractEncoder);
  initMetadataForObject(NothingSerialDescriptor, 'NothingSerialDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(NullableSerializer, 'NullableSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(SerialDescriptorForNullable, 'SerialDescriptorForNullable', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(ObjectSerializer, 'ObjectSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(CharArraySerializer_0, 'CharArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(DoubleArraySerializer_0, 'DoubleArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(FloatArraySerializer_0, 'FloatArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(LongArraySerializer_0, 'LongArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(ULongArraySerializer_0, 'ULongArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(IntArraySerializer_0, 'IntArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(UIntArraySerializer_0, 'UIntArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(ShortArraySerializer_0, 'ShortArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(UShortArraySerializer_0, 'UShortArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(ByteArraySerializer_0, 'ByteArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(UByteArraySerializer_0, 'UByteArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForObject(BooleanArraySerializer_0, 'BooleanArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer]);
  initMetadataForClass(CharArrayBuilder, 'CharArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(DoubleArrayBuilder, 'DoubleArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(FloatArrayBuilder, 'FloatArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(LongArrayBuilder, 'LongArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ULongArrayBuilder, 'ULongArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(IntArrayBuilder, 'IntArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UIntArrayBuilder, 'UIntArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ShortArrayBuilder, 'ShortArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UShortArrayBuilder, 'UShortArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ByteArrayBuilder, 'ByteArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UByteArrayBuilder, 'UByteArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(BooleanArrayBuilder, 'BooleanArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForObject(FloatSerializer, 'FloatSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(StringSerializer, 'StringSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PrimitiveSerialDescriptor_0, 'PrimitiveSerialDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForObject(IntSerializer, 'IntSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LongSerializer, 'LongSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ByteSerializer, 'ByteSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ShortSerializer, 'ShortSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(CharSerializer, 'CharSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DoubleSerializer, 'DoubleSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(BooleanSerializer, 'BooleanSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UnitSerializer, 'UnitSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(TaggedDecoder, 'TaggedDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  initMetadataForClass(NamedValueDecoder, 'NamedValueDecoder', VOID, TaggedDecoder);
  initMetadataForObject(UIntSerializer, 'UIntSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ULongSerializer, 'ULongSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UByteSerializer, 'UByteSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UShortSerializer, 'UShortSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(SerializersModule, 'SerializersModule');
  initMetadataForClass(SerialModuleImpl, 'SerialModuleImpl', VOID, SerializersModule);
  initMetadataForClass(ContextualProvider, 'ContextualProvider');
  initMetadataForClass(Argless, 'Argless', VOID, ContextualProvider);
  initMetadataForClass(WithTypeArguments, 'WithTypeArguments', VOID, ContextualProvider);
  function contextual(kClass, serializer) {
    return this.qx(kClass, SerializersModuleCollector$contextual$lambda(serializer));
  }
  initMetadataForInterface(SerializersModuleCollector, 'SerializersModuleCollector');
  initMetadataForClass(SerializableWith, 'SerializableWith', VOID, VOID, VOID, VOID, 0);
  //endregion
  function KSerializer() {
  }
  function SerializationStrategy() {
  }
  function DeserializationStrategy() {
  }
  function findPolymorphicSerializer(_this__u8e3s4, encoder, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.ag(encoder, value);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered(getKClassFromExpression(value), _this__u8e3s4.bg());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function findPolymorphicSerializer_0(_this__u8e3s4, decoder, klassName) {
    var tmp0_elvis_lhs = _this__u8e3s4.cg(decoder, klassName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered_0(klassName, _this__u8e3s4.bg());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function SealedClassSerializer_init_$Init$(serialName, baseClass, subclasses, subclassSerializers, classAnnotations, $this) {
    SealedClassSerializer.call($this, serialName, baseClass, subclasses, subclassSerializers);
    $this.eg_1 = asList(classAnnotations);
    return $this;
  }
  function SealedClassSerializer_init_$Create$(serialName, baseClass, subclasses, subclassSerializers, classAnnotations) {
    return SealedClassSerializer_init_$Init$(serialName, baseClass, subclasses, subclassSerializers, classAnnotations, objectCreate(protoOf(SealedClassSerializer)));
  }
  function SealedClassSerializer$descriptor$delegate$lambda$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s = this$0.hg_1.w1().j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        // Inline function 'kotlin.collections.component1' call
        var name = element.p1();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element.q1();
        $this$buildSerialDescriptor.qg(name, serializer.xf());
      }
      return Unit_instance;
    };
  }
  function SealedClassSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.qg('type', serializer(StringCompanionObject_instance).xf());
      var tmp = 'kotlinx.serialization.Sealed<' + this$0.dg_1.a8() + '>';
      var tmp_0 = CONTEXTUAL_getInstance();
      var elementDescriptor = buildSerialDescriptor(tmp, tmp_0, [], SealedClassSerializer$descriptor$delegate$lambda$lambda$lambda(this$0));
      $this$buildSerialDescriptor.qg('value', elementDescriptor);
      $this$buildSerialDescriptor.kg_1 = this$0.eg_1;
      return Unit_instance;
    };
  }
  function SealedClassSerializer$descriptor$delegate$lambda($serialName, this$0) {
    return function () {
      var tmp = SEALED_getInstance();
      return buildSerialDescriptor($serialName, tmp, [], SealedClassSerializer$descriptor$delegate$lambda$lambda(this$0));
    };
  }
  function SealedClassSerializer$_get_descriptor_$ref_m511rz() {
    return constructCallableReference(function (p0) {
      return p0.xf();
    }, 1, 0, 0);
  }
  function SealedClassSerializer$$inlined$groupingBy$1($this) {
    this.rg_1 = $this;
  }
  protoOf(SealedClassSerializer$$inlined$groupingBy$1).sg = function () {
    return this.rg_1.j();
  };
  protoOf(SealedClassSerializer$$inlined$groupingBy$1).tg = function (element) {
    return element.q1().xf().ug();
  };
  protoOf(SealedClassSerializer$$inlined$groupingBy$1).vg = function (element) {
    return this.tg(element);
  };
  function SealedClassSerializer(serialName, baseClass, subclasses, subclassSerializers) {
    AbstractPolymorphicSerializer.call(this);
    this.dg_1 = baseClass;
    this.eg_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.fg_1 = lazy(tmp_0, SealedClassSerializer$descriptor$delegate$lambda(serialName, this));
    if (!(subclasses.length === subclassSerializers.length)) {
      throw IllegalArgumentException_init_$Create$('All subclasses of sealed class ' + this.dg_1.a8() + ' should be marked @Serializable');
    }
    this.gg_1 = toMap(zip(subclasses, subclassSerializers));
    var tmp_1 = this;
    // Inline function 'kotlin.collections.groupingBy' call
    var this_0 = this.gg_1.w1();
    // Inline function 'kotlin.collections.aggregate' call
    var tmp0 = new SealedClassSerializer$$inlined$groupingBy$1(this_0);
    // Inline function 'kotlin.collections.mutableMapOf' call
    // Inline function 'kotlin.collections.aggregateTo' call
    var destination = LinkedHashMap_init_$Create$();
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = tmp0.sg();
    while (_iterator__ex2g4s.k()) {
      var e = _iterator__ex2g4s.l();
      var key = tmp0.vg(e);
      var accumulator = destination.t1(key);
      accumulator == null && !destination.r1(key);
      if (!(accumulator == null)) {
        // Inline function 'kotlin.error' call
        var message = "Multiple sealed subclasses of '" + toString(this.dg_1) + "' have the same serial name '" + key + "':" + (" '" + toString(accumulator.p1()) + "', '" + toString(e.p1()) + "'");
        throw IllegalStateException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.collections.set' call
      destination.x1(key, e);
    }
    // Inline function 'kotlin.collections.mapValues' call
    // Inline function 'kotlin.collections.mapValuesTo' call
    var destination_0 = LinkedHashMap_init_$Create$_0(mapCapacity(destination.m()));
    // Inline function 'kotlin.collections.associateByTo' call
    var _iterator__ex2g4s_0 = destination.w1().j();
    while (_iterator__ex2g4s_0.k()) {
      var element = _iterator__ex2g4s_0.l();
      var tmp_2 = element.p1();
      var tmp$ret$12 = element.q1().q1();
      destination_0.x1(tmp_2, tmp$ret$12);
    }
    tmp_1.hg_1 = destination_0;
  }
  protoOf(SealedClassSerializer).bg = function () {
    return this.dg_1;
  };
  protoOf(SealedClassSerializer).xf = function () {
    var tmp0 = this.fg_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('descriptor', 1, tmp, SealedClassSerializer$_get_descriptor_$ref_m511rz(), null);
    return tmp0.q1();
  };
  protoOf(SealedClassSerializer).cg = function (decoder, klassName) {
    // Inline function 'kotlin.collections.get' call
    var this_0 = this.hg_1;
    var tmp0_elvis_lhs = (isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).t1(klassName);
    return tmp0_elvis_lhs == null ? protoOf(AbstractPolymorphicSerializer).cg.call(this, decoder, klassName) : tmp0_elvis_lhs;
  };
  protoOf(SealedClassSerializer).ag = function (encoder, value) {
    var tmp0_elvis_lhs = this.gg_1.t1(getKClassFromExpression(value));
    var tmp1_safe_receiver = tmp0_elvis_lhs == null ? protoOf(AbstractPolymorphicSerializer).ag.call(this, encoder, value) : tmp0_elvis_lhs;
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp = isInterface(tmp1_safe_receiver, SerializationStrategy) ? tmp1_safe_receiver : THROW_CCE();
    }
    return tmp;
  };
  function SerializationException_init_$Init$($this) {
    IllegalArgumentException_init_$Init$($this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$() {
    var tmp = SerializationException_init_$Init$(objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$);
    return tmp;
  }
  function SerializationException_init_$Init$_0(message, $this) {
    IllegalArgumentException_init_$Init$_0(message, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$_0(message) {
    var tmp = SerializationException_init_$Init$_0(message, objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$_0);
    return tmp;
  }
  function SerializationException_init_$Init$_1(message, cause, $this) {
    IllegalArgumentException_init_$Init$_1(message, cause, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException() {
    captureStack(this, SerializationException);
  }
  function UnknownFieldException_init_$Init$(index, $this) {
    UnknownFieldException.call($this, 'An unknown field for index ' + index);
    return $this;
  }
  function UnknownFieldException_init_$Create$(index) {
    var tmp = UnknownFieldException_init_$Init$(index, objectCreate(protoOf(UnknownFieldException)));
    captureStack(tmp, UnknownFieldException_init_$Create$);
    return tmp;
  }
  function UnknownFieldException(message) {
    SerializationException_init_$Init$_0(message, this);
    captureStack(this, UnknownFieldException);
  }
  function MissingFieldException_init_$Init$(missingFields, serialName, $this) {
    MissingFieldException.call($this, missingFields, missingFields.m() === 1 ? "Field '" + missingFields.n(0) + "' is required for type with serial name '" + serialName + "', but it was missing" : 'Fields ' + toString(missingFields) + " are required for type with serial name '" + serialName + "', but they were missing", null);
    return $this;
  }
  function MissingFieldException_init_$Create$(missingFields, serialName) {
    var tmp = MissingFieldException_init_$Init$(missingFields, serialName, objectCreate(protoOf(MissingFieldException)));
    captureStack(tmp, MissingFieldException_init_$Create$);
    return tmp;
  }
  function MissingFieldException(missingFields, message, cause) {
    SerializationException_init_$Init$_1(message, cause, this);
    captureStack(this, MissingFieldException);
    this.xg_1 = missingFields;
  }
  function serializer(_this__u8e3s4) {
    return StringSerializer_getInstance();
  }
  function serializer_0(_this__u8e3s4) {
    return UIntSerializer_getInstance();
  }
  function serializer_1(_this__u8e3s4) {
    return ULongSerializer_getInstance();
  }
  function serializer_2(_this__u8e3s4) {
    return UByteSerializer_getInstance();
  }
  function serializer_3(_this__u8e3s4) {
    return UShortSerializer_getInstance();
  }
  function get_nullable(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4.xf().yg()) {
      tmp = isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
    } else {
      tmp = new NullableSerializer(_this__u8e3s4);
    }
    return tmp;
  }
  function serializer_4(_this__u8e3s4) {
    return IntSerializer_getInstance();
  }
  function serializer_5(_this__u8e3s4) {
    return LongSerializer_getInstance();
  }
  function serializer_6(_this__u8e3s4) {
    return ByteSerializer_getInstance();
  }
  function serializer_7(_this__u8e3s4) {
    return ShortSerializer_getInstance();
  }
  function serializer_8(_this__u8e3s4) {
    return CharSerializer_getInstance();
  }
  function CharArraySerializer() {
    return CharArraySerializer_getInstance();
  }
  function serializer_9(_this__u8e3s4) {
    return DoubleSerializer_getInstance();
  }
  function DoubleArraySerializer() {
    return DoubleArraySerializer_getInstance();
  }
  function serializer_10(_this__u8e3s4) {
    return FloatSerializer_getInstance();
  }
  function FloatArraySerializer() {
    return FloatArraySerializer_getInstance();
  }
  function LongArraySerializer() {
    return LongArraySerializer_getInstance();
  }
  function ULongArraySerializer() {
    return ULongArraySerializer_getInstance();
  }
  function IntArraySerializer() {
    return IntArraySerializer_getInstance();
  }
  function UIntArraySerializer() {
    return UIntArraySerializer_getInstance();
  }
  function ShortArraySerializer() {
    return ShortArraySerializer_getInstance();
  }
  function UShortArraySerializer() {
    return UShortArraySerializer_getInstance();
  }
  function ByteArraySerializer() {
    return ByteArraySerializer_getInstance();
  }
  function UByteArraySerializer() {
    return UByteArraySerializer_getInstance();
  }
  function serializer_11(_this__u8e3s4) {
    return BooleanSerializer_getInstance();
  }
  function BooleanArraySerializer() {
    return BooleanArraySerializer_getInstance();
  }
  function serializer_12(_this__u8e3s4) {
    return UnitSerializer_getInstance();
  }
  function NothingSerializer() {
    return NothingSerializer_getInstance();
  }
  function serializer_13(_this__u8e3s4) {
    return DurationSerializer_getInstance();
  }
  function serializer_14(_this__u8e3s4) {
    return UuidSerializer_getInstance();
  }
  function ContextDescriptor() {
  }
  function getContextualDescriptor(_this__u8e3s4, descriptor) {
    var tmp0_safe_receiver = get_capturedKClass(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_0 = _this__u8e3s4.zg(tmp0_safe_receiver);
      tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.xf();
    }
    return tmp;
  }
  function get_capturedKClass(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof ContextDescriptor) {
      tmp = _this__u8e3s4.dh_1;
    } else {
      if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
        tmp = get_capturedKClass(_this__u8e3s4.ah_1);
      } else {
        tmp = null;
      }
    }
    return tmp;
  }
  function SerialDescriptor() {
  }
  function get_elementNames(_this__u8e3s4) {
    // Inline function 'kotlin.collections.Iterable' call
    return new elementNames$$inlined$Iterable$1(_this__u8e3s4);
  }
  function get_elementDescriptors(_this__u8e3s4) {
    // Inline function 'kotlin.collections.Iterable' call
    return new elementDescriptors$$inlined$Iterable$1(_this__u8e3s4);
  }
  function elementNames$1($this_elementNames) {
    this.oh_1 = $this_elementNames;
    this.nh_1 = $this_elementNames.gh();
  }
  protoOf(elementNames$1).k = function () {
    return this.nh_1 > 0;
  };
  protoOf(elementNames$1).l = function () {
    var tmp = this.oh_1.gh();
    var _unary__edvuaz = this.nh_1;
    this.nh_1 = _unary__edvuaz - 1 | 0;
    return this.oh_1.ih(tmp - _unary__edvuaz | 0);
  };
  function elementNames$$inlined$Iterable$1($this_elementNames) {
    this.ph_1 = $this_elementNames;
  }
  protoOf(elementNames$$inlined$Iterable$1).j = function () {
    return new elementNames$1(this.ph_1);
  };
  function elementDescriptors$1($this_elementDescriptors) {
    this.rh_1 = $this_elementDescriptors;
    this.qh_1 = $this_elementDescriptors.gh();
  }
  protoOf(elementDescriptors$1).k = function () {
    return this.qh_1 > 0;
  };
  protoOf(elementDescriptors$1).l = function () {
    var tmp = this.rh_1.gh();
    var _unary__edvuaz = this.qh_1;
    this.qh_1 = _unary__edvuaz - 1 | 0;
    return this.rh_1.lh(tmp - _unary__edvuaz | 0);
  };
  function elementDescriptors$$inlined$Iterable$1($this_elementDescriptors) {
    this.sh_1 = $this_elementDescriptors;
  }
  protoOf(elementDescriptors$$inlined$Iterable$1).j = function () {
    return new elementDescriptors$1(this.sh_1);
  };
  function buildSerialDescriptor(serialName, kind, typeParameters, builder) {
    var tmp;
    if (builder === VOID) {
      tmp = buildSerialDescriptor$lambda;
    } else {
      tmp = builder;
    }
    builder = tmp;
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!!equals(kind, CLASS_getInstance())) {
      var message_0 = "For StructureKind.CLASS please use 'buildClassSerialDescriptor' instead";
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builder(sdBuilder);
    return new SerialDescriptorImpl(serialName, kind, sdBuilder.lg_1.m(), toList(typeParameters), sdBuilder);
  }
  function ClassSerialDescriptorBuilder(serialName) {
    this.ig_1 = serialName;
    this.jg_1 = false;
    this.kg_1 = emptyList();
    this.lg_1 = ArrayList_init_$Create$();
    this.mg_1 = HashSet_init_$Create$();
    this.ng_1 = ArrayList_init_$Create$();
    this.og_1 = ArrayList_init_$Create$();
    this.pg_1 = ArrayList_init_$Create$();
  }
  protoOf(ClassSerialDescriptorBuilder).th = function (elementName, descriptor, annotations, isOptional) {
    // Inline function 'kotlin.require' call
    if (!this.mg_1.f(elementName)) {
      var message = "Element with name '" + elementName + "' is already registered in " + this.ig_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    this.lg_1.f(elementName);
    // Inline function 'kotlin.collections.plusAssign' call
    this.ng_1.f(descriptor);
    // Inline function 'kotlin.collections.plusAssign' call
    this.og_1.f(annotations);
    // Inline function 'kotlin.collections.plusAssign' call
    this.pg_1.f(isOptional);
  };
  protoOf(ClassSerialDescriptorBuilder).qg = function (elementName, descriptor, annotations, isOptional, $super) {
    annotations = annotations === VOID ? emptyList() : annotations;
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.th(elementName, descriptor, annotations, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.th.call(this, elementName, descriptor, annotations, isOptional);
    }
    return tmp;
  };
  function _get__hashCode__tgwhef($this) {
    var tmp0 = $this.fi_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('_hashCode', 1, tmp, SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp(), null);
    return tmp0.q1();
  }
  function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.ei_1);
    };
  }
  function SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp() {
    return constructCallableReference(function (p0) {
      return _get__hashCode__tgwhef(p0);
    }, 1, 0, 1);
  }
  function SerialDescriptorImpl$toString$lambda(this$0) {
    return function (it) {
      return this$0.ih(it) + ': ' + this$0.lh(it).ug();
    };
  }
  function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
    this.uh_1 = serialName;
    this.vh_1 = kind;
    this.wh_1 = elementsCount;
    this.xh_1 = builder.kg_1;
    this.yh_1 = toHashSet(builder.lg_1);
    var tmp = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_0 = builder.lg_1;
    tmp.zh_1 = copyToArray(this_0);
    this.ai_1 = compactArray(builder.ng_1);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_1 = builder.og_1;
    tmp_0.bi_1 = copyToArray(this_1);
    this.ci_1 = toBooleanArray(builder.pg_1);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    var this_2 = withIndex(this.zh_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s = this_2.j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      var tmp$ret$4 = to(item.ra_1, item.qa_1);
      destination.f(tmp$ret$4);
    }
    tmp_1.di_1 = toMap(destination);
    this.ei_1 = compactArray(typeParameters);
    var tmp_2 = this;
    tmp_2.fi_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
  }
  protoOf(SerialDescriptorImpl).ug = function () {
    return this.uh_1;
  };
  protoOf(SerialDescriptorImpl).eh = function () {
    return this.vh_1;
  };
  protoOf(SerialDescriptorImpl).gh = function () {
    return this.wh_1;
  };
  protoOf(SerialDescriptorImpl).hh = function () {
    return this.xh_1;
  };
  protoOf(SerialDescriptorImpl).gi = function () {
    return this.yh_1;
  };
  protoOf(SerialDescriptorImpl).ih = function (index) {
    return getChecked(this.zh_1, index);
  };
  protoOf(SerialDescriptorImpl).jh = function (name) {
    var tmp0_elvis_lhs = this.di_1.t1(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(SerialDescriptorImpl).kh = function (index) {
    return getChecked(this.bi_1, index);
  };
  protoOf(SerialDescriptorImpl).lh = function (index) {
    return getChecked(this.ai_1, index);
  };
  protoOf(SerialDescriptorImpl).mh = function (index) {
    return getChecked_0(this.ci_1, index);
  };
  protoOf(SerialDescriptorImpl).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof SerialDescriptorImpl)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.ug() === other.ug())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.ei_1, other.ei_1)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.gh() === other.gh())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.gh();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.lh(index).ug() === other.lh(index).ug())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.lh(index).eh(), other.lh(index).eh())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(SerialDescriptorImpl).hashCode = function () {
    return _get__hashCode__tgwhef(this);
  };
  protoOf(SerialDescriptorImpl).toString = function () {
    var tmp = until(0, this.wh_1);
    var tmp_0 = this.uh_1 + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, SerialDescriptorImpl$toString$lambda(this));
  };
  function PrimitiveSerialDescriptor(serialName, kind) {
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return PrimitiveDescriptorSafe(serialName, kind);
  }
  function buildSerialDescriptor$lambda(_this__u8e3s4) {
    return Unit_instance;
  }
  function ENUM() {
    ENUM_instance = this;
    SerialKind.call(this);
  }
  var ENUM_instance;
  function ENUM_getInstance() {
    if (ENUM_instance == null)
      new ENUM();
    return ENUM_instance;
  }
  function CONTEXTUAL() {
    CONTEXTUAL_instance = this;
    SerialKind.call(this);
  }
  var CONTEXTUAL_instance;
  function CONTEXTUAL_getInstance() {
    if (CONTEXTUAL_instance == null)
      new CONTEXTUAL();
    return CONTEXTUAL_instance;
  }
  function SerialKind() {
  }
  protoOf(SerialKind).toString = function () {
    return ensureNotNull(getKClassFromExpression(this).a8());
  };
  protoOf(SerialKind).hashCode = function () {
    return getStringHashCode(this.toString());
  };
  function CLASS() {
    CLASS_instance = this;
    StructureKind.call(this);
  }
  var CLASS_instance;
  function CLASS_getInstance() {
    if (CLASS_instance == null)
      new CLASS();
    return CLASS_instance;
  }
  function LIST() {
    LIST_instance = this;
    StructureKind.call(this);
  }
  var LIST_instance;
  function LIST_getInstance() {
    if (LIST_instance == null)
      new LIST();
    return LIST_instance;
  }
  function MAP() {
    MAP_instance = this;
    StructureKind.call(this);
  }
  var MAP_instance;
  function MAP_getInstance() {
    if (MAP_instance == null)
      new MAP();
    return MAP_instance;
  }
  function OBJECT() {
    OBJECT_instance = this;
    StructureKind.call(this);
  }
  var OBJECT_instance;
  function OBJECT_getInstance() {
    if (OBJECT_instance == null)
      new OBJECT();
    return OBJECT_instance;
  }
  function StructureKind() {
    SerialKind.call(this);
  }
  function BOOLEAN() {
    BOOLEAN_instance = this;
    PrimitiveKind.call(this);
  }
  var BOOLEAN_instance;
  function BOOLEAN_getInstance() {
    if (BOOLEAN_instance == null)
      new BOOLEAN();
    return BOOLEAN_instance;
  }
  function BYTE() {
    BYTE_instance = this;
    PrimitiveKind.call(this);
  }
  var BYTE_instance;
  function BYTE_getInstance() {
    if (BYTE_instance == null)
      new BYTE();
    return BYTE_instance;
  }
  function CHAR() {
    CHAR_instance = this;
    PrimitiveKind.call(this);
  }
  var CHAR_instance;
  function CHAR_getInstance() {
    if (CHAR_instance == null)
      new CHAR();
    return CHAR_instance;
  }
  function SHORT() {
    SHORT_instance = this;
    PrimitiveKind.call(this);
  }
  var SHORT_instance;
  function SHORT_getInstance() {
    if (SHORT_instance == null)
      new SHORT();
    return SHORT_instance;
  }
  function INT() {
    INT_instance = this;
    PrimitiveKind.call(this);
  }
  var INT_instance;
  function INT_getInstance() {
    if (INT_instance == null)
      new INT();
    return INT_instance;
  }
  function LONG() {
    LONG_instance = this;
    PrimitiveKind.call(this);
  }
  var LONG_instance;
  function LONG_getInstance() {
    if (LONG_instance == null)
      new LONG();
    return LONG_instance;
  }
  function FLOAT() {
    FLOAT_instance = this;
    PrimitiveKind.call(this);
  }
  var FLOAT_instance;
  function FLOAT_getInstance() {
    if (FLOAT_instance == null)
      new FLOAT();
    return FLOAT_instance;
  }
  function DOUBLE() {
    DOUBLE_instance = this;
    PrimitiveKind.call(this);
  }
  var DOUBLE_instance;
  function DOUBLE_getInstance() {
    if (DOUBLE_instance == null)
      new DOUBLE();
    return DOUBLE_instance;
  }
  function STRING() {
    STRING_instance = this;
    PrimitiveKind.call(this);
  }
  var STRING_instance;
  function STRING_getInstance() {
    if (STRING_instance == null)
      new STRING();
    return STRING_instance;
  }
  function PrimitiveKind() {
    SerialKind.call(this);
  }
  function SEALED() {
    SEALED_instance = this;
    PolymorphicKind.call(this);
  }
  var SEALED_instance;
  function SEALED_getInstance() {
    if (SEALED_instance == null)
      new SEALED();
    return SEALED_instance;
  }
  function PolymorphicKind() {
    SerialKind.call(this);
  }
  function AbstractDecoder() {
  }
  protoOf(AbstractDecoder).hi = function () {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(AbstractDecoder).ii = function () {
    return true;
  };
  protoOf(AbstractDecoder).ji = function () {
    return null;
  };
  protoOf(AbstractDecoder).ki = function () {
    var tmp = this.hi();
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).li = function () {
    var tmp = this.hi();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).mi = function () {
    var tmp = this.hi();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).ni = function () {
    var tmp = this.hi();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).oi = function () {
    var tmp = this.hi();
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).pi = function () {
    var tmp = this.hi();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).qi = function () {
    var tmp = this.hi();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).ri = function () {
    var tmp = this.hi();
    return tmp instanceof Char ? tmp.b1_1 : THROW_CCE();
  };
  protoOf(AbstractDecoder).si = function () {
    var tmp = this.hi();
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).ti = function (enumDescriptor) {
    var tmp = this.hi();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).ui = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).vi = function (deserializer, previousValue) {
    return this.wi(deserializer);
  };
  protoOf(AbstractDecoder).xi = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).yi = function (descriptor) {
  };
  protoOf(AbstractDecoder).zi = function (descriptor, index) {
    return this.ki();
  };
  protoOf(AbstractDecoder).aj = function (descriptor, index) {
    return this.li();
  };
  protoOf(AbstractDecoder).bj = function (descriptor, index) {
    return this.mi();
  };
  protoOf(AbstractDecoder).cj = function (descriptor, index) {
    return this.ni();
  };
  protoOf(AbstractDecoder).dj = function (descriptor, index) {
    return this.oi();
  };
  protoOf(AbstractDecoder).ej = function (descriptor, index) {
    return this.pi();
  };
  protoOf(AbstractDecoder).fj = function (descriptor, index) {
    return this.qi();
  };
  protoOf(AbstractDecoder).gj = function (descriptor, index) {
    return this.ri();
  };
  protoOf(AbstractDecoder).hj = function (descriptor, index) {
    return this.si();
  };
  protoOf(AbstractDecoder).ij = function (descriptor, index) {
    return this.ui(descriptor.lh(index));
  };
  protoOf(AbstractDecoder).jj = function (descriptor, index, deserializer, previousValue) {
    return this.vi(deserializer, previousValue);
  };
  protoOf(AbstractDecoder).lj = function (descriptor, index, deserializer, previousValue) {
    // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
    var isNullabilitySupported = deserializer.xf().yg();
    var tmp;
    if (isNullabilitySupported || this.ii()) {
      tmp = this.vi(deserializer, previousValue);
    } else {
      tmp = this.ji();
    }
    return tmp;
  };
  function AbstractEncoder() {
  }
  protoOf(AbstractEncoder).xi = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).yi = function (descriptor) {
  };
  protoOf(AbstractEncoder).qj = function (descriptor, index) {
    return true;
  };
  protoOf(AbstractEncoder).rj = function (value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(AbstractEncoder).sj = function () {
    throw SerializationException_init_$Create$_0("'null' is not supported by default");
  };
  protoOf(AbstractEncoder).tj = function (value) {
    return this.rj(value);
  };
  protoOf(AbstractEncoder).uj = function (value) {
    return this.rj(value);
  };
  protoOf(AbstractEncoder).vj = function (value) {
    return this.rj(value);
  };
  protoOf(AbstractEncoder).wj = function (value) {
    return this.rj(value);
  };
  protoOf(AbstractEncoder).xj = function (value) {
    return this.rj(value);
  };
  protoOf(AbstractEncoder).yj = function (value) {
    return this.rj(value);
  };
  protoOf(AbstractEncoder).zj = function (value) {
    return this.rj(value);
  };
  protoOf(AbstractEncoder).ak = function (value) {
    return this.rj(new Char(value));
  };
  protoOf(AbstractEncoder).bk = function (value) {
    return this.rj(value);
  };
  protoOf(AbstractEncoder).ck = function (enumDescriptor, index) {
    return this.rj(index);
  };
  protoOf(AbstractEncoder).dk = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).ek = function (descriptor, index, value) {
    if (this.qj(descriptor, index)) {
      this.tj(value);
    }
  };
  protoOf(AbstractEncoder).fk = function (descriptor, index, value) {
    if (this.qj(descriptor, index)) {
      this.uj(value);
    }
  };
  protoOf(AbstractEncoder).gk = function (descriptor, index, value) {
    if (this.qj(descriptor, index)) {
      this.vj(value);
    }
  };
  protoOf(AbstractEncoder).hk = function (descriptor, index, value) {
    if (this.qj(descriptor, index)) {
      this.wj(value);
    }
  };
  protoOf(AbstractEncoder).ik = function (descriptor, index, value) {
    if (this.qj(descriptor, index)) {
      this.xj(value);
    }
  };
  protoOf(AbstractEncoder).jk = function (descriptor, index, value) {
    if (this.qj(descriptor, index)) {
      this.yj(value);
    }
  };
  protoOf(AbstractEncoder).kk = function (descriptor, index, value) {
    if (this.qj(descriptor, index)) {
      this.zj(value);
    }
  };
  protoOf(AbstractEncoder).lk = function (descriptor, index, value) {
    if (this.qj(descriptor, index)) {
      this.ak(value);
    }
  };
  protoOf(AbstractEncoder).mk = function (descriptor, index, value) {
    if (this.qj(descriptor, index)) {
      this.bk(value);
    }
  };
  protoOf(AbstractEncoder).nk = function (descriptor, index) {
    return this.qj(descriptor, index) ? this.dk(descriptor.lh(index)) : NoOpEncoder_getInstance();
  };
  protoOf(AbstractEncoder).ok = function (descriptor, index, serializer, value) {
    if (this.qj(descriptor, index)) {
      this.pk(serializer, value);
    }
  };
  protoOf(AbstractEncoder).qk = function (descriptor, index, serializer, value) {
    if (this.qj(descriptor, index)) {
      this.rk(serializer, value);
    }
  };
  function Decoder() {
  }
  function CompositeDecoder() {
  }
  function Encoder() {
  }
  function CompositeEncoder() {
  }
  function decodeSequentially_0($this, compositeDecoder) {
    var klassName = compositeDecoder.hj($this.xf(), 0);
    var serializer = findPolymorphicSerializer_0($this, compositeDecoder, klassName);
    return compositeDecoder.kj($this.xf(), 1, serializer);
  }
  function AbstractPolymorphicSerializer() {
  }
  protoOf(AbstractPolymorphicSerializer).wg = function (encoder, value) {
    var actualSerializer = findPolymorphicSerializer(this, encoder, value);
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.xf();
    var composite = encoder.xi(descriptor);
    composite.mk(this.xf(), 0, actualSerializer.xf().ug());
    var tmp = this.xf();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var tmp$ret$2 = isInterface(actualSerializer, SerializationStrategy) ? actualSerializer : THROW_CCE();
    composite.ok(tmp, 1, tmp$ret$2, value);
    composite.yi(descriptor);
  };
  protoOf(AbstractPolymorphicSerializer).yf = function (encoder, value) {
    return this.wg(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(AbstractPolymorphicSerializer).zf = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.xf();
    var composite = decoder.xi(descriptor);
    var tmp$ret$1;
    $l$block: {
      var klassName = null;
      var value = null;
      if (composite.nj()) {
        tmp$ret$1 = decodeSequentially_0(this, composite);
        break $l$block;
      }
      mainLoop: while (true) {
        var index = composite.oj(this.xf());
        switch (index) {
          case -1:
            break mainLoop;
          case 0:
            klassName = composite.hj(this.xf(), index);
            break;
          case 1:
            var tmp0 = klassName;
            var tmp$ret$2;
            $l$block_0: {
              // Inline function 'kotlin.requireNotNull' call
              if (tmp0 == null) {
                var message = 'Cannot read polymorphic value before its type token';
                throw IllegalArgumentException_init_$Create$(toString(message));
              } else {
                tmp$ret$2 = tmp0;
                break $l$block_0;
              }
            }

            klassName = tmp$ret$2;
            var serializer = findPolymorphicSerializer_0(this, composite, klassName);
            value = composite.kj(this.xf(), index, serializer);
            break;
          default:
            var tmp0_elvis_lhs = klassName;
            throw SerializationException_init_$Create$_0('Invalid index in polymorphic deserialization of ' + (tmp0_elvis_lhs == null ? 'unknown class' : tmp0_elvis_lhs) + ('\n Expected 0, 1 or DECODE_DONE(-1), but found ' + index));
        }
      }
      var tmp0_0 = value;
      var tmp$ret$4;
      $l$block_1: {
        // Inline function 'kotlin.requireNotNull' call
        if (tmp0_0 == null) {
          var message_0 = 'Polymorphic value has not been read for class ' + klassName;
          throw IllegalArgumentException_init_$Create$(toString(message_0));
        } else {
          tmp$ret$4 = tmp0_0;
          break $l$block_1;
        }
      }
      var tmp = tmp$ret$4;
      tmp$ret$1 = !(tmp == null) ? tmp : THROW_CCE();
    }
    var result = tmp$ret$1;
    composite.yi(descriptor);
    return result;
  };
  protoOf(AbstractPolymorphicSerializer).cg = function (decoder, klassName) {
    return decoder.mj().vk(this.bg(), klassName);
  };
  protoOf(AbstractPolymorphicSerializer).ag = function (encoder, value) {
    return encoder.mj().wk(this.bg(), value);
  };
  function throwSubtypeNotRegistered(subClass, baseClass) {
    var tmp0_elvis_lhs = subClass.a8();
    throwSubtypeNotRegistered_0(tmp0_elvis_lhs == null ? toString(subClass) : tmp0_elvis_lhs, baseClass);
  }
  function throwSubtypeNotRegistered_0(subClassName, baseClass) {
    var scope = "in the polymorphic scope of '" + baseClass.a8() + "'";
    throw SerializationException_init_$Create$_0(subClassName == null ? 'Class discriminator was missing and no default serializers were registered ' + scope + '.' : "Serializer for subclass '" + subClassName + "' is not found " + scope + '.\n' + ("Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n") + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.a8() + "' has to be sealed and '@Serializable'."));
  }
  function NothingSerializer_0() {
    NothingSerializer_instance = this;
    this.xk_1 = NothingSerialDescriptor_getInstance();
  }
  protoOf(NothingSerializer_0).xf = function () {
    return this.xk_1;
  };
  protoOf(NothingSerializer_0).yk = function (encoder, value) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' cannot be serialized");
  };
  protoOf(NothingSerializer_0).yf = function (encoder, value) {
    var tmp;
    if (false) {
      tmp = value;
    } else {
      tmp = THROW_CCE();
    }
    return this.yk(encoder, tmp);
  };
  protoOf(NothingSerializer_0).zf = function (decoder) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' does not have instances");
  };
  var NothingSerializer_instance;
  function NothingSerializer_getInstance() {
    if (NothingSerializer_instance == null)
      new NothingSerializer_0();
    return NothingSerializer_instance;
  }
  function DurationSerializer() {
    DurationSerializer_instance = this;
    this.zk_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
  }
  protoOf(DurationSerializer).xf = function () {
    return this.zk_1;
  };
  protoOf(DurationSerializer).al = function (encoder, value) {
    encoder.bk(Duration__toIsoString_impl_9h6wsm(value));
  };
  protoOf(DurationSerializer).yf = function (encoder, value) {
    return this.al(encoder, value instanceof Duration ? value.ed_1 : THROW_CCE());
  };
  protoOf(DurationSerializer).bl = function (decoder) {
    return Companion_getInstance().fd(decoder.si());
  };
  protoOf(DurationSerializer).zf = function (decoder) {
    return new Duration(this.bl(decoder));
  };
  var DurationSerializer_instance;
  function DurationSerializer_getInstance() {
    if (DurationSerializer_instance == null)
      new DurationSerializer();
    return DurationSerializer_instance;
  }
  function UuidSerializer() {
    UuidSerializer_instance = this;
    this.cl_1 = new PrimitiveSerialDescriptor_0('kotlin.uuid.Uuid', STRING_getInstance());
  }
  protoOf(UuidSerializer).xf = function () {
    return this.cl_1;
  };
  protoOf(UuidSerializer).dl = function (encoder, value) {
    encoder.bk(value.toString());
  };
  protoOf(UuidSerializer).yf = function (encoder, value) {
    return this.dl(encoder, value instanceof Uuid ? value : THROW_CCE());
  };
  protoOf(UuidSerializer).zf = function (decoder) {
    return Companion_getInstance_0().ee(decoder.si());
  };
  var UuidSerializer_instance;
  function UuidSerializer_getInstance() {
    if (UuidSerializer_instance == null)
      new UuidSerializer();
    return UuidSerializer_instance;
  }
  function CachedNames() {
  }
  function ArrayListClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayListClassDesc).ug = function () {
    return 'kotlin.collections.ArrayList';
  };
  function LinkedHashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(LinkedHashSetClassDesc).ug = function () {
    return 'kotlin.collections.LinkedHashSet';
  };
  function LinkedHashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.LinkedHashMap', keyDesc, valueDesc);
  }
  function ListLikeDescriptor(elementDescriptor) {
    this.gl_1 = elementDescriptor;
    this.hl_1 = 1;
  }
  protoOf(ListLikeDescriptor).eh = function () {
    return LIST_getInstance();
  };
  protoOf(ListLikeDescriptor).gh = function () {
    return this.hl_1;
  };
  protoOf(ListLikeDescriptor).ih = function (index) {
    return index.toString();
  };
  protoOf(ListLikeDescriptor).jh = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid list index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ListLikeDescriptor).mh = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.ug() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(ListLikeDescriptor).kh = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.ug() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(ListLikeDescriptor).lh = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.ug() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.gl_1;
  };
  protoOf(ListLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ListLikeDescriptor))
      return false;
    if (equals(this.gl_1, other.gl_1) && this.ug() === other.ug())
      return true;
    return false;
  };
  protoOf(ListLikeDescriptor).hashCode = function () {
    return imul(hashCode(this.gl_1), 31) + getStringHashCode(this.ug()) | 0;
  };
  protoOf(ListLikeDescriptor).toString = function () {
    return this.ug() + '(' + toString(this.gl_1) + ')';
  };
  function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
    this.kl_1 = serialName;
    this.ll_1 = keyDescriptor;
    this.ml_1 = valueDescriptor;
    this.nl_1 = 2;
  }
  protoOf(MapLikeDescriptor).ug = function () {
    return this.kl_1;
  };
  protoOf(MapLikeDescriptor).eh = function () {
    return MAP_getInstance();
  };
  protoOf(MapLikeDescriptor).gh = function () {
    return this.nl_1;
  };
  protoOf(MapLikeDescriptor).ih = function (index) {
    return index.toString();
  };
  protoOf(MapLikeDescriptor).jh = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid map index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).mh = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.ug() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(MapLikeDescriptor).kh = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.ug() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(MapLikeDescriptor).lh = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.ug() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    switch (index % 2 | 0) {
      case 0:
        tmp = this.ll_1;
        break;
      case 1:
        tmp = this.ml_1;
        break;
      default:
        // Inline function 'kotlin.error' call

        var message_0 = 'Unreached';
        throw IllegalStateException_init_$Create$(toString(message_0));
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapLikeDescriptor))
      return false;
    if (!(this.ug() === other.ug()))
      return false;
    if (!equals(this.ll_1, other.ll_1))
      return false;
    if (!equals(this.ml_1, other.ml_1))
      return false;
    return true;
  };
  protoOf(MapLikeDescriptor).hashCode = function () {
    var result = getStringHashCode(this.ug());
    result = imul(31, result) + hashCode(this.ll_1) | 0;
    result = imul(31, result) + hashCode(this.ml_1) | 0;
    return result;
  };
  protoOf(MapLikeDescriptor).toString = function () {
    return this.ug() + '(' + toString(this.ll_1) + ', ' + toString(this.ml_1) + ')';
  };
  function PrimitiveArrayDescriptor(primitive) {
    ListLikeDescriptor.call(this, primitive);
    this.ql_1 = primitive.ug() + 'Array';
  }
  protoOf(PrimitiveArrayDescriptor).ug = function () {
    return this.ql_1;
  };
  function ArrayListSerializer(element) {
    CollectionSerializer.call(this, element);
    this.sl_1 = new ArrayListClassDesc(element.xf());
  }
  protoOf(ArrayListSerializer).xf = function () {
    return this.sl_1;
  };
  protoOf(ArrayListSerializer).tl = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$();
  };
  protoOf(ArrayListSerializer).ul = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(ArrayListSerializer).vl = function (_this__u8e3s4) {
    return this.ul(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).wl = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(ArrayListSerializer).xl = function (_this__u8e3s4) {
    return this.wl(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).yl = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? ArrayList_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(ArrayListSerializer).zl = function (_this__u8e3s4) {
    return this.yl((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).am = function (_this__u8e3s4, size) {
    return _this__u8e3s4.t3(size);
  };
  protoOf(ArrayListSerializer).bm = function (_this__u8e3s4, size) {
    return this.am(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ArrayListSerializer).cm = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.z2(index, element);
  };
  protoOf(ArrayListSerializer).dm = function (_this__u8e3s4, index, element) {
    return this.cm(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), index, element);
  };
  function LinkedHashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.om_1 = new LinkedHashSetClassDesc(eSerializer.xf());
  }
  protoOf(LinkedHashSetSerializer).xf = function () {
    return this.om_1;
  };
  protoOf(LinkedHashSetSerializer).tl = function () {
    // Inline function 'kotlin.collections.linkedSetOf' call
    return LinkedHashSet_init_$Create$();
  };
  protoOf(LinkedHashSetSerializer).pm = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(LinkedHashSetSerializer).vl = function (_this__u8e3s4) {
    return this.pm(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).qm = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashSetSerializer).xl = function (_this__u8e3s4) {
    return this.qm(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).rm = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashSetSerializer).zl = function (_this__u8e3s4) {
    return this.rm((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).sm = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashSetSerializer).bm = function (_this__u8e3s4, size) {
    return this.sm(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(LinkedHashSetSerializer).tm = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.f(element);
  };
  protoOf(LinkedHashSetSerializer).dm = function (_this__u8e3s4, index, element) {
    return this.tm(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), index, element);
  };
  function LinkedHashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.wm_1 = new LinkedHashMapClassDesc(kSerializer.xf(), vSerializer.xf());
  }
  protoOf(LinkedHashMapSerializer).xf = function () {
    return this.wm_1;
  };
  protoOf(LinkedHashMapSerializer).xm = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(LinkedHashMapSerializer).ym = function (_this__u8e3s4) {
    return this.xm((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).zm = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.w1().j();
  };
  protoOf(LinkedHashMapSerializer).an = function (_this__u8e3s4) {
    return this.zm((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).tl = function () {
    return LinkedHashMap_init_$Create$();
  };
  protoOf(LinkedHashMapSerializer).bn = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.m(), 2);
  };
  protoOf(LinkedHashMapSerializer).vl = function (_this__u8e3s4) {
    return this.bn(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).cn = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashMapSerializer).xl = function (_this__u8e3s4) {
    return this.cn(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).dn = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashMap_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashMapSerializer).zl = function (_this__u8e3s4) {
    return this.dn((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).en = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashMapSerializer).bm = function (_this__u8e3s4, size) {
    return this.en(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function CollectionSerializer(element) {
    CollectionLikeSerializer.call(this, element);
  }
  protoOf(CollectionSerializer).fm = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(CollectionSerializer).ym = function (_this__u8e3s4) {
    return this.fm((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CollectionSerializer).gm = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(CollectionSerializer).an = function (_this__u8e3s4) {
    return this.gm((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  function MapLikeSerializer(keySerializer, valueSerializer) {
    AbstractCollectionSerializer.call(this);
    this.fn_1 = keySerializer;
    this.gn_1 = valueSerializer;
  }
  protoOf(MapLikeSerializer).hn = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    if (!(size >= 0)) {
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var progression = step(until(0, imul(size, 2)), 2);
    var inductionVariable = progression.t_1;
    var last = progression.u_1;
    var step_0 = progression.v_1;
    if (step_0 > 0 && inductionVariable <= last || (step_0 < 0 && last <= inductionVariable))
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step_0 | 0;
        this.in(decoder, startIndex + index | 0, builder, false);
      }
       while (!(index === last));
  };
  protoOf(MapLikeSerializer).jm = function (decoder, builder, startIndex, size) {
    return this.hn(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
  };
  protoOf(MapLikeSerializer).in = function (decoder, index, builder, checkIndex) {
    var key = decoder.kj(this.xf(), index, this.fn_1);
    var tmp;
    if (checkIndex) {
      // Inline function 'kotlin.also' call
      var this_0 = decoder.oj(this.xf());
      // Inline function 'kotlin.require' call
      if (!(this_0 === (index + 1 | 0))) {
        var message = 'Value must follow key in a map, index for key: ' + index + ', returned index for value: ' + this_0;
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      tmp = this_0;
    } else {
      tmp = index + 1 | 0;
    }
    var vIndex = tmp;
    var tmp_0;
    var tmp_1;
    if (builder.r1(key)) {
      var tmp_2 = this.gn_1.xf().eh();
      tmp_1 = !(tmp_2 instanceof PrimitiveKind);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = decoder.jj(this.xf(), vIndex, this.gn_1, getValue(builder, key));
    } else {
      tmp_0 = decoder.kj(this.xf(), vIndex, this.gn_1);
    }
    var value = tmp_0;
    // Inline function 'kotlin.collections.set' call
    builder.x1(key, value);
  };
  protoOf(MapLikeSerializer).km = function (decoder, index, builder, checkIndex) {
    return this.in(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(MapLikeSerializer).im = function (encoder, value) {
    var size = this.ym(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.xf();
    var composite = encoder.tk(descriptor, size);
    var iterator = this.an(value);
    var index = 0;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = iterator;
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var k = element.p1();
      // Inline function 'kotlin.collections.component2' call
      var v = element.q1();
      var tmp = this.xf();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      composite.ok(tmp, _unary__edvuaz, this.fn_1, k);
      var tmp_0 = this.xf();
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      composite.ok(tmp_0, _unary__edvuaz_0, this.gn_1, v);
    }
    composite.yi(descriptor);
  };
  protoOf(MapLikeSerializer).yf = function (encoder, value) {
    return this.im(encoder, value);
  };
  function CollectionLikeSerializer(elementSerializer) {
    AbstractCollectionSerializer.call(this);
    this.hm_1 = elementSerializer;
  }
  protoOf(CollectionLikeSerializer).im = function (encoder, value) {
    var size = this.ym(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.xf();
    var composite = encoder.tk(descriptor, size);
    var iterator = this.an(value);
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        composite.ok(this.xf(), index, this.hm_1, iterator.l());
      }
       while (inductionVariable < size);
    composite.yi(descriptor);
  };
  protoOf(CollectionLikeSerializer).yf = function (encoder, value) {
    return this.im(encoder, value);
  };
  protoOf(CollectionLikeSerializer).jm = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    if (!(size >= 0)) {
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.km(decoder, startIndex + index | 0, builder, false);
      }
       while (inductionVariable < size);
  };
  protoOf(CollectionLikeSerializer).km = function (decoder, index, builder, checkIndex) {
    this.dm(builder, index, decoder.kj(this.xf(), index, this.hm_1));
  };
  function readSize($this, decoder, builder) {
    var size = decoder.pj($this.xf());
    $this.bm(builder, size);
    return size;
  }
  function AbstractCollectionSerializer() {
  }
  protoOf(AbstractCollectionSerializer).mm = function (decoder, previous) {
    var tmp1_elvis_lhs = previous == null ? null : this.zl(previous);
    var builder = tmp1_elvis_lhs == null ? this.tl() : tmp1_elvis_lhs;
    var startIndex = this.vl(builder);
    var compositeDecoder = decoder.xi(this.xf());
    if (compositeDecoder.nj()) {
      this.jm(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
    } else {
      $l$loop: while (true) {
        var index = compositeDecoder.oj(this.xf());
        if (index === -1)
          break $l$loop;
        this.lm(compositeDecoder, startIndex + index | 0, builder);
      }
    }
    compositeDecoder.yi(this.xf());
    return this.xl(builder);
  };
  protoOf(AbstractCollectionSerializer).zf = function (decoder) {
    return this.mm(decoder, null);
  };
  protoOf(AbstractCollectionSerializer).lm = function (decoder, index, builder, checkIndex, $super) {
    checkIndex = checkIndex === VOID ? true : checkIndex;
    var tmp;
    if ($super === VOID) {
      this.km(decoder, index, builder, checkIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.km.call(this, decoder, index, builder, checkIndex);
    }
    return tmp;
  };
  function PrimitiveArraySerializer(primitiveSerializer) {
    CollectionLikeSerializer.call(this, primitiveSerializer);
    this.kn_1 = new PrimitiveArrayDescriptor(primitiveSerializer.xf());
  }
  protoOf(PrimitiveArraySerializer).xf = function () {
    return this.kn_1;
  };
  protoOf(PrimitiveArraySerializer).ln = function (_this__u8e3s4) {
    return _this__u8e3s4.mn();
  };
  protoOf(PrimitiveArraySerializer).vl = function (_this__u8e3s4) {
    return this.ln(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).nn = function (_this__u8e3s4) {
    return _this__u8e3s4.on();
  };
  protoOf(PrimitiveArraySerializer).xl = function (_this__u8e3s4) {
    return this.nn(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).pn = function (_this__u8e3s4, size) {
    return _this__u8e3s4.qn(size);
  };
  protoOf(PrimitiveArraySerializer).bm = function (_this__u8e3s4, size) {
    return this.pn(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(PrimitiveArraySerializer).rn = function (_this__u8e3s4) {
    // Inline function 'kotlin.error' call
    var message = 'This method lead to boxing and must not be used, use writeContents instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).an = function (_this__u8e3s4) {
    return this.rn(_this__u8e3s4);
  };
  protoOf(PrimitiveArraySerializer).sn = function (_this__u8e3s4, index, element) {
    // Inline function 'kotlin.error' call
    var message = 'This method lead to boxing and must not be used, use Builder.append instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).dm = function (_this__u8e3s4, index, element) {
    return this.sn(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), index, element);
  };
  protoOf(PrimitiveArraySerializer).tl = function () {
    return this.zl(this.tn());
  };
  protoOf(PrimitiveArraySerializer).wn = function (encoder, value) {
    var size = this.ym(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.kn_1;
    var composite = encoder.tk(descriptor, size);
    this.vn(composite, value, size);
    composite.yi(descriptor);
  };
  protoOf(PrimitiveArraySerializer).yf = function (encoder, value) {
    return this.wn(encoder, value);
  };
  protoOf(PrimitiveArraySerializer).im = function (encoder, value) {
    return this.wn(encoder, value);
  };
  protoOf(PrimitiveArraySerializer).zf = function (decoder) {
    return this.mm(decoder, null);
  };
  function PrimitiveArrayBuilder() {
  }
  protoOf(PrimitiveArrayBuilder).xn = function (requiredCapacity, $super) {
    requiredCapacity = requiredCapacity === VOID ? this.mn() + 1 | 0 : requiredCapacity;
    var tmp;
    if ($super === VOID) {
      this.qn(requiredCapacity);
      tmp = Unit_instance;
    } else {
      tmp = $super.qn.call(this, requiredCapacity);
    }
    return tmp;
  };
  function Companion() {
    Companion_instance = this;
    this.yn_1 = longArray(0);
  }
  var Companion_instance;
  function Companion_getInstance_7() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function prepareHighMarksArray($this, elementsCount) {
    var slotsCount = (elementsCount - 1 | 0) >>> 6 | 0;
    var elementsInLastSlot = elementsCount & 63;
    var highMarks = longArray(slotsCount);
    if (!(elementsInLastSlot === 0)) {
      highMarks[get_lastIndex(highMarks)] = shiftLeft(new Long(-1, -1), elementsCount);
    }
    return highMarks;
  }
  function markHigh($this, index) {
    var slot = (index >>> 6 | 0) - 1 | 0;
    var offsetInSlot = index & 63;
    $this.co_1[slot] = bitwiseOr($this.co_1[slot], shiftLeft(new Long(1, 0), offsetInSlot));
  }
  function nextUnmarkedHighIndex($this) {
    var inductionVariable = 0;
    var last = $this.co_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var slot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slotOffset = imul(slot + 1 | 0, 64);
        var slotMarks = $this.co_1[slot];
        while (!equalsLong(slotMarks, new Long(-1, -1))) {
          var indexInSlot = countTrailingZeroBits(invert(slotMarks));
          slotMarks = bitwiseOr(slotMarks, shiftLeft(new Long(1, 0), indexInSlot));
          var index = slotOffset + indexInSlot | 0;
          if ($this.ao_1($this.zn_1, index)) {
            $this.co_1[slot] = slotMarks;
            return index;
          }
        }
        $this.co_1[slot] = slotMarks;
      }
       while (inductionVariable <= last);
    return -1;
  }
  function ElementMarker(descriptor, readIfAbsent) {
    Companion_getInstance_7();
    this.zn_1 = descriptor;
    this.ao_1 = readIfAbsent;
    var elementsCount = this.zn_1.gh();
    if (elementsCount <= 64) {
      var tmp = this;
      var tmp_0;
      if (elementsCount === 64) {
        tmp_0 = new Long(0, 0);
      } else {
        tmp_0 = shiftLeft(new Long(-1, -1), elementsCount);
      }
      tmp.bo_1 = tmp_0;
      this.co_1 = Companion_getInstance_7().yn_1;
    } else {
      this.bo_1 = new Long(0, 0);
      this.co_1 = prepareHighMarksArray(this, elementsCount);
    }
  }
  protoOf(ElementMarker).do = function (index) {
    if (index < 64) {
      this.bo_1 = bitwiseOr(this.bo_1, shiftLeft(new Long(1, 0), index));
    } else {
      markHigh(this, index);
    }
  };
  protoOf(ElementMarker).eo = function () {
    var elementsCount = this.zn_1.gh();
    while (!equalsLong(this.bo_1, new Long(-1, -1))) {
      var index = countTrailingZeroBits(invert(this.bo_1));
      this.bo_1 = bitwiseOr(this.bo_1, shiftLeft(new Long(1, 0), index));
      if (this.ao_1(this.zn_1, index)) {
        return index;
      }
    }
    if (elementsCount > 64) {
      return nextUnmarkedHighIndex(this);
    }
    return -1;
  };
  function createSimpleEnumSerializer(serialName, values) {
    return new EnumSerializer(serialName, values);
  }
  function createUnmarkedDescriptor($this, serialName) {
    var d = new EnumDescriptor(serialName, $this.fo_1.length);
    // Inline function 'kotlin.collections.forEach' call
    var indexedObject = $this.fo_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var element = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      d.uo(element.y1_1);
    }
    return d;
  }
  function EnumSerializer$descriptor$delegate$lambda(this$0, $serialName) {
    return function () {
      var tmp0_elvis_lhs = this$0.go_1;
      return tmp0_elvis_lhs == null ? createUnmarkedDescriptor(this$0, $serialName) : tmp0_elvis_lhs;
    };
  }
  function EnumSerializer$_get_descriptor_$ref_j67dlw() {
    return constructCallableReference(function (p0) {
      return p0.xf();
    }, 1, 0, 2);
  }
  function EnumSerializer(serialName, values) {
    this.fo_1 = values;
    this.go_1 = null;
    var tmp = this;
    tmp.ho_1 = lazy_0(EnumSerializer$descriptor$delegate$lambda(this, serialName));
  }
  protoOf(EnumSerializer).xf = function () {
    var tmp0 = this.ho_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('descriptor', 1, tmp, EnumSerializer$_get_descriptor_$ref_j67dlw(), null);
    return tmp0.q1();
  };
  protoOf(EnumSerializer).vo = function (encoder, value) {
    var index = indexOf(this.fo_1, value);
    if (index === -1) {
      throw SerializationException_init_$Create$_0(toString(value) + ' is not a valid enum ' + this.xf().ug() + ', ' + ('must be one of ' + contentToString(this.fo_1)));
    }
    encoder.ck(this.xf(), index);
  };
  protoOf(EnumSerializer).yf = function (encoder, value) {
    return this.vo(encoder, value instanceof Enum ? value : THROW_CCE());
  };
  protoOf(EnumSerializer).zf = function (decoder) {
    var index = decoder.ti(this.xf());
    if (!(0 <= index ? index <= (this.fo_1.length - 1 | 0) : false)) {
      throw SerializationException_init_$Create$_0('' + index + ' is not among valid ' + this.xf().ug() + ' enum values, ' + ('values size is ' + this.fo_1.length));
    }
    return this.fo_1[index];
  };
  protoOf(EnumSerializer).toString = function () {
    return 'kotlinx.serialization.internal.EnumSerializer<' + this.xf().ug() + '>';
  };
  function _get_elementDescriptors__y23q9p($this) {
    var tmp0 = $this.jp_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('elementDescriptors', 1, tmp, EnumDescriptor$_get_elementDescriptors_$ref_5lvk4a(), null);
    return tmp0.q1();
  }
  function EnumDescriptor$elementDescriptors$delegate$lambda($elementsCount, $name, this$0) {
    return function () {
      var tmp = 0;
      var tmp_0 = $elementsCount;
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = Array(tmp_0);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        tmp_1[tmp_2] = buildSerialDescriptor($name + '.' + this$0.ih(tmp_2), OBJECT_getInstance(), []);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  function EnumDescriptor$_get_elementDescriptors_$ref_5lvk4a() {
    return constructCallableReference(function (p0) {
      return _get_elementDescriptors__y23q9p(p0);
    }, 1, 0, 3);
  }
  function EnumDescriptor(name, elementsCount) {
    PluginGeneratedSerialDescriptor.call(this, name, VOID, elementsCount);
    this.ip_1 = ENUM_getInstance();
    var tmp = this;
    tmp.jp_1 = lazy_0(EnumDescriptor$elementDescriptors$delegate$lambda(elementsCount, name, this));
  }
  protoOf(EnumDescriptor).eh = function () {
    return this.ip_1;
  };
  protoOf(EnumDescriptor).lh = function (index) {
    return getChecked(_get_elementDescriptors__y23q9p(this), index);
  };
  protoOf(EnumDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (other == null)
      return false;
    if (!(!(other == null) ? isInterface(other, SerialDescriptor) : false))
      return false;
    if (!(other.eh() === ENUM_getInstance()))
      return false;
    if (!(this.ug() === other.ug()))
      return false;
    if (!equals(cachedSerialNames(this), cachedSerialNames(other)))
      return false;
    return true;
  };
  protoOf(EnumDescriptor).toString = function () {
    return joinToString(get_elementNames(this), ', ', this.ug() + '(', ')');
  };
  protoOf(EnumDescriptor).hashCode = function () {
    var result = getStringHashCode(this.ug());
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 1;
    var _iterator__ex2g4s = get_elementNames(this).j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      var hash = accumulator;
      var tmp = imul(31, hash);
      // Inline function 'kotlin.hashCode' call
      var tmp1_elvis_lhs = element == null ? null : hashCode(element);
      accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    var elementsHashCode = accumulator;
    result = imul(31, result) + elementsHashCode | 0;
    return result;
  };
  function InlineClassDescriptor(name, generatedSerializer) {
    PluginGeneratedSerialDescriptor.call(this, name, generatedSerializer, 1);
    this.yp_1 = true;
  }
  protoOf(InlineClassDescriptor).fh = function () {
    return this.yp_1;
  };
  protoOf(InlineClassDescriptor).hashCode = function () {
    return imul(protoOf(PluginGeneratedSerialDescriptor).hashCode.call(this), 31);
  };
  protoOf(InlineClassDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof InlineClassDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.ug() === other.ug())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(other.yp_1 && contentEquals(this.kp(), other.kp()))) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.gh() === other.gh())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.gh();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.lh(index).ug() === other.lh(index).ug())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.lh(index).eh(), other.lh(index).eh())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  function InlinePrimitiveDescriptor(name, primitiveSerializer) {
    return new InlineClassDescriptor(name, new InlinePrimitiveDescriptor$1(primitiveSerializer));
  }
  function InlinePrimitiveDescriptor$1($primitiveSerializer) {
    this.zp_1 = $primitiveSerializer;
  }
  protoOf(InlinePrimitiveDescriptor$1).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.zp_1];
  };
  protoOf(InlinePrimitiveDescriptor$1).xf = function () {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).yf = function (encoder, value) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).zf = function (decoder) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  function jsonCachedSerialNames(_this__u8e3s4) {
    return cachedSerialNames(_this__u8e3s4);
  }
  function NoOpEncoder() {
    NoOpEncoder_instance = this;
    AbstractEncoder.call(this);
    this.cq_1 = EmptySerializersModule_0();
  }
  protoOf(NoOpEncoder).mj = function () {
    return this.cq_1;
  };
  protoOf(NoOpEncoder).rj = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).sj = function () {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).tj = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).uj = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).vj = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).wj = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).xj = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).yj = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).zj = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).ak = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).bk = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).ck = function (enumDescriptor, index) {
    return Unit_instance;
  };
  var NoOpEncoder_instance;
  function NoOpEncoder_getInstance() {
    if (NoOpEncoder_instance == null)
      new NoOpEncoder();
    return NoOpEncoder_instance;
  }
  function error($this) {
    throw IllegalStateException_init_$Create$('Descriptor for type `kotlin.Nothing` does not have elements');
  }
  function NothingSerialDescriptor() {
    NothingSerialDescriptor_instance = this;
    this.dq_1 = OBJECT_getInstance();
    this.eq_1 = 'kotlin.Nothing';
  }
  protoOf(NothingSerialDescriptor).eh = function () {
    return this.dq_1;
  };
  protoOf(NothingSerialDescriptor).ug = function () {
    return this.eq_1;
  };
  protoOf(NothingSerialDescriptor).gh = function () {
    return 0;
  };
  protoOf(NothingSerialDescriptor).ih = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).jh = function (name) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).mh = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).lh = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).kh = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).toString = function () {
    return 'NothingSerialDescriptor';
  };
  protoOf(NothingSerialDescriptor).equals = function (other) {
    return this === other;
  };
  protoOf(NothingSerialDescriptor).hashCode = function () {
    return getStringHashCode(this.eq_1) + imul(31, this.dq_1.hashCode()) | 0;
  };
  var NothingSerialDescriptor_instance;
  function NothingSerialDescriptor_getInstance() {
    if (NothingSerialDescriptor_instance == null)
      new NothingSerialDescriptor();
    return NothingSerialDescriptor_instance;
  }
  function NullableSerializer(serializer) {
    this.fq_1 = serializer;
    this.gq_1 = new SerialDescriptorForNullable(this.fq_1.xf());
  }
  protoOf(NullableSerializer).xf = function () {
    return this.gq_1;
  };
  protoOf(NullableSerializer).hq = function (encoder, value) {
    if (!(value == null)) {
      encoder.sk();
      encoder.pk(this.fq_1, value);
    } else {
      encoder.sj();
    }
  };
  protoOf(NullableSerializer).yf = function (encoder, value) {
    return this.hq(encoder, value);
  };
  protoOf(NullableSerializer).zf = function (decoder) {
    return decoder.ii() ? decoder.wi(this.fq_1) : decoder.ji();
  };
  protoOf(NullableSerializer).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof NullableSerializer))
      THROW_CCE();
    if (!equals(this.fq_1, other.fq_1))
      return false;
    return true;
  };
  protoOf(NullableSerializer).hashCode = function () {
    return hashCode(this.fq_1);
  };
  function SerialDescriptorForNullable(original) {
    this.ah_1 = original;
    this.bh_1 = this.ah_1.ug() + '?';
    this.ch_1 = cachedSerialNames(this.ah_1);
  }
  protoOf(SerialDescriptorForNullable).ug = function () {
    return this.bh_1;
  };
  protoOf(SerialDescriptorForNullable).gi = function () {
    return this.ch_1;
  };
  protoOf(SerialDescriptorForNullable).yg = function () {
    return true;
  };
  protoOf(SerialDescriptorForNullable).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SerialDescriptorForNullable))
      return false;
    if (!equals(this.ah_1, other.ah_1))
      return false;
    return true;
  };
  protoOf(SerialDescriptorForNullable).toString = function () {
    return toString(this.ah_1) + '?';
  };
  protoOf(SerialDescriptorForNullable).hashCode = function () {
    return imul(hashCode(this.ah_1), 31);
  };
  protoOf(SerialDescriptorForNullable).eh = function () {
    return this.ah_1.eh();
  };
  protoOf(SerialDescriptorForNullable).fh = function () {
    return this.ah_1.fh();
  };
  protoOf(SerialDescriptorForNullable).gh = function () {
    return this.ah_1.gh();
  };
  protoOf(SerialDescriptorForNullable).hh = function () {
    return this.ah_1.hh();
  };
  protoOf(SerialDescriptorForNullable).ih = function (index) {
    return this.ah_1.ih(index);
  };
  protoOf(SerialDescriptorForNullable).jh = function (name) {
    return this.ah_1.jh(name);
  };
  protoOf(SerialDescriptorForNullable).kh = function (index) {
    return this.ah_1.kh(index);
  };
  protoOf(SerialDescriptorForNullable).lh = function (index) {
    return this.ah_1.lh(index);
  };
  protoOf(SerialDescriptorForNullable).mh = function (index) {
    return this.ah_1.mh(index);
  };
  function ObjectSerializer_init_$Init$(serialName, objectInstance, classAnnotations, $this) {
    ObjectSerializer.call($this, serialName, objectInstance);
    $this.jq_1 = asList(classAnnotations);
    return $this;
  }
  function ObjectSerializer_init_$Create$(serialName, objectInstance, classAnnotations) {
    return ObjectSerializer_init_$Init$(serialName, objectInstance, classAnnotations, objectCreate(protoOf(ObjectSerializer)));
  }
  function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.kg_1 = this$0.jq_1;
      return Unit_instance;
    };
  }
  function ObjectSerializer$descriptor$delegate$lambda($serialName, this$0) {
    return function () {
      var tmp = OBJECT_getInstance();
      return buildSerialDescriptor($serialName, tmp, [], ObjectSerializer$descriptor$delegate$lambda$lambda(this$0));
    };
  }
  function ObjectSerializer$_get_descriptor_$ref_7z4xb6() {
    return constructCallableReference(function (p0) {
      return p0.xf();
    }, 1, 0, 4);
  }
  function ObjectSerializer(serialName, objectInstance) {
    this.iq_1 = objectInstance;
    this.jq_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.kq_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
  }
  protoOf(ObjectSerializer).xf = function () {
    var tmp0 = this.kq_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('descriptor', 1, tmp, ObjectSerializer$_get_descriptor_$ref_7z4xb6(), null);
    return tmp0.q1();
  };
  protoOf(ObjectSerializer).wg = function (encoder, value) {
    encoder.xi(this.xf()).yi(this.xf());
  };
  protoOf(ObjectSerializer).yf = function (encoder, value) {
    return this.wg(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(ObjectSerializer).zf = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.xf();
    var composite = decoder.xi(descriptor);
    var tmp$ret$1;
    $l$block_0: {
      if (composite.nj()) {
        tmp$ret$1 = Unit_instance;
        break $l$block_0;
      }
      var index = composite.oj(this.xf());
      if (index === -1) {
        tmp$ret$1 = Unit_instance;
        break $l$block_0;
      } else
        throw SerializationException_init_$Create$_0('Unexpected index ' + index);
    }
    var result = tmp$ret$1;
    composite.yi(descriptor);
    return this.iq_1;
  };
  function get_EMPTY_DESCRIPTOR_ARRAY() {
    _init_properties_Platform_common_kt__3qzecs();
    return EMPTY_DESCRIPTOR_ARRAY;
  }
  var EMPTY_DESCRIPTOR_ARRAY;
  function cachedSerialNames(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    if (isInterface(_this__u8e3s4, CachedNames))
      return _this__u8e3s4.gi();
    var result = HashSet_init_$Create$_0(_this__u8e3s4.gh());
    var inductionVariable = 0;
    var last = _this__u8e3s4.gh();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = _this__u8e3s4.ih(i);
        result.f(element);
      }
       while (inductionVariable < last);
    return result;
  }
  function compactArray(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    // Inline function 'kotlin.takeUnless' call
    var tmp;
    // Inline function 'kotlin.collections.isNullOrEmpty' call
    if (!(_this__u8e3s4 == null || _this__u8e3s4.p())) {
      tmp = _this__u8e3s4;
    } else {
      tmp = null;
    }
    var tmp0_safe_receiver = tmp;
    var tmp_0;
    if (tmp0_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.collections.toTypedArray' call
      tmp_0 = copyToArray(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp_0;
    return tmp1_elvis_lhs == null ? get_EMPTY_DESCRIPTOR_ARRAY() : tmp1_elvis_lhs;
  }
  var properties_initialized_Platform_common_kt_i7q4ty;
  function _init_properties_Platform_common_kt__3qzecs() {
    if (!properties_initialized_Platform_common_kt_i7q4ty) {
      properties_initialized_Platform_common_kt_i7q4ty = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_DESCRIPTOR_ARRAY = [];
    }
  }
  function throwMissingFieldException(seen, goldenMask, descriptor) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var missingFields = ArrayList_init_$Create$();
    var missingFieldsBits = goldenMask & ~seen;
    var inductionVariable = 0;
    if (inductionVariable < 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!((missingFieldsBits & 1) === 0)) {
          // Inline function 'kotlin.collections.plusAssign' call
          var element = descriptor.ih(i);
          missingFields.f(element);
        }
        missingFieldsBits = missingFieldsBits >>> 1 | 0;
      }
       while (inductionVariable < 32);
    throw MissingFieldException_init_$Create$(missingFields, descriptor.ug());
  }
  function _get_childSerializers__7vnyfa($this) {
    var tmp0 = $this.ro_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('childSerializers', 1, tmp, PluginGeneratedSerialDescriptor$_get_childSerializers_$ref_e7suca(), null);
    return tmp0.q1();
  }
  function _get__hashCode__tgwhef_0($this) {
    var tmp0 = $this.to_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('_hashCode', 1, tmp, PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz(), null);
    return tmp0.q1();
  }
  function buildIndices($this) {
    var indices = HashMap_init_$Create$();
    var inductionVariable = 0;
    var last = $this.mo_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.set' call
        var key = $this.mo_1[i];
        indices.x1(key, i);
      }
       while (inductionVariable <= last);
    return indices;
  }
  function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.jo_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.aq();
      return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
    };
  }
  function PluginGeneratedSerialDescriptor$_get_childSerializers_$ref_e7suca() {
    return constructCallableReference(function (p0) {
      return _get_childSerializers__7vnyfa(p0);
    }, 1, 0, 5);
  }
  function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.jo_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.bq();
      var tmp;
      if (tmp1_safe_receiver == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList_init_$Create$_0(tmp1_safe_receiver.length);
        var inductionVariable = 0;
        var last = tmp1_safe_receiver.length;
        while (inductionVariable < last) {
          var item = tmp1_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          var tmp$ret$2 = item.xf();
          destination.f(tmp$ret$2);
        }
        tmp = destination;
      }
      return compactArray(tmp);
    };
  }
  function PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka() {
    return constructCallableReference(function (p0) {
      return p0.kp();
    }, 1, 0, 6);
  }
  function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.kp());
    };
  }
  function PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz() {
    return constructCallableReference(function (p0) {
      return _get__hashCode__tgwhef_0(p0);
    }, 1, 0, 7);
  }
  function PluginGeneratedSerialDescriptor$toString$lambda(this$0) {
    return function (i) {
      return this$0.ih(i) + ': ' + this$0.lh(i).ug();
    };
  }
  function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
    generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
    this.io_1 = serialName;
    this.jo_1 = generatedSerializer;
    this.ko_1 = elementsCount;
    this.lo_1 = -1;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.ko_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = Array(tmp_1);
    while (tmp_0 < tmp_1) {
      tmp_2[tmp_0] = '[UNINITIALIZED]';
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.mo_1 = tmp_2;
    var tmp_3 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.ko_1;
    tmp_3.no_1 = Array(size);
    this.oo_1 = null;
    this.po_1 = booleanArray(this.ko_1);
    this.qo_1 = emptyMap();
    var tmp_4 = this;
    var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_4.ro_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
    var tmp_6 = this;
    var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_6.so_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
    var tmp_8 = this;
    var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_8.to_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
  }
  protoOf(PluginGeneratedSerialDescriptor).ug = function () {
    return this.io_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).gh = function () {
    return this.ko_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).eh = function () {
    return CLASS_getInstance();
  };
  protoOf(PluginGeneratedSerialDescriptor).hh = function () {
    var tmp0_elvis_lhs = this.oo_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).gi = function () {
    return this.qo_1.u1();
  };
  protoOf(PluginGeneratedSerialDescriptor).kp = function () {
    var tmp0 = this.so_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('typeParameterDescriptors', 1, tmp, PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka(), null);
    return tmp0.q1();
  };
  protoOf(PluginGeneratedSerialDescriptor).lp = function (name, isOptional) {
    this.lo_1 = this.lo_1 + 1 | 0;
    this.mo_1[this.lo_1] = name;
    this.po_1[this.lo_1] = isOptional;
    this.no_1[this.lo_1] = null;
    if (this.lo_1 === (this.ko_1 - 1 | 0)) {
      this.qo_1 = buildIndices(this);
    }
  };
  protoOf(PluginGeneratedSerialDescriptor).uo = function (name, isOptional, $super) {
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.lp(name, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.lp.call(this, name, isOptional);
    }
    return tmp;
  };
  protoOf(PluginGeneratedSerialDescriptor).lh = function (index) {
    return getChecked(_get_childSerializers__7vnyfa(this), index).xf();
  };
  protoOf(PluginGeneratedSerialDescriptor).mh = function (index) {
    return getChecked_0(this.po_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).kh = function (index) {
    var tmp0_elvis_lhs = getChecked(this.no_1, index);
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).ih = function (index) {
    return getChecked(this.mo_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).jh = function (name) {
    var tmp0_elvis_lhs = this.qo_1.t1(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof PluginGeneratedSerialDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.ug() === other.ug())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.kp(), other.kp())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.gh() === other.gh())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.gh();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.lh(index).ug() === other.lh(index).ug())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.lh(index).eh(), other.lh(index).eh())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(PluginGeneratedSerialDescriptor).hashCode = function () {
    return _get__hashCode__tgwhef_0(this);
  };
  protoOf(PluginGeneratedSerialDescriptor).toString = function () {
    var tmp = until(0, this.ko_1);
    var tmp_0 = this.ug() + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, PluginGeneratedSerialDescriptor$toString$lambda(this));
  };
  function hashCodeImpl(_this__u8e3s4, typeParams) {
    var result = getStringHashCode(_this__u8e3s4.ug());
    result = imul(31, result) + contentHashCode(typeParams) | 0;
    var elementDescriptors = get_elementDescriptors(_this__u8e3s4);
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 1;
    var _iterator__ex2g4s = elementDescriptors.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      var hash = accumulator;
      var tmp = imul(31, hash);
      // Inline function 'kotlin.hashCode' call
      var tmp0_safe_receiver = element.ug();
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
      accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    var namesHash = accumulator;
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator_0 = 1;
    var _iterator__ex2g4s_0 = elementDescriptors.j();
    while (_iterator__ex2g4s_0.k()) {
      var element_0 = _iterator__ex2g4s_0.l();
      var hash_0 = accumulator_0;
      var tmp_0 = imul(31, hash_0);
      // Inline function 'kotlin.hashCode' call
      var tmp0_safe_receiver_0 = element_0.eh();
      var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
      accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    }
    var kindHash = accumulator_0;
    result = imul(31, result) + namesHash | 0;
    result = imul(31, result) + kindHash | 0;
    return result;
  }
  function get_EMPTY_SERIALIZER_ARRAY() {
    _init_properties_PluginHelperInterfaces_kt__xgvzfp();
    return EMPTY_SERIALIZER_ARRAY;
  }
  var EMPTY_SERIALIZER_ARRAY;
  function GeneratedSerializer() {
  }
  var properties_initialized_PluginHelperInterfaces_kt_ap8in1;
  function _init_properties_PluginHelperInterfaces_kt__xgvzfp() {
    if (!properties_initialized_PluginHelperInterfaces_kt_ap8in1) {
      properties_initialized_PluginHelperInterfaces_kt_ap8in1 = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_SERIALIZER_ARRAY = [];
    }
  }
  function CharArraySerializer_0() {
    CharArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_8(Companion_getInstance_1()));
  }
  protoOf(CharArraySerializer_0).nq = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(CharArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.nq((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).oq = function (_this__u8e3s4) {
    return new CharArrayBuilder(_this__u8e3s4);
  };
  protoOf(CharArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.oq((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).tn = function () {
    return charArray(0);
  };
  protoOf(CharArraySerializer_0).pq = function (decoder, index, builder, checkIndex) {
    builder.sq(decoder.gj(this.kn_1, index));
  };
  protoOf(CharArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.pq(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.pq(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).tq = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.lk(this.kn_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(CharArraySerializer_0).vn = function (encoder, content, size) {
    return this.tq(encoder, (!(content == null) ? isCharArray(content) : false) ? content : THROW_CCE(), size);
  };
  var CharArraySerializer_instance;
  function CharArraySerializer_getInstance() {
    if (CharArraySerializer_instance == null)
      new CharArraySerializer_0();
    return CharArraySerializer_instance;
  }
  function DoubleArraySerializer_0() {
    DoubleArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_9(DoubleCompanionObject_instance));
  }
  protoOf(DoubleArraySerializer_0).wq = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(DoubleArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.wq((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).xq = function (_this__u8e3s4) {
    return new DoubleArrayBuilder(_this__u8e3s4);
  };
  protoOf(DoubleArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.xq((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).tn = function () {
    return new Float64Array(0);
  };
  protoOf(DoubleArraySerializer_0).yq = function (decoder, index, builder, checkIndex) {
    builder.br(decoder.fj(this.kn_1, index));
  };
  protoOf(DoubleArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.yq(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.yq(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).cr = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.kk(this.kn_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(DoubleArraySerializer_0).vn = function (encoder, content, size) {
    return this.cr(encoder, (!(content == null) ? isDoubleArray(content) : false) ? content : THROW_CCE(), size);
  };
  var DoubleArraySerializer_instance;
  function DoubleArraySerializer_getInstance() {
    if (DoubleArraySerializer_instance == null)
      new DoubleArraySerializer_0();
    return DoubleArraySerializer_instance;
  }
  function FloatArraySerializer_0() {
    FloatArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_10(FloatCompanionObject_instance));
  }
  protoOf(FloatArraySerializer_0).fr = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(FloatArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.fr((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).gr = function (_this__u8e3s4) {
    return new FloatArrayBuilder(_this__u8e3s4);
  };
  protoOf(FloatArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.gr((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).tn = function () {
    return new Float32Array(0);
  };
  protoOf(FloatArraySerializer_0).hr = function (decoder, index, builder, checkIndex) {
    builder.kr(decoder.ej(this.kn_1, index));
  };
  protoOf(FloatArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.hr(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.hr(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).lr = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.jk(this.kn_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(FloatArraySerializer_0).vn = function (encoder, content, size) {
    return this.lr(encoder, (!(content == null) ? isFloatArray(content) : false) ? content : THROW_CCE(), size);
  };
  var FloatArraySerializer_instance;
  function FloatArraySerializer_getInstance() {
    if (FloatArraySerializer_instance == null)
      new FloatArraySerializer_0();
    return FloatArraySerializer_instance;
  }
  function LongArraySerializer_0() {
    LongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_5(Companion_getInstance_2()));
  }
  protoOf(LongArraySerializer_0).or = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(LongArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.or((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).pr = function (_this__u8e3s4) {
    return new LongArrayBuilder(_this__u8e3s4);
  };
  protoOf(LongArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.pr((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).tn = function () {
    return longArray(0);
  };
  protoOf(LongArraySerializer_0).qr = function (decoder, index, builder, checkIndex) {
    builder.tr(decoder.dj(this.kn_1, index));
  };
  protoOf(LongArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.qr(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.qr(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).ur = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.ik(this.kn_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(LongArraySerializer_0).vn = function (encoder, content, size) {
    return this.ur(encoder, (!(content == null) ? isLongArray(content) : false) ? content : THROW_CCE(), size);
  };
  var LongArraySerializer_instance;
  function LongArraySerializer_getInstance() {
    if (LongArraySerializer_instance == null)
      new LongArraySerializer_0();
    return LongArraySerializer_instance;
  }
  function ULongArraySerializer_0() {
    ULongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_1(Companion_getInstance_3()));
  }
  protoOf(ULongArraySerializer_0).xr = function (_this__u8e3s4) {
    return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.xr(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.mf_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).yr = function (_this__u8e3s4) {
    return new ULongArrayBuilder(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.yr(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.mf_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).zr = function () {
    return _ULongArray___init__impl__twm1l3(0);
  };
  protoOf(ULongArraySerializer_0).tn = function () {
    return new ULongArray(this.zr());
  };
  protoOf(ULongArraySerializer_0).as = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.ij(this.kn_1, index).oi();
    var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
    builder.ds(tmp$ret$0);
  };
  protoOf(ULongArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.as(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.as(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).es = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.nk(this.kn_1, i);
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = ULongArray__get_impl_pr71q9(content, i);
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        tmp.xj(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(ULongArraySerializer_0).vn = function (encoder, content, size) {
    return this.es(encoder, content instanceof ULongArray ? content.mf_1 : THROW_CCE(), size);
  };
  var ULongArraySerializer_instance;
  function ULongArraySerializer_getInstance() {
    if (ULongArraySerializer_instance == null)
      new ULongArraySerializer_0();
    return ULongArraySerializer_instance;
  }
  function IntArraySerializer_0() {
    IntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_4(IntCompanionObject_instance));
  }
  protoOf(IntArraySerializer_0).hs = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(IntArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.hs((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).is = function (_this__u8e3s4) {
    return new IntArrayBuilder(_this__u8e3s4);
  };
  protoOf(IntArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.is((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).tn = function () {
    return new Int32Array(0);
  };
  protoOf(IntArraySerializer_0).js = function (decoder, index, builder, checkIndex) {
    builder.ms(decoder.cj(this.kn_1, index));
  };
  protoOf(IntArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.js(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.js(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).ns = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.hk(this.kn_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(IntArraySerializer_0).vn = function (encoder, content, size) {
    return this.ns(encoder, (!(content == null) ? isIntArray(content) : false) ? content : THROW_CCE(), size);
  };
  var IntArraySerializer_instance;
  function IntArraySerializer_getInstance() {
    if (IntArraySerializer_instance == null)
      new IntArraySerializer_0();
    return IntArraySerializer_instance;
  }
  function UIntArraySerializer_0() {
    UIntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_0(Companion_getInstance_4()));
  }
  protoOf(UIntArraySerializer_0).qs = function (_this__u8e3s4) {
    return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.qs(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.cf_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).rs = function (_this__u8e3s4) {
    return new UIntArrayBuilder(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.rs(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.cf_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).ss = function () {
    return _UIntArray___init__impl__ghjpc6(0);
  };
  protoOf(UIntArraySerializer_0).tn = function () {
    return new UIntArray(this.ss());
  };
  protoOf(UIntArraySerializer_0).ts = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.ij(this.kn_1, index).ni();
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
    builder.ws(tmp$ret$0);
  };
  protoOf(UIntArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.ts(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.ts(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).xs = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.nk(this.kn_1, i);
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = UIntArray__get_impl_gp5kza(content, i);
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        tmp.wj(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UIntArraySerializer_0).vn = function (encoder, content, size) {
    return this.xs(encoder, content instanceof UIntArray ? content.cf_1 : THROW_CCE(), size);
  };
  var UIntArraySerializer_instance;
  function UIntArraySerializer_getInstance() {
    if (UIntArraySerializer_instance == null)
      new UIntArraySerializer_0();
    return UIntArraySerializer_instance;
  }
  function ShortArraySerializer_0() {
    ShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_7(ShortCompanionObject_instance));
  }
  protoOf(ShortArraySerializer_0).at = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ShortArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.at((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).bt = function (_this__u8e3s4) {
    return new ShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(ShortArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.bt((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).tn = function () {
    return new Int16Array(0);
  };
  protoOf(ShortArraySerializer_0).ct = function (decoder, index, builder, checkIndex) {
    builder.ft(decoder.bj(this.kn_1, index));
  };
  protoOf(ShortArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.ct(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.ct(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).gt = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.gk(this.kn_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ShortArraySerializer_0).vn = function (encoder, content, size) {
    return this.gt(encoder, (!(content == null) ? isShortArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ShortArraySerializer_instance;
  function ShortArraySerializer_getInstance() {
    if (ShortArraySerializer_instance == null)
      new ShortArraySerializer_0();
    return ShortArraySerializer_instance;
  }
  function UShortArraySerializer_0() {
    UShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_3(Companion_getInstance_5()));
  }
  protoOf(UShortArraySerializer_0).jt = function (_this__u8e3s4) {
    return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.jt(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.wf_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).kt = function (_this__u8e3s4) {
    return new UShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.kt(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.wf_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).lt = function () {
    return _UShortArray___init__impl__9b26ef(0);
  };
  protoOf(UShortArraySerializer_0).tn = function () {
    return new UShortArray(this.lt());
  };
  protoOf(UShortArraySerializer_0).mt = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.ij(this.kn_1, index).mi();
    var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
    builder.pt(tmp$ret$0);
  };
  protoOf(UShortArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.mt(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.mt(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).qt = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.nk(this.kn_1, i);
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = UShortArray__get_impl_fnbhmx(content, i);
        var tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        tmp.vj(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UShortArraySerializer_0).vn = function (encoder, content, size) {
    return this.qt(encoder, content instanceof UShortArray ? content.wf_1 : THROW_CCE(), size);
  };
  var UShortArraySerializer_instance;
  function UShortArraySerializer_getInstance() {
    if (UShortArraySerializer_instance == null)
      new UShortArraySerializer_0();
    return UShortArraySerializer_instance;
  }
  function ByteArraySerializer_0() {
    ByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_6(ByteCompanionObject_instance));
  }
  protoOf(ByteArraySerializer_0).tt = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ByteArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.tt((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).ut = function (_this__u8e3s4) {
    return new ByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(ByteArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.ut((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).tn = function () {
    return new Int8Array(0);
  };
  protoOf(ByteArraySerializer_0).vt = function (decoder, index, builder, checkIndex) {
    builder.yt(decoder.aj(this.kn_1, index));
  };
  protoOf(ByteArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.vt(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.vt(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).zt = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.fk(this.kn_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ByteArraySerializer_0).vn = function (encoder, content, size) {
    return this.zt(encoder, (!(content == null) ? isByteArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ByteArraySerializer_instance;
  function ByteArraySerializer_getInstance() {
    if (ByteArraySerializer_instance == null)
      new ByteArraySerializer_0();
    return ByteArraySerializer_instance;
  }
  function UByteArraySerializer_0() {
    UByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_2(Companion_getInstance_6()));
  }
  protoOf(UByteArraySerializer_0).cu = function (_this__u8e3s4) {
    return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.cu(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.se_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).du = function (_this__u8e3s4) {
    return new UByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.du(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.se_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).eu = function () {
    return _UByteArray___init__impl__ip4y9n(0);
  };
  protoOf(UByteArraySerializer_0).tn = function () {
    return new UByteArray(this.eu());
  };
  protoOf(UByteArraySerializer_0).fu = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.ij(this.kn_1, index).li();
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
    builder.iu(tmp$ret$0);
  };
  protoOf(UByteArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.fu(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.fu(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).ju = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.nk(this.kn_1, i);
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = UByteArray__get_impl_t5f3hv(content, i);
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        tmp.uj(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UByteArraySerializer_0).vn = function (encoder, content, size) {
    return this.ju(encoder, content instanceof UByteArray ? content.se_1 : THROW_CCE(), size);
  };
  var UByteArraySerializer_instance;
  function UByteArraySerializer_getInstance() {
    if (UByteArraySerializer_instance == null)
      new UByteArraySerializer_0();
    return UByteArraySerializer_instance;
  }
  function BooleanArraySerializer_0() {
    BooleanArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_11(BooleanCompanionObject_instance));
  }
  protoOf(BooleanArraySerializer_0).mu = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(BooleanArraySerializer_0).ym = function (_this__u8e3s4) {
    return this.mu((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).nu = function (_this__u8e3s4) {
    return new BooleanArrayBuilder(_this__u8e3s4);
  };
  protoOf(BooleanArraySerializer_0).zl = function (_this__u8e3s4) {
    return this.nu((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).tn = function () {
    return booleanArray(0);
  };
  protoOf(BooleanArraySerializer_0).ou = function (decoder, index, builder, checkIndex) {
    builder.ru(decoder.zi(this.kn_1, index));
  };
  protoOf(BooleanArraySerializer_0).km = function (decoder, index, builder, checkIndex) {
    return this.ou(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).un = function (decoder, index, builder, checkIndex) {
    return this.ou(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).su = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.ek(this.kn_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(BooleanArraySerializer_0).vn = function (encoder, content, size) {
    return this.su(encoder, (!(content == null) ? isBooleanArray(content) : false) ? content : THROW_CCE(), size);
  };
  var BooleanArraySerializer_instance;
  function BooleanArraySerializer_getInstance() {
    if (BooleanArraySerializer_instance == null)
      new BooleanArraySerializer_0();
    return BooleanArraySerializer_instance;
  }
  function CharArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.qq_1 = bufferWithData;
    this.rq_1 = bufferWithData.length;
    this.qn(10);
  }
  protoOf(CharArrayBuilder).mn = function () {
    return this.rq_1;
  };
  protoOf(CharArrayBuilder).qn = function (requiredCapacity) {
    if (this.qq_1.length < requiredCapacity)
      this.qq_1 = copyOf(this.qq_1, coerceAtLeast(requiredCapacity, imul(this.qq_1.length, 2)));
  };
  protoOf(CharArrayBuilder).sq = function (c) {
    this.xn();
    var tmp = this.qq_1;
    var _unary__edvuaz = this.rq_1;
    this.rq_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(CharArrayBuilder).on = function () {
    return copyOf(this.qq_1, this.rq_1);
  };
  function DoubleArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.zq_1 = bufferWithData;
    this.ar_1 = bufferWithData.length;
    this.qn(10);
  }
  protoOf(DoubleArrayBuilder).mn = function () {
    return this.ar_1;
  };
  protoOf(DoubleArrayBuilder).qn = function (requiredCapacity) {
    if (this.zq_1.length < requiredCapacity)
      this.zq_1 = copyOf_0(this.zq_1, coerceAtLeast(requiredCapacity, imul(this.zq_1.length, 2)));
  };
  protoOf(DoubleArrayBuilder).br = function (c) {
    this.xn();
    var tmp = this.zq_1;
    var _unary__edvuaz = this.ar_1;
    this.ar_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(DoubleArrayBuilder).on = function () {
    return copyOf_0(this.zq_1, this.ar_1);
  };
  function FloatArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.ir_1 = bufferWithData;
    this.jr_1 = bufferWithData.length;
    this.qn(10);
  }
  protoOf(FloatArrayBuilder).mn = function () {
    return this.jr_1;
  };
  protoOf(FloatArrayBuilder).qn = function (requiredCapacity) {
    if (this.ir_1.length < requiredCapacity)
      this.ir_1 = copyOf_1(this.ir_1, coerceAtLeast(requiredCapacity, imul(this.ir_1.length, 2)));
  };
  protoOf(FloatArrayBuilder).kr = function (c) {
    this.xn();
    var tmp = this.ir_1;
    var _unary__edvuaz = this.jr_1;
    this.jr_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(FloatArrayBuilder).on = function () {
    return copyOf_1(this.ir_1, this.jr_1);
  };
  function LongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.rr_1 = bufferWithData;
    this.sr_1 = bufferWithData.length;
    this.qn(10);
  }
  protoOf(LongArrayBuilder).mn = function () {
    return this.sr_1;
  };
  protoOf(LongArrayBuilder).qn = function (requiredCapacity) {
    if (this.rr_1.length < requiredCapacity)
      this.rr_1 = copyOf_2(this.rr_1, coerceAtLeast(requiredCapacity, imul(this.rr_1.length, 2)));
  };
  protoOf(LongArrayBuilder).tr = function (c) {
    this.xn();
    var tmp = this.rr_1;
    var _unary__edvuaz = this.sr_1;
    this.sr_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(LongArrayBuilder).on = function () {
    return copyOf_2(this.rr_1, this.sr_1);
  };
  function ULongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.bs_1 = bufferWithData;
    this.cs_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
    this.qn(10);
  }
  protoOf(ULongArrayBuilder).mn = function () {
    return this.cs_1;
  };
  protoOf(ULongArrayBuilder).qn = function (requiredCapacity) {
    if (_ULongArray___get_size__impl__ju6dtr(this.bs_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.bs_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.bs_1), 2));
      tmp.bs_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
    }
  };
  protoOf(ULongArrayBuilder).ds = function (c) {
    this.xn();
    var tmp = this.bs_1;
    var _unary__edvuaz = this.cs_1;
    this.cs_1 = _unary__edvuaz + 1 | 0;
    ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
  };
  protoOf(ULongArrayBuilder).tu = function () {
    var tmp0 = this.bs_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.cs_1;
    return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
  };
  protoOf(ULongArrayBuilder).on = function () {
    return new ULongArray(this.tu());
  };
  function IntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.ks_1 = bufferWithData;
    this.ls_1 = bufferWithData.length;
    this.qn(10);
  }
  protoOf(IntArrayBuilder).mn = function () {
    return this.ls_1;
  };
  protoOf(IntArrayBuilder).qn = function (requiredCapacity) {
    if (this.ks_1.length < requiredCapacity)
      this.ks_1 = copyOf_3(this.ks_1, coerceAtLeast(requiredCapacity, imul(this.ks_1.length, 2)));
  };
  protoOf(IntArrayBuilder).ms = function (c) {
    this.xn();
    var tmp = this.ks_1;
    var _unary__edvuaz = this.ls_1;
    this.ls_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(IntArrayBuilder).on = function () {
    return copyOf_3(this.ks_1, this.ls_1);
  };
  function UIntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.us_1 = bufferWithData;
    this.vs_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
    this.qn(10);
  }
  protoOf(UIntArrayBuilder).mn = function () {
    return this.vs_1;
  };
  protoOf(UIntArrayBuilder).qn = function (requiredCapacity) {
    if (_UIntArray___get_size__impl__r6l8ci(this.us_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.us_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.us_1), 2));
      tmp.us_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
    }
  };
  protoOf(UIntArrayBuilder).ws = function (c) {
    this.xn();
    var tmp = this.us_1;
    var _unary__edvuaz = this.vs_1;
    this.vs_1 = _unary__edvuaz + 1 | 0;
    UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
  };
  protoOf(UIntArrayBuilder).uu = function () {
    var tmp0 = this.us_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.vs_1;
    return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
  };
  protoOf(UIntArrayBuilder).on = function () {
    return new UIntArray(this.uu());
  };
  function ShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.dt_1 = bufferWithData;
    this.et_1 = bufferWithData.length;
    this.qn(10);
  }
  protoOf(ShortArrayBuilder).mn = function () {
    return this.et_1;
  };
  protoOf(ShortArrayBuilder).qn = function (requiredCapacity) {
    if (this.dt_1.length < requiredCapacity)
      this.dt_1 = copyOf_4(this.dt_1, coerceAtLeast(requiredCapacity, imul(this.dt_1.length, 2)));
  };
  protoOf(ShortArrayBuilder).ft = function (c) {
    this.xn();
    var tmp = this.dt_1;
    var _unary__edvuaz = this.et_1;
    this.et_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ShortArrayBuilder).on = function () {
    return copyOf_4(this.dt_1, this.et_1);
  };
  function UShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.nt_1 = bufferWithData;
    this.ot_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
    this.qn(10);
  }
  protoOf(UShortArrayBuilder).mn = function () {
    return this.ot_1;
  };
  protoOf(UShortArrayBuilder).qn = function (requiredCapacity) {
    if (_UShortArray___get_size__impl__jqto1b(this.nt_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.nt_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.nt_1), 2));
      tmp.nt_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
    }
  };
  protoOf(UShortArrayBuilder).pt = function (c) {
    this.xn();
    var tmp = this.nt_1;
    var _unary__edvuaz = this.ot_1;
    this.ot_1 = _unary__edvuaz + 1 | 0;
    UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
  };
  protoOf(UShortArrayBuilder).vu = function () {
    var tmp0 = this.nt_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.ot_1;
    return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
  };
  protoOf(UShortArrayBuilder).on = function () {
    return new UShortArray(this.vu());
  };
  function ByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.wt_1 = bufferWithData;
    this.xt_1 = bufferWithData.length;
    this.qn(10);
  }
  protoOf(ByteArrayBuilder).mn = function () {
    return this.xt_1;
  };
  protoOf(ByteArrayBuilder).qn = function (requiredCapacity) {
    if (this.wt_1.length < requiredCapacity)
      this.wt_1 = copyOf_5(this.wt_1, coerceAtLeast(requiredCapacity, imul(this.wt_1.length, 2)));
  };
  protoOf(ByteArrayBuilder).yt = function (c) {
    this.xn();
    var tmp = this.wt_1;
    var _unary__edvuaz = this.xt_1;
    this.xt_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ByteArrayBuilder).on = function () {
    return copyOf_5(this.wt_1, this.xt_1);
  };
  function UByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.gu_1 = bufferWithData;
    this.hu_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
    this.qn(10);
  }
  protoOf(UByteArrayBuilder).mn = function () {
    return this.hu_1;
  };
  protoOf(UByteArrayBuilder).qn = function (requiredCapacity) {
    if (_UByteArray___get_size__impl__h6pkdv(this.gu_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.gu_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.gu_1), 2));
      tmp.gu_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
    }
  };
  protoOf(UByteArrayBuilder).iu = function (c) {
    this.xn();
    var tmp = this.gu_1;
    var _unary__edvuaz = this.hu_1;
    this.hu_1 = _unary__edvuaz + 1 | 0;
    UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
  };
  protoOf(UByteArrayBuilder).wu = function () {
    var tmp0 = this.gu_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.hu_1;
    return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
  };
  protoOf(UByteArrayBuilder).on = function () {
    return new UByteArray(this.wu());
  };
  function BooleanArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.pu_1 = bufferWithData;
    this.qu_1 = bufferWithData.length;
    this.qn(10);
  }
  protoOf(BooleanArrayBuilder).mn = function () {
    return this.qu_1;
  };
  protoOf(BooleanArrayBuilder).qn = function (requiredCapacity) {
    if (this.pu_1.length < requiredCapacity)
      this.pu_1 = copyOf_6(this.pu_1, coerceAtLeast(requiredCapacity, imul(this.pu_1.length, 2)));
  };
  protoOf(BooleanArrayBuilder).ru = function (c) {
    this.xn();
    var tmp = this.pu_1;
    var _unary__edvuaz = this.qu_1;
    this.qu_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(BooleanArrayBuilder).on = function () {
    return copyOf_6(this.pu_1, this.qu_1);
  };
  function get_BUILTIN_SERIALIZERS() {
    _init_properties_Primitives_kt__k0eto4();
    return BUILTIN_SERIALIZERS;
  }
  var BUILTIN_SERIALIZERS;
  function FloatSerializer() {
    FloatSerializer_instance = this;
    this.xu_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
  }
  protoOf(FloatSerializer).xf = function () {
    return this.xu_1;
  };
  protoOf(FloatSerializer).yu = function (encoder, value) {
    return encoder.yj(value);
  };
  protoOf(FloatSerializer).yf = function (encoder, value) {
    return this.yu(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(FloatSerializer).zf = function (decoder) {
    return decoder.pi();
  };
  var FloatSerializer_instance;
  function FloatSerializer_getInstance() {
    if (FloatSerializer_instance == null)
      new FloatSerializer();
    return FloatSerializer_instance;
  }
  function StringSerializer() {
    StringSerializer_instance = this;
    this.zu_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
  }
  protoOf(StringSerializer).xf = function () {
    return this.zu_1;
  };
  protoOf(StringSerializer).av = function (encoder, value) {
    return encoder.bk(value);
  };
  protoOf(StringSerializer).yf = function (encoder, value) {
    return this.av(encoder, (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
  };
  protoOf(StringSerializer).zf = function (decoder) {
    return decoder.si();
  };
  var StringSerializer_instance;
  function StringSerializer_getInstance() {
    if (StringSerializer_instance == null)
      new StringSerializer();
    return StringSerializer_instance;
  }
  function error_0($this) {
    throw IllegalStateException_init_$Create$('Primitive descriptor ' + $this.bv_1 + ' does not have elements');
  }
  function PrimitiveSerialDescriptor_0(serialName, kind) {
    this.bv_1 = serialName;
    this.cv_1 = kind;
  }
  protoOf(PrimitiveSerialDescriptor_0).ug = function () {
    return this.bv_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).eh = function () {
    return this.cv_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).gh = function () {
    return 0;
  };
  protoOf(PrimitiveSerialDescriptor_0).ih = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).jh = function (name) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).mh = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).lh = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).kh = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).toString = function () {
    return 'PrimitiveDescriptor(' + this.bv_1 + ')';
  };
  protoOf(PrimitiveSerialDescriptor_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PrimitiveSerialDescriptor_0))
      return false;
    if (this.bv_1 === other.bv_1 && equals(this.cv_1, other.cv_1))
      return true;
    return false;
  };
  protoOf(PrimitiveSerialDescriptor_0).hashCode = function () {
    return getStringHashCode(this.bv_1) + imul(31, this.cv_1.hashCode()) | 0;
  };
  function IntSerializer() {
    IntSerializer_instance = this;
    this.dv_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
  }
  protoOf(IntSerializer).xf = function () {
    return this.dv_1;
  };
  protoOf(IntSerializer).ev = function (encoder, value) {
    return encoder.wj(value);
  };
  protoOf(IntSerializer).yf = function (encoder, value) {
    return this.ev(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(IntSerializer).zf = function (decoder) {
    return decoder.ni();
  };
  var IntSerializer_instance;
  function IntSerializer_getInstance() {
    if (IntSerializer_instance == null)
      new IntSerializer();
    return IntSerializer_instance;
  }
  function LongSerializer() {
    LongSerializer_instance = this;
    this.fv_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
  }
  protoOf(LongSerializer).xf = function () {
    return this.fv_1;
  };
  protoOf(LongSerializer).gv = function (encoder, value) {
    return encoder.xj(value);
  };
  protoOf(LongSerializer).yf = function (encoder, value) {
    return this.gv(encoder, value instanceof Long ? value : THROW_CCE());
  };
  protoOf(LongSerializer).zf = function (decoder) {
    return decoder.oi();
  };
  var LongSerializer_instance;
  function LongSerializer_getInstance() {
    if (LongSerializer_instance == null)
      new LongSerializer();
    return LongSerializer_instance;
  }
  function ByteSerializer() {
    ByteSerializer_instance = this;
    this.hv_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
  }
  protoOf(ByteSerializer).xf = function () {
    return this.hv_1;
  };
  protoOf(ByteSerializer).iv = function (encoder, value) {
    return encoder.uj(value);
  };
  protoOf(ByteSerializer).yf = function (encoder, value) {
    return this.iv(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ByteSerializer).zf = function (decoder) {
    return decoder.li();
  };
  var ByteSerializer_instance;
  function ByteSerializer_getInstance() {
    if (ByteSerializer_instance == null)
      new ByteSerializer();
    return ByteSerializer_instance;
  }
  function ShortSerializer() {
    ShortSerializer_instance = this;
    this.jv_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
  }
  protoOf(ShortSerializer).xf = function () {
    return this.jv_1;
  };
  protoOf(ShortSerializer).kv = function (encoder, value) {
    return encoder.vj(value);
  };
  protoOf(ShortSerializer).yf = function (encoder, value) {
    return this.kv(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ShortSerializer).zf = function (decoder) {
    return decoder.mi();
  };
  var ShortSerializer_instance;
  function ShortSerializer_getInstance() {
    if (ShortSerializer_instance == null)
      new ShortSerializer();
    return ShortSerializer_instance;
  }
  function CharSerializer() {
    CharSerializer_instance = this;
    this.lv_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
  }
  protoOf(CharSerializer).xf = function () {
    return this.lv_1;
  };
  protoOf(CharSerializer).mv = function (encoder, value) {
    return encoder.ak(value);
  };
  protoOf(CharSerializer).yf = function (encoder, value) {
    return this.mv(encoder, value instanceof Char ? value.b1_1 : THROW_CCE());
  };
  protoOf(CharSerializer).nv = function (decoder) {
    return decoder.ri();
  };
  protoOf(CharSerializer).zf = function (decoder) {
    return new Char(this.nv(decoder));
  };
  var CharSerializer_instance;
  function CharSerializer_getInstance() {
    if (CharSerializer_instance == null)
      new CharSerializer();
    return CharSerializer_instance;
  }
  function DoubleSerializer() {
    DoubleSerializer_instance = this;
    this.ov_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
  }
  protoOf(DoubleSerializer).xf = function () {
    return this.ov_1;
  };
  protoOf(DoubleSerializer).pv = function (encoder, value) {
    return encoder.zj(value);
  };
  protoOf(DoubleSerializer).yf = function (encoder, value) {
    return this.pv(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(DoubleSerializer).zf = function (decoder) {
    return decoder.qi();
  };
  var DoubleSerializer_instance;
  function DoubleSerializer_getInstance() {
    if (DoubleSerializer_instance == null)
      new DoubleSerializer();
    return DoubleSerializer_instance;
  }
  function BooleanSerializer() {
    BooleanSerializer_instance = this;
    this.qv_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
  }
  protoOf(BooleanSerializer).xf = function () {
    return this.qv_1;
  };
  protoOf(BooleanSerializer).rv = function (encoder, value) {
    return encoder.tj(value);
  };
  protoOf(BooleanSerializer).yf = function (encoder, value) {
    return this.rv(encoder, (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE());
  };
  protoOf(BooleanSerializer).zf = function (decoder) {
    return decoder.ki();
  };
  var BooleanSerializer_instance;
  function BooleanSerializer_getInstance() {
    if (BooleanSerializer_instance == null)
      new BooleanSerializer();
    return BooleanSerializer_instance;
  }
  function UnitSerializer() {
    UnitSerializer_instance = this;
    this.sv_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
  }
  protoOf(UnitSerializer).xf = function () {
    return this.sv_1.xf();
  };
  protoOf(UnitSerializer).tv = function (encoder, value) {
    this.sv_1.wg(encoder, Unit_instance);
  };
  protoOf(UnitSerializer).yf = function (encoder, value) {
    return this.tv(encoder, value instanceof Unit ? value : THROW_CCE());
  };
  protoOf(UnitSerializer).uv = function (decoder) {
    this.sv_1.zf(decoder);
  };
  protoOf(UnitSerializer).zf = function (decoder) {
    this.uv(decoder);
    return Unit_instance;
  };
  var UnitSerializer_instance;
  function UnitSerializer_getInstance() {
    if (UnitSerializer_instance == null)
      new UnitSerializer();
    return UnitSerializer_instance;
  }
  function PrimitiveDescriptorSafe(serialName, kind) {
    _init_properties_Primitives_kt__k0eto4();
    checkNameIsNotAPrimitive(serialName);
    return new PrimitiveSerialDescriptor_0(serialName, kind);
  }
  function checkNameIsNotAPrimitive(serialName) {
    _init_properties_Primitives_kt__k0eto4();
    var values = get_BUILTIN_SERIALIZERS().v1();
    var _iterator__ex2g4s = values.j();
    while (_iterator__ex2g4s.k()) {
      var primitive = _iterator__ex2g4s.l();
      var primitiveName = primitive.xf().ug();
      if (serialName === primitiveName) {
        throw IllegalArgumentException_init_$Create$(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exists ' + getKClassFromExpression(primitive).a8() + '.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
      }
    }
  }
  var properties_initialized_Primitives_kt_6dpii6;
  function _init_properties_Primitives_kt__k0eto4() {
    if (!properties_initialized_Primitives_kt_6dpii6) {
      properties_initialized_Primitives_kt_6dpii6 = true;
      BUILTIN_SERIALIZERS = initBuiltins();
    }
  }
  function NamedValueDecoder() {
    TaggedDecoder.call(this);
  }
  protoOf(NamedValueDecoder).xv = function (_this__u8e3s4, index) {
    return this.zv(this.yv(_this__u8e3s4, index));
  };
  protoOf(NamedValueDecoder).zv = function (nestedName) {
    var tmp0_elvis_lhs = this.cw();
    return this.dw(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueDecoder).yv = function (descriptor, index) {
    return descriptor.ih(index);
  };
  protoOf(NamedValueDecoder).dw = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  protoOf(NamedValueDecoder).ew = function () {
    return this.aw_1.p() ? '$' : joinToString(this.aw_1, '.', '$.');
  };
  function tagBlock($this, tag, block) {
    $this.sw(tag);
    var r = block();
    if (!$this.bw_1) {
      $this.tw();
    }
    $this.bw_1 = false;
    return r;
  }
  function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      return this$0.vi($deserializer, $previousValue);
    };
  }
  function TaggedDecoder$decodeNullableSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      var tmp0 = this$0;
      // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
      var isNullabilitySupported = $deserializer.xf().yg();
      var tmp;
      if (isNullabilitySupported || tmp0.ii()) {
        tmp = this$0.vi($deserializer, $previousValue);
      } else {
        tmp = tmp0.ji();
      }
      return tmp;
    };
  }
  function TaggedDecoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.aw_1 = ArrayList_init_$Create$();
    this.bw_1 = false;
  }
  protoOf(TaggedDecoder).mj = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedDecoder).fw = function (tag) {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(TaggedDecoder).gw = function (tag) {
    return true;
  };
  protoOf(TaggedDecoder).hw = function (tag) {
    var tmp = this.fw(tag);
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).iw = function (tag) {
    var tmp = this.fw(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).jw = function (tag) {
    var tmp = this.fw(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).kw = function (tag) {
    var tmp = this.fw(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).lw = function (tag) {
    var tmp = this.fw(tag);
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).mw = function (tag) {
    var tmp = this.fw(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).nw = function (tag) {
    var tmp = this.fw(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).ow = function (tag) {
    var tmp = this.fw(tag);
    return tmp instanceof Char ? tmp.b1_1 : THROW_CCE();
  };
  protoOf(TaggedDecoder).pw = function (tag) {
    var tmp = this.fw(tag);
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).qw = function (tag, enumDescriptor) {
    var tmp = this.fw(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).rw = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.sw(tag);
    return this;
  };
  protoOf(TaggedDecoder).vi = function (deserializer, previousValue) {
    return this.wi(deserializer);
  };
  protoOf(TaggedDecoder).ui = function (descriptor) {
    return this.rw(this.tw(), descriptor);
  };
  protoOf(TaggedDecoder).ii = function () {
    var tmp0_elvis_lhs = this.cw();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var currentTag = tmp;
    return this.gw(currentTag);
  };
  protoOf(TaggedDecoder).ji = function () {
    return null;
  };
  protoOf(TaggedDecoder).ki = function () {
    return this.hw(this.tw());
  };
  protoOf(TaggedDecoder).li = function () {
    return this.iw(this.tw());
  };
  protoOf(TaggedDecoder).mi = function () {
    return this.jw(this.tw());
  };
  protoOf(TaggedDecoder).ni = function () {
    return this.kw(this.tw());
  };
  protoOf(TaggedDecoder).oi = function () {
    return this.lw(this.tw());
  };
  protoOf(TaggedDecoder).pi = function () {
    return this.mw(this.tw());
  };
  protoOf(TaggedDecoder).qi = function () {
    return this.nw(this.tw());
  };
  protoOf(TaggedDecoder).ri = function () {
    return this.ow(this.tw());
  };
  protoOf(TaggedDecoder).si = function () {
    return this.pw(this.tw());
  };
  protoOf(TaggedDecoder).ti = function (enumDescriptor) {
    return this.qw(this.tw(), enumDescriptor);
  };
  protoOf(TaggedDecoder).xi = function (descriptor) {
    return this;
  };
  protoOf(TaggedDecoder).yi = function (descriptor) {
  };
  protoOf(TaggedDecoder).zi = function (descriptor, index) {
    return this.hw(this.xv(descriptor, index));
  };
  protoOf(TaggedDecoder).aj = function (descriptor, index) {
    return this.iw(this.xv(descriptor, index));
  };
  protoOf(TaggedDecoder).bj = function (descriptor, index) {
    return this.jw(this.xv(descriptor, index));
  };
  protoOf(TaggedDecoder).cj = function (descriptor, index) {
    return this.kw(this.xv(descriptor, index));
  };
  protoOf(TaggedDecoder).dj = function (descriptor, index) {
    return this.lw(this.xv(descriptor, index));
  };
  protoOf(TaggedDecoder).ej = function (descriptor, index) {
    return this.mw(this.xv(descriptor, index));
  };
  protoOf(TaggedDecoder).fj = function (descriptor, index) {
    return this.nw(this.xv(descriptor, index));
  };
  protoOf(TaggedDecoder).gj = function (descriptor, index) {
    return this.ow(this.xv(descriptor, index));
  };
  protoOf(TaggedDecoder).hj = function (descriptor, index) {
    return this.pw(this.xv(descriptor, index));
  };
  protoOf(TaggedDecoder).ij = function (descriptor, index) {
    return this.rw(this.xv(descriptor, index), descriptor.lh(index));
  };
  protoOf(TaggedDecoder).jj = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.xv(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).lj = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.xv(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeNullableSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).cw = function () {
    return lastOrNull(this.aw_1);
  };
  protoOf(TaggedDecoder).sw = function (name) {
    this.aw_1.f(name);
  };
  protoOf(TaggedDecoder).tw = function () {
    var r = this.aw_1.a3(get_lastIndex_0(this.aw_1));
    this.bw_1 = true;
    return r;
  };
  function UIntSerializer() {
    UIntSerializer_instance = this;
    this.uw_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_4(IntCompanionObject_instance));
  }
  protoOf(UIntSerializer).xf = function () {
    return this.uw_1;
  };
  protoOf(UIntSerializer).vw = function (encoder, value) {
    var tmp = encoder.dk(this.uw_1);
    // Inline function 'kotlin.UInt.toInt' call
    var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(value);
    tmp.wj(tmp$ret$0);
  };
  protoOf(UIntSerializer).yf = function (encoder, value) {
    return this.vw(encoder, value instanceof UInt ? value.xe_1 : THROW_CCE());
  };
  protoOf(UIntSerializer).ww = function (decoder) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.ui(this.uw_1).ni();
    return _UInt___init__impl__l7qpdl(this_0);
  };
  protoOf(UIntSerializer).zf = function (decoder) {
    return new UInt(this.ww(decoder));
  };
  var UIntSerializer_instance;
  function UIntSerializer_getInstance() {
    if (UIntSerializer_instance == null)
      new UIntSerializer();
    return UIntSerializer_instance;
  }
  function ULongSerializer() {
    ULongSerializer_instance = this;
    this.xw_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_5(Companion_getInstance_2()));
  }
  protoOf(ULongSerializer).xf = function () {
    return this.xw_1;
  };
  protoOf(ULongSerializer).yw = function (encoder, value) {
    var tmp = encoder.dk(this.xw_1);
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$0 = _ULong___get_data__impl__fggpzb(value);
    tmp.xj(tmp$ret$0);
  };
  protoOf(ULongSerializer).yf = function (encoder, value) {
    return this.yw(encoder, value instanceof ULong ? value.hf_1 : THROW_CCE());
  };
  protoOf(ULongSerializer).zw = function (decoder) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.ui(this.xw_1).oi();
    return _ULong___init__impl__c78o9k(this_0);
  };
  protoOf(ULongSerializer).zf = function (decoder) {
    return new ULong(this.zw(decoder));
  };
  var ULongSerializer_instance;
  function ULongSerializer_getInstance() {
    if (ULongSerializer_instance == null)
      new ULongSerializer();
    return ULongSerializer_instance;
  }
  function UByteSerializer() {
    UByteSerializer_instance = this;
    this.ax_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_6(ByteCompanionObject_instance));
  }
  protoOf(UByteSerializer).xf = function () {
    return this.ax_1;
  };
  protoOf(UByteSerializer).bx = function (encoder, value) {
    var tmp = encoder.dk(this.ax_1);
    // Inline function 'kotlin.UByte.toByte' call
    var tmp$ret$0 = _UByte___get_data__impl__jof9qr(value);
    tmp.uj(tmp$ret$0);
  };
  protoOf(UByteSerializer).yf = function (encoder, value) {
    return this.bx(encoder, value instanceof UByte ? value.ne_1 : THROW_CCE());
  };
  protoOf(UByteSerializer).cx = function (decoder) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.ui(this.ax_1).li();
    return _UByte___init__impl__g9hnc4(this_0);
  };
  protoOf(UByteSerializer).zf = function (decoder) {
    return new UByte(this.cx(decoder));
  };
  var UByteSerializer_instance;
  function UByteSerializer_getInstance() {
    if (UByteSerializer_instance == null)
      new UByteSerializer();
    return UByteSerializer_instance;
  }
  function UShortSerializer() {
    UShortSerializer_instance = this;
    this.dx_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_7(ShortCompanionObject_instance));
  }
  protoOf(UShortSerializer).xf = function () {
    return this.dx_1;
  };
  protoOf(UShortSerializer).ex = function (encoder, value) {
    var tmp = encoder.dk(this.dx_1);
    // Inline function 'kotlin.UShort.toShort' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(value);
    tmp.vj(tmp$ret$0);
  };
  protoOf(UShortSerializer).yf = function (encoder, value) {
    return this.ex(encoder, value instanceof UShort ? value.rf_1 : THROW_CCE());
  };
  protoOf(UShortSerializer).fx = function (decoder) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.ui(this.dx_1).mi();
    return _UShort___init__impl__jigrne(this_0);
  };
  protoOf(UShortSerializer).zf = function (decoder) {
    return new UShort(this.fx(decoder));
  };
  var UShortSerializer_instance;
  function UShortSerializer_getInstance() {
    if (UShortSerializer_instance == null)
      new UShortSerializer();
    return UShortSerializer_instance;
  }
  function get_EmptySerializersModuleLegacyJs() {
    _init_properties_SerializersModule_kt__u78ha3();
    return EmptySerializersModule;
  }
  var EmptySerializersModule;
  function SerializersModule() {
  }
  protoOf(SerializersModule).zg = function (kClass, typeArgumentsSerializers, $super) {
    typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
    return $super === VOID ? this.gx(kClass, typeArgumentsSerializers) : $super.gx.call(this, kClass, typeArgumentsSerializers);
  };
  function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
    SerializersModule.call(this);
    this.ix_1 = class2ContextualFactory;
    this.jx_1 = polyBase2Serializers;
    this.kx_1 = polyBase2DefaultSerializerProvider;
    this.lx_1 = polyBase2NamedSerializers;
    this.mx_1 = polyBase2DefaultDeserializerProvider;
    this.nx_1 = hasInterfaceContextualSerializers;
  }
  protoOf(SerialModuleImpl).wk = function (baseClass, value) {
    if (!baseClass.b8(value))
      return null;
    var tmp0_safe_receiver = this.jx_1.t1(baseClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.t1(getKClassFromExpression(value));
    var registered = (!(tmp == null) ? isInterface(tmp, SerializationStrategy) : false) ? tmp : null;
    if (!(registered == null))
      return registered;
    var tmp_0 = this.kx_1.t1(baseClass);
    var tmp1_safe_receiver = (!(tmp_0 == null) ? typeof tmp_0 === 'function' : false) ? tmp_0 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(value);
  };
  protoOf(SerialModuleImpl).vk = function (baseClass, serializedClassName) {
    var tmp0_safe_receiver = this.lx_1.t1(baseClass);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(tmp0_safe_receiver, KtMap) ? tmp0_safe_receiver : THROW_CCE()).t1(serializedClassName);
    }
    var tmp_0 = tmp;
    var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    if (!(registered == null))
      return registered;
    var tmp_1 = this.mx_1.t1(baseClass);
    var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
  };
  protoOf(SerialModuleImpl).gx = function (kClass, typeArgumentsSerializers) {
    var tmp0_safe_receiver = this.ix_1.t1(kClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ox(typeArgumentsSerializers);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
  };
  protoOf(SerialModuleImpl).hx = function (collector) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.ix_1.w1().j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var kclass = element.p1();
      // Inline function 'kotlin.collections.component2' call
      var serial = element.q1();
      if (serial instanceof Argless) {
        var tmp = isInterface(kclass, KClass) ? kclass : THROW_CCE();
        var tmp_0 = serial.rx_1;
        collector.sx(tmp, isInterface(tmp_0, KSerializer) ? tmp_0 : THROW_CCE());
      } else {
        if (serial instanceof WithTypeArguments) {
          collector.qx(kclass, serial.px_1);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_0 = this.jx_1.w1().j();
    while (_iterator__ex2g4s_0.k()) {
      var element_0 = _iterator__ex2g4s_0.l();
      // Inline function 'kotlin.collections.component1' call
      var baseClass = element_0.p1();
      // Inline function 'kotlin.collections.component2' call
      var classMap = element_0.q1();
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s_1 = classMap.w1().j();
      while (_iterator__ex2g4s_1.k()) {
        var element_1 = _iterator__ex2g4s_1.l();
        // Inline function 'kotlin.collections.component1' call
        var actualClass = element_1.p1();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element_1.q1();
        var tmp_1 = isInterface(baseClass, KClass) ? baseClass : THROW_CCE();
        var tmp_2 = isInterface(actualClass, KClass) ? actualClass : THROW_CCE();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var tmp$ret$15 = isInterface(serializer, KSerializer) ? serializer : THROW_CCE();
        collector.tx(tmp_1, tmp_2, tmp$ret$15);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_2 = this.kx_1.w1().j();
    while (_iterator__ex2g4s_2.k()) {
      var element_2 = _iterator__ex2g4s_2.l();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_0 = element_2.p1();
      // Inline function 'kotlin.collections.component2' call
      var provider = element_2.q1();
      var tmp_3 = isInterface(baseClass_0, KClass) ? baseClass_0 : THROW_CCE();
      collector.ux(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_3 = this.mx_1.w1().j();
    while (_iterator__ex2g4s_3.k()) {
      var element_3 = _iterator__ex2g4s_3.l();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_1 = element_3.p1();
      // Inline function 'kotlin.collections.component2' call
      var provider_0 = element_3.q1();
      var tmp_4 = isInterface(baseClass_1, KClass) ? baseClass_1 : THROW_CCE();
      collector.vx(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
    }
  };
  function Argless() {
  }
  function WithTypeArguments() {
  }
  function ContextualProvider() {
  }
  var properties_initialized_SerializersModule_kt_fjigjn;
  function _init_properties_SerializersModule_kt__u78ha3() {
    if (!properties_initialized_SerializersModule_kt_fjigjn) {
      properties_initialized_SerializersModule_kt_fjigjn = true;
      EmptySerializersModule = new SerialModuleImpl(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap(), false);
    }
  }
  function EmptySerializersModule_0() {
    return get_EmptySerializersModuleLegacyJs();
  }
  function SerializersModuleCollector$contextual$lambda($serializer) {
    return function (it) {
      return $serializer;
    };
  }
  function SerializersModuleCollector() {
  }
  function SerializableWith() {
  }
  function getChecked(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices(_this__u8e3s4).toString());
    return _this__u8e3s4[index];
  }
  function getChecked_0(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices_0(_this__u8e3s4).toString());
    return _this__u8e3s4[index];
  }
  function initBuiltins() {
    return mapOf([to(PrimitiveClasses_getInstance().u8(), serializer(StringCompanionObject_instance)), to(getKClass(Char), serializer_8(Companion_getInstance_1())), to(PrimitiveClasses_getInstance().x8(), CharArraySerializer()), to(PrimitiveClasses_getInstance().s8(), serializer_9(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().e9(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().r8(), serializer_10(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().d9(), FloatArraySerializer()), to(PrimitiveClasses_getInstance().q8(), serializer_5(Companion_getInstance_2())), to(PrimitiveClasses_getInstance().c9(), LongArraySerializer()), to(getKClass(ULong), serializer_1(Companion_getInstance_3())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().p8(), serializer_4(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().a9(), IntArraySerializer()), to(getKClass(UInt), serializer_0(Companion_getInstance_4())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().o8(), serializer_7(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().z8(), ShortArraySerializer()), to(getKClass(UShort), serializer_3(Companion_getInstance_5())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().n8(), serializer_6(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().y8(), ByteArraySerializer()), to(getKClass(UByte), serializer_2(Companion_getInstance_6())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().m8(), serializer_11(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().w8(), BooleanArraySerializer()), to(getKClass(Unit), serializer_12(Unit_instance)), to(PrimitiveClasses_getInstance().l8(), NothingSerializer()), to(getKClass(Duration), serializer_13(Companion_getInstance())), to(getKClass(Uuid), serializer_14(Companion_getInstance_0()))]);
  }
  //region block: post-declaration
  protoOf(SerialDescriptorImpl).yg = get_isNullable;
  protoOf(SerialDescriptorImpl).fh = get_isInline;
  protoOf(AbstractDecoder).kj = decodeSerializableElement$default;
  protoOf(AbstractDecoder).wi = decodeSerializableValue;
  protoOf(AbstractDecoder).nj = decodeSequentially;
  protoOf(AbstractDecoder).pj = decodeCollectionSize;
  protoOf(AbstractEncoder).sk = encodeNotNullMark;
  protoOf(AbstractEncoder).tk = beginCollection;
  protoOf(AbstractEncoder).pk = encodeSerializableValue;
  protoOf(AbstractEncoder).rk = encodeNullableSerializableValue;
  protoOf(AbstractEncoder).uk = shouldEncodeElementDefault;
  protoOf(ListLikeDescriptor).yg = get_isNullable;
  protoOf(ListLikeDescriptor).fh = get_isInline;
  protoOf(ListLikeDescriptor).hh = get_annotations;
  protoOf(MapLikeDescriptor).yg = get_isNullable;
  protoOf(MapLikeDescriptor).fh = get_isInline;
  protoOf(MapLikeDescriptor).hh = get_annotations;
  protoOf(PluginGeneratedSerialDescriptor).yg = get_isNullable;
  protoOf(PluginGeneratedSerialDescriptor).fh = get_isInline;
  protoOf(InlinePrimitiveDescriptor$1).bq = typeParametersSerializers;
  protoOf(NothingSerialDescriptor).yg = get_isNullable;
  protoOf(NothingSerialDescriptor).fh = get_isInline;
  protoOf(NothingSerialDescriptor).hh = get_annotations;
  protoOf(PrimitiveSerialDescriptor_0).yg = get_isNullable;
  protoOf(PrimitiveSerialDescriptor_0).fh = get_isInline;
  protoOf(PrimitiveSerialDescriptor_0).hh = get_annotations;
  protoOf(TaggedDecoder).kj = decodeSerializableElement$default;
  protoOf(TaggedDecoder).wi = decodeSerializableValue;
  protoOf(TaggedDecoder).nj = decodeSequentially;
  protoOf(TaggedDecoder).pj = decodeCollectionSize;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = STRING_getInstance;
  _.$_$.b = CONTEXTUAL_getInstance;
  _.$_$.c = ENUM_getInstance;
  _.$_$.d = CLASS_getInstance;
  _.$_$.e = LIST_getInstance;
  _.$_$.f = MAP_getInstance;
  _.$_$.g = OBJECT_getInstance;
  _.$_$.h = BooleanSerializer_getInstance;
  _.$_$.i = FloatSerializer_getInstance;
  _.$_$.j = IntSerializer_getInstance;
  _.$_$.k = LongSerializer_getInstance;
  _.$_$.l = StringSerializer_getInstance;
  _.$_$.m = ObjectSerializer_init_$Create$;
  _.$_$.n = SealedClassSerializer_init_$Create$;
  _.$_$.o = SerializationException_init_$Init$_0;
  _.$_$.p = SerializationException_init_$Create$_0;
  _.$_$.q = UnknownFieldException_init_$Create$;
  _.$_$.r = get_nullable;
  _.$_$.s = serializer;
  _.$_$.t = serializer_3;
  _.$_$.u = serializer_0;
  _.$_$.v = serializer_2;
  _.$_$.w = serializer_1;
  _.$_$.x = PolymorphicKind;
  _.$_$.y = PrimitiveKind;
  _.$_$.z = PrimitiveSerialDescriptor;
  _.$_$.a1 = SerialDescriptor;
  _.$_$.b1 = ENUM;
  _.$_$.c1 = getContextualDescriptor;
  _.$_$.d1 = AbstractDecoder;
  _.$_$.e1 = AbstractEncoder;
  _.$_$.f1 = CompositeDecoder;
  _.$_$.g1 = CompositeEncoder;
  _.$_$.h1 = Decoder;
  _.$_$.i1 = Encoder;
  _.$_$.j1 = AbstractPolymorphicSerializer;
  _.$_$.k1 = ArrayListSerializer;
  _.$_$.l1 = ElementMarker;
  _.$_$.m1 = typeParametersSerializers;
  _.$_$.n1 = GeneratedSerializer;
  _.$_$.o1 = InlineClassDescriptor;
  _.$_$.p1 = InlinePrimitiveDescriptor;
  _.$_$.q1 = LinkedHashMapSerializer;
  _.$_$.r1 = LinkedHashSetSerializer;
  _.$_$.s1 = NamedValueDecoder;
  _.$_$.t1 = PluginGeneratedSerialDescriptor;
  _.$_$.u1 = createSimpleEnumSerializer;
  _.$_$.v1 = jsonCachedSerialNames;
  _.$_$.w1 = throwMissingFieldException;
  _.$_$.x1 = EmptySerializersModule_0;
  _.$_$.y1 = contextual;
  _.$_$.z1 = SerializersModuleCollector;
  _.$_$.a2 = DeserializationStrategy;
  _.$_$.b2 = KSerializer;
  _.$_$.c2 = MissingFieldException;
  _.$_$.d2 = SealedClassSerializer;
  _.$_$.e2 = SerializableWith;
  _.$_$.f2 = SerializationException;
  _.$_$.g2 = SerializationStrategy;
  _.$_$.h2 = findPolymorphicSerializer_0;
  _.$_$.i2 = findPolymorphicSerializer;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-core.js.map
