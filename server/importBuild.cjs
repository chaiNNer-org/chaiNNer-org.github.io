{
  const { setLoaders } = require('../../node_modules/vite-plugin-ssr/dist/cjs/node/plugin/plugins/importBuild/loadBuild.js');
  setLoaders({
    pageFiles: () => import('./pageFiles.js'),
    clientManifest: () => require('../client/manifest.json'),
    pluginManifest: () => require('../client/vite-plugin-ssr.json'),
  });
}
