const checkQueriesValid = (queries) => {
    let valid = true;
    queries.forEach(query => {
        if (query.value == "" || query.value == null || query.value == "undefined" || query.value == undefined
        || (query.num === true && isNaN(parseInt(query.value)))) {
            valid = false;
        }
    });
    return valid;
}

export { checkQueriesValid }