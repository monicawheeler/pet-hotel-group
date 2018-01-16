console.log('JavaScript Sourced');


$(document).ready(function() {
   console.log('jQuery Sourced');


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
    $tableRow = $('<tr>')
    $tableRow.append(`<td>${data.first_name} ${data.last_name}</td>`)
    $tableRow.append(`<td>${data.pet_name}</td>`)
    $tableRow.append(`<td>${data.breed}</td>`)
    $tableRow.append(`<td>${data.color}</td>`)
    $tableRow.append(`<td><button class="editButton" value="${data.pets_id}">IN</button></td>`)
    $tableRow.append(`<td><button class="deleteButton" value="${data.pets_id}">IN</button></td>`)
    if (data.is_checked_in == false) {
        $tableRow.append(`<td><button class="checkIn" value="${data.pets_id}>IN</button></td>`)
    }
    else if (data.is_checked_in == true) {
    $tableRow.append(`<td><button class="checkOut" value="${data.pets_id}>OUT</button></td>`)
    }
    $('#tableBody').append($tableRow);
}