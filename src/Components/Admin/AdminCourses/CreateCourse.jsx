import { useState } from "react";
import axios from "axios";
import { HOST } from "../../../../HOST";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";
import s from "../../../css/CreateCourse.module.css";
import { notify, notifyError, ToastInfo } from "../../../functions/toast";
const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    fullname: "",
    shortname: "",
    categoryid: "1",
  });
  const { domain, username, token } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      if (
        confirm(`Estas seguro que quieres crear el curso: ${info?.fullname}? `)
      ) {
        const res = await axios.post(`${HOST}postCourse`, {
          domain,
          username,
          info: info,
        });
        if (res.data.errorcode) {
          return notifyError(`Hubo un error: ${res.data.message}`);
        }
        if (res.data[0].id) {
          dispatch(getCourses({ domain, token }));
          notify("Su curso se creo correctamente");
          // navigate("/adminHome");
          return;
        }
      }
    } catch (error) {
      notifyError(error.message);
    }
  };
  return (
    <div className={s.container}>
      <ToastInfo />
      <div className={s.formContainer}>
        <button onClick={() => navigate("/adminHome")} className={s.btns}>
          Home
        </button>

        <div>
          <label htmlFor="">Nombre del curso</label>
          <input
            onChange={handleChange}
            value={info?.fullname}
            name="fullname"
            type="text"
            placeholder="Nombre del curso"
          />
        </div>

        <div>
          <label htmlFor="">Nombre corto</label>
          <input
            onChange={handleChange}
            value={info?.shortname}
            name="shortname"
            type="text"
            placeholder="Nombre corto"
          />
        </div>
        <div>
          <label htmlFor="">Categoria ID (default 1) </label>
          <input
            onChange={handleChange}
            value={info?.categoryid}
            type="number"
            name="categoryid"
            placeholder="Categoria ID"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            style={{ marginTop: "1rem", alignSelf: "flex-end" }}
            className={s.btns}
          >
            Crear curso
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateCourse;
