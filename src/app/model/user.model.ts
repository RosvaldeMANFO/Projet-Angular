export type User = {
    id: string;
    email: string;
    password?: string;
    nickname?: string;
    bio?: string;
    role?: string;
    createdAt?: Date;
    userRole?: 'admin' | 'user';
    twitter?: string;
    facebook?: string;
    linkedin?: string;
}