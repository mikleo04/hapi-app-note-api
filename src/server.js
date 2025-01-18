import Hapi from '@hapi/hapi';
import process from 'process';
import notes from './api/notes';
import NotesService from './service/inMemory/notesService.js';

const init =  async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0', // in the production environment can not use localhost, 0.0.0.0 can allow all the network interfaces
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
    },
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();