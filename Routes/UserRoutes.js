import express from 'express';
import * as userController from "../Controllers/UserControllers.js";
import securePath from "../middlewares/SecurePath.js";

"../Controllers/UserControllers.js";

const router = express.Router();

router.get('/users', securePath,userController.listUsers);
router.get('/users/create', userController.showCreateUserForm);
router.post('/users/create', userController.createUser);
router.get('/users/edit/:id',securePath, userController.showEditUserForm);
router.post('/users/edit/:id',securePath, userController.editUser);
router.post('/users/delete/:id',securePath, userController.deleteUser);

export default router;