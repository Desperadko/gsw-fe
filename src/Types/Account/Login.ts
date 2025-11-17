import type { BaseDTO } from "../General/Base";
import type { AccountDTO } from "./Account";

export interface LoginRequest {
    credentials: AccountLoginDTO;
}

export interface LoginResponse {
    token: string;
    account: AccountDTO;
}

export interface AccountLoginDTO extends BaseDTO {
    username: string;
    password: string;
}