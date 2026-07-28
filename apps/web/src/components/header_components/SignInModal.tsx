import { useState } from "react";
import ErrorMessageComponent from "../simple_components/ErrorMessageComponent";
import { login, register } from "../../../../../packages/services/src/lib/auth.api";
import { useAuth } from "../../context/AuthContext";

type SignInModalProps = {
    onClose: () => void;
    setConfirm: () => void;
    email: string;
    password: string;
    username: string;
    setEmail: (userEmail: string) => void;
    setPassword: (userPassword: string) => void;
    setUsername: (userUsername: string) => void;

}

function SignInModal({onClose, setConfirm, email, password, username, setEmail, setPassword, setUsername}: SignInModalProps) {
    const [isSigned, setIsSigned] = useState(true);
    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
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
            window.location.reload();
        } else if (result.error) {
            setErrorMessage(result.error);
        }

    }

    if (!open) return null


    return (
        <div className=" dark:bg-mist-900 bg-gray-50 rounded-xl mx-4 p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{isSigned ? "Log in" : "Sign in"}</h2>
                <button 
                className="rounded-full dark:bg-mist-800 px-2 cursor-pointer"
                onClick={onClose}
                > x </button>
            </div>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(v) => setEmail(v.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-3 border-slate-700"
            />

            {
                !isSigned && <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(v) => setUsername(v.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-3 dark:border-slate-700" 
                />
            }
            <div className="flex flex-col">
                <input
                    type={passwordType}
                    placeholder="Password"
                    value={password}
                    onChange={(v) => setPassword(v.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-6 border-slate-700" 
                />
                <div className="flex gap-2 items-center">
                    <input
                        className="cursor-pointer"
                        type="checkbox"
                        value={passwordType}
                        onChange={(c) => setPasswordType(c.target.value === 'password' ? 'text' : 'password')}
                    />
                    <p> Show Password </p>
                </div>
            </div>
            <ErrorMessageComponent message={errorMessage}/>
            
            <button 
            className="text-blue-400 active:text-blue-300 mb-4 cursor-pointer mt-2"
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
    )
}

export default SignInModal