export interface BaseDTO {}

export interface BaseWithIdAndNameDTO extends BaseDTO {
    id: number;
    name: string;
}