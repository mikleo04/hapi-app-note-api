import InvariantError from '../../exceptions/InvariantError.js';
import { NotePayloadSchema, NoteQueryParamSchema } from './schema.js';

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateNoteQuery: (query) => {
    const validationResult = NoteQueryParamSchema.validate(query);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

export default NotesValidator;