import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/usersModel.js';
import { generateJwtToken, isAdmin, isAuthenticate } from '../util.js';
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp, query, where, getDoc, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateCurrentUser, updateEmail, updatePassword, updateProfile } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBg5pRJHFogWVllnpnHVk-yAzF3m-v4e7s",
    authDomain: "my-shows-68146.firebaseapp.com",
    projectId: "my-shows-68146",
    storageBucket: "my-shows-68146.appspot.com",
    messagingSenderId: "269005243128",
    appId: "1:269005243128:web:7edfb47194aff2fbec310d",
    measurementId: "G-70EYZBW63L"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const userRouter = express.Router();

userRouter.get(
  '/',
  isAuthenticate,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  '/:id',
  isAuthenticate,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuthenticate,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.delete(
  '/:id',
  isAuthenticate,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      await user.remove();
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    try {
      const userAuth = await signInWithEmailAndPassword(auth,req.body.email,req.body.password)
      console.log(userAuth.user);
    } catch (error) {
      console.log(error);
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateJwtToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    try {
      const userAuth = await createUserWithEmailAndPassword(auth,req.body.email,req.body.password)
      console.log(userAuth.user);
    } catch (error) {
      console.log(error);
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateJwtToken(user),
    });
    return;
  })
);

userRouter.post(
  '/profile',
  isAuthenticate,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
        await updatePassword(auth.currentUser,req.body.password)
      }
      await updateEmail(auth.currentUser,req.body.email || user.email)
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateJwtToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
    } catch (error) {
      console.log(error);
    }
    
  })
);

userRouter.post(
  "/so",
  async (req, res) => {
    try {
      const auth = getAuth()
      signOut(auth).then(()=>{
        res.send("logged out successfully")
      })
      
    } catch (error) {
      console.log(error);
    }
  }
)

export default userRouter;