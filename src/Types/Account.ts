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

export interface RefreshRequest {
    token: string;
}

export interface RefreshResponse {
    token: string;
}

export interface LogoutResponse {
    message: string;
}

export interface AccountDTO {
    username: string;
    email: string;
    role: string;
}