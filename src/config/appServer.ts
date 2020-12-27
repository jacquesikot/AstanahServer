import 'dotenv/config';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';
// import mongoose from 'mongoose';

require('../middlewares/passport');
const log = require('debug')('app:log');

import { ControllerProps } from '../types';
import { PORT, MONGODB_URI } from '../constants';

class App {
  public app: express.Application;
  public uri: string = MONGODB_URI;

  constructor(controllers: ControllerProps[], _port: string | undefined) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    if (this.app.get('env') === 'development') {
      this.app.use(morgan('tiny'));
      log('Morgan enabled...');
    }
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(passport.initialize());
  }

  private initializeControllers(controllers: ControllerProps[]) {
    controllers.forEach((controller: ControllerProps) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {}

  private initializeDatabase() {
    // mongoose
    //   .connect(this.uri, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //   })
    //   .then(() => log('Connected to MongoDB...'))
    //   .catch((e) => log(e));
  }

  public listen() {
    this.app.listen(PORT, () => {
      log(`Server ready at: http://localhost:${PORT}⭐`);
    });
  }
}

export default App;
