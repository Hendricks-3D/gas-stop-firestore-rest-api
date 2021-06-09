import * as functions from "firebase-functions";
import * as express from 'express';
import  {addUser, deleteUser, getAllUsers, updateUser } from './userController';

const app = express();

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to firebase');
});

//Routes
app.post('/addUser',addUser);

app.get('/allUsers',getAllUsers);

app.patch('/updateUser/:userId',updateUser);

app.delete('/deleteUser/:userId',deleteUser);

exports.app = functions.https.onRequest(app);