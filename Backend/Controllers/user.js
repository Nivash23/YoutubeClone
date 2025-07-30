import express from 'express';
import Subscriptiondata from '../Model/subscription.js';
import User from '../Model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWTkey } from '../utils/config.js';
import Datas from '../Model/data.js';
import {upload} from '../Controllers/Imageuploader.js'

const UserRouter = express.Router();

UserRouter.post('/userreg/', async (req, res) => {
    const { Email, Name, Password } = req.body;

    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(Email))
    {
        if (Name !== "" && Password !== "")
        {
            const hashedpass=await bcrypt.hash(Password,10) 
            const newuser = new User({
                Email: Email,
                Name: Name,
                Password:hashedpass
            })

            await newuser.save();

            res.status(200).json({
                message:"User Registered Sucessfully.."
            })
        }
    }
    res.status(404).json({
        message:"Email is not valid.."
    })
})

UserRouter.post('/userlogin', async (req, res) => {
    const { Email, Password } = req.body;

    const isuser = await User.findOne({ Email: Email });

    const datas = await Datas.find();



    if (isuser !== null)
    {
        const isAuth = await bcrypt.compare(Password, isuser.Password);

        if (isAuth)
        {
            const payload = {
                Objectid:isuser._id,
                Email: Email,
                Password:Password
            }
            const subscriptions=await Subscriptiondata.find({userid:isuser._id})

            const token=jwt.sign(payload,JWTkey,{expiresIn:'1h'})
            res.status(200).json({
                name:isuser.Name,
                token: token,
                Profilesrc:isuser.Profileimage,
                videocollections: datas,
                subscribedvideos:subscriptions,
                message: "User Sucessfully Authenticated..",
                Channels:isuser.Channels
            })
        }
        else {
            res.status(404).json({
                message:"User not Authenticated.."
            })
        }
    }
    else {
        res.status(404).json({
            message:"User doesn't exists.."
        })
    }


    
})

UserRouter.post('/addcomment', async (req, res) => {
    const { token, itemid,message} = req.body;

    const user = jwt.verify(token, JWTkey);

    const item = await Datas.findOne({ _id: itemid });
    if (user == "" || user == undefined)
    {
        return res.status(404).json({
            message:"Your Token has been Expired.."
        })
    }
    item.comments.push({
        Email: user.Email,
        message:message
    })
    await item.save();

    res.status(200).json({
        message:"Comment Added",
        Comments:item.comments
    })

})
UserRouter.post('/createchannel',upload.single('image'), async (req, res) => {
    const { token, Channelname, Contenttype, Description } = req.body;
    const image = req.file==undefined ? "" :req.file.filename;
   
    if (token == "" || Channelname == "" || Contenttype == "" || Description == "")
    {
        return res.status(404).json({
            message:"Please fill All the fields"
        })
    }

    const isuserAuth = jwt.verify(token, JWTkey);
    if (isuserAuth=="")
    {
        return res.status(404).json({
          message:"Your Token has been expired."
      })
    }
    const user = await User.findOne({ _id: isuserAuth.Objectid });

    user.Channels.push({
        avatarimg: image,
        name: Channelname,
        contentType: Contenttype,
        description:Description
    })
    await user.save();

    res.status(200).json({
        message: "Channel Created",
        Channels:user.Channels
    })

})

UserRouter.post('/editcomment', async (req, res) => {
    const { token, commentid, itemid, editedmessage } = req.body;
    if (token == "")
    {
        return res.status(404).json({
            message:"Your Token has been expired..Please to Relogin"
        })
    }
    const item = await Datas.findOne({ _id: itemid });
    const comment = item.comments.id(commentid);

    comment.message = editedmessage;
    await item.save();
    res.status(200).json({
        Comments: item.comments,
        message:"Edited"
    })
})
UserRouter.delete('/deletecomment', async (req, res) => {
    const { token, itemid, commentid} = req.body;
    if (token == "")
    {
        return res.status(404).json({
            message:"Your Token has been expired..Please to Relogin"
        })
    }
    const item = await Datas.findOne({ _id: itemid });
    
    const deleted = item.comments.id(commentid);

    deleted.deleteOne();
    

    // deleted.remove();

    // comment.message = editedmessage;
    await item.save();
    res.status(200).json({
        message: "comment deleted",
        Comments:item.comments
    })
})


export default UserRouter;