import { useEffect, useRef } from "react";

export function useAutoExpandingTextarea(value: string, maxHeightRem?: number) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textArea = textAreaRef.current;

        if(textArea){
            textArea.style.height = "auto";

            let newHeight = textArea.scrollHeight;

            if(maxHeightRem){
                const maxHeightPx = maxHeightRem * 16;
                
                newHeight = Math.min(textArea.scrollHeight, maxHeightPx);
            }

            textArea.style.height = `${newHeight}px`;
        }
    }, [value, maxHeightRem])

    return textAreaRef;
}