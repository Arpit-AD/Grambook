const User = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../keys")

exports.start=(req , res)=>{
    console.log("Hello");
    res.json({
       message: "Hello world",
    })
};

exports.userSignup = async (req , res) => {
    const {name,email,password} = req.body;

    if(!name || !email || !password) {
        res.status(422).json({ message: "Fill all the details" })
    }

    let yourName;
    try {
        yourName = await User.findOne( { email: req.body.email })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong"})
    }

    if( yourName )
    {
        res.status(200).json({ message: "This Mail is already registered"})
    }

    bcrypt.hash(password,10)
    .then(hashedPassword => {
        const user = new User({    
            name,
            email,
            password: hashedPassword
        })
    
        user.save().then(savedUser => {
            res.status(200).json({ user: savedUser } );
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: "Something went wrong"})
        })
    
    })

}

exports.editUser = (req , res) => 
{

    User.findByIdAndUpdate(req.body.id,
        {
            name: req.body.name,
            password: req.body.password,
            bio: req.body.bio,
            age: req.body.age
        },
        { new: true }
        )
        .then( editedUser => {
            res.status(200).json({ user: editedUser });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ messsage: "Something went Wrong" })
        }) 
}

// exports.userLogin = (req,res) =>{
    
//     const {email,password} = req.body;
//     if( !email || !password ) {
//         res.status(422).json({ message: "Provide Email and Password"})
//     }

//     User.findOne({email:email})
//     .then(savedUser => {
//         if (!savedUser){
//            res.status(422).json({message: "Invalid email or password"})  
//         }

//         bcrypt.compare(password, savedUser.password)
//         .then( doMatch =>{

//             if (doMatch)
//             {
//                 // res.json({ message: "successfully logged in"})
//                 const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
//                 res.json({user: savedUser, token})
//             }
//             else{
//                 res.status(422).json({message: "Invalid email or Password"}) 
//             }
//         })
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({ messsage: "Invalid email or Password" })
//     }) 
// }


exports.userLogin = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(422).json({ error: "Please add email and password" });
    }
    User.findOne({ email: email }).then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid email or password" });
      }
  
      bycrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (!doMatch) {
            return res.status(422).json({ error: "Invalid email or password" });
          } else {
            const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET);
            const { _id, name, email } = savedUser;
            res.json({
              user: {
                _id,
                name,
                email,
              },
              token,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "Could not sign in" });
        });
    });
  };