console.log('JavaScript Sourced');

$(document).ready(function() {
   console.log('jQuery Sourced');

   // Event Listeners
   $('#registerButton').on('click', addNewOwner);
});

function addNewOwner() {
    const ownerToSend = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val()
    }
    
    // post/POST
    $.ajax({
        method: 'POST',
        url: '/owners',
        data: ownerToSend,
        success: function(response) {
            console.log('succesful post response:', response);
            //getAllPets();
        }
    });
}