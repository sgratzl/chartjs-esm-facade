(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports, require('chart.js'))
    : typeof define === 'function' && define.amd
    ? define(['exports', 'chart.js'], factory)
    : ((global = global || self), factory((global.ChartESMFacade = {}), global.Chart));
})(this, function (exports, ChartNS) {
  'use strict';

  ChartNS = ChartNS && Object.prototype.hasOwnProperty.call(ChartNS, 'default') ? ChartNS['default'] : ChartNS;

  // copy all
  Object.assign(exports, ChartNS);
  // create internal structure
  exports.default = ChartNS;
  exports.Chart = ChartNS;
  // Animations
  exports.Animations = ChartNS.animationService;
  // platforms
  Object.assign(exports, ChartNS.platforms);
  // controllers, scales, elements
  // use the prototype name as export name
  [ChartNS.registry.controllers, ChartNS.registry.scales, ChartNS.registry.elements].forEach((typedRegistry) => {
    Object.keys(typedRegistry.items).forEach((id) => {
      const classPrototype = typedRegistry.get(id);
      exports[classPrototype.name] = classPrototype;
    });
  });
  // for plugins generate a name from the id
  Object.keys(ChartNS.registry.plugins.items).forEach((id) => {
    const plugin = ChartNS.registry.plugins.get(id);
    exports[id[0].toUpperCase() + id.slice(1)] = plugin;
  });

  // flat helpers
  Object.keys(ChartNS.helpers).forEach((helper) => {
    const v = ChartNS.helpers[helper];
    // core and extra helpers are inlined
    if (typeof v === 'function' && helper[0] !== '_') {
      exports[helper] = v;
    } else {
      Object.keys(v)
        .filter((d) => d[0] !== '_')
        .forEach((hi) => {
          exports[hi] = v[hi];
        });
    }
  });
});
