// Validar los datos ingresados al formulario
function validarFormulario() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    if (name == "") {
        alert("El nombre es requerido");
        return false;
    }

    if (age == "") {
        alert("La edad es requerida");
        return false;
    } else if (age < 1) {
        alert("Introduzca un numero de edad válido");
        return false;
    }

    if (address == "") {
        alert("La dirección es requerida");
        return false;
    }

    if (email == "") {
        alert("El correo electrónico es requerido");
        return false;
    } else if (!email.includes("@")) {
        alert("Correo electrónico inválido");
        return false;
    }

    return true;
}

// Funcion para leer los datos
function leerDatos() {
    var listaPersonas;
    if (localStorage.getItem("listaPersonas") == null) {
        listaPersonas = [];
    } else {
        listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));
    }

    var html = "";

    listaPersonas.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html +=
            '<td><button onclick="eliminarDatos(' +
            index +
            ')" class="btn btn-danger">Eliminar</button><button onclick="actualizarDatos(' +
            index +
            ')" class="btn btn-warning m-2">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Cargar los datos cuando la página se recargue
document.onload = leerDatos();

// Funcion para agregar datos
function agregarDatos() {
    // Si el formulario es válido
    if (validarFormulario() == true) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;

        var listaPersonas;
        if (localStorage.getItem("listaPersonas") == null) {
            listaPersonas = [];
        } else {
            listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));
        }

        listaPersonas.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });

        localStorage.setItem("listaPersonas", JSON.stringify(listaPersonas));
        leerDatos();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}

// Funcion para eliminar datos
function eliminarDatos(index) {
    var listaPersonas;
    if (localStorage.getItem("listaPersonas") == null) {
        listaPersonas = [];
    } else {
        listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));
    }

    listaPersonas.splice(index, 1);
    localStorage.setItem("listaPersonas", JSON.stringify(listaPersonas));
    leerDatos();
}

// Funcion para actualizar los Datos
function actualizarDatos(index) {
    document.getElementById("enviar").style.display = "none";
    document.getElementById("actualizar").style.display = "block";

    var listaPersonas;
    if (localStorage.getItem("listaPersonas") == null) {
        listaPersonas = [];
    } else {
        listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));
    }

    document.getElementById("name").value = listaPersonas[index].name;
    document.getElementById("age").value = listaPersonas[index].age;
    document.getElementById("address").value = listaPersonas[index].address;
    document.getElementById("email").value = listaPersonas[index].email;

    document.querySelector("#actualizar").onclick = function () {
        if (validarFormulario() == true) {
            listaPersonas[index].name = document.getElementById("name").value;
            listaPersonas[index].age = document.getElementById("age").value;
            listaPersonas[index].address =
                document.getElementById("address").value;
            listaPersonas[index].email = document.getElementById("email").value;

            localStorage.setItem(
                "listaPersonas",
                JSON.stringify(listaPersonas)
            );
            leerDatos();
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            document.getElementById("enviar").style.display = "block";
            document.getElementById("actualizar").style.display = "none";
        }
    };
}
