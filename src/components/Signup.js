import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({ showAlert }) => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const json = await response.json();
      if (json.authtoken) {
        localStorage.setItem('token', json.authtoken);
        showAlert('Account created successfully!', 'success');
        navigate('/');
      } else {
        showAlert(json.error || 'Signup failed. Try again.', 'danger');
      }
    } catch {
      showAlert('Could not connect to server.', 'danger');
    }
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card p-4 shadow-sm" style={{ width: 400, borderRadius: 16, border: 'none' }}>
        <h4 className="mb-1 fw-bold" style={{ color: '#1e1b4b' }}>Create an account ✨</h4>
        <p className="text-muted mb-4" style={{ fontSize: 14 }}>Start saving your notes securely</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text" className="form-control" name="name"
              value={user.name} onChange={onChange}
              placeholder="Your name" minLength={3} required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email" className="form-control" name="email"
              value={user.email} onChange={onChange}
              placeholder="you@example.com" required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password <small className="text-muted fw-normal">(min 5 chars)</small></label>
            <input
              type="password" className="form-control" name="password"
              value={user.password} onChange={onChange}
              placeholder="Create a password" minLength={5} required
            />
          </div>
          <button
            type="submit" className="btn btn-primary w-100"
            style={{ background: '#4f46e5', border: 'none', borderRadius: 8, padding: '10px' }}
          >
            Create account
          </button>
        </form>

        <hr className="my-3" />
        <p className="text-center text-muted mb-0" style={{ fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;