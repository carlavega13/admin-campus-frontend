import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sheet=()=>{
    const notify = (msg)=> toast(`${msg}`, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
return (
    <div>
        <button onClick={()=>notify("esto es una notificación")}>click</button>
        <div>
              <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
        </div>
       
    </div>
)

}
export default Sheet


     



