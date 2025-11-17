import type { AccountDTO } from "./Account";

export interface RegisterRequest {
    credentials: AccountRegisterDTO;
}

export interface RegisterResponse {
    token: string;
    account: AccountDTO;
}

export interface AccountRegisterDTO{
    username: string;
    email: string;
    password: string;
}