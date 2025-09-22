import multer from "multer";
const storage = multer.diskStorage({
    // - destination: Specifies the folder where uploaded files will be stored. In this case, it's ./public/temp.

destination : function(req,file,cb){
cb(null,"./public/temp")
},
// - filename: Determines the name of the file once it's saved. Here, it uses the original name of the uploaded file (file.originalname)

filename : function(req,file,cb){
    cb(null,file.originalname)
}
})

export const upload = multer({storage : storage})