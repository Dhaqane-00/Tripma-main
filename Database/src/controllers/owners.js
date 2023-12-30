const prisma = require("../providers/ConnectDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const  SECRET_KEY = process.env.SECRET_KEY;

//Owener Sigin Up
exports.SignUp = async(req, res) => {
    const { email, password } = req.body;
    try{

        const existingOwner = await prisma.owners.findUnique({
            where:{
                email:email
            }
            
        })
        if(existingOwner){
            return res.status(400).json({message:"owner already exists!"})
        }

        const encrptedPassword = await bcrypt.hash(password,10);

        const newOwner = await prisma.owners.create({
            data:{
                email:email,
                password:encrptedPassword
            }
        })
        return res.status(200).json({
            success:true,
            message:"owner created successfully",
            data:newOwner
        })



    }catch(e){
        return res.status(400).json({message:e.message})
    }
}

//Owener Sigin in/Login
exports.SignIn = async(req, res) => {
    const { email, password } = req.body;
    try{
        const existingOwner = await prisma.owners.findUnique({
            where: { 
                email: email
            }
        });
        if(!existingOwner){
            return res.status(400).json({message:"owner Not Found!"})
        }

        const decrptpassword = await bcrypt.compare(password,existingOwner.password);

        if(!decrptpassword){
            return res.status(400).json({message:"owner Not Found!"})
        }

        const token = jwt.sign(
            {
                id:existingOwner.id,
                email:existingOwner.email
            },
            SECRET_KEY,
            {expiresIn:"40m"}
        )

        return res.json({
            success:true,
            message:"owner logged in successfully",
            data:existingOwner,
            token
        })
        


    }catch(e){
        return res.status(400).json({message:e.message})
    }
}