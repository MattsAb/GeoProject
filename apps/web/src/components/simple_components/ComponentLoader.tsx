import type { ReactElement } from "react"


type ComponentLoaderProps = {
    isLoaded: boolean;
    gapSize: number;
    columnNum: {
        small: number;
        medium: number;
        large: number;
    };
    ghostComponent: ReactElement;
    ghostCount: number;
    loadedComponent: ReactElement;
};

const smallColsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
};

const mediumColsMap: Record<number, string> = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
};

const largeColsMap: Record<number, string> = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
};

const gapMap: Record<number, string> = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5'
}


function ComponentLoader({isLoaded,gapSize ,columnNum, ghostComponent, ghostCount, loadedComponent}: ComponentLoaderProps) {

    const gridClasses = [
        smallColsMap[columnNum.small] ?? 'grid-cols-1',
        mediumColsMap[columnNum.medium] ?? 'md:grid-cols-2',
        largeColsMap[columnNum.large] ?? 'lg:grid-cols-3',
    ].join(' ');

    const gap = gapMap[gapSize ?? "gap-0"]

    return (
        <div className={`grid ${gridClasses} ${gap}`}>
            {isLoaded ? loadedComponent : 
            Array.from({ length: ghostCount }, (_, i) => (
                      <div key={i}>{ghostComponent}</div>
                  ))
            }
        </div>
    )
}

export default ComponentLoader