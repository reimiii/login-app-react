import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h2>Welcome</h2>
            <p>Please choose an option:</p>
            <button style={styles.button} onClick={() => navigate('/login')}>
                Go to Login
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
        textAlign: 'center',
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

export default Landing;
