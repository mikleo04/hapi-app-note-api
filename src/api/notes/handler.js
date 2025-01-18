class NotesHandler {
  constructor(service) {
    this._service = service;
  }

  postNoteHandler(request, h) {
    try {
      const { title = 'untitled', body, tags } = request.payload;

      const noteId = this._service.addNote({ title, body, tags });

      const response = h.response({
        status: 'success',
        message: 'catatan berhasil disimpan',
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;

    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message
      }).code(400);
      return response;
    }
  }

  getNotesHandler(h) {
    const notes =  this._service.getNotes();
    return h.response({
      status: 'success',
      data: {
        notes,
      }
    }).code(200);
  }

  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const note = this._service.getNoteById(id);

      return h.response({
        status: 'success',
        data: {
          note,
        }
      }).code(200);

    } catch (error) {
      return h.response({
        status: 'fail',
        message: error.message
      }).code(404);
    }
  }

  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.editNoteById(id, request.payload);

      return h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      }).code(200);
    } catch (error) {
      return h.response({
        status: 'fail',
        message: error.message
      }).code(404);
    }
  }

  deleteNoteyIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteNoteById(id);

      return h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      }).code(200);
    } catch (error) {
      return h.response({
        status: 'fail',
        message: error.message
      }).code(404);
    }
  }
}

export default NotesHandler;