import express from 'express';
import userRoutes from "./Routes/UserRoutes.js";
import session from "express-session";
import checkUserSession from "./middlewares/checkUserSession.js";
import * as userController from "./Controllers/UserControllers.js";
import router from "./Routes/UserRoutes.js";
import securePath from "./middlewares/SecurePath.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
}));

app.get("/",checkUserSession);

app.set('view engine', 'ejs');

router.get('/login', userController.showLoginForm);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
app.use(userRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});