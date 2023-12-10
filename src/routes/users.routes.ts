import { Router } from 'express';
import userController from '@/controllers/user.controller';

const router = Router();

//CREATE USER
//! TODO se requiere middleware de autenticacion para este endpoint
router.post('/', userController.createUser);

//Read all users
router.get('/', userController.getAllUsers);

//Password reset request
//! TODO requiere middleware para verificar si el correo ingresado existe en la base de datos
router.post('/forgot', userController.forgotPass);

export default router;
