import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../Redux/actions";
import { useState } from "react";
import s from "../../../css/AdminUsers.module.css";
import { BsWhatsapp } from "react-icons/bs";
import EmailPopOut from "../../EmailPopOut";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import loading from "../../../public/images/AdminHome/loading-loading-gif.gif";
import { ToastInfo, notifyError } from "../../../functions/toast";
import {  ThemeProvider } from '@mui/material/styles';
import customTheme from "../../../functions/tableTheme";
import CreateAdmin from "../AdminHome/CreateAdmin"
const AdminUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  let { user, allUsers } = useSelector((state) => state);
  const [flag, setFlag] = useState({
    state: false,
    to: [],
  });
  const [flagSuper, setFlagSuper] = useState({
    state: false,

  });

  if (allUsers?.length === 0) {
    dispatch(getAllUsers({ domain: user?.domain, token: user?.token }));
    return (
      <div className={s.divLoading}>
        <img src={loading} alt="loading" className={s.loading} />
      </div>
    );
  }

  const columns = [
    {
      field: "fullname",
      headerName: "NOMBRE",
      width: 300,
      description: "Haga click en un nombre para ver el detalle del usuario",
    },
    { field: "email", headerName: "EMAIL", width: 300 },
    {
      field: "phone1",
      headerName: "TELEFONO",
      width: 150,
      renderCell: (params) => {
        const phoneNumber = params.row.phone1;
        if (phoneNumber) {
          return (
            <div style={{ display: "flex" }}>
              <p>{params.row.phone1}</p>
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsWhatsapp
                  style={{ position: "relative", top: "15", marginLeft: "10" }}
                />
              </a>
            </div>
          );
        }
        return null;
      },
    },
  ];
  const rows = allUsers?.map((user) => {
    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phone1: user.phone1 ? user.phone1 : "",
    };
  });
  const handlerSendSelected = () => {
    if (users.length === 0) {
      notifyError("Debes selecionar al menos un usuario");
    } else {
      const usersInfo = users.map(
        (id) => allUsers.find((user) => user.id == id).email
      );

      setFlag({
        state: true,
        to: usersInfo,
      });
    }
  };

  return (
    <div className={s.box}>
      <ToastInfo />
      <div className={s.createUserBox}>
              <button onClick={() => navigate("/createUser")} className={s.btnCreate}>
        Crear usuario
      </button>
      <button onClick={()=>setFlagSuper({...flagSuper,state:!flagSuper.state})} className={s.btnCreate}>Crear Super Administrador</button>
      </div>

      <div style={{ height: 500, width: "100%" }}>
        <ThemeProvider theme={customTheme}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 6 },
              },
            }}
            pageSizeOptions={[6, 10, 40, 50]}
            checkboxSelection
            onRowSelectionModelChange={(user) => {
              setUsers(user);
            }}
            onCellClick={(params, e) => {

              if (params.field === "fullname") {
                navigate(`/adminHome/users/${params.id}`);
              }
            }}
          />
        </ThemeProvider>
      </div>
      <button
        onClick={handlerSendSelected}
        className={s.btnEmails}
      >{`Enviar mensaje a los usuarios seleccionados (${users?.length})`}</button>
      {flag.state ? (
        <EmailPopOut to={flag.to} flag={flag.state} setFlag={setFlag} />
      ) : (
        ""
      )}
      {
        flagSuper.state?<CreateAdmin
        domain={user?.domain}setFlags={setFlagSuper}flags={flagSuper} isSuperAdmin={true}
        />:""
      }
    
    </div>
  );
};

export default AdminUsers;
