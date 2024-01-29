import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HOST } from "../../../../HOST";
import s from "../../../css/AdminUserDetail.module.css";
import { GrMailOption } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import EmailPopOut from "../../EmailPopOut";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../../../functions/tableTheme";
import { ToastInfo } from "../../../functions/toast";
import profileimg from "../../../public/images/Login/Profile.png";
export const dateTransfer = (timeStamp) => {
  const fecha = new Date(timeStamp * 1000);
  const opciones = { year: "numeric", month: "long", day: "numeric" };
  return fecha.toLocaleDateString("es-ES", opciones);
};
const AdminUserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flag, setFlag] = useState({
    state: false,
    to: "",
  });
  const [info, setInfo] = useState([]);
  const { token, domain } = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  let user = allUsers?.find((u) => u.id == id);

  let order = {};
  const handleEnvolope = (to) => {
    setFlag({
      state: true,
      to: to,
    });
  };
  useEffect(() => {
    const courses = async () => {
      let a = [];

      for (let i = 0; i < user?.enrolledcourses?.length; i++) {
        let response = await axios.post(`${HOST}getGrades`, {
          token,
          domain,
          people: [user],
          id: user.enrolledcourses[i].id,
        });
        order = {
          course: response.data[0].enrolledcourses.find(
            (c) => c.id == user?.enrolledcourses[i]?.id
          ),
          grades: response.data[0].grades,
        };

        a.push(order);
      }

      setInfo(a);
    };
    courses();
  }, []);

  let aux = 0;

  info?.forEach((i) => {
    if (!i.grades) {
      return;
    }
    if (i.grades.length > aux) {
      aux = i.grades.length;
    }
  });

  const columns = [
    { field: "course", headerName: "CURSOS", width: 300 },
    { field: "lastaccess", headerName: "ULTIMO ACCESO", width: 100 },
  ];
  for (let i = 0; i < aux; i++) {
    if (i === aux - 1) {
      columns.push({
        field: `finalactivity`,
        headerName: "Calificacion final",
        width: 300,
      });
    } else {
      columns.push({ field: `activity${i}`, headerName: "", width: 300 });
    }
  }

  const rows = info?.map((i) => {
    let e = 0;
    let a = {
      id: i.course.id,
      course: i.course.fullname,
      lastaccess: i.course.lastaccess && `${dateTransfer(i.course.lastaccess)}`,
    };
    if (i.grades) {
      i.grades.forEach((element) => {
        if (element.itemname) {
          a[`activity${e}`] = `${element.itemname}/${
            element.graderaw ? element.graderaw : ""
          }`;
          e++;
        } else {
          a.finalactivity = element.graderaw && element.graderaw;
        }
      });
    }

    return a;
  });

  return (
    <div className={s.box}>
      <ToastInfo />
      <button onClick={() => navigate("/adminHome")} className={s.btn}>
        HOME
      </button>
      <div className={s.name}>
      <h1>{user?.fullname}</h1>
        <img className={s.photo} src={user?.profileimageurl} alt="Not found" />
      </div>
      <div onClick={() => handleEnvolope(user?.email)} className={s.divEmail}>
        <p>{user?.email}</p>
        <GrMailOption />
      </div>

      {user.phone1 && (
        <h5>
          {user?.phone1}
          <a href={`https://wa.me/${user?.phone1}`} className={s.phone}>
            <BsWhatsapp />
          </a>
        </h5>
      )}
      <p>Primer acceso: {dateTransfer(user.firstaccess)}</p>
      <div
        style={{
          height: "fit-content",
          width: "100%",
        }}
      >
        <ThemeProvider theme={customTheme}>
          <DataGrid
            columns={columns}
            style={{ width: "99%" }}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 40, 50]}
          />
        </ThemeProvider>
      </div>

      {flag?.state && (
        <EmailPopOut to={flag.to} flag={flag.state} setFlag={setFlag} />
      )}
    </div>
  );
};
export default AdminUserDetail;
