importScripts('https://fergiemcdowall.github.io/search-index/dist/search-index.1.0.6.js');

const readJSONData = function (url) {
  postMessage({messageType: 'fetchJSON', time: happenedAtTime})
  fetch(url)
    .then(response => response.json())
    .then(data => indexJSONData(data))
}

const indexJSONData = function (data) {
  searchIndex({ name: 'someDB' }, (err, db) => {
    // db is guaranteed to be open and available
    postMessage({messageType: 'indexingStarted', time: happenedAtTime})
    db.PUT(data)
      .then(function (message) {
        postMessage({messageType: 'indexingFinished', time: happenedAtTime, docsIndexed: message})
      })
      .catch(function (err) {
        console.log('Error while indexing: \n' + err.message)
      })
  })
}

const happenedAtTime = function () {
  let date = Date(Date.now())
  console.log('date: ' + date)
  return 1
}
  
// Listener for message from search-app.js
onmessage = function(e) {
  let URL = e.data;
  postMessage({messageType: 'gotURL', time: happenedAtTime()})
  readJSONData(URL)
}
