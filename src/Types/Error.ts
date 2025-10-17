export interface FluentValidationError {
    type: string;
    title: string;
    status: number;
    errors?: Record<string, string[]>;
    traceId: string;
}

export interface ErrorResponse {
    message: string;
    details?: string[];
}

//type that represents both interfaces
export type UnifiedError = FluentValidationError | ErrorResponse;

export interface ApplicationError extends Error {
    details?: Record<string, string[]>;
    statusCode: number;
}