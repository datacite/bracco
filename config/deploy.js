ENV.s3 = {
  accessKeyId: ENV.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY,
  secretAccessKey: ENV.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY,
  bucket: ENV.AWS_BUCKET = process.env.AWS_BUCKET,
  region: ENV.AWS_REGION = process.env.AWS_REGION
}
