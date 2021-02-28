import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState('')

    return (
        <UserContext.Provider
            value={{ user, setUser, isAuth, setIsAuth, token, setToken }}
        >
            {children}
        </UserContext.Provider>
    );
};
