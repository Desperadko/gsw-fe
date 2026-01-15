import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddResponse } from "../Types/General/Add";
import type { GetAllResponse, GetResponse } from "../Types/General/Get";
import type { AddProductRequest } from "../Types/Product/Add";
import type { GetProductsRequest } from "../Types/Product/Get";
import type { ProductDTO } from "../Types/Product/Product";

export const ProductService = {
    get: async (id: number) => {
        return apiInstance
            .get<Promise<GetResponse<ProductDTO>>>(API_ENDPOINTS_CONSTANTS.PRODUCT.GET_SINGLE + `/${id}`)
            .then(response => response.data);
    },

    getAll: async (request: GetProductsRequest) => {
        return apiInstance
            .get<Promise<GetAllResponse<ProductDTO>>>(API_ENDPOINTS_CONSTANTS.PRODUCT.GET_MULTIPLE, { params: request })
            .then(response => response.data);
    },

    add: async (request: AddProductRequest) => {
        return apiInstance
            .post<Promise<AddResponse<ProductDTO>>>(API_ENDPOINTS_CONSTANTS.PRODUCT.POST_ADD, request)
            .then(response => response.data);
    }
}