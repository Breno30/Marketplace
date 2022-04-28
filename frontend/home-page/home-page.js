loadPage();

function loadPage() {
    const vars = urlToVars(location.href);
    const searched = vars.s;
    const page = vars.page;

    $('#search_bar').val(searched);
    getPage(searched, page);
    getPagination(searched);
}

function getPage(searched, page) {

    $.ajax({
        type: 'GET',
        data: {
            page: page,
            pageSize: 10,
            searched: searched
        },
        url: 'http://localhost:3000/posts'
    }).then(posts => drawAllPosts(posts));


}

function drawAllPosts(posts) {
    const postsDiv = document.getElementById('posts');
    //remove everthing in this div
    while (postsDiv.firstChild && postsDiv.removeChild(postsDiv.firstChild));
    //filling div with posts
    for (const post of posts)
        drawPost(postsDiv, post._id, post.thumbnail, post.title, '$', post.price, post.description)

}

function drawPost(postsDiv, id, url, title, currency, price, description) {


    const cardDiv = document.createElement('div');
    cardDiv.className = 'card col-md-8';
    cardDiv.id = id
    cardDiv.onclick = openPost;

    const rowDiv = document.createElement('div');
    rowDiv.className = 'row no-gutters'

    const imageDiv = drawImage(url)

    const infosDiv = drawInfos(title, currency, price, description);

    const justifyCardDiv = document.createElement('div');
    justifyCardDiv.className = 'd-flex justify-content-around';

    rowDiv.appendChild(imageDiv);
    rowDiv.appendChild(infosDiv);
    cardDiv.appendChild(rowDiv);
    justifyCardDiv.appendChild(cardDiv);
    postsDiv.appendChild(justifyCardDiv);
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

function openPost() {
    //taking id of post
    const id = this.id;
    location.href = `../publication/index.html?id=${id}`;
}
