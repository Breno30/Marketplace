function publishPost() {
    var title = $('#title-input').val();
    var description = $('#description-input').val();
    var price = $('#price-input').val();

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            title,
            description,
            price
        }),
        url: `${config.api_url}/post`
    }).then(response => console.log(response));

}