$(document).ready(function () {
  const modal = document.getElementById("modal");
  const content = document.getElementById("content");
  const passwordInput = document.getElementById("passwordInput");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {
    const enteredPassword = passwordInput.value;
    const correctPassword = "azul2020."; // Cambia esto por tu contraseña correcta

    if (enteredPassword === correctPassword) {
      modal.style.display = "none";
      content.style.display = "block";
    } else {
      alert("Contraseña incorrecta. Inténtalo nuevamente.");
    }
  });
  viewAll();

  function viewAll() {
    $.ajax({
      type: "post",
      url: "../php/SELECT_personas.php",
      data: "",
      dataType: "json",
      success: function (response) {
        console.log("SELECT", response);
        const tableBody = $("#dataTable tbody");

        response.forEach((item) => {
          const row = $("<tr>");
          row.append(`<td>${item.nombre}</td>`);
          row.append(`<td>${item.apellidos}</td>`);
          row.append(`<td>${item.edad}</td>`);
          row.append(`<td>${item.menu}</td>`);
          row.append(`<td>${item.asistencia}</td>`);
          row.append(`<td>${item.dormir}</td>`);
          row.append(`<td>${item.alergias}</td>`);
          tableBody.append(row);
        });

        let numAdultos = 0;
        let numNinos = 0;
        let numTotal = 0;
        let numCarne = 0;
        let numVegano = 0;
        let asistencia = 0;
        let noasistencia = 0;
        let dormir = 0;
        let nodormir = 0;
        for (let i = 0; i < response.length; i++) {
          if (response[i].asistencia === "Si") {
            asistencia++;
            if (response[i].edad === "Adulto") {
              numAdultos++;
            } else if (response[i].edad === "Niño") {
              numNinos++;
            }

            if (response[i].menu === "Carne") {
              numCarne++;
            } else if (response[i].menu === "Vegano") {
              numVegano++;
            }

            if (response[i].dormir === "Si") {
              dormir++;
            } else if (response[i].dormir === "No") {
              nodormir++;
            }
          } else if (response[i].asistencia === "No") {
            noasistencia++;
          }
          numTotal++;
        }

        let divTotal = document.createElement("div");
        $(divTotal).addClass("divTotal");
        $(divTotal).addClass("tarjeta");
        $(divTotal).append(
          "<div>Número de personas totales inscritas</div><div>" +
            numTotal +
            "</div>"
        );
        $("#dataTable").before(divTotal);

        let divAsistencia = document.createElement("div");
        $(divAsistencia).addClass("divAsistencia");
        $(divAsistencia).addClass("tarjeta");
        $(divAsistencia).append(
          "<div>Número de personas que asisten</div><div>" +
            asistencia +
            "</div>"
        );
        $("#dataTable").before(divAsistencia);

        let divNoAsistencia = document.createElement("div");
        $(divNoAsistencia).addClass("divNoAsistencia");
        $(divNoAsistencia).addClass("tarjeta");
        $(divNoAsistencia).append(
          "<div>Número de personas que NO asisten</div><div>" +
            noasistencia +
            "</div>"
        );
        $("#dataTable").before(divNoAsistencia);

        let divAdultos = document.createElement("div");
        $(divAdultos).addClass("divAdultos");
        $(divAdultos).addClass("tarjeta");
        $(divAdultos).append(
          "<div>Número adultos</div><div>" + numAdultos + "</div>"
        );
        $("#dataTable").before(divAdultos);

        let divNinos = document.createElement("div");
        $(divNinos).addClass("divNinos");
        $(divNinos).addClass("tarjeta");
        $(divNinos).append(
          "<div>Número niños</div><div>" + numNinos + "</div>"
        );
        $("#dataTable").before(divNinos);

        let divCarne = document.createElement("div");
        $(divCarne).addClass("divCarne");
        $(divCarne).addClass("tarjeta");
        $(divCarne).append("<div>Menú carne</div><div>" + numCarne + "</div>");
        $("#dataTable").before(divCarne);

        let divVegano = document.createElement("div");
        $(divVegano).addClass("divVegano");
        $(divVegano).addClass("tarjeta");
        $(divVegano).append(
          "<div>Menú vegano</div><div>" + numVegano + "</div>"
        );
        $("#dataTable").before(divVegano);

        let divDormir = document.createElement("div");
        $(divDormir).addClass("divDormir");
        $(divDormir).addClass("tarjeta");
        $(divDormir).append(
          "<div>Número de personas que se quedan a dormir</div><div>" +
            dormir +
            "</div>"
        );
        $("#dataTable").before(divDormir);

        let divNoDormir = document.createElement("div");
        $(divNoDormir).addClass("divNoDormir");
        $(divNoDormir).addClass("tarjeta");
        $(divNoDormir).append(
          "<div>Número de personas que NO se quedan a dormir</div><div>" +
            nodormir +
            "</div>"
        );
        $("#dataTable").before(divNoDormir);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
});
