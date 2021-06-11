import {Response} from 'express';
import {db} from '../config/firebase';
import {GasStation,Request} from '../models/gasStation';

const addGasStation = async(req:Request,res:Response)=>{
    //assign the req from the user to the GasStation Object;
    const {name,password,email,telephone,regular,premium,
        diesel,ULSD,openTime,closeTime, address,latitude,
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
                diesel,
                ULSD,
                openTime,
                closeTime,
                address,
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

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const getAllGasStations = async(req:Request,res:Response)=>{
    try{
        const allGasStations:GasStation[]=[];
        const querySnapshot = await db.collection('gasStations').get();
        querySnapshot.forEach((doc:any)=>allGasStations.push(doc.data()));

        return res.status(200).json(allGasStations);
    }catch(err){
        return res.status(500).send({
            status:"success",
            message:err.message
        });
    }
}//End of get all stations method

const getGasStationByAddress = async(req:Request,res:Response)=>{
    try{
        const allGasStations:GasStation[]=[];
        const querySnapshot = await db.collection('gasStations')
        .where('address','==',req.params.address).get();
        querySnapshot.forEach((doc:any)=>allGasStations.push(doc.data()));

        return res.status(200).json(allGasStations);//return list of 
    }catch(err){
        return res.status(500).send({
            status:"success",
            message:err.message
        })
    }
}
/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const getLowestRegularPrice= async(req:Request,res:Response)=>{
    try{
        const allGasStations:GasStation[]=[];
        var lowestGasStation = new GasStation();
        const querySnapshot = await db.collection('gasStations').get();
        querySnapshot.forEach((doc:any)=>{allGasStations.push(doc.data())});//get all the gas stations

        lowestGasStation =allGasStations[0];
        //search through gas stations list for the lowest Regular Price
        for(var index = 0;index<allGasStations.length;index++)
        {
            if(lowestGasStation.regular>allGasStations[index].regular){
                lowestGasStation= allGasStations[index];
            }
        }
        return res.status(200).json(lowestGasStation);
    }catch(err){
        return res.status(500).send({
            status:"failed",
            message:err.message
        });
    }

}//End of getLowestRegularPrice


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
//Get lowest premium price
const getLowestPremiumPrice= async(req:Request,res:Response)=>{
    try{
        const allGasStations:GasStation[]=[];
        var lowestGasStation = new GasStation();
        const querySnapshot = await db.collection('gasStations').get();
        querySnapshot.forEach((doc:any)=>{allGasStations.push(doc.data())});//get all the gas stations

        lowestGasStation =allGasStations[0];
        //search through gas stations list for the lowest Regular Price
        for(var index = 0;index<allGasStations.length;index++)
        {
            if(lowestGasStation.premium>allGasStations[index].premium){
                lowestGasStation= allGasStations[index];
            }
        }
        return res.status(200).json(lowestGasStation);
    }catch(err){
        return res.status(500).send({
            status:"failed",
            message:err.message
        });
    }

}//End of getLowestPremiumPrice

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const getLowestDieselPrice= async(req:Request,res:Response)=>{
    try{
        const allGasStations:GasStation[]=[];
        var lowestGasStation = new GasStation();
        const querySnapshot = await db.collection('gasStations').get();
        querySnapshot.forEach((doc:any)=>{allGasStations.push(doc.data())});//get all the gas stations

        lowestGasStation =allGasStations[0];
        //search through gas stations list for the lowest Regular Price
        for(var index = 0;index<allGasStations.length;index++)
        {
            if(lowestGasStation.diesel>allGasStations[index].diesel){
                lowestGasStation= allGasStations[index];
            }
        }
        return res.status(200).json(lowestGasStation);
    }catch(err){
        return res.status(500).send({
            status:"failed",
            message:err.message
        });
    }

}//End of getLowestDieselPrice

const getLowestULSDPrice= async(req:Request,res:Response)=>{
    try{
        const allGasStations:GasStation[]=[];
        var lowestGasStation = new GasStation();
        const querySnapshot = await db.collection('gasStations').get();
        querySnapshot.forEach((doc:any)=>{allGasStations.push(doc.data())});//get all the gas stations

        lowestGasStation =allGasStations[0];
        //search through gas stations list for the lowest Regular Price
        for(var index = 0;index<allGasStations.length;index++)
        {
            if(lowestGasStation.ULSD>allGasStations[index].ULSD){
                lowestGasStation= allGasStations[index];
            }
        }
        return res.status(200).json(lowestGasStation);
    }catch(err){
        return res.status(500).send({
            status:"failed",
            message:err.message
        });
    }

}//End of getLowestDieselPrice

export {addGasStation,getAllGasStations, getLowestRegularPrice,getLowestDieselPrice,getLowestPremiumPrice,getGasStationByAddress,getLowestULSDPrice}