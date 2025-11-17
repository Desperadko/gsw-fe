import type { BaseDTO } from "./Base";

export interface AddResponse<T extends BaseDTO> {
    DTO: T
}