import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../Redux/actions"
import { useNavigate } from "react-router-dom"
import s from "../../css/Login.module.css"

const Login=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const userLogged=useSelector(state=>state.user)

    const[user,setUser]=useState(
        {
             username:"",
             password:""
            })
            
            const handlerChange=(e)=>{
                setUser({
                    ...user,
                    [e.target.name]:e.target.value
        
                })
            }    
            const handlerLogin=()=>{
                dispatch(login(user))
                
            }
            useEffect(()=>{

            },[userLogged])
            if(userLogged?.username&&userLogged?.phone===null){
                navigate("firstEditProfile")
              return
            }
                        if(userLogged?.username&&userLogged?.rol==="administrador"){
                            navigate("/adminHome")
                        }
                 
              
return(
    <div className={s.box}>
    <label htmlFor="username">Nombre de usuario: <input onChange={handlerChange} name="username" value={user.username} type="text" placeholder="Nombre de usuario" /></label>
    
    <label htmlFor="password">Contraseña: <input onChange={handlerChange} name="password" value={user.password} type="text" placeholder="Contraseña"/></label>
    
    <button onClick={handlerLogin}>Entrar</button>
    </div>
)
}
export default Login

// Las contraseñas deben tener al menos una longitud de 8 caracteres.
// Las contraseñas deben tener al menos 1 dígito(s).
// Las contraseñas deben tener al menos 1 mayúscula(s).
// Las contraseñas deben tener al menos 1 caracter(es) no alfanumérico(s) como *,-, o #.