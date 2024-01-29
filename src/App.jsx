import { Route, Routes } from "react-router-dom";
import AdminHome from "./Components/Admin/AdminHome/AdminHome";
import FirstLoginEditProfile from "./Components/FirstLoginEditProfile/FirstLoginEditProfile";
import s from "./App.module.css";
import AdminCourseDetail from "./Components/Admin/AdminCourses/AdminCourseDetail";
import AdminUserDetail from "./Components/Admin/AdminUsers/AdminUserDetail";
import LoginPage from "./Components/Login/LoginPage";
import CreateCourse from "./Components/Admin/AdminCourses/CreateCourse";
import CreateUser from "./Components/Admin/AdminUsers/CreateUser";
import StudentHome from "./Components/Student/StudentHome";
import StudentCourseDetail from "./Components/Student/StudentCourseDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadUser } from "./Redux/actions";
import TeacherHome from "./Components/Teacher/TeacherHome";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userLogged = JSON.parse(window.localStorage.getItem("userLogged"));
  async function setLoggedUser() {
    if (
      !user.username &&
      userLogged.username.length > 1 &&
      userLogged.hash.length > 1
    ) {
      dispatch(reloadUser(userLogged));
    }
  }
  useEffect(() => {
    setLoggedUser();
  }, [user]);

  return (
    <div className={s.box}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/firstEditProfile" element={<FirstLoginEditProfile />} />
        <Route
          path="/courseDetail/:id"
          element={<AdminCourseDetail />}
        />
        <Route path="/adminHome/users/:id" element={<AdminUserDetail />} />
        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/studentHome" element={<StudentHome />} />
        <Route path="/teacherHome" element={<TeacherHome />} />
        <Route path="/grades/:id" element={<StudentCourseDetail />} />
      </Routes>
    </div>
  );
}

export default App;
