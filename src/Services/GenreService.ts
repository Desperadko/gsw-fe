import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddGenreRequest } from "../Types/Genre/Add";

export const GenreService = {
    getAll: async () => {
        return apiInstance
            .get(API_ENDPOINTS_CONSTANTS.GENRE.GET_ALL)
            .then(response => response.data);
    },

    add: async (request: AddGenreRequest) => {
        return apiInstance
            .post(API_ENDPOINTS_CONSTANTS.GENRE.POST_ADD, request)
            .then(response => response.data);
    }
}