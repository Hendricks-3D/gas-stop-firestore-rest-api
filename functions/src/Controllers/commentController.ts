import {Response} from 'express';
import {db} from '../config/firebase';
import {Comment,Request} from '../models/comment';


const addNewComment = async(req:Request,res:Response)=>{
        const{name,timeStamp,text} = req.body;
    try{

        const commentDB = db.collection('comment').doc();//create firebase document and store reference 

        const commentObject = {
            id:commentDB.id,
            name:name,
            timeStamp:timeStamp||new Date().toDateString(),
            text:text,
            gasStationId:req.params.gasStationId
        }
       commentDB.set(commentObject);//add comment object to the database
       res.status(200).send({
           status:'success',
           message:'comment added successfully',
           data:commentObject
       })
    }catch(err){
        res.status(500).send({
            status:'failed',
            message:err.message
        });
    }
};

/**
 * 
 * @param req 
 * @param res 
 * @description Method that will get all the comments for 
 * a gas station by it's ID
 */
const getAllCommentsByStationId = async(req:Request,res:Response)=>{
    try{
        const gasStationComments:Comment[]=[];
        const querySnapshot = await db.collection('comment')
        .where('gasStationId','==',req.params.gasStationId).get();
        querySnapshot.forEach((comment:any )=> gasStationComments.push(comment.data()));

        res.status(200).json(gasStationComments);//return a list of comments for a particular gas station

    }catch(err){
        res.status(500).send({
            status:'failed',
            message:err.message
        })
    }
}

export {addNewComment,getAllCommentsByStationId};