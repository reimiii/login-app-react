import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8181/api/v1/auth/authenticate', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            setErrors({});
            setError(null);
            navigate('/home'); // ke home
        } catch (error: any) {
            console.error('Login failed', error);
            if (error.response && error.response.status === 400) {
                setError(null)
                setErrors(error.response.data);
            }

            if (error.response && error.response.status === 404) {
                setErrors({})
                setError(error.response.data.error);
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div>
                {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
            </div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                style={styles.input}
            />
            <div>
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={styles.input}
            />
            <button style={styles.button} onClick={handleLogin}>
                Login
            </button>
            <button style={styles.button} onClick={() => navigate('/register')}>
                Go to Register
            </button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center' as 'center',
    },
    input: {
        padding: '10px',
        margin: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '200px',
    },
    button: {
        padding: '10px 20px',
        margin: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#FF5733',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default Login;