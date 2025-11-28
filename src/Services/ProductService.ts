import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddResponse } from "../Types/General/Add";
import type { GetResponse } from "../Types/General/Get";
import type { AddProductRequest } from "../Types/Product/Add";
import type { ProductDTO } from "../Types/Product/Product";

export const ProductService = {
    get: async (id: number): Promise<GetResponse<ProductDTO>> => {
        return apiInstance
            .get(API_ENDPOINTS_CONSTANTS.PRODUCT.GET_SINGLE, { params: { id } })
            .then(response => response.data);
    },

    add: async (request: AddProductRequest): Promise<AddResponse<ProductDTO>> => {
        return apiInstance
            .post(API_ENDPOINTS_CONSTANTS.PRODUCT.POST_ADD, request)
            .then(response => response.data);
    }
}