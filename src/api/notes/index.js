import NotesHandler from './handler.js';
import routes from './routes.js';

const notesPlugin = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service }) => {
    const notesHandler = new NotesHandler(service);
    server.route(routes(notesHandler));
  }
};

export default notesPlugin;