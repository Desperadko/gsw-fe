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
                    else{
                        window.location.replace(ROUTES.LOGIN);
                    }
                    break;
                }
                default:
                    break;
            }
    
            let errorMessage = "An error occured";
            let fieldErrors: Record<string, string[]> | undefined;
    
            //scuffed way to determine which of the two error types is used
            //  (FluentValidation error or the API's custom error)
            if(data && isFluentValidationError(data)){
                errorMessage = data.title;
                fieldErrors = data.errors
            }
            else if(data && isCustomApiError(data)){
                errorMessage = data.message
                //skipping 'details' property for now
            }

            const applicationError = new Error(errorMessage) as ApplicationError
            applicationError.details = fieldErrors;
            applicationError.statusCode = status;

            return Promise.reject(applicationError);
        }
        
        return Promise.reject(new Error("Network error"));
    }
);

function isFluentValidationError(error: UnifiedError): error is FluentValidationError {
    return "traceId" in error;
}

function isCustomApiError(error: UnifiedError): error is ErrorResponse {
    return "message" in error;
}