import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddResponse } from "../Types/General/Add";
import type { GetAllResponse } from "../Types/General/Get";
import type { AddPlatformRequest } from "../Types/Platform/Add";
import type { PlatformDTO } from "../Types/Platform/Platform";

export const PlatformService = {
    getAll: async () => {
        return apiInstance
            .get<Promise<GetAllResponse<PlatformDTO>>>(API_ENDPOINTS_CONSTANTS.PLATFORM.GET_ALL)
            .then(response => response.data);
    },

    add: async (request: AddPlatformRequest) => {
        return apiInstance
            .post<Promise<AddResponse<PlatformDTO>>>(API_ENDPOINTS_CONSTANTS.PLATFORM.POST_ADD, request)
            .then(response => response.data);
    }
}