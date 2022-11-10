
function signUp() {
    //getting email and password typed
    const name = $('#name').val();
    const email = $('#email').val();
    const password = $('#password').val();

    $('#name').val('');
    $('#email').val('');
    $('#password').val('');
    $('#confirm-password').val('');
    //sending request
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
        url: `${config.api_url}/user`
    }).then(result => {
        if (result === true) location.href = '../home-page/home-page.html';
    })

}

