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
     <div className={s.formContainer}>

      <div>
        <label htmlFor="">Nombre de usuario: 
        </label>
            <input value={profile.username} name="username" onChange={handleChange} type="text" />
        {error?.username?<p>{error.username}</p>:<></>}
      </div>

      <div>

        <label htmlFor="">Contraseña: 
        </label>
            <input value={profile.password} name="password" onChange={handleChange} type="text" />
        {error?.password?<p>{error.password}</p>:<></>}
      </div>

      <div>

        <label htmlFor="">Nombre: 
        </label>
            <input value={profile.firstName} name="firstName" onChange={handleChange} type="text" />
        {error?.firstName?<p>{error.firstName}</p>:<></>}
      </div>

      <div>

        <label htmlFor="">Apellido: 
        </label>
            <input value={profile.lastName} name="lastName" onChange={handleChange} type="text" />
        {error?.lastName?<p>{error.lastName}</p>:<></>}
      </div>

      <div>

        <label htmlFor="">Telefono: 
        </label>
            <input value={profile.phone1} name="phone1" onChange={handleChange} type="text" />
        {error?.phone1?<p>{error.phone1}</p>:<></>}
      </div>

      <div>

        <label htmlFor="">Email: 
        </label>
            <input value={profile.email} name="email" onChange={handleChange} type="text" />
        {error?.email?<p>{error.email}</p>:<></>}
      </div>

      <div className={s.containerCountries}>

        <label htmlFor="">Pais: 
        </label>
          <CountrySelect profile={profile} setProfile={setProfile}/>
        {error?.country?<p>{error.country}</p>:<></>}
      </div>

      <div>

        <label htmlFor="">Ciudad: 
        </label>
        <input value={profile.city} name="city" onChange={handleChange} type="text" />
        {error?.city?<p>{error.city}</p>:<></>}
      </div>



     </div>
        <button onClick={handleSend}className={s.btn}>Editar mi informacion</button>
    </div>
)
}
export default EditProfile