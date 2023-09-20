import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { HOST } from "../../../../HOST"

const CreateUser=({domain,isSuperAdmin,setFlags,flags})=>{



    const[info,setInfo]=useState({
        username:"",
        password:""
    })
    const handleOnChange=(e)=>{
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        })
    }
    const handleCreateUser=async()=>{
        try {
            let passRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
    if(!passRegex.test(info?.password)){
        alert(" La contraseña debería tener al menos 8 caracter(es), al menos 1 dígito(s), al menos 1 minúscula(s), al menos 1 mayúscula(s), al menos 1 caracter(es) no alfanuméricos como *,-, o #")
    }else{
        
   const token=await axios.get(`${domain}login/token.php?username=${info?.username}&password=${info?.password}&service=moodle_mobile_app`)
   console.log(token.data);
   if(token.data.token){
    if(isSuperAdmin){
        const res= await axios.post(`${HOST}postUser`,{username:info?.username,password:info?.password,rol:"administrador",isSuperAdmin:true})
        console.log("res ",res.data);
        if(res.data.id){
            alert(`El usuario superAdmin: ${res.data.username} se creó exitosamente para el Moodle de URL: ${domain}`)
            if(setFlags && flags){
             setFlags({
                ...flags,
                componentFlag:false,
                warningFlag:false
             })
            }

        }
    }
   }
    }
            
        } catch (error) {
           alert(error.message) 

        }
    }    
   
if(isSuperAdmin){
    return(
        <div>
            <label>Nombre de usuario</label>
            <input name="username" onChange={handleOnChange} value={info?.username} type="text" />
            <label>Contraseña</label>
            <input name="password" onChange={handleOnChange} value={info?.password} type="text" />
            <p>La contraseña debería tener al menos 8 caracter(es), al menos 1 dígito(s), al menos 1 minúscula(s), 
al menos 1 mayúscula(s), al menos 1 caracter(es) no alfanuméricos como *,-, o #</p>
        <button onClick={handleCreateUser}>Crear Usuario</button>
        </div>
    )
}
}
export default CreateUser