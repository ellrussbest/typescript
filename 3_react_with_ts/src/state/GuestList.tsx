import {useRef, useState} from 'react'

const GuestList: React.FC = () => {
    const [name, setName] = useState('')
    const [guests, setGuests] = useState<string[]>([]);
    const _ref = useRef<HTMLButtonElement | null>(null)

    const onClick = () => {
        setName('');
        setGuests((guests) => [...guests, name])
    }

    return <div> 
        <h3> Guest List </h3> 
        {guests}
        <input value={name} onChange={(e) => setName(e.target.value)}/>
        <button ref={_ref} onClick={onClick}> Add Guest </button>
    </div>
}

export default GuestList;