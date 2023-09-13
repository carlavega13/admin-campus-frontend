import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import AdminHome from './Components/Admin/AdminHome/AdminHome'
import AdminCourses from './Components/Admin/AdminCourses/AdminCourses'
import FirstLoginEditProfile from './Components/FirstLoginEditProfile/FirstLoginEditProfile'
import s from "./App.module.css"
import AdminCourseDetail from './Components/Admin/AdminCourses/AdminCourseDetail'
import AdminUsers from './Components/Admin/AdminUsers/AdminUsers'
import AdminUserDetail from './Components/Admin/AdminUsers/AdminUserDetail'

function App() {


  return (
    <div className={s.box}>
    <Routes>
   <Route path="/" element={<Login />}/>
   <Route path="/adminHome" element={<AdminHome />}/>
   <Route path="/adminhome/courses" element={<AdminCourses />}/>
   <Route path="/firstEditProfile" element={<FirstLoginEditProfile />}/>
   <Route path="adminHome/courses/courseDetail/:id" element={<AdminCourseDetail/>}/>
   <Route path='/adminHome/users' element={<AdminUsers/>}/>
   <Route path='/adminHome/users/:id' element={<AdminUserDetail/>}/>

    </Routes>
    </div>
  )
}

export default App
