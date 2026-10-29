(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './Basis-basis-theme.js', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlinx-serialization-kotlinx-serialization-json.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./Basis-basis-theme.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlinx-serialization-kotlinx-serialization-json.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'Basis:docs-runtime'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'Basis:docs-runtime'.");
    }
    if (typeof globalThis['Basis-basis-theme'] === 'undefined') {
      throw new Error("Error loading module 'Basis:docs-runtime'. Its dependency 'Basis-basis-theme' was not found. Please, check whether 'Basis-basis-theme' is loaded prior to 'Basis:docs-runtime'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'Basis:docs-runtime'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'Basis:docs-runtime'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined') {
      throw new Error("Error loading module 'Basis:docs-runtime'. Its dependency 'kotlinx-serialization-kotlinx-serialization-json' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-json' is loaded prior to 'Basis:docs-runtime'.");
    }
    globalThis['Basis:docs-runtime'] = factory(typeof globalThis['Basis:docs-runtime'] === 'undefined' ? {} : globalThis['Basis:docs-runtime'], globalThis['kotlin-kotlin-stdlib'], globalThis['Basis-basis-theme'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlinx-serialization-kotlinx-serialization-json']);
  }
}(function (_, kotlin_kotlin, kotlin_Basis_basis_theme, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var VOID = kotlin_kotlin.$_$.a;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.r2;
  var get_entries = kotlin_Basis_basis_theme.$_$.p;
  var resolveIn = kotlin_Basis_basis_theme.$_$.x;
  var Unit_instance = kotlin_kotlin.$_$.i2;
  var get_entries_0 = kotlin_Basis_basis_theme.$_$.v;
  var resolveIn_0 = kotlin_Basis_basis_theme.$_$.e1;
  var get_entries_1 = kotlin_Basis_basis_theme.$_$.u;
  var resolveIn_1 = kotlin_Basis_basis_theme.$_$.z;
  var get_entries_2 = kotlin_Basis_basis_theme.$_$.r;
  var resolveIn_2 = kotlin_Basis_basis_theme.$_$.y;
  var get_entries_3 = kotlin_Basis_basis_theme.$_$.t;
  var resolveIn_3 = kotlin_Basis_basis_theme.$_$.c1;
  var get_entries_4 = kotlin_Basis_basis_theme.$_$.s;
  var resolveIn_4 = kotlin_Basis_basis_theme.$_$.a1;
  var get_entries_5 = kotlin_Basis_basis_theme.$_$.q;
  var resolveIn_5 = kotlin_Basis_basis_theme.$_$.d1;
  var get_entries_6 = kotlin_Basis_basis_theme.$_$.w;
  var resolveIn_6 = kotlin_Basis_basis_theme.$_$.b1;
  var _FontWeightValue___get_weight__impl__w0h7ri = kotlin_Basis_basis_theme.$_$.d;
  var _LineHeightValue___get_multiplier__impl__uy9oqd = kotlin_Basis_basis_theme.$_$.e;
  var formatDeterministic = kotlin_Basis_basis_theme.$_$.l;
  var _EmValue___get_em__impl__1q8ktd = kotlin_Basis_basis_theme.$_$.c;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.j2;
  var joinToString = kotlin_kotlin.$_$.s4;
  var listOf = kotlin_kotlin.$_$.y4;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.k2;
  var charSequenceLength = kotlin_kotlin.$_$.w6;
  var THROW_CCE = kotlin_kotlin.$_$.qa;
  var isCharSequence = kotlin_kotlin.$_$.p7;
  var trim = kotlin_kotlin.$_$.fa;
  var toString = kotlin_kotlin.$_$.f8;
  var ThemeInterchange_getInstance = kotlin_Basis_basis_theme.$_$.i;
  var BasisIntent = kotlin_Basis_basis_theme.$_$.m;
  var resolve = kotlin_Basis_basis_theme.$_$.o;
  var emptyMap = kotlin_kotlin.$_$.j4;
  var IllegalStateException = kotlin_kotlin.$_$.oa;
  var IllegalArgumentException = kotlin_kotlin.$_$.na;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f2;
  var ThemeViolation = kotlin_Basis_basis_theme.$_$.n;
  var listOf_0 = kotlin_kotlin.$_$.x4;
  var Json = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.a;
  var StringSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var LinkedHashMapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.q1;
  var lazy = kotlin_kotlin.$_$.ib;
  var protoOf = kotlin_kotlin.$_$.c8;
  var initMetadataForCompanion = kotlin_kotlin.$_$.h7;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var equals = kotlin_kotlin.$_$.z6;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var initMetadataForObject = kotlin_kotlin.$_$.l7;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var objectCreate = kotlin_kotlin.$_$.b8;
  var getStringHashCode = kotlin_kotlin.$_$.e7;
  var hashCode = kotlin_kotlin.$_$.f7;
  var initMetadataForClass = kotlin_kotlin.$_$.g7;
  var $serializer_getInstance = kotlin_Basis_basis_theme.$_$.j;
  var BooleanSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var getBooleanHashCode = kotlin_kotlin.$_$.b7;
  var $serializer_getInstance_0 = kotlin_Basis_basis_theme.$_$.k;
  var ArrayListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var SerializableWith = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e2;
  var removePrefix = kotlin_kotlin.$_$.k9;
  var removeSuffix = kotlin_kotlin.$_$.l9;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.c;
  var replace = kotlin_kotlin.$_$.n9;
  var _DpValue___get_value__impl__1j6qu0 = kotlin_Basis_basis_theme.$_$.a;
  var _SpValue___get_value__impl__65u6pl = kotlin_Basis_basis_theme.$_$.f;
  var _DurationValue___get_milliseconds__impl__sn32kr = kotlin_Basis_basis_theme.$_$.b;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.kb;
  var _CustomFontKey___get_value__impl__mpjcc2 = kotlin_Basis_basis_theme.$_$.g;
  var Custom = kotlin_Basis_basis_theme.$_$.g1;
  var _GoogleFontId___get_value__impl__s94bce = kotlin_Basis_basis_theme.$_$.h;
  var Catalog = kotlin_Basis_basis_theme.$_$.f1;
  //endregion
  //region block: pre-declaration
  initMetadataForCompanion(Companion);
  initMetadataForObject($serializer, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ResolvedTokens, 'ResolvedTokens', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_1});
  initMetadataForCompanion(Companion_0);
  initMetadataForObject($serializer_0, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ResolvedSuccess, 'ResolvedSuccess', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_2});
  initMetadataForCompanion(Companion_1);
  initMetadataForObject($serializer_1, '$serializer', VOID, VOID, [GeneratedSerializer]);
  initMetadataForClass(ResolvedFailure, 'ResolvedFailure', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_3});
  //endregion
  function extractTokenMap(theme, prefix) {
    prefix = prefix === VOID ? '' : prefix;
    var map = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s = get_entries().j();
    while (_iterator__ex2g4s.k()) {
      var tokenPath = _iterator__ex2g4s.l();
      var color = resolveIn(tokenPath, theme.p24_1);
      if (!(color == null)) {
        var tmp2 = tokenPathToCssVar(tokenPath.v18_1, prefix);
        // Inline function 'kotlin.collections.set' call
        var value = formatColor(color);
        map.x1(tmp2, value);
      }
    }
    var _iterator__ex2g4s_0 = get_entries_0().j();
    while (_iterator__ex2g4s_0.k()) {
      var tokenPath_0 = _iterator__ex2g4s_0.l();
      var tmp2_0 = tokenPathToCssVar(tokenPath_0.j1c_1, prefix);
      // Inline function 'kotlin.collections.set' call
      var value_0 = formatDp(resolveIn_0(tokenPath_0, theme.r24_1));
      map.x1(tmp2_0, value_0);
    }
    var _iterator__ex2g4s_1 = get_entries_1().j();
    while (_iterator__ex2g4s_1.k()) {
      var tokenPath_1 = _iterator__ex2g4s_1.l();
      var tmp2_1 = tokenPathToCssVar(tokenPath_1.v1b_1, prefix);
      // Inline function 'kotlin.collections.set' call
      var value_1 = formatDp(resolveIn_1(tokenPath_1, theme.s24_1));
      map.x1(tmp2_1, value_1);
    }
    var _iterator__ex2g4s_2 = get_entries_2().j();
    while (_iterator__ex2g4s_2.k()) {
      var tokenPath_2 = _iterator__ex2g4s_2.l();
      var tmp2_2 = tokenPathToCssVar(tokenPath_2.u1a_1, prefix);
      // Inline function 'kotlin.collections.set' call
      var value_2 = formatDepth(resolveIn_2(tokenPath_2, theme.t24_1));
      map.x1(tmp2_2, value_2);
    }
    var _iterator__ex2g4s_3 = get_entries_3().j();
    while (_iterator__ex2g4s_3.k()) {
      var tokenPath_3 = _iterator__ex2g4s_3.l();
      var tmp2_3 = tokenPathToCssVar(tokenPath_3.l1b_1, prefix);
      // Inline function 'kotlin.collections.set' call
      var value_3 = formatMotion(resolveIn_3(tokenPath_3, theme.v24_1));
      map.x1(tmp2_3, value_3);
    }
    var _iterator__ex2g4s_4 = get_entries_4().j();
    while (_iterator__ex2g4s_4.k()) {
      var tokenPath_4 = _iterator__ex2g4s_4.l();
      var tmp2_4 = tokenPathToCssVar(tokenPath_4.c1b_1, prefix);
      // Inline function 'kotlin.collections.set' call
      var value_4 = formatDp(resolveIn_4(tokenPath_4, theme.u24_1.b20_1));
      map.x1(tmp2_4, value_4);
    }
    var _iterator__ex2g4s_5 = get_entries_5().j();
    while (_iterator__ex2g4s_5.k()) {
      var tokenPath_5 = _iterator__ex2g4s_5.l();
      var tmp2_5 = tokenPathToCssVar(tokenPath_5.l1a_1, prefix);
      // Inline function 'kotlin.collections.set' call
      var value_5 = formatDp(resolveIn_5(tokenPath_5, theme.u24_1.d20_1));
      map.x1(tmp2_5, value_5);
    }
    var _iterator__ex2g4s_6 = get_entries_6().j();
    while (_iterator__ex2g4s_6.k()) {
      var tokenPath_6 = _iterator__ex2g4s_6.l();
      putTypographyProperties(map, tokenPath_6.v1c_1, resolveIn_6(tokenPath_6, theme.q24_1), prefix);
    }
    return map;
  }
  function putTypographyProperties(map, path, role, prefix) {
    var varName = tokenPathToCssVar(path, prefix);
    // Inline function 'kotlin.collections.set' call
    var value = formatTypeRole(role);
    map.x1(varName, value);
    var tmp2 = varName + '-size';
    // Inline function 'kotlin.collections.set' call
    var value_0 = formatSp(role.m1y_1);
    map.x1(tmp2, value_0);
    var tmp2_0 = varName + '-weight';
    // Inline function 'kotlin.collections.set' call
    var value_1 = _FontWeightValue___get_weight__impl__w0h7ri(role.n1y_1).toString();
    map.x1(tmp2_0, value_1);
    var tmp2_1 = varName + '-line-height';
    // Inline function 'kotlin.collections.set' call
    var value_2 = formatDeterministic(_LineHeightValue___get_multiplier__impl__uy9oqd(role.o1y_1));
    map.x1(tmp2_1, value_2);
    var tmp2_2 = varName + '-letter-spacing';
    // Inline function 'kotlin.collections.set' call
    var value_3 = formatDeterministic(_EmValue___get_em__impl__1q8ktd(role.p1y_1)) + 'em';
    map.x1(tmp2_2, value_3);
    var tmp2_3 = varName + '-family';
    // Inline function 'kotlin.collections.set' call
    var value_4 = formatFontFamily(role.l1y_1);
    map.x1(tmp2_3, value_4);
  }
  function emitThemeCss(theme, selector, prefix) {
    prefix = prefix === VOID ? '' : prefix;
    var tokens = extractTokenMap(theme, prefix);
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(tokens.m());
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = tokens.w1().j();
    while (_iterator__ex2g4s.k()) {
      var item = _iterator__ex2g4s.l();
      // Inline function 'kotlin.collections.component1' call
      var name = item.p1();
      // Inline function 'kotlin.collections.component2' call
      var value = item.q1();
      var tmp$ret$3 = '  ' + name + ': ' + value + ';';
      destination.f(tmp$ret$3);
    }
    var lines = destination;
    return selector + ' {\n' + joinToString(lines, '\n') + '\n}';
  }
  function emitPairCss(pair, prefix, lightSelector, darkSelector) {
    prefix = prefix === VOID ? '' : prefix;
    lightSelector = lightSelector === VOID ? ':root, [data-theme="light"]' : lightSelector;
    darkSelector = darkSelector === VOID ? '[data-theme="dark"]' : darkSelector;
    var tmp0_safe_receiver = pair.w24_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = emitThemeCss(tmp0_safe_receiver, lightSelector, prefix);
    }
    // Inline function 'kotlin.text.orEmpty' call
    var tmp0_elvis_lhs = tmp;
    var lightCss = tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs;
    var tmp1_safe_receiver = pair.x24_1;
    var tmp_0;
    if (tmp1_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_0 = emitThemeCss(tmp1_safe_receiver, darkSelector, prefix);
    }
    // Inline function 'kotlin.text.orEmpty' call
    var tmp0_elvis_lhs_0 = tmp_0;
    var darkCss = tmp0_elvis_lhs_0 == null ? '' : tmp0_elvis_lhs_0;
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = listOf([lightCss, darkCss]);
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$_0();
    var _iterator__ex2g4s = tmp0.j();
    while (_iterator__ex2g4s.k()) {
      var element = _iterator__ex2g4s.l();
      // Inline function 'kotlin.text.isNotEmpty' call
      if (charSequenceLength(element) > 0) {
        destination.f(element);
      }
    }
    return joinToString(destination, '\n\n');
  }
  function get_runtimeJson() {
    _init_properties_DocsRuntime_kt__wgqbcb();
    return runtimeJson;
  }
  var runtimeJson;
  function resolve_0(intentJson) {
    _init_properties_DocsRuntime_kt__wgqbcb();
    return resolveWithPrefix(intentJson, 'b');
  }
  function resolveWithPrefix(intentJson, prefix) {
    _init_properties_DocsRuntime_kt__wgqbcb();
    var tmp;
    try {
      // Inline function 'kotlin.text.trim' call
      var trimmed = toString(trim(isCharSequence(intentJson) ? intentJson : THROW_CCE()));
      var tmp_0;
      var tmp_1;
      // Inline function 'kotlin.text.isEmpty' call
      if (charSequenceLength(trimmed) === 0) {
        tmp_1 = true;
      } else {
        tmp_1 = trimmed === '{}';
      }
      if (tmp_1) {
        tmp_0 = new BasisIntent();
      } else {
        tmp_0 = ThemeInterchange_getInstance().o1q(trimmed);
      }
      var intent = tmp_0;
      var pair = resolve(intent);
      var tmp0_safe_receiver = pair.w24_1;
      var tmp_2;
      if (tmp0_safe_receiver == null) {
        tmp_2 = null;
      } else {
        // Inline function 'kotlin.let' call
        tmp_2 = extractTokenMap(tmp0_safe_receiver, prefix);
      }
      var tmp1_elvis_lhs = tmp_2;
      var lightTokens = tmp1_elvis_lhs == null ? emptyMap() : tmp1_elvis_lhs;
      var tmp2_safe_receiver = pair.x24_1;
      var tmp_3;
      if (tmp2_safe_receiver == null) {
        tmp_3 = null;
      } else {
        // Inline function 'kotlin.let' call
        tmp_3 = extractTokenMap(tmp2_safe_receiver, prefix);
      }
      var tmp3_elvis_lhs = tmp_3;
      var darkTokens = tmp3_elvis_lhs == null ? emptyMap() : tmp3_elvis_lhs;
      var css = emitPairCss(pair, prefix);
      var tokens = new ResolvedTokens(css, lightTokens, darkTokens);
      var success = new ResolvedSuccess(true, tokens, pair.y24_1);
      tmp = get_runtimeJson().zx(Companion_instance_0.s18(), success);
    } catch ($p) {
      var tmp_4;
      if ($p instanceof SerializationException) {
        var e = $p;
        var tmp4_elvis_lhs = e.message;
        tmp_4 = failureJson(tmp4_elvis_lhs == null ? 'Failed to parse intent JSON.' : tmp4_elvis_lhs);
      } else {
        if ($p instanceof IllegalArgumentException) {
          var e_0 = $p;
          var tmp5_elvis_lhs = e_0.message;
          tmp_4 = failureJson(tmp5_elvis_lhs == null ? 'Invalid intent arguments.' : tmp5_elvis_lhs);
        } else {
          if ($p instanceof IllegalStateException) {
            var e_1 = $p;
            var tmp6_elvis_lhs = e_1.message;
            tmp_4 = failureJson(tmp6_elvis_lhs == null ? 'Invalid theme state.' : tmp6_elvis_lhs);
          } else {
            throw $p;
          }
        }
      }
      tmp = tmp_4;
    }
    return tmp;
  }
  function emitCss(intentJson, prefix, lightSelector, darkSelector) {
    prefix = prefix === VOID ? 'b' : prefix;
    lightSelector = lightSelector === VOID ? ':root, [data-theme="light"]' : lightSelector;
    darkSelector = darkSelector === VOID ? '[data-theme="dark"]' : darkSelector;
    _init_properties_DocsRuntime_kt__wgqbcb();
    // Inline function 'kotlin.text.trim' call
    var trimmed = toString(trim(isCharSequence(intentJson) ? intentJson : THROW_CCE()));
    var tmp;
    var tmp_0;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(trimmed) === 0) {
      tmp_0 = true;
    } else {
      tmp_0 = trimmed === '{}';
    }
    if (tmp_0) {
      tmp = new BasisIntent();
    } else {
      tmp = ThemeInterchange_getInstance().o1q(trimmed);
    }
    var intent = tmp;
    var pair = resolve(intent);
    return emitPairCss(pair, prefix, lightSelector, darkSelector);
  }
  function failureJson(message) {
    _init_properties_DocsRuntime_kt__wgqbcb();
    var failure = new ResolvedFailure(false, listOf_0(new ThemeViolation('intent', message)));
    return get_runtimeJson().zx(Companion_getInstance_1().s18(), failure);
  }
  function runtimeJson$lambda($this$Json) {
    _init_properties_DocsRuntime_kt__wgqbcb();
    $this$Json.qy_1 = true;
    return Unit_instance;
  }
  var properties_initialized_DocsRuntime_kt_th0n2r;
  function _init_properties_DocsRuntime_kt__wgqbcb() {
    if (!properties_initialized_DocsRuntime_kt_th0n2r) {
      properties_initialized_DocsRuntime_kt_th0n2r = true;
      var tmp = ThemeInterchange_getInstance().n1q_1;
      runtimeJson = Json(tmp, runtimeJson$lambda);
    }
  }
  function ResolvedTokens$Companion$$childSerializers$_anonymous__fumbns() {
    return new LinkedHashMapSerializer(StringSerializer_getInstance(), StringSerializer_getInstance());
  }
  function ResolvedTokens$Companion$$childSerializers$_anonymous__fumbns_0() {
    return new LinkedHashMapSerializer(StringSerializer_getInstance(), StringSerializer_getInstance());
  }
  function Companion() {
    Companion_instance = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    var tmp_1 = lazy(tmp_0, ResolvedTokens$Companion$$childSerializers$_anonymous__fumbns);
    var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.y25_1 = [null, tmp_1, lazy(tmp_2, ResolvedTokens$Companion$$childSerializers$_anonymous__fumbns_0)];
  }
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function $serializer() {
    $serializer_instance = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.docs.runtime.ResolvedTokens', this, 3);
    tmp0_serialDesc.lp('css', false);
    tmp0_serialDesc.lp('light', true);
    tmp0_serialDesc.lp('dark', true);
    this.z25_1 = tmp0_serialDesc;
  }
  protoOf($serializer).a26 = function (encoder, value) {
    var tmp0_desc = this.z25_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance().y25_1;
    tmp1_output.mk(tmp0_desc, 0, value.b26_1);
    if (tmp1_output.uk(tmp0_desc, 1) ? true : !equals(value.c26_1, emptyMap())) {
      tmp1_output.ok(tmp0_desc, 1, tmp2_cached[1].q1(), value.c26_1);
    }
    if (tmp1_output.uk(tmp0_desc, 2) ? true : !equals(value.d26_1, emptyMap())) {
      tmp1_output.ok(tmp0_desc, 2, tmp2_cached[2].q1(), value.d26_1);
    }
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer).yf = function (encoder, value) {
    return this.a26(encoder, value instanceof ResolvedTokens ? value : THROW_CCE());
  };
  protoOf($serializer).zf = function (decoder) {
    var tmp0_desc = this.z25_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_input = decoder.xi(tmp0_desc);
    var tmp8_cached = Companion_getInstance().y25_1;
    if (tmp7_input.nj()) {
      tmp4_local0 = tmp7_input.hj(tmp0_desc, 0);
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
            tmp4_local0 = tmp7_input.hj(tmp0_desc, 0);
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
    return ResolvedTokens_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
  };
  protoOf($serializer).xf = function () {
    return this.z25_1;
  };
  protoOf($serializer).aq = function () {
    var tmp0_cached = Companion_getInstance().y25_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), tmp0_cached[1].q1(), tmp0_cached[2].q1()];
  };
  var $serializer_instance;
  function $serializer_getInstance_1() {
    if ($serializer_instance == null)
      new $serializer();
    return $serializer_instance;
  }
  function ResolvedTokens_init_$Init$(seen0, css, light, dark, serializationConstructorMarker, $this) {
    if (!(1 === (1 & seen0))) {
      throwMissingFieldException(seen0, 1, $serializer_getInstance_1().z25_1);
    }
    $this.b26_1 = css;
    if (0 === (seen0 & 2))
      $this.c26_1 = emptyMap();
    else
      $this.c26_1 = light;
    if (0 === (seen0 & 4))
      $this.d26_1 = emptyMap();
    else
      $this.d26_1 = dark;
    return $this;
  }
  function ResolvedTokens_init_$Create$(seen0, css, light, dark, serializationConstructorMarker) {
    return ResolvedTokens_init_$Init$(seen0, css, light, dark, serializationConstructorMarker, objectCreate(protoOf(ResolvedTokens)));
  }
  function ResolvedTokens(css, light, dark) {
    Companion_getInstance();
    light = light === VOID ? emptyMap() : light;
    dark = dark === VOID ? emptyMap() : dark;
    this.b26_1 = css;
    this.c26_1 = light;
    this.d26_1 = dark;
  }
  protoOf(ResolvedTokens).toString = function () {
    return 'ResolvedTokens(css=' + this.b26_1 + ', light=' + toString(this.c26_1) + ', dark=' + toString(this.d26_1) + ')';
  };
  protoOf(ResolvedTokens).hashCode = function () {
    var result = getStringHashCode(this.b26_1);
    result = imul(result, 31) + hashCode(this.c26_1) | 0;
    result = imul(result, 31) + hashCode(this.d26_1) | 0;
    return result;
  };
  protoOf(ResolvedTokens).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ResolvedTokens))
      return false;
    if (!(this.b26_1 === other.b26_1))
      return false;
    if (!equals(this.c26_1, other.c26_1))
      return false;
    if (!equals(this.d26_1, other.d26_1))
      return false;
    return true;
  };
  function Companion_0() {
  }
  protoOf(Companion_0).s18 = function () {
    return $serializer_getInstance_2();
  };
  var Companion_instance_0;
  function Companion_getInstance_0() {
    return Companion_instance_0;
  }
  function $serializer_0() {
    $serializer_instance_0 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.docs.runtime.ResolvedSuccess', this, 3);
    tmp0_serialDesc.lp('ok', true);
    tmp0_serialDesc.lp('tokens', false);
    tmp0_serialDesc.lp('report', false);
    this.e26_1 = tmp0_serialDesc;
  }
  protoOf($serializer_0).f26 = function (encoder, value) {
    var tmp0_desc = this.e26_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.g26_1 === true)) {
      tmp1_output.ek(tmp0_desc, 0, value.g26_1);
    }
    tmp1_output.ok(tmp0_desc, 1, $serializer_getInstance_1(), value.h26_1);
    tmp1_output.ok(tmp0_desc, 2, $serializer_getInstance(), value.i26_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_0).yf = function (encoder, value) {
    return this.f26(encoder, value instanceof ResolvedSuccess ? value : THROW_CCE());
  };
  protoOf($serializer_0).zf = function (decoder) {
    var tmp0_desc = this.e26_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = false;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_input = decoder.xi(tmp0_desc);
    if (tmp7_input.nj()) {
      tmp4_local0 = tmp7_input.zi(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp7_input.jj(tmp0_desc, 1, $serializer_getInstance_1(), tmp5_local1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp7_input.jj(tmp0_desc, 2, $serializer_getInstance(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp7_input.oj(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp7_input.zi(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp7_input.jj(tmp0_desc, 1, $serializer_getInstance_1(), tmp5_local1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp7_input.jj(tmp0_desc, 2, $serializer_getInstance(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp7_input.yi(tmp0_desc);
    return ResolvedSuccess_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
  };
  protoOf($serializer_0).xf = function () {
    return this.e26_1;
  };
  protoOf($serializer_0).aq = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [BooleanSerializer_getInstance(), $serializer_getInstance_1(), $serializer_getInstance()];
  };
  var $serializer_instance_0;
  function $serializer_getInstance_2() {
    if ($serializer_instance_0 == null)
      new $serializer_0();
    return $serializer_instance_0;
  }
  function ResolvedSuccess_init_$Init$(seen0, ok, tokens, report, serializationConstructorMarker, $this) {
    if (!(6 === (6 & seen0))) {
      throwMissingFieldException(seen0, 6, $serializer_getInstance_2().e26_1);
    }
    if (0 === (seen0 & 1))
      $this.g26_1 = true;
    else
      $this.g26_1 = ok;
    $this.h26_1 = tokens;
    $this.i26_1 = report;
    return $this;
  }
  function ResolvedSuccess_init_$Create$(seen0, ok, tokens, report, serializationConstructorMarker) {
    return ResolvedSuccess_init_$Init$(seen0, ok, tokens, report, serializationConstructorMarker, objectCreate(protoOf(ResolvedSuccess)));
  }
  function ResolvedSuccess(ok, tokens, report) {
    ok = ok === VOID ? true : ok;
    this.g26_1 = ok;
    this.h26_1 = tokens;
    this.i26_1 = report;
  }
  protoOf(ResolvedSuccess).toString = function () {
    return 'ResolvedSuccess(ok=' + this.g26_1 + ', tokens=' + this.h26_1.toString() + ', report=' + this.i26_1.toString() + ')';
  };
  protoOf(ResolvedSuccess).hashCode = function () {
    var result = getBooleanHashCode(this.g26_1);
    result = imul(result, 31) + this.h26_1.hashCode() | 0;
    result = imul(result, 31) + this.i26_1.hashCode() | 0;
    return result;
  };
  protoOf(ResolvedSuccess).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ResolvedSuccess))
      return false;
    if (!(this.g26_1 === other.g26_1))
      return false;
    if (!this.h26_1.equals(other.h26_1))
      return false;
    if (!this.i26_1.equals(other.i26_1))
      return false;
    return true;
  };
  function ResolvedFailure$Companion$$childSerializers$_anonymous__sjt43s() {
    return new ArrayListSerializer($serializer_getInstance_0());
  }
  function Companion_1() {
    Companion_instance_1 = this;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.x25_1 = [null, lazy(tmp_0, ResolvedFailure$Companion$$childSerializers$_anonymous__sjt43s)];
  }
  protoOf(Companion_1).s18 = function () {
    return $serializer_getInstance_3();
  };
  var Companion_instance_1;
  function Companion_getInstance_1() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function $serializer_1() {
    $serializer_instance_1 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('io.github.alph_a07.basis.docs.runtime.ResolvedFailure', this, 2);
    tmp0_serialDesc.lp('ok', true);
    tmp0_serialDesc.lp('violations', false);
    this.j26_1 = tmp0_serialDesc;
  }
  protoOf($serializer_1).k26 = function (encoder, value) {
    var tmp0_desc = this.j26_1;
    var tmp1_output = encoder.xi(tmp0_desc);
    var tmp2_cached = Companion_getInstance_1().x25_1;
    if (tmp1_output.uk(tmp0_desc, 0) ? true : !(value.l26_1 === false)) {
      tmp1_output.ek(tmp0_desc, 0, value.l26_1);
    }
    tmp1_output.ok(tmp0_desc, 1, tmp2_cached[1].q1(), value.m26_1);
    tmp1_output.yi(tmp0_desc);
  };
  protoOf($serializer_1).yf = function (encoder, value) {
    return this.k26(encoder, value instanceof ResolvedFailure ? value : THROW_CCE());
  };
  protoOf($serializer_1).zf = function (decoder) {
    var tmp0_desc = this.j26_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = false;
    var tmp5_local1 = null;
    var tmp6_input = decoder.xi(tmp0_desc);
    var tmp7_cached = Companion_getInstance_1().x25_1;
    if (tmp6_input.nj()) {
      tmp4_local0 = tmp6_input.zi(tmp0_desc, 0);
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
            tmp4_local0 = tmp6_input.zi(tmp0_desc, 0);
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
    return ResolvedFailure_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  protoOf($serializer_1).xf = function () {
    return this.j26_1;
  };
  protoOf($serializer_1).aq = function () {
    var tmp0_cached = Companion_getInstance_1().x25_1;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [BooleanSerializer_getInstance(), tmp0_cached[1].q1()];
  };
  var $serializer_instance_1;
  function $serializer_getInstance_3() {
    if ($serializer_instance_1 == null)
      new $serializer_1();
    return $serializer_instance_1;
  }
  function ResolvedFailure_init_$Init$(seen0, ok, violations, serializationConstructorMarker, $this) {
    if (!(2 === (2 & seen0))) {
      throwMissingFieldException(seen0, 2, $serializer_getInstance_3().j26_1);
    }
    if (0 === (seen0 & 1))
      $this.l26_1 = false;
    else
      $this.l26_1 = ok;
    $this.m26_1 = violations;
    return $this;
  }
  function ResolvedFailure_init_$Create$(seen0, ok, violations, serializationConstructorMarker) {
    return ResolvedFailure_init_$Init$(seen0, ok, violations, serializationConstructorMarker, objectCreate(protoOf(ResolvedFailure)));
  }
  function ResolvedFailure(ok, violations) {
    Companion_getInstance_1();
    ok = ok === VOID ? false : ok;
    this.l26_1 = ok;
    this.m26_1 = violations;
  }
  protoOf(ResolvedFailure).toString = function () {
    return 'ResolvedFailure(ok=' + this.l26_1 + ', violations=' + toString(this.m26_1) + ')';
  };
  protoOf(ResolvedFailure).hashCode = function () {
    var result = getBooleanHashCode(this.l26_1);
    result = imul(result, 31) + hashCode(this.m26_1) | 0;
    return result;
  };
  protoOf(ResolvedFailure).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ResolvedFailure))
      return false;
    if (!(this.l26_1 === other.l26_1))
      return false;
    if (!equals(this.m26_1, other.m26_1))
      return false;
    return true;
  };
  function tokenPathToCssVar(path, prefix) {
    prefix = prefix === VOID ? '' : prefix;
    // Inline function 'kotlin.text.trim' call
    var tmp$ret$0 = toString(trim(isCharSequence(prefix) ? prefix : THROW_CCE()));
    var cleanPrefix = removeSuffix(removePrefix(tmp$ret$0, '--'), '-');
    // Inline function 'kotlin.text.trim' call
    var tmp$ret$1 = toString(trim(isCharSequence(path) ? path : THROW_CCE()));
    var cleanPath = replace(tmp$ret$1, _Char___init__impl__6a9atx(46), _Char___init__impl__6a9atx(45));
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(cleanPrefix) === 0) {
      tmp = '--' + cleanPath;
    } else {
      tmp = '--' + cleanPrefix + '-' + cleanPath;
    }
    return tmp;
  }
  function formatColor(color) {
    var l = formatDeterministic(color.g1f_1);
    var c = formatDeterministic(color.h1f_1);
    var h = formatDeterministic(color.i1f_1);
    var tmp;
    if (color.j1f_1 < 1.0) {
      var a = formatDeterministic(color.j1f_1);
      tmp = 'oklch(' + l + ' ' + c + ' ' + h + ' / ' + a + ')';
    } else {
      tmp = 'oklch(' + l + ' ' + c + ' ' + h + ')';
    }
    return tmp;
  }
  function formatDp(dp) {
    return formatDeterministic(_DpValue___get_value__impl__1j6qu0(dp)) + 'px';
  }
  function formatSp(sp) {
    return formatDeterministic(_SpValue___get_value__impl__65u6pl(sp)) + 'px';
  }
  function formatDepth(spec) {
    var y = formatDeterministic(_DpValue___get_value__impl__1j6qu0(spec.m1x_1)) + 'px';
    var blur = formatDeterministic(_DpValue___get_value__impl__1j6qu0(spec.l1x_1)) + 'px';
    var alpha = formatDeterministic(spec.k1x_1);
    return '0 ' + y + ' ' + blur + ' rgb(0 0 0 / ' + alpha + ')';
  }
  function formatMotion(spec) {
    return _DurationValue___get_milliseconds__impl__sn32kr(spec.u1f_1).toString() + 'ms ' + formatEasing(spec.v1f_1);
  }
  function formatEasing(easing) {
    var tmp;
    switch (easing.z1_1) {
      case 0:
        tmp = 'linear';
        break;
      case 1:
        tmp = 'cubic-bezier(0.2, 0, 0, 1)';
        break;
      case 2:
        tmp = 'cubic-bezier(0.2, 0, 0, 1.25)';
        break;
      case 3:
        tmp = 'cubic-bezier(0, 0, 0.2, 1)';
        break;
      case 4:
        tmp = 'cubic-bezier(0.3, 0, 1, 1)';
        break;
      case 5:
        tmp = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function formatFontFamily(family) {
    var tmp;
    if (family instanceof Catalog) {
      tmp = '"' + _GoogleFontId___get_value__impl__s94bce(family.b21_1) + '", sans-serif';
    } else {
      if (family instanceof Custom) {
        tmp = '"' + _CustomFontKey___get_value__impl__mpjcc2(family.i22_1) + '", sans-serif';
      } else {
        noWhenBranchMatchedException();
      }
    }
    return tmp;
  }
  function formatTypeRole(role) {
    return '' + _FontWeightValue___get_weight__impl__w0h7ri(role.n1y_1) + ' ' + formatSp(role.m1y_1) + '/' + formatDeterministic(_LineHeightValue___get_multiplier__impl__uy9oqd(role.o1y_1)) + ' ' + formatFontFamily(role.l1y_1);
  }
  //region block: post-declaration
  protoOf($serializer).bq = typeParametersSerializers;
  protoOf($serializer_0).bq = typeParametersSerializers;
  protoOf($serializer_1).bq = typeParametersSerializers;
  //endregion
  //region block: init
  Companion_instance_0 = new Companion_0();
  //endregion
  //region block: exports
  function $jsExportAll$(_) {
    var io = _.io || (_.io = {});
    var github = io.github || (io.github = {});
    var alph_a07 = github.alph_a07 || (github.alph_a07 = {});
    var basis = alph_a07.basis || (alph_a07.basis = {});
    var docs = basis.docs || (basis.docs = {});
    var runtime = docs.runtime || (docs.runtime = {});
    runtime.resolve = resolve_0;
    runtime.resolveWithPrefix = resolveWithPrefix;
    runtime.emitCss = emitCss;
    var io_0 = _.io || (_.io = {});
    var github_0 = io_0.github || (io_0.github = {});
    var alph_a07_0 = github_0.alph_a07 || (github_0.alph_a07 = {});
    var basis_0 = alph_a07_0.basis || (alph_a07_0.basis = {});
    var docs_0 = basis_0.docs || (basis_0.docs = {});
    var runtime_0 = docs_0.runtime || (docs_0.runtime = {});
    runtime_0.tokenPathToCssVar = tokenPathToCssVar;
  }
  $jsExportAll$(_);
  //endregion
  return _;
}));

//# sourceMappingURL=Basis-docs-runtime.js.map
