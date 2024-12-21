import {Role} from "@/models/Role.ts";

export type AuthenticationResponse = {
   email: string;
   role: Role;
   userId: number;
};