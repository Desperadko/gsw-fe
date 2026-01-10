interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({ message } : ErrorMessageProps) {
    return(
        <p className="text-red-500 font-semibold">
            {message}
        </p>
    );
}

export default ErrorMessage;