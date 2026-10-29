(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    globalThis['kotlinx-serialization-kotlinx-serialization-json'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-json'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x1;
  var protoOf = kotlin_kotlin.$_$.c8;
  var initMetadataForObject = kotlin_kotlin.$_$.l7;
  var VOID = kotlin_kotlin.$_$.a;
  var Unit_instance = kotlin_kotlin.$_$.i2;
  var initMetadataForClass = kotlin_kotlin.$_$.g7;
  var toString = kotlin_kotlin.$_$.f8;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.b3;
  var charSequenceLength = kotlin_kotlin.$_$.w6;
  var charSequenceGet = kotlin_kotlin.$_$.v6;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.c;
  var equals = kotlin_kotlin.$_$.z6;
  var toString_0 = kotlin_kotlin.$_$.mb;
  var Enum = kotlin_kotlin.$_$.ma;
  var initMetadataForCompanion = kotlin_kotlin.$_$.h7;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.y2;
  var hashCode = kotlin_kotlin.$_$.f7;
  var joinToString = kotlin_kotlin.$_$.s4;
  var THROW_CCE = kotlin_kotlin.$_$.qa;
  var KtMap = kotlin_kotlin.$_$.k3;
  var getKClassFromExpression = kotlin_kotlin.$_$.u8;
  var getBooleanHashCode = kotlin_kotlin.$_$.b7;
  var getStringHashCode = kotlin_kotlin.$_$.e7;
  var KtList = kotlin_kotlin.$_$.j3;
  var toDouble = kotlin_kotlin.$_$.v9;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.x1;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s;
  var InlinePrimitiveDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var fromInt = kotlin_kotlin.$_$.f6;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.p;
  var UInt__toString_impl_dbgl21 = kotlin_kotlin.$_$.r;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.y;
  var ULong__toString_impl_f9au7k = kotlin_kotlin.$_$.a1;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.g;
  var UByte__toString_impl_v72jg = kotlin_kotlin.$_$.i;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.h1;
  var UShort__toString_impl_edaoee = kotlin_kotlin.$_$.j1;
  var constructCallableReference = kotlin_kotlin.$_$.y6;
  var ElementMarker = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var captureStack = kotlin_kotlin.$_$.r6;
  var charSequenceSubSequence = kotlin_kotlin.$_$.x6;
  var coerceAtLeast = kotlin_kotlin.$_$.k8;
  var coerceAtMost = kotlin_kotlin.$_$.n8;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f2;
  var SerializationException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o;
  var Collection = kotlin_kotlin.$_$.g3;
  var isInterface = kotlin_kotlin.$_$.t7;
  var SerializationException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var ENUM_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.r2;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.k2;
  var singleOrNull = kotlin_kotlin.$_$.h5;
  var emptyMap = kotlin_kotlin.$_$.j4;
  var getValue = kotlin_kotlin.$_$.o4;
  var copyOf = kotlin_kotlin.$_$.e4;
  var copyOf_0 = kotlin_kotlin.$_$.f4;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var SerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a1;
  var CONTEXTUAL_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var PrimitiveKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var ENUM = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var contextual = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y1;
  var SerializersModuleCollector = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var DeepRecursiveFunction = kotlin_kotlin.$_$.ka;
  var invoke = kotlin_kotlin.$_$.eb;
  var CoroutineImpl = kotlin_kotlin.$_$.v5;
  var DeepRecursiveScope = kotlin_kotlin.$_$.la;
  var Unit = kotlin_kotlin.$_$.bb;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.u5;
  var initMetadataForLambda = kotlin_kotlin.$_$.k7;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.i7;
  var SealedClassSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d2;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.d3;
  var jsonCachedSerialNames = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var AbstractDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d1;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a2;
  var getKClass = kotlin_kotlin.$_$.v8;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h2;
  var ensureNotNull = kotlin_kotlin.$_$.db;
  var substringBefore = kotlin_kotlin.$_$.t9;
  var removeSuffix = kotlin_kotlin.$_$.l9;
  var substringAfter = kotlin_kotlin.$_$.r9;
  var contains = kotlin_kotlin.$_$.d9;
  var plus = kotlin_kotlin.$_$.lb;
  var MissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c2;
  var convertToByte = kotlin_kotlin.$_$.a6;
  var equalsLong = kotlin_kotlin.$_$.e6;
  var convertToShort = kotlin_kotlin.$_$.c6;
  var convertToInt = kotlin_kotlin.$_$.b6;
  var IllegalArgumentException = kotlin_kotlin.$_$.na;
  var isFinite = kotlin_kotlin.$_$.gb;
  var isFinite_0 = kotlin_kotlin.$_$.fb;
  var charCodeAt = kotlin_kotlin.$_$.u6;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h1;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f1;
  var toUInt = kotlin_kotlin.$_$.aa;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.q;
  var toULong = kotlin_kotlin.$_$.ba;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.z;
  var toUByte = kotlin_kotlin.$_$.z9;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.h;
  var toUShort = kotlin_kotlin.$_$.ca;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.i1;
  var objectCreate = kotlin_kotlin.$_$.b8;
  var AbstractEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e1;
  var OBJECT_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kb;
  var findPolymorphicSerializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i2;
  var SerializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g2;
  var toString_1 = kotlin_kotlin.$_$.f;
  var CompositeEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g1;
  var Encoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i1;
  var Companion_getInstance = kotlin_kotlin.$_$.f2;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.g2;
  var serializer_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.e2;
  var serializer_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.h2;
  var serializer_3 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t;
  var setOf = kotlin_kotlin.$_$.g5;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.e;
  var numberToChar = kotlin_kotlin.$_$.z7;
  var equals_0 = kotlin_kotlin.$_$.f9;
  var toByte = kotlin_kotlin.$_$.d8;
  var startsWith = kotlin_kotlin.$_$.q9;
  var NamedValueDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s1;
  var numberRangeToNumber = kotlin_kotlin.$_$.x7;
  var ClosedRange = kotlin_kotlin.$_$.i8;
  var contains_0 = kotlin_kotlin.$_$.r8;
  var single = kotlin_kotlin.$_$.o9;
  var Char = kotlin_kotlin.$_$.ia;
  var emptySet = kotlin_kotlin.$_$.k4;
  var plus_0 = kotlin_kotlin.$_$.c5;
  var toInt = kotlin_kotlin.$_$.y9;
  var toList = kotlin_kotlin.$_$.l5;
  var enumEntries = kotlin_kotlin.$_$.w5;
  var getContextualDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var toNumber = kotlin_kotlin.$_$.o6;
  var last = kotlin_kotlin.$_$.w4;
  var removeLast = kotlin_kotlin.$_$.e5;
  var lastIndexOf = kotlin_kotlin.$_$.j9;
  var Long = kotlin_kotlin.$_$.pa;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.d;
  var multiply = kotlin_kotlin.$_$.j6;
  var add = kotlin_kotlin.$_$.x5;
  var subtract = kotlin_kotlin.$_$.n6;
  var compare = kotlin_kotlin.$_$.z5;
  var numberToLong = kotlin_kotlin.$_$.l6;
  var negate = kotlin_kotlin.$_$.k6;
  var charArray = kotlin_kotlin.$_$.t6;
  var indexOf = kotlin_kotlin.$_$.g9;
  var indexOf_0 = kotlin_kotlin.$_$.h9;
  var substring = kotlin_kotlin.$_$.u9;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.x2;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.m2;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(Json, 'Json');
  initMetadataForObject(Default, 'Default', VOID, Json);
  initMetadataForClass(JsonBuilder, 'JsonBuilder');
  initMetadataForClass(JsonImpl, 'JsonImpl', VOID, Json);
  initMetadataForClass(JsonClassDiscriminator, 'JsonClassDiscriminator');
  initMetadataForClass(JsonIgnoreUnknownKeys, 'JsonIgnoreUnknownKeys');
  initMetadataForClass(JsonNames, 'JsonNames');
  initMetadataForClass(JsonConfiguration, 'JsonConfiguration');
  initMetadataForClass(ClassDiscriminatorMode, 'ClassDiscriminatorMode', VOID, Enum);
  initMetadataForCompanion(Companion);
  initMetadataForClass(JsonElement, 'JsonElement');
  initMetadataForCompanion(Companion_0);
  initMetadataForClass(JsonObject, 'JsonObject', VOID, JsonElement, [KtMap]);
  initMetadataForClass(JsonPrimitive, 'JsonPrimitive', VOID, JsonElement);
  initMetadataForObject(JsonNull, 'JsonNull', VOID, JsonPrimitive);
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(JsonLiteral, 'JsonLiteral', VOID, JsonPrimitive);
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(JsonArray, 'JsonArray', VOID, JsonElement, [KtList]);
  initMetadataForClass(Composer, 'Composer');
  initMetadataForClass(ComposerForUnsignedNumbers, 'ComposerForUnsignedNumbers', VOID, Composer);
  initMetadataForClass(ComposerForUnquotedLiterals, 'ComposerForUnquotedLiterals', VOID, Composer);
  initMetadataForClass(ComposerWithPrettyPrint, 'ComposerWithPrettyPrint', VOID, Composer);
  initMetadataForClass(JsonElementMarker, 'JsonElementMarker');
  initMetadataForClass(JsonException, 'JsonException', VOID, SerializationException);
  initMetadataForClass(JsonEncodingException, 'JsonEncodingException', VOID, JsonException);
  initMetadataForClass(JsonDecodingException, 'JsonDecodingException', VOID, JsonException);
  initMetadataForObject(Tombstone, 'Tombstone');
  initMetadataForClass(JsonPath, 'JsonPath', JsonPath);
  initMetadataForClass(JsonSerializersModuleValidator, 'JsonSerializersModuleValidator', VOID, VOID, [SerializersModuleCollector]);
  initMetadataForLambda(JsonTreeReader$readDeepRecursive$slambda, CoroutineImpl, VOID, [2]);
  initMetadataForCoroutine($readObjectCOROUTINE$, CoroutineImpl);
  initMetadataForClass(JsonTreeReader, 'JsonTreeReader', VOID, VOID, VOID, [1]);
  initMetadataForClass(Key, 'Key', Key);
  initMetadataForClass(DescriptorSchemaCache, 'DescriptorSchemaCache', DescriptorSchemaCache);
  initMetadataForClass(DiscriminatorHolder, 'DiscriminatorHolder');
  initMetadataForClass(StreamingJsonDecoder, 'StreamingJsonDecoder', VOID, AbstractDecoder, [Decoder, CompositeDecoder]);
  initMetadataForClass(JsonDecoderForUnsignedTypes, 'JsonDecoderForUnsignedTypes', VOID, AbstractDecoder);
  initMetadataForClass(StreamingJsonEncoder, 'StreamingJsonEncoder', VOID, AbstractEncoder, [CompositeEncoder, Encoder]);
  initMetadataForClass(AbstractJsonTreeDecoder, 'AbstractJsonTreeDecoder', VOID, NamedValueDecoder, [Decoder, CompositeDecoder]);
  initMetadataForClass(JsonTreeDecoder, 'JsonTreeDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeListDecoder, 'JsonTreeListDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonPrimitiveDecoder, 'JsonPrimitiveDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeMapDecoder, 'JsonTreeMapDecoder', VOID, JsonTreeDecoder);
  initMetadataForClass(WriteMode, 'WriteMode', VOID, Enum);
  initMetadataForClass(AbstractJsonLexer, 'AbstractJsonLexer');
  initMetadataForObject(CharMappings, 'CharMappings');
  initMetadataForClass(StringJsonLexer, 'StringJsonLexer', VOID, AbstractJsonLexer);
  initMetadataForClass(StringJsonLexerWithComments, 'StringJsonLexerWithComments', VOID, StringJsonLexer);
  initMetadataForClass(JsonToStringWriter, 'JsonToStringWriter', JsonToStringWriter);
  //endregion
  function Default() {
    Default_instance = this;
    Json.call(this, new JsonConfiguration(), EmptySerializersModule());
  }
  var Default_instance;
  function Default_getInstance() {
    if (Default_instance == null)
      new Default();
    return Default_instance;
  }
  function Json(configuration, serializersModule) {
    Default_getInstance();
    this.wx_1 = configuration;
    this.xx_1 = serializersModule;
    this.yx_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).mj = function () {
    return this.xx_1;
  };
  protoOf(Json).zx = function (serializer, value) {
    var result = new JsonToStringWriter();
    try {
      encodeByWriter(this, result, serializer, value);
      return result.toString();
    }finally {
      result.cy();
    }
  };
  protoOf(Json).ay = function (deserializer, string) {
    var lexer = StringJsonLexer_0(this, string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.xf(), null);
    var result = input.wi(deserializer);
    lexer.py();
    return result;
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.iz();
    return new JsonImpl(conf, builder.hz_1);
  }
  function JsonBuilder(json) {
    this.qy_1 = json.wx_1.jz_1;
    this.ry_1 = json.wx_1.oz_1;
    this.sy_1 = json.wx_1.kz_1;
    this.ty_1 = json.wx_1.lz_1;
    this.uy_1 = json.wx_1.nz_1;
    this.vy_1 = json.wx_1.pz_1;
    this.wy_1 = json.wx_1.qz_1;
    this.xy_1 = json.wx_1.sz_1;
    this.yy_1 = json.wx_1.zz_1;
    this.zy_1 = json.wx_1.uz_1;
    this.az_1 = json.wx_1.vz_1;
    this.bz_1 = json.wx_1.wz_1;
    this.cz_1 = json.wx_1.xz_1;
    this.dz_1 = json.wx_1.yz_1;
    this.ez_1 = json.wx_1.tz_1;
    this.fz_1 = json.wx_1.mz_1;
    this.gz_1 = json.wx_1.rz_1;
    this.hz_1 = json.mj();
  }
  protoOf(JsonBuilder).iz = function () {
    if (this.gz_1) {
      // Inline function 'kotlin.require' call
      if (!(this.xy_1 === 'type')) {
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      if (!this.yy_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
        var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    }
    if (!this.uy_1) {
      // Inline function 'kotlin.require' call
      if (!(this.vy_1 === '    ')) {
        var message_1 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    } else if (!(this.vy_1 === '    ')) {
      var tmp0 = this.vy_1;
      var tmp$ret$6;
      $l$block: {
        // Inline function 'kotlin.text.all' call
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(tmp0)) {
          var element = charSequenceGet(tmp0, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          if (!(element === _Char___init__impl__6a9atx(32) || element === _Char___init__impl__6a9atx(9) || element === _Char___init__impl__6a9atx(13) || element === _Char___init__impl__6a9atx(10))) {
            tmp$ret$6 = false;
            break $l$block;
          }
        }
        tmp$ret$6 = true;
      }
      var allWhitespaces = tmp$ret$6;
      // Inline function 'kotlin.require' call
      if (!allWhitespaces) {
        var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.vy_1;
        throw IllegalArgumentException_init_$Create$(toString(message_2));
      }
    }
    return new JsonConfiguration(this.qy_1, this.sy_1, this.ty_1, this.fz_1, this.uy_1, this.ry_1, this.vy_1, this.wy_1, this.gz_1, this.xy_1, this.ez_1, this.zy_1, this.az_1, this.bz_1, this.cz_1, this.dz_1, this.yy_1);
  };
  function validateConfiguration($this) {
    if (equals($this.mj(), EmptySerializersModule()))
      return Unit_instance;
    var collector = new JsonSerializersModuleValidator($this.wx_1);
    $this.mj().hx(collector);
  }
  function JsonImpl(configuration, module_0) {
    Json.call(this, configuration, module_0);
    validateConfiguration(this);
  }
  function JsonClassDiscriminator() {
  }
  function JsonIgnoreUnknownKeys() {
  }
  function JsonNames() {
  }
  function JsonConfiguration(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy, decodeEnumsCaseInsensitive, allowTrailingComma, allowComments, classDiscriminatorMode) {
    encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
    ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
    isLenient = isLenient === VOID ? false : isLenient;
    allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
    prettyPrint = prettyPrint === VOID ? false : prettyPrint;
    explicitNulls = explicitNulls === VOID ? true : explicitNulls;
    prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
    coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
    useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
    classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
    allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
    useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
    namingStrategy = namingStrategy === VOID ? null : namingStrategy;
    decodeEnumsCaseInsensitive = decodeEnumsCaseInsensitive === VOID ? false : decodeEnumsCaseInsensitive;
    allowTrailingComma = allowTrailingComma === VOID ? false : allowTrailingComma;
    allowComments = allowComments === VOID ? false : allowComments;
    classDiscriminatorMode = classDiscriminatorMode === VOID ? ClassDiscriminatorMode_POLYMORPHIC_getInstance() : classDiscriminatorMode;
    this.jz_1 = encodeDefaults;
    this.kz_1 = ignoreUnknownKeys;
    this.lz_1 = isLenient;
    this.mz_1 = allowStructuredMapKeys;
    this.nz_1 = prettyPrint;
    this.oz_1 = explicitNulls;
    this.pz_1 = prettyPrintIndent;
    this.qz_1 = coerceInputValues;
    this.rz_1 = useArrayPolymorphism;
    this.sz_1 = classDiscriminator;
    this.tz_1 = allowSpecialFloatingPointValues;
    this.uz_1 = useAlternativeNames;
    this.vz_1 = namingStrategy;
    this.wz_1 = decodeEnumsCaseInsensitive;
    this.xz_1 = allowTrailingComma;
    this.yz_1 = allowComments;
    this.zz_1 = classDiscriminatorMode;
  }
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.jz_1 + ', ignoreUnknownKeys=' + this.kz_1 + ', isLenient=' + this.lz_1 + ', ' + ('allowStructuredMapKeys=' + this.mz_1 + ', prettyPrint=' + this.nz_1 + ', explicitNulls=' + this.oz_1 + ', ') + ("prettyPrintIndent='" + this.pz_1 + "', coerceInputValues=" + this.qz_1 + ', useArrayPolymorphism=' + this.rz_1 + ', ') + ("classDiscriminator='" + this.sz_1 + "', allowSpecialFloatingPointValues=" + this.tz_1 + ', ') + ('useAlternativeNames=' + this.uz_1 + ', namingStrategy=' + toString_0(this.vz_1) + ', decodeEnumsCaseInsensitive=' + this.wz_1 + ', ') + ('allowTrailingComma=' + this.xz_1 + ', allowComments=' + this.yz_1 + ', classDiscriminatorMode=' + this.zz_1.toString() + ')');
  };
  var static_init_called;
  function static_init() {
    if (static_init_called)
      return Unit_instance;
    static_init_called = true;
    ClassDiscriminatorMode_NONE_instance = new ClassDiscriminatorMode('NONE', 0);
    ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance = new ClassDiscriminatorMode('ALL_JSON_OBJECTS', 1);
    ClassDiscriminatorMode_POLYMORPHIC_instance = new ClassDiscriminatorMode('POLYMORPHIC', 2);
  }
  var ClassDiscriminatorMode_NONE_instance;
  var ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
  var ClassDiscriminatorMode_POLYMORPHIC_instance;
  function ClassDiscriminatorMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ClassDiscriminatorMode_NONE_getInstance() {
    static_init();
    return ClassDiscriminatorMode_NONE_instance;
  }
  function ClassDiscriminatorMode_POLYMORPHIC_getInstance() {
    static_init();
    return ClassDiscriminatorMode_POLYMORPHIC_instance;
  }
  function get_jsonUnquotedLiteralDescriptor() {
    _init_properties_JsonElement_kt__7cbdc2();
    return jsonUnquotedLiteralDescriptor;
  }
  var jsonUnquotedLiteralDescriptor;
  function Companion() {
  }
  var Companion_instance;
  function Companion_getInstance_3() {
    return Companion_instance;
  }
  function JsonElement() {
  }
  function Companion_0() {
  }
  var Companion_instance_0;
  function Companion_getInstance_4() {
    return Companion_instance_0;
  }
  function JsonObject$toString$lambda(_destruct__k2r9zo) {
    // Inline function 'kotlin.collections.component1' call
    var k = _destruct__k2r9zo.p1();
    // Inline function 'kotlin.collections.component2' call
    var v = _destruct__k2r9zo.q1();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    printQuoted(this_0, k);
    this_0.n6(_Char___init__impl__6a9atx(58));
    this_0.l6(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    JsonElement.call(this);
    this.a10_1 = content;
  }
  protoOf(JsonObject).equals = function (other) {
    return equals(this.a10_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.a10_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.a10_1.w1();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  protoOf(JsonObject).p = function () {
    return this.a10_1.p();
  };
  protoOf(JsonObject).b10 = function (key) {
    return this.a10_1.r1(key);
  };
  protoOf(JsonObject).r1 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.b10((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).c10 = function (key) {
    return this.a10_1.t1(key);
  };
  protoOf(JsonObject).t1 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.c10((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).m = function () {
    return this.a10_1.m();
  };
  protoOf(JsonObject).u1 = function () {
    return this.a10_1.u1();
  };
  protoOf(JsonObject).v1 = function () {
    return this.a10_1.v1();
  };
  protoOf(JsonObject).w1 = function () {
    return this.a10_1.w1();
  };
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.d10_1 = 'null';
  }
  protoOf(JsonNull).e10 = function () {
    return this.d10_1;
  };
  var JsonNull_instance;
  function JsonNull_getInstance() {
    if (JsonNull_instance == null)
      new JsonNull();
    return JsonNull_instance;
  }
  function Companion_1() {
  }
  var Companion_instance_1;
  function Companion_getInstance_5() {
    return Companion_instance_1;
  }
  function JsonPrimitive() {
    JsonElement.call(this);
  }
  protoOf(JsonPrimitive).toString = function () {
    return this.e10();
  };
  function JsonPrimitive_0(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, true);
  }
  function JsonLiteral(body, isString, coerceToInlineType) {
    coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
    JsonPrimitive.call(this);
    this.f10_1 = isString;
    this.g10_1 = coerceToInlineType;
    this.h10_1 = toString(body);
    if (!(this.g10_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!this.g10_1.fh()) {
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).e10 = function () {
    return this.h10_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.f10_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      printQuoted(this_0, this.h10_1);
      tmp = this_0.toString();
    } else {
      tmp = this.h10_1;
    }
    return tmp;
  };
  protoOf(JsonLiteral).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof JsonLiteral))
      THROW_CCE();
    if (!(this.f10_1 === other.f10_1))
      return false;
    if (!(this.h10_1 === other.h10_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.f10_1);
    result = imul(31, result) + getStringHashCode(this.h10_1) | 0;
    return result;
  };
  function Companion_2() {
  }
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function JsonArray(content) {
    JsonElement.call(this);
    this.i10_1 = content;
  }
  protoOf(JsonArray).equals = function (other) {
    return equals(this.i10_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.i10_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.i10_1, ',', '[', ']');
  };
  protoOf(JsonArray).p = function () {
    return this.i10_1.p();
  };
  protoOf(JsonArray).j = function () {
    return this.i10_1.j();
  };
  protoOf(JsonArray).n = function (index) {
    return this.i10_1.n(index);
  };
  protoOf(JsonArray).m = function () {
    return this.i10_1.m();
  };
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull(_this__u8e3s4.e10());
  }
  function parseLongImpl(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return (new StringJsonLexer(_this__u8e3s4.e10())).j10();
  }
  function get_float(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloat' call
    var this_0 = _this__u8e3s4.e10();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDouble(this_0);
  }
  function get_double(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDouble(_this__u8e3s4.e10());
  }
  function get_contentOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp;
    if (_this__u8e3s4 instanceof JsonNull) {
      tmp = null;
    } else {
      tmp = _this__u8e3s4.e10();
    }
    return tmp;
  }
  function get_jsonPrimitive(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      error(_this__u8e3s4, 'JsonPrimitive');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function error(_this__u8e3s4, element) {
    _init_properties_JsonElement_kt__7cbdc2();
    throw IllegalArgumentException_init_$Create$('Element ' + toString(getKClassFromExpression(_this__u8e3s4)) + ' is not a ' + element);
  }
  var properties_initialized_JsonElement_kt_abxy8s;
  function _init_properties_JsonElement_kt__7cbdc2() {
    if (!properties_initialized_JsonElement_kt_abxy8s) {
      properties_initialized_JsonElement_kt_abxy8s = true;
      jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_instance));
    }
  }
  function Composer(writer) {
    this.k10_1 = writer;
    this.l10_1 = true;
  }
  protoOf(Composer).m10 = function () {
    this.l10_1 = true;
  };
  protoOf(Composer).n10 = function () {
    return Unit_instance;
  };
  protoOf(Composer).o10 = function () {
    this.l10_1 = false;
  };
  protoOf(Composer).p10 = function () {
    this.l10_1 = false;
  };
  protoOf(Composer).q10 = function () {
    return Unit_instance;
  };
  protoOf(Composer).r10 = function (v) {
    return this.k10_1.s10(v);
  };
  protoOf(Composer).t10 = function (v) {
    return this.k10_1.u10(v);
  };
  protoOf(Composer).v10 = function (v) {
    return this.k10_1.u10(v.toString());
  };
  protoOf(Composer).w10 = function (v) {
    return this.k10_1.u10(v.toString());
  };
  protoOf(Composer).x10 = function (v) {
    return this.k10_1.y10(fromInt(v));
  };
  protoOf(Composer).z10 = function (v) {
    return this.k10_1.y10(fromInt(v));
  };
  protoOf(Composer).a11 = function (v) {
    return this.k10_1.y10(fromInt(v));
  };
  protoOf(Composer).b11 = function (v) {
    return this.k10_1.y10(v);
  };
  protoOf(Composer).c11 = function (v) {
    return this.k10_1.u10(v.toString());
  };
  protoOf(Composer).d11 = function (value) {
    return this.k10_1.e11(value);
  };
  function Composer_0(sb, json) {
    return json.wx_1.nz_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
  }
  function ComposerForUnsignedNumbers(writer, forceQuoting) {
    Composer.call(this, writer);
    this.h11_1 = forceQuoting;
  }
  protoOf(ComposerForUnsignedNumbers).a11 = function (v) {
    if (this.h11_1) {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
      this.d11(UInt__toString_impl_dbgl21(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
      this.t10(UInt__toString_impl_dbgl21(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).b11 = function (v) {
    if (this.h11_1) {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
      this.d11(ULong__toString_impl_f9au7k(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
      this.t10(ULong__toString_impl_f9au7k(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).x10 = function (v) {
    if (this.h11_1) {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
      this.d11(UByte__toString_impl_v72jg(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
      this.t10(UByte__toString_impl_v72jg(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).z10 = function (v) {
    if (this.h11_1) {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$0 = _UShort___init__impl__jigrne(v);
      this.d11(UShort__toString_impl_edaoee(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$1 = _UShort___init__impl__jigrne(v);
      this.t10(UShort__toString_impl_edaoee(tmp$ret$1));
    }
  };
  function ComposerForUnquotedLiterals(writer, forceQuoting) {
    Composer.call(this, writer);
    this.k11_1 = forceQuoting;
  }
  protoOf(ComposerForUnquotedLiterals).d11 = function (value) {
    if (this.k11_1) {
      protoOf(Composer).d11.call(this, value);
    } else {
      protoOf(Composer).t10.call(this, value);
    }
  };
  function ComposerWithPrettyPrint(writer, json) {
    Composer.call(this, writer);
    this.n11_1 = json;
    this.o11_1 = 0;
  }
  protoOf(ComposerWithPrettyPrint).m10 = function () {
    this.l10_1 = true;
    this.o11_1 = this.o11_1 + 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).n10 = function () {
    this.o11_1 = this.o11_1 - 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).o10 = function () {
    this.l10_1 = false;
    this.t10('\n');
    // Inline function 'kotlin.repeat' call
    var times = this.o11_1;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.t10(this.n11_1.wx_1.pz_1);
      }
       while (inductionVariable < times);
  };
  protoOf(ComposerWithPrettyPrint).p10 = function () {
    if (this.l10_1)
      this.l10_1 = false;
    else {
      this.o10();
    }
  };
  protoOf(ComposerWithPrettyPrint).q10 = function () {
    this.r10(_Char___init__impl__6a9atx(32));
  };
  function readIfAbsent($this, descriptor, index) {
    $this.q11_1 = (!descriptor.mh(index) && descriptor.lh(index).yg());
    return $this.q11_1;
  }
  function JsonElementMarker$readIfAbsent$ref(p0) {
    return constructCallableReference(function (p0_0, p1) {
      var tmp0 = p0;
      return readIfAbsent(tmp0, p0_0, p1);
    }, 2, 0, 8, 'readIfAbsent', [p0]);
  }
  function JsonElementMarker(descriptor) {
    var tmp = this;
    tmp.p11_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.q11_1 = false;
  }
  protoOf(JsonElementMarker).r11 = function (index) {
    this.p11_1.do(index);
  };
  protoOf(JsonElementMarker).s11 = function () {
    return this.p11_1.eo();
  };
  function invalidTrailingComma(_this__u8e3s4, entity) {
    entity = entity === VOID ? 'object' : entity;
    _this__u8e3s4.t11('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.ly_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
  }
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.u11('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
  }
  function JsonEncodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonEncodingException);
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.ug() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.eh().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
  }
  function JsonDecodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonDecodingException);
  }
  function JsonDecodingException_0(offset, message, input) {
    return JsonDecodingException_1(offset, message + '\nJSON input: ' + toString(minify(input, offset)));
  }
  function InvalidFloatingPointDecoded(value, key, output) {
    return JsonDecodingException_1(-1, unexpectedFpErrorMessage(value, key, output));
  }
  function JsonDecodingException_1(offset, message) {
    return new JsonDecodingException(offset >= 0 ? 'Unexpected JSON token at offset ' + offset + ': ' + message : message);
  }
  function minify(_this__u8e3s4, offset) {
    offset = offset === VOID ? -1 : offset;
    if (charSequenceLength(_this__u8e3s4) < 200)
      return _this__u8e3s4;
    if (offset === -1) {
      var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
      if (start <= 0)
        return _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var endIndex = charSequenceLength(_this__u8e3s4);
      return '.....' + toString(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
    }
    var start_0 = offset - 30 | 0;
    var end = offset + 30 | 0;
    var prefix = start_0 <= 0 ? '' : '.....';
    var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
    var tmp2 = coerceAtLeast(start_0, 0);
    // Inline function 'kotlin.text.substring' call
    var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
    return prefix + toString(charSequenceSubSequence(_this__u8e3s4, tmp2, endIndex_0)) + suffix;
  }
  function InvalidFloatingPointEncoded(value, output) {
    return new JsonEncodingException('Unexpected special floating-point value ' + toString(value) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification. ' + "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output))));
  }
  function JsonException(message) {
    SerializationException_init_$Init$(message, this);
    captureStack(this, JsonException);
  }
  function unexpectedFpErrorMessage(value, key, output) {
    return 'Unexpected special floating-point value ' + toString(value) + ' with key ' + key + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification. ' + "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output)));
  }
  function get_JsonDeserializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonDeserializationNamesKey;
  }
  var JsonDeserializationNamesKey;
  function get_JsonSerializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonSerializationNamesKey;
  }
  var JsonSerializationNamesKey;
  function ignoreUnknownKeys(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp;
    if (json.wx_1.kz_1) {
      tmp = true;
    } else {
      var tmp0 = _this__u8e3s4.hh();
      var tmp$ret$0;
      $l$block_0: {
        // Inline function 'kotlin.collections.any' call
        var tmp_0;
        if (isInterface(tmp0, Collection)) {
          tmp_0 = tmp0.p();
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
        var _iterator__ex2g4s = tmp0.j();
        while (_iterator__ex2g4s.k()) {
          var element = _iterator__ex2g4s.l();
          if (element instanceof JsonIgnoreUnknownKeys) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
        }
        tmp$ret$0 = false;
      }
      tmp = tmp$ret$0;
    }
    return tmp;
  }
  function getJsonNameIndex(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    if (decodeCaseInsensitive(json, _this__u8e3s4)) {
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$0 = name.toLowerCase();
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, tmp$ret$0);
    }
    var strategy = namingStrategy(_this__u8e3s4, json);
    if (!(strategy == null))
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
    var index = _this__u8e3s4.jh(name);
    if (!(index === -3))
      return index;
    if (!json.wx_1.uz_1)
      return index;
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  }
  function getJsonNameIndexOrThrow(_this__u8e3s4, json, name, suffix) {
    suffix = suffix === VOID ? '' : suffix;
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var index = getJsonNameIndex(_this__u8e3s4, json, name);
    if (index === -3)
      throw SerializationException_init_$Create$(_this__u8e3s4.ug() + " does not contain element with name '" + name + "'" + suffix);
    return index;
  }
  function getJsonElementName(_this__u8e3s4, json, index) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    return strategy == null ? _this__u8e3s4.ih(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.eh(), CLASS_getInstance()) ? json.wx_1.vz_1 : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.w11(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return _this__u8e3s4.wx_1.wz_1 && equals(descriptor.eh(), ENUM_getInstance());
  }
  function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).t1(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  }
  function serializationNamesIndices(_this__u8e3s4, json, strategy) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(json);
    var tmp_0 = get_JsonSerializationNamesKey();
    return tmp.w11(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
    var strategyForClasses = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.gh();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        var tmp0 = _this__u8e3s4.kh(i);
        // Inline function 'kotlin.collections.filterIsInstanceTo' call
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.j();
        while (_iterator__ex2g4s.k()) {
          var element = _iterator__ex2g4s.l();
          if (element instanceof JsonNames) {
            destination.f(element);
          }
        }
        var tmp0_safe_receiver = singleOrNull(destination);
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.x11_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.collections.forEach' call
          var inductionVariable_0 = 0;
          var last_0 = tmp1_safe_receiver.length;
          while (inductionVariable_0 < last_0) {
            var element_0 = tmp1_safe_receiver[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp;
            if (useLowercaseEnums) {
              // Inline function 'kotlin.text.lowercase' call
              // Inline function 'kotlin.js.asDynamic' call
              tmp = element_0.toLowerCase();
            } else {
              tmp = element_0;
            }
            buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, tmp, i);
          }
        }
        var tmp_0;
        if (useLowercaseEnums) {
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp_0 = _this__u8e3s4.ih(i).toLowerCase();
        } else if (!(strategyForClasses == null)) {
          tmp_0 = strategyForClasses.y11(_this__u8e3s4, i, _this__u8e3s4.ih(i));
        } else {
          tmp_0 = null;
        }
        var nameToPut = tmp_0;
        if (nameToPut == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
        }
      }
       while (inductionVariable < last);
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp_1;
    if (builder.p()) {
      tmp_1 = emptyMap();
    } else {
      tmp_1 = builder;
    }
    return tmp_1;
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
    return function () {
      var tmp = 0;
      var tmp_0 = $this_serializationNamesIndices.gh();
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = Array(tmp_0);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        var baseName = $this_serializationNamesIndices.ih(tmp_2);
        tmp_1[tmp_2] = $strategy.y11($this_serializationNamesIndices, tmp_2, baseName);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
    var entity = equals($this_buildDeserializationNamesMap.eh(), ENUM_getInstance()) ? 'enum value' : 'property';
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).r1(name)) {
      throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.ih(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.ih(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.x1(name, index);
  }
  var properties_initialized_JsonNamesMap_kt_ljpf42;
  function _init_properties_JsonNamesMap_kt__cbbp0k() {
    if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
      properties_initialized_JsonNamesMap_kt_ljpf42 = true;
      JsonDeserializationNamesKey = new Key();
      JsonSerializationNamesKey = new Key();
    }
  }
  function Tombstone() {
  }
  var Tombstone_instance;
  function Tombstone_getInstance() {
    return Tombstone_instance;
  }
  function resize($this) {
    var newSize = imul($this.b12_1, 2);
    $this.z11_1 = copyOf($this.z11_1, newSize);
    $this.a12_1 = copyOf_0($this.a12_1, newSize);
  }
  function JsonPath() {
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.z11_1 = Array(8);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.a12_1 = tmp_2;
    this.b12_1 = -1;
  }
  protoOf(JsonPath).c12 = function (sd) {
    this.b12_1 = this.b12_1 + 1 | 0;
    var depth = this.b12_1;
    if (depth === this.z11_1.length) {
      resize(this);
    }
    this.z11_1[depth] = sd;
  };
  protoOf(JsonPath).d12 = function (index) {
    this.a12_1[this.b12_1] = index;
  };
  protoOf(JsonPath).e12 = function (key) {
    var tmp;
    if (!(this.a12_1[this.b12_1] === -2)) {
      this.b12_1 = this.b12_1 + 1 | 0;
      tmp = this.b12_1 === this.z11_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.z11_1[this.b12_1] = key;
    this.a12_1[this.b12_1] = -2;
  };
  protoOf(JsonPath).f12 = function () {
    if (this.a12_1[this.b12_1] === -2) {
      this.z11_1[this.b12_1] = Tombstone_instance;
    }
  };
  protoOf(JsonPath).g12 = function () {
    var depth = this.b12_1;
    if (this.a12_1[depth] === -2) {
      this.a12_1[depth] = -1;
      this.b12_1 = this.b12_1 - 1 | 0;
    }
    if (!(this.b12_1 === -1)) {
      this.b12_1 = this.b12_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).h12 = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.m6('$');
    // Inline function 'kotlin.repeat' call
    var times = this.b12_1 + 1 | 0;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var element = this.z11_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.eh(), LIST_getInstance())) {
            if (!(this.a12_1[index] === -1)) {
              this_0.m6('[');
              this_0.h9(this.a12_1[index]);
              this_0.m6(']');
            }
          } else {
            var idx = this.a12_1[index];
            if (idx >= 0) {
              this_0.m6('.');
              this_0.m6(element.ih(idx));
            }
          }
        } else {
          if (!(element === Tombstone_instance)) {
            this_0.m6('[');
            this_0.m6("'");
            this_0.l6(element);
            this_0.m6("'");
            this_0.m6(']');
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.h12();
  };
  function checkKind($this, descriptor, actualClass) {
    var kind = descriptor.eh();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.a8() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.j12_1)
      return Unit_instance;
    if (!$this.k12_1)
      return Unit_instance;
    var tmp_0;
    var tmp_1;
    if (equals(kind, LIST_getInstance()) || equals(kind, MAP_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = kind instanceof PrimitiveKind;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = kind instanceof ENUM;
    }
    if (tmp_0) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.a8() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
    }
  }
  function checkDiscriminatorCollisions($this, descriptor, actualClass) {
    var inductionVariable = 0;
    var last = descriptor.gh();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var name = descriptor.ih(i);
        if (name === $this.i12_1) {
          throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation ' + 'or fall back to array polymorphism');
        }
      }
       while (inductionVariable < last);
  }
  function JsonSerializersModuleValidator(configuration) {
    this.i12_1 = configuration.sz_1;
    this.j12_1 = configuration.rz_1;
    this.k12_1 = !configuration.zz_1.equals(ClassDiscriminatorMode_NONE_getInstance());
  }
  protoOf(JsonSerializersModuleValidator).qx = function (kClass, provider) {
  };
  protoOf(JsonSerializersModuleValidator).tx = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.xf();
    checkKind(this, descriptor, actualClass);
    if (!this.j12_1 && this.k12_1) {
      checkDiscriminatorCollisions(this, descriptor, actualClass);
    }
  };
  protoOf(JsonSerializersModuleValidator).ux = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(JsonSerializersModuleValidator).vx = function (baseClass, defaultDeserializerProvider) {
  };
  function encodeByWriter(json, writer, serializer, value) {
    var tmp = WriteMode_OBJ_getInstance();
    // Inline function 'kotlin.arrayOfNulls' call
    var size = get_entries().m();
    var tmp$ret$0 = Array(size);
    var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
    encoder.pk(serializer, value);
  }
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.u12_1.y12(6);
    if ($this.u12_1.z12() === 4) {
      $this.u12_1.u11('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.u12_1.a13()) {
      var key = $this.v12_1 ? $this.u12_1.c13() : $this.u12_1.b13();
      $this.u12_1.y12(5);
      var element = $this.d13();
      // Inline function 'kotlin.collections.set' call
      result.x1(key, element);
      lastToken = $this.u12_1.e13();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== 4)
        if (tmp0_subject === 7)
          break $l$loop;
        else {
          $this.u12_1.u11('Expected end of the object or comma');
        }
    }
    if (lastToken === 6) {
      $this.u12_1.y12(7);
    } else if (lastToken === 4) {
      if (!$this.w12_1) {
        invalidTrailingComma($this.u12_1);
      }
      $this.u12_1.y12(7);
    }
    return new JsonObject(result);
  }
  function readObject_0($this, $receiver, $completion) {
    var tmp = new $readObjectCOROUTINE$($this, $receiver, $completion);
    tmp.d7_1 = Unit_instance;
    tmp.e7_1 = null;
    return tmp.j7();
  }
  function readArray($this) {
    var lastToken = $this.u12_1.e13();
    if ($this.u12_1.z12() === 4) {
      $this.u12_1.u11('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.u12_1.a13()) {
      var element = $this.d13();
      result.f(element);
      lastToken = $this.u12_1.e13();
      if (!(lastToken === 4)) {
        var tmp0 = $this.u12_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = lastToken === 9;
        var position = tmp0.ly_1;
        if (!condition) {
          var tmp$ret$2 = 'Expected end of the array or comma';
          tmp0.u11(tmp$ret$2, position);
        }
      }
    }
    if (lastToken === 8) {
      $this.u12_1.y12(9);
    } else if (lastToken === 4) {
      if (!$this.w12_1) {
        invalidTrailingComma($this.u12_1, 'array');
      }
      $this.u12_1.y12(9);
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.v12_1 || !isString) {
      tmp = $this.u12_1.c13();
    } else {
      tmp = $this.u12_1.b13();
    }
    var string = tmp;
    if (!isString && string === 'null')
      return JsonNull_getInstance();
    return new JsonLiteral(string, isString);
  }
  function readDeepRecursive($this) {
    return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
  }
  function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
    this.b14_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).f14 = function ($this$DeepRecursiveFunction, it, $completion) {
    var tmp = this.g14($this$DeepRecursiveFunction, it, $completion);
    tmp.d7_1 = Unit_instance;
    tmp.e7_1 = null;
    return tmp.j7();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).p7 = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.f14(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).j7 = function () {
    var suspendResult = this.d7_1;
    $sm: do
      try {
        var tmp = this.b7_1;
        switch (tmp) {
          case 0:
            this.c7_1 = 3;
            var tmp0_subject = this.b14_1.u12_1.z12();
            if (tmp0_subject === 1) {
              this.e14_1 = readValue(this.b14_1, true);
              this.b7_1 = 2;
              continue $sm;
            } else {
              if (tmp0_subject === 0) {
                this.e14_1 = readValue(this.b14_1, false);
                this.b7_1 = 2;
                continue $sm;
              } else {
                if (tmp0_subject === 6) {
                  this.b7_1 = 1;
                  suspendResult = readObject_0(this.b14_1, this.c14_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (tmp0_subject === 8) {
                    this.e14_1 = readArray(this.b14_1);
                    this.b7_1 = 2;
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.b14_1.u12_1.u11("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.e14_1 = suspendResult;
            this.b7_1 = 2;
            continue $sm;
          case 2:
            return this.e14_1;
          case 3:
            throw this.e7_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c7_1 === 3) {
          throw e;
        } else {
          this.b7_1 = this.c7_1;
          this.e7_1 = e;
        }
      }
     while (true);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).g14 = function ($this$DeepRecursiveFunction, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.b14_1, completion);
    i.c14_1 = $this$DeepRecursiveFunction;
    i.d14_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    return constructCallableReference(function ($this$DeepRecursiveFunction, it, $completion) {
      return i.f14($this$DeepRecursiveFunction, it, $completion);
    }, 2);
  }
  function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.n13_1 = _this__u8e3s4;
    this.o13_1 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$).j7 = function () {
    var suspendResult = this.d7_1;
    $sm: do
      try {
        var tmp = this.b7_1;
        switch (tmp) {
          case 0:
            this.c7_1 = 5;
            this.q13_1 = this.n13_1;
            this.r13_1 = this.q13_1.u12_1.y12(6);
            if (this.q13_1.u12_1.z12() === 4) {
              this.q13_1.u12_1.u11('Unexpected leading comma');
            }

            var tmp_0 = this;
            tmp_0.p13_1 = LinkedHashMap_init_$Create$();
            this.b7_1 = 1;
            continue $sm;
          case 1:
            if (!this.q13_1.u12_1.a13()) {
              this.b7_1 = 4;
              continue $sm;
            }

            this.s13_1 = this.q13_1.v12_1 ? this.q13_1.u12_1.c13() : this.q13_1.u12_1.b13();
            this.q13_1.u12_1.y12(5);
            this.b7_1 = 2;
            suspendResult = this.o13_1.nd(Unit_instance, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var tmp0 = this.p13_1;
            var key = this.s13_1;
            tmp0.x1(key, element);
            this.r13_1 = this.q13_1.u12_1.e13();
            var tmp0_subject = this.r13_1;
            if (tmp0_subject === 4) {
              this.b7_1 = 3;
              continue $sm;
            } else {
              if (tmp0_subject === 7) {
                this.b7_1 = 4;
                continue $sm;
              } else {
                this.q13_1.u12_1.u11('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.b7_1 = 1;
            continue $sm;
          case 4:
            if (this.r13_1 === 6) {
              this.q13_1.u12_1.y12(7);
            } else if (this.r13_1 === 4) {
              if (!this.q13_1.w12_1) {
                invalidTrailingComma(this.q13_1.u12_1);
              }
              this.q13_1.u12_1.y12(7);
            }

            return new JsonObject(this.p13_1);
          case 5:
            throw this.e7_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.c7_1 === 5) {
          throw e;
        } else {
          this.b7_1 = this.c7_1;
          this.e7_1 = e;
        }
      }
     while (true);
  };
  function JsonTreeReader(configuration, lexer) {
    this.u12_1 = lexer;
    this.v12_1 = configuration.lz_1;
    this.w12_1 = configuration.xz_1;
    this.x12_1 = 0;
  }
  protoOf(JsonTreeReader).d13 = function () {
    var token = this.u12_1.z12();
    var tmp;
    if (token === 1) {
      tmp = readValue(this, true);
    } else if (token === 0) {
      tmp = readValue(this, false);
    } else if (token === 6) {
      var tmp_0;
      this.x12_1 = this.x12_1 + 1 | 0;
      if (this.x12_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.x12_1 = this.x12_1 - 1 | 0;
      tmp = result;
    } else if (token === 8) {
      tmp = readArray(this);
    } else {
      this.u12_1.u11('Cannot read Json element because of unexpected ' + tokenDescription(token));
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var _iterator__ex2g4s = _this__u8e3s4.hh().j();
    while (_iterator__ex2g4s.k()) {
      var annotation = _iterator__ex2g4s.l();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.h14_1;
    }
    return json.wx_1.sz_1;
  }
  function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
    if (!(serializer instanceof SealedClassSerializer))
      return Unit_instance;
    if (jsonCachedSerialNames(actualSerializer.xf()).n1(classDiscriminator)) {
      var baseName = serializer.xf().ug();
      var actualName = actualSerializer.xf().ug();
      // Inline function 'kotlin.error' call
      var message = "Sealed class '" + actualName + "' cannot be serialized as base class '" + baseName + "' because" + (" it has property name that conflicts with JSON class discriminator '" + classDiscriminator + "'. ") + 'You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation or fall back to array polymorphism';
      throw IllegalStateException_init_$Create$(toString(message));
    }
  }
  function checkKind_0(kind) {
    if (kind instanceof ENUM) {
      // Inline function 'kotlin.error' call
      var message = "Enums cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if (kind instanceof PrimitiveKind) {
      // Inline function 'kotlin.error' call
      var message_0 = "Primitives cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    if (kind instanceof PolymorphicKind) {
      // Inline function 'kotlin.error' call
      var message_1 = 'Actual serializer for polymorphic cannot be polymorphic itself';
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
  }
  function access$validateIfSealed$tPolymorphicKt(serializer, actualSerializer, classDiscriminator) {
    return validateIfSealed(serializer, actualSerializer, classDiscriminator);
  }
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.v11_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).i14 = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.v11_1;
    var value_0 = this_0.t1(descriptor);
    var tmp;
    if (value_0 == null) {
      var answer = createMapForCache(2);
      this_0.x1(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var tmp0 = tmp;
    var tmp2 = key instanceof Key ? key : THROW_CCE();
    // Inline function 'kotlin.collections.set' call
    var value_1 = !(value == null) ? value : THROW_CCE();
    tmp0.x1(tmp2, value_1);
  };
  protoOf(DescriptorSchemaCache).w11 = function (descriptor, key, defaultValue) {
    var tmp0_safe_receiver = this.j14(descriptor, key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var value = defaultValue();
    this.i14(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).j14 = function (descriptor, key) {
    var tmp0_safe_receiver = this.v11_1.t1(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp0_safe_receiver.t1(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function DiscriminatorHolder(discriminatorToSkip) {
    this.k14_1 = discriminatorToSkip;
  }
  function trySkip($this, $receiver, unknownKey) {
    if ($receiver == null)
      return false;
    if ($receiver.k14_1 === unknownKey) {
      $receiver.k14_1 = null;
      return true;
    }
    return false;
  }
  function skipLeftoverElements($this, descriptor) {
    while (!($this.oj(descriptor) === -1)) {
    }
  }
  function checkLeadingComma($this) {
    if ($this.fy_1.z12() === 4) {
      $this.fy_1.u11('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.hy_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.hy_1 === -1)) {
        hasComma = $this.fy_1.m14();
      }
    } else {
      $this.fy_1.l14(_Char___init__impl__6a9atx(58));
    }
    var tmp;
    if ($this.fy_1.a13()) {
      if (decodingKey) {
        if ($this.hy_1 === -1) {
          var tmp0 = $this.fy_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition = !hasComma;
          var position = tmp0.ly_1;
          if (!condition) {
            var tmp$ret$1 = 'Unexpected leading comma';
            tmp0.u11(tmp$ret$1, position);
          }
        } else {
          var tmp0_0 = $this.fy_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition_0 = hasComma;
          var position_0 = tmp0_0.ly_1;
          if (!condition_0) {
            var tmp$ret$3 = 'Expected comma after the key-value pair';
            tmp0_0.u11(tmp$ret$3, position_0);
          }
        }
      }
      $this.hy_1 = $this.hy_1 + 1 | 0;
      tmp = $this.hy_1;
    } else {
      if (hasComma && !$this.dy_1.wx_1.xz_1) {
        invalidTrailingComma($this.fy_1);
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp0 = $this.dy_1;
    var tmp$ret$0;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.mh(index);
      var elementDescriptor = descriptor.lh(index);
      var tmp;
      if (isOptional && !elementDescriptor.yg()) {
        tmp = $this.fy_1.n14(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.eh(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.yg()) {
          tmp_0 = $this.fy_1.n14(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$0 = false;
          break $l$block_2;
        }
        var tmp0_elvis_lhs = $this.fy_1.o14($this.jy_1.lz_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$0 = false;
          break $l$block_2;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.wx_1.oz_1 && elementDescriptor.yg();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          $this.fy_1.b13();
          tmp$ret$0 = true;
          break $l$block_2;
        }
      }
      tmp$ret$0 = false;
    }
    return tmp$ret$0;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.fy_1.m14();
    while ($this.fy_1.a13()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.fy_1.l14(_Char___init__impl__6a9atx(58));
      var index = getJsonNameIndex(descriptor, $this.dy_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.jy_1.qz_1 && coerceInputValue($this, descriptor, index)) {
          hasComma = $this.fy_1.m14();
          tmp_0 = false;
        } else {
          var tmp0_safe_receiver = $this.ky_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.r11(index);
          }
          return index;
        }
        tmp = tmp_0;
      } else {
        tmp = true;
      }
      var isUnknown = tmp;
      if (isUnknown) {
        hasComma = handleUnknown($this, descriptor, key);
      }
    }
    if (hasComma && !$this.dy_1.wx_1.xz_1) {
      invalidTrailingComma($this.fy_1);
    }
    var tmp1_safe_receiver = $this.ky_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.s11();
    return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
  }
  function handleUnknown($this, descriptor, key) {
    if (ignoreUnknownKeys(descriptor, $this.dy_1) || trySkip($this, $this.iy_1, key)) {
      $this.fy_1.q14($this.jy_1.lz_1);
    } else {
      $this.fy_1.my_1.g12();
      $this.fy_1.p14(key);
    }
    return $this.fy_1.m14();
  }
  function decodeListIndex($this) {
    var hasComma = $this.fy_1.m14();
    var tmp;
    if ($this.fy_1.a13()) {
      if (!($this.hy_1 === -1) && !hasComma) {
        $this.fy_1.u11('Expected end of the array or comma');
      }
      $this.hy_1 = $this.hy_1 + 1 | 0;
      tmp = $this.hy_1;
    } else {
      if (hasComma && !$this.dy_1.wx_1.xz_1) {
        invalidTrailingComma($this.fy_1, 'array');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.jy_1.lz_1) {
      tmp = $this.fy_1.s14();
    } else {
      tmp = $this.fy_1.r14();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.dy_1 = json;
    this.ey_1 = mode;
    this.fy_1 = lexer;
    this.gy_1 = this.dy_1.mj();
    this.hy_1 = -1;
    this.iy_1 = discriminatorHolder;
    this.jy_1 = this.dy_1.wx_1;
    this.ky_1 = this.jy_1.oz_1 ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).t14 = function () {
    return this.dy_1;
  };
  protoOf(StreamingJsonDecoder).mj = function () {
    return this.gy_1;
  };
  protoOf(StreamingJsonDecoder).u14 = function () {
    return (new JsonTreeReader(this.dy_1.wx_1, this.fy_1)).d13();
  };
  protoOf(StreamingJsonDecoder).wi = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.dy_1.wx_1.rz_1;
      }
      if (tmp) {
        return deserializer.zf(this);
      }
      var discriminator = classDiscriminator(deserializer.xf(), this.dy_1);
      var tmp0_elvis_lhs = this.fy_1.v14(discriminator, this.jy_1.lz_1);
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        var tmp2 = isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE();
        var tmp$ret$0;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
          var tmp_1;
          if (!(tmp2 instanceof AbstractPolymorphicSerializer)) {
            tmp_1 = true;
          } else {
            tmp_1 = this.t14().wx_1.rz_1;
          }
          if (tmp_1) {
            tmp$ret$0 = tmp2.zf(this);
            break $l$block;
          }
          var discriminator_0 = classDiscriminator(tmp2.xf(), this.t14());
          var tmp0 = this.u14();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = tmp2.xf().ug();
          if (!(tmp0 instanceof JsonObject)) {
            var tmp_2 = getKClass(JsonObject).a8();
            var tmp_3 = getKClassFromExpression(tmp0).a8();
            var tmp$ret$2 = this.fy_1.my_1.h12();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$2, toString(tmp0));
          }
          var jsonTree = tmp0;
          var tmp0_safe_receiver = jsonTree.c10(discriminator_0);
          var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
          var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
          var tmp_4;
          try {
            tmp_4 = findPolymorphicSerializer(tmp2, this, type);
          } catch ($p) {
            var tmp_5;
            if ($p instanceof SerializationException) {
              var it = $p;
              throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
            } else {
              throw $p;
            }
          }
          var tmp_6 = tmp_4;
          var actualSerializer = isInterface(tmp_6, DeserializationStrategy) ? tmp_6 : THROW_CCE();
          tmp$ret$0 = readPolymorphicJson(this.t14(), discriminator_0, jsonTree, actualSerializer);
        }
        return tmp$ret$0;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      var type_0 = tmp_0;
      var tmp_7;
      try {
        tmp_7 = findPolymorphicSerializer(deserializer, this, type_0);
      } catch ($p_0) {
        var tmp_8;
        if ($p_0 instanceof SerializationException) {
          var it_0 = $p_0;
          var message = removeSuffix(substringBefore(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10)), '.');
          var hint = substringAfter(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10), '');
          this.fy_1.u11(message, VOID, hint);
        } else {
          throw $p_0;
        }
        tmp_7 = tmp_8;
      }
      var tmp_9 = tmp_7;
      var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
      this.iy_1 = new DiscriminatorHolder(discriminator);
      return actualSerializer_0.zf(this);
    } catch ($p_1) {
      if ($p_1 instanceof MissingFieldException) {
        var e = $p_1;
        if (contains(ensureNotNull(e.message), 'at path'))
          throw e;
        throw new MissingFieldException(e.xg_1, plus(e.message, ' at path: ') + this.fy_1.my_1.h12(), e);
      } else {
        throw $p_1;
      }
    }
  };
  protoOf(StreamingJsonDecoder).xi = function (descriptor) {
    var newMode = switchMode(this.dy_1, descriptor);
    this.fy_1.my_1.c12(descriptor);
    this.fy_1.l14(newMode.y14_1);
    checkLeadingComma(this);
    var tmp;
    switch (newMode.z1_1) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.dy_1, newMode, this.fy_1, descriptor, this.iy_1);
        break;
      default:
        var tmp_0;
        if (this.ey_1.equals(newMode) && this.dy_1.wx_1.oz_1) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.dy_1, newMode, this.fy_1, descriptor, this.iy_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).yi = function (descriptor) {
    if (descriptor.gh() === 0 && ignoreUnknownKeys(descriptor, this.dy_1)) {
      skipLeftoverElements(this, descriptor);
    }
    if (this.fy_1.m14() && !this.dy_1.wx_1.xz_1) {
      invalidTrailingComma(this.fy_1, '');
    }
    this.fy_1.l14(this.ey_1.z14_1);
    this.fy_1.my_1.g12();
  };
  protoOf(StreamingJsonDecoder).ii = function () {
    var tmp;
    var tmp0_safe_receiver = this.ky_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q11_1;
    if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
      tmp = !this.fy_1.a15();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).ji = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).jj = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.ey_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
    if (isMapKey) {
      this.fy_1.my_1.f12();
    }
    var value = protoOf(AbstractDecoder).jj.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.fy_1.my_1.e12(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).oj = function (descriptor) {
    var index;
    switch (this.ey_1.z1_1) {
      case 0:
        index = decodeObjectIndex(this, descriptor);
        break;
      case 2:
        index = decodeMapIndex(this);
        break;
      default:
        index = decodeListIndex(this);
        break;
    }
    if (!this.ey_1.equals(WriteMode_MAP_getInstance())) {
      this.fy_1.my_1.d12(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).ki = function () {
    return this.fy_1.b15();
  };
  protoOf(StreamingJsonDecoder).li = function () {
    var value = this.fy_1.c15();
    if (!equalsLong(value, fromInt(convertToByte(value)))) {
      this.fy_1.u11("Failed to parse byte for input '" + value.toString() + "'");
    }
    return convertToByte(value);
  };
  protoOf(StreamingJsonDecoder).mi = function () {
    var value = this.fy_1.c15();
    if (!equalsLong(value, fromInt(convertToShort(value)))) {
      this.fy_1.u11("Failed to parse short for input '" + value.toString() + "'");
    }
    return convertToShort(value);
  };
  protoOf(StreamingJsonDecoder).ni = function () {
    var value = this.fy_1.c15();
    if (!equalsLong(value, fromInt(convertToInt(value)))) {
      this.fy_1.u11("Failed to parse int for input '" + value.toString() + "'");
    }
    return convertToInt(value);
  };
  protoOf(StreamingJsonDecoder).oi = function () {
    return this.fy_1.c15();
  };
  protoOf(StreamingJsonDecoder).pi = function () {
    var tmp0 = this.fy_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c13();
      try {
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$0 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.u11("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$0;
    var specialFp = this.dy_1.wx_1.tz_1;
    if (specialFp || isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.fy_1, result);
  };
  protoOf(StreamingJsonDecoder).qi = function () {
    var tmp0 = this.fy_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c13();
      try {
        tmp$ret$0 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.u11("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$0;
    var specialFp = this.dy_1.wx_1.tz_1;
    if (specialFp || isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.fy_1, result);
  };
  protoOf(StreamingJsonDecoder).ri = function () {
    var string = this.fy_1.c13();
    if (!(string.length === 1)) {
      this.fy_1.u11("Expected single char, but got '" + string + "'");
    }
    return charCodeAt(string, 0);
  };
  protoOf(StreamingJsonDecoder).si = function () {
    var tmp;
    if (this.jy_1.lz_1) {
      tmp = this.fy_1.s14();
    } else {
      tmp = this.fy_1.b13();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).ui = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.fy_1, this.dy_1) : protoOf(AbstractDecoder).ui.call(this, descriptor);
  };
  protoOf(StreamingJsonDecoder).ti = function (enumDescriptor) {
    return getJsonNameIndexOrThrow(enumDescriptor, this.dy_1, this.si(), ' at path ' + this.fy_1.my_1.h12());
  };
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.d15_1 = lexer;
    this.e15_1 = json.mj();
  }
  protoOf(JsonDecoderForUnsignedTypes).mj = function () {
    return this.e15_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).oj = function (descriptor) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).ni = function () {
    var tmp0 = this.d15_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c13();
      try {
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = toUInt(input);
        tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.u11("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(JsonDecoderForUnsignedTypes).oi = function () {
    var tmp0 = this.d15_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c13();
      try {
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = toULong(input);
        tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.u11("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(JsonDecoderForUnsignedTypes).li = function () {
    var tmp0 = this.d15_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c13();
      try {
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = toUByte(input);
        tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.u11("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(JsonDecoderForUnsignedTypes).mi = function () {
    var tmp0 = this.d15_1;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.c13();
      try {
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = toUShort(input);
        tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.u11("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  function get_unsignedNumberDescriptors() {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return unsignedNumberDescriptors;
  }
  var unsignedNumberDescriptors;
  function StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, $this) {
    StreamingJsonEncoder.call($this, Composer_0(output, json), json, mode, modeReuseCache);
    return $this;
  }
  function StreamingJsonEncoder_init_$Create$(output, json, mode, modeReuseCache) {
    return StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, objectCreate(protoOf(StreamingJsonEncoder)));
  }
  function encodeTypeInfo($this, discriminator, serialName) {
    $this.l12_1.o10();
    $this.bk(discriminator);
    $this.l12_1.r10(_Char___init__impl__6a9atx(58));
    $this.l12_1.q10();
    $this.bk(serialName);
  }
  function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
    AbstractEncoder.call(this);
    this.l12_1 = composer;
    this.m12_1 = json;
    this.n12_1 = mode;
    this.o12_1 = modeReuseCache;
    this.p12_1 = this.m12_1.mj();
    this.q12_1 = this.m12_1.wx_1;
    this.r12_1 = false;
    this.s12_1 = null;
    this.t12_1 = null;
    var i = this.n12_1.z1_1;
    if (!(this.o12_1 == null)) {
      if (!(this.o12_1[i] === null) || !(this.o12_1[i] === this)) {
        this.o12_1[i] = this;
      }
    }
  }
  protoOf(StreamingJsonEncoder).t14 = function () {
    return this.m12_1;
  };
  protoOf(StreamingJsonEncoder).mj = function () {
    return this.p12_1;
  };
  protoOf(StreamingJsonEncoder).uk = function (descriptor, index) {
    return this.q12_1.jz_1;
  };
  protoOf(StreamingJsonEncoder).pk = function (serializer, value) {
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
      if (this.t14().wx_1.rz_1) {
        serializer.yf(this, value);
        break $l$block;
      }
      var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
      var tmp;
      if (isPolymorphicSerializer) {
        tmp = !this.t14().wx_1.zz_1.equals(ClassDiscriminatorMode_NONE_getInstance());
      } else {
        var tmp_0;
        switch (this.t14().wx_1.zz_1.z1_1) {
          case 0:
          case 2:
            tmp_0 = false;
            break;
          case 1:
            // Inline function 'kotlin.let' call

            var it = serializer.xf().eh();
            tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        tmp = tmp_0;
      }
      var needDiscriminator = tmp;
      var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.xf(), this.t14()) : null;
      var tmp_1;
      if (isPolymorphicSerializer) {
        var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          if (value == null) {
            var message = 'Value for serializer ' + toString(serializer.xf()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          } else {
            break $l$block_0;
          }
        }
        var actual = findPolymorphicSerializer_0(casted, this, value);
        if (!(baseClassDiscriminator == null)) {
          access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
          checkKind_0(actual.xf().eh());
        }
        tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
      } else {
        tmp_1 = serializer;
      }
      var actualSerializer = tmp_1;
      if (!(baseClassDiscriminator == null)) {
        var serialName = actualSerializer.xf().ug();
        this.s12_1 = baseClassDiscriminator;
        this.t12_1 = serialName;
      }
      actualSerializer.yf(this, value);
    }
  };
  protoOf(StreamingJsonEncoder).xi = function (descriptor) {
    var newMode = switchMode(this.m12_1, descriptor);
    if (!(newMode.y14_1 === _Char___init__impl__6a9atx(0))) {
      this.l12_1.r10(newMode.y14_1);
      this.l12_1.m10();
    }
    var discriminator = this.s12_1;
    if (!(discriminator == null)) {
      var tmp0_elvis_lhs = this.t12_1;
      encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.ug() : tmp0_elvis_lhs);
      this.s12_1 = null;
      this.t12_1 = null;
    }
    if (this.n12_1.equals(newMode)) {
      return this;
    }
    var tmp1_safe_receiver = this.o12_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.z1_1];
    return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.l12_1, this.m12_1, newMode, this.o12_1) : tmp2_elvis_lhs;
  };
  protoOf(StreamingJsonEncoder).yi = function (descriptor) {
    if (!(this.n12_1.z14_1 === _Char___init__impl__6a9atx(0))) {
      this.l12_1.n10();
      this.l12_1.p10();
      this.l12_1.r10(this.n12_1.z14_1);
    }
  };
  protoOf(StreamingJsonEncoder).qj = function (descriptor, index) {
    switch (this.n12_1.z1_1) {
      case 1:
        if (!this.l12_1.l10_1) {
          this.l12_1.r10(_Char___init__impl__6a9atx(44));
        }

        this.l12_1.o10();
        break;
      case 2:
        if (!this.l12_1.l10_1) {
          var tmp = this;
          var tmp_0;
          if ((index % 2 | 0) === 0) {
            this.l12_1.r10(_Char___init__impl__6a9atx(44));
            this.l12_1.o10();
            tmp_0 = true;
          } else {
            this.l12_1.r10(_Char___init__impl__6a9atx(58));
            this.l12_1.q10();
            tmp_0 = false;
          }
          tmp.r12_1 = tmp_0;
        } else {
          this.r12_1 = true;
          this.l12_1.o10();
        }

        break;
      case 3:
        if (index === 0)
          this.r12_1 = true;
        if (index === 1) {
          this.l12_1.r10(_Char___init__impl__6a9atx(44));
          this.l12_1.q10();
          this.r12_1 = false;
        }

        break;
      default:
        if (!this.l12_1.l10_1) {
          this.l12_1.r10(_Char___init__impl__6a9atx(44));
        }

        this.l12_1.o10();
        this.bk(getJsonElementName(descriptor, this.m12_1, index));
        this.l12_1.r10(_Char___init__impl__6a9atx(58));
        this.l12_1.q10();
        break;
    }
    return true;
  };
  protoOf(StreamingJsonEncoder).qk = function (descriptor, index, serializer, value) {
    if (!(value == null) || this.q12_1.oz_1) {
      protoOf(AbstractEncoder).qk.call(this, descriptor, index, serializer, value);
    }
  };
  protoOf(StreamingJsonEncoder).dk = function (descriptor) {
    var tmp;
    if (get_isUnsignedNumber(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_0;
      var tmp_1 = this.l12_1;
      if (tmp_1 instanceof ComposerForUnsignedNumbers) {
        tmp_0 = this.l12_1;
      } else {
        var tmp0 = this.l12_1.k10_1;
        var p1 = this.r12_1;
        tmp_0 = new ComposerForUnsignedNumbers(tmp0, p1);
      }
      var tmp$ret$0 = tmp_0;
      tmp = new StreamingJsonEncoder(tmp$ret$0, this.m12_1, this.n12_1, null);
    } else if (get_isUnquotedLiteral(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_2;
      var tmp_3 = this.l12_1;
      if (tmp_3 instanceof ComposerForUnquotedLiterals) {
        tmp_2 = this.l12_1;
      } else {
        var tmp0_0 = this.l12_1.k10_1;
        var p1_0 = this.r12_1;
        tmp_2 = new ComposerForUnquotedLiterals(tmp0_0, p1_0);
      }
      var tmp$ret$2 = tmp_2;
      tmp = new StreamingJsonEncoder(tmp$ret$2, this.m12_1, this.n12_1, null);
    } else if (!(this.s12_1 == null)) {
      // Inline function 'kotlin.apply' call
      this.t12_1 = descriptor.ug();
      tmp = this;
    } else {
      tmp = protoOf(AbstractEncoder).dk.call(this, descriptor);
    }
    return tmp;
  };
  protoOf(StreamingJsonEncoder).sj = function () {
    this.l12_1.t10('null');
  };
  protoOf(StreamingJsonEncoder).tj = function (value) {
    if (this.r12_1) {
      this.bk(value.toString());
    } else {
      this.l12_1.c11(value);
    }
  };
  protoOf(StreamingJsonEncoder).uj = function (value) {
    if (this.r12_1) {
      this.bk(value.toString());
    } else {
      this.l12_1.x10(value);
    }
  };
  protoOf(StreamingJsonEncoder).vj = function (value) {
    if (this.r12_1) {
      this.bk(value.toString());
    } else {
      this.l12_1.z10(value);
    }
  };
  protoOf(StreamingJsonEncoder).wj = function (value) {
    if (this.r12_1) {
      this.bk(value.toString());
    } else {
      this.l12_1.a11(value);
    }
  };
  protoOf(StreamingJsonEncoder).xj = function (value) {
    if (this.r12_1) {
      this.bk(value.toString());
    } else {
      this.l12_1.b11(value);
    }
  };
  protoOf(StreamingJsonEncoder).yj = function (value) {
    if (this.r12_1) {
      this.bk(value.toString());
    } else {
      this.l12_1.v10(value);
    }
    if (!this.q12_1.tz_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded(value, toString(this.l12_1.k10_1));
    }
  };
  protoOf(StreamingJsonEncoder).zj = function (value) {
    if (this.r12_1) {
      this.bk(value.toString());
    } else {
      this.l12_1.w10(value);
    }
    if (!this.q12_1.tz_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded(value, toString(this.l12_1.k10_1));
    }
  };
  protoOf(StreamingJsonEncoder).ak = function (value) {
    this.bk(toString_1(value));
  };
  protoOf(StreamingJsonEncoder).bk = function (value) {
    return this.l12_1.d11(value);
  };
  protoOf(StreamingJsonEncoder).ck = function (enumDescriptor, index) {
    this.bk(enumDescriptor.ih(index));
  };
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.fh() && get_unsignedNumberDescriptors().n1(_this__u8e3s4);
  }
  function get_isUnquotedLiteral(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.fh() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_0(Companion_getInstance()).xf(), serializer_1(Companion_getInstance_0()).xf(), serializer_2(Companion_getInstance_1()).xf(), serializer_3(Companion_getInstance_2()).xf()]);
    }
  }
  function get_ESCAPE_STRINGS() {
    _init_properties_StringOps_kt__fcy1db();
    return ESCAPE_STRINGS;
  }
  var ESCAPE_STRINGS;
  var ESCAPE_MARKERS;
  function toHexChar(i) {
    _init_properties_StringOps_kt__fcy1db();
    var d = i & 15;
    var tmp;
    if (d < 10) {
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      tmp = numberToChar(d + tmp$ret$0 | 0);
    } else {
      var tmp_0 = d - 10 | 0;
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
      tmp = numberToChar(tmp_0 + tmp$ret$1 | 0);
    }
    return tmp;
  }
  function printQuoted(_this__u8e3s4, value) {
    _init_properties_StringOps_kt__fcy1db();
    _this__u8e3s4.n6(_Char___init__impl__6a9atx(34));
    var lastPos = 0;
    var inductionVariable = 0;
    var last = charSequenceLength(value) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charCodeAt(value, i);
        var c = Char__toInt_impl_vasixd(this_0);
        if (c < get_ESCAPE_STRINGS().length && !(get_ESCAPE_STRINGS()[c] == null)) {
          _this__u8e3s4.f9(value, lastPos, i);
          _this__u8e3s4.m6(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0))
      _this__u8e3s4.f9(value, lastPos, value.length);
    else
      _this__u8e3s4.m6(value);
    _this__u8e3s4.n6(_Char___init__impl__6a9atx(34));
  }
  function toBooleanStrictOrNull(_this__u8e3s4) {
    _init_properties_StringOps_kt__fcy1db();
    return equals_0(_this__u8e3s4, 'true', true) ? true : equals_0(_this__u8e3s4, 'false', true) ? false : null;
  }
  var properties_initialized_StringOps_kt_wzaea7;
  function _init_properties_StringOps_kt__fcy1db() {
    if (!properties_initialized_StringOps_kt_wzaea7) {
      properties_initialized_StringOps_kt_wzaea7 = true;
      // Inline function 'kotlin.arrayOfNulls' call
      // Inline function 'kotlin.apply' call
      var this_0 = Array(93);
      var inductionVariable = 0;
      if (inductionVariable <= 31)
        do {
          var c = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var c1 = toHexChar(c >> 12);
          var c2 = toHexChar(c >> 8);
          var c3 = toHexChar(c >> 4);
          var c4 = toHexChar(c);
          this_0[c] = '\\u' + toString_1(c1) + toString_1(c2) + toString_1(c3) + toString_1(c4);
        }
         while (inductionVariable <= 31);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(34);
      this_0[Char__toInt_impl_vasixd(this_1)] = '\\"';
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(92);
      this_0[Char__toInt_impl_vasixd(this_2)] = '\\\\';
      // Inline function 'kotlin.code' call
      var this_3 = _Char___init__impl__6a9atx(9);
      this_0[Char__toInt_impl_vasixd(this_3)] = '\\t';
      // Inline function 'kotlin.code' call
      var this_4 = _Char___init__impl__6a9atx(8);
      this_0[Char__toInt_impl_vasixd(this_4)] = '\\b';
      // Inline function 'kotlin.code' call
      var this_5 = _Char___init__impl__6a9atx(10);
      this_0[Char__toInt_impl_vasixd(this_5)] = '\\n';
      // Inline function 'kotlin.code' call
      var this_6 = _Char___init__impl__6a9atx(13);
      this_0[Char__toInt_impl_vasixd(this_6)] = '\\r';
      this_0[12] = '\\f';
      ESCAPE_STRINGS = this_0;
      // Inline function 'kotlin.apply' call
      var this_7 = new Int8Array(93);
      var inductionVariable_0 = 0;
      if (inductionVariable_0 <= 31)
        do {
          var c_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          this_7[c_0] = 1;
        }
         while (inductionVariable_0 <= 31);
      // Inline function 'kotlin.code' call
      var this_8 = _Char___init__impl__6a9atx(34);
      var tmp = Char__toInt_impl_vasixd(this_8);
      // Inline function 'kotlin.code' call
      var this_9 = _Char___init__impl__6a9atx(34);
      var tmp$ret$3 = Char__toInt_impl_vasixd(this_9);
      this_7[tmp] = toByte(tmp$ret$3);
      // Inline function 'kotlin.code' call
      var this_10 = _Char___init__impl__6a9atx(92);
      var tmp_0 = Char__toInt_impl_vasixd(this_10);
      // Inline function 'kotlin.code' call
      var this_11 = _Char___init__impl__6a9atx(92);
      var tmp$ret$5 = Char__toInt_impl_vasixd(this_11);
      this_7[tmp_0] = toByte(tmp$ret$5);
      // Inline function 'kotlin.code' call
      var this_12 = _Char___init__impl__6a9atx(9);
      var tmp_1 = Char__toInt_impl_vasixd(this_12);
      // Inline function 'kotlin.code' call
      var this_13 = _Char___init__impl__6a9atx(116);
      var tmp$ret$7 = Char__toInt_impl_vasixd(this_13);
      this_7[tmp_1] = toByte(tmp$ret$7);
      // Inline function 'kotlin.code' call
      var this_14 = _Char___init__impl__6a9atx(8);
      var tmp_2 = Char__toInt_impl_vasixd(this_14);
      // Inline function 'kotlin.code' call
      var this_15 = _Char___init__impl__6a9atx(98);
      var tmp$ret$9 = Char__toInt_impl_vasixd(this_15);
      this_7[tmp_2] = toByte(tmp$ret$9);
      // Inline function 'kotlin.code' call
      var this_16 = _Char___init__impl__6a9atx(10);
      var tmp_3 = Char__toInt_impl_vasixd(this_16);
      // Inline function 'kotlin.code' call
      var this_17 = _Char___init__impl__6a9atx(110);
      var tmp$ret$11 = Char__toInt_impl_vasixd(this_17);
      this_7[tmp_3] = toByte(tmp$ret$11);
      // Inline function 'kotlin.code' call
      var this_18 = _Char___init__impl__6a9atx(13);
      var tmp_4 = Char__toInt_impl_vasixd(this_18);
      // Inline function 'kotlin.code' call
      var this_19 = _Char___init__impl__6a9atx(114);
      var tmp$ret$13 = Char__toInt_impl_vasixd(this_19);
      this_7[tmp_4] = toByte(tmp$ret$13);
      // Inline function 'kotlin.code' call
      var this_20 = _Char___init__impl__6a9atx(102);
      var tmp$ret$14 = Char__toInt_impl_vasixd(this_20);
      this_7[12] = toByte(tmp$ret$14);
      ESCAPE_MARKERS = this_7;
    }
  }
  function unparsedPrimitive($this, literal, primitive, tag) {
    var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
    throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.l15(tag), toString($this.m15()));
  }
  function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    NamedValueDecoder.call(this);
    this.h15_1 = json;
    this.i15_1 = value;
    this.j15_1 = polymorphicDiscriminator;
    this.k15_1 = this.t14().wx_1;
  }
  protoOf(AbstractJsonTreeDecoder).t14 = function () {
    return this.h15_1;
  };
  protoOf(AbstractJsonTreeDecoder).q1 = function () {
    return this.i15_1;
  };
  protoOf(AbstractJsonTreeDecoder).mj = function () {
    return this.t14().mj();
  };
  protoOf(AbstractJsonTreeDecoder).m15 = function () {
    var tmp0_safe_receiver = this.cw();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = this.n15(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? this.q1() : tmp1_elvis_lhs;
  };
  protoOf(AbstractJsonTreeDecoder).l15 = function (currentTag) {
    return this.ew() + ('.' + currentTag);
  };
  protoOf(AbstractJsonTreeDecoder).u14 = function () {
    return this.m15();
  };
  protoOf(AbstractJsonTreeDecoder).wi = function (deserializer) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.t14().wx_1.rz_1;
      }
      if (tmp) {
        tmp$ret$0 = deserializer.zf(this);
        break $l$block;
      }
      var discriminator = classDiscriminator(deserializer.xf(), this.t14());
      var tmp0 = this.u14();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = deserializer.xf().ug();
      if (!(tmp0 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).a8();
        var tmp_1 = getKClassFromExpression(tmp0).a8();
        var tmp$ret$2 = this.ew();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$2, toString(tmp0));
      }
      var jsonTree = tmp0;
      var tmp0_safe_receiver = jsonTree.c10(discriminator);
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
      var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
      var tmp_2;
      try {
        tmp_2 = findPolymorphicSerializer(deserializer, this, type);
      } catch ($p) {
        var tmp_3;
        if ($p instanceof SerializationException) {
          var it = $p;
          throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
        } else {
          throw $p;
        }
      }
      var tmp_4 = tmp_2;
      var actualSerializer = isInterface(tmp_4, DeserializationStrategy) ? tmp_4 : THROW_CCE();
      tmp$ret$0 = readPolymorphicJson(this.t14(), discriminator, jsonTree, actualSerializer);
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).dw = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).xi = function (descriptor) {
    var currentObject = this.m15();
    var tmp0_subject = descriptor.eh();
    var tmp;
    var tmp_0;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.t14();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = descriptor.ug();
      if (!(currentObject instanceof JsonArray)) {
        var tmp_2 = getKClass(JsonArray).a8();
        var tmp_3 = getKClassFromExpression(currentObject).a8();
        var tmp$ret$2 = this.ew();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$2, toString(currentObject));
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.t14();
        var keyDescriptor = carrierDescriptor(descriptor.lh(0), this_0.mj());
        var keyKind = keyDescriptor.eh();
        var tmp_4;
        var tmp_5;
        if (keyKind instanceof PrimitiveKind) {
          tmp_5 = true;
        } else {
          tmp_5 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_5) {
          var tmp_6 = this.t14();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_0 = descriptor.ug();
          if (!(currentObject instanceof JsonObject)) {
            var tmp_7 = getKClass(JsonObject).a8();
            var tmp_8 = getKClassFromExpression(currentObject).a8();
            var tmp$ret$7 = this.ew();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$7, toString(currentObject));
          }
          tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
        } else {
          if (this_0.wx_1.mz_1) {
            var tmp_9 = this.t14();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            var serialName_1 = descriptor.ug();
            if (!(currentObject instanceof JsonArray)) {
              var tmp_10 = getKClass(JsonArray).a8();
              var tmp_11 = getKClassFromExpression(currentObject).a8();
              var tmp$ret$11 = this.ew();
              throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$11, toString(currentObject));
            }
            tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_4;
      } else {
        var tmp_12 = this.t14();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_2 = descriptor.ug();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_13 = getKClass(JsonObject).a8();
          var tmp_14 = getKClassFromExpression(currentObject).a8();
          var tmp$ret$14 = this.ew();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$14, toString(currentObject));
        }
        tmp = new JsonTreeDecoder(tmp_12, currentObject, this.j15_1);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).yi = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).ii = function () {
    var tmp = this.m15();
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).o15 = function (tag, enumDescriptor) {
    var tmp = this.t14();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp2 = this.n15(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = enumDescriptor.ug();
    if (!(tmp2 instanceof JsonPrimitive)) {
      var tmp_0 = getKClass(JsonPrimitive).a8();
      var tmp_1 = getKClassFromExpression(tmp2).a8();
      var tmp$ret$3 = this.l15(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$3, toString(tmp2));
    }
    return getJsonNameIndexOrThrow(enumDescriptor, tmp, tmp2.e10());
  };
  protoOf(AbstractJsonTreeDecoder).qw = function (tag, enumDescriptor) {
    return this.o15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).p15 = function (tag) {
    return !(this.n15(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).gw = function (tag) {
    return this.p15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).q15 = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.n15(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).a8();
        var tmp_0 = getKClassFromExpression(value).a8();
        var tmp$ret$3 = this.l15(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'boolean' + ' at element: ' + tmp$ret$3, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_booleanOrNull(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).hw = function (tag) {
    return this.q15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).r15 = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.n15(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).a8();
        var tmp_0 = getKClassFromExpression(value).a8();
        var tmp$ret$3 = this.l15(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'byte' + ' at element: ' + tmp$ret$3, toString(value));
      }
      var literal = value;
      try {
        var result = parseLongImpl(literal);
        var tmp_1;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-128, 127);
        if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
          tmp_1 = convertToByte(result);
        } else {
          tmp_1 = null;
        }
        var tmp0_elvis_lhs = tmp_1;
        var tmp_2;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          tmp_2 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_2;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).iw = function (tag) {
    return this.r15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).s15 = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.n15(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).a8();
        var tmp_0 = getKClassFromExpression(value).a8();
        var tmp$ret$3 = this.l15(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'short' + ' at element: ' + tmp$ret$3, toString(value));
      }
      var literal = value;
      try {
        var result = parseLongImpl(literal);
        var tmp_1;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-32768, 32767);
        if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
          tmp_1 = convertToShort(result);
        } else {
          tmp_1 = null;
        }
        var tmp0_elvis_lhs = tmp_1;
        var tmp_2;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          tmp_2 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_2;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).jw = function (tag) {
    return this.s15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).t15 = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.n15(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).a8();
        var tmp_0 = getKClassFromExpression(value).a8();
        var tmp$ret$3 = this.l15(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'int' + ' at element: ' + tmp$ret$3, toString(value));
      }
      var literal = value;
      try {
        var result = parseLongImpl(literal);
        var tmp_1;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-2147483648, 2147483647);
        if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
          tmp_1 = convertToInt(result);
        } else {
          tmp_1 = null;
        }
        var tmp0_elvis_lhs = tmp_1;
        var tmp_2;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          tmp_2 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_2;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).kw = function (tag) {
    return this.t15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).u15 = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.n15(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).a8();
        var tmp_0 = getKClassFromExpression(value).a8();
        var tmp$ret$3 = this.l15(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'long' + ' at element: ' + tmp$ret$3, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = parseLongImpl(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).lw = function (tag) {
    return this.u15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).v15 = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.n15(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).a8();
        var tmp_0 = getKClassFromExpression(value).a8();
        var tmp$ret$3 = this.l15(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'float' + ' at element: ' + tmp$ret$3, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_float(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$0;
    var specialFp = this.t14().wx_1.tz_1;
    if (specialFp || isFinite(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.m15()));
  };
  protoOf(AbstractJsonTreeDecoder).mw = function (tag) {
    return this.v15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).w15 = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.n15(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).a8();
        var tmp_0 = getKClassFromExpression(value).a8();
        var tmp$ret$3 = this.l15(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'double' + ' at element: ' + tmp$ret$3, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_double(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$0;
    var specialFp = this.t14().wx_1.tz_1;
    if (specialFp || isFinite_0(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.m15()));
  };
  protoOf(AbstractJsonTreeDecoder).nw = function (tag) {
    return this.w15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).x15 = function (tag) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.n15(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).a8();
        var tmp_0 = getKClassFromExpression(value).a8();
        var tmp$ret$3 = this.l15(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$3, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = new Char(single(literal.e10()));
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$0 = tmp_1.b1_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).ow = function (tag) {
    return this.x15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).y15 = function (tag) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.n15(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).a8();
      var tmp_0 = getKClassFromExpression(value).a8();
      var tmp$ret$2 = this.l15(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$2, toString(value));
    }
    var value_0 = value;
    if (!(value_0 instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.l15(tag), toString(this.m15()));
    if (!value_0.f10_1 && !this.t14().wx_1.lz_1) {
      throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.l15(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.m15()));
    }
    return value_0.h10_1;
  };
  protoOf(AbstractJsonTreeDecoder).pw = function (tag) {
    return this.y15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).z15 = function (tag, inlineDescriptor) {
    var tmp;
    if (get_isUnsignedNumber(inlineDescriptor)) {
      var tmp_0 = this.t14();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      var tmp2 = this.n15(tag);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = inlineDescriptor.ug();
      if (!(tmp2 instanceof JsonPrimitive)) {
        var tmp_1 = getKClass(JsonPrimitive).a8();
        var tmp_2 = getKClassFromExpression(tmp2).a8();
        var tmp$ret$3 = this.l15(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$3, toString(tmp2));
      }
      var lexer = StringJsonLexer_0(tmp_0, tmp2.e10());
      tmp = new JsonDecoderForUnsignedTypes(lexer, this.t14());
    } else {
      tmp = protoOf(NamedValueDecoder).rw.call(this, tag, inlineDescriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).rw = function (tag, inlineDescriptor) {
    return this.z15((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).ui = function (descriptor) {
    return !(this.cw() == null) ? protoOf(NamedValueDecoder).ui.call(this, descriptor) : (new JsonPrimitiveDecoder(this.t14(), this.q1(), this.j15_1)).ui(descriptor);
  };
  function coerceInputValue_0($this, descriptor, index, tag) {
    var tmp0 = $this.t14();
    var tmp$ret$0;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.mh(index);
      var elementDescriptor = descriptor.lh(index);
      var tmp;
      if (isOptional && !elementDescriptor.yg()) {
        var tmp_0 = $this.n15(tag);
        tmp = tmp_0 instanceof JsonNull;
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.eh(), ENUM_getInstance())) {
        var tmp_1;
        if (elementDescriptor.yg()) {
          var tmp_2 = $this.n15(tag);
          tmp_1 = tmp_2 instanceof JsonNull;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp$ret$0 = false;
          break $l$block_2;
        }
        var tmp_3 = $this.n15(tag);
        var tmp0_safe_receiver = tmp_3 instanceof JsonPrimitive ? tmp_3 : null;
        var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : get_contentOrNull(tmp0_safe_receiver);
        var tmp_4;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$0 = false;
          break $l$block_2;
        } else {
          tmp_4 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_4;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.wx_1.oz_1 && elementDescriptor.yg();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          tmp$ret$0 = true;
          break $l$block_2;
        }
      }
      tmp$ret$0 = false;
    }
    return tmp$ret$0;
  }
  function absenceIsNull($this, descriptor, index) {
    $this.j16_1 = (!$this.t14().wx_1.oz_1 && !descriptor.mh(index) && descriptor.lh(index).yg());
    return $this.j16_1;
  }
  function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.g16_1 = value;
    this.h16_1 = polyDescriptor;
    this.i16_1 = 0;
    this.j16_1 = false;
  }
  protoOf(JsonTreeDecoder).q1 = function () {
    return this.g16_1;
  };
  protoOf(JsonTreeDecoder).oj = function (descriptor) {
    while (this.i16_1 < descriptor.gh()) {
      var _unary__edvuaz = this.i16_1;
      this.i16_1 = _unary__edvuaz + 1 | 0;
      var name = this.xv(descriptor, _unary__edvuaz);
      var index = this.i16_1 - 1 | 0;
      this.j16_1 = false;
      var tmp;
      var tmp_0;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.q1();
      if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).r1(name)) {
        tmp_0 = true;
      } else {
        tmp_0 = absenceIsNull(this, descriptor, index);
      }
      if (tmp_0) {
        tmp = !this.k15_1.qz_1 || !coerceInputValue_0(this, descriptor, index, name);
      } else {
        tmp = false;
      }
      if (tmp) {
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).ii = function () {
    return !this.j16_1 && protoOf(AbstractJsonTreeDecoder).ii.call(this);
  };
  protoOf(JsonTreeDecoder).yv = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.t14());
    var baseName = descriptor.ih(index);
    if (strategy == null) {
      if (!this.k15_1.uz_1)
        return baseName;
      if (this.q1().u1().n1(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.t14(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var tmp0 = this.q1().u1();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.j();
      while (_iterator__ex2g4s.k()) {
        var element = _iterator__ex2g4s.l();
        if (deserializationNamesMap_0.t1(element) === index) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var fallbackName = strategy == null ? null : strategy.y11(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).n15 = function (tag) {
    return getValue(this.q1(), tag);
  };
  protoOf(JsonTreeDecoder).xi = function (descriptor) {
    if (descriptor === this.h16_1) {
      var tmp = this.t14();
      var tmp2 = this.m15();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = this.h16_1.ug();
      if (!(tmp2 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).a8();
        var tmp_1 = getKClassFromExpression(tmp2).a8();
        var tmp$ret$2 = this.ew();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$2, toString(tmp2));
      }
      return new JsonTreeDecoder(tmp, tmp2, this.j15_1, this.h16_1);
    }
    return protoOf(AbstractJsonTreeDecoder).xi.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).yi = function (descriptor) {
    var tmp;
    if (ignoreUnknownKeys(descriptor, this.t14())) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.eh();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_instance;
    var strategy = namingStrategy(descriptor, this.t14());
    var tmp_1;
    if (strategy == null && !this.k15_1.uz_1) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.t14(), descriptor).u1();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      var tmp0_safe_receiver = get_schemaCache(this.t14()).j14(descriptor, get_JsonDeserializationNamesKey());
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.u1();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var _iterator__ex2g4s = this.q1().u1().j();
    while (_iterator__ex2g4s.k()) {
      var key = _iterator__ex2g4s.l();
      if (!names.n1(key) && !(key === this.j15_1)) {
        throw JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "' at element: " + this.ew() + '\n' + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.q1().toString()))));
      }
    }
  };
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.q16_1 = value;
    this.r16_1 = this.q16_1.m();
    this.s16_1 = -1;
  }
  protoOf(JsonTreeListDecoder).q1 = function () {
    return this.q16_1;
  };
  protoOf(JsonTreeListDecoder).yv = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).n15 = function (tag) {
    return this.q16_1.n(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).oj = function (descriptor) {
    while (this.s16_1 < (this.r16_1 - 1 | 0)) {
      this.s16_1 = this.s16_1 + 1 | 0;
      return this.s16_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.z16_1 = value;
    this.sw('primitive');
  }
  protoOf(JsonPrimitiveDecoder).q1 = function () {
    return this.z16_1;
  };
  protoOf(JsonPrimitiveDecoder).oj = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).n15 = function (tag) {
    // Inline function 'kotlin.require' call
    if (!(tag === 'primitive')) {
      var message = "This input can only handle primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.z16_1;
  };
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.k17_1 = value;
    this.l17_1 = toList(this.k17_1.u1());
    this.m17_1 = imul(this.l17_1.m(), 2);
    this.n17_1 = -1;
  }
  protoOf(JsonTreeMapDecoder).q1 = function () {
    return this.k17_1;
  };
  protoOf(JsonTreeMapDecoder).yv = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.l17_1.n(i);
  };
  protoOf(JsonTreeMapDecoder).oj = function (descriptor) {
    while (this.n17_1 < (this.m17_1 - 1 | 0)) {
      this.n17_1 = this.n17_1 + 1 | 0;
      return this.n17_1;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).n15 = function (tag) {
    return (this.n17_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.k17_1, tag);
  };
  protoOf(JsonTreeMapDecoder).yi = function (descriptor) {
  };
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.xf())).wi(deserializer);
  }
  var static_init_called_0;
  function static_init_0() {
    if (static_init_called_0)
      return Unit_instance;
    static_init_called_0 = true;
    WriteMode_OBJ_instance = new WriteMode('OBJ', 0, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_LIST_instance = new WriteMode('LIST', 1, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
    WriteMode_MAP_instance = new WriteMode('MAP', 2, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_POLY_OBJ_instance = new WriteMode('POLY_OBJ', 3, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
  }
  var WriteMode_OBJ_instance;
  var WriteMode_LIST_instance;
  var WriteMode_MAP_instance;
  var WriteMode_POLY_OBJ_instance;
  function values() {
    static_init_0();
    return [WriteMode_OBJ_getInstance(), WriteMode_LIST_getInstance(), WriteMode_MAP_getInstance(), WriteMode_POLY_OBJ_getInstance()];
  }
  function get_entries() {
    static_init_0();
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var $ENTRIES;
  function WriteMode(name, ordinal, begin, end) {
    Enum.call(this, name, ordinal);
    this.y14_1 = begin;
    this.z14_1 = end;
  }
  function switchMode(_this__u8e3s4, desc) {
    var tmp0_subject = desc.eh();
    var tmp;
    if (tmp0_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.lh(0), _this__u8e3s4.mj());
          var keyKind = keyDescriptor.eh();
          var tmp_0;
          var tmp_1;
          if (keyKind instanceof PrimitiveKind) {
            tmp_1 = true;
          } else {
            tmp_1 = equals(keyKind, ENUM_getInstance());
          }
          if (tmp_1) {
            tmp_0 = WriteMode_MAP_getInstance();
          } else {
            if (_this__u8e3s4.wx_1.mz_1) {
              tmp_0 = WriteMode_LIST_getInstance();
            } else {
              throw InvalidKeyKindException(keyDescriptor);
            }
          }
          tmp = tmp_0;
        } else {
          tmp = WriteMode_OBJ_getInstance();
        }
      }
    }
    return tmp;
  }
  function carrierDescriptor(_this__u8e3s4, module_0) {
    var tmp;
    if (equals(_this__u8e3s4.eh(), CONTEXTUAL_getInstance())) {
      var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
      tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
    } else if (_this__u8e3s4.fh()) {
      tmp = carrierDescriptor(_this__u8e3s4.lh(0), module_0);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function WriteMode_OBJ_getInstance() {
    static_init_0();
    return WriteMode_OBJ_instance;
  }
  function WriteMode_LIST_getInstance() {
    static_init_0();
    return WriteMode_LIST_instance;
  }
  function WriteMode_MAP_getInstance() {
    static_init_0();
    return WriteMode_MAP_instance;
  }
  function WriteMode_POLY_OBJ_getInstance() {
    static_init_0();
    return WriteMode_POLY_OBJ_instance;
  }
  function appendEscape($this, lastPosition, current) {
    $this.o17(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.o17(lastPosition, currentPosition);
    var result = $this.oy_1.toString();
    $this.oy_1.k9(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.ny_1);
    $this.ny_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.p17(), $this.ly_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.q17(currentPosition);
    if (currentPosition === -1) {
      $this.u11('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.p17();
    var _unary__edvuaz = currentPosition;
    currentPosition = _unary__edvuaz + 1 | 0;
    var currentChar = charSequenceGet(tmp, _unary__edvuaz);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.p17(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.u11("Invalid escaped char '" + toString_1(currentChar) + "'");
    }
    $this.oy_1.n6(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.ly_1 = startPos;
      $this.r17();
      if (($this.ly_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.u11('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.ly_1);
    }
    $this.oy_1.n6(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
    return startPos + 4 | 0;
  }
  function fromHexChar($this, source, currentPosition) {
    var character = charSequenceGet(source, currentPosition);
    var tmp;
    if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
      // Inline function 'kotlin.code' call
      var tmp_0 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
    } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
      // Inline function 'kotlin.code' call
      var tmp_1 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
    } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
      // Inline function 'kotlin.code' call
      var tmp_2 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(65);
      tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
    } else {
      $this.u11("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean2($this, start) {
    var current = $this.q17(start);
    if (current >= charSequenceLength($this.p17()) || current === -1) {
      $this.u11('EOF');
    }
    var tmp = $this.p17();
    var _unary__edvuaz = current;
    current = _unary__edvuaz + 1 | 0;
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(tmp, _unary__edvuaz);
    var tmp0_subject = Char__toInt_impl_vasixd(this_0) | 32;
    var tmp_0;
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(116);
    if (tmp0_subject === Char__toInt_impl_vasixd(this_1)) {
      consumeBooleanLiteral($this, 'rue', current);
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(102);
      if (tmp0_subject === Char__toInt_impl_vasixd(this_2)) {
        consumeBooleanLiteral($this, 'alse', current);
        tmp_0 = false;
      } else {
        $this.u11("Expected valid boolean literal prefix, but had '" + $this.c13() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.p17()) - current | 0) < literalSuffix.length) {
      $this.u11('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charCodeAt(literalSuffix, i);
        var actual = charSequenceGet($this.p17(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.u11("Expected valid boolean literal prefix, but had '" + $this.c13() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.ly_1 = current + literalSuffix.length | 0;
  }
  function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
    var tmp;
    switch (isExponentPositive) {
      case false:
        // Inline function 'kotlin.math.pow' call

        var x = -toNumber(exponentAccumulator);
        tmp = Math.pow(10.0, x);
        break;
      case true:
        // Inline function 'kotlin.math.pow' call

        var x_0 = toNumber(exponentAccumulator);
        tmp = Math.pow(10.0, x_0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function AbstractJsonLexer() {
    this.ly_1 = 0;
    this.my_1 = new JsonPath();
    this.ny_1 = null;
    this.oy_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).r17 = function () {
  };
  protoOf(AbstractJsonLexer).m14 = function () {
    var current = this.s17();
    var source = this.p17();
    if (current >= charSequenceLength(source) || current === -1)
      return false;
    if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
      this.ly_1 = this.ly_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(AbstractJsonLexer).t17 = function (c) {
    return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).py = function () {
    var nextToken = this.e13();
    if (!(nextToken === 10)) {
      this.u11('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.p17(), this.ly_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).y12 = function (expected) {
    var token = this.e13();
    if (!(token === expected)) {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
      var expected_0 = tokenDescription(expected);
      var position = true ? this.ly_1 - 1 | 0 : this.ly_1;
      var s = this.ly_1 === charSequenceLength(this.p17()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.p17(), position));
      var tmp$ret$1 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
      this.u11(tmp$ret$1, position);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).u17 = function (expected) {
    if (this.ly_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
      var tmp$ret$0;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
        var snapshot = this.ly_1;
        try {
          this.ly_1 = this.ly_1 - 1 | 0;
          tmp$ret$0 = this.c13();
          break $l$block;
        }finally {
          this.ly_1 = snapshot;
        }
      }
      var inputLiteral = tmp$ret$0;
      if (inputLiteral === 'null') {
        this.t11("Expected string literal but 'null' literal was found", this.ly_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
      }
    }
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expectedToken = charToTokenClass(expected);
    var expected_0 = tokenDescription(expectedToken);
    var position = true ? this.ly_1 - 1 | 0 : this.ly_1;
    var s = this.ly_1 === charSequenceLength(this.p17()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.p17(), position));
    var tmp$ret$3 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
    this.u11(tmp$ret$3, position);
  };
  protoOf(AbstractJsonLexer).z12 = function () {
    var source = this.p17();
    var cpos = this.ly_1;
    $l$loop_0: while (true) {
      cpos = this.q17(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.ly_1 = cpos;
      return charToTokenClass(ch);
    }
    this.ly_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).n14 = function (doConsume) {
    var current = this.s17();
    current = this.q17(current);
    var len = charSequenceLength(this.p17()) - current | 0;
    if (len < 4 || current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charCodeAt('null', i) === charSequenceGet(this.p17(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 && charToTokenClass(charSequenceGet(this.p17(), current + 4 | 0)) === 0)
      return false;
    if (doConsume) {
      this.ly_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).a15 = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.n14(doConsume) : $super.n14.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).o14 = function (isLenient) {
    var token = this.z12();
    var tmp;
    if (isLenient) {
      if (!(token === 1) && !(token === 0))
        return null;
      tmp = this.c13();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.b13();
    }
    var string = tmp;
    this.ny_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).v17 = function () {
    this.ny_1 = null;
  };
  protoOf(AbstractJsonLexer).w17 = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.p17();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).b13 = function () {
    if (!(this.ny_1 == null)) {
      return takePeeked(this);
    }
    return this.r14();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.q17(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.u11('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.o17(lastPosition, currentPosition);
          currentPosition = this.q17(currentPosition);
          if (currentPosition === -1) {
            this.u11('Unexpected EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.w17(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.ly_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).s14 = function () {
    var result = this.c13();
    if (result === 'null' && wasUnquotedString(this)) {
      this.u11("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).c13 = function () {
    if (!(this.ny_1 == null)) {
      return takePeeked(this);
    }
    var current = this.s17();
    if (current >= charSequenceLength(this.p17()) || current === -1) {
      this.u11('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.p17(), current));
    if (token === 1) {
      return this.b13();
    }
    if (!(token === 0)) {
      this.u11('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.p17(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.p17(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.p17())) {
        usedAppend = true;
        this.o17(this.ly_1, current);
        var eof = this.q17(current);
        if (eof === -1) {
          this.ly_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.w17(this.ly_1, current);
    } else {
      tmp = decodedString(this, this.ly_1, current);
    }
    var result = tmp;
    this.ly_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).o17 = function (fromIndex, toIndex) {
    this.oy_1.f9(this.p17(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).q14 = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.z12();
    if (!(lastToken === 8) && !(lastToken === 6)) {
      this.c13();
      return Unit_instance;
    }
    $l$loop: while (true) {
      lastToken = this.z12();
      if (lastToken === 1) {
        if (allowLenientStrings)
          this.c13();
        else
          this.r14();
        continue $l$loop;
      }
      var tmp0_subject = lastToken;
      if (tmp0_subject === 8 || tmp0_subject === 6) {
        tokenStack.f(lastToken);
      } else if (tmp0_subject === 9) {
        if (!(last(tokenStack) === 8))
          throw JsonDecodingException_0(this.ly_1, 'found ] instead of } at path: ' + this.my_1.toString(), this.p17());
        removeLast(tokenStack);
      } else if (tmp0_subject === 7) {
        if (!(last(tokenStack) === 6))
          throw JsonDecodingException_0(this.ly_1, 'found } instead of ] at path: ' + this.my_1.toString(), this.p17());
        removeLast(tokenStack);
      } else if (tmp0_subject === 10) {
        this.u11('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.e13();
      if (tokenStack.m() === 0)
        return Unit_instance;
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + toString(this.p17()) + "', currentPosition=" + this.ly_1 + ')';
  };
  protoOf(AbstractJsonLexer).p14 = function (key) {
    var processed = this.w17(0, this.ly_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    throw new JsonDecodingException("Encountered an unknown key '" + key + "' at offset " + lastIndexOf_0 + ' at path: ' + this.my_1.h12() + "\nUse 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.p17(), lastIndexOf_0))));
  };
  protoOf(AbstractJsonLexer).t11 = function (message, position, hint) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(hint) === 0) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    var hintMessage = tmp;
    throw JsonDecodingException_0(position, message + ' at path: ' + this.my_1.h12() + hintMessage, this.p17());
  };
  protoOf(AbstractJsonLexer).u11 = function (message, position, hint, $super) {
    position = position === VOID ? this.ly_1 : position;
    hint = hint === VOID ? '' : hint;
    return $super === VOID ? this.t11(message, position, hint) : $super.t11.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).c15 = function () {
    var current = this.s17();
    current = this.q17(current);
    if (current >= charSequenceLength(this.p17()) || current === -1) {
      this.u11('EOF');
    }
    var tmp;
    if (charSequenceGet(this.p17(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.p17())) {
        this.u11('EOF');
      }
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var accumulator = new Long(0, 0);
    var exponentAccumulator = new Long(0, 0);
    var isNegative = false;
    var isExponentPositive = false;
    var hasExponent = false;
    var start = current;
    $l$loop_4: while (!(current === charSequenceLength(this.p17()))) {
      var ch = charSequenceGet(this.p17(), current);
      if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
        if (current === start) {
          this.u11('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
        }
        isExponentPositive = true;
        hasExponent = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
        if (current === start) {
          this.u11("Unexpected symbol '-' in numeric literal");
        }
        isExponentPositive = false;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
        if (current === start) {
          this.u11("Unexpected symbol '+' in numeric literal");
        }
        isExponentPositive = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.u11("Unexpected symbol '-' in numeric literal");
        }
        isNegative = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      var token = charToTokenClass(ch);
      if (!(token === 0))
        break $l$loop_4;
      current = current + 1 | 0;
      var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
      if (!(0 <= digit ? digit <= 9 : false)) {
        this.u11("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
      }
      if (hasExponent) {
        // Inline function 'kotlin.Long.times' call
        var this_0 = exponentAccumulator;
        // Inline function 'kotlin.Long.plus' call
        var this_1 = multiply(this_0, fromInt(10));
        exponentAccumulator = add(this_1, fromInt(digit));
        continue $l$loop_4;
      }
      // Inline function 'kotlin.Long.times' call
      var this_2 = accumulator;
      // Inline function 'kotlin.Long.minus' call
      var this_3 = multiply(this_2, fromInt(10));
      accumulator = subtract(this_3, fromInt(digit));
      if (compare(accumulator, new Long(0, 0)) > 0) {
        this.u11('Numeric value overflow');
      }
    }
    var hasChars = !(current === start);
    if (start === current || (isNegative && start === (current - 1 | 0))) {
      this.u11('Expected numeric literal');
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.u11('EOF');
      }
      if (!(charSequenceGet(this.p17(), current) === _Char___init__impl__6a9atx(34))) {
        this.u11('Expected closing quotation mark');
      }
      current = current + 1 | 0;
    }
    this.ly_1 = current;
    if (hasExponent) {
      var doubleAccumulator = toNumber(accumulator) * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
      if (doubleAccumulator > toNumber(new Long(-1, 2147483647)) || doubleAccumulator < toNumber(new Long(0, -2147483648))) {
        this.u11('Numeric value overflow');
      }
      // Inline function 'kotlin.math.floor' call
      if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
        this.u11("Can't convert " + doubleAccumulator + ' to Long');
      }
      accumulator = numberToLong(doubleAccumulator);
    }
    var tmp_0;
    if (isNegative) {
      tmp_0 = accumulator;
    } else if (!equalsLong(accumulator, new Long(0, -2147483648))) {
      tmp_0 = negate(accumulator);
    } else {
      this.u11('Numeric value overflow');
    }
    return tmp_0;
  };
  protoOf(AbstractJsonLexer).j10 = function () {
    var result = this.c15();
    var next = this.e13();
    if (!(next === 10)) {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
      var expected = tokenDescription(10);
      var position = true ? this.ly_1 - 1 | 0 : this.ly_1;
      var s = this.ly_1 === charSequenceLength(this.p17()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.p17(), position));
      var tmp$ret$1 = "Expected input to contain a single valid number, but got '" + s + "' after it";
      this.u11(tmp$ret$1, position);
    }
    return result;
  };
  protoOf(AbstractJsonLexer).b15 = function () {
    var current = this.s17();
    if (current === charSequenceLength(this.p17())) {
      this.u11('EOF');
    }
    var tmp;
    if (charSequenceGet(this.p17(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean2(this, current);
    if (hasQuotation) {
      if (this.ly_1 === charSequenceLength(this.p17())) {
        this.u11('EOF');
      }
      if (!(charSequenceGet(this.p17(), this.ly_1) === _Char___init__impl__6a9atx(34))) {
        this.u11('Expected closing quotation mark');
      }
      this.ly_1 = this.ly_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().y17_1;
      // Inline function 'kotlin.code' call
      tmp = tmp_0[Char__toInt_impl_vasixd(c)];
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function tokenDescription(token) {
    return token === 1 ? "quotation mark '\"'" : token === 2 ? "string escape sequence '\\'" : token === 4 ? "comma ','" : token === 5 ? "colon ':'" : token === 6 ? "start of the object '{'" : token === 7 ? "end of the object '}'" : token === 8 ? "start of the array '['" : token === 9 ? "end of the array ']'" : token === 10 ? 'end of the input' : token === 127 ? 'invalid token' : 'valid token';
  }
  function escapeToChar(c) {
    return c < 117 ? CharMappings_getInstance().x17_1[c] : _Char___init__impl__6a9atx(0);
  }
  function initEscape($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 31)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2ESC($this, i, _Char___init__impl__6a9atx(117));
      }
       while (inductionVariable <= 31);
    initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
    initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
    initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
    initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
    initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
    initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
    initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
    initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
  }
  function initCharToToken($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2TC($this, i, 127);
      }
       while (inductionVariable <= 32);
    initC2TC($this, 9, 3);
    initC2TC($this, 10, 3);
    initC2TC($this, 13, 3);
    initC2TC($this, 32, 3);
    initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
    initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
    initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
    initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
    initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
    initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
    initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
    initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
  }
  function initC2ESC($this, c, esc) {
    if (!(esc === _Char___init__impl__6a9atx(117))) {
      // Inline function 'kotlin.code' call
      var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
      $this.x17_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.y17_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.x17_1 = charArray(117);
    this.y17_1 = new Int8Array(126);
    initEscape(this);
    initCharToToken(this);
  }
  var CharMappings_instance;
  function CharMappings_getInstance() {
    if (CharMappings_instance == null)
      new CharMappings();
    return CharMappings_instance;
  }
  function StringJsonLexerWithComments(source) {
    StringJsonLexer.call(this, source);
  }
  protoOf(StringJsonLexerWithComments).e13 = function () {
    var source = this.p17();
    var cpos = this.s17();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.ly_1 = cpos + 1 | 0;
    return charToTokenClass(charCodeAt(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).a13 = function () {
    var current = this.s17();
    if (current >= this.p17().length || current === -1)
      return false;
    return this.t17(charCodeAt(this.p17(), current));
  };
  protoOf(StringJsonLexerWithComments).l14 = function (expected) {
    var source = this.p17();
    var current = this.s17();
    if (current >= source.length || current === -1) {
      this.ly_1 = -1;
      this.u17(expected);
    }
    var c = charCodeAt(source, current);
    this.ly_1 = current + 1 | 0;
    if (c === expected)
      return Unit_instance;
    else {
      this.u17(expected);
    }
  };
  protoOf(StringJsonLexerWithComments).z12 = function () {
    var source = this.p17();
    var cpos = this.s17();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.ly_1 = cpos;
    return charToTokenClass(charCodeAt(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).s17 = function () {
    var current = this.ly_1;
    if (current === -1)
      return current;
    var source = this.p17();
    $l$loop_1: while (current < source.length) {
      var c = charCodeAt(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop_1;
      }
      if (c === _Char___init__impl__6a9atx(47) && (current + 1 | 0) < source.length) {
        var tmp0_subject = charCodeAt(source, current + 1 | 0);
        if (tmp0_subject === _Char___init__impl__6a9atx(47)) {
          current = indexOf_0(source, _Char___init__impl__6a9atx(10), current + 2 | 0);
          if (current === -1) {
            current = source.length;
          } else {
            current = current + 1 | 0;
          }
          continue $l$loop_1;
        } else if (tmp0_subject === _Char___init__impl__6a9atx(42)) {
          current = indexOf(source, '*/', current + 2 | 0);
          if (current === -1) {
            this.ly_1 = source.length;
            this.u11('Expected end of the block comment: "*/", but had EOF instead');
          } else {
            current = current + 2 | 0;
          }
          continue $l$loop_1;
        }
      }
      break $l$loop_1;
    }
    this.ly_1 = current;
    return current;
  };
  function StringJsonLexer(source) {
    AbstractJsonLexer.call(this);
    this.i18_1 = source;
  }
  protoOf(StringJsonLexer).p17 = function () {
    return this.i18_1;
  };
  protoOf(StringJsonLexer).q17 = function (position) {
    return position < this.p17().length ? position : -1;
  };
  protoOf(StringJsonLexer).e13 = function () {
    var source = this.p17();
    var cpos = this.ly_1;
    $l$loop: while (!(cpos === -1) && cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charCodeAt(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.ly_1 = cpos;
      return charToTokenClass(c);
    }
    this.ly_1 = source.length;
    return 10;
  };
  protoOf(StringJsonLexer).a13 = function () {
    var current = this.ly_1;
    if (current === -1)
      return false;
    var source = this.p17();
    $l$loop: while (current < source.length) {
      var c = charCodeAt(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.ly_1 = current;
      return this.t17(c);
    }
    this.ly_1 = current;
    return false;
  };
  protoOf(StringJsonLexer).s17 = function () {
    var current = this.ly_1;
    if (current === -1)
      return current;
    var source = this.p17();
    $l$loop: while (current < source.length) {
      var c = charCodeAt(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.ly_1 = current;
    return current;
  };
  protoOf(StringJsonLexer).l14 = function (expected) {
    if (this.ly_1 === -1) {
      this.u17(expected);
    }
    var source = this.p17();
    var cpos = this.ly_1;
    $l$loop: while (cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charCodeAt(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.ly_1 = cpos;
      if (c === expected)
        return Unit_instance;
      this.u17(expected);
    }
    this.ly_1 = -1;
    this.u17(expected);
  };
  protoOf(StringJsonLexer).r14 = function () {
    this.l14(_Char___init__impl__6a9atx(34));
    var current = this.ly_1;
    var closingQuote = indexOf_0(this.p17(), _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.c13();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
      var expected = tokenDescription(1);
      var position = false ? this.ly_1 - 1 | 0 : this.ly_1;
      var s = this.ly_1 === charSequenceLength(this.p17()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.p17(), position));
      var tmp$ret$1 = 'Expected ' + expected + ", but had '" + s + "' instead";
      this.u11(tmp$ret$1, position);
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charCodeAt(this.p17(), i) === _Char___init__impl__6a9atx(92)) {
          return this.consumeString2(this.p17(), this.ly_1, i);
        }
      }
       while (inductionVariable < closingQuote);
    this.ly_1 = closingQuote + 1 | 0;
    return substring(this.p17(), current, closingQuote);
  };
  protoOf(StringJsonLexer).v14 = function (keyToMatch, isLenient) {
    var positionSnapshot = this.ly_1;
    try {
      if (!(this.e13() === 6))
        return null;
      var firstKey = this.o14(isLenient);
      if (!(firstKey === keyToMatch))
        return null;
      this.v17();
      if (!(this.e13() === 5))
        return null;
      return this.o14(isLenient);
    }finally {
      this.ly_1 = positionSnapshot;
      this.v17();
    }
  };
  function StringJsonLexer_0(json, source) {
    return !json.wx_1.yz_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
  }
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.yx_1;
  }
  function JsonToStringWriter() {
    this.by_1 = StringBuilder_init_$Create$_0(128);
  }
  protoOf(JsonToStringWriter).y10 = function (value) {
    this.by_1.i9(value);
  };
  protoOf(JsonToStringWriter).s10 = function (char) {
    this.by_1.n6(char);
  };
  protoOf(JsonToStringWriter).u10 = function (text) {
    this.by_1.m6(text);
  };
  protoOf(JsonToStringWriter).e11 = function (text) {
    printQuoted(this.by_1, text);
  };
  protoOf(JsonToStringWriter).cy = function () {
    this.by_1.l9();
  };
  protoOf(JsonToStringWriter).toString = function () {
    return this.by_1.toString();
  };
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(JsonSerializersModuleValidator).sx = contextual;
  //endregion
  //region block: init
  Companion_instance = new Companion();
  Companion_instance_0 = new Companion_0();
  Companion_instance_1 = new Companion_1();
  Companion_instance_2 = new Companion_2();
  Tombstone_instance = new Tombstone();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Json_0;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-json.js.map
