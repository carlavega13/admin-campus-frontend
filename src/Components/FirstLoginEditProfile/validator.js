export const validator=({firstName,lastName,email,DNI,phone})=>{
const regexName=/[0-9!@#$%^&*()_+{}\[\]:;<>,.?\\|\/~-]/;
const regexEmail= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPhone=/^\+[0-9]{1,3}-?[0-9]+$/;
const error={
    firstName:"",
    lastName:"",
    email:"",
    phone:""

}
//? VALIDACION DE NOMBRE
if(firstName.length<2){
   error.firstName="El nombre tiene que tener mas de 1 letras."
}
if(regexName.test(firstName)){
    error.firstName="El nombre no puede contener simbolos numeros."
}
//? VALIDACION DE APELLIDO
 if(lastName.length<2){
    error.lastName="El apellido tiene que tener mas de 1 letras."
 }
 if(regexName.test(lastName)){
    error.lastName="El apellido no puede contener simbolos numeros."
}
//? VALIDACION DE EMAIL 
if(!regexEmail.test(email)){
error.email="Este email no es valido."
}
//? VALIDACION DE TELEFONO
if(!regexPhone.test(phone)){
    error.phone="Este numero no es valido."
}

return error
}
