
import { HomeIcon, HandThumbUpIcon} from '@heroicons/react/16/solid';

import { useNavigate } from 'react-router-dom';
import SimpleSidebarButton from './SimpleSidebarButton';
import { useAuth } from '../../context/AuthContext';

type sidebarProps = {
    isOpen: boolean
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: sidebarProps) {

    const {user, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const goToProfile = () => navigate(`/profile/${user?.id}`) 
    const goToLikedPosts = () => navigate(`/liked/`) 

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
                    
                </div>}



            </div>
        </>
    )

} 
export default Sidebar;