function loadContacts() {
    console.info('1. first step in loadContacts');
    $.ajax('data/contacts.json').done(function (contacts) {
        console.info('2. contacts from server', contacts);
        displayContacts(contacts);

    });
    console.info('3. last step in loadContacts')
}

function displayContacts(contacts) {
    var rows = contacts.map(function (contact) {
        console.log('transform contact', contact);
        return `<tr>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phone}</td>
            <td><a href="data/contacts.json?delete="${contact.phone}>x</a></td>
        </tr>`;
    });
    console.warn('rows', rows);

    document.querySelector('tbody').innerHTML = rows.join('')
}

loadContacts();
