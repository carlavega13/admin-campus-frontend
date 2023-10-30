import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import s from "../../../css/AdminCourseDetail.module.css"
import Papa from 'papaparse';
import downloadCsv from "../../../downloadCsv";
import { BsWhatsapp } from 'react-icons/bs';
import { useState } from "react";
import EmailPopOut from "../../EmailPopOut";
import { getGrades } from "../../../Redux/actions";
import { DataGrid } from '@mui/x-data-grid';

const AdminCourseDetail=()=>{
        const navigate =useNavigate()
    const[flag,setFlag]=useState({
        state:false,
        to:""
    })
    const [users,setUsers]=useState([])
const {id}=useParams()
let {courses,user}=useSelector(state=>state)
    let course=courses?.find(co=>co.id==id)
    course.enrolledPeople=course.enrolledPeople?.filter(student=>student?.roles&&student.roles[0]?.shortname!=="teacher"&&student?.roles&&student.roles[0]?.shortname!=="editingteacher")
       const dispatch=useDispatch()
    
       if(!course.enrolledPeople.find((pe)=>pe.grades)){
        dispatch(getGrades(course.enrolledPeople,user.token,user.domain,id))
        return(
            <>
            <button onClick={()=>navigate("/adminHome")}>HOME</button>
            LOADING!!!!!!
            </>
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
    const columns=[
        { field: 'fullname', headerName: 'NOMBRE',width: 100},
        { field: 'email', headerName: 'EMAIL',width: 100},
        { field: 'phone1', headerName: 'TELEFONO',width: 150,renderCell:(params)=>{
            if(params.row.phone1){
                return(
                    <div style={{display:"flex", justifyContent: "space-between", alignItems:"center", width: "300px"}}>
                        <p>{params.row.phone1}</p>
                           <a  href={`https://wa.me/${params.row.phone1}`} target="_blank" rel="noopener noreferrer">
              <BsWhatsapp style={{color: "#2f3367"}} />
            </a>
                    </div>
                )
            }
        }},
 
    ...course?.enrolledPeople.find(pep=>pep.grades&&pep.grades.length>0).grades.map(grade=>{
            if(grade.itemname){

                return{field:grade.itemname,headerName:grade.itemname,width:150}
            }
        }),
        { field: 'finalgrade', headerName: 'CALIFICACIÓN FINAL',width: 150},
        { field: 'finalPercentage', headerName: 'PORCENTAJE FINAL',width: 150},
    ].filter(pe=>pe)
const rows=course?.enrolledPeople.map(pep=>{
    let aux={ id:pep.id, fullname:pep.fullname,email:pep.email,phone1:pep.phone1?pep.phone1:"",}
    for (let i = 0; i < pep.grades.length; i++) {

        if(pep.grades[i].itemname){
            aux[pep.grades[i].itemname]=pep.grades[i].graderaw?pep.grades[i].graderaw:""

        }else{
           aux.finalgrade=pep.grades[i].graderaw?pep.grades[i].graderaw:""
        }
        
    }
    if(!pep.enrolledcourses?.errorcode){


        aux.finalPercentage= pep.enrolledcourses?.find(co=>co.id==id).progress
    }
  return aux
})
const handleSendMail=()=>{
    if(users.length===0){
        alert("Debes selecionar al menos un usuario")
        }else{
  
        
            setFlag({
                state:true,
                to:users.map(id=>course?.enrolledPeople?.find(user=>user.id==id).email)
            })
        }
}
return(
    <div>
       <button onClick={()=>navigate("/adminHome")}>HOME</button>
        <div>

        <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            },
          }}
          pageSizeOptions={[6,10,40,50]}
          checkboxSelection
          onRowSelectionModelChange={(user)=>{
            setUsers(user)
          }}
       
        />
        </div>
        <button onClick={handlerDownloadCsv}>Descargar CSV</button>
        <button onClick={handleSendMail}>{`Enviar mensaje a los usuarios seleccionados (${users?.length})`}</button>
        {flag.state?<EmailPopOut  to={flag.to} flag={flag.state} setFlag={setFlag}/>:""}
    </div>
)
}

export default AdminCourseDetail