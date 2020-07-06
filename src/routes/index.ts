import { Router } from 'express';
import { uuid } from 'uuidv4';
import appointmentsRouter from './appointments.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter)

export default routes;