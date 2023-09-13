import { useDispatch, useSelector } from "react-redux"
import { getCourses } from "../../../Redux/actions";
import s from "../../../css/AdminCourses.module.css"
import { BsWhatsapp } from 'react-icons/bs';
import { GrMailOption } from 'react-icons/gr';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmailPopOut from "../../EmailPopOut";

const AdminCourses=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[checkbox,setCheckbox]=useState([])
    const {courses,user}=useSelector(res=>res)
    const[flag,setFlag]=useState({
        state:false,
        to:""
    })
    if(courses.length===0){
        dispatch(getCourses({domain:user.domain,token:user.token}))
        return(
            <>
            LOADING!!!!!!!!!!!!
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
            const handleEnvolope=(to)=>{
                setFlag({
                    state:true,
                    to:to
                })
                }
                
return(
    <div className={s.fondo}>
                  <div className={s.names}>
        <h4 className={flag?.state?s.blur:s.normal}>Curso</h4>
        <h4 className={flag?.state?s.blur:s.normal}>Cantidad de alumnos</h4>
        <h4 className={flag?.state?s.blur:s.normal}>Profesor</h4>
              </div>
        <div className={s.box}>
    {
        courses?.map((course)=>{
          return (
            <div  className={s.row}>
            <div className={s.name} onClick={()=>course?.enrolledPeople.filter(student=>student?.roles&&student.roles[0]?.shortname!=="teacher"&&student?.roles&&student.roles[0]?.shortname!=="editingteacher").length>0?navigate(`courseDetail/${course.id}`):null}>{course?.name}</div>
            <div>{course?.enrolledPeople?.filter(student=>student?.roles&&student.roles[0]?.shortname!=="teacher"&&student?.roles&&student.roles[0]?.shortname!=="editingteacher").length}</div>
            <div>
                {course?.teacher?.map(tea=>{

                       return(<div>{tea.fullname}<GrMailOption  onClick={()=>handleEnvolope(user.email)}/><input value={tea.email} onClick={handlerCheckBox} type="checkbox" />{tea.phone1?<a href={`https://wa.me/${tea.phone1}`}><BsWhatsapp/></a>:""}</div>)
              
                })}
            </div>
            </div>
          )
        })
    }
    </div>
    <button onClick={handlerSendSelected}>Enviar email a todos los usuarios seleccionados</button>
    {flag.state?<EmailPopOut  to={flag.to} flag={flag.state} setFlag={setFlag}/>:""}
    </div>
    
)
}
export default AdminCourses