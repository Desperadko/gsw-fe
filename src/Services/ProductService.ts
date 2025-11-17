import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddProductRequest } from "../Types/Product/Add";

export const ProductService = {
    get: async (id: number) => {
        return apiInstance
            .get(API_ENDPOINTS_CONSTANTS.PRODUCT.GET_SINGLE, { params: { id } })
            .then(response => response.data);
    },

    add: async (request: AddProductRequest) => {
        return apiInstance
            .post(API_ENDPOINTS_CONSTANTS.PRODUCT.POST_ADD, request)
            .then(response => response.data);
    }
}