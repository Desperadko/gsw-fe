import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddDeveloperRequest } from "../Types/Developer/Add";
import type { DeveloperDTO } from "../Types/Developer/Developer";
import type { AddResponse } from "../Types/General/Add";
import type { GetAllResponse } from "../Types/General/Get";

export const DeveloperService = {
    getAll: async (): Promise<GetAllResponse<DeveloperDTO>> => {
        return apiInstance
            .get(API_ENDPOINTS_CONSTANTS.DEVELOPER.GET_ALL)
            .then(response => response.data);
    },

    add: async (request: AddDeveloperRequest): Promise<AddResponse<DeveloperDTO>> => {
        return apiInstance
            .post(API_ENDPOINTS_CONSTANTS.DEVELOPER.POST_ADD, request)
            .then(response => response.data);
    }
}