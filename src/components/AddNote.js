import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = ({ showAlert }) => {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag || 'General');
    setNote({ title: '', description: '', tag: '' });
    setOpen(false);
    showAlert('Note added successfully!', 'success');
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  return (
    <div className="card mb-4" style={{ borderRadius: 14, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ background: '#f8f7ff', borderBottom: '1px solid #e0e7ff', borderRadius: '14px 14px 0 0', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ color: '#3730a3', fontWeight: 600 }}>➕ Add a New Note</span>
        <span style={{ color: '#6366f1', fontSize: 20 }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Title <span className="text-danger">*</span></label>
              <input
                type="text" className="form-control" name="title"
                value={note.title} onChange={onChange}
                placeholder="Note title (min 3 characters)"
                minLength={3} maxLength={100} required
              />
              <small className="text-muted">{note.title.length}/100</small>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
              <textarea
                className="form-control" name="description" rows={4}
                value={note.description} onChange={onChange}
                placeholder="Write your note here..."
                minLength={5} maxLength={2000} required
                style={{ resize: 'vertical' }}
              />
              <small className="text-muted">{note.description.length}/2000</small>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Tag</label>
              <input
                type="text" className="form-control" name="tag"
                value={note.tag} onChange={onChange}
                placeholder="e.g. Work, Personal, Ideas"
              />
              <small className="text-muted">Leave blank for "General"</small>
            </div>
            <button
              type="submit" className="btn btn-primary px-4"
              disabled={note.title.length < 3 || note.description.length < 5}
              style={{ background: '#4f46e5', border: 'none', borderRadius: 8 }}
            >
              Add Note
            </button>
            <button
              type="button" className="btn btn-light ms-2 px-4"
              style={{ borderRadius: 8 }} onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddNote;