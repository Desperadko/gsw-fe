import type { BaseDTO } from "../General/Base";

export interface AccountDTO extends BaseDTO {
    username: string;
    email: string;
    role: string;
}