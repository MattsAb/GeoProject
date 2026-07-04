import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/16/solid';
import HeaderOptionsComponent from "./HeaderOptionsComponent";
import { useAuth } from "../../context/AuthContext";

import AuthModal from "./AuthModal";
import { useIsSmallScreen } from "../../hooks/screenSizeHook";

type headerProps = {
    setSidebarOpen: (stage: boolean) => void;
    isOpen: boolean;
}

function Header({setSidebarOpen, isOpen}: headerProps) {

    const [authOpen, setAuthOpen] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [toggleSearch, setToggleSearch] = useState(false);
    
    const navigate = useNavigate();

    const {isAuthenticated,user} = useAuth();
    const isSmallScreen = useIsSmallScreen();

    const iconRef = useRef<HTMLButtonElement>(null);

    const goBack = () => navigate('/');
    const goToCreate = () => navigate('/create');
    const goToSearch = () => navigate(`/search?q=${searchInput}`);

    const handleSearchClick = () => {

        if (isSmallScreen) {
            setToggleSearch(true);
            setSidebarOpen(false);
        } else {
            goToSearch();
        }
    };

    //Search on small Screen
    if (toggleSearch && isSmallScreen) return (
        <div className="fixed left-0 right-0 text-black dark:text-white dark:bg-mist-900 bg-gray-50 h-14 flex z-50 border-b border-mist-700">
            <div className="px-5 flex w-full gap-2 items-center">
                <button 
                    className="hover:bg-mist-200 dark:hover:bg-mist-700 w-12 h-10 rounded-full p-1 flex justify-center items-center cursor-pointer"
                    onClick={() => setToggleSearch(false)}
                >
                    <ArrowLeftIcon className="h-6 w-6"/>
                </button>

                <input className="border dark:border-mist-800 border-mist-300 bg-white dark:bg-mist-900 w-full h-10 items-center rounded-3xl px-5"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                <button 
                    className="hover:bg-mist-200 dark:hover:bg-mist-700 w-12 h-10 rounded-full p-1 flex justify-center items-center cursor-pointer"
                    onClick={() => goToSearch()}
                > 
                    <MagnifyingGlassIcon className="h-6 w-6"/>
                </button>
            </div>
        </div>
    )

  return (
    <div className="fixed left-0 right-0 text-black dark:text-white dark:bg-mist-900 bg-gray-50 h-14 flex z-50 border-b border-mist-700">
        {/* Left side */}
        <div className="flex w-full items-center ml-5 gap-4">
            <button 
                className="hover:bg-mist-200 dark:hover:bg-mist-700 w-10 h-10 rounded-full p-1 items-center cursor-pointer"
                onClick={() => setSidebarOpen(!isOpen)}
            >
                <Bars3Icon/>
            </button>
            <button 
            className="font-bold text-2xl cursor-pointer border-b-2 border-orange-500 rounded-xs" 
            onClick={() => goBack()}
            > Geoapp </button>
        </div> 

        {/* Search */}
        <div className="flex w-full items-center justify-center">

            <input className="border dark:border-mist-800 sm:flex hidden border-mist-300 bg-white dark:bg-mist-900 w-full h-10 items-center rounded-3xl px-5"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <button 
                className=" hover:cursor-pointer items-center dark:border p-2 rounded-full border-mist-800 hover:dark:bg-mist-800 hover:bg-gray-200"
                onClick={() => handleSearchClick()}
            > 
                <MagnifyingGlassIcon className="h-6 w-6"/>
            </button>
        </div>

        {/* Right side */}
        <div className="flex w-full items-center justify-end mr-5 gap-5">

            
            { !isAuthenticated ? ( <button
                className="font-bold cursor-pointer"
                onClick={() => setAuthOpen(true)}
            > Sign In </button> ) : (
            <> 
                <button
                    className="font-semibold cursor-pointer text-black dark:text-white outline-1 outline-orange-600  hover:bg-orange-600 px-1 py-1 rounded-2xl flex items-center" 
                    onClick={() => goToCreate()}
                >  
                        <PlusIcon className="w-6 h-6"/>
                        { !isSmallScreen  && <h1 className="mr-1">Create</h1>}
                </button>

                <button className="rounded-full bg-white items-center cursor-pointer"
                    ref={iconRef}
                    onClick={() => setOpenOptions((prev) => !prev)}
                >
                    { user && <img src={user.avatarUrl} className="rounded-full w-10 h-10"/>}
                </button>

                <HeaderOptionsComponent
                    iconRef={iconRef}
                    onClose={() => setOpenOptions(false)}
                    open={openOptions}
                />
            </>
            )}
        </div>
            <AuthModal
                onClose={() => setAuthOpen(false)}
                open={authOpen}
            />
    </div>
  )

}

export default Header