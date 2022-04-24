function getPosts(page) {
    // const url = new URL(location.href);
    // const page = url.searchParams.get("page");

    $.ajax({
        type: 'GET',
        data: {
            page: page,
            pageSize: 2
        },
        url: 'http://localhost:3000/posts'
    }).then(posts => drawAllPosts(posts));
}

function drawAllPosts(posts) {
    const postsDiv = document.getElementById('posts');
    //remove everthing in this div
    while (postsDiv.firstChild && postsDiv.removeChild(postsDiv.firstChild));
    //filling div with posts
    for (const post of posts) {
        drawPost(postsDiv, post.thumbnail, post.title, '$', post.price, post.description)
    }
}

function drawPost(postsDiv, url, title, currency, price, description) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    postsDiv.appendChild(cardDiv);

    const rowDiv = document.createElement('div');
    rowDiv.className = 'row no-gutters'

    const imageDiv = drawImage(url)
    rowDiv.appendChild(imageDiv);

    const infosDiv = drawInfos(title, currency, price, description);
    rowDiv.appendChild(infosDiv);
    cardDiv.appendChild(rowDiv);
}

function drawImage(url) {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'col-auto'

    const imageImg = document.createElement('img');
    imageImg.id = 'image-post';
    imageImg.src = url

    imageDiv.appendChild(imageImg);
    return imageDiv;
}

function drawInfos(title, currency, price, description) {
    const infosDiv = document.createElement('div');
    infosDiv.className = 'col card-block px-2'

    const titleH4 = document.createElement('h4');
    titleH4.innerText = title
    infosDiv.appendChild(titleH4);

    const priceP = document.createElement('p');
    priceP.innerText = `${currency} ${price.toFixed(2)}`
    infosDiv.appendChild(priceP);

    const descriptionP = document.createElement('p');
    descriptionP.innerText = description
    infosDiv.appendChild(descriptionP);

    return infosDiv;
}
