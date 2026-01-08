import { useDropzone } from "react-dropzone";
import UploadIcon from "../../../Assets/uploadIcon";

interface InputImageProps{
    multiple: boolean;
    onImageUpload: (image: File) => void;

    placeholderUrl?: string;
}

function InputImage({multiple, onImageUpload, placeholderUrl}: InputImageProps) {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onFileDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"]
        },
        multiple: multiple
    });

    function onFileDrop(files: File[]){
        if(files.length <= 0) return;

        onImageUpload(files[0]);
    }

    return(
        <div {...getRootProps()}
            className="
                group
                flex justify-center items-center
                cursor-pointer
                w-75 h-75
                bg-flame
                rounded-3xl">
            <input {...getInputProps()}/>
            {placeholderUrl !== undefined
            ? (
                <img
                    src={placeholderUrl}
                    alt="Placeholder image"
                    className={[
                        isDragActive ? "opacity-75" : "",
                        "group-hover:opacity-75",
                        "transition duration-100",
                        "w-full h-full",
                        "object-cover",
                        "rounded-3xl"
                        ].join(" ")}/>
            )
            : (
                <UploadIcon
                    size={128}
                    className={[
                        isDragActive ? "scale-115 opacity-75" : "",
                        "group-hover:scale-115 group-hover:opacity-75",
                        "transition duration-100",
                        ].join(" ")}/>
            )}
        </div>
    );
}

export default InputImage;