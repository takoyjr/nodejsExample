require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const mainRoutes = require('./routes/main'); 
const userController = require('./controllers/userController');
const { connectToDb } = require('./database/db');
const errorMiddleware = require('./middlewares/errorMiddleware')

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);


// Регистрация маршрутов
app.use(mainRoutes);

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Server has been started http://localhost:${PORT}`);
        });
    } else {
        console.log(`DB connection error: ${err}`);
    }
});