const CamereModel = require('../models/CamereSchema');
module.exports = {
    CameraPost: async (req,res) =>{
        try{
            const { CameraName,CameraID,CustomizeName,CustomizeID,IPAddress,PortAddress,UserName,Password,
                Description,RTSP,RTMP} = req.body;
                const CameraData = new CamereModel({
                    CameraName : CameraName,
                    CameraID : CameraID ,
                    CustomizeCamera :{
                        CustomizeName:CustomizeName,
                        CustomizeID:CustomizeID,
                    },
                    IPAddress: IPAddress,
                    PortAddress :PortAddress,
                    UserName : UserName,
                    Password : Password,
                    Description : Description,
                    RTSPandRTMP:{
                        RTSP : RTSP,
                        RTMP :RTMP ,
                    },
                })
                await CameraData.save();
                return res.status(200).json({message:'Succesfully Registered'})
        } catch(error){
            return res.status(500).json({message:'Internal Server Error'})
        }

    },
    CamereGet: async (req,res) =>{
       try{
        const data =  await CamereModel.find();
           return res.status(200).json({message:'Succesfully Got',data})
       }catch(err){
        return res.status(500).json({err:'Internal Server Error'})
       }
    },
    CamereUpdate: async (req,res)=>{
        try{
            const {id} = req.params;
            const data = req.body;
            const UpdateData = await CamereModel.findByIdAndUpfdate(id,data,{new:true});
            return res.status(200).json({message:'Succesfully Updated',UpdateData})
        }catch(err){
            return res.status(500).json({err:'Internal Server Error'})
        }
    },
    CamereDelete: async(req,res)=>{
        try{
            await CamereModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({message:'Succesfully Deleted'})
        }catch(error){
            return res.status(500).json({err:'Internal Server Error'})
        }
    }
}