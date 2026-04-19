import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        showAlert('Logged in successfully!', 'success');
        navigate('/');
      } else {
        showAlert('Invalid credentials. Please try again.', 'danger');
      }
    } catch {
      showAlert('Could not connect to server.', 'danger');
    }
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card p-4 shadow-sm" style={{ width: 400, borderRadius: 16, border: 'none' }}>
        <h4 className="mb-1 fw-bold" style={{ color: '#1e1b4b' }}>Welcome back 👋</h4>
        <p className="text-muted mb-4" style={{ fontSize: 14 }}>Log in to access your notes</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email" className="form-control" name="email"
              value={credentials.email} onChange={onChange}
              placeholder="you@example.com" required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password" className="form-control" name="password"
              value={credentials.password} onChange={onChange}
              placeholder="Enter your password" required
            />
          </div>
          <button
            type="submit" className="btn btn-primary w-100"
            style={{ background: '#4f46e5', border: 'none', borderRadius: 8, padding: '10px' }}
          >
            Log in
          </button>
        </form>

        <hr className="my-3" />
        <p className="text-center text-muted mb-0" style={{ fontSize: 14 }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;