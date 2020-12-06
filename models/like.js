const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    //like belongs to user(must be mentioned)
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    //this defines the objectId of the liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath: 'onModel'
    },
    //this field is used for defining the type of the liked object since this is a dynamic reference
    onModel:{
        type:String,
        required:true,
        //Just to define that only two types of parents are there for likes
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;