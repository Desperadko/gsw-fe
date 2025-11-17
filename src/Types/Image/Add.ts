export interface AddImageRequest {
    image: ImageAddDTO
}

export interface ImageAddDTO {
    productId: number,
    image: File
}