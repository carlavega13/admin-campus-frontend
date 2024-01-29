const ConfirmPopOut=({confirmSend,setConfirmSend,text})=>{

return(
    <div>
        <h4>{`${text}`}</h4>
       <button onClick={()=>setConfirmSend({active:false,isConfirm:false})}>no</button>
       <button onClick={()=>setConfirmSend({active:false,isConfirm:true})}>si</button>
    </div>
)
}
export default ConfirmPopOut