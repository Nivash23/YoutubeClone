import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    userid: String,
    itemid:String,
    title: String,
    thumbnailUrl: String,
    duration: String,
    uploadTime: String,
    views: String,
    author: String,
    videoUrl: String,
    description: String,
    subscriber: String,
    isLive:Boolean
})

const Subscriptiondata = mongoose.model('subscriptions', SubscriptionSchema);

export default Subscriptiondata;