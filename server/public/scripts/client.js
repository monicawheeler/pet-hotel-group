console.log('JavaScript Sourced');


$(document).ready(function() {
   console.log('jQuery Sourced');
   getOwnerNames();
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
        $('#owner_name').append('<option>'+ ownersArr[i].first_name + ' ' +  ownersArr[i].first_name + '</option>');

    }
}

function registerNewPet() {
    $.ajax({
        method: 'POST',
        url: '/pets',
        success: function(response){
          console.log('register new pet: ', response);
        }
      })
    }
