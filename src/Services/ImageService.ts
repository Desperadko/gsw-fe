import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddImageRequest } from "../Types/Image/Add";

export const ImageService = {
    get: async (fileName: string) => {
        return apiInstance
            .get(API_ENDPOINTS_CONSTANTS.IMAGE.GET_SINGLE, { params: { fileName } })
            .then(response => response.data);
    },

    add: async (request: AddImageRequest) => {
        return apiInstance
            .post(API_ENDPOINTS_CONSTANTS.IMAGE.POST_ADD, request)
            .then(response => response.data);
    }
}