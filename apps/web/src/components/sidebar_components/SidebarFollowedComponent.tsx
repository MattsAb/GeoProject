import { BookmarkIcon } from "@heroicons/react/16/solid"
import { useNavigate } from "react-router-dom"
import type { Follow } from "@geoapp/types"

type SidebarFollowedProps = {
    isOpen: boolean
    follows: Follow[]
    handleRedirect: (id: number) => void
    onClose: () => void
}

function SidebarFollowedComponent ({isOpen, follows, handleRedirect, onClose}: SidebarFollowedProps) {

    const navigate = useNavigate();

    const goToFollowers = () => {
        navigate('/follows')
        onClose();
    }

    return (
        <>
            <button 
                className={`hover:dark:bg-mist-800 hover:bg-mist-200 darkhover:bg-mist-800 justify-center self-center py-5 ${ isOpen ? `w-full h-2` : 'w-3/4'} rounded-2xl cursor-pointer flex items-center gap-3`}
                onClick={() => goToFollowers()}
            > 
                <BookmarkIcon className='w-6 h-6'/>
                {isOpen && <h1 className="flex">People you follow</h1>}
            </button>

            { isOpen && <div className='mt-5 flex flex-col gap-3'>
                {follows && isOpen &&
                    follows.map((follow) => (
                        <button 
                            onClick={() => handleRedirect(follow.followedId)}
                            key={follow.id}
                            className='cursor-pointer flex gap-4 hover:dark:bg-mist-800 rounded-2xl p-1'
                        >
                            <img 
                                className='w-8 h-8 rounded-full'
                                src={follow.followed.avatarUrl}
                            />
                            <h1> {follow.followed.username} </h1>
                        </button>
                    ))
                }
            </div>}
        </>
    )
}

export default SidebarFollowedComponent