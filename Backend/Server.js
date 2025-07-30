import app from './index.js';

import mongoose from 'mongoose';

import {MONGODB_URL,PORT,JWTkey} from './utils/config.js'

mongoose.connect(MONGODB_URL)
    .then(() => {
    console.log('DataBase connected Sucessfully..')
    })
    .catch((e) => {
    console.log(e)
    })


app.listen(PORT, () => {
    console.log(`Server Listening to the Port ${PORT}`)
})

