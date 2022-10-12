import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import user_routes from './handlers/user';
import product_routes from './handlers/product';
import order_routes from './handlers/order_controllers';

const app: Application = express();

let port = 3000;

if (process.env.ENV === 'test') {
  port = 3001;
}

const server = `127.0.0.1:${port}`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('<h1>Working Successfully</h1>')
});
user_routes(app);
product_routes(app);
order_routes(app);

app.listen(port, () => {
  console.info(`Server is listening at http://${server}`);
});

export default app;
