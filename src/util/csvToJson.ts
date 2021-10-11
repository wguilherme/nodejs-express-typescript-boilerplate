const csv = require('csv-parser')
const fs = require('fs')

export default function csvToJson(filePath) {
  return new Promise((resolve, reject) => {
    const results = []
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ',' }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
  })
}
