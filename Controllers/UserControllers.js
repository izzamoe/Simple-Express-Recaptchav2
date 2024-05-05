import {PrismaClient} from "@prisma/client";
// import { Recaptcha } from 'express-recaptcha';
import bcrypt from 'bcrypt';
import pkg from 'express-recaptcha';
const { RecaptchaV2 } = pkg;
const recaptcha = new RecaptchaV2('6LfVONEpAAAAAIv4Ai5UWkHKjhD2SkweguNwGJm5', '6LfVONEpAAAAACkZxeqjf33p76Lbm9ye763LLdN9');

const prisma = new PrismaClient();

export async function listUsers(req, res) {
    const users = await prisma.user.findMany();
    res.render('users', { users });
}

export function showCreateUserForm(req, res) {
    res.render('createUser');
}

export async function createUser(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            createTime: new Date(),
        },
    });
    res.redirect('/users');
}

export async function showEditUserForm(req, res) {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    res.render('editUser', { user });
}

export async function editUser(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
        where: { id: req.params.id },
        data: {
            username,
            password: hashedPassword,
        },
    });
    res.redirect('/users');
}

export async function deleteUser(req, res) {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.redirect('/users');
}

export function showLoginForm(req, res) {
    res.render('login', { message: '', captcha: recaptcha.render() });
}

export async function login(req, res) {
    recaptcha.verify(req, async function (error) {
        if (!error) {
            const {username, password} = req.body;
            const user = await prisma.user.findUnique({where: {username}});
            if (user && await bcrypt.compare(password, user.password)) {
                req.session.user = user;
                res.redirect('/users');
            } else {
                res.render('login', {
                    message: 'Login failed. Please check your username and password.',
                    captcha: recaptcha.render()
                });
            }
        } else {
            res.render('login', {message: 'Captcha validation failed. Please try again.', captcha: recaptcha.render()});
        }
    });
}

export function logout(req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
}