import express from 'express';
import 'express-async-errors';

import ProductsRoutes from './routes/products.routes';
import UsersRoutes from './routes/users.routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use(ProductsRoutes);
app.use(UsersRoutes);

/* o middleware de erro deve ficar após a declaração
 de outros middlewares */
app.use(errorMiddleware);

export default app;