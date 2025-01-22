import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
   filename: (req, file, callback) => {
    callback(null, file.originalname); // Ensure this directory exists
  },

});
const upload = multer({
  storage
});

export default upload;
