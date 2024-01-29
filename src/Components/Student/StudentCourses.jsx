import { useDispatch, useSelector } from "react-redux";
import { getStudentCourses } from "../../Redux/actions";
import { dateTransfer } from "../Admin/AdminUsers/AdminUserDetail";
import { useNavigate } from "react-router-dom";
import loading from "../../public/images/AdminHome/loading-loading-gif.gif"
import s from "../../css/StudentCourses.module.css"

const StudentCourses = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  if (courses.length === 0) {
    dispatch(
      getStudentCourses({
        domain: user.domain,
        token: user.token,
        userId: user.id,
      })
    );
    return (
      <div className={s.containerLoading}>
        <img src={loading} alt="Cargando..."className={s.loadingIcon}/>
      </div>
    );
  }

  return (
    <div className={s.container}>
      {courses.map((course) => {
        return (
          <div>
            <div className={s.courseName}>
              <p>
                {course.fullname}
              </p>
            </div>

            <div style={{borderRadius: ".2rem .2rem 0 0"}}>
              <label>Progreso: </label>
              <p>
                {course.progress ? course.progress : 0}
              </p>
            </div>

            <div>
              <label>Ultimo acceso:</label>{" "}
              <p>
                {course.lastaccess ? dateTransfer(course.lastaccess) : "Nunca"}
              </p>
            </div>

            <div style={{borderRadius: " 0 0 .2rem .2rem"}}>
              <button className={s.btn} onClick={() => navigate(`/grades/${course.id}`)}>
                Calificaciones
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
};
export default StudentCourses;