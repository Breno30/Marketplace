$('#search_bar').keydown((e) => {
    //search when enter is pressed
    if (e.keyCode == 13)
        searchRedirection();
});

function searchRedirection() {
    const searched = $('#search_bar').val();
    location.href = `home-page.html?s=${searched}`
}

function urlToVars(url) {
    var vars = {};

    url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        (m, key, value) => { vars[key] = value; });

    return vars;
}

function varsToUrl(vars) {
    let params = '?';
    let first_var = true;
    Object.keys(vars).forEach(k => {
        if (first_var)
            first_var = false;
        else
            params += '&';
        params += `${k}=${vars[k]}`;
    })

    return params;

}