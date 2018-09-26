$(function () {

    const render = function () {
        $('#holder').empty();
        $.ajax({ url: '/api/inventory', method: 'GET' })
            .then(function (data) {
                let htmlstr = '';
                data.forEach(element => {
                    htmlstr += `<h5 class="card-title">${element.itemName}</h5>`;
                    htmlstr += `<h6 class="card-subtitle mb-2 text-muted">#${element.itemID} / In stock: ${element.itemCount}</h6>`;
                    htmlstr += `<button id="edit" data-id=${element.itemID} class="btn btn-primary">Edit</button>`;
                    htmlstr += `<div id="${element.itemID}">`;
                    htmlstr += `</div>`;
                    htmlstr += `<hr />`;
                    
                });
                $('#holder').html(htmlstr);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    // Click listener for the submit button
    $('.submit').on('click', function (event) {
        event.preventDefault();

        // Here we grab the form elements
        const newInventory = {
            itemName: $('#item-name').val().trim(),
            itemID: $('#item-id').val().trim(),
            itemCount: $('#item-count').val().trim()
        };

        for (let key in newInventory) {
            if (newInventory[key] === '') {
                alert('Please fill out all fields');
                return;
            }
        }

        $.ajax({ url: '/api/inventory', method: 'POST', data: newInventory })
            .then(function (data) {
                if (data._id) {
                    $('#item-name').val('');
                    $('#item-id').val('');
                    $('#item-count').val('');

                    $('#item-name').focus();
                    render();
                } else {
                    alert(`There's been an error`);
                }
            });
    });

    $('#holder').on('click', '#edit', function (event) {
        console.log($(this).data('id'));
        const itemID = $(this).data('id');
        let htmlstr = '';
        htmlstr += `<div class="input-group my-3">`;
        htmlstr += `<input type="text" class="form-control" placeholder="New inventory value" id="${itemID}">`;
        htmlstr += `<div class="input-group-append">`;
        htmlstr += `<button class="btn btn-outline-secondary" type="button" id="invsubmit" data-id="${itemID}">Submit</button>`;
        htmlstr += `</div></div>`;
        $(`#${itemID}`).html(htmlstr);
    });

    $('#holder').on('click', '#invsubmit', function (event) {
        const itemID = $(this).data('id');
        const newCount = $(`input[id="${itemID}"]`).val().trim();
        const dataToSend = {
            itemID: itemID,
            itemCount: newCount
        };
        $.ajax({ url: '/api/inventory', method: 'PUT', data: dataToSend })
            .then(function(data) {
                render();
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    render();

});