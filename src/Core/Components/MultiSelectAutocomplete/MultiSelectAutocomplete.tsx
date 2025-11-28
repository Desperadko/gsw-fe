import { useState } from "react";
import type { BaseDTO } from "../../../Types/General/Base";

interface MultiSelectAutocompleteProps<T extends BaseDTO> {
    suggestions: T[];
    selectedIds: number[];
    onSelectionChange: (selected: number[]) => void;
    placeholder?: string;
}

function MultiSelectAutocomplete<T extends BaseDTO>({ suggestions, selectedIds, onSelectionChange, placeholder } : MultiSelectAutocompleteProps<T>) {
    const [input, setInput] = useState<string>("");
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const filteredSuggestions = suggestions.filter(item => 
        item.name.toLowerCase().includes(input.toLowerCase())
        && !selectedIds.includes(item.id)
    );

    const selectedItems = suggestions.filter(item => 
        selectedIds.includes(item.id)
    );

    function inputHandler(input: string) {
        setInput(input);
        setShowSuggestions(input.length > 0 && filteredSuggestions.length > 0);
    }

    function selectHandler(item: T) {
        const newSelectedIds = [item.id, ...selectedIds];
        onSelectionChange(newSelectedIds);
        setInput("");
        setShowSuggestions(false);
    }

    function removeHandler(item: T) {
        const newSelectedIds = selectedIds.filter(id => id !== item.id);
        onSelectionChange(newSelectedIds);
    }

    return(
        <div
            className="flex">
            <input
                type="text"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e.target.value)}
                onFocus={() => setShowSuggestions(input.length > 0 && filteredSuggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={placeholder}
                className="
                p-2"
            />

            {showSuggestions && (
                <div>
                    {filteredSuggestions.map(item => (
                        <button
                            key={item.id}
                            onClick={() => selectHandler(item)}>
                                {item.name}
                        </button>
                    ))}
                </div>
            )}

            {selectedItems && (
                <div>
                    {selectedItems.map(item => (
                        <span
                            key={item.id}
                            className="flex gap-1">
                            {item.name}
                            <button
                                onClick={() => removeHandler(item)}>
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiSelectAutocomplete;