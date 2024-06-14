import { UserType } from "@/types/types";
import { createContext } from "react";

export const CurrentUserContext = createContext<{
    currentUser: UserType | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}>({
    currentUser: undefined,
    setCurrentUser: () => {},
});
