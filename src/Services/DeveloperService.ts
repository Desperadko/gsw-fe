import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddDeveloperRequest } from "../Types/Developer/Add";

export const DeveloperService = {
    getAll: async () => {
        return apiInstance
            .get(API_ENDPOINTS_CONSTANTS.DEVELOPER.GET_ALL)
            .then(response => response.data);
    },

    add: async (request: AddDeveloperRequest) => {
        return apiInstance
            .post(API_ENDPOINTS_CONSTANTS.DEVELOPER.POST_ADD, request)
            .then(response => response.data);
    }
}