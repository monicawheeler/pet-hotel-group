console.log('JavaScript Sourced');


$(document).ready(function() {
   console.log('jQuery Sourced');
   getOwnerNames();
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
    $('id=owner_name').empty();
    $('id=owner_name').append('<option selected="selected" required>Your Name</option>');
    for (var i = 0; i < ownersArr.length; i++) {
        $('id=owner_name').append('<option>'+ ownersArr[i].first_name + ' ' +  ownersArr[i].first_name + '</option>');

    }
}