import JWT from 'jsonwebtoken';
import type { Socket } from 'socket.io';

const checkSocketAuth = (socket: Socket, next: any) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) throw new Error('Auth error');
    const payload = JWT.verify(token, process.env.ACCESS_SECRET!);

    socket.data.user = payload.sub;
    return next();
  } catch (err) {
    console.log('Socket Err', err);
    next(err);
  }
};

export default checkSocketAuth;
