getPost();

function getPost() {
    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    $.ajax({
        type: 'GET',
        url: `${config.api_url}/post/${id}`
    }).then(infos => { 
        drawPostBody(infos.title, infos.description,'$', infos.price, infos.thumbnail);
    })
}

function drawPostBody(title,description,currency,price,thumbnail){
    $('#image-post').attr('src',thumbnail);
    $('#title-text').html(title);
    $('#description-text').html(description);
    $('#price-text').html(`${currency} ${price}`);
}