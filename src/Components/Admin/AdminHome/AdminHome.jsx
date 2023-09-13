import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AdminHome=()=>{
    const [domain,setDomain]=useState("")
    const navigate=useNavigate()
    let urlRegex=/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
    const user=useSelector(state =>state.user)
    if(!user?.phone||!user?.email){
        navigate("/firstEditProfile")
        
    }
    const handleDomain=()=>{
if(!urlRegex.test(domain)){
return alert("Esta URL no es valida")
}

    }
    return(
    <div>
    <button onClick={()=>navigate("/adminHome/users")}>USUARIOS</button>
    <button onClick={()=>navigate("/adminHome/courses")}>CURSOS</button>
    <button>REPORTES</button>
    <div>

    <label>Cambiar dominio de Moodle:</label>
    <input onChange={(e)=>setDomain(e.target.value)} value={domain} type="text" placeholder="URL de Moodle" />
    <button onClick={handleDomain}>Cambiar</button>
    <p>Recordá que la URL debe ser valida para una instancia de Moodle.
        Ejemplo: "https://ejemplo.ar/moodleejemplo/"
    </p>
    </div>
    </div>
)
}
export default AdminHome