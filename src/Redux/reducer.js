import {
  GET_ALL_USERS,
  GET_COURSES,
  LOGIN,
  PUT_USER,
  GET_GRADES,
  DELETE_ALL,
  PUT_HOME,
  GET_STUDENT_COURSES,
  GET_STUDENT_GRADES,
  RELOAD_USER,
  LOG_OUT,
  GET_TEACHER_COURSES,
} from "./actionTypes";

const initialState = {
  user: {
    id: 0,
    username: "",
    domain: "",
    token: "",
    rol: "",
    phone: "",
    email: "",
  },
  courses: [],
  allUsers: [],
  homeValue: "courses",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case PUT_USER:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: [...action.payload],
      };
    case GET_GRADES:
      let find = state.courses.findIndex(
        (course) => course.id == action.payload.id
      );
      let res = state.courses;
      res[find].enrolledPeople = action.payload.response;

      return {
        ...state,
        courses: res,
      };
    case DELETE_ALL:
      return {
        ...state,
        user: {
          id: 0,
          username: "",
          domain: "",
          token: "",
          rol: "",
          phone: "",
          email: "",
        },
        courses: [],
        allUsers: [],
        allUsersCopia: [],
      };

    case PUT_HOME:
      return {
        ...state,
        homeValue: action.payload,
      };
    case GET_STUDENT_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_STUDENT_GRADES:
      const index = state.courses.findIndex(
        (c) => c.id == action.payload.courseid
      );
      let course = state.courses;
      course[index].grades = action.payload.res.usergrades[0].gradeitems;
      return {
        ...state,
        courses: course,
      };
    case RELOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
      case GET_TEACHER_COURSES:

        return{
          ...state,
          courses:action.payload
        }
    case LOG_OUT:
      return {
      ...initialState
      };
    default:
      return { ...state };
  }
};

export default reducer;
