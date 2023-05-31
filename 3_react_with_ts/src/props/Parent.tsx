import { Child, ChildAsFC } from "./Child";

const Parent = () => {
    return <>
    <Child color="black" onClick={() => console.log('clicked')} > aaa </Child>

    <ChildAsFC color="black" onClick={() => console.log('clicked')} > 
        aaa
    </ChildAsFC>
    </>
}

export default Parent;