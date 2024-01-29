import { useDispatch, useSelector } from "react-redux"
import UserSelect from "../AdminCourses/UserSelect"
import { getAllUsers } from "../../../Redux/actions"
import { useState } from "react"
import axios from "axios"
import { HOST } from "../../../../HOST"
import { ToastInfo, notify, notifyError } from "../../../functions/toast"
import s from "../../../css/ChangeRoles.module.css"

const ChangeRoles=(props)=>{

    const dispatch=useDispatch()
    const allUsers=useSelector(state=>state.allUsers)
    const [info, setInfo] = useState({ });
    if(allUsers.length===0){
      dispatch(getAllUsers({domain:props.user.domain,token:props.user.token}))
    }
    const handleChange=(e)=>{
      setInfo({
        ...info,
        rol:e.target.value
      })
    }
    
    const handleSend=async()=>{
      if(!info.rol){
       return notifyError("debes seleccionar todos los campos")
      }
      if(!info.userid){
       return notifyError("debes seleccionar todos los campos")
      }
      const res=await axios.post(`${HOST}changeRol`,info)
if(res.status>=200&&res.status<300){
  notify("se cambio el rol del usuario")
}
    }
    return(
      <div className={s.container}>
        <ToastInfo/>
        <div className={s.containerDiv}>
          <p>Aquí puedes cambiar el rol de un usuario</p>
          
          <label>Nuevo rol: </label>
          <select onChange={handleChange}>
            <option value={"estudiante"} style={{ background: "#D9D9D9" }}>
              Alumno
            </option>
            <option value={"profesor"} style={{ background: "#EAEAEA" }}>
              Profesor
            </option>
            <option value={"administrador"} style={{ background: "#D9D9D9" }}>
            Administrador
            </option>
          </select>
          <div className={s.divUserSelect}>
            <label>Usuario: </label>
            <UserSelect info={info}setInfo={setInfo}/>
          </div>
          <button onClick={handleSend}>Cambiar rol</button>
        </div>
      </div>
    )
  }
  export default ChangeRoles