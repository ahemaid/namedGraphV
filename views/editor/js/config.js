var require = {
  baseUrl: '../javascripts/editor/js',
  paths: {
    mode: '../mode',
    N3: 'lib/n3-browser-slk',
    jquery: 'lib/jquery-2.1.3.min',
    github: 'lib/github',
    underscore: 'lib/underscore-min',
    semanticUI: '../../javascripts/semanticUI',
  },
  shim: { // see http://requirejs.org/docs/api.html#config-shim
    'N3': {
      exports: 'N3'
    }
  }
};
