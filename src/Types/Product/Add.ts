export interface AddProductRequest {
    product: ProductAddDTO
}

export interface ProductAddDTO {
    name: string,
    description: string,
    releaseDate: Date,
    price: number,

    developersIds: number[],
    publishersIds: number[],
    genresIds: number[],
    platformsIds: number[]
}