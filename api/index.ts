import express from 'express';
import { authRouter } from '../routes/auth.ts';
import { productsRouter } from '../routes/products.ts';
import { ordersRouter } from '../routes/orders.ts';
import { weatherRouter } from '../routes/weather.ts';
import { notificationsRouter } from '../routes/notifications.ts';

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/notifications', notificationsRouter);
app.get('/api/health', (_req, res) => res.json({status: 'ok', time: new Date().toISOString()}));
export default app;
