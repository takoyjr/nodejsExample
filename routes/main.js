const Router = require("express").Router;
const main = require("../models/user");
const userController = require('../controllers/userController');
const { body } = require('express-validator');



const router = new Router();


router.get("/", async (req, res) => {
  // const main = await main.find({})
  res.render("index", {
    title: "Main",
    // isIndex: true
  });
});


// authorization
router.post('/authorization', async (req, res) => {
    userController.authorization(req, (res));
    res.redirect("/");
});

router.get("/authorization", (req, res) => {
  res.render("authorization", {
    title: "authorization",
    // isReview: true
  });
});

// registration
router.post('/registration',
    [
        body('login', "Введите Логин").notEmpty().isLength({ min: 3, max: 15 }),
        body('password', "Введите Пароль").notEmpty().isLength({ min: 3, max: 15 }),
    ],
    userController.registration);

// router.post('/registration', (req, res) => {
//     userController.registration(req, res);
//     res.redirect("/");
// });

router.get("/registration", (req, res) => {
  res.render("registration", {
    title: "registration",
    // isReview: true
  });
});

module.exports = router;


// router.post('/registration', (req, res) => {
//     body('login', "Введите Логин").isEmpty().isLength({min: 3, max: 15});
//     body('password', "Введите Пароль").isEmpty().isLength({min: 3, max:15});
//         res.redirect("/");
// });