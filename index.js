import express from 'express';
//const express = require('express');
import morgan from 'morgan';
//const morgan = require('morgan');
import cors from 'cors';
//const cors = require('cors');
import path from 'path';
import mongoose from 'mongoose';
import router from "./routes";

// Conexion a mongoDB
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbsistema';
mongoose.connect(dbUrl, {useCreateIndex: true, useNewUrlParser: true})
    .then(mongoose => console.log('conectando a la base de datos'))
    .catch(err => console.log(err));

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', router);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(' server listen http://localhost:' + app.get('port'));
});
