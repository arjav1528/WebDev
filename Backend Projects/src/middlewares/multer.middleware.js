import multer from "multer";

// Storage checkpoint - decides where to store uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')  // Files go to temporary storage
    },
    filename: function (req, file, cb) {
      // Give unique names to prevent conflicts
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// File upload checkpoint
const upload = multer({ storage: storage })

export default upload;