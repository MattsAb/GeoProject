import { useState } from "react";
import EmailConfirmationModal from "./EmailConfirmationModal"
import SignInModal from "./SignInModal"

type SignInModalProps = {
    open: boolean;
    onClose: () => void;
}

function AuthModal({open, onClose}: SignInModalProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState(false);

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            {!confirm ? 
                (<SignInModal 
                    onClose={() => onClose()}
                    setConfirm={() => setConfirm(true)}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />) :

                (<EmailConfirmationModal
                    onClose={() => onClose()}
                    password={password}
                    email={email}
                />)
            }


        </div>
    )
}

export default AuthModal