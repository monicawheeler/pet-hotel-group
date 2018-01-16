console.log('JavaScript Sourced');


$(document).ready(function() {
   console.log('jQuery Sourced');
   getOwnerNames();
   //event listeners
   $('#register_new_pet').on('click', registerNewPet)
});
 
function getOwnerNames() {
    $.ajax({
        method: 'GET',
        url: '/owners',
        success: function(response){
          console.log('getting owner names: ', response);
         displayOwnerNames(response);
        }
      })
    }



function displayOwnerNames(ownersArr) {
    $('#owner_name').empty();
    $('#owner_name').append('<option selected="selected" required>Your Name</option>');
    for (var i = 0; i < ownersArr.length; i++) {
        $('#owner_name').append('<option data-id="' + ownersArr[i].id + '">'+ ownersArr[i].first_name + ' ' +  ownersArr[i].last_name + '</option>');

    }
}

function registerNewPet() {
    
    let newPetToSend = {
    pet_name: $('#pet_name').val(),
    breed: $('#breed').val(),
    color: $('#color').val(),
    owner_id: $('#owner_name option:selected').data('id')
    }
    console.log(newPetToSend);
    $.ajax({
        method: 'POST',
        url: '/pets',
        data: newPetToSend,
        success: function(response){
          console.log('register new pet: ', response);
        }
      })
    }
