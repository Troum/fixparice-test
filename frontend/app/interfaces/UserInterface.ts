export interface UserInterface {
    id: number;
    email: string;
    username: string;
    status: number;
    created_at?: number;
    updated_at?: number;
    roles?: string[];
    permissions?: string[];
}
