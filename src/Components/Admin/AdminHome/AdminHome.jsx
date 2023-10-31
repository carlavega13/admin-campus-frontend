import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import AdminCourses from '../AdminCourses/AdminCourses.jsx'
import AdminUsers from '../AdminUsers/AdminUsers.jsx'
import ChangeDomain from '../AdminHome/ChangeDomain.jsx'
import s from "../../../css/AdminHome.module.css"
import iconSettings from "../../../public/images/AdminHome/settings.png"
import iconUser from "../../../public/images/Login/Profile.png"
import iconOptions from "../../../public/images/AdminHome/options.png"
import iconFile from "../../../public/images/AdminHome/file.png"
import iconReport from "../../../public/images/AdminHome/report.png"
import iconChange from "../../../public/images/AdminHome/change.png"
import iconOptionsSelected from "../../../public/images/AdminHome/optionsSelected.png"
import iconFileSelected from "../../../public/images/AdminHome/fileSelected.png"
import iconReportSelected from "../../../public/images/AdminHome/reportSelected.png"
import iconChangeSelected from "../../../public/images/AdminHome/changeSelected.png"
import iconProfileSelected from "../../../public/images/AdminHome/profileSelected"
import EditProfile from "../../EditProfile/EditProfile.jsx"

const AdminHome = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const [ value, setValue ] = useState("users");

  useEffect(() => { }, [value])
  if(!user?.phone||!user?.email) {
    navigate("/firstEditProfile")
  }
  return(
<div className={s.containerAll}>

  <div className={s.container}>
    <div className={s.divSettings}>
      <div className={s.settings}>
        <p>{user?.firstName} {user?.lastName}</p>
        <img onClick={()=>{
        setValue("editProfile")
        }} src={iconSettings} className={s.iconSettings}/>
      </div>
      <p>{user?.username}</p>
    </div>

    <div className={s.divBtnsOptions}>

      <div onClick={()=>setValue("users")}
        style={value==="users"?{border: "1.5px solid #2f3367", boxShadow: "2px 2px 3px 1px #B3B3B3"}:null}>
        <img src={value==="users"?iconProfileSelected:iconUser} className={s.icons} />
        <p className={value==="users"?s.selected:null}>Usuarios</p>
        <img src={value==="users"?iconOptionsSelected:iconOptions} className={s.iconOptions} />
      </div>

      <div onClick={()=>setValue("courses")}
        style={value==="courses"?{border: "1.5px solid #2f3367", boxShadow: "2px 2px 3px 1px #B3B3B3"}:null}>
        <img src={value==="courses"?iconFileSelected:iconFile} className={s.icons} />
        <p className={value==="courses"?s.selected:null}>Cursos</p>
        <img src={value==="courses"?iconOptionsSelected:iconOptions} className={s.iconOptions} />
      </div>
      <div>
        <img src={iconReport} className={s.icons} />
        <p>Reportes</p>
        <img src={iconOptions} className={s.iconOptions} />
      </div>

      <div onClick={()=>setValue("changeDomain")}
        style={value==="changeDomain"?{border: "1.5px solid #2f3367", boxShadow: "2px 2px 3px 1px #B3B3B3"}:null}>
        <img src={value==="changeDomain"?iconChangeSelected:iconChange} className={s.icons} />
        <p className={`${s.pUrl} ${value==="changeDomain"?s.selected:null}`}>Cambiar URL del Moodle activo</p>
        <img src={value==="changeDomain"?iconOptionsSelected:iconOptions} className={s.iconOptions} />
      </div>

    </div>

  </div>

  <div className={s.right}>
    {
      value === "courses"
      ? <AdminCourses/>
      : null
    }

    {
      value === "users"
      ? <AdminUsers/>
      : null
    }

    {
      value === "changeDomain"
      ? <ChangeDomain/>
      : null
    }
    {
          value === "editProfile"
          ? <EditProfile token={user.token} domain={user.domain} username={user.username}/>
          : null
    }
  </div>
</div>
)
}
export default AdminHome