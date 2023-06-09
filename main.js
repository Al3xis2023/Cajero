// Datos de las cuentas
let usuarios = {
  usuario1: {
    password: "1234",
    saldo: 200
  },
  usuario2: {
    password: "abcd",
    saldo: 290
  },
  usuario3: {
    password: "qwerty",
    saldo: 67
  }
};

// Evento de inicio de sesión
document.getElementById("formulario").addEventListener("submit", function (event) {
  event.preventDefault();                                                                              // Evita que el formulario se envíe automáticamente

  let cuenta = document.getElementById("cuenta").value;
  let password = document.getElementById("password").value;

  if (validarInicioSesion(cuenta, password)) {
    mostrarOpciones(cuenta);
    actualizarSaldo(cuenta);
  } else {
    document.getElementById("mensaje").textContent = "Password incorrecto. Intenta nuevamente.";
    document.getElementById("password").value = "";                                                     // Limpiar el campo de password
  }
});

// Evento de consultar saldo
document.getElementById("consultarSaldo").addEventListener("click", function () {
  let cuenta = document.getElementById("cuenta").value;
  mostrarSaldo(cuenta);
});


// Evento de ingresar monto
document.getElementById("ingresarMonto").addEventListener("click", function () {
  let cuenta = document.getElementById("cuenta").value;
  let monto = prompt("Ingrese el monto a ingresar:");
  if (monto !== null) {
    ingresarMonto(cuenta, parseInt(monto));
  }
});


// Evento de retirar monto
document.getElementById("retirarMonto").addEventListener("click", function () {
  let cuenta = document.getElementById("cuenta").value;
  let monto = prompt("Ingrese el monto a retirar:");
  if (monto !== null) {
    retirarMonto(cuenta, parseInt(monto));
  }
});


// Función para validar el inicio de sesión
function validarInicioSesion(cuenta, password) {
  if (usuarios[cuenta] && usuarios[cuenta].password === password) {
    return true;
  }
  return false;
}


// Función para mostrar las opciones después del inicio de sesión exitoso
function mostrarOpciones(cuenta) {
  document.getElementById("formulario").style.display = "none";
  document.getElementById("opciones").style.display = "block";
  document.getElementById("mensaje").textContent = "¡Inicio de sesión exitoso! :)";

  // Mostrar el nombre de la cuenta seleccionada
  document.getElementById("cuenta").disabled = true;
  document.getElementById("cuenta").options[document.getElementById("cuenta").selectedIndex].disabled = true;
}

// Función para actualizar el saldo en el DOM
function actualizarSaldo(cuenta) {
  document.getElementById("saldo").textContent = "$" + usuarios[cuenta].saldo;
}

// Función para mostrar el saldo actual
function mostrarSaldo(cuenta) {
  let saldo = usuarios[cuenta].saldo;
  document.getElementById("mensaje").textContent = "Saldo actual: $" + saldo;
}

// Función para ingresar un monto en la cuenta
function ingresarMonto(cuenta, monto) {
  let saldoActual = usuarios[cuenta].saldo;
  let nuevoSaldo = saldoActual + monto;

  if (nuevoSaldo <= 990) {
    usuarios[cuenta].saldo = nuevoSaldo;
    document.getElementById("mensaje").textContent = "Monto ingresado: $" + monto + ". Nuevo saldo: $" + nuevoSaldo;
    actualizarSaldo(cuenta);
  } else {
    document.getElementById("mensaje").textContent = "El monto ingresado supera el límite permitido.";
  }
}

// Función para retirar un monto de la cuenta
function retirarMonto(cuenta, monto) {
  let saldoActual = usuarios[cuenta].saldo;
  let nuevoSaldo = saldoActual - monto;

  if (nuevoSaldo >= 10) {
    usuarios[cuenta].saldo = nuevoSaldo;
    document.getElementById("mensaje").textContent = "Monto retirado: $" + monto + ". Nuevo saldo: $" + nuevoSaldo;
    actualizarSaldo(cuenta);
  } else {
    document.getElementById("mensaje").textContent = "Fondos insuficientes para realizar el retiro.";
  }
}