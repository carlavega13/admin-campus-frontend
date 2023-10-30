import Login from '../Login/Login.jsx'
import s from "../../css/LoginPage.module.css"
import background from "../../public/images/Login/unsplash_E2i7Hftb_rI.png"

export default function LoginPage () {
    return (
        <div className={s.divContainer}>
          <div className={s.container}>
            <img src={background} className={s.imgBackground} />
            <div className={s.dos}>
                <Login/>
            </div>
          </div>
        </div>
    )
}