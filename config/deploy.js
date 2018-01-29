module.exports = function(deployTarget) {
  var ENV = {};

  ENV['bugsnag'] = {
    apiKey: process.env.BUGSNAG_API_KEY,
    publicUrl: process.env.BUGSNAG_PUBLIC_URL,
  };

  ENV.s3 = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    bucket: process.env.AWS_BUCKET,
    region: process.env.AWS_REGION,
    filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,html}'
  };

  return ENV;
};
