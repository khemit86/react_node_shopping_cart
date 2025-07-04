import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Database connected'))
.catch((err)=>console.log(err));