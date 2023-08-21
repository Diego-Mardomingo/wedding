$(document).ready(function () {

  document.querySelector('#numAdultos').addEventListener('input', () => {
    console.log($('#numAdultos').val());
    crearInputs('adultos',$('#numAdultos').val());
  });
  document.querySelector('#numNinos').addEventListener('input', () => {
    console.log($('#numNinos').val());
    crearInputs('ninos',$('#numNinos').val());
  });
  
  $('.enviar').click(function (e) { 
    e.preventDefault();
    validar();
  });

  document.querySelector('.toFormacion').addEventListener('click', () => {
    const navHeight = document.querySelector(".encabezado").offsetHeight;
    // const imagenHeight = document.querySelector(".imagen").offsetHeight;
    // let position = imagenHeight - navHeight;
    window.scrollTo({
      top: navHeight,
      behavior: 'smooth'
    });
  });
  

});

function crearInputs(tipo,numInputs){
  $('.inputs'+tipo).remove();
  let inputs = document.createElement('div');
  $(inputs).addClass('inputs'+tipo);
  for (let i = 0; i < numInputs; i++) {
    let input = document.createElement('div');
    $(input).addClass(tipo+'input'+i);
    let nombre = document.createElement('input');
    $(nombre).addClass(tipo+'nombre'+i);
    $(nombre).attr('placeholder', 'Nombre');
    $(input).append(nombre);
    let apellidos = document.createElement('input');
    $(apellidos).addClass(tipo+'apellidos'+i);
    $(apellidos).attr('placeholder', 'Apellidos');
    $(input).append(apellidos);

    let menu = document.createElement('div');
    $(menu).addClass('menu'+i);
    let menu2 = document.createElement('div');
    $(menu2).addClass('negrita');
    $(menu2).text('Escoge un menú: ');
    let select = document.createElement('select');
    $(select).attr('id', tipo+'menu'+i);
    $(select).attr('name', tipo+'menu'+i);
    let option1 = document.createElement('option');
    $(option1).attr('value', 'Carne');
    $(option1).text('Carne');
    $(select).append(option1);
    let option2 = document.createElement('option');
    $(option2).attr('value', 'Vegano');
    $(option2).text('Vegano');
    $(select).append(option2);
    $(menu2).append(select);
    $(menu).append(menu2);
    $(input).append(menu);


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

function validar(){
  let valido = true;
  let asistencia;
  let dormir;

  let asistencia_no = document.querySelector('#asistencia_no');
  let asistencia_si = document.querySelector('#asistencia_si');
  let dormir_no = document.querySelector('#dormir_no');
  let dormir_si = document.querySelector('#dormir_si');

  if(asistencia_no.checked){
    //No asiste
    asistencia = 'No';
  }else if(asistencia_si.checked){
    //Si asiste
    asistencia = 'Si';
  }
  if(dormir_no.checked){
    dormir = 'No';
  }else if(dormir_si.checked){
    dormir = 'Si';
  }

  let arrayPersonas = [];
  if($('#numAdultos').val() == ''){
    valido = false;
  }else{
    //ADULTOS
    for (let i = 0; i < $('#numAdultos').val(); i++) {
      let persona = [];
      console.log($('.adultosnombre'+i).val());
      console.log($('.adultosapellidos'+i).val());
      console.log($('#adultosmenu'+i).val());
      if($('.adultosnombre'+i).val() != ''){
        persona.push($('.adultosnombre'+i).val());
      }else{
        valido = false;
      }
      if($('.adultosapellidos'+i).val() != ''){
        persona.push($('.adultosapellidos'+i).val());
      }else{
        valido = false;
      }

      persona.push('Adulto');
      persona.push($('#adultosmenu'+i).val());
      persona.push(asistencia);
      persona.push(dormir);
      persona.push($('#alergias').val());
      arrayPersonas.push(persona);
    }
    
    //NIÑOS
    for (let i = 0; i < $('#numNinos').val(); i++) {
      let persona = [];
      console.log($('.ninosnombre'+i).val());
      console.log($('.ninosapellidos'+i).val());
      console.log($('#ninosmenu'+i).val());
      if($('.ninosnombre'+i).val() != ''){
        persona.push($('.ninosnombre'+i).val());
      }else{
        valido = false;
      }
      if($('.ninosapellidos'+i).val() != ''){
        persona.push($('.ninosapellidos'+i).val());
      }else{
        valido = false;
      }
      
      persona.push('Niño');
      persona.push($('#ninosmenu'+i).val());
      persona.push(asistencia);
      persona.push(dormir);
      persona.push($('#alergias').val());
      arrayPersonas.push(persona);
    }




    console.log('array',arrayPersonas);
  }
  $('#numNinos').val();



  if(!valido){
    $('.error').remove();
    $('.enviar').before('<div class="error" style="color: red">Faltan campos por completar</div>');
  }else{
    //Insertas personas
    $('.error').remove();
    $('.asistencia').remove();
    $('.prisa').remove();
    $('.adultos').remove();
    $('.ninos').remove();
    $('.dormir').remove();
    $('.enviar').remove();
    $('.alergiasclase').remove();

    $('.contacto').after('<div class="success" style="color: green; font-weight: 600;">Tus datos han sido enviados, muchas gracias!</div>');

    for (let i = 0; i < arrayPersonas.length; i++) {
      $.ajax({
        type: "post",
        url: "./php/INSERT_persona.php",
        data: {
          nombre: arrayPersonas[i][0],
          apellidos: arrayPersonas[i][1],
          edad: arrayPersonas[i][2],
          menu: arrayPersonas[i][3],
          asistencia: arrayPersonas[i][4],
          dormir: arrayPersonas[i][5],
          alergias: arrayPersonas[i][6]
        },
        dataType: "json",
        success: function (response) {
          console.log(response);
        },
        error: function (error){
          console.log(error);
        }
      });
    }


  }
}