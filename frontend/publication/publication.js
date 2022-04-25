getPost();

function getPost() {
    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/post/${id}`
    }).then(infos => { 
        drawPostBody(infos.title, infos.description, infos.price, infos.thumbnail);
    })
}

function drawPostBody(title,description,price,thumbnail){
    $('#image-post').attr('src',thumbnail);
    $('#title-text').html(title);
    $('#description-text').html(description);
    $('price-text').html(price);
}