var require = {
  // baseUrl: '../../javascripts/editor/js',
  paths: {
    mode: '../mode',
    N3: '../../javascripts/editor/js/lib/n3-browser-slk.js',
    jquery: 'lib/jquery-2.1.3.min',
    github: 'lib/github',
    underscore: 'lib/underscore-min',
    semanticUI: '../../../semanticUI',
  },
  shim: { // see http://requirejs.org/docs/api.html#config-shim
    'N3': {
      exports: 'N3'
    }
  }
};
