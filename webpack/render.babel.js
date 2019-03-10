// render.babel.js
import ServerConfig from './server.babel.js';

export default {
  ...ServerConfig,
  name: 'server',
  entry: ['./src/server/requestHandler.js'],
};
