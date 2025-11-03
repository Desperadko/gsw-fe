import { useState } from "react";
import type { ApplicationError } from "../Types/Error";

interface ErrorState {
    [fieldName: string]: string;
    general: string;
}

export function useErrorHandler(){
    const [errors, setErrors] = useState<ErrorState>({general: ''});

    function processError(error: ApplicationError, fieldNames?: string[]): void {
        const newErrors: ErrorState = { general: '' };

        if(fieldNames){
            fieldNames.forEach(fieldName => {
                newErrors[fieldName] = '';
            });
        }

        if(error.details){
            for(const [fieldName, messages] of Object.entries(error.details)){
                const field = fieldName.toLowerCase();
                if(!fieldNames || fieldNames.includes(field)){
                    newErrors[field] = messages[0];
                }
            }
        }
        else if(error.field){
            const field = error.field.toLowerCase();
            if(!fieldNames || fieldNames.includes(field)){
                newErrors[field] = error.message;
            }
            else{
                newErrors.general = error.message;
            }
        }
        else{
            newErrors.general = error.message;
        }

        setErrors(newErrors);
    }

    function clearErrors(fieldNames?: string[]){
        const clearedErrors: ErrorState = ({general: ""});
        if(fieldNames){
            fieldNames.forEach(field => {
                clearedErrors[field] = "";
            })
        }
        setErrors(clearedErrors);
    }

    return {
        errors,
        processError,
        clearErrors
    }
}