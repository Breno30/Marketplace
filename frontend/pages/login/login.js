
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
    }).then(token => {
        document.cookie = `token=${token}`;
    })
}

const signUpRedirect = () => location.href = 'signup.html';