import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageInputProps{
    multiple: boolean,
}

function ImageInput(props: ImageInputProps) {
    const [image, setImage] = useState<File | undefined>(undefined);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onFileDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"]
        },
        multiple: props.multiple
    });

    function onFileDrop(files: File[]){
        if(files.length <= 0) return;

        setImage(files[0]);
    }

    return(
        <div {...getRootProps()} className="cursor-pointer w-75 h-75 bg-flame rounded-3xl">
            <input {...getInputProps()}/>
        </div>
    );
}

export default ImageInput;