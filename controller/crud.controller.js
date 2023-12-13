const crudModel = require("../models/crud.model");
const fs = require('fs')

class crudController {
  //<<<<<<<<<<<< show add form >>>>>>>>>>>>>>>

  async addForm(req, res) {
    try {
      res.render("add", {
        title: "Show add form ",
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (err) {
      throw err;
    }
  }

  // <<<<<<<<<<<< insert form Data >>>>>>>>>>>>>>>>>>>>

  async insertForm(req, res) {
    try {
      // for image >>>>>
      req.body.image = []
      for (let img = 0; img < req.files['image'].length; img++) {
        req.body.image.push(req.files['image'][img].filename)
        }

       // for document >>>>>>

       req.body.document = []
       for (let doc = 0; doc < req.files['document'].length; doc++) {
        req.body.document.push(req.files['document'][doc].filename)
       }


      let save_data = await crudModel.create(req.body);
      if (save_data) {
        req.flash("success", " Data Saved Sucesfully ");
        console.log("saved data", save_data);
        res.redirect("/");
      }
    } catch (err) {
      throw err;
    }
  }

  // <<<<<<<<<<<<< data listing >>>>>>>>>>>>>

  async dataListing(req, res) {
    try {
      const all_data = await crudModel
        .find({ isDeleted: false })
        .sort({ createdAt: -1 });
      // console.log("alldata",all_data);
      res.render("list", {
        title: "fetching all data",
        success: req.flash("success"),
        error: req.flash("error"),
        all_data,
      });
    } catch (err) {}
  }

  // <<<<<<<<<< edit form >>>>>>>>>>>>>>>

  async editForm(req,res){
    try{
      let user_details = await crudModel.findOne({_id: req.params.id})
      res.render('edit',{
        title:"Edit Form",
        success:req.flash("success"),
        error: req.flash("error"),
        user_details
      
      })

    }catch(err){
      throw err
    }

  }

  // <<<<<<<<<< update form data >>>>>>>>>>>>>>>>>>>>>

  async updateData(req,res){
    try{
      // let user_details = await crudModel.findOne({_id: req.body.id})
 
      
    let updated_obj = {
        name: req.body.name,
        email:req.body.email,
        age:req.body.age
      }

//    for image update >>>>>>>>>>>>>>>>>>>>>


        req.body.image = []
        for (let img = 0; img < req.files['image'].length; img++) {
          req.body.image.push(req.files['image'][img].filename)
          }
          // fs.unlinkSync(`./public/uploads/my_images/${updated_obj.images}`)
          updated_obj.image = req.body.image 

          // for document upload 
          
      //  req.body.document = []
      //  for (let doc = 0; doc < req.files['document']; doc++) {
      //   req.body.document.push(req.files['document'][doc].filename)
      //  }

      // //  fs.unlinkSync(`./public/uploads/my_documents/${user_details.document}`)
      //  updated_obj.document = req.body.document


      let updated_data = await crudModel.findByIdAndUpdate(req.body.id,updated_obj)

      if (updated_data) {
        console.log("data updated sucessfully");
        req.flash("success"," Data updated Sucessfully !!!")
        return res.redirect('/')
        
        
      }


    }catch(err){
      throw err
    }

  }

  // <<<<<<<<<<< delete data >>>>>>>>>>>>>>>>>>>>

  async deleteData(req, res) {
    let delete_obj = {
      isDeleted: true,
    };
    let deleted_data = await crudModel.findByIdAndUpdate(
      req.params.id,
      delete_obj
    );
    if (deleted_data) {
      console.log("Data Deleted sucessfully");
      req.flash("success", "Data Deleted sucessfully");
      res.redirect("/");
    }
  }




}
module.exports = new crudController();
