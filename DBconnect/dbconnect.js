const mongoose=require('mongoose')


const connectdb= async()=>{
   try{
    await mongoose.connect ("mongodb://localhost:27017/hi")
    console.log("Database is connect")
   }catch(error){
    console.log("Database is broken")
    process.exit (1);
   }
}

module.exports= connectdb