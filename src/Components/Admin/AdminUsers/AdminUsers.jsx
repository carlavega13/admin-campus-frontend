import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../../Redux/actions";
import Paginated from "../../Paginated";
import { useState } from "react";
import s from "../../../css/AdminUsers.module.css"
import { BsWhatsapp } from 'react-icons/bs';
import { GrMailOption } from 'react-icons/gr';
import EmailPopOut from "../../EmailPopOut";
import { useNavigate } from "react-router-dom";
const AdminUsers=()=>{
    const navigate=useNavigate()
    const [page,setPage]=useState(1)
    const[checkbox,setCheckbox]=useState([])
    const[flag,setFlag]=useState({
        state:false,
        to:""
    })
    const dispatch=useDispatch()
    let {user,allUsers,allUsersCopia}=useSelector(state=>state)

    const usuariosPorPagina = 15; // Cantidad de usuarios por página
    const inicio = (page - 1) * usuariosPorPagina;
    const fin = inicio + usuariosPorPagina;
    
    let sliceUsers = allUsersCopia.slice(inicio, fin);
 
    if(allUsers?.length===0){
        dispatch(getAllUsers({domain:user?.domain,token:user?.token}))
        return( 
            <>
            LOADING!!!!!
            </>
        )
    }

const handlerCheckBox=(e)=>{

if(e.target.checked){
    setCheckbox([...checkbox,e.target.value])
}else{
    
    setCheckbox(checkbox.filter(user=>user!==e.target.value))
}

}
const handleEnvolope=(to)=>{
setFlag({
    state:true,
    to:to
})
}
const handlerSendAll=()=>{
    let allEmails=allUsers?.map(user=>user.email)
   setFlag({
    state:true,
    to:allEmails
   })
}
const handlerSendSelected=()=>{
if(checkbox.length===0){
alert("Debes selecionar al menos un usuario")
}else{

    setFlag({
        state:true,
        to:checkbox
    })
}
}

return(
    <div>
       <div className={s.box}>
        <div className={s.names}>
        <h4 className={flag.state?s.blur:s.normal}>Nombres</h4>
        <h4 className={flag.state?s.blur:s.normal}>Email</h4>
        <h4 className={flag.state?s.blur:s.normal}>Telefono</h4>
        </div>
        {sliceUsers?.map(user=>{
                return(
                    <div className={s.cell}>
                      <div onClick={()=>navigate(`/adminHome/users/${user.id}`)} className={s.info}>{user.fullname}</div>
                      <div className={s.info}><input value={user.email} onClick={handlerCheckBox} type="checkbox" />{user.email}<GrMailOption  onClick={()=>handleEnvolope(user.email)}/></div>
                      <div className={s.info}>{user.phone1}{user.phone1?<a href={`https://wa.me/${user.phone1}`}><BsWhatsapp /></a>:""}</div>
                      
                        </div>
                )
            
        })}
       </div>
        <Paginated page={page} setPage={setPage} allUsersCopiaAmount={allUsersCopia?.length}/>
        <button onClick={handlerSendSelected}>Enviar email a todos los usuarios seleccionados</button>
        <button onClick={handlerSendAll}>Enviar email a todos los usuarios ({`${allUsers.length}`})</button>
        {flag.state?<EmailPopOut  to={flag.to} flag={flag.state} setFlag={setFlag}/>:""}
    </div>
)
}
export default AdminUsers