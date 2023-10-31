import Login from '../Login/Login.jsx'
import s from "../../css/LoginPage.module.css"
import background from "../../public/images/Login/unsplash_E2i7Hftb_rI.png"
import logo from "../../public/images/Login/Edutechpng.png"

export default function LoginPage () {
    return (
        <div className={s.divContainer}>
          <div className={s.container}>
            <div style={{position: "relative"
              }}>
              <img src={logo} 
                className={s.logo}
                />
              <img src={background} className={s.imgBackground} />
            </div>
            <div className={s.dos}>
                <Login/>
            </div>
          </div>
        </div>
    )
}