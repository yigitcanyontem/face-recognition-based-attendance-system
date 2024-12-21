import { Role } from './Role';

export interface Users {
    id: number;
    username: string;
    password: string;
    email: string;
    role: Role;
    createdAt: Date;
}
