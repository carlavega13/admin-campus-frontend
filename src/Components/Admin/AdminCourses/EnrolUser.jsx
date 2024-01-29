import { useState } from "react";
import UserSelect from "./UserSelect";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { HOST } from "../../../../HOST";
import { getAllUsers, getTeacherCourse } from "../../../Redux/actions";
import s from "../../../css/EnrolUser.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { ToastInfo, notify, notifyError } from "../../../functions/toast";
const EnrolUser = ({ courseid, setEnrolUser, courseName, user }) => {
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  if (users.length === 0) {
    dispatch(getAllUsers({ domain: user?.domain, token: user?.token }));
  }
  const [info, setInfo] = useState({
    courseid: Number(courseid),
    roleid: 5,
  });
  const handleChange = (e) => {
    setInfo({
      ...info,
      roleid: Number(e.target.value),
    });
  };
  const handlerEnrolUser = async () => {
    try {
      if (
        confirm(
          `Estas seguro que quieres anotar al alumno ${info.userfullname} al curso ${courseName}`
        )
      ) {
        const res = await axios.post(`${HOST}enrolUser`, {
          username: user.username,
          domain: user.domain,
          info: {
            roleid: info.roleid,
            userid: info.userid,
            courseid: info.courseid,
          },
        });

        if (!res.data) {
          notify("El usuario fue matriculado.");

        }
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className={s.container}>
      <ToastInfo/>
      <div className={s.divCloseIcon}>
        <IoCloseSharp
          onClick={() => setEnrolUser(false)}
          className={s.iconClose}
        />
      </div>
      <p>{`Matricular alumno en el curso ${courseName}`}</p>
      <div className={s.containerForm}>
        <div className={s.enrolUser}>
          <label>Rol: </label>
          <select onChange={handleChange}>
            <option value={5} style={{ background: "#D9D9D9" }}>
              Alumno
            </option>
            <option value={3} style={{ background: "#EAEAEA" }}>
              Profesor
            </option>
            <option value={4} style={{ background: "#D9D9D9" }}>
              Profesor sin posibilidad de editar
            </option>
            <option value={1} style={{ background: "#EAEAEA" }}>
              Gestor
            </option>
          </select>
        </div>
        <div className={s.containerUserSelect}>
          <label>Usuarios: </label>
          <UserSelect setInfo={setInfo} info={info} />
        </div>
      </div>
      <button onClick={handlerEnrolUser} className={s.btn}>
        Matricular
      </button>
    </div>
  );
};
export default EnrolUser;
