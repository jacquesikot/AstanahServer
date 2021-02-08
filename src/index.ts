import { PORT } from './constants';
import App from './config/appServer';
import {
  Home,
  Products,
  Categories,
  Auth,
  Users,
  Orders,
  Billing,
  PaymentCard,
  Favorites,
  Notifications,
  FlutterwaveCardPayment,
} from './controllers';

const app = new App(
  [
    new Home(),
    new Products(),
    new Categories(),
    new Auth(),
    new Users(),
    new Orders(),
    new Billing(),
    new PaymentCard(),
    new Favorites(),
    new Notifications(),
    new FlutterwaveCardPayment(),
  ],
  PORT
);

if (!process.env.JWT_KEY) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.listen();
