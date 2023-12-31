
import { Route, Routes } from 'react-router-dom'
import AdminHome from './Components/Admin/AdminHome/AdminHome'
import FirstLoginEditProfile from './Components/FirstLoginEditProfile/FirstLoginEditProfile'
import s from "./App.module.css"
import AdminCourseDetail from './Components/Admin/AdminCourses/AdminCourseDetail'
import AdminUserDetail from './Components/Admin/AdminUsers/AdminUserDetail'
import LoginPage from './Components/Login/LoginPage'
import CreateCourse from './Components/Admin/AdminCourses/CreateCourse'
import CreateUser from './Components/Admin/AdminUsers/CreateUser'
import Sheet from './functions/toast'



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
   <Route path='/r' element={<Sheet/>}/>

    </Routes>
    </div>
  )
}

export default App
