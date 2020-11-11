import { PORT } from './constants';
import App from './config/appServer';
import { Home, Products, Categories, Auth, Users } from './controllers';

const app = new App(
  [new Home(), new Products(), new Categories(), new Auth(), new Users()],
  PORT
);

if (!process.env.JWT_KEY) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.listen();
