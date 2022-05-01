
function getPagination(searched) {
    $.ajax({
        type: 'GET',
        data: { searched: searched },
        url: `${config.api_url}/posts/count`
    }).then(countPosts => {
        const pageSize = 10;
        const countPages = Math.ceil(countPosts / pageSize);
        if (countPages > 0) drawPagination(countPages);
    });
}

function drawPagination(size) {
    const pagination = document.createElement('ul');
    pagination.className = 'pagination';

    //draw "Previous"
    pagination.appendChild(drawButtonPrevious());

    //draw every number
    for (number = 1; number <= size; number++)
        pagination.appendChild(drawNumber(number));

    //draw "Next"
    pagination.appendChild(drawButtonNext());

    const pageNumbers = document.getElementById('page-numbers');
    //clear last pagination
    pageNumbers.innerHTML = '';
    //add new pagination
    pageNumbers.appendChild(pagination);
}

function drawNumber(number) {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';

    const pageLink = document.createElement('a');
    pageLink.className = 'page-link';
    pageLink.innerText = number;
    pageLink.onclick = () => { goToPage(number) };

    pageItem.appendChild(pageLink);
    return pageItem;
}

function drawButtonNext() {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';

    const pageLink = document.createElement('a');
    pageLink.className = 'page-link';
    pageLink.innerText = 'Next';
    pageLink.onclick = nextPage;

    pageItem.appendChild(pageLink);
    return pageItem;
}

function drawButtonPrevious() {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';

    const pageLink = document.createElement('a');
    pageLink.className = 'page-link';
    pageLink.innerText = 'Previous';
    pageLink.onclick = previousPage;


    pageItem.appendChild(pageLink);
    return pageItem;
}

function goToPage(page) {
    console.log(page)
    const url = location.href;
    const filename = new URL(url).pathname.split('/').pop();

    var vars = urlToVars(url);

    //replace old page with a new one
    vars = { ...vars, page: page }

    location.href = filename + varsToUrl(vars);
}

function nextPage() {
    const url = location.href;
    const filename = new URL(url).pathname.split('/').pop();

    var vars = urlToVars(url);
    //get page from params
    const page = vars.page ? parseInt(vars.page) : 1;
    //decrement by one
    const newPage = (page + 1).toString();
    //replace old page with a new one
    vars = { ...vars, page: newPage }

    location.href = filename + varsToUrl(vars);
}

function previousPage() {
    const url = location.href;
    const filename = new URL(url).pathname.split('/').pop();

    var vars = urlToVars(url);
    //get page from params
    const page = parseInt(vars.page);
    //decrement by one
    const newPage = (page - 1).toString();
    //replace old page with a new one
    vars = { ...vars, page: newPage }

    //checks whether the page is the first
    if (page != 1)
        location.href = filename + varsToUrl(vars);
}
