import { useState } from "react"
export const useForm = (formInitialState) => {

    const [formState, setFormState] = useState(formInitialState)
    //Objetivo: modificar el estado del formuilario a medida se vaya ejecutando el evento change en los distintos input
    const handleChangeInput = (event) => {
        const { name, value } = event.target //desestructuracion para cuadno retornamos el estado clonado se ve mucho mas prolijo

        const file_value = event.target?.files
        //vamos a hacer la famosa clonacion
        //para el archivo
        if (file_value && file_value[0] instanceof File) {
            const file = file_value[0]
            const reader = new FileReader()
            reader.onload = () => {
                setFormState(
                    (prevFormState) => {
                        return { ...prevFormState, name: reader.result }
                    }
                )
            }
            reader.readAsDataURL(file) //transforma a base 64
        }
        //si no es un archivo sigue como antes
        else {
            setFormState(
                (prevFormState) => {
                    return { ...prevFormState, [name]: value }//aca rompimos la referencia
                }
            )
        }
        //formState[event.target.name] = event.target.value asi no
    }
    return { formState, handleChangeInput }
}