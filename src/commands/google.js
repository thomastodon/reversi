const axios = require('axios');

export default {

  getFountainhead: function () {

    return axios
      .get('https://www.googleapis.com/books/v1/volumes?q=inauthor:ayn+intitle:fountainhead')
      .then(response => response.data.items[0].volumeInfo.description)
      .catch(error => console.log(error));
  }
}