export type User = {
    id: string;
    uid?: string;
    name: string;
    email: string;
    password?: string;
    nickname?: string;
    bio?: string;
    role?: string;
    createdAt?: Date;
}