import { io } from 'socket.io-client';

const URL = 'http://localhost:3600'; 

export const socket = io(URL, {
    autoConnect: false
  });