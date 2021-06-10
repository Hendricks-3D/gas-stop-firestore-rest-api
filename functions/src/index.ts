import * as functions from "firebase-functions";
import * as express from 'express';
import  {addUser, deleteUser, getAllUsers, updateUser } from './Controllers/userController';
import {validateFirebaseIdToken} from './Authentication/authMiddleware';

const app = express();
//This will apply the middleware to all request
// (instead of doing this: app.post('/addUser',validateFirebaseIdToken,addUser);)
app.use(validateFirebaseIdToken);


//Routes
app.post('/addUser',addUser);

app.get('/allUsers',getAllUsers);

app.patch('/updateUser/:userId',updateUser);

app.delete('/deleteUser/:userId',deleteUser);

exports.app = functions.https.onRequest(app);