module.exports = class apiErorr extends Error {
    status;
    errors;

    constructor(status, message, errors=[]) {
        super(message);
        this.message = message;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new apiErorr(401, "Пользователь не авторизован")
    }

    static BadRequest(message, errors=[]) {
        return new apiErorr(400, message, errors);
    }

}