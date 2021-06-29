const Post = require("../model/post.js");

exports.createPost = (req, res)=> {
    
    const {caption,location} = req.body;

    if(!caption){
        res.status(422).json( { message: "Caption is Necessary"})
    }
    console.log(req.file);
    if(!req.file){
        res.status(422).json( { message: "Post is Necessary"})
    }
    const post = new Post({
        caption,
        location,
        postedBy: req.user,
        image: req.file.path
    })

    post.save().then(savedPost => {
        res.status(200).json({ post: savedPost } );
    }).catch(err => {
        console.log(err);
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
              console.log(err);
            });
          }
        res.status(500).json({ message: "Something went wrong"})
    })
}

exports.getPost = (req, res) => {
    Post.find()
    .populate("postedBy")
    .then( gotpost => {
        res.status(200).json({ post: gotpost})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong"})
    })
}

exports.editPost = (req, res) => 
{
    Post.findByIdAndUpdate(req.body.id,
        {
            location: req.body.location, 
            caption: req.body.caption
        }, 
         { new: true}
        ).then(savedPost => {
            res.status(200).json({ post: savedPost } );
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: "Something went wrong"})
        })
}

exports.deletePost = (req , res) =>
{
    console.log(req.body.id)
    Post.findByIdAndDelete(req.body.id)
    .then(deletedUser => {
        res.status(200).json({ user: deletedUser } );
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong"})
    })
}

exports.getPostById = (req, res) => {

    Post.findById(req.params.id)
    .then(postbyid => {
        res.status(200).json({ post: postbyid } );
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong"})
    })    


}

exports.getPostByUser = (req , res) => {

    Post.find( { postedBy: req.user._id } )
    .then( postedUser => {
        res.status(200).json({post: postedUser})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong"})
    })    

}