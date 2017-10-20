module.exports = function(deployTarget) {
  var ENV = {};

  ENV.s3 = {
    accessKeyId: ENV.AWS_ACCESS_KEY,
    secretAccessKey: ENV.AWS_SECRET_KEY,
    bucket: ENV.AWS_BUCKET,
    region: ENV.AWS_REGION,
    filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,html}'
  };

  return ENV;
};
