const router = require('express').Router()
const crudController = require('../controller/crud.controller')
const path = require('path')
const multer = require('multer');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype=='image/jpg' || file.mimetype=='image/jpeg' || file.mimetype =="image/png") {
            cb(null, './public/uploads/my_images')
        }
        else{
            cb(null, './public/uploads/my_documents')
        }
        
        
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  'anupam_mishra' + uniqueSuffix + path.extname(file.originalname))
    }
});

const fileFilter =  (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else if (file.mimetype == 'application/msword' || file.mimetype == 'application/pdf'){
        cb(null,true)

    }else{
        cb(null,false)
        return cb(new Error('this format  are not supported'))
    }
}




const Uploads = multer({
    storage,fileFilter
   
}).fields([{name:'document',maxCount:1},{name:'image',maxCount:1}])

router.get('/',crudController.dataListing)
router.get('/add',crudController.addForm),
router.post('/insert',Uploads,crudController.insertForm)
router.get('/edit/:id',crudController.editForm)
router.post('/update',Uploads,crudController.updateData)
router.get('/delete/:id',crudController.deleteData)


module.exports = router