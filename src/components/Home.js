import React, { useContext } from 'react';
import Notes from './Notes';
import noteContext from '../context/notes/noteContext';

const Home = ({ showAlert }) => {
  const { notes } = useContext(noteContext);
  const tags = [...new Set(notes.map(n => n.tag || 'General'))];

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="stat-card">
            <div className="stat-value">{notes.length}</div>
            <div className="stat-label">Total Notes</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <div className="stat-value">{tags.length}</div>
            <div className="stat-label">Tags Used</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card">
            <div className="stat-value">
              {notes.filter(n => {
                try { return new Date(n.date).toDateString() === new Date().toDateString(); }
                catch { return false; }
              }).length}
            </div>
            <div className="stat-label">Added Today</div>
          </div>
        </div>
      </div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;