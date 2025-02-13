class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const { title = 'untitled', body, tags } = request.payload;

    const noteId = await this._service.addNote({ title, body, tags });

    const response = h.response({
      status: 'success',
      message: 'note successfully added',
      data: {
        noteId,
      },
    });
    response.code(201);
    return response;
  }

  async getNotesHandler(request, h) {
    // const { name = '' } = request.query; // for validate query parameter
    // this._validator.validateNoteQuery(name); // for validate query parameter
    const notes = await this._service.getNotes();
    return h.response({
      status: 'success',
      message: 'successfully get all notes',
      data: {
        notes,
      }
    }).code(200);
  }

  async getNoteByIdHandler(request, h) {
    const { id } = request.params;
    const note = await this._service.getNoteById(id);

    return h.response({
      status: 'success',
      data: {
        note,
      }
    }).code(200);
  }

  async putNoteByIdHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const { id } = request.params;
    await this._service.editNoteById(id, request.payload);

    return h.response({
      status: 'success',
      message: 'note successfully updated',
    }).code(200);
  }

  async deleteNoteByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteNoteById(id);

    return h.response({
      status: 'success',
      message: 'note successfully deleted',
    }).code(200);
  }
}

export default NotesHandler;