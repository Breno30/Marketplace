getPage();

$.ajax({
    type: 'GET',
    url: 'http://localhost:3000/posts/count'
}).then(countPosts =>{
    const pageSize = 2;
    const countPages = Math.ceil(countPosts/pageSize); 
    drawPagination(countPages);
});

function drawPagination(size) {
    const pagination = document.createElement('ul');
    pagination.className = 'pagination';

    //draw every number
    for (number = 1; number <= size; number++)
        pagination.appendChild(drawNumber(number));

    document.getElementById('page-numbers').appendChild(pagination);
}

function drawNumber(number) {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';

    const pageLink = document.createElement('a');
    pageLink.className = 'page-link';
    pageLink.innerText = number;
    pageLink.href = `index.html?page=${number}`
    pageLink.onclick = previousPage;


    pageItem.appendChild(pageLink);
    return pageItem;
}

function nextPage() {
    const url = new URL(location.href);
    const filename = url.pathname.split('/').pop();
    //search for the page number (the first page doesn't have this parameter)
    const page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;

    location.href = `${filename}?page=${parseInt(page) + 1}`;
}

function previousPage() {
    const url = new URL(location.href);
    const filename = url.pathname.split('/').pop();
    //search for the page number
    const page = url.searchParams.get("page");

    //check whether the page is the first
    if (page != 1)
        location.href = `${filename}?page=${parseInt(page) - 1}`;
}
