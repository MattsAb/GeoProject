import { useState } from "react"
import SignInModal from "./SignInModal"
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/16/solid';
import HeaderOptionsComponent from "./HeaderOptionsComponent";

type headerProps = {
    setSidebarOpen: (stage: boolean) => void;
    isOpen: boolean;
}

function Header({setSidebarOpen, isOpen}: headerProps) {

    const [signInOpen, setSignInOpen] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [toggleSearch, setToggleSearch] = useState(false);
    
    const navigate = useNavigate();

    const goBack = () => navigate('/');
    const goToCreate = () => navigate('/create');
    const goToSearch = () => navigate(`/search?q=${searchInput}`);

    const handleSearchClick = () => {
        const isSmallScreen = window.matchMedia('(max-width: 640px)').matches; // adjust breakpoint to match your Tailwind config
        if (isSmallScreen) {
            setToggleSearch(true);
            setSidebarOpen(false);
        } else {
            goToSearch();
        }
    };

    if (toggleSearch) return (
        <div className="fixed left-0 right-0 text-black dark:text-white dark:bg-mist-900 bg-gray-50 h-14 flex z-50 border-b border-mist-700">
            <div className="px-5 flex w-full gap-2 items-center">
                <button 
                    className="hover:bg-mist-200 dark:hover:bg-mist-700 w-10 h-10 rounded-full p-1 items-center cursor-pointer"
                    onClick={() => setToggleSearch(false)}
                >
                    <ArrowLeftIcon/>
                </button>
                <input className="border dark:border-mist-800 border-mist-300 bg-white dark:bg-mist-900 w-full h-10 items-center rounded-3xl px-5"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
        </div>
    )

  return (
    <div className="fixed left-0 right-0 text-black dark:text-white dark:bg-mist-900 bg-gray-50 h-14 flex z-50 border-b border-mist-700">
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

        <div className="flex w-full items-center justify-center">

            <input className="border dark:border-mist-800 sm:flex hidden border-mist-300 bg-white dark:bg-mist-900 w-full h-10 items-center rounded-3xl px-5"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <button 
                className="ml-2 hover:cursor-pointer items-center dark:border p-2 rounded-full border-mist-800 hover:dark:bg-mist-800 hover:bg-gray-200"
                onClick={() => handleSearchClick()}
            > 
                <MagnifyingGlassIcon className="h-6 w-6"/>
            </button>
        </div>

        <div className="flex w-full items-center justify-end mr-5 gap-5">

            
            { true? ( <button  //add isAuthenticaded
                className="font-bold cursor-pointer"
                onClick={() => setSignInOpen(true)}
            > Sign In </button> ) : (
            <> 
                <button
                    className="font-bold cursor-pointer text-white bg-orange-600 hover:bg-orange-500 px-3 py-1 rounded-2xl flex gap-2 items-center" 
                    onClick={() => goToCreate()}
                >  
                        <h1> Create  </h1>
                        <PlusIcon className="w-6 h-6"/>
                </button>

                <button className="rounded-full bg-white items-center cursor-pointer"
                    onClick={() => {
                        setOpenOptions(!openOptions)
                    }}
                    data-testid="userAvatar"
                >
                    {/*<img src={user?.avatarUrl ? user.avatarUrl : defaultICon} className="rounded-full w-10 h-10"/>*/}
                </button>

                <HeaderOptionsComponent
                    onClose={() => setOpenOptions(false)}
                    open={openOptions}
                />
            </>
            )}
        </div>
            <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)}/>
    </div>
  )

}

export default Header