import React, { useState } from 'react'
import axios from 'axios'

export const HookToDepartments = () => {

    const [dataForm, setDataForm] = useState(
        {
            nombre: "",
            descripcion: ""
        }
    );

    const [resultado, setResultado] = useState("");

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setDataForm({ ...dataForm, [name]: value });
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const url = "http://localhost:3000/departments";
        const result = await axios.post(url, dataForm);
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
