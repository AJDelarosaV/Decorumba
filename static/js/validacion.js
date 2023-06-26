const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");


const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{6,15}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10,13}$/ // 7 a 14 numeros.
}
const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario')
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre')
            break;

        case "password":
            validarCampo(expresiones.password, e.target, 'password')
            validarPassword2()
            break;
        case "password2":
            validarPassword2()
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo')
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono')
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo_${campo}`).classList.remove('grupo_formulario-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('grupo_formulario-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-check');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
        document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
        campos[campo] = true;

    } else {
        document.getElementById(`grupo_${campo}`).classList.add('grupo_formulario-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('grupo_formulario-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo_${campo}  .formulario_input-error`).classList.add('formulario_input-error-activo');
        document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
        campos[campo] = false;

    }
}
const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password')
    const inputPassword2 = document.getElementById('password2')

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo_password2`).classList.add('grupo_formulario-incorrecto');
        document.getElementById(`grupo_password2`).classList.remove('grupo_formulario-correcto');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-check');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo_password2  .formulario_input-error`).classList.add('formulario_input-error-activo')
        campos['password'] = false;
    } else {
        document.getElementById(`grupo_password2`).classList.remove('grupo_formulario-incorrecto');
        document.getElementById(`grupo_password2`).classList.add('grupo_formulario-correcto');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-check');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo_password2  .formulario_input-error`).classList.remove('formulario_input-error-activo')
        campos['password'] = true;
    }
}
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

// formulario.addEventListener('submit', (e) => {


//     const terminos = document.getElementById('terminos');

//     if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {

//         var nomBre = document.getElementById('nombre').value;
//         var passWord = document.getElementById('password2').value;
//         var email = document.getElementById('correo').value;
//         var usuario = document.getElementById('usuario').value;



//         if (typeof (Storage) !== "undefined") {
//             if (usuario !== sessionStorage.getItem('usuario')) {
//                 sessionStorage.setItem('userName', nomBre);
//                 sessionStorage.setItem('passWord', passWord);
//                 sessionStorage.setItem('correo', email);
//                 sessionStorage.setItem('usuario', usuario);
//                 sessionStorage.setItem('userLogin', 'true');
//                 alert('Datos guardados ')
//             } else {
//                 alert('Usuario ya existe inicie sesion!')
//             }

//         } else {
//             alert("Web Storage no soportado.")
//         }

//         formulario.reset();
//         document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
//         document.getElementById('formulario_mensaje_exito').classList.add('formulario_mensaje_exito-activo');

//         setTimeout(() => {
//             document.getElementById('formulario_mensaje_exito').classList.remove('formulario_mensaje_exito-activo');

//         }, 5000);

//         document.querySelectorAll('.grupo_formulario-correcto').forEach((icono) => {
//             icono.classList.remove('grupo_formulario-correcto');
//         });
//     } else {
//         document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
//         e.preventDefault();
//     }
// })