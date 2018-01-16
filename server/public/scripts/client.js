console.log('JavaScript Sourced');

$(document).ready(function() {
   console.log('jQuery Sourced');
   $('#registerButton').on('click', addNewOwner);
   $('#tableBody').on('click', '.deleteButton', deletePet);
   getAllPets()
});


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
    $tableRow.append(`<td>${data.first_name} ${data.last_name}</td>`);
    $tableRow.append(`<td>${data.pet_name}</td>`);
    $tableRow.append(`<td>${data.breed}</td>`);
    $tableRow.append(`<td>${data.color}</td>`);
    $tableRow.append(`<td><button class="editButton" value="${data.pets_id}">Edit</button></td>`);
    $tableRow.append(`<td><button class="deleteButton" value="${data.pets_id}">Delete</button></td>`);
    if (data.is_checked_in === false) {
        $tableRow.append(`<td><button class="checkIn" value="${data.pets_id}">IN</button></td>`);
    }
    else if (data.is_checked_in === true) {
        $tableRow.append(`<td><button class="checkOut" value="${data.pets_id}">OUT</button></td>`);
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
            //getAllPets();
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