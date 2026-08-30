
import { HomeIcon, HandThumbUpIcon} from '@heroicons/react/16/solid';

import { useNavigate } from 'react-router-dom';
import SimpleSidebarButton from './SimpleSidebarButton';
import { useAuth } from '../../context/AuthContext';
import SidebarFollowedComponent from './SidebarFollowedComponent';
import { useEffect, useState } from 'react';
import { getFollows } from '@geoapp/services';
import type { Follow } from '@geoapp/types';

type sidebarProps = {
    isOpen: boolean
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: sidebarProps) {

    const [follows, setFollows] = useState<Follow[]>();

    const {user, isAuthenticated} = useAuth();
    const navigate = useNavigate();

        useEffect(() => {
        async function fetchFollows() {
            if (!user?.id) {
                setFollows(undefined)
                return;
            }
            const result = await getFollows(`${user.id}`)

            if(result.success && result.data)
            {
                setFollows(result.data);
            }
        }
        fetchFollows();
    },[user?.id])

    const goToProfile = () => navigate(`/profile/${user?.id}`) 
    const goToLikedPosts = () => navigate(`/liked/`)
    const goToFollow = (id: number) => {
        navigate(`/profile/${id}`)
        onClose();
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

                <div className={`
                    ${isOpen ? 'fixed' : 'hidden'}
                    lg:flex lg:sticky lg:top-0 z-40 ${isOpen ? 'w-70' : 'sm:w-25'}
                    h-screen pt-14 dark:bg-mist-900 dark:text-white flex-col items-center gap-3 border-r border-mist-700
                `}>
                { isAuthenticated && <div className='mt-5 items-center flex flex-col w-full'>

                    <div className='border-b border-mist-700 w-full flex flex-col justify-center items-center gap-3 pb-5'>
                        <SimpleSidebarButton
                            label='Your profile'
                            icon={HomeIcon}
                            handleRedirect={() => {
                                goToProfile()
                                onClose()
                            }}
                            isOpen={isOpen}
                        />
                        <SimpleSidebarButton
                            label='Liked posts'
                            icon={HandThumbUpIcon}
                            handleRedirect={() => {
                                goToLikedPosts()
                                onClose()
                            }}
                            isOpen={isOpen}
                        />
                    </div>

                    <div className={`${isOpen ? 'p-5' : 'py-5'} w-full flex justify-baseline flex-col border-b dark:border-mist-700`}>
                        <SidebarFollowedComponent
                            isOpen={isOpen}
                            follows={follows ? follows : []}
                            handleRedirect={(id) => goToFollow(id)}
                            onClose={onClose}
                        />
                    </div>
                    
                </div>}



            </div>
        </>
    )

} 
export default Sidebar;