import type { ReactElement } from "react"


type ComponentLoaderProps = {
    isLoaded: boolean
    collumNum: {
        smallNum: number,
        mediumNum: number,
        largeNum: number
    }
    GhostComponent: ReactElement
    LoadedComponent: ReactElement
}


function ComponentLoader({isLoaded ,collumNum, GhostComponent, LoadedComponent}: ComponentLoaderProps) {

    const gridMap = {
        small: `grid-cols-${collumNum.smallNum}`,
        medium: `grid-cols-${collumNum.mediumNum}`,
        large: `grid-cols-${collumNum.largeNum}`,
    }

    return (
        <div className={`grid ${gridMap.small} ${gridMap.medium} ${gridMap.large}`}>
            {isLoaded ? LoadedComponent : GhostComponent}
        </div>
    )
}

export default ComponentLoader