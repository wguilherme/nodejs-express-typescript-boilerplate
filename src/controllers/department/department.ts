import Product from '@models/Product'
import Department from '../../models/Department'



async function index (req, res){

   try {

      const departments = await Department.find()
      // const departments = await Department.find({ path: /Books/ })
   
      res.status(201).json(departments)
      
   } catch (error) {
      
   }
}

async function create (req, res){

   try {
      const department = await new Department(req.body)


      // const department = await new Department( [
      //    { _id: "Books", path: null },
      //    { _id: "Programming", path: "Books" },
      //    { _id: "Databases", path: ",Books,Programming," },
      //    { _id: "Languages", path: ",Books,Programming," },
      //    { _id: "MongoDB", path: ",Books,Programming,Databases," },
      //    { _id: "dbm", path: ",Books,Programming,Databases," }
      // ] )
      await department.save()     
   
      res.status(201).json(department)
      
   } catch (error) {
      
   }
}

async function show (req,res){
   try {

      const department = await Department.findById(req.params.id)

      res.status(200).json(department)


   } catch (error) {
      
   }
}

async function update(req,res){

   const {id} = req.params

   const department = await Department.findByIdAndUpdate(
      id,
      { $set: req.body },
      { upsert: false, new: true }
   );

   res.status(200).json(department)

}

async function deleteDepartment (req, res){

   const {id} = req.params

   await Department.findByIdAndDelete(id)

   const department = await Department.findById(id)

   const response = department ? 'Department not deleted' : 'Department deleted'

   res.status(200).json(response)
}

async function deleteAllDepartments (req, res){
   try {
      const department = await Department.deleteOne()
      const message = { message: 'Department deleted' }
      return res.status(200).json(message);
   }
   catch (error) { res.status(400).send(error); }


}

export default {create, update, index, show, deleteDepartment, deleteAllDepartments}