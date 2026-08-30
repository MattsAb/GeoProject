import type { ComponentType } from 'react';

type SidebarButtonProps = {
    isOpen: boolean;
    handleRedirect: () => void;
    icon: ComponentType<{ className?: string }>;
    label: string;
}


function SimpleSidebarButton ({isOpen, handleRedirect, icon: Icon, label}: SidebarButtonProps) {
    
    return (
        <button 
            className={`dark:hover:bg-mist-800 hover:bg-mist-200 px-5 ${isOpen ? "py-2" : "py-5"} w-3/4 rounded-2xl cursor-pointer flex gap-3 items-center justify-center`}
            onClick={() => handleRedirect()}
        > 
            <Icon className='w-6 h-6'/>
            { isOpen && <h1 className=''>{label}</h1>}
        </button>
    )
}
export default SimpleSidebarButton