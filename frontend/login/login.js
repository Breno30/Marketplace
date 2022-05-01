
function login() {
    //getting email and password typed
    const email = $('#email-input').val();
    const password = $('#password-input').val();

    $('#password-input').val('');
    //sending request
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            password: password
        }),
        url: `${config.api_url}/auth`
    }).then(result => { if (result) location.href = '../home-page/index.html' })

}

const signUpRedirect = () => location.href = '../sign-up/index.html';