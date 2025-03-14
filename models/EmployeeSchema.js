
const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema ({
    Name :{
        FirstName:{
            type:String,
            unique:false,
            required:[true,'First Name should be mandory']
        },
        LastName:{
            type:String,
            unique:false,
            required:[true,'Last Name should be mandory']
        }
    },
    EmailID: {
        type: String,
        unique : true,
        required:[true, 'EmailID should be mandory']
    },
    Password: {
        type: String,
        unique : false,
        required:[true, 'Password should be mandory']
    },
    Department: {
        type: String,
        unique : false,
        required:[false, 'Department should be mandory']
    },
    Designation: {
        type: String,
        unique : false,
        required:[false, 'Designation should be mandory']
    },
    Location: {
        type: String,
        unique : false,
        required:[false, 'Location should be mandory']
    },

}

);


module.exports = mongoose.model('EmployeeData',EmployeeSchema)
