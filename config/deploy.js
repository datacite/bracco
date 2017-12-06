module.exports = function(deployTarget) {
  var ENV = {};

  ENV['bugsnag'] = {
    apiKey: process.env.BUGSNAG_KEY,
    publicUrl: process.env.BUGSNAG_PUBLIC_URL,
  };

  return ENV;
};
