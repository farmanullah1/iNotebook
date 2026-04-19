import React from 'react';

const About = () => {
  return (
    <div className="row justify-content-center mt-3">
      <div className="col-md-8">
        <div className="card p-4 shadow-sm" style={{ borderRadius: 16, border: 'none' }}>
          <h4 className="fw-bold mb-1" style={{ color: '#1e1b4b' }}>📓 About iNotebook</h4>
          <p className="text-muted mb-4" style={{ fontSize: 14 }}>A secure, cloud-ready notebook for your thoughts</p>

          <p style={{ color: '#475569', lineHeight: 1.8 }}>
            iNotebook is a full-stack note-taking app built with <strong>React</strong>, <strong>Node.js</strong>,
            <strong> Express</strong>, and <strong>MongoDB</strong>. It allows you to create, organise, search,
            and manage your notes with JWT-based authentication.
          </p>

          <h6 className="fw-bold mt-3 mb-2" style={{ color: '#3730a3' }}>Features</h6>
          <ul style={{ color: '#475569', lineHeight: 2, fontSize: 14 }}>
            <li>Create, read, update and delete notes</li>
            <li>Tag-based organisation with filter by tag</li>
            <li>Full-text search across title, description and tags</li>
            <li>Sort by date or alphabetically</li>
            <li>Character counter on all inputs</li>
            <li>JWT authentication (backend)</li>
            <li>Responsive layout</li>
          </ul>

          <div className="mt-3 p-3" style={{ background: '#f8f7ff', borderRadius: 10 }}>
            <small style={{ color: '#6366f1' }}>
              Built with React 18 · Node.js · Express · MongoDB · Bootstrap 5
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;