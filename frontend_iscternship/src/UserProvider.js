import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    // Tenta carregar user do localStorage
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Sempre que mudar o user, atualiza o localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <UserContext.Provider value={ {user, setUser} }>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;
