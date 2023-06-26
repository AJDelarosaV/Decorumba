const formContacto = document.getElementById("formulario-contacto");
const imputs = document.querySelectorAll("#formulario-contacto input")

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10,13}$/, // 7 a 14 numeros.
    asunto: /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // Letras y espacios, pueden llevar acentos.
}

const campos = {
    nombre: false,
    asunto: false,
    correo: false,
    telefono: false
}
const validarFormularioContacto = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampos(expresiones.nombre, e.target, 'nombre')
            break;
        case "asunto":
            validarCampos(expresiones.nombre, e.target, 'asunto')
            break;
        case "email":
            validarCampos(expresiones.correo, e.target, 'correo')
            break;
        case "telefono":
            validarCampos(expresiones.telefono, e.target, 'telefono')
            break;
    }
}

const validarCampos = (expresion, input, campo) => {
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

imputs.forEach((input) => {
    input.addEventListener('keyup', validarFormularioContacto);
    input.addEventListener('blur', validarFormularioContacto);
});

formContacto.addEventListener('submit', (e) => {


    const terminos = document.getElementById('terminos');
    const withCopy = document.getElementById('wCopy');
    var wEmail = document.getElementById('email').value;
    withCopy.value = wEmail;
    console.log(withCopy.value)


    if (campos.nombre && campos.asunto &&  campos.correo && campos.telefono && terminos.checked) {

        // formContacto.reset();
        document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
        document.getElementById('formulario_mensaje_exito').classList.add('formulario_mensaje_exito-activo');

        setTimeout(() => {
            document.getElementById('formulario_mensaje_exito').classList.remove('formulario_mensaje_exito-activo');

        }, 5000);

        document.querySelectorAll('.grupo_formulario-correcto').forEach((icono) => {
            icono.classList.remove('grupo_formulario-correcto');
        });
    } else {
        document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
        e.preventDefault();
    }
})