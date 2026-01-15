import { useState } from "react";
import type { BaseWithIdAndNameDTO } from "../../../Types/General/Base";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface InputItemProps{
    onSubmit: (name: string) => void;
    isSubmitting?: boolean;
    onSubmitError?: string;
    items?: BaseWithIdAndNameDTO[];
    placeholder?: string;
}

function InputItem({ onSubmit, isSubmitting = false, onSubmitError, items, placeholder }: InputItemProps) {
    const [value, setValue] = useState<string>("");
    
    function handleSubmit(name: string){
      onSubmit(name);
    }

    return(
        <div
          className="
          flex flex-col
          gap-5
          w-full">
          <div
            className="flex gap-5">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="border-b-1 p-2"
            />
            <button
              onClick={() => handleSubmit(value)}
              className="
              hover:text-flame
              transition-colors duration-100">
                {isSubmitting && isSubmitting
                  ? "Submitting.."
                  : "Submit"
                }
            </button>
          </div>
          {onSubmitError && (
            <ErrorMessage
              message={onSubmitError}/>
          )}
          {items && (
            <div className="flex flex-wrap gap-2 max-w-full">
              {items.map((item) => (
                <span
                  key={item.id}
                  className="
                    text-sm
                    whitespace-nowrap">
                    {item.name}
                </span>
              ))}
            </div>
            )}
        </div>
    )
}

export default InputItem;