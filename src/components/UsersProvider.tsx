"use client";
import React, { createContext, useState, useContext } from "react";
import { UserType } from "@/types/types";

interface UsersContextType {
    users: UserType[];
    currentUser: UserType | null;
    setCurrentUser: (user: UserType) => void;
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}

const UsersContext = createContext<UsersContextType>({
    users: [],
    currentUser: null,
    setCurrentUser: () => {},
    setUsers: () => {},
});

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [users, setUsers] = useState<UserType[]>([
        // Initial user data goes here
    ]);
    const [currentUser, setCurrentUserState] = useState<UserType | null>(null);

    const setCurrentUser = (user: UserType) => {
        setCurrentUserState(user);
    };

    return (
        <UsersContext.Provider
            value={{ users, currentUser, setCurrentUser, setUsers }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => useContext(UsersContext);
