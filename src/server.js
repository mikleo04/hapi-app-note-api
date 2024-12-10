import Hapi from '@hapi/hapi';
import routes from './routes.js';

const init =  async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    // add the server option to allo CORS requesr
    routes: {
      cors: {
        origin: ['*'], // allow all origins if you want to allow specific origin you can add it to the array e.g ['http://example.com']
      }
    }
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();