importScripts('https://fergiemcdowall.github.io/search-index/dist/search-index.1.0.6.js');
// "lazy load"- db may not be immediately initialized
const db = searchIndex({ name: 'searchIndexInBrowser' })
console.log('Indexing')
const readJSONData = function (url) {
  fetch(url)
    .then(response => response.json())
    .then(data => indexJSONData(data))
}

const indexJSONData = function (data) {
  db.PUT(data)
    .then(function (message) {
      console.log(message)
    })
    .catch(function (err) {
      console.log('Error while indexing:')
      console.log(err.message)
    })
}

// Index some data each time page loads (should add an _id on each object in array)
readJSONData('https://raw.githubusercontent.com/eklem/dataset-vinmonopolet/master/dataset-vinmonopolet-red-and-white.json')
