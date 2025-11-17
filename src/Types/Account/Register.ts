import type { BaseDTO } from "../General/Base";
import type { AccountDTO } from "./Account";

export interface RegisterRequest {
    credentials: AccountRegisterDTO;
}

export interface RegisterResponse {
    token: string;
    account: AccountDTO;
}

export interface AccountRegisterDTO extends BaseDTO {
    username: string;
    email: string;
    password: string;
}