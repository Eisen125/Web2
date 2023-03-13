import express from 'express'
import routerProducts from './routers/products.js'
import routerUsers from './routers/users.js'
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = new Server(server,{ cors: { origin: '*' } });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const port = process.env.PORT || 5050;
mongoose.set('strictQuery', false)

///routers
app.use('/products',routerProducts);
app.use('/users',routerUsers);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const getWeatherData = async () => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Yavne&appid=f4d39e1dce87645a615f46573e45bf34&lang=en&units=metric`);
    const data = response.data;
    console.log(response.status);
    console.log(data,"this is data");
    const weatherData = {
      temperature: response.data.main.temp,
      description: data.weather[0].description,
    };
    return weatherData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

setInterval(async () => {
  const weatherData = await getWeatherData();
  if (weatherData) {
    io.emit('weatherData', weatherData);
  }
}, 10000);

server.listen(port, () => {
  mongoose.connect(process.env.REACT_APP_MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

  console.log(`Example app listening on port ${port}`)
})



