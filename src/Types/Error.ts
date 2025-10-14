export interface FluentValidationError {
    type: string;
    title: string;
    status: number;
    errors?: Record<string, string[]>;
    traceId: string;
}

export interface CustomApiError {
    error: string;
    details: string[];
}

export type ErrorResponse = FluentValidationError | CustomApiError;