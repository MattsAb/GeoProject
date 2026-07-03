
import { HomeIcon, HandThumbUpIcon} from '@heroicons/react/16/solid';

import { useNavigate } from 'react-router-dom';
import SimpleSidebarButton from './SimpleSidebarButton';

type sidebarProps = {
    isOpen: boolean
    onClose: () => void;
}


function Sidebar({ isOpen, onClose }: sidebarProps) {


    const navigate = useNavigate();

    const goToProfile = () => navigate(`/profile/1`) 
    const goToLikedPosts = () => navigate(`/liked/`) 

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 sm:hidden"
                    onClick={onClose}
                />
            )}

            <div className={`sticky top-0 h-screen pt-14 dark:bg-mist-900 ${isOpen ?`w-70` : `w-25 hidden sm:flex`} 
                z-40 dark:text-white  flex-col items-center gap-3 border-r  border-mist-700

                `}>
                {true /* add isAuthenticated */ && <div className='mt-5 items-center flex flex-col w-full'>

                    <div className='border-b border-mist-700 w-full flex flex-col justify-center items-center gap-3 pb-5'>
                        <SimpleSidebarButton
                            label='Your profile'
                            icon={HomeIcon}
                            handleRedirect={() => goToProfile()}
                            isOpen={isOpen}
                        />
                        <SimpleSidebarButton
                            label='Liked posts'
                            icon={HandThumbUpIcon}
                            handleRedirect={() => goToLikedPosts()}
                            isOpen={isOpen}
                        />
                    </div>
                    
                </div>}



            </div>
        </>
    )

} 
export default Sidebar;