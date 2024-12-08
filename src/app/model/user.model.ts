export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    nickname?: string;
    bio?: string;
    role?: string;
    joinedDate?: Date;
}