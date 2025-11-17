import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddPublisherRequest } from "../Types/Publisher/Add";

export const PublisherService = {
    getAll: async () => {
        return apiInstance
            .get(API_ENDPOINTS_CONSTANTS.PUBLISHER.GET_ALL)
            .then(response => response.data);
    },

    add: async (request: AddPublisherRequest) => {
        return apiInstance
            .post(API_ENDPOINTS_CONSTANTS.PUBLISHER.POST_ADD, request)
            .then(response => response.data);
    }
}