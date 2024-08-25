import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [data, setData] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // ke login
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

    return <div>Welcome to Home! {data}</div>;
};

export default Home;
