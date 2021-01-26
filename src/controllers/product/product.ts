import Product from './../../models/Product'
import csvToJson from '../../util/csvToJson'
import uploadToS3 from '../../util/uploadToS3';
import fs from "fs"

import AnyInterface from '../../util/anyInterface'


async function index(req, res) {

   try {
      const products = await Product.find();

      const statusCode = products ? 200 : 404;

      res.status(statusCode).json(products);

   }
   catch (error) { res.status(400).send(error); }
}
async function show(req, res) {
   const { id } = req.params

   try {
      const product = await Product.findById(id);
      const statusCode = product ? 200 : 400;

      res.status(statusCode).json(product)
   }
   catch (error) { res.status(400).send(error); }
}
async function sendToS3(files, path) {   
   try {
   const file = files[0];   
   const fileBinary = await fs.readFileSync(file.path);
   const filename = new Date().getTime() + "." + file.originalname;

   return await uploadToS3(fileBinary, path, filename);
   
   } catch (error) {return error.message}
   
}

async function create(req, res) { 
      let productData = req.body.data

      if (typeof(productData) === 'string'){productData = JSON.parse(productData)}     

      
      try {                 

         const product: AnyInterface = new Product(productData);

         product.image = await sendToS3(req.files,  'temp/sellynx/');
                  
         
         await product.save();
         res.status(201).send(product);

   } catch (error) {
      res.status(400).send(error);
   }
}

async function update(req, res) {

   let productData =  req.body.data ? req.body.data : req.body
   if (typeof(productData) === 'string'){productData = JSON.parse(productData)}


   try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(
         id,
         { $set: productData },
         { upsert: true, new: true }
      );
      const status = product ? 200 : 404;
      
      req.files ? product.image = await sendToS3(req.files,  'temp/sellynx/') : ''

      await product.save()

      return res.status(status).json(product);
   }
   catch (error) { res.status(400).send(error); }
}

async function upload(req, res) {
   try {
 
       const file = req.files[0]; 
       if(file.originalname.split('.')[1] !== 'csv') res.status(400).send("Unsupported file extension!");
       if(file.size > 5000) res.status(400).send("File size is too big!");
       
       const data: any = await csvToJson(file.path);

       const products = []

       data.map(async (item,index) => {
         const product = new Product(item)
         products.push(product)
         await product.save();            
      });
      
       res.status(200).json(products)
 
   } catch (error) {
       res.status(400).send(error);
   }
 }

async function deleteProduct(req, res) {
   try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id)
      const statusCode = product ? 200 : 404
      const message = product ? { message: 'Product deleted' } : { message: 'Product not found' }

      return res.status(statusCode).json(message);
   }
   catch (error) { res.status(400).send(error); }
}

async function deleteAll(req, res) {

   try {
      const product = await Product.deleteMany()
      const message = { message: 'Item deleted' }
      return res.status(200).json(message);
   }
   catch (error) { res.status(400).send(error); }
}

export default {
   index, show, create, update, upload, deleteProduct, deleteAll
}