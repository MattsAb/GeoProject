import { useState } from "react"

type PostSelectComponentProps = {
    photoUrl: string
    countryCode: string
    selected: boolean
    onSelect: () => void
}

function PostSelectComponent ({photoUrl, countryCode, selected, onSelect}: PostSelectComponentProps) {


    return (
        
        <button 
            className={`mb-4 rounded-lg p-2 bg-gray-100 ${selected ? "dark:bg-green-900" :"dark:bg-mist-900"} flex-3 cursor-pointer overflow-hidden relative group
            transition-colors duration-100 ease-in-out`}
        onClick={onSelect}
        >
            <div>
                <img src={photoUrl} className="w-full h-75 object-cover" />
            </div>

            <div className="absolute top-3 left-3"> 
                <span className={`fi fi-${countryCode.toLowerCase()}` }></span>
            </div>

            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"/>
        </button>
    )
}

export default PostSelectComponent;