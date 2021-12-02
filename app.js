require('dotenv').config();
const fileUpload = require('express-fileupload');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/admin/index');
const authRoutes = require('./routes/admin/auth');
const userRoutes = require('./routes/admin/users');
const cmsRoutes = require('./routes/admin/cms');
const productRoutes = require('./routes/admin/product');
const categoryRoutes = require('./routes/admin/category');
const subCategoryRoutes = require('./routes/admin/subCategory');


const db = require('./config/db');
const { sendResponse } = require('./helpers');
const AppError = require('./helpers/appError');
const { errorHandler } = require('./helpers/errors');


const app = express();

app.use(cors());
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', cmsRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subCategoryRoutes);


app.all('*',(req,res,next) =>{ 
    next(new AppError(`Can not find ${req.originalUrl} on this Server`,404))
})

app.use(errorHandler);


module.exports = app;
