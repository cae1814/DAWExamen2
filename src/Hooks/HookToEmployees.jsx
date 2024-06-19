import React, { useState } from 'react'
import axios from 'axios'

export const HookToEmployees = () => {
    const logInfo = window.localStorage.getItem('xinfodatax');
    
    const [dataForm, setDataForm] = useState(
        {
            nombres: "",
            apellidos: "",
            dni: "",
            fecha_nacimiento: "",
            genero: ""
        }
    );

    const [resultado, setResultado] = useState("");

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setDataForm({ ...dataForm, [name]: value });
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const url = "https://127.0.0.1/employees";
        const result = await axios.post(url, dataForm, {headers: {'Authorization': `Bear ${logInfo}`}});
        console.log(dataForm);
        const dataResult = (await result).data;

        if (dataResult.obj_creado[0].id > 0) {
            document.getElementById("alertok").style.display='inline';
            document.getElementById("alertnok").style.display='none';
            document.getElementById("refresh").click();
        } else {
            document.getElementById("alertnok").style.display='inline';
            document.getElementById("alertok").style.display='none';
        }
    }
    
    return {
        dataForm,
        resultado,
        changeHandler,
        submitHandler
    }
}
