const express = require("express");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51IdwfeH8KzFo5uc9YHKzp2HOPkZJvH0ij0qhWeg0wQ17G73o5fVJYjMkWOfAmWUgjVZe0DesJvrQKbmAPSacXsVP00qMXnEqFr"
);
const {v4: uuidv4} = require("uuid");

// Getting Module
const Products_Model = require("../models/Products");
const MainStore_Model = require("../models/MainStore");
const Cart_Model = require("../models/Cart");
const Contact_Model = require("../models/Contact");
const Company_Model = require("../models/Company");
const Template_Model = require("../models/Templates");
const Snippet_Model = require("../models/Snippet");
const Task_Model = require("../models/Task");
const Sequence_Model = require("../models/Sequences");
const User_Model = require("../models/Users");

//Routes
const contactRoute = require("../routes/contact.route");
const companyRoute = require("../routes/company.route");
const taskRoute = require("../routes/tasks.route");
const templateRoute = require("../routes/template.route");
const snippetRoute = require("../routes/snippet.route");
const userDetailsRouter = require("../routes/userdetails.route");
const sequenceRouter = require("../routes/sequence.route");
const productRouter = require("../routes/product.route");
const tagRouter = require("../routes/tags.route");
const loginRoute = require("../routes/login.route");
const registerRouter = require('../routes/register.route');

//Middlewares
const authMiddleware = require('../auth/authMiddleware');

//LOGIN AND REGISTRATION
router.use("/", loginRoute);
router.use("/", registerRouter);

// Protected Routes
router.use("/", authMiddleware, contactRoute);
router.use("/", authMiddleware, companyRoute);
router.use("/", authMiddleware, taskRoute);
router.use("/", authMiddleware, templateRoute);
router.use("/", authMiddleware, snippetRoute);
router.use("/", authMiddleware, userDetailsRouter);
router.use("/", authMiddleware, sequenceRouter);
router.use("/", authMiddleware, productRouter);
router.use("/", authMiddleware, tagRouter);

//Test Route
router.get("/test", (req, res) => {
  res.send("Working");
});

//UTILS import
const getdet = require("../utils/getDetUtil");
const isNumeric = require("../utils/isNumeric");

getdet();

module.exports = router;
