import { nanoid } from 'nanoid';
import notes from './notes.js';

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = { title, tags, body, id, createdAt, updatedAt };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  let response;

  if (isSuccess) {
    response = h.response({
      status: 'success',
      message: 'note successfully added',
      data: {
        notedId: id,
      },
    });
    response.code(201);
  } else {
    response = h.response({
      status: 'fail',
      message: 'note failed to add',
    });
    response.code(500);
  }

  return response;
};

const getlistNoteHandler = (request, h) => {
  return h.response({
    status: 'success',
    message: 'successfully get all notes',
    data: {
      notes,
    }
  }).code(200);
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.id === id)[0];

  let response;
  if (note === undefined || note === null) {
    response = h.response({
      status: 'fail',
      message: 'note not found'
    });
    response.code(404);
  } else {
    response = h.response({
      status: 'success',
      message: 'successfully get note',
      data: {
        note
      }
    });
    response.code(200);
  }

  return response;
};

const editNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const { id } = request.params;

  let response;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt: new Date().toISOString(),
    };

    response = h.response({
      status: 'success',
      message: 'note successfully updated',
    });
    response.code(200);
  } else {
    response = h.response({
      status: 'fail',
      message: 'note failed to update. Id not found',
    });
    response.code(404);
  }

  return response;
};

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  let response;


  if (index !== -1) {
    notes.splice(index, 1);
    response = h.response({
      status: 'success',
      message: 'note successfully deleted',
    });
    response.code(200);
  } else {
    response = h.response({
      status: 'fail',
      message: 'note failed to delete. Id not found',
    });
    response.code(404);
  }

  return response;
};

export { addNoteHandler, getlistNoteHandler, getNoteByIdHandler, editNoteHandler, deleteNoteHandler };