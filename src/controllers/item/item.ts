
//models
import Item from '../../models/Item'
import User from '../../models/User'

//imports
import AWS from"aws-sdk"
import fs from "fs"


async function hello(req, res) {
   try {
      console.log('passed1')
      const user = await User.find();
      console.log('passed2')
      const response = user ? user : 'Users not found';
      console.log('passed3')
      const statusCode = user ? 200 : 404;
      console.log('passed4')
      res.status(statusCode).send(response)
   } catch (error) {
      res.status(500).send(error)
   }
}

function ping(req, res) {
   res.status(200).json({ message: "pong" })
}
async function index(req, res) {
   try {
      const item = await Item.find();

      res.status(200).json(item)
   }
   catch (error) { res.status(400).send(error); }
}
async function show(req, res) {


   const { id } = req.params

   try {
      const item = await Item.findById(id);
      res.status(200).send(item)
   }
   catch (error) { res.status(400).send(error); }
}
async function create(req, res) {
   try {
      const item = new Item({
         title: req.body.title,
         description: req.body.description,
      });
      await item.save();
      res.status(201).send({ item });

   } catch (error) {
      res.status(400).send(error);
   }
}

async function uploadToS3(fileBinary, path,filename){
   //config
   const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
   const s3 = new AWS.S3({
      // endpoint: spacesEndpoint,
      endpoint: spacesEndpoint,
      accessKeyId: process.env.DO_SPACES_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET,
      region: 'nyc3'
   });
   const params = { 
      Bucket: "healthy",
      Key: path + filename,
      Body: fileBinary,
      ACL: 'public-read'
   }


   s3.putObject(params, (err, data) => {
      if (err) return console.log(err);
      data.Url = `https://${process.env.DO_SPACES_NAME}.${process.env.DO_SPACES_ENDPOINT}/${path}${filename}`;         
      console.log("Your file has been uploaded successfully!", data);
   });
      
 
 
}

async function upload(req, res) {

   const file = req.files[0];
   
   const fileBinary = await fs.readFileSync(file.path);
   const filename = new Date().getTime() + "." + file.originalname;
   const path = 'temp/sellynx/'

   try {
      const uploadData = await uploadToS3(fileBinary, path, filename)  
      res.status(200).json(uploadData);

      
   } catch (error) {

      res.status(400).json({error: error.message})
      
   }
   
}
// async function getUploaded(req, res) {
//    const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
//    const s3 = new AWS.S3({
//       // endpoint: spacesEndpoint,
//       endpoint: spacesEndpoint,
//       accessKeyId: process.env.DO_SPACES_KEY,
//       secretAccessKey: process.env.DO_SPACES_SECRET,
//       region: 'nyc3'
//    });

//    const params = { 
//       Bucket: "healthy",
//       Key: '1611084670190.jpg',
//    }

//    s3.getObject(params, function(err, data) {
//       if (err) console.log(err, err.stack); // an error occurred
//       else     console.log(data);           // successful response
//     });

 


// }

async function update(req, res) {
   try {
      const { id } = req.params;
      const item = await Item.findByIdAndUpdate(
         id,
         { $set: req.body },
         { upsert: true, new: true }
      );
      const status = item ? 200 : 404;
      return res.status(status).json(item);
   }
   catch (error) { res.status(400).send(error); }
}
async function deleteItem(req, res) {
   try {
      const { id } = req.params;
      const item = await Item.findByIdAndDelete(id)
      const statusCode = item ? 200 : 404
      const message = item ? { message: 'Item deleted' } : { message: 'Item not found' }

      return res.status(statusCode).json(message);
   }
   catch (error) { res.status(400).send(error); }
}
async function deleteAll(req, res) {
   try {
      const item = await Item.deleteMany()
      const message = { message: 'Item deleted' }
      return res.status(200).json(message);
   }
   catch (error) { res.status(400).send(error); }
}




// Functions


export default {
   hello,
   ping,
   index,
   show,
   create,
   upload,
   // getUploaded,
   update,
   deleteItem,
   deleteAll
}