require('dotenv').config();
const sequelize = require('./db');
const express = require('express');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.get('/', (req, res)=>{
    res.status(200).json({message:'WORKING!!!'})
});

const start = async () => {
    try{
        await sequelize.authenticate(); //подключение к бд
        await sequelize.sync();// сверяем состояние бд со схемой данных
        app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
    }catch(e){
        console.log(e);
    }
}
start();
