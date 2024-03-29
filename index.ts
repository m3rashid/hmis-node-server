import 'utils/env';
import './utils/redis'
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import { ERRORS } from '@hmis/gatekeeper';
import paginate from 'mongoose-paginate-v2';
import { Server as SocketServer } from 'socket.io';

import router from './routes';
import checkSocketAuth from './sockets/auth';
import type {
	SocketData,
  InterServerEvents,
  ServerToClientEvents,
  ClientToServerEvents,
} from './sockets/types';
import { config } from './utils/config';
// import dummyDbMigration from './utils/dummyDbMigration';
mongoose.set('debug', process.env.NODE_ENV !== 'production');
mongoose.plugin(paginate);

const app = express();
app.use(helmet());
app.use(compression());
app.disable('x-powered-by');

const server = http.createServer(app);
const io = new SocketServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, { cors: config.cors });

io.engine.use(helmet());
io.use(checkSocketAuth);

app.use(cors(config.cors));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router);
app.use((_, res) => res.status(404).send('Not Found'));
app.use(ERRORS.globalErrorHandlerMiddleware);

const startServer = async () => {
  try {
    const PORT = process.env.PORT ?? 4000;
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Connection Established Successfully');
    // await mongoose.connection.db.dropDatabase()
    // console.log('Database Dropped Successfully')
    // await dummyDbMigration()
    app.listen(PORT, () => {
      console.log(`Server ON :${PORT}`);
    });
  } catch (err) {
    await mongoose.disconnect();
    console.log(err);
    process.exit(1);
  }
};

startServer().catch((err: any) => console.log(err));
