import type { AccountDTO } from "./Account";

export interface LoginRequest {
    credentials: AccountLoginDTO;
}

export interface LoginResponse {
    token: string;
    account: AccountDTO;
}

export interface AccountLoginDTO {
    username: string;
    password: string;
}