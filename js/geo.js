const cities = function() {
    fetch(`../data/cities.json`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
    })
}

cities()



