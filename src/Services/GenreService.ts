import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddResponse } from "../Types/General/Add";
import type { GetAllResponse } from "../Types/General/Get";
import type { AddGenreRequest } from "../Types/Genre/Add";
import type { GenreDTO } from "../Types/Genre/Genre";

export const GenreService = {
    getAll: async () => {
        return apiInstance
            .get<Promise<GetAllResponse<GenreDTO>>>(API_ENDPOINTS_CONSTANTS.GENRE.GET_ALL)
            .then(response => response.data);
    },

    add: async (request: AddGenreRequest) => {
        return apiInstance
            .post<Promise<AddResponse<GenreDTO>>>(API_ENDPOINTS_CONSTANTS.GENRE.POST_ADD, request)
            .then(response => response.data);
    }
}