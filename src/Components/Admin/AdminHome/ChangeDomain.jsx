import { useState } from "react"
import axios from "axios"
import { HOST } from "../../../../HOST"
import CreateUser from "./CreateUser"
import { useDispatch } from "react-redux"
import { deleteAll } from "../../../Redux/actions"
import { useNavigate } from "react-router-dom"

const ChangeDomain=()=>{
  const navigate=useNavigate()
  const dispatch=useDispatch()
    
    const [domain,setDomain]=useState("")
    let urlRegex=/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
    const [flags,setFlags]=useState({
      warningFlag:false,
      componentFlag:false
    })
    const handleDomain=async()=>{
        if(!urlRegex.test(domain)){
        return  alert("Esta URL no es valida")
        }
      if(  confirm("Seguro que quieres cambiar la URL?")){
        const res=await axios.post(`${HOST}postDomain`,{domain})
if(res.data==="debe crear un usuario superAdmin para esta url"){
  setFlags({...flags,warningFlag:true})

}
if(res.data==="Esta URL es la misma que esta activa en estos momentos"){
  alert(res.data)
}
if(res.data.id){
  alert(`La URL activa ahora es: ${res.data.url}. Por favor ingrese denuevo con un usuario para este dominio`)
  dispatch(deleteAll())
  navigate("/")
}
      }
            }
const handleCreateUser=()=>{
  setFlags({...flags,componentFlag:true})

}
const onChangeDomain=(e)=>{
  if(!flags.componentFlag){

    setDomain(e.target.value)
  }
}

 return(
    <div>

    <label>Cambiar dominio de Moodle:</label>
    <input onChange={onChangeDomain} value={domain} type="text" placeholder="URL de Moodle" />
    <button onClick={handleDomain}>Cambiar</button>
    <p>Recordá que la URL debe ser valida para una instancia de Moodle.
        Ejemplo: "https://ejemplo.ar/moodleejemplo/"
    </p>
    {flags.warningFlag&&<div>
      <p>Necesitas crear un usuario SuperAdmin para esta URL de moodle</p>
      <button onClick={handleCreateUser}>Crear usuario SuperAdmin</button>
      </div>}
      {flags.componentFlag&&<CreateUser domain={domain} setFlags={setFlags} flags={flags} isSuperAdmin={true}/>}
    </div>
 )   
}
export default ChangeDomain