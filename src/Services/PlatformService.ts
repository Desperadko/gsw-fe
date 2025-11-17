import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddPlatformRequest } from "../Types/Platform/Add";

export const PlatformService = {
    getAll: async () => {
        return apiInstance
            .get(API_ENDPOINTS_CONSTANTS.PLATFORM.GET_ALL)
            .then(response => response.data);
    },

    add: async (request: AddPlatformRequest) => {
        return apiInstance
            .post(API_ENDPOINTS_CONSTANTS.PLATFORM.POST_ADD, request)
            .then(response => response.data);
    }
}