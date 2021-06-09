import {Response} from 'express';
import {db} from './config/firebase';

type User = {
    name:string,
    password:string,
    carType:string
}

type Request = {
    body:User,
    params: {userId: string}
}
/**
 * 
 * @param req 
 * @param res 
 * @description this method will add a user to the firestore db
 */
const addUser = async (req: Request,res:Response)=>{

    const{name,password,carType} = req.body;
    try{
        const entry = db.collection('users').doc();//Create a user collection in firestore

        //creating user to send to firestore
        const userObject = {
            id:entry.id,//get the id from the newly created collection
            name,
            password,
            carType,
        }

        entry.set(userObject);//Updating the document with the new user Object
        res.status(200).send({
            status:'success',
            message:'User added successfully',
            data:userObject
        })
    }catch(err){
        res.status(500).send({
            status:'Failed',
            message:err.message
        })
    }
}//End of addUser method


/**
 * 
 * @param req 
 * @param res 
 * @returns json object
 * @description This methopd will get a list of user and return it as json object
 */
const getAllUsers = async (req: Request,res:Response)=>{
    try{
        const allUsers: User[]=[];
        const querySnapshot = await db.collection('users').get();
        querySnapshot.forEach((doc:any)=>allUsers.push(doc.data()));

        return res.status(200).json(allUsers);
    }catch(err){
         return res.status(500).send({
            status:'Failed',
            message:err.message
        });
        
    }
}//End of get all Users

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * @description This method will get current user data
 * and update it then return the new data.
 */
const updateUser = async (req:Request, res:Response)=>{
    const{body: {name,password,carType},params:{userId}} = req;
    try{
        const user = db.collection('users').doc(userId);//get the current user dat from the firebase collection
        const currentUser =  (await user.get()).data() || {};//assign just the data to the currentUser Object

        //create updated userObject
        const userObject = {
           name:name || currentUser.name,
           password:password ||currentUser.password,
           carType:carType || currentUser.carType
        }
        await user.set(userObject);//Update user data
        return res.status(200).send({
            status:'success',
            message:'User data updated successfully',
            data:userObject
        })
    }catch(err){
        return res.status(500).send({
            status:'Failed',
            message:err.message
        });

    }
}//End of updateUser method

/**
 * 
 * @param req 
 * @param res 
 * @description method that will delete a user
 */
const deleteUser = async (req:Request,res:Response)=>{
        const {userId} = req.params;

        try{
            const user = db.collection('users').doc(userId);
            await user.delete();
            return res.status(200).send({
                status:'success',
                message:'user was deleted successfully',
               
            })
        }catch(err){
            return res.status(500).send({
                status:'Failed',
                message:err.message
            });
    
        }
}
export {addUser,getAllUsers,updateUser,deleteUser}