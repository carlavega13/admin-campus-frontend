import { GET_ALL_USERS, GET_COURSES, LOGIN, PUT_USER,GET_GRADES } from "./actionTypes"

const initialState={
    user:{
        id:0,
        username:"",
        domain:"",
        token:"",
        rol:"",
        phone:"",
        email:""
    },
    courses:[],
    allUsers:[],
    allUsersCopia:[]
}

const reducer=(state=initialState,action)=>{
switch (action.type) {
    case LOGIN:
        return {
            ...state,
            user:{
                ...action.payload

            }
        }
    case GET_COURSES:
        return{
            ...state,
         courses:action.payload
        }

    case PUT_USER:
        return {
            ...state,
         user:{
            ...action.payload
         }
        }
        case GET_ALL_USERS:
            return{
                ...state,
                allUsers:[...action.payload],
                allUsersCopia:[...action.payload]
            }
            case GET_GRADES:
                let find=state.courses.findIndex(course=>course.id==action.payload.id)
                let res=state.courses
                res[find].enrolledPeople=action.payload.response
              
                return{
                    ...state,
                    courses:res
                }
                    
    default:
        return {...state}
}
}
 
export default reducer