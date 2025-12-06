import express, { Request, Response } from 'express';
import config from './config';
import initDB from './config/db';
import { userRouter } from './modules/user/user.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { vehicleRouter } from './modules/vehicle/vehicle.routes';

const app = express()
app.use(express.json());
app.use(express.urlencoded())



app.get('/', (req: Request, res: Response) => {
    res.send('Vehicle Rental Management System Backend is up and running.');
})

initDB();

// create user
app.use('/api/v1/auth', userRouter);

// Authentication
app.use('/api/v1/auth', authRoutes);

// vehicles
app.use('/api/v1', vehicleRouter);

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
