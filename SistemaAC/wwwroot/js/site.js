﻿$('#modalEditar').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

function getUsuario(id,action) {
    $.ajax({
        type: "POST",
        url: action,
        data: {id},
        success: function (response) {
            mostrarUsuario(response);
        }
    });
}
var items
var j = 0;
//Varoables globales por cada propiedad del usuario
var id;
var userName;
var email;
var phoneNumber;
var role;
var selectRole;
//Otras variables donde alamcenamos los datos del registro, pero estos datos no serán modificados
var accessFailedCount;
var concurrencyStamp;
var emailConfirmed;
var lockoutEnabled;
var lockoutEnd;
var normalizedUserName;
var normalizedEmail;
var passwordHash;
var phoneNumberConfirmed;
var securityStamp;
var twoFactorEnabled;

function mostrarUsuario(response) {
    items = response;
    for (var i = 0; i < 3; i++) {
        var x = document.getElementById('Select');
        x.remove(i);
    }
    $.each(items, function (index, val) {
        $('input[name=Id]').val(val.id);
        $('input[name=UserName]').val(val.userName);
        $('input[name=Email]').val(val.email);
        $('input[name=PhoneNumber]').val(val.phoneNumber);
        document.getElementById('Select').options[0] = new Option(val.role, val.roleId);

        //Mostrar los detalles del usuario
        $("#dEmail").text(val.email);
        $("#dUserName").text(val.userName);
        $("#dPhoneNumber").text(val.phoneNumber);
        $("#dRole").text(val.role);

        //Mostrar los datos del Usuario que deseo Eliminar
        $("#eUsuario").text(val.email);
        $("input[name=EIdUsuario]").val(val.id);
    });
}


function getRoles(action) {
    $.ajax({
        type: "POST",
        url: action,
        data: {},
        success: function (response) {
            if (j == 0) {
                for (var i = 0; i < response.length; i++) {
                    document.getElementById('Select').options[i] = new Option(response[i].text, response[i].value);
                    document.getElementById('SelectNuevo').options[i] = new Option(response[i].text, response[i].value);
                }
                j = 1;
            }
        }
    });
}
function editarUsuario(action) {
    id = $('input[name=Id]')[0].value;
    email = $('input[name=Email]')[0].value;
    phoneNumber = $('input[name=PhoneNumber]')[0].value;
    role = document.getElementById('Select');
    selectRole = role.options[role.selectedIndex].text;

    $.each(items, function (index, val) {
        userName = val.userName;
        accessFailedCount = val.accessFailedCount;
        concurrencyStamp = val.concurrencyStamp;
        emailConfirmed = val.emailConfirmed;
        lockoutEnabled = val.lockoutEnabled;
        lockoutEnd = val.lockoutEnd;
        normalizedUserName = val.normalizedUserName;
        normalizedEmail = val.normalizedEmail;
        passwordHash = val.passwordHash;
        phoneNumberConfirmed = val.phoneNumberConfirmed;
        securityStamp = val.securityStamp;
        twoFactorEnabled = val.twoFactorEnabled;
    });
    $.ajax({
        type: "POST",
        url: action,
        data: {
            id, userName, email, phoneNumber, accessFailedCount,
            concurrencyStamp, emailConfirmed, lockoutEnabled, lockoutEnd,
            normalizedEmail, normalizedUserName, passwordHash, phoneNumberConfirmed,
            securityStamp, twoFactorEnabled, selectRole
        },
        success: function (response) {
            if (response == "Save") {
                window.location.href = "/Usuarios";
            }
            else {
                alert("No se puede editar los datos del Usuario");
            }
        }
    });
}

function ocultarDetalleUsuario() {
    $("#modalDetalle").modal("hide");
}

function eliminarUsuario(action) {
    var id = $('input[name=EIdUsuario]')[0].value;
    $.ajax({
        type: "POST",
        url: action,
        data: {id},
        success: function (response) {
            console.log(id);
            if (response === "Delete") {
                window.location.href = "/Usuarios";
            }
            else
            {
                alert("No se puede eliminar el registro");
            }
        }
    });
}
function crearUsuario(action) {
    //Obtener los datos ingresados en los imputs respectivos
    email = $('input[name=EmailNuevo]')[0].value;
    phoneNumber = $('input[name=PhoneNumberNuevo]')[0].value;
    passwordHash = $('input[name=PasswordHashNuevo]')[0].value;
    role = document.getElementById('SelectNuevo');
    selectRole = role.options[role.selectedIndex].text;

    //Vamos a validar ahora que los datos del usuario no estén vacíos
    if (email == "") {
        $('#EmailNuevo').focus();
        alert("Ingrese email del usuario");
    } else {
        if (passwordHash == "") {
            $('#PasswordHashNuevo').focus();
            alert("Ingrese el password del usuario");
        }
        else {
            $.ajax({
                type: "POST",
                url: action,
                data: {
                    email, phoneNumber, passwordHash, selectRole
                },
                success: function (response) {
                    console.log(id);
                    if (response === "Save") {
                        window.location.href = "/Usuarios";
                    }
                    else {
                        $('#mensajeNuevo').html("No se puede guardar el usuario. <br> Seleccione un rol. <br> Ingrese un email correcto. <br> El password debe tener de 6-100 caracteres, almenos un caracter especial, una letra mayúscula y un número");
                    }
                }
            });
        }
    }
}