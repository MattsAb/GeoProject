import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import SimpleButton from "../components/simple_components/SimpleButton";
import { createTrip } from "@geoapp/services";


function CreateTripPage () {

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [title, setTitle] = useState('');
    const [description, setDescrition] = useState('');
    const [preview, setPreview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        setImageFile(file)
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    async function handleTrip() {
        if (!title || !imageFile) {
            setErrorMessage("please provide a title and an image");
            return;
        }

        const result = await createTrip(title, imageFile, description);
        if (result.success && result.data) {
            navigate(`/trip/${result.data.id}`)
        } else if (result.error) {
            setErrorMessage(result.error)
        }

    }

    return (
        <div className="w-full flex justify-center">
            <div className="h-full md:w-2/3 xl:w-1/2 w-full flex justify-center px-5">
                <div className="dark:bg-mist-800 w-full rounded-2xl p-10 flex flex-col gap-10 mt-10">
                    <h1 className="font-bold text-2xl"> Create your trip </h1>
                    {/* Trip Image */}
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

                    <div>
                        <h2 className="text-xl"> Title </h2>
                        <input
                            className="w-full p-3 border-b dark:border-mist-700 resize-none"
                            placeholder="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    {/* Trip Description */}
                    <div>
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
                                onClick={() => handleTrip()}
                                mode='brand'
                            />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTripPage