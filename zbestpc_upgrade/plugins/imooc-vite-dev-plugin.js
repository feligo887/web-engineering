const { createServer } = require('vite');

module.exports = async function() {
  try {
    const server = await createServer({
      configFile: './vite.config.js',
    })
    await server.listen()

    server.printUrls()
  } catch (e) {
    console.error(e);
  }
};
