import app from "./app";
const port= 5000;

app.listen(process.env.PORT,()=>{
    console.log("TrackBit  Server Running on Port 5000");
})