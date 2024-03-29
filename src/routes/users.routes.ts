import { Router } from 'express';
import userController from '@/controllers/user.controller';
import { isSuperAdmin } from '@/middleware/isSuperAdmin';
import { isAuthenticated } from '@/middleware';

const router = Router();

//CREATE USER

router.post('/', isAuthenticated, userController.createUser);

//Read all users
router.get('/', isAuthenticated, userController.getAllUsers);

// Delete one user
router.delete('/:id', isSuperAdmin, userController.deleteUser);

//Login
router.post('/login', userController.login);

//Logout
router.post('/logout', isAuthenticated, userController.logout);

//Password reset request
//! TODO requiere middleware para verificar si el correo ingresado existe en la base de datos
router.post('/forgot', userController.forgotPass);

//Change Password
router.put('/recover', userController.changePass);

router.put('/update-password', isAuthenticated, userController.updatePassword);
router.put('/profile', isAuthenticated, userController.updateProfile);

export default router;
