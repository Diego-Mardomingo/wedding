$(document).ready(function () {
  insertarPersona();
  viewAll();
});

function insertarPersona(){
  $.ajax({
    type: "post",
    url: "./php/INSERT_persona.php",
    data: {
      nombre: "Diego",
      apellidos: "López Mardomingo",
      edad: "Adulto",
      menu: "Normal",
      asistencia: "Si",
      dormir: "Si"
    },
    dataType: "json",
    success: function (response) {
      console.log('INSERTAR',response);
    },
    error: function(error){
      console.log(error);
    }
  });
}

function viewAll(){
  $.ajax({
    type: "post",
    url: "./php/SELECT_personas.php",
    data: "",
    dataType: "json",
    success: function (response) {
      console.log('SELECT',response);
    },
    error: function(error){
      console.log(error);
    }
  });
}