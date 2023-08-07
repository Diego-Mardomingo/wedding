$(document).ready(function () {
  
  viewAll();
});

function insertarPersona(nombre,apellidos,edad,menu,asistencia,dormir,comentarios,alergias){
  $.ajax({
    type: "post",
    url: "./php/INSERT_persona.php",
    data: {
      nombre: nombre,
      apellidos: apellidos,
      edad: edad,
      menu: menu,
      asistencia: asistencia,
      dormir: dormir,
      comentarios: comentarios,
      alergias: alergias
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