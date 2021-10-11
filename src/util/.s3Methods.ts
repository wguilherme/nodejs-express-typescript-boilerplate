// const getParams = {
   //    Bucket: "healthy",
   //    Key: `temp/sellynx/`,
   // }

   // s3.getSignedUrl("getObject", getParams, (err, url) => {
   //    if (err) {
   //       console.log(err)
   //    } else {
   //     console.log(url)
   //     res.status(200).json({link: url})
   //    }
   // })


   //get one image
   // await s3.getObject(getParams, function(err, data) {
   //    if (err) console.log(err, err.stack); // an error occurred
   //    else {
   //       console.log(data);      

   //       const base64data = Buffer.from(data.Body, "binary").toString("base64");
   //       res.status(200).send({ image: base64data });
   //    }  
   //  });


   // get more than one image
//    return s3.getObject(getParams, function(err, data) {
//       if (err) {
//           res.status(200).send(err);
//       } else {
//           const img = Buffer.from(data.Body, "binary");
//           // res.writeHead(200, {'Content-Type': 'image/jpeg'});
//           // res.write(base64data, 'binary');
//           // res.end(null, 'binary');
//           res.writeHead(200, {
//               'Content-Type': 'image/png',
//               'Content-Length': img.length
//             });

//             res.end(img);
//       }
//   });

   // res.json({message: 'ok'})