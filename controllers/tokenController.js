const jwt = require('jsonwebtoken');
const tokenModel = require('../models/userToken');



class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveTokens(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token;
    }
}

module.exports = new TokenService();