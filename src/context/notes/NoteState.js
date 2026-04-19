import NoteContext from './noteContext';
import { useState } from 'react';

const HOST = 'http://localhost:5000';

const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const getToken = () => localStorage.getItem('token');

  const getNotes = async () => {
    try {
      const res = await fetch(`${HOST}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'auth-token': getToken() },
      });
      const json = await res.json();
      if (Array.isArray(json)) setNotes(json);
    } catch (err) {
      console.error('getNotes error:', err);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const res = await fetch(`${HOST}/api/notes/addnote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth-token': getToken() },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await res.json();
      setNotes(prev => [note, ...prev]);
    } catch (err) {
      console.error('addNote error:', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${HOST}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'auth-token': getToken() },
      });
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error('deleteNote error:', err);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      await fetch(`${HOST}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'auth-token': getToken() },
        body: JSON.stringify({ title, description, tag }),
      });
      setNotes(prev => prev.map(n => n._id === id ? { ...n, title, description, tag } : n));
    } catch (err) {
      console.error('editNote error:', err);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;