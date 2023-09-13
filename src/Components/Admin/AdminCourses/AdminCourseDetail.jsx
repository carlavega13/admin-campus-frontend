import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import s from "../../../css/AdminCourseDetail.module.css"
import Papa from 'papaparse';
import downloadCsv from "../../../downloadCsv";
import { BsWhatsapp } from 'react-icons/bs';
import { GrMailOption } from 'react-icons/gr';
import { useState } from "react";
import Paginated from "../../Paginated";
import EmailPopOut from "../../EmailPopOut";
import { getGrades } from "../../../Redux/actions";

const AdminCourseDetail=()=>{
    const[flag,setFlag]=useState({
        state:false,
        to:""
    })
    const[checkbox,setCheckbox]=useState([])
    const {id}=useParams()
    const [page,setPage]=useState(1)
    let {courses,user}=useSelector(state=>state)
    let course=courses?.find(co=>co.id==id)
    course.enrolledPeople=course.enrolledPeople?.filter(student=>student?.roles&&student.roles[0]?.shortname!=="teacher"&&student?.roles&&student.roles[0]?.shortname!=="editingteacher")
   const dispatch=useDispatch()

   if(!course.enrolledPeople.find((pe)=>pe.grades)){
    dispatch(getGrades(course.enrolledPeople,user.token,user.domain,id))
    return(
        <>LOADING!!!!!!</>
    )
    
       }
    let csvInfo=course.enrolledPeople.map(people=>{
        return {
            nombre:people.fullname,
            email:people.email,
            telefono:people.phone1
        }
    })
    csvInfo=Papa.unparse(csvInfo)
    
    const handlerDownloadCsv=()=>{
        downloadCsv(csvInfo,`${course.name} alumnos.csv`)
}

const usuariosPorPagina = 15; // Cantidad de usuarios por página
const inicio = (page - 1) * usuariosPorPagina;
const fin = inicio + usuariosPorPagina;

let sliceUsers = course.enrolledPeople.slice(inicio, fin);
const handlerSendAll=()=>{
    let allEmails=  course.enrolledPeople?.map(user=>user.email)
   setFlag({
    state:true,
    to:allEmails
   })
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
    <div className={s.box}>
          <div className={s.names}>
        <h4 className={flag?.state?s.blur:s.normal}>Nombres</h4>
        <h4 className={flag?.state?s.blur:s.normal}>Email</h4>
        <h4 className={flag?.state?s.blur:s.normal}>Telefono</h4>
        <h4 className={flag?.state?s.blur:s.normal}>Calificación</h4>
        <h4 className={flag?.state?s.blur:s.normal}>Porcentaje de finalizacion</h4>
        </div>
    {sliceUsers?.map(student=>{
       let progress= student?.enrolledcourses?.find(co=>co.id==id).progress
        return (
            <div className={s.cell}>
                <div className={s.name}>{student.fullname}</div>
                <div className={s.name}><input value={student.email} onClick={handlerCheckBox} type="checkbox" />{student.email}<GrMailOption onClick={()=>handleEnvolope(student.email)}/></div>
                <div className={s.name}>{student.phone1}{student.phone1?<a href={`https://wa.me/${student.phone1}`}><BsWhatsapp/></a>:""}</div>
                <div className={s.name}>{student.grades&&student.grades[student.grades.length-1].graderaw?student.grades[student.grades.length-1].graderaw:0}</div>
                <div className={s.name}>{progress?progress.toFixed(2):"0.00"}%</div>
            </div>
        )
    })}
    <button onClick={handlerDownloadCsv}>Descargar CSV</button>
    {course?.enrolledPeople?.length>15&&<Paginated page={page} setPage={setPage} allUsersCopiaAmount={course?.enrolledPeople?.length}/>}
    <button onClick={handlerSendSelected}>Enviar email a los alumnos seleccionados</button>
    <button onClick={handlerSendAll}>Enviar email a todos los alumnos {`(${course?.enrolledPeople?.length})`}</button>
    {flag.state?<EmailPopOut  to={flag.to} flag={flag.state} setFlag={setFlag}/>:""}
    </div>
)
}
export default AdminCourseDetail