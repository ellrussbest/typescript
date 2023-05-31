interface ChildProps {
    color: string;
    onClick: () => void;
    children: React.ReactNode;
}

export const Child = ({color, onClick, children}: ChildProps) => {
    return <div>
        {color}
        <button onClick={onClick}> {children} </button>
    </div>
}

export const ChildAsFC: React.FC<ChildProps> = ({color, onClick, children}) => {
    return <div>
        {color}
        <button onClick={onClick}> {children} </button>
    </div>
}