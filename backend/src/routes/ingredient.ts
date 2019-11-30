import {Router} from 'express';
import {
	fdcGetIngredientLocalAddIngredient,
	fdcIngredientSearch,
	localGetIngredients,
	fdcGetIngredient,
	manuallyAddIngredientToLocal
} from '../controllers/ingredient';


const router = Router();

// Handle Registration
router.get('/fdc/ingredient/find', fdcIngredientSearch);

router.get('/fdc/ingredient/:fdcId', fdcGetIngredient);

router.post('/fdc/addIng/:id', fdcGetIngredientLocalAddIngredient);

router.get('/ingredients', localGetIngredients);

export {router as FdcRoutes};
