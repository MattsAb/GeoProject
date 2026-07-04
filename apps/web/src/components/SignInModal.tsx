import { useState } from "react";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { login, register } from "../services/auth.api";
import { useAuth } from "../context/AuthContext";

type SignInModalProps = {
    onClose: () => void;
    setConfirm: () => void;
    email: string;
    password: string;
    setEmail: (userEmail: string) => void;
    setPassword: (userPassword: string) => void;

}

function SignInModal({onClose, setConfirm, email, password, setEmail, setPassword}: SignInModalProps) {
    const [username, setUsername] = useState('');
    const [isSigned, setIsSigned] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const {loginUser} = useAuth();

    async function handleSginUp () {

        const result = await register({email, username, password});

        if (result.success) {
            setConfirm();
        } else if (result.error) {
            setErrorMessage(result.error);
        }

    }

    async function handleLogin () {

        const result = await login({email, password});

        if (result.success && result.data) {
            setEmail("");
            setPassword("");
            setUsername("");
            loginUser(result.data?.idToken, result.data?.user);
            onClose();
        } else if (result.error) {
            setErrorMessage(result.error);
        }

    }

    if (!open) return null


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className=" dark:bg-mist-900 bg-gray-50 rounded-xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{isSigned ? "Log in" : "Sign in"}</h2>
                <button 
                className="rounded-full dark:bg-mist-800 px-2 cursor-pointer"
                onClick={onClose}
                > x </button>
            </div>

            {
                !isSigned && <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(v) => setUsername(v.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-3 dark:border-slate-700" 
                />
            }

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(v) => setEmail(v.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-3 border-slate-700"
            />
            
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(v) => setPassword(v.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-6 border-slate-700" 
            />

            <ErrorMessageComponent message={errorMessage}/>
            
            <button 
            className="text-blue-400 active:text-blue-300 mb-4 cursor-pointer"
            onClick={() => setIsSigned(!isSigned)}
            >
                {isSigned ? "Don't have an account?" : "Already have an account?"}
            </button>
            <button 
                className="w-full bg-sky-500 active:bg-sky-400 text-white py-2 rounded-lg font-medium cursor-pointer"
                onClick={() => {     
                    if (isSigned) {
                        handleLogin()
                    } else {handleSginUp()}  
                }}
            >
                {isSigned ? "Log in" : "Sign in"}
            </button>
        </div>
        </div>
    )
}

export default SignInModal