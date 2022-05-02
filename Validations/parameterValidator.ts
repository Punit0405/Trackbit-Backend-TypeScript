import mongoose from 'mongoose';
const parameterValidator =(mongoid:string)=>{
    if(mongoose.Types.ObjectId.isValid(mongoid)){
        return true;
    }else{
        return false;
    }
}

export default parameterValidator;