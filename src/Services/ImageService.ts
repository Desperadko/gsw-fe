import { apiInstance } from "../Axios/apiInstance"
import { API_ENDPOINTS_CONSTANTS } from "../Constants/APIEndpointsConstants"
import type { AddResponse } from "../Types/General/Add";
import type { AddDefaultImageRequest, AddImageRequest } from "../Types/Image/Add";
import type { ImageMetaDTO } from "../Types/Image/Image";

export const ImageService = {
    get: async (fileName: string) => {
        return apiInstance
            .get<Promise<Blob>>(API_ENDPOINTS_CONSTANTS.IMAGE.GET_SINGLE, { params: { fileName } })
            .then(response => response.data);
    },

    add: async (request: AddImageRequest) => {
        const formData = new FormData();
        formData.append("Image.ProductId", request.image.productId.toString());
        formData.append("Image.ImageData", request.image.imageData);

        return apiInstance
            .post<Promise<AddResponse<ImageMetaDTO>>>(API_ENDPOINTS_CONSTANTS.IMAGE.POST_ADD, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data);
    },

    addDefault: async (request: AddDefaultImageRequest) => {
        const formData = new FormData();
        formData.append("ProductId", request.productId.toString());

        return apiInstance
            .post<Promise<AddResponse<ImageMetaDTO>>>(API_ENDPOINTS_CONSTANTS.IMAGE.POST_ADD_DEFAULT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data);
    }
}