import type {UserInterface} from "~/interfaces/UserInterface";

export interface LoginInterface {
    user: UserInterface;
    access_token: string;
    token_type: string;
    expires_at: number | null;
}
