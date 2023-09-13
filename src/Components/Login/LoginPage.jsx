import Login from '../Login/Login.jsx'
import s from "../../css/LoginPage.module.css"
export default function LoginPage () {
    return (
        <div className={s.divContainer}>
          <div className={s.uno}>Icono</div>
          <div className={s.dos}>
              <Login/>
          </div>
        </div>
    )
}