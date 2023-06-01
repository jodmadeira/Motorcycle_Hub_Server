const router = require('express').Router();
const mongoose = require('mongoose');

//Require the UserMotorcycles Model to interact woth the database
const UserMotorcycles = require('../models/UserMotorcycle.model');

//Get all the motorcycles available