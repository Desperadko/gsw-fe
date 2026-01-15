import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { environment } from "./Environments/environment.dev";
import { SESSION_STORAGE_CONSTANTS } from "../Constants/SessionStorageConstants";
import type { ApplicationError, FluentValidationError, ErrorResponse, UnifiedError } from "../Types/Error";
import { AccountService } from "../Services/AccountService";
import { ROUTES } from "../Constants/RoutesConstants";

export const apiInstance = axios.create({
    baseURL: environment.url,
    headers: {
        "Content-type": "application/json"
    },
    paramsSerializer: (params) => serializeParams(params),
    timeout: 10_000
});

apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = sessionStorage.getItem(SESSION_STORAGE_CONSTANTS.JWT);

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (config) => { return config; },
    (error: AxiosError<UnifiedError>) => {
        if(error.response){
            const {status, data} = error.response;

            let generalErrorMessage = "An error occured";
            let apiFieldError: string | undefined;
            let validationFieldErrors: Record<string, string[]> | undefined;
    
            //scuffed way to determine which of the two error types is used
            //  (FluentValidation error or the API's custom error)
            if(data && isFluentValidationError(data)){
                generalErrorMessage = data.title;
                validationFieldErrors = data.errors;
            }
            else if(data && isCustomApiError(data)){
                generalErrorMessage = data.message;
                apiFieldError = data.field;
                //skipping 'details' property for now
            }

            const applicationError = new Error(generalErrorMessage) as ApplicationError
            applicationError.field = apiFieldError;
            applicationError.details = validationFieldErrors;
            applicationError.statusCode = status;
            
            switch(status){
                case 401: {
                    const token = sessionStorage.getItem(SESSION_STORAGE_CONSTANTS.JWT);
                    if(token){
                        AccountService.refresh({token})
                            .then(response => {
                                sessionStorage.setItem(SESSION_STORAGE_CONSTANTS.JWT, response.token);
                                window.location.replace(ROUTES.HOME);
                            })
                            .catch(() => {
                                window.location.replace(ROUTES.LOGIN);
                            })
                    }
                    else if(apiFieldError || validationFieldErrors){
                        return Promise.reject(applicationError);
                    }
                    else{
                        window.location.replace(ROUTES.LOGIN);
                    }
                    break;
                }
                default:
                    break;
            }

            return Promise.reject(applicationError);
        }
        
        return Promise.reject(new Error("Network error"));
    }
);

function isFluentValidationError(error: UnifiedError): error is FluentValidationError {
    return "traceId" in error;
}

function isCustomApiError(error: UnifiedError): error is ErrorResponse {
    return "message" in error && "field" in error;
}

function serializeParams(obj: Record<string, any>, prefix = ''): string {
    const parts: string[] = [];

    for (const key in obj) {
        if (obj[key] === undefined || obj[key] === null) continue;

        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (Array.isArray(obj[key])) {
            obj[key].forEach((val: any, i: number) => {
                parts.push(`${fullKey}[${i}]=${encodeURIComponent(val)}`);
            });
        } else if (typeof obj[key] === 'object') {
            parts.push(serializeParams(obj[key], fullKey));
        } else {
            parts.push(`${fullKey}=${encodeURIComponent(obj[key])}`);
        }
    }

    return parts.filter(Boolean).join('&');
}