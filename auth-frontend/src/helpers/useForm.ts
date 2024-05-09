import { useState } from "react"

export default function useForm(initFormState={}){

    const [formState, setFormState] = useState(initFormState)

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target
        setFormState({
            ...formState,
            [name]:value
        })
    }

    return{
        ...formState,
        formState,
        onInputChange
    }
}