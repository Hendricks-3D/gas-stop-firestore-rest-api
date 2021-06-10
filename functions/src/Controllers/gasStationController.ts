import {Response} from 'express';
import {db} from '../config/firebase';
import {GasStation,Request} from '../models/gasStation';

const addGasStation = async(req:Request,res:Response)=>{
    //assign the req from the user to the GasStation Object;
    const {name,password,email,telephone,regular,premium,
        midGrade,openTime,closeTime, Address,latitude,
        longitude,ratings, reviewsAmount}= req.body;

    try{ 
            //get and create the gasStation collection if there is none
            const station = db.collection('gasStations').doc();

            //Add the data on the request body to this object
            const gasStationObject = {
                id:station.id,
                name,
                password,
                email,
                telephone,
                regular,
                premium,
                midGrade,
                openTime,
                closeTime,
                Address,
                latitude,
                longitude,
                ratings,
                reviewsAmount,
            }
            station.set(gasStationObject);//Send object to the database
            res.status(200).send({
                status:'success',
                message:'Gas station added successfully!',
                data:gasStationObject
            });
    }catch(err){
        res.status(500).send({
            status:'Failed',
            message:err.message
        });
     }
    }//End of add Gas Station

const getAllGasStations = async(req:Request,res:Response)=>{
    try{
        const allgasStations:GasStation[]=[];
        const querySnapshot = await db.collection('gasStations').get();
        querySnapshot.forEach((doc:any)=>allgasStations.push(doc.data()));

        return res.status(200).json(allgasStations);
    }catch(err){
        return res.status(500).send({
            status:"success",
            message:err.message
        })
    }
}//End of get all stations method
export {addGasStation,getAllGasStations}