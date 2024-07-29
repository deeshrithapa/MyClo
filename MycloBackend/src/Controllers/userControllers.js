const User = require('../Models/authUserModel')
const createUser= async(req, res)=>{
    // const data= req.body;
    // const name=data.name;
    // const age= data.age;
    // const role= data.role;

    const {name, age, role} = req.body;  //destructuring 

    const addUser = new User({
        name:name,
        age:age,
        role:role
    });

    try{
        const response= await addUser.save();
       if(response){
        res.status(201).json({message:"user created sucessfully", response});
       }
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error", err});
    }   

};

module.exports = createUser;