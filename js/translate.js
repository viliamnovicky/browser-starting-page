const encodedParams = new URLSearchParams();
encodedParams.append("text", "The POST method has several advantages over GET: it is more secure because most of the request is hidden from the user; Suitable for big data operations.");
encodedParams.append("tl", "es");
encodedParams.append("sl", "en");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com',
		'X-RapidAPI-Key': '0fa4d215e3msh882c17edc10dfe0p11a23fjsn52dfeb1f4c4b'
	},
	body: encodedParams
};

const translate = function () {
    fetch(
      `https://google-translate20.p.rapidapi.com/translate`, options
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          console.log(data);
      });
  };

translate()