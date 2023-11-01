import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { HOST } from "../../../../HOST"
import { getAllUsers } from "../../../Redux/actions"
import axios from "axios"

const CreateUser=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [info,setInfo] =useState({
        username:"",
        password:"",
        firstname:"",
        lastname:"",
        email:""
    })
    const {username,domain,token}=useSelector(state=>state.user)
    let emailRegex= /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    let passRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
    const handleOnChange=(e)=>{
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        })
    }
const handleCreate=async()=>{
    try {
        if(!passRegex.test(info?.password)){
          return alert("La contraseña debería tener al menos 8 caracter(es), al menos 1 dígito(s), al menos 1 minúscula(s), al menos 1 mayúscula(s), al menos 1 caracter(es) no alfanuméricos como *,-, o #")
        }
        if(!emailRegex.test(info?.email)){
            return alert("El email es invalido.")
        }
        if(confirm(`Estas seguro que quieres crear el usuario: ${info?.firstname} ${info?.lastname}`)){
            const res=await axios.post(`${HOST}postUserMoodle`,{username,domain,info})
            if(res.data[0].id){
                dispatch(getAllUsers({domain,token}))
                setInfo({
                    username:"",
                    password:"",
                    firstname:"",
                    lastname:"",
                    email:""
                })
                return alert(`El usuario: ${info?.firstname} ${info?.lastname}, se creo correctamente`)
                
            }

        }
    } catch (error) {
       return alert(error.message)
    }
}
return(
    <div>
<button onClick={()=>navigate("/adminHome")}>HOME</button>
    <label htmlFor="">Nombre de usuario</label>
   <input onChange={handleOnChange} name="username" value={info.username}  type="text" placeholder="Nombre de usuario" />
    <label htmlFor="">Contraseña</label>
   <input onChange={handleOnChange} name="password" value={info.password} type="text" placeholder="Contraseña" />
    <label htmlFor="">Primer nombre</label>
   <input onChange={handleOnChange} name="firstname" value={info.firstname} type="text" placeholder="Primer nombre" />
    <label htmlFor="">Apellido</label>
   <input onChange={handleOnChange} name="lastname" value={info.lastname} type="text" placeholder="Apellido"/>
    <label htmlFor="">Email</label>
   <input onChange={handleOnChange} name="email" value={info.email} type="text" placeholder="Email"/>
   <button onClick={handleCreate}>Crear usuario</button>
    </div>
)
}
export default CreateUser