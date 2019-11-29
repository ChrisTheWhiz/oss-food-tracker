import {Router} from 'express';
import {loginHandler, registrationHandler} from '../controllers/user';


const router = Router();
// Handle Registration
router.post('/register', registrationHandler);
// Handle login
router.post('/login', loginHandler);


export {router as UserRoutes};

