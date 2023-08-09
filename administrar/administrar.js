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
      viewAll();
    } else {
      alert("Contraseña incorrecta. Inténtalo nuevamente.");
    }
  });

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
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
});
