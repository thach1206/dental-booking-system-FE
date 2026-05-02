import { useState, useEffect } from 'react';
import { authService } from '@/apis/auth';
import { useAuth } from '../../../contexts/authenticationContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');
            console.log('authService:', authService);
            const res = await authService.login(form.email, form.password);
            console.log('authService:', authService);
            login(res.data);

            navigate('/');
        } catch (err) {
            setError('Sai email hoặc mật khẩu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Healthcare Booking</h2>

                <input
                    name="email"
                    placeholder="Email"
                    style={styles.input}
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    onChange={handleChange}
                />

                {error && <p style={styles.error}>{error}</p>}

                <button style={styles.button} onClick={handleSubmit}>
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f4f6f8',
    },
    card: {
        width: 350,
        padding: 30,
        borderRadius: 12,
        background: '#fff',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
    },
    input: {
        padding: 10,
        borderRadius: 8,
        border: '1px solid #ccc',
    },
    button: {
        padding: 12,
        borderRadius: 8,
        border: 'none',
        background: '#1976d2',
        color: '#fff',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: 14,
    },
};

export default LoginForm;