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