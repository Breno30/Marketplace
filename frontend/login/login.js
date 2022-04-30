
function login() {
    //getting email and password typed
    const email = $('#email-input').val();
    const password = $('#password-input').val();

    $('#password-input').val('');
    //sending request
    $.ajax({
        type:'POST',
        contentType : 'application/json',
        data:JSON.stringify({
            email: email,
            password: password
        }),
        url:'http://localhost:3000/auth'
    }).then(r=>console.log(r))

}

