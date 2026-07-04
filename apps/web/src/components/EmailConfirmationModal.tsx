import { useState } from "react";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { useAuth } from "../context/AuthContext";
import { confirmEmail } from "../services/auth.api";

type EmailConfirmModalProps = {
    onClose: () => void
    email: string
    password: string
}

function EmailConfirmationModal({onClose, email, password}: EmailConfirmModalProps) {

    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const {loginUser} = useAuth();

    async function handleConfirm() {
        
        const result = await confirmEmail(code, email, password);

        if (result.success && result.data) {
            loginUser(result.data.idToken, result.data.user);
            onClose();
            window.location.reload();
        } else if (result.error) {
            setErrorMessage(errorMessage);
        }

    }

    async function handleResend () {

    }

    if (!open) return null


    return (
        <div className=" dark:bg-mist-900 bg-gray-50 mx-4 rounded-xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold"> Confirm Email </h2>
                <button 
                className="rounded-full dark:bg-mist-800 px-2 cursor-pointer"
                onClick={onClose}
                > x </button>
            </div>
            <input
                    type="text"
                    placeholder="Verification code..."
                    value={code}
                    onChange={(v) => setCode(v.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-3 dark:border-slate-700" 
                />


            <ErrorMessageComponent message={errorMessage}/>
            
            <button 
            className="text-blue-400 active:text-blue-300 mb-4 cursor-pointer"
            onClick={() => handleResend()}
            >
                Resend Code
            </button>

            <button 
                className="w-full bg-sky-500 active:bg-sky-400 text-white py-2 rounded-lg font-medium cursor-pointer"
                onClick={() => handleConfirm()}
            >
                Confirm Email
            </button>
        </div>
    )
}

export default EmailConfirmationModal