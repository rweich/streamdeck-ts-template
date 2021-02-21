const manifest = require('../../assets/manifest.json');

module.exports = {
  manifestNs: manifest.Actions[0].UUID.split('.').slice(0, -1).join('.'),
  manifestName: manifest.Name,
};
