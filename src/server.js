import Hapi from '@hapi/hapi';
import process from 'process';
import notes from './api/notes/index.js';
import NotesService from './service/inMemory/notesService.js';
import NotesValidator from './validator/notes/index.js';
import ClientError from './exceptions/ClientError.js';
import { config as configDotenv } from 'dotenv';
configDotenv();

const init =  async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST, // in the production environment can not use localhost, 0.0.0.0 can allow all the network interfaces
    // add the server option to allo CORS requesr
    routes: {
      cors: {
        origin: ['*'], // allow all origins if you want to allow specific origin you can add it to the array e.g ['http://example.com']
      }
    }
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  // handle customer error with onPreResponse to reduce the code duplication in file handler.js
  // onPreResponse is a server extension point that allows you to modify the response before it’s sent to the client.
  server.ext('onPreResponse', (request, h) => {
    // get the response from the request object
    const { response } = request;

    // handle client error in internal
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();