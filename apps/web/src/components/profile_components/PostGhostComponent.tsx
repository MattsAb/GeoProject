
function PostGhostComponent (count: number) {

    return (
        <>
            {  Array.from({ length: count }).map((_, index) => (
                <div 
                    key={index}
                    className=" mb-4 rounded-lg  bg-gray-100  dark:bg-mist-900 flex-3" 
                />
            ))}
        </>
    )
}

export default PostGhostComponent;