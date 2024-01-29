import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HOST } from "../../../../HOST";
import s from "../../../css/CreateAdmin.module.css";
import { ToastInfo, notify, notifyError } from "../../../functions/toast";

const CreateAdmin = ({ domain, isSuperAdmin, setFlags, flags }) => {
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateUser = async () => {
    try {
      let passRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
      if (!passRegex.test(info?.password)) {
        notifyError(
          "La contraseña debería tener al menos 8 caracter(es), al menos 1 dígito(s), al menos 1 minúscula(s), al menos 1 mayúscula(s), al menos 1 caracter(es) no alfanuméricos como *,-, o #"
        );
      } else {

  const res=await axios.post(`${HOST}createSuperAdmin`,{
    username:info?.username,
    password:info?.password,
    domain:domain,
    isSuperAdmin:isSuperAdmin
  })
  notify(res.data)
      }
    } catch (error) {
      notifyError(error.response.data);
    }
  };

  if (isSuperAdmin) {
    return (
      <div className={s.container}>
        <ToastInfo/>
        <div className={s.closeBox}>

        <button className={s.close} onClick={()=>setFlags({...flags,state:false})}>X</button>
        </div>
        <div>
          <label>Nombre de usuario</label>
          <input
            name="username"
            onChange={handleOnChange}
            value={info?.username}
            type="text"
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            name="password"
            onChange={handleOnChange}
            value={info?.password}
            type="text"
          />
        </div>

        <p style={{ color: "#59B4B4", fontSize: ".9rem" }}>
          La contraseña debería tener al menos 8 caracteres, al menos 1
          dígito(s), al menos 1 minúscula(s), al menos 1 mayúscula(s), al menos
          1 caracter(es) no alfanuméricos como *,-, o #
        </p>
        <div>
          <button onClick={handleCreateUser} className={s.btnCreate}>
            Crear Usuario
          </button>
        </div>
      </div>
    );
  }
};
export default CreateAdmin;
