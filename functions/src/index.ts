import * as functions from "firebase-functions";
import * as express from 'express';
import  {addUser, deleteUser, getAllUsers, getCurrentUser, updateUser } from './Controllers/userController';
import {validateFirebaseIdToken} from './Authentication/authMiddleware';
import { addGasStation, getAllGasStations, getGasStationByAddress, getLowestMidGradePrice, getLowestPremiumPrice, getLowestRegularPrice } from "./Controllers/gasStationController";

const app = express();
//This will apply the middleware to all request
// (instead of doing this: app.post('/addUser',validateFirebaseIdToken,addUser);)
app.use(validateFirebaseIdToken);


//User Routes Routes
app.post('/addUser',addUser);

app.get('/allUsers',getAllUsers);

app.patch('/updateUser/:userId',updateUser);

app.delete('/deleteUser/:userId',deleteUser);
app.get('/getCurrentUser/:userId',getCurrentUser);

//GAs Stations routes
app.post('/addGasStation',addGasStation);

app.get('/allGasStations',getAllGasStations);

app.get('/getLowestRegularPrice',getLowestRegularPrice);

app.get('/getLowestPremiumPrice',getLowestPremiumPrice);

app.get('/getLowestMidGradePrice',getLowestMidGradePrice);

app.get('/getGasStationByAddress/:address',getGasStationByAddress);


exports.app = functions.https.onRequest(app);