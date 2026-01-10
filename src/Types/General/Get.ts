import type { BaseDTO } from "./Base";

export interface GetResponse<T extends BaseDTO> {
    dto: T
}

export interface GetAllResponse<T extends BaseDTO> {
    dtos: T[]
}