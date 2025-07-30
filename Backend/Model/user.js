import mongoose from "mongoose";

const channelschema = {
    avatarimg:String,
    name: String,
    contentType: String,
    description:String
    
    
}

const Usershema = new mongoose.Schema({
    Email: {
        type:String,
        unique:true,
        required:true,
    },
    Name: {
        type: String,
        required:true
    },
    Password: {
        type: String,
        required:true 
    },
    Profileimage: String,
    Channels:[channelschema]
})

const User = mongoose.model('users', Usershema);

export default User;