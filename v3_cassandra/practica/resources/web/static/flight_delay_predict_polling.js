// Attach a submit handler to the form
$( "#flight_delay_classification" ).submit(function( event ) {

  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    term = $form.find( "input[name='s']" ).val(),
    url = $form.attr( "action" );

  // Send the data using post
  var posting = $.post(
    url,
    $( "#flight_delay_classification" ).serialize()
  );

  // Submit the form and parse the response
  posting.done(function( data ) {
    var response = JSON.parse(data);

    // If the response is ok, print a message to wait and start polling
    if(response.status == "OK") {
      $( "#result" ).empty().append( "Processing..." );

      // Every 1 second, poll the response url until we get a response
      poll(response.id);
    }
  });
});

// Poll the prediction URL
function poll(id) {
  var responseUrlBase = "/flights/delays/predict/classify_realtime/response/";
  console.log("Polling for request id " + id + "...");

  // Append the uuid to the URL as a slug argument
  var predictionUrl = responseUrlBase + id;

  $.ajax(
  {
    url: predictionUrl,
    type: "GET",
    complete: conditionalPoll
  });
}

// Decide whether to poll based on the response status
// function conditionalPoll(data) {
//   var response = JSON.parse(data.responseText);

//   if(response.status == "OK") {
//     renderPage(response.prediction);
//   }
//   else if(response.status == "WAIT") {
//     setTimeout(function() {poll(response.id)}, 1000);
//   }
// }
function conditionalPoll(data) {
  var response = JSON.parse(data.responseText);

  if (response.status == "OK") {
    renderPage(response); // Pasamos el objeto completo aquí
  } else if (response.status == "WAIT") {
    setTimeout(function() { poll(response.id); }, 1000);
  }
}


function renderPage(response) {
  console.log(response); // Verifica que este log muestra el objeto completo

  var displayMessage;

  // Accede directamente a delay_status desde el objeto de nivel superior
  if (response.delay_status) {
    displayMessage = response.delay_status;
  } else {
    displayMessage = "No prediction available";
  }

  console.log(displayMessage); // Confirma que este mensaje es correcto

  // Actualiza el contenido en la página
  $("#result").empty().append(displayMessage);
}
