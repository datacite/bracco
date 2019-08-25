const FastBootAppServer = require('fastboot-app-server');
 
const MY_GLOBAL = 'MY GLOBAL';
 
let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  host: '0.0.0.0',
  port: 80,
  sandboxGlobals: { GLOBAL_VALUE: MY_GLOBAL }, // Optional - Make values available to the Ember app running in the FastBoot server, e.g. "MY_GLOBAL" will be available as "GLOBAL_VALUE"
  chunkedResponse: true
});
 
server.start();