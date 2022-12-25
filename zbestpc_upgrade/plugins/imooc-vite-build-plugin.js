const { build, preview } = require('vite');

module.exports = async function() {
  await build({
    configFile: './vite.config.js',
  });

  const previewServer = await preview({
    configFile: './vite.config.js',
  })

  previewServer.printUrls()
};
