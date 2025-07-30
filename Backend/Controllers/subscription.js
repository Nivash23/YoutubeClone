import express from 'express';
import { JWTkey } from '../utils/config.js';
import jwt from 'jsonwebtoken'
import Subscriptiondata from '../Model/subscription.js';

const SubscriptionRouter = express.Router();

SubscriptionRouter.post('/addtosubscription', async (req, res) => {
    const { token, item } = req.body;
    
    if (token== "")
    {
        return res.status(404).json({message:"Unauthorized User"})
    }    
    const user = jwt.verify(token, JWTkey);
    if (user == "")
    {
        return res.status(404).json({message:"Your token has been expired PLease Relogin.."})
    }

    const newdata = new Subscriptiondata({
        userid: user.Objectid,
        itemid:item._id,
        title: item.title,
        thumbnailUrl: item.thumbnailUrl,
        duration: item.duration,
        uploadTime: item.uploadTime,
        views:item.views,
        author: item.author,
        videoUrl: item.videoUrl,
        description: item.description,
        subscriber:item.subscriber,
        isLive:item.isLive  
        
    })

    await newdata.save();

    res.status(200).json({
        message:"Added to Subscription"
    })
})

SubscriptionRouter.delete('/delete', async (req, res) => {
    const { token, itemid } = req.body;

    if (token == "")
    {
        return res.status(404).json({message:'Your Token Has been expired.'})
    }
    const deleteditem = await Subscriptiondata.deleteOne({ _id: itemid })
    
    res.status(200).json({message:"Sucess"})
    
})

SubscriptionRouter.get('/', async (req, res) => {
    const { token } = req.body;
    if (token == "")
    {
        return res.status(404).json({
            message:"Unauthorized User.."
        })
    }
    const user = jwt.verify(token, JWTkey);
    if (user == "")
    {
        return res.status(404).json(
            {
                message:"Your token has been expired Please Relogin"
            }
        )
    }
    const videos = await Subscriptiondata.find({ userid: user.Objectid });

    if (videos.length == 0)
    {
        return res.status(200).json({message:"There is no subscriptions"})
    }
    res.status(200).json({videolists:videos})
})

export default SubscriptionRouter;