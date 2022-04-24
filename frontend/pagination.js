var page = 1;
//get first page of posts
getPosts(page);

function nextPage() {
    page++;
    getPosts(page);
}

function lastPage() {
    if (page != 1) {
        page--;
        getPosts(page)
    }
}
