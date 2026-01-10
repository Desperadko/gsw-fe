import { apiInstance } from "../Axios/apiInstance";
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants";
import type { AccountDTO } from "../Types/Account/Account";
import type { LoginRequest, LoginResponse } from "../Types/Account/Login";
import type { LogoutResponse } from "../Types/Account/Logout";
import type { RefreshRequest, RefreshResponse } from "../Types/Account/Refresh";
import type { RegisterRequest, RegisterResponse } from "../Types/Account/Register";

export const AccountService = {
    get: async (username: string) => {
        return apiInstance
            .get<AccountDTO>(API_ENDPOINTS_CONSTANTS.ACCOUNT.GET_SINGLE, { params: { username } })
            .then(response => response.data);
    },

    getCurrent: async () => {
        return apiInstance
            .get<AccountDTO>(API_ENDPOINTS_CONSTANTS.ACCOUNT.GET_CURRENT)
            .then(response => response.data);
    },

    register: async (request: RegisterRequest) => {
        return apiInstance
            .post<RegisterResponse>(API_ENDPOINTS_CONSTANTS.ACCOUNT.POST_REGISTER, request)
            .then(response => response.data);
    },

    login: async (request: LoginRequest) => {
        return apiInstance
            .post<LoginResponse>(API_ENDPOINTS_CONSTANTS.ACCOUNT.POST_LOGIN, request)
            .then(response => response.data);
    },

    refresh: async (request: RefreshRequest) => {
        return apiInstance
            .post<RefreshResponse>(API_ENDPOINTS_CONSTANTS.ACCOUNT.POST_REFRESH, request)
            .then(response => response.data);
    },

    logout: async () => {
        return apiInstance
            .post<LogoutResponse>(API_ENDPOINTS_CONSTANTS.ACCOUNT.POST_LOGOUT)
            .then(response => response.data);
    }
}