require('dotenv').config({ path: './db.env' });
const mongoose=require('mongoose');

 module.exports=async function connectDB(){
const MONGO_URI=process.env.MONGO_URI;
if(!MONGO_URI) {
   console.log("Mongo URL not defined in env file");
   process.exit(1);
}
try{

   await mongoose.connect(MONGO_URI);
   console.log("Connected Successfully");

}
catch(err)
{
    console.log("Error Occured",err )
    process.exit(1);

}

};


