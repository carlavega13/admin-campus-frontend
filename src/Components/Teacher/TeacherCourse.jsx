import { useDispatch, useSelector } from "react-redux"
import { getTeacherCourse } from "../../Redux/actions"
import { DataGrid } from "@mui/x-data-grid"
import { BsWhatsapp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const TeacherCourse=({user})=>{
const navigate=useNavigate()
    const dispatch=useDispatch()
    const courses=useSelector(state=>state.courses)
    if(courses.length===0){
        dispatch(getTeacherCourse({domain:user.domain,token:user.token,userid:user.id}))
    }
    const columns=[
        {
            field: "course",
            headerName: "CURSOS",
            width: 600,
            description: "Haga click en un nombre para ver el detalle del curso",
        },
        {
            field: "usersamount",
            headerName: "ESTUDIANTES",
            description: "CANTIDAD DE ESTUDIANTES",
            width: 150,
        },
        {
            field: "teacher",
            headerName: "PROFESOR",
            width: 300,
            renderCell: (params) => {
                const phoneNumber = params.row.phone1;
                if (phoneNumber) {
                    return (
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "300px",
                        }}
                        >
                    <p>{params.row.teacher}</p>
                    <a
                      href={`https://wa.me/${phoneNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      >
                      <BsWhatsapp style={{ color: "#2f3367" }} />
                    </a>
                  </div>
                );
            }
            return (
                <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: "300px",
                }}
                >
                  <p>{params.row.teacher ? params.row.teacher : ""}</p>
                </div>
              );
            },
        },
    ]
    const rows = courses?.map((course) => {
        return {
            id: course.id,
            course: course.name,
            usersamount: course.enrolledPeople.length,
            teacher: course.teacher[0] ? course.teacher[0].fullname : "",
          phone1:
          course.teacher[0] && course.teacher[0].phone1
          ? course.teacher[0].phone1
          : "",
        };
    });

    return  (
        <div>
      <DataGrid
      columns={columns}
      rows={rows}
      onCellClick={(params, e) => {
        if (params.row.usersamount >= 1) {
          if (params.field === "course") {
            navigate(`/courseDetail/${params.id}`);
          }
        }
      }}
      />
    </div>
)
}
export default TeacherCourse