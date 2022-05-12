verifyToken();

function verifyToken() {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        url: `${config.api_url}/user/me`
    }).then(result => { if (result.name) location.href = 'home-page.html'; })
}

function login() {
    //getting email and password typed
    const email = $('#email-input').val();
    const password = $('#password-input').val();

    $('#password-input').val('');
    //sending request
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            email: email,
            password: password
        }),
        url: `${config.api_url}/auth`
    }).then(response => {
        if (response === true) location.href = 'home-page.html';
    })
}
