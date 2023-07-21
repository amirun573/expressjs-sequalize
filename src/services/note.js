const redis = require ('./redis');

const Note = require ('../../models/note');
const {where} = require ('sequelize');
class NoteService {
  constructor () {}

  async createNote({user, notes}) {
    try {
      const createNote = await Note.create ({
        userId: user.id,
        notes,
      });

      if (!createNote) {
        throw false;
      }

      await redis.set (`noteId-${createNote.id}`, JSON.stringify (createNote));

      return true;
    } catch (error) {
      console.log (error);
      throw new Error ('Cannot Save');
    }
  }

  async listNote({page, limit, userId}) {
    try {
      limit = parseInt (limit) || 10;
      const offset = (parseInt (page) - 1) * limit || 0;

      return await Note.findAll ({
        limit,
        offset,
        where: {
          userId,
        },
      });
    } catch (error) {
      throw new Error ('Cannot Get It');
    }
  }

  async getNoteByNoteId (noteId) {
    try {
      const getRedis = await redis.get (`noteId-${noteId}`);

      if (getRedis) {
        return JSON.parse (getRedis);
      }

      return Note.findOne ({
        where: {
          id: noteId,
        },
      });
    } catch (error) {
      throw new Error ('Cannot Get It');
    }
  }

  async updateNote (note) {
    try {
      const updateNote = await Note.update (
        {
          notes: note.notes,
        },
        {
          where: {
            id: note.id,
          },
        }
      );

      if (!updateNote) {
        throw new Error ('Cannot Save');
      }

      await redis.set (`noteId-${note.id}`, JSON.stringify (note));

      return note;
    } catch (error) {
      console.log (error);
      throw new Error ('Cannot Save');
    }
  }

  async deleteNote (note) {
    try {
      await redis.del (`noteId-${note.id}`);
      return await note.destroy ();
    } catch (error) {
      console.log(error)
      throw new Error ('Cannot Delete');
    }
  }
}

module.exports = NoteService;
