import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const response = await fetch("http://localhost:5000/api/auth/reset-password", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password })
        });

        const json = await response.json();
        if (json.success) {
            alert("Password successfully updated!");
            navigate('/login');
        } else {
            alert("Token invalid or expired.");
        }
    };

    return (
        <div className="container mt-5">
            <h3>Reset Your Password</h3>
            <form onSubmit={handleReset}>
                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Password</button>
            </form>
        </div>
    );
}
