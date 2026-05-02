import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/apis/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const TOKEN_KEY = 'token';
    const USER_KEY = 'user';

    // 🟢 LOGIN
    const login = (data) => {
        const { accessToken, user } = data;

        // lưu localStorage
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        // set state
        setUser(user);
    };

    // 🔴 LOGOUT
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    };

    // 🟢 LOAD USER KHI APP START (fix F5)
    useEffect(() => {
        const initAuth = () => {
            try {
                const token = localStorage.getItem(TOKEN_KEY);
                const user = localStorage.getItem(USER_KEY);

                if (token && user) {
                    setUser(JSON.parse(user));
                }
            } catch (err) {
                console.error('Init auth error', err);
                logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);