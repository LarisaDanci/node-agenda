var phoneToEdit = '';

function loadContacts() {
    console.info('1. first step in loadContacts');
    $.ajax('data/contacts.json').done(function (contacts) {
        console.info('2. contacts from server', contacts);
        window.globalContacts = contacts;
        displayContacts(contacts);

    });

}

function getNewRow() {
    return `<tr>
            <td><input type="text" name="firstName" placeholder="firstName"/></td>
            <td><input type="text" name="lastName" placeholder="lastName"/></td>
            <td><input type="text" name="phone" placeholder="phone"/></td>
            <td><button onclick="saveContact()">Save</button></td>
        </tr>`;
}
function saveContact() {
    
    var firstName = document.querySelector ('input[name=firstName]').value;
    var lastName = $('input[name=lastName]').val();
    var phone = $('input[name=phone]').val();

    var actionUrl = phoneToEdit ? 'contacts/update' +phoneToEdit: 'contacts/create';
    
    
    $.post(actionUrl, {
        firstName,
        lastName,
        phone: phone
    }).done(function (response) {
        console.warn("done", response);
        if(response.success) {
            loadContacts();
        }
    });
}


function displayContacts(contacts) {
    var rows = contacts.map(function (contact) {
        console.log('transform contact', contact);
        return `<tr>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phone}</td>
            <td>
                <a href="/contacts/delete?phone=${contact.phone}">&#10006;</a>
                <a href="#" class="edit" data-id="${contact.phone}">&#9998;</a>
            </td>
        </tr>`;
    });
   
    var actions = getNewRow();
    rows.push(actions);
    //rows.push(getNewRow());

    document.querySelector('tbody').innerHTML = rows.join('')
}

function initEvents() {
    // TODO use native click
    $( "tbody" ).delegate( "a.edit", "click", function() {
        phoneToEdit = this.getAttribute('data-id');

        var contact = globalContacts.find(function(contact){
            return contact.phone == phoneToEdit;
        });

        console.warn('edit', phoneToEdit, contact);
        $('input[name=phone]').val(phoneToEdit);

        document.querySelector ('input[name=firstName]').value = contact.firstName;
        $('input[name=lastName]').val(contact.lastName);
        $('input[name=phone]').val(contact.phone);

      });
}

loadContacts();

initEvents();
