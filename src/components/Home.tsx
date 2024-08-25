import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [data, setData] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // ke login jika token tidak ada
        } else {
            axios
                .get('http://localhost:8181/api/v1/home', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data', error);
                    navigate('/login');
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Hapus token dari localStorage
        navigate('/login'); // Arahkan kembali ke halaman login
    };

    return (
        <div style={styles.container}>
            <h4>Welcome to Home!</h4>
            <p>{data}</p>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
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
        textAlign: 'center' as 'center',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#FF5733',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default Home;

