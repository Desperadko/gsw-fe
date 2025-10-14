export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    token: string;
    account: AccountDTO;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    account: AccountDTO;
}

export interface AccountDTO {
    username: string;
    email: string;
}