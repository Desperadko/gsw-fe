import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { environment } from "./Environments/environment.dev";
import { SESSION_STORAGE_CONSTANTS } from "../Constants/SessionStorageConstants";
import type { ErrorResponse } from "../Types/Error";

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
    (error: AxiosError<ErrorResponse>) => {
        if(error.response){
            const {status, data} = error.response;
            
            switch(status){
                case 401: {
                    sessionStorage.removeItem(SESSION_STORAGE_CONSTANTS.JWT);
                    window.location.replace("/login"); //TEMPORARY, TO BE CHANGED WITH PROPER ROUTE (account/login - routes constants?)
                }
            }
    
            let errorMessage = "An error occured";
            let fieldErrors: Record<string, string[]> | undefined;
    
            //scuffed way to determine which of the two error types is used
            //  (FluentValidation error or the API's custom error)
            if("traceId" in data){
                errorMessage = data.title;
                fieldErrors = data.errors
            }
            else if("error" in data){
                errorMessage = data.error
                //skipping 'details' property for now
            }

            const unifiedError = new Error(errorMessage) as Error & {
                fieldErrors?: Record<string, string[]>;
                statusCode?: number;
            };
            unifiedError.fieldErrors = fieldErrors;
            unifiedError.statusCode = status;

            return Promise.reject(unifiedError);
        }
        
        return Promise.reject(new Error("Network error"));
    }
);