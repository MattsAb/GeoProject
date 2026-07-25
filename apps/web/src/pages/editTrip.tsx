import { deleteTrip, editTrip, getTripInfo, getUserPosts } from "@geoapp/services";
import type { Post, Trip } from "@geoapp/types";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../components/simple_components/DeleteButton";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import SimpleButton from "../components/simple_components/SimpleButton";
import PostSelectComponent from "../components/trip_components/post_select_component";

function EditTrip () {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [description, setDescrition] = useState('');
    const [preview, setPreview] = useState('');
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState<Post[]>()
    const [chosenPosts, setChosenPosts] = useState<Post[]>()
    const [tripInfo, setTripInfo] = useState<Trip>();
    const [errorMessage, setErrorMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const {id} = useParams();

        useEffect(() => {
            async function getInfo() {
                if (!id) {
                    return;
                }
                const result = await getTripInfo(id);
                if (result.success && result.data) {
                    setTripInfo(result.data)
                    setTitle(result.data.title)
                    setDescrition(result.data.description)     
                } else if (result.error) {
                    setErrorMessage(result.error);
                }
            }
            getInfo();
        },[])

    async function handleEdit() {
        if (!id) return;
        const result = await editTrip(id, description, title, chosenPosts || undefined, imageFile || undefined)
        if (result.success) {
            navigate(`/trip/${id}`);
        } else if (result.error) {
            setErrorMessage(result.error);
        }
    }

    async function handleDelete() {
        if (!id) return;

        const result = await deleteTrip(id);
        if (result.success) {
            navigate(`/profile/${tripInfo?.userId}`)
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    async function openPosts() {
        const result = await getUserPosts()
        if (result.success && result.data) {
            setChosenPosts(tripInfo?.posts)
            setPosts(result.data)
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
                            {<img src={preview ? preview : tripInfo?.photoUrl} className="w-full object-contain max-h-150 bg-mist-200 dark:bg-mist-900" />}
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

                    <div>
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


                    <div className="flex self-end ">
                        <SimpleButton label="Add posts" onClick={() => openPosts()}/>
                    </div>
                    { posts && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        
                            {posts.map((post) => (
                                <PostSelectComponent
                                key={post.id}
                                selected={chosenPosts?.some((p) => p.id === post.id) || false}
                                photoUrl={post.photoUrl}
                                countryCode={post.countryCode}
                                onSelect={() => {
                                    setChosenPosts((prev) => {
                                        const current = prev ?? [];
                                        const alreadySelected = current.some((p) => p.id === post.id);

                                        if (alreadySelected) {
                                            return current.filter((p) => p.id !== post.id);
                                        } else {
                                            return [...current, post];
                                        }
                                    });
                                }}
                                />
                        ))}
                    </div>} 

                    <ErrorMessageComponent message={errorMessage}/>

                    <div className="flex self-end ">
                        <SimpleButton label="Edit post" onClick={() => handleEdit()} mode='brand'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTrip