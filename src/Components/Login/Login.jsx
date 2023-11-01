import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../Redux/actions"
import { useNavigate } from "react-router-dom"
import s from "../../css/Login.module.css"
import userIcon from "../../public/images/Login/Profile.png"
import passIcon from "../../public/images/Login/mdi_password.png"

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
      try {
        dispatch(login(user))
        
      } catch (error) {
        console.log("cada");
      }
        
    }
    useEffect(()=>{},[userLogged])

    if(userLogged?.username&&userLogged?.phone===null) {
        navigate("firstEditProfile")
      return
    }
    if(userLogged?.username&&userLogged?.rol==="administrador") {
        navigate("/adminHome")
    }
                 
              
return (
    <div className={s.containerLogin}>

      <p className={s.title}>Ingresa</p>

      <div className={s.inputs}>

        <div>
          <img src={userIcon} className={s.userIcon} />
          <input onChange={handlerChange} name="username"value={user.username}
              type="text" placeholder="Nombre de usuario"
              />
        </div>

        <div>
          <img src={passIcon} className={s.passIcon} />
          <input onChange={handlerChange} name="password"
            value={user.password} 
            type="text" placeholder="Contraseña"
          />
    
        </div>
        <button onClick={handlerLogin}
            className={s.btnLogin}>Ingresar</button>

      </div>
      
    </div>
)
}
export default Login