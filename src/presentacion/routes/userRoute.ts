import express, { Router } from 'express'
import { UserController } from '../controllers/usersController';
import { UserService } from '../../negocio/services/usersService';
import { UserRepository } from '../../persistencia/repositorios/UserRepository';

export const userRoutes: Router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

//Endpoints del recurso users
userRoutes.get("/", userController.getAll.bind(userController));
userRoutes.get("/:id", userController.getId.bind(userController));
userRoutes.post("/", userController.createNewUser.bind(userController));
userRoutes.put("/:id",userController.updateUser.bind(userController));
userRoutes.patch("/:id",userController.updateUserPartial.bind(userController));
userRoutes.delete("/:id",userController.deleteUser.bind(userController));