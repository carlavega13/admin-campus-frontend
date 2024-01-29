import { useEffect, useState } from "react";
import { validator } from "../FirstLoginEditProfile/validator";
import s from "../../css/FirstLoginEditProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut, putUser } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { ToastInfo, notify } from "../../functions/toast";
const FirstLoginEditProfile = ({ rol }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
  });
  useEffect(() => {
    setError(validator(profile));
  }, [profile]);
  const handlerChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };
  const handlerSubmit = () => {
    setError(validator(profile));

    if (!error.firstName && !error.lastName && !error.phone && !error.email) {
      dispatch(
        putUser({
          ...profile,
          id: user.id,
          domain: user.domain,
          token: user.token,
        })
      );
      notify("Se actualizo su informacion");
      if (user.rol === "estudiante") {
        navigate("/studentHome");
      } else {
        navigate("/adminHome");
      }
    }
  };

  return (
    <div className={s.container}>
      <button
        className={s.btnLogOut}
        onClick={() => {
          dispatch(logOut());
          navigate("/");
        }}
      >
        LogOut
      </button>
      <ToastInfo />
      <div className={s.containerForm}>
        <div>
          <label htmlFor="">Nombres </label>
          <input
            onChange={handlerChange}
            name="firstName"
            value={profile.firstName}
            type="text"
            placeholder="Nombres"
          />
          {error?.firstName ? <p>{error.firstName}</p> : <p> </p>}
        </div>

        <div>
          <label htmlFor="">Apellidos </label>
          <input
            onChange={handlerChange}
            name="lastName"
            value={profile.lastName}
            type="text"
            placeholder="Apellidos"
          />
          {error?.lastName ? <p>{error.lastName}</p> : <p></p>}
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <label htmlFor="">DNI</label>
          <input
            onChange={handlerChange}
            name="dni"
            value={profile.dni}
            type="number"
            placeholder="DNI"
          />
        </div>

        <div>
          <label htmlFor="">Celular </label>
          <input
            onChange={handlerChange}
            name="phone"
            value={profile.phone}
            type="text"
            placeholder="Celular"
          />
          {error?.phone ? <p>{error.phone}</p> : <p></p>}
        </div>

        <button onClick={handlerSubmit} className={s.btnSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
};
export default FirstLoginEditProfile;
