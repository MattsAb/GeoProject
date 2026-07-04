import { useEffect, useRef, useState } from "react";
import SimpleButton from "../components/simple_components/SimpleButton";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import {  useNavigate, useParams } from "react-router-dom";
import type { Post } from "@geoapp/types";
import DeleteButton from "../components/simple_components/DeleteButton"
import { deletePost, editPost, getPost } from "../services/post.api";
import CountryPicker from "../components/simple_components/CountryPicker";

function EditPost () {

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [description, setDescrition] = useState('');
    const [preview, setPreview] = useState('');
    const [countryCode, setCountryCode] = useState('LT');
    const [postInfo, setPostInfo] = useState<Post>();
    const [errorMessage, setErrorMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const {id} = useParams();

        useEffect(() => {
            async function getInfo() {
                if (!id) {
                    return;
                }
                const result = await getPost(id);
                if (result.success && result.data) {
                    setPostInfo(result.data)
                    setDescrition(result.data.description)
                    setCountryCode(result.data.countryCode)
                } else if (result.error) {
                    setErrorMessage(result.error);
                }
            }
            getInfo();
        },[])

    async function handleEdit() {
        if (!id) return;
        const result = await editPost(id, countryCode, description, imageFile || undefined)
        if (result.success) {
            navigate(`/post/${id}`);
        } else if (result.error) {
            setErrorMessage(result.error);
        }
    }

    async function handleDelete() {
        if (!id) return;

        const result = await deletePost(id);
        if (result.success) {
            navigate(`/profile/${postInfo?.userId}`)
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
        <div className="flex w-full justify-center">

            <div className="dark:bg-mist-800 mx-5 w-full xl:w-2/3 rounded-2xl p-10 flex flex-col gap-10 mt-10">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-2xl"> Edit post </h1>
                    <DeleteButton 
                        label="Delete post"
                        onDelete={() => handleDelete()}
                    />
                </div>
                    {/* Post Image */}
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
                            > Change image </button>
                            {<img src={preview ? preview : postInfo?.photoUrl} className="w-full object-contain max-h-150 bg-mist-200 dark:bg-mist-900" />}
                        </>
                    </div>

                        {/* Country Picker */}
                        <CountryPicker
                            onChange={e => {
                                setCountryCode(e)
                            }}
                            value={countryCode}
                        />
                    <div>

                    {/* Post Description */}
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
                        <SimpleButton label="Edit post" onClick={() => handleEdit()} mode='brand'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPost