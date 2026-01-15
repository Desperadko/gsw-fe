import type { PaginationDTO, SortDTO } from "../General/Get";

export interface GetProductRequest {
    id: number
}

export interface GetProductsRequest {
    filter?: ProductFilterDTO;
    sort?: ProductSortDTO;
    pagination?: PaginationDTO;
}

export interface ProductFilterDTO {
    developersIds?: number[];
    publishersIds?: number[];
    genresIds?: number[];
    platformsIds?: number[];
    maxPrice?: number;
    minPrice?: number;
}

export interface ProductSortDTO extends SortDTO {
    sortBy?: "name" | "releasedate" | "price";
}