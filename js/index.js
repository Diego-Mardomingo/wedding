$(document).ready(function () {

  document.querySelector('#numAdultos').addEventListener('input', () => {
    console.log($('#numAdultos').val());
    crearInputs('adultos',$('#numAdultos').val());
  });
  document.querySelector('#numNinos').addEventListener('input', () => {
    console.log($('#numNinos').val());
    crearInputs('ninos',$('#numNinos').val());
  });
  viewAll();
});

function crearInputs(tipo,numInputs){
  $('.inputs'+tipo).remove();
  let inputs = document.createElement('div');
  $(inputs).addClass('inputs'+tipo);
  for (let i = 0; i < numInputs; i++) {
    let input = document.createElement('div');
    $(input).addClass('input'+i);
    let nombre = document.createElement('input');
    $(nombre).addClass('nombre'+i);
    $(nombre).attr('placeholder', 'Nombre');
    $(input).append(nombre);
    let apellidos = document.createElement('input');
    $(apellidos).addClass('apellidos'+i);
    $(apellidos).attr('placeholder', 'Apellidos');
    $(input).append(apellidos);
    $(inputs).append(input);
  }
  $('.'+tipo).append(inputs);
}

function insertarPersona(nombre,apellidos,edad,menu,asistencia,dormir,alergias){
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