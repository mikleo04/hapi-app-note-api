import Joi from 'joi';

const NotePayloadSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

const NoteQueryParamSchema = Joi.object({
  name: Joi.string().empty(''),
});

export { NotePayloadSchema, NoteQueryParamSchema };