import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => { getNotes(); }, []); // eslint-disable-line

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [filterTag, setFilterTag] = useState('all');

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert('Note updated successfully', 'success');
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  const allTags = ['all', ...new Set(notes.map(n => n.tag || 'General'))];

  const filtered = notes
    .filter(n => {
      const q = search.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        (n.tag || '').toLowerCase().includes(q)
      );
    })
    .filter(n => filterTag === 'all' || (n.tag || 'General') === filterTag)
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.date) - new Date(a.date);
      if (sort === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sort === 'az') return a.title.localeCompare(b.title);
      if (sort === 'za') return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <>
      <AddNote showAlert={showAlert} />

      {/* Hidden modal trigger */}
      <button ref={ref} type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#editModal" />

      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: 14 }}>
            <div className="modal-header" style={{ background: '#f8f7ff', borderBottom: '1px solid #e0e7ff' }}>
              <h5 className="modal-title" style={{ color: '#3730a3', fontWeight: 700 }}>✏️ Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type="text" className="form-control" name="etitle"
                  value={note.etitle} onChange={onChange} minLength={3} required
                />
                <small className="text-muted">{note.etitle.length}/100</small>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control" name="edescription" rows={4}
                  value={note.edescription} onChange={onChange} minLength={5} required
                  style={{ resize: 'vertical' }}
                />
                <small className="text-muted">{note.edescription.length}/2000</small>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Tag</label>
                <input
                  type="text" className="form-control" name="etag"
                  value={note.etag} onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button" className="btn btn-primary"
                disabled={note.etitle.length < 3 || note.edescription.length < 5}
                onClick={handleClick}
                style={{ background: '#4f46e5', border: 'none' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search / Filter / Sort bar */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <input
          className="search-bar"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="form-select form-select-sm"
          style={{ width: 130, borderRadius: 20 }}
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {/* Tag filters */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className="btn btn-sm"
            style={{
              borderRadius: 20,
              background: filterTag === tag ? '#4f46e5' : '#e0e7ff',
              color: filterTag === tag ? '#fff' : '#3730a3',
              border: 'none',
              fontSize: 12,
              padding: '4px 14px',
            }}
          >
            {tag === 'all' ? 'All' : tag}
          </button>
        ))}
      </div>

      {/* Notes grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
          <p style={{ fontWeight: 600, fontSize: 16 }}>
            {search ? 'No notes match your search' : 'No notes yet'}
          </p>
          <p style={{ fontSize: 14 }}>
            {search ? 'Try a different keyword' : 'Add your first note above!'}
          </p>
        </div>
      ) : (
        <div className="row">
          {filtered.map(note => (
            <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} />
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;