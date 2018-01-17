console.log('JavaScript Sourced');

$(document).ready(function() {
   console.log('jQuery Sourced');
   getOwnerNames();
   //event listeners
   $('#register_new_pet').on('click', registerNewPet)
   $('#registerButton').on('click', addNewOwner);
   $('#tableBody').on('click', '.deleteButton', deletePet);
   $('#tableBody').on('click', '.checkStatus', updatePetStatus);
   getAllPets()
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
    $('#owner_name').append('<option selected disabled>Your Name</option>');
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
          getAllPets()
        }
      })
    }

function getAllPets() {
    $.ajax({
        method: 'GET',
        url: '/pets',
        success: (response)=>{
            console.log('Back from server with the table data: ');
            $('#tableBody').empty();
            for (let i=0; i < response.length; i++) {
            displayAllPets(response[i]);
            }
        }
    })
}

function displayAllPets(data) {
    $tableRow = $('<tr>');
    $tableRow.append(`<td>${data.last_name}, ${data.first_name}</td>`);
    $tableRow.append(`<td>${data.pet_name}</td>`);
    $tableRow.append(`<td>${data.breed}</td>`);
    $tableRow.append(`<td>${data.color}</td>`);
    $tableRow.append(`<td><button class="btn btn-info editButton" value="${data.pets_id}">Edit</button></td>`);
    $tableRow.append(`<td><button class="btn btn-danger deleteButton" value="${data.pets_id}">Delete</button></td>`);
    if (data.is_checked_in === false) {
        $tableRow.append(`<td><button class="btn btn-info checkIn checkStatus" data-status="in" value="${data.pets_id}">CHECK IN</button></td>`);
    }
    else if (data.is_checked_in === true) {
        $tableRow.append(`<td><button class="btn btn-info checkOut checkStatus" data-status="out" value="${data.pets_id}">CHECK OUT</button></td>`);
    }
    $('#tableBody').append($tableRow);
}

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
            getOwnerNames();

            // Hide alert message after timeout
            setTimeout(function () {
                $(".alert-success").fadeTo(500, 0).slideUp(500, function () {
                    $(this).remove();
                });
            }, 3000);
            // display alert message when owner is added
            $('.owners-registration').append(`
                <p class="alert alert-success alert-dismissable success-message">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                Owner successfully added!
                </p>
            `);

            $('#first_name').val('');
            $('#last_name').val('');
        }
    });
}

function deletePet() {
    if (confirm('Are you sure you want to remove your pet?')) {
        let id = $(this).val()
        console.log(id);
        $.ajax({
            method: 'DELETE',
            url: '/pets/' + id,
            success: (response)=>{
                console.log('Inside deletePet DELETE ajax: ', response);
                getAllPets()
            },
            error: ()=>{
                alert('Error was received in deleting the pet data')
            }
        })
    }
}

function updatePetStatus() {
    if ($(this).data("status") == 'in') {
        if (confirm('Are you sure you want to Check In your pet?')) {
            let id = $(this).val()
            let petStatus = {
                is_checked_in: true
            }
            console.log(id);
            $.ajax({
                method: 'PUT',
                url: '/pets/' + id,
                data: petStatus,
                success: (response)=>{
                    console.log('Inside updatePetStatus checkin PUT ajax: ', response);
                    getAllPets()
                },
                error: ()=>{
                    alert('Error was received in checking in your pet')
                }
            })
        }   
    }
    else if ($(this).data("status") == 'out') {
        if (confirm('Are you sure you want to Check Out your pet?')) {
            let id = $(this).val()
            let petStatus = {
                is_checked_in: false
            }
            console.log(id);
            $.ajax({
                method: 'PUT',
                url: '/pets/' + id,
                data: petStatus,
                success: (response)=>{
                    console.log('Inside updatePetStatus checkout PUT ajax: ', response);
                    getAllPets()
                },
                error: ()=>{
                    alert('Error was received in checking out your pet')
                }
            })
        }   
    }
}