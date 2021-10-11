import AWS from 'aws-sdk'

export default async function uploadToS3(fileBinary, path, filename) {
  // config
  const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT)
  const s3 = new AWS.S3({
    // endpoint: spacesEndpoint,
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
    region: 'nyc3',
  })
  const params = {
    Bucket: 'healthy',
    Key: path + filename,
    Body: fileBinary,
    ACL: 'public-read',
  }
  /* eslint no-param-reassign: ["error", { "props": false }] */
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err: any, data: any) => {
      if (err) {
        reject(err)
      }
      data.url = `https://${process.env.DO_SPACES_NAME}.${process.env.DO_SPACES_ENDPOINT}/${path}${filename}`
      console.log('Your file has been uploaded successfully!', data)
      resolve(data.url)
    })
  })
}
