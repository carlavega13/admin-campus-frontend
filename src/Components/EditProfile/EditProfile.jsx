import { useEffect, useState } from "react"
import s from "../../css/EditProfile.module.css"
import {validator} from "./validator"
import axios, { all } from "axios"
import { HOST } from "../../../HOST"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../Redux/actions"
import { useNavigate } from "react-router-dom"
import CountrySelect from "./CountrySelect" 

const EditProfile=()=>{
    const navigate=useNavigate()
    const[profile,setProfile]=useState({
        firstName:"",
        lastName:"",
        phone1:"",
        email:"",
        username:"",
        password:"",
country:"",
city:""

    })
    const dispatch=useDispatch() 
    const [error,setError]=useState({})
    useEffect(()=>{
setError(validator(profile))
    },[profile])
    const user = useSelector(state => state.user)
    const allUsers = useSelector(state => state.allUsers)
    if(allUsers.length===0){
        dispatch(getAllUsers({domain:user?.domain,token:user?.token}))
        return(
            <div>
                LOADING!!!!!
            </div>
        )
    }
    const {id}=allUsers.find(use=>use.username==user.username)
    const handleChange=(e)=>{
        setProfile({
            ...profile,
            [e.target.name]:e.target.value
    
        })
        }
      
    const handleSend=async ()=>{
        setError(validator(profile))
        if(!error.firstName&&!error.lastName&&!error.phone1&&!error.email&&!error.password&&!error.username){
        if(confirm("Estas seguro que quieres editar tu información?")){
                let info={}
                if(profile.username){
                  info.username=profile.username
                }
                if(profile.password){
                    info.password=profile.password
                }
                if(profile.firstName){
                    info.firstname=`${profile.firstName[0].toUpperCase()}${profile.firstName.slice(1)}`
                }
                if(profile.lastName){
                  info.lastname=`${profile.lastName[0].toUpperCase()}${profile.lastName.slice(1)}`
                }
                if(profile.phone1){
                 info.phone1=profile.phone1
                }
                if(profile.email){
                    info.email=profile.email
                }
                if(profile.country){
                    info.country=profile.country
                }
                if(profile.city){
                    info.city=profile.city
                }
                info.id=id
              const res=await axios.put(`${HOST}putUserMoodle`,{
                username:user?.username,
                domain:user?.domain,
                token:user.token,
            info:info

              })
              alert(res.data)
               
            }

        }
    }


return (
    <div className={s.box}>
        <h2>Edita la informacion de tu perfil:</h2>
        <p>(Los campos vacios no modificaran tu información)</p>
        <label htmlFor="">Nombre de usuario: <input value={profile.username} name="username" onChange={handleChange} type="text" /></label>
        {error?.username?<p>{error.username}</p>:<></>}
        <label htmlFor="">Contraseña: <input value={profile.password} name="password" onChange={handleChange} type="text" /></label>
        {error?.password?<p>{error.password}</p>:<></>}
        <label htmlFor="">Nombre: <input value={profile.firstName} name="firstName" onChange={handleChange} type="text" /></label>
        {error?.firstName?<p>{error.firstName}</p>:<></>}
        <label htmlFor="">Apellido: <input value={profile.lastName} name="lastName" onChange={handleChange} type="text" /></label>
        {error?.lastName?<p>{error.lastName}</p>:<></>}
        <label htmlFor="">Telefono: <input value={profile.phone1} name="phone1" onChange={handleChange} type="text" /></label>
        {error?.phone1?<p>{error.phone1}</p>:<></>}
        <label htmlFor="">Email: <input value={profile.email} name="email" onChange={handleChange} type="text" /></label>
        {error?.email?<p>{error.email}</p>:<></>}
        <label htmlFor="">Pais: <CountrySelect profile={profile} setProfile={setProfile}/></label>
        {error?.country?<p>{error.country}</p>:<></>}
        <label htmlFor="">Ciudad: <input value={profile.city} name="city" onChange={handleChange} type="text" /></label>
        {error?.city?<p>{error.city}</p>:<></>}
    <button onClick={handleSend}>Editar mi informacion</button>
    </div>
)
}
export default EditProfile