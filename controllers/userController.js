const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const ApiError = require("../exceptions/apiError");
const { validationResult } = require('express-validator');
const tokenController = require('../controllers/tokenController'); 
const UserDto = require('../dtos/userDto');

class UserController {

    // Регистрация пользователя
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // res.render('registration', {title: 'registration', error: "Ошибка валидации"});
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
            }

            const { login, password } = req.body;
            const checkUser = await userModel.findOne({login});

            if(checkUser) {
                // res.render('registration', {title: 'registration', error: "Пользователь уже зарегистрирован"});
                throw ApiError.BadRequest(`Пользователь ${login} уже зарегистрирован`);
            }

            const hashPass = await bcrypt.hash(password, 5);
            const newUser = await userModel.create({login, password: hashPass});
            const userDto = new UserDto(newUser);
            const tokens = tokenController.generateTokens({userDto});
            await tokenController.saveTokens(userDto.id, tokens.refreshToken);
            return {...tokens, user: userDto};
            console.log(`${login} пользователь добавлен`);
        }
        catch(e) {
            console.error(e);
            res.status(500).send('Произошла ошибка при регистрации пользователя');
            return;
        }
    }

    // Авторизация пользователя
    async authorization(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
            }

            const { login, password } = req.body;
            const checkUser = await userModel.findOne({ login });

            if (!checkUser) {
                throw ApiError.BadRequest(`Пользователь не найден`);
            }

            const checkPass = await bcrypt.compare(password, checkUser.password);

            if (!checkPass) {
                throw ApiError.BadRequest(`Неверный пароль`);
            }
        } catch (e) {
            console.error(e);
            res.status(500).send('Произошла ошибка при авторизации пользователя');
            return;
        }
    }

    // Выход пользователя
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await logout(refreshToken);
        } catch (e) {

        }
    }
}
  
  // Экспорт класса (без создания экземпляра)
  module.exports = new UserController();