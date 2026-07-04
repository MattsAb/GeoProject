import { useRef, useState } from "react";
import SimpleButton from "../components/SimpleButton";
import ErrorMessageComponent from "../components/ErrorMessageComponent";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/post.api";
import { useAuth } from "../context/AuthContext";
import CountryPicker from "../components/CountryPicker";

function CreatePost () {

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [description, setDescrition] = useState('');
    const [countryCode, setCountryCode] = useState('LT');
    const [preview, setPreview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const {user} = useAuth();

    async function handleSubmit() {
        if (!imageFile) {
            setErrorMessage("please upload an image");
            return;
        }
        
        const result = await createPost(description, imageFile, countryCode);

        if (result.success) {
            navigate(`/profile/${user?.id}`)
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        setImageFile(file)
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div className="w-full flex justify-center h-full">
            <div className="h-full lg:w-2/3 w-full flex justify-center px-10 border-x dark:border-mist-700">
                <div className="dark:bg-mist-800 w-full rounded-2xl p-10 flex flex-col gap-10 mt-10">
                    <h1 className="font-bold text-2xl"> Create your post </h1>
                        <div className="flex flex-col mt-10 gap-5">
                            <>
                                <input
                                    ref={fileInputRef}
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <button
                                    className="bg-blue-500 active:bg-blue-400 text-white py-3 self-start px-4 rounded-xl cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                > Upload image </button>
                                {imageFile && <img src={preview} className="w-full object-contain max-h-150 dark:bg-mist-900 bg-mist-200" />}
                            </>
                        </div>
                            <CountryPicker
                                onChange={e => {
                                    setCountryCode(e)
                                }}
                                value={countryCode}
                            />
                        <div>

                            <input
                                type=""
                            />

                        </div>

                        <div className="">
                            <h2 className="text-xl"> Description </h2>
                            <textarea 
                                placeholder="description"
                                rows={2} 
                                className="w-full p-3 border-b dark:border-mist-700 resize-none"
                                value={description}
                                onChange={e => setDescrition(e.target.value)}
                            />

                        </div>

                        <ErrorMessageComponent message={errorMessage}/>

                        <div className="flex self-end ">
                            <SimpleButton 
                                label="Create" 
                                onClick={() => handleSubmit()}
                                mode='artylic'
                            />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost