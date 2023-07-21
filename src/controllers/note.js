const Joi = require ('joi');
const NoteService = require ('../services/note');

const noteService = new NoteService ();
let response = {
  statusCode: 200,
  message: 'Success',
};

class NoteController {
  constructor () {}

  async createNote (req, res) {
    try {
      let message = 'Successfully Save';
      const bodySchema = Joi.object ({
        notes: Joi.string ().required (),
      });

      // Validate the request body
      const {value, error} = bodySchema.validate (req.body);

      if (error) {
        throw error;
      }

      const {notes} = value;

      const user = req.user;

      const saveNote = await noteService.createNote ({
        user,
        notes,
      });

      if (!saveNote) {
        throw new Error ('Note Cannot Save');
      }
      return res.status (200).send ({message});
    } catch (error) {
      return (
        res
          .status (error.statusCode ? error.statusCode : 400)
          //.json (error ? error : 'Having Problem')
          .send ({message: error.message})
      );
    }
  }

  async listNote (req, res) {
    try {
      //   const bodySchema = Joi.object ({
      //     page: Joi.number ().required (),
      //     query: Joi.number ().required (),
      //   });

      //   console.log(req);

      //   // Validate the request body
      //   const {value, error} = bodySchema.validate (req.query);

      //   if (error) {
      //     // Validation failed, send an error response
      //     response.statusCode = 400;
      //     response.message = error.message;
      //     throw response;
      //   }

      const user = req.user;

      if (!req.query.page || !req.query.limit) {
        throw new Error ('Required Page And Limit From Query Parameters');
      }

      const {page, limit} = req.query;

      const listNotes = await noteService.listNote ({
        page,
        limit,
        userId: user.id,
      });

      return res.status (200).json (listNotes).send ();
    } catch (error) {
      return (
        res
          .status (error.statusCode ? error.statusCode : 400)
          //.json (error ? error : 'Having Problem')
          .send ({message: error.message})
      );
    }
  }

  async getNoteByNoteId (req, res) {
    try {
      //   const bodySchema = Joi.object ({
      //     page: Joi.number ().required (),
      //     query: Joi.number ().required (),
      //   });

      //   console.log(req);

      //   // Validate the request body
      //   const {value, error} = bodySchema.validate (req.query);

      //   if (error) {
      //     // Validation failed, send an error response
      //     response.statusCode = 400;
      //     response.message = error.message;
      //     throw response;
      //   }

      const user = req.user;

      if (!req.params.id) {
        throw new Error ('Need Note ID');
      }

      const {id} = req.params;

      const note = await noteService.getNoteByNoteId (id);

      if (!note || note.userId != user.id) {
        throw new Error ('Not Exist');
      }

      return res.status (200).json (note).send ();
    } catch (error) {
      return (
        res
          .status (error.statusCode ? error.statusCode : 400)
          //.json (error ? error : 'Having Problem')
          .send ({message: error.message})
      );
    }
  }

  async updateNote (req, res) {
    try {
      let message = 'Successfully Update';
      const bodySchema = Joi.object ({
        noteId: Joi.number ().required (),
        notes: Joi.string ().required (),
      });

      // Validate the request body
      const {value, error} = bodySchema.validate (req.body);

      if (error) {
        // Validation failed, send an error response
        response.statusCode = 400;
        response.message = error.message;
        throw response;
      }

      const {noteId, notes} = value;

      const user = req.user;

      const note = await noteService.getNoteByNoteId (noteId);

      if (!note || note.userId != user.id) {
        response.statusCode = 400;
        response.message = 'Not Exist.';

        throw response;
      }

      note.notes = notes;

      const saveNote = await noteService.updateNote (note);

      if (!saveNote) {
        response.message = 'Failed to Save Note.';
        response.statusCode = 400;

        throw response;
      }
      return res.status (200).json (message).send ();
    } catch (error) {
      console.log (error);
      return res
        .status (error.statusCode ? error.statusCode : 400)
        .send ({message: error.message});
    }
  }

  async deleteNoteByNoteId (req, res) {
    try {
      //   const bodySchema = Joi.object ({
      //     page: Joi.number ().required (),
      //     query: Joi.number ().required (),
      //   });

      //   console.log(req);

      //   // Validate the request body
      //   const {value, error} = bodySchema.validate (req.query);

      //   if (error) {
      //     // Validation failed, send an error response
      //     response.statusCode = 400;
      //     response.message = error.message;
      //     throw response;
      //   }

      const user = req.user;

      if (!req.params.id) {
        response.statusCode = 400;
        response.message = 'Need Note ID';
        throw response;
      }

      const {id} = req.params;

      const note = await noteService.getNoteByNoteId (id);

      if (!note || note.userId != user.id) {
        response.statusCode = 400;
        response.message = 'Not Exist.';

        throw response;
      }

      const deleteNote = await noteService.deleteNote (note);

      if (!deleteNote) {
        response.statusCode = 400;
        response.message = 'Cannot Delete';
      }

      return res
        .status (200)
        .json ('Note has been SuccessFully Deleted')
        .send ();
    } catch (error) {
      return res
        .status (error.statusCode ? error.statusCode : 400)
        .send ({message: error.message});
    }
  }
}
module.exports = NoteController;
