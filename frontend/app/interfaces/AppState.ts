import type {UserInterface} from "~/interfaces/UserInterface";
import type {TokenInterface} from "~/interfaces/TokenInterface";

export interface AppState {
    app: {
        user: UserInterface | null,
        token: TokenInterface | null
    }
}
