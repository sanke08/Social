import mongoose from "mongoose";

let connect=false;


export const connectDB=async()=>{
    if(connect){
        return console.log("Already Connected")
    }
    try {
       await mongoose.connect(process.env.MONGOD_URI,{
            dbName:"thread-clone"
        })
        // mongoose.connect("mongodb://127.0.0.1:27017",{
        //     dbName:"Thread-clone"
        // })
        console.log("Connected")
        connect=true
    } catch (error) {
        console.log("Error connecting" ,error)
    }
}