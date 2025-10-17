import { apiInstance } from "../Axios/apiInstance";
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants";
import type { AccountDTO, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../Types/Account";

export const AccountService = {
    get: async (username: string) => {
        return apiInstance
            .get<AccountDTO>(API_ENDPOINTS_CONSTANTS.ACCOUNT.GET, { params: { username } })
            .then(response => response.data);
    },

    register: async (request: RegisterRequest) => {
        return apiInstance
            .post<RegisterResponse>(API_ENDPOINTS_CONSTANTS.ACCOUNT.REGISTER, request)
            .then(response => response.data);
    },

    login: async (request: LoginRequest) => {
        return apiInstance
            .post<LoginResponse>(API_ENDPOINTS_CONSTANTS.ACCOUNT.LOGIN, request)
            .then(response => response.data);
    }
}