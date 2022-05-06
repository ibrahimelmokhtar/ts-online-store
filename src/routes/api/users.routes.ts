import { Request, Response, Router } from 'express';
import * as usersController from '../../controllers/users.controller';

// create Express Router:
const usersRoute: Router = Router();

// sample GET method from users route:
usersRoute.get('/', async (_req: Request, res: Response): Promise<void> => {
	res.send('inside << users >> route');
});

// available routes for CRUD operations within /users route:
usersRoute.post('/create', usersController.createController);
usersRoute.get('/show/:id', usersController.showController);
usersRoute.get('/showAll', usersController.showAllController);
usersRoute.put('/update/:id', usersController.updateController);
usersRoute.delete('/delete/:id', usersController.deleteController);

export default usersRoute;