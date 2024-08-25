import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8181/api/v1/auth/register', {
                name,
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            setErrors({});
            setError(null);
            navigate('/home'); 
        } catch (error: any) {
            console.error('Login failed', error);
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data); 
            }

            if (error.response && error.response.status === 409) {
                setError(error.response.data.error);
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>
            <h3>{errors.name && <p style={styles.errorText}>{errors.name}</p>}</h3>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                style={styles.input}
            />
            <h3>
                {error && <p style={styles.errorText}>{error}</p>} 
                {errors.username && <p style={styles.errorText}>{errors.username}</p>}
            </h3>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                style={styles.input}
            />
            <h3>{errors.password && <p style={styles.errorText}>{errors.password}</p>}</h3>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={styles.input}
            />
            <button onClick={handleRegister} style={styles.button}>Register</button>
            <p>Sudah punya akun? <span onClick={() => navigate('/login')} style={styles.link}>Login disini</span></p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    input: {
        marginBottom: '10px',
        padding: '8px',
        width: '200px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    errorText: {
        color: 'red',
        margin: '5px 0',
    },
    link: {
        color: '#007BFF',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
};

export default Register;
