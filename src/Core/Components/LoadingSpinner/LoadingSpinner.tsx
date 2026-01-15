function LoadingSpinner() {
    return (
        <div
            className="
            flex
            justify-center items-center
            h-screen">
            <div
                className="
                    w-64 h-64
                    border-16 border-timberwolf border-t-flame
                    rounded-full
                    animate-spin"
            />
        </div>
    )
}

export default LoadingSpinner;