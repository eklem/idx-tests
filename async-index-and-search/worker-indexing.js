importScripts('https://fergiemcdowall.github.io/search-index/dist/search-index.1.0.6.js');

searchIndex({ name: 'wineDB' }, (err, db) => {
  // db is guaranteed to be open and available
  console.log('Indexing')
  const readJSONData = function (url) {
    fetch(url)
      .then(response => response.json())
      .then(data => indexJSONData(data))
  }

  const indexJSONData = function (data) {
    db.PUT(data)
      .then(function (message) {
        console.log('Indexing finished. Indexed ' + message + ' wines')
      })
      .catch(function (err) {
        console.log('Error while indexing: \n' + err.message)
      })
  }

  // Index some data each time page loads (should add an _id on each object in array)
  readJSONData('https://raw.githubusercontent.com/eklem/dataset-vinmonopolet/master/dataset-vinmonopolet-red-and-white.json')
})
