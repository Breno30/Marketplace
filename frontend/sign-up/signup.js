
function signUp() {
    //getting email and password typed
    const name = $('#name-input').val();
    const email = $('#email-input').val();
    const password = $('#password-input').val();

    $('#name-input').val('');
    $('#email-input').val('');
    $('#password-input').val('');
    //sending request
    $.ajax({
        type:'POST',
        contentType : 'application/json',
        data:JSON.stringify({
            name:  name,
            email: email,
            password: password
        }),
        url:'http://localhost:3000/user'
    }).then(r=>console.log(r))

}

