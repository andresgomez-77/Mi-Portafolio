//Haz tú validación en javascript acá
const formulario = document.getElementById("formulario");
const inputs=document.querySelectorAll("#formulario input")
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    asunto: /^[a-zA-Z0-9\_\-]{4,16}$/ // Letras, numeros, guion y guion_bajo
}
const campos = {
    nombre: false,
    email: false,
    asunto: false
}
const validarFormulario = (e)=> {
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre,e.target,"nombre");
        break
        case "email":
            validarCampo(expresiones.correo,e.target,"email");
        break
        case "asunto":
            validarCampo(expresiones.asunto,e.target,"asunto");
        break
    }
}

const validarCampo = (expresion,input,campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`formcontato__${campo}`).classList.remove("col-3__form-incorrecto");
        document.getElementById(`formcontato__${campo}`).classList.add("col-3__form-correcto");
        document.querySelector(`#formcontato__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#formcontato__${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#formcontato__${campo} .formcontato__input-error`).classList.remove("formcontato__input-error-activo");
        campos[campo] = true;
    }else{
        document.getElementById(`formcontato__${campo}`).classList.add("col-3__form-incorrecto");
        document.getElementById(`formcontato__${campo}`).classList.remove("col-3__form-correcto");
        document.querySelector(`#formcontato__${campo} i`).classList.add("fa-times-circle");
        document.querySelector(`#formcontato__${campo} i`).classList.remove("fa-check-circle");
        document.querySelector(`#formcontato__${campo} .formcontato__input-error`).classList.add("formcontato__input-error-activo");
        campos[campo] = false;
    }
}
inputs.forEach((input)=>{
    input.addEventListener('keyup',validarFormulario);
    input.addEventListener('blur',validarFormulario);
});

formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(campos.nombre && campos.email && campos.asunto){
        formulario.reset();
        document.getElementById("formcontato__mensaje-exito").classList.add("formcontato__mensaje-exito-activo");
        setTimeout(()=>{
            document.getElementById("formcontato__mensaje-exito").classList.remove("formcontato__mensaje-exito-activo");
        },5000);
        document.querySelectorAll(".col-3__form-correcto").forEach((icono) =>{
            icono.classList.remove("col-3__form-correcto");
        })
    }else{
        document.getElementById("formcontato__mensaje").classList.add("formcontato__mensaje-activo");
    }

});
const cuadroMessage= document.querySelector(".col-3 .counter");
let maxLength=300;
const cuadroTexto = document.getElementById("mensage");
cuadroTexto.addEventListener("keydown",function(a){
    if(maxLength==0 && a.key != "Backspace"){
        a.preventDefault();
        return;
    }
    if(a.key=="Backspace"){
        maxLength=maxLength+1;
        cuadroMessage.innerHTML= maxLength;
    }else{
        maxLength=maxLength-1;
        cuadroMessage.innerHTML= maxLength;
    }

})

let envio = document.getElementById("envio")

envio.addEventListener("click", (event) => {
  event.preventDefault()
  if (cuadroTexto.value === "") {
        document.getElementById("formcontato__campotext").classList.add("formcontato__campotext-activo");
    }else{
        document.getElementById("formcontato__campotext").classList.remove("formcontato__campotext-activo");
    }
})





















