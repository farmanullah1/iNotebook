import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = ({ note, updateNote, showAlert }) => {
  const { deleteNote } = useContext(noteContext);

  const handleDelete = () => {
    if (window.confirm('Delete this note? This cannot be undone.')) {
      deleteNote(note._id);
      showAlert('Note deleted', 'danger');
    }
  };

  const fmtDate = (d) => {
    try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
    catch { return ''; }
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="note-card card h-100 p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="mb-0 fw-semibold" style={{ color: '#1e1b4b', fontSize: 15 }}>
            {note.title}
          </h6>
          <div className="d-flex gap-1">
            <span
              className="icon-btn"
              title="Edit"
              onClick={() => updateNote(note)}
              style={{ color: '#6366f1', fontSize: 16 }}
            >✎</span>
            <span
              className="icon-btn"
              title="Delete"
              onClick={handleDelete}
              style={{ color: '#ef4444', fontSize: 16 }}
            >✕</span>
          </div>
        </div>

        <p
          className="card-text mb-3"
          style={{
            fontSize: 13.5,
            color: '#475569',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {note.description}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="tag-badge">{note.tag || 'General'}</span>
          <small style={{ color: '#94a3b8', fontSize: 11 }}>{fmtDate(note.date)}</small>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;