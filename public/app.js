$(function () {

    /* --- PHASE 4 - WRITE THE AJAX CALLS --- */

    const render = function () {
        $('#holder').empty();
        /*  Add an AJAX call to GET from /api/inventory
            After the request has been made, make an `htmlstr` variable to store HTML that you'll put into the #holder div
            Then use forEach to loop through the data that's returned and add on to the variable you made above using the following code:
                htmlstr += `<h5 class="card-title">${element.itemName}</h5>`;
                htmlstr += `<h6 class="card-subtitle mb-2 text-muted">#${element.itemID} / In stock: ${element.itemCount}</h6>`;
                htmlstr += `<button id="edit" data-id=${element.itemID} class="btn btn-primary">Edit</button>`;
                htmlstr += `<div id="${element.itemID}">`;
                htmlstr += `</div>`;
                htmlstr += `<hr />`;
            Then use .html to add the htmlstr variable to the #holder div 
            Make sure to add a .catch statement to the AJAX method to handle potential errors 
            TEST BEFORE YOU MOVE ON TO THE NEXT STEP */
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

        /*  Use AJAX to make a POST request to POST the newInventory object to /api/inventory
            Use a conditional to check to make sure the response that comes back is not an error
            If the response that comes back is not an error, clear the #item-name, #item-id, and #item-count input fields
            Then focus on the #item-name field
            Then run the render() function
            If the response that comes back is an error, use alert() to alert the user that something went wrong 
            Make sure to add a .catch statement to the AJAX method to handle potential errors 
            TEST BEFORE YOU MOVE ON TO THE NEXT STEP */
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
        /*  Write an AJAX call that sends a PUT request to /api/inventory and sends the `dataToSend` object create in the line above
            Then call the render() function
            Make sure to add a .catch statement to the AJAX method to handle potential errors */
    });

    render();

});
