import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddResponse } from "../Types/General/Add";
import type { GetAllResponse } from "../Types/General/Get";
import type { AddPublisherRequest } from "../Types/Publisher/Add";
import type { PublisherDTO } from "../Types/Publisher/Publisher";

export const PublisherService = {
    getAll: async () => {
        return apiInstance
            .get<Promise<GetAllResponse<PublisherDTO>>>(API_ENDPOINTS_CONSTANTS.PUBLISHER.GET_ALL)
            .then(response => response.data);
    },

    add: async (request: AddPublisherRequest) => {
        return apiInstance
            .post<Promise<AddResponse<PublisherDTO>>>(API_ENDPOINTS_CONSTANTS.PUBLISHER.POST_ADD, request)
            .then(response => response.data);
    }
}