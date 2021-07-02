import { Response } from "express";
import { db } from "../config/firebase";
import { Request, User } from "../models/user";

/**
 *
 * @param req
 * @param res
 * @description this method will add a user to the firestore db
 */
const addUser = async (req: Request, res: Response) => {
  const { name, password, email, carType, latitude, longitude } = req.body;
  try {
    if (name && password && email) {
      const user = db.collection("users").doc(); //Create a user collection in firestore

      //creating user to send to firestore
      const userObject = {
        id: req.params.userId, //get the id from the newly created collection
        name,
        password,
        email,
        carType,
        latitude,
        longitude,
      };

      user.set(userObject); //Updating the document with the new user Object
      res.status(200).send({
        status: "success",
        message: "User added successfully",
        data: userObject,
      });
    } else {
      res.status(500).send({
        status: "failed",
        message: "Please enter all fields",
      });
    }
  } catch (err) {
    res.status(500).send({
      status: "failed",
      message: err.message,
    });
  }
}; //End of addUser method

/**
 *
 * @param req
 * @param res
 * @returns json object
 * @description This methopd will get a list of user and return it as json object
 */

//TODO: Add user base on uid user get on regristration
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers: User[] = [];
    const querySnapshot = await db.collection("users").get();
    querySnapshot.forEach((doc: any) => allUsers.push(doc.data()));

    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(500).send({
      status: "failed",
      message: err.message,
    });
  }
}; //End of get all Users

/**
 *
 * @param req
 * @param res
 * @returns
 * @description This method will get current user data
 * and update it then return the new data.
 */
const updateUser = async (req: Request, res: Response) => {
  const {
    body: { name, password, email, carType, latitude, longitude },
    params: { userId },
  } = req; //Creating and Object of type user and assign the request to it
  try {
    const user = db.collection("users").doc(userId); //get the current user dat from the firebase collection
    const currentUser = (await user.get()).data() || {}; //assign just the data to the currentUser Object

    //create updated userObject
    const userObject = {
      name: name || currentUser.name,
      password: password || currentUser.password,
      email: email || currentUser.email,
      carType: carType || currentUser.carType,
      latitude: latitude || currentUser.latitude,
      longitude: longitude || currentUser.longitude,
    };
    await user.set(userObject); //Update user data
    return res.status(200).send({
      status: "success",
      message: "User data updated successfully",
      data: userObject,
    });
  } catch (err) {
    return res.status(500).send({
      status: "failed",
      message: err.message,
    });
  }
}; //End of updateUser method

/**
 *
 * @param req
 * @param res
 * @returns
 * @desc Method that will get current user data
 */
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    let user: any = {};
    const querySnapShot = await db
      .collection("users")
      .where("id", "==", req.params.userId)
      .get();

    querySnapShot.forEach((doc: any) => {
      user = doc.data();
    });
    // const currentUser = (await user.get()).data() ||{};

    if (user == {}) {
      return res.status(500).send({
        status: "failed",
        message: "invalid user id",
      });
    } else {
      return res.status(200).send({
        status: "success",
        message: "retrieved successfully!",
        data: user,
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: "failed",
      message: err.message,
    });
  }
};
/**
 *
 * @param req
 * @param res
 * @description method that will delete a user
 */
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = db.collection("users").doc(userId);
    await user.delete();
    return res.status(200).send({
      status: "success",
      message: "user was deleted successfully",
    });
  } catch (err) {
    return res.status(500).send({
      status: "failed",
      message: err.message,
    });
  }
};

/*
const authenticateUser = async(req:Request,res:Response)=>{
        
}

const signOutUser = async (req:Request,res:Response)=>{

}*/
export { addUser, getAllUsers, updateUser, deleteUser, getCurrentUser };
