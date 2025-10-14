import { apiInstance } from "../Axios/apiInstance";
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../Types/Account";

export const AccountService = {
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