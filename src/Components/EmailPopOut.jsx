import { useDispatch } from "react-redux"
import s from "../css/EmailPopOut.module.css"
import axios from "axios"
import { HOST } from "../../HOST"
import { useState } from "react"

const EmailPopOut=(props)=>{
const[info,setInfo]=useState({
    subject:"",
    text:""
})
console.log(props);
const handleSendEmail=async()=>{
   let confirm=window.confirm('¿Estás seguro de que deseas enviar este email?');
   if(confirm){
    const response=await axios.post(`${HOST}postMail`,{...info,to:props.to})
    if(response.data[0].statusCode>=200&&response.data[0].statusCode<300){
        alert("su mensaje a sido enviado")
        props.setFlag(false)
    }
   }
}
const handleChange=(e)=>{
    setInfo({
        ...info,
        [e.target.name]:e.target.value

    })
}

return(

            <div className={s.box}>
        <button onClick={()=>props.setFlag(false)}>X</button>
        <input name="subject" onChange={handleChange} value={info.subject} type="text" placeholder="Asunto del email."/>
        <textarea name="text" onChange={handleChange} value={info.text} placeholder="Escriba su mensaje aqui."/>
        <button onClick={handleSendEmail}>Enviar email</button>

 
    </div>

)
}
export default EmailPopOut