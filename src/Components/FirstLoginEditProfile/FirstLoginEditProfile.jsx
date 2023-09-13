import { useEffect, useState } from "react"
import {validator} from "../FirstLoginEditProfile/validator"
import s from "../../css/FirstLoginEditProfile.module.css"
import { useDispatch, useSelector } from "react-redux"
import { putUser } from "../../Redux/actions"
import { useNavigate } from "react-router-dom"
const FirstLoginEditProfile=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{id,phone}=useSelector(state=>state.user)
    const[profile,setProfile]=useState({
        firstName:"",
        lastName:"",
        DNI:"",
        phone:"",
        email:""

    })
    const[error,setError]=useState({
        firstName:"",
        lastName:"",
        DNI:"",
        phone:"",
        email:""

    })
    useEffect(()=>{
        setError(validator(profile))
    },[profile])
    const handlerChange=(e)=>{
        setProfile({
            ...profile,
            [e.target.name]:e.target.value
    
        })
  
    }
    const handlerSubmit=(e)=>{
     e.preventDefault() 
     setError(validator(profile))
     console.log(error.phone);
     if(!error.firstName&&!error.lastName&&!error.phone&&!error.email){
        dispatch(putUser({...profile,id}))
        if(phone.length>1){
            navigate("/adminHome")
        }
     }
    }
    return (
        <div className={s.box}>
            <form className={s.box}onSubmit={handlerSubmit}>
                  <label htmlFor="">Nombres <input onChange={handlerChange} name="firstName" value={profile.firstName}  type="text" placeholder="Nombres"/></label>
                  {error?.firstName?<p>{error.firstName}</p>:<></>}
        <label htmlFor="">Apellidos <input onChange={handlerChange} name="lastName" value={profile.lastName} type="text" placeholder="Apellidos" /></label>
        {error?.lastName?<p>{error.lastName}</p>:<></>}
        <label htmlFor="">DNI <input onChange={handlerChange} name="DNI" value={profile.DNI} type="number" placeholder="DNI" /></label>
        
        <label htmlFor="">Celular <input onChange={handlerChange} name="phone" value={profile.phone} type="text" placeholder="Celular" /></label>
        {error?.phone?<p>{error.phone}</p>:<></>}
        <label htmlFor="">Email <input onChange={handlerChange} name="email" value={profile.email} type="text" placeholder="Email" /></label>
        {error?.email?<p>{error.email}</p>:<></>}
        <button type="submit">Enviar</button>
            </form>
      
        </div>
    )
}
export default FirstLoginEditProfile