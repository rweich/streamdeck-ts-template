const manifest = require('../../assets/manifest.json');

module.exports = {
  createDevelopmentManifest: () => {
    const man = manifest;
    man.Actions.map((action) => {
      action.Name += ' (dev)';
      action.UUID = 'dev.' + action.UUID;
      return action;
    });
    man.Name += ' (dev)';
    return JSON.stringify(man, undefined, '\t');
  },
  manifestNs: manifest.Actions[0].UUID.split('.').slice(0, -1).join('.'),
};
