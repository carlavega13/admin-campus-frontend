
import { Route, Routes } from 'react-router-dom'
import AdminHome from './Components/Admin/AdminHome/AdminHome'
import AdminCourses from './Components/Admin/AdminCourses/AdminCourses'
import FirstLoginEditProfile from './Components/FirstLoginEditProfile/FirstLoginEditProfile'
import s from "./App.module.css"
import AdminCourseDetail from './Components/Admin/AdminCourses/AdminCourseDetail'
import AdminUsers from './Components/Admin/AdminUsers/AdminUsers'
import AdminUserDetail from './Components/Admin/AdminUsers/AdminUserDetail'
import LoginPage from './Components/Login/LoginPage'
import ChangeDomain from './Components/Admin/AdminHome/ChangeDomain'
import CreateCourse from './Components/Admin/AdminCourses/CreateCourse'
import CreateUser from './Components/Admin/AdminUsers/CreateUser'
import CountrySelect from './Components/EditProfile/CountrySelect'


function App() {


  return (
    <div className={s.box}>
    <Routes>
   <Route path="/" element={<LoginPage />}/>
   <Route path="/adminHome" element={<AdminHome />}/>
   <Route path="/firstEditProfile" element={<FirstLoginEditProfile />}/>
   <Route path="adminHome/courseDetail/:id" element={<AdminCourseDetail/>}/>
   <Route path='/adminHome/users/:id' element={<AdminUserDetail/>}/>
   <Route path='/createCourse' element={<CreateCourse/>}/>
   <Route path='/createUser' element={<CreateUser/>}/>

    </Routes>
    </div>
  )
}

export default App
