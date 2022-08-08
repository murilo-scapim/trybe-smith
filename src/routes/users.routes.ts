import { Router } from 'express';
import UsersController from '../controller/users.controller';

const router = Router();

const usersController = new UsersController();

router.post('/users', usersController.create);
router.post('/login', usersController.login);

export default router;