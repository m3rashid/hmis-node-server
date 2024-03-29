import type { MODELS } from '@hmis/gatekeeper';

/**
 * @description These types are used on io.emit
 * @example io.emit('error', { message: '' })
 */
export interface ServerToClientEvents {
  error: (_: { message: string }) => void;
}

export interface ClientToServerEvents {
  connect: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
  user: MODELS.IUser;
}
