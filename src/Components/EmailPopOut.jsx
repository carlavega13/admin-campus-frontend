import { useDispatch } from "react-redux";
import s from "../css/EmailPopOut.module.css";
import axios from "axios";
import { HOST } from "../../HOST";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { ToastInfo, notify } from "../functions/toast";
const EmailPopOut = (props) => {
  const [info, setInfo] = useState({
    subject: "",
    text: "",
  });

  const handleSendEmail = async () => {
    let confirm = window.confirm(
      "¿Estás seguro de que deseas enviar este email?"
    );
    if (confirm) {
      const response = await axios.post(`${HOST}postMail`, {
        ...info,
        to: props.to,
      });
      if (
        response.data[0].statusCode >= 200 &&
        response.data[0].statusCode < 300
      ) {
       notify("su mensaje a sido enviado");
        props.setFlag(false);
      }
    }
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={s.box}>
      <div>
        <ToastInfo/>
        <input
          name="subject"
          onChange={handleChange}
          value={info.subject}
          type="text"
          placeholder="Asunto del email."
          />
        <textarea
          name="text"
          onChange={handleChange}
          value={info.text}
          placeholder="Escriba su mensaje aqui."
          />
        <div className={s.btnsContainer}>

          <div className={s.btnSendContainer}onClick={handleSendEmail}>
            <button>Enviar</button>
            <IoSend color="#eeee"/>
          </div>

          <div className={s.btnCancelContainer}onClick={() => props.setFlag(false)}>
            <button>Cancelar</button>
            <ImCross className={s.btnCancel}/>
          </div>

        </div>
        <div className={s.divBackground}onClick={() => props.setFlag(false)}/>
      </div>
    </div>
  );
};
export default EmailPopOut;