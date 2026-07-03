

type ErrorMessageProps = {
    message: string,
}


function ErrorMessageComponent ({message}: ErrorMessageProps) {
    if (message == '') return null;

    return (
        <div 
            data-testId='errorMessage'
            className="text-red-500">
            <p> {message} </p>
        </div>
    )
}

export default ErrorMessageComponent