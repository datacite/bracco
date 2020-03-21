/* eslint-env node */

'use strict';

module.exports = function(env) {
  return {
    enabled: env === 'test',
    server: {
      apiNamespace: '/polly',
      recordingsDir: 'recordings',
    },
  };
};
