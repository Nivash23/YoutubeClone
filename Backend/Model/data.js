import mongoose from "mongoose";

const commentschema={
        Email: String,
        message:String
        
    }
const DataSchema = new mongoose.Schema({
    title: String,
    thumbnailUrl: String,
    duration: String,
    uploadTime: String,
    views: String,
    author: String,
    comments: [commentschema],
    videoUrl: String,
    description: String,
    subscriber: String,
    isLive: Boolean,
    category:String
})

const Data = mongoose.model('videos', DataSchema);

export default Data;