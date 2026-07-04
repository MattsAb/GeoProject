import { useEffect, useRef, useState } from "react"
import type { ProfileType } from "@geoapp/types";
import SimpleButton from "../components/simple_components/SimpleButton";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteUser, editUserProfile, getUserProfile } from "@geoapp/services";
import DeleteButton from "../components/simple_components/DeleteButton";


function EditProfile () {
    const [profile, setProfile] = useState<ProfileType>();
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [preview, setPreview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {user, setUser, logout} = useAuth();
    const navigate = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {

        async function getUserInfo() {
            if (!user?.id) return;

            const result = await getUserProfile(`${user?.id}`);

            if (result.success && result.data) {
                setProfile(result.data);
                setAvatar(result.data.avatarUrl);
                setBio(result.data.bio || '');
            } else if (result.error) {
                setErrorMessage(result.error);
            }
        }
        getUserInfo()
    },[])

    async function handleEdit() {
        const result = await editUserProfile(bio, imageFile ?? undefined)

        if (result.success && result.data) {
            setUser(result.data);
            navigate(`/profile/${user?.id}`);
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    async function handleDelete() {
        const result = await deleteUser();

        if (result.success) {
            logout();
            window.location.reload();
            navigate('/');
        } else {
            setErrorMessage(errorMessage);
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
        <div className="w-full h-full justify-center flex items-center">
            <div className=" w-3/4 h-full lg:px-10">
                <div className="dark:bg-mist-800 justify-center flex mt-20 flex-col gap-5 p-10 rounded-xl">

                    {/* Avatar Image */}
                    <div className="flex gap-5 items-center">

                        <img className="w-25 h-25 rounded-full" src={preview ? preview : avatar}/>

                        <input
                            ref={fileInputRef}
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl font-bold"> {profile?.username} </h1>
                            <SimpleButton label="Change Avatar" onClick={() => fileInputRef.current?.click()}/>
                        </div>

                    </div>

                    {/* Bio */}
                    <textarea 
                        placeholder="description"
                        rows={2} 
                        className="w-full p-3 border-b dark:border-mist-700 resize-none"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    />

                    <ErrorMessageComponent message={errorMessage}/>

                    <div className="flex self-end">
                        <SimpleButton label="Update" onClick={() => handleEdit()} mode='brand'/>
                    </div>

                    <div className="self-end w-full">
                        <DeleteButton 
                            label="Delete Account"
                            onDelete={() => handleDelete()}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditProfile