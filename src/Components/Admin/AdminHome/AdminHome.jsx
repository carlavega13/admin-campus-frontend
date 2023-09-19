import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AdminHome=()=>{

    const navigate=useNavigate()

    const user=useSelector(state =>state.user)
    if(!user?.phone||!user?.email){
        navigate("/firstEditProfile")
        
    }

    return(
    <div>
    <button onClick={()=>navigate("/adminHome/users")}>USUARIOS</button>
    <button onClick={()=>navigate("/adminHome/courses")}>CURSOS</button>
    <button>REPORTES</button>
    <button onClick={()=>navigate("/adminHome/changeDomain")}>Cambia URL del Moodle activo</button>
    </div>
)
}
export default AdminHome