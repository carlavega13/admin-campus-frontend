import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminCourses from "../AdminCourses/AdminCourses.jsx";
import AdminUsers from "../AdminUsers/AdminUsers.jsx";
import ChangeDomain from "../AdminHome/ChangeDomain.jsx";
import s from "../../../css/AdminHome.module.css";
import setting from "../../../public/images/AdminHome/setting.png";
import selectSetting from "../../../public/images/AdminHome/select_setting.png";
import { FaUser, FaFileAlt } from "react-icons/fa";
import { CgMenu } from "react-icons/cg";
import { TfiExchangeVertical } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
import EditProfile from "../../EditProfile/EditProfile.jsx";
import { logOut, putHome } from "../../../Redux/actions.js";
import ChangeRoles from "../AdminRoles/ChangeRoles.jsx";
import { FaUserAlt } from "react-icons/fa";
import { ToastInfo } from "../../../functions/toast.jsx";
import { VscDebugDisconnect } from "react-icons/vsc";

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const value = useSelector((state) => state.homeValue);
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [value]);
  if (!user?.phone || !user?.email) {
    navigate("/firstEditProfile");
  }
  return (
    <div className={s.containerAll}>
      <ToastInfo />
      <div className={s.container}>
        <div className={s.divSettings}>
          <div className={s.settings}>
            <p>
              {user?.firstname} {user?.lastname}
            </p>
            <img
              onClick={() => dispatch(putHome("editProfile"))}
              src={value === "editProfile" ? selectSetting : setting}
              className={`${s.iconSettings} ${
                value === "editProfile" ? s.selectedProfile : null
              }`}
            />
          </div>
          <p>{user?.username}</p>
        </div>

        <div className={s.divBtnsOptions}>
          <div
            onClick={() => dispatch(putHome("users"))}
            className={value === "users" ? s.borderGr : s.borderDefault}
          >
            <FaUser
              className={s.icons2}
              color={value === "users" ? "#59B4B4" : "#868AA5"}
            />
            <p className={value === "users" ? s.selected : null}>Usuarios</p>
            <CgMenu
              className={s.icons}
              color={value === "users" ? "#9283BD" : "#868AA5"}
            />
          </div>

          <div
            onClick={() => dispatch(putHome("courses"))}
            className={value === "courses" ? s.borderGr : s.borderDefault}
          >
            <FaFileAlt
              className={s.icons2}
              color={value === "courses" ? "#59B4B4" : "#868AA5"}
            />
            <p className={value === "courses" ? s.selected : null}>Cursos</p>
            <CgMenu
              className={s.icons}
              color={value === "courses" ? "#9283BD" : "#868AA5"}
            />
          </div>
          {user?.isSuperAdmin ? (
            <div
              onClick={() => dispatch(putHome("changeDomain"))}
              className={
                value === "changeDomain" ? s.borderGr : s.borderDefault
              }
            >
              <TfiExchangeVertical
                className={s.icons}
                color={value === "changeDomain" ? "#59B4B4" : "#868AA5"}
              />
              <p
                className={`${s.pUrl} ${
                  value === "changeDomain" ? s.selected : null
                }`}
              >
                Cambiar URL del Moodle activo
              </p>
              <CgMenu
                className={s.icons}
                color={value === "changeDomain" ? "#9283BD" : "#868AA5"}
              />
            </div>
          ) : (
            ""
          )}

          <div
            onClick={() => dispatch(putHome("roles"))}
            className={value === "roles" ? s.borderGr : s.borderDefault}
          >
            <MdAdminPanelSettings
              className={s.icons}
              color={value === "roles" ? "#59B4B4" : "#868AA5"}
            />
            <p className={`${value === "roles" ? s.selected : null}`}>Roles</p>
            <CgMenu
              className={s.icons}
              color={value === "roles" ? "#9283BD" : "#868AA5"}
            />
          </div>

          <div
            onClick={() => {
              dispatch(logOut());
              navigate("/");
            }}
          >
            <CiLogout className={s.icons} color={"#868AA5"} />
            <p>Logout</p>
            <VscDebugDisconnect
              className={s.icons}
              color={value === "roles" ? "#9283BD" : "#868AA5"}
            />
          </div>
        </div>
      </div>

      <div className={s.right}>
        {value === "editProfile" ? <EditProfile /> : null}
        {value === "courses" ? <AdminCourses /> : null}

        {value === "users" ? <AdminUsers /> : null}

        {value === "changeDomain" ? <ChangeDomain /> : null}
        {value === "roles" ? <ChangeRoles user={user} /> : null}
      </div>
    </div>
  );
};
export default AdminHome;
