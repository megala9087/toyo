const mongoose1 = require('mongoose');

const CameraSchema = new mongoose1.Schema({
    CameraName:{
        type:String,
        unique: true,
        required:[true,'CameraName should be manadory']
    },
    CameraID:{
        type:String,
        unique: true,
        required:[true,'CameraID should be manadory']
    },
    CustomizeCamera:{
        CustomizeName:{
            type:String,
            unique: false,
            required:[true,'CustomizeName should be manadory'] 
        },
        CustomizeID:{
            type:String,
            unique: false,
            required:[true,'CustomizeID should be manadory'] 
        },  

    },
    IPAddress:{
        type:String,
        unique: true,
        required:[true,'IPAddress should be manadory'] 
    },
    PortAddress:{
        type:String,
        unique: true,
        required:[true,'PortAddress should be manadory'] 
    },
    UserName:{
        type:String,
        unique: true,
        required:[true,'UserName should be manadory'] 
    },
    Password:{
        type:String,
        unique: true,
        required:[true,'Password should be manadory'] 
    },
    Description:{
        type:String,
        unique: false,
        required:[true,'Description should be manadory'] 
    },
    RTSPandRTMP:{
        RTSP:{
            type:String,
            unique: false,
            required:[false,'RTSP should be manadory'] 
        },
        RTMP:{
            type:String,
            unique: false,
            required:[false,'RTMP should be manadory'] 
        }, 
    },
});


module.exports = mongoose1.model('CameraData',CameraSchema)