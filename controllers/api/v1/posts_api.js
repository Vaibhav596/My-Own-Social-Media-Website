const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){
    try{
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
    }catch(err){
        console.log("Error in fetching posts during API response");
        return res.redirect('back');
    }
}
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            // req.flash('success', 'Post and associated comments deleted!');

            return res.json(200,{
                message:"Post and associated comments are deleted"
            });
        }
        else{
            return res.json(401,{
                message:'You cannot delete this post!'
            });
        }

    }catch(err){
        req.json(500, {
            message:"internal Server Error"
        });
        return res.redirect('back');
    }
    
}