import * as functions from "firebase-functions";
import * as express from 'express';

const app = express();

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to firebase');
});

exports.app = functions.https.onRequest(app);