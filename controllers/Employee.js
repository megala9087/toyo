const EmployeeModel = require('../models/EmployeeSchema')
const bycript =  require('bcryptjs')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports = {
    
    Login: async (req, res) => {
        console.log("data",req.body);
        try {
          const { EmailID, Password } = req.body;
    
          // Check if the user exists
          const ExistingEmail = await EmployeeModel.findOne({ EmailID });
          if (!ExistingEmail) {
            console.log('not');
            return res.status(400).json({ message: 'User Not Found' });
          }
          console.log('1');
    
          // Compare provided password with the hashed password in DB
          const ComparePassword = await  bycript.compare(Password, ExistingEmail.Password);
          console.log('Password compared:', ComparePassword);
    
          if (ComparePassword) {
            // Generate JWT token
            const token = jwt.sign(
              { email: ExistingEmail.EmailID },
              'credo_secret', // Change this to process.env.JWT_SECRET in production
              { expiresIn: '1h' }
            );
    
            // console.log('Generated Token:', token);
    
            // Send the token in the response
            return res
              .status(200)
              .header('Authorization', 'Bearer ' + token)
              .json({ message: 'Successfully logged in', token });
          } else {
            // console.log('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
          }
        } catch (err) {
          // console.error('Error occurred:', err);
          return res.status(400).json({ err });
        }
      },
    
    EmployeeRegistration: async (req, res) => {
        // console.log(req.body);
        try {
            const { Name, EmailID, Password } = req.body;

            // Ensure Name has FirstName and LastName
            if (!Name || !Name.FirstName || !Name.LastName) {
                return res.status(400).json({ message: 'First Name and Last Name are required' });
            }
            const salt = await bycript.genSalt(10);
            const hashedPassword = await bycript.hash(Password, salt);

            const EmployeeData = new EmployeeModel({
                Name: {
                    FirstName: Name.FirstName,
                    LastName: Name.LastName
                },
                EmailID: EmailID,
                Password: hashedPassword
            });

            // console.log('EmployeeData:', EmployeeData);

            await EmployeeData.save();

            return res.status(200).json({ message: 'Successfully Registered' });
        } catch (error) {
            // console.error('Error registering employee:', error);
            return res.status(400).json({ error });
        }
    },

    // EmployeeRegistration:async (req,res) => {
    //     console.log(req.body)
    //     try{
    //        const {EmployeeID,Name,FirstName,LastName,Department,EmailID,Password,Designation,Location} = req.body;
    //     //    const ExistingUser = await EmployeeModel.findOne({EmployeeID})
    //     //    if(ExistingUser){
    //     //     return res.status(400).json({message:'User alredy Registerd'})
    //     //    }


    //     //    const salt = await bycript.gensalt(10);
    //     //    const HashedPassword = await bycript.hash(Password,salt);

    //           const EmployeeData = new EmployeeModel({
    //             // EmployeeID : EmployeeID,
    //             Name: {
    //                 FirstName:Name. FirstName,
    //                 LastName: Name.LastName
    //             },
    //             EmailID : EmailID,
    //             Password:Password,
    //             // Password:HashedPassword,
    //             // Department :Department,
    //             // Designation :Designation,
    //             // Location :Location,
    //           })
    //           console.log('EmployeeData',EmployeeData)
    //           await EmployeeData.save();
    //           return res.status(200).json({message:'Succesfully Registerd'})

    //     }catch(error){
    //         return res.status(400).json({error})
    //     }
    // },

      
      
    // Login: async (req, res) => {
    //     try {
    //       console.log(req.body);
          
    //       const { EmailID, Password } = req.body;
          
    //       // Check if the user exists
    //       const ExistingEmail = await EmployeeModel.findOne({ EmailID });
    //       if (!ExistingEmail) {
    //         return res.status(400).json({ message: 'User Not Found' });
    //       }
      
    //       // Compare provided password with stored password
    //       const ComparePassword = await bycript.compare(Password, ExistingEmail.Password); // Correct order: plain password first, hashed password second
      
    //       if (ComparePassword) {
    //         // Generate JWT token if password matches
    //         const token = await  jwt.sign({ email: ExistingEmail.EmailID }, 'credo_secret', { expiresIn: '1h' });
    //         console.log('Generated Token:', token);
      
    //         return res
    //           .status(200)
    //           .header('Authorization', 'Bearer ' + token) // Optionally set the token in headers
    //           .json({ message: 'Successfully logged in', token });
    //       } else {
    //         return res.status(400).json({ message: 'Invalid credentials' });
    //       }
    //     } catch (err) {
    //       return res.status(400).json({ error: err.message });
    //     }
    //   },
      UserDeails:async (req,res)=>{
        try{
            const data = await EmployeeModel.find()
            return res.status(200).json(data)
        }catch(error){
         return res.status(400).json(error)
        }
   },
    EmpyeeDetailsUpdate: async (req,res) =>{
        try{
            const {EmployeeID,FirstName,LastName,Department,EmailID,Password,Designation,Location} = req.body;
            const ExistingUser = await EmployeeModel.findOne({EmployeeID})
            if(!ExistingUser){
                return res.status(400).json({message:'User Not Found'})
            }
            if(Password){
                const Salt = await bycript.gensalt(10);
                const hashedPassword = await bycript.hash(Password,Salt)
                ExistingUser.Password = hashedPassword;
            }
            ExistingUser.Name.FirstName = FirstName;
            ExistingUser.Name.LastName= LastName;
            ExistingUser.Department = Department;
            ExistingUser.EmailID = EmailID;
            ExistingUser.Designation = Designation;
            ExistingUser.Location = Location;

            await ExistingUser.save();
            return res.status(200).json({message:'Updated Succesfully'})

        }catch(error){
            return res.status(400).json({error})
        }
        
    },
    EmployeeDetailsDelete: async (req,res) =>{
     try{
        await EmployeeModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:'Succesfully Deleted'})
     }catch(err){
        return res.status(500).json({err:err})
     }
    },
}


