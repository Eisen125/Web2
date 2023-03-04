import express from 'express'
import routerProducts from './routers/products.js'
import routerUsers from './routers/users.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import { initializeApp } from "firebase/app";
import {firebase} from "firebase"
import { getAnalytics } from "firebase/analytics";

app.use('/products',routerProducts);
app.use('/users',routerUsers);

app.listen(port, () => {
  mongoose.connect("mongodb+srv://main:pass123123@cluster0.yuzftpm.mongodb.net/test")
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

  console.log(`Example app listening on port ${port}`)
})