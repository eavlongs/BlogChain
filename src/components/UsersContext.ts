import { UserType } from "@/types/types";
import { createContext } from "react";

export const UsersContext = createContext<UserType[]>([]);
