import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);

    const login = async (email, contraseña) => {
        setError(null);

        try {
            const response = await fetch("http://localhost:3000/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, contraseña }),
            });
            const session = await response.json();

            if (!response.ok) {
                throw new Error(session.errores);
            }

            setToken(session.token);
            setEmail(session.email);

            return { success: true };

        } catch (err) {
            setError(err.message);
            return { success: false };
        }


    }

    const registro = async (nombre, email, contraseña) => {
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/usuarios/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, email, contraseña }),
            });

            const registro = await response.json();

             if (!response.ok) {
                throw new Error(registro.errores);
            }

            return { success: true, message: "Registro correcto" };
        } catch (err) {
            setError(err.message);
            return { success: false };
        }
    };

    const logout = () => {
        setToken(null);
        setEmail(null);
        setError(null);
    };

    const fetchAuth = async (url, options = {}) => {
        if (!token) {
            throw new Error("No se ha iniciado la sesión");
        }

        return fetch(url, {
            ...options,
            headers: { ...options.headers, Authorization: `Bearer ${token}` },
        });
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                error,
                email,
                setError,
                isAuthenticated: !!token,
                login,
                logout,
                registro,
                fetchAuth,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthPage = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <><h2>No tiene permiso para ver esta pagina</h2><br /><h2>Inicie sesion </h2></>;
    }

    return children;
};
