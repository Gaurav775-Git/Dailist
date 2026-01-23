const mongoose=require('mongoose')
 
const taskschema=new mongoose.Schema({
    task_description:{type:String,required:true},
    task_completed:{type:Boolean,required:true}
})

const dailyschema= new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users_account",
        required:true,
        unique:true
    },
    date:{type:String,required:true},
    task:[taskschema],
    completedtasks:{type:Number,required:true},
},{timestamps: true})

export default mongoose.model("dailytask", dailyschema)