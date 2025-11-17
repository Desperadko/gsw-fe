import type { BaseDTO } from "./Base";

export interface GetResponse<T extends BaseDTO> {
    DTO: T
}

export interface GetAllResponse<T extends BaseDTO> {
    DTOs: T[]
}