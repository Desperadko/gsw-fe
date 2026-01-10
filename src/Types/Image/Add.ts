export interface AddDefaultImageRequest {
    productId: number;
}

export interface AddImageRequest {
    image: ImageAddDTO
}

export interface ImageAddDTO {
    productId: number,
    imageData: File
}
