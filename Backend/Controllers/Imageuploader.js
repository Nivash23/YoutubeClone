
import express from 'express';
import User from '../Model/user.js'
import { JWTkey } from '../utils/config.js';
import jwt from 'jsonwebtoken';
const ImageRouter = express.Router();
// const Images=require('../model/Imageuploader')

import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
    cb(null,uniqueSuffix+ file.originalname)
  }
})

const upload = multer({ storage: storage })

ImageRouter.post('/',upload.single('image'), async (req, res) => {
    const token = req.body.token;
    const imgname = req.file.filename;
    
    const decodeduser = jwt.verify(token, JWTkey);

    const user = await User.findOne({ _id: decodeduser.Objectid });
    user.Profileimage = imgname;
  await user.save();
  

    res.status(200).json({
      message: "uploaded",
      profilesrc:user.Profileimage
    })
//   const savedimg = await new Images({
//     image:imgname
//   })
//   await savedimg.save();
//     res.status(200).json({
//         message:"uploaded.."
//     })
})

export {ImageRouter,upload}



