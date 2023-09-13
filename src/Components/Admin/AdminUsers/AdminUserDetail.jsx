import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import axios from "axios"
import { HOST } from "../../../../HOST";
import s from "../../../css/AdminUserDetail.module.css"

export const dateTransfer=(timeStamp)=>{
    const fecha = new Date(timeStamp*1000);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}
const AdminUserDetail=()=>{
    const {id}=useParams()
    const[info,setInfo]=useState([])
   const{token,domain}=useSelector(state=>state.user)
   const allUsers=useSelector(state=>state.allUsers)
   let user=allUsers?.find(u=>u.id==id)
let order={}
   useEffect(()=>{
       const courses=async()=>{
        let a=[]
           for (let i = 0; i < user?.enrolledcourses?.length; i++) {
 
   let response= await axios.post(`${HOST}getGrades`,{token,domain,people:[user],id:user.enrolledcourses[i].id})
    order={
       course:response.data[0].enrolledcourses.find(c=>c.id== user?.enrolledcourses[i]?.id ),
       grades:response.data[0].grades
    }
    // console.log(order);
a.push(order)
}

setInfo(a)
}
courses()
},[])

console.log(info);
return(
    <div>
    <h1>{user?.fullname}</h1>
    <h5>{user?.email}</h5>
    {user.phone1&&<h5>{user?.phone1}</h5>}
    <h5>{dateTransfer(user.firstaccess)}</h5>
  {user?.enrolledcourses?.length>0&&info?.length==0?<div>LOADING</div>:
  <div>
    <div className={s.names}>
            <h3>Curso</h3>
    <h3 className={s.name}>Ultimo acceso</h3>
        <h3>Calificaciones</h3>
</div>

      <div className={s.box}>
    
    {
        info?.map(course=>{
            return(
                <div className={s.cell}>
                    <div>{course?.course?.displayname}</div>
                    {course?.course?.lastaccess&&<div>{dateTransfer(course.course.lastaccess)}</div>}
                   {course?.grades?.map(grade=>{
                    return(
                        <div>
                            <div>{`${grade?.itemname?grade?.itemname:"Total del curso"}/ ${grade.graderaw?grade.graderaw:"No realizado"}`}</div>
                        </div>
                    )
                   })}
                </div>
            )

        })
    }
    </div>
  </div>
}
    </div>
)
}
 export default AdminUserDetail
