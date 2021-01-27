importScripts('https://cdn.jsdelivr.net/npm/search-index@2.1.0/dist/search-index-2.1.0.js')

let timeUsed = { start: 0, fetchJSON: 0, indexingStarted: 0, indexingFinished: 0 }

const timeNow = function () {
  return (Date.now() / 1000)
}

const readJSONData = function (url) {
  fetch(url)
    .then(response => response.json())
    .then(JSONdata => indexJSONData(JSONdata))
    .then(timeUsed.fetchJSON = (timeNow() - timeUsed.start).toFixed(3))
    .then(postMessage({messageType: 'fetchJSON', timeUsed: timeUsed.fetchJSON}))
}

const indexJSONData = function (data) {
  SearchIndex({ name: 'someDB' }, (err, db) => {
    // db is guaranteed to be open and available
    timeUsed.indexingStarted = (timeNow() - timeUsed.start - timeUsed.fetchJSON).toFixed(3)
    postMessage({messageType: 'indexingStarted', timeUsed: timeUsed.indexingStarted})
    db.PUT(data)
      .then(function (message) {
        timeUsed.indexingFinished = (timeNow() - timeUsed.start - timeUsed.fetchJSON - timeUsed.indexingStarted).toFixed(3)
        postMessage({messageType: 'indexingFinished', timeUsed: timeUsed.indexingFinished, docsIndexed: message})
      })
      .catch(function (err) {
        console.log('Error while indexing: \n' + err.message)
      })
  })
}
 
// Listener for message from search-app.js
onmessage = function(e) {
  timeUsed.start = timeNow()
  console.log('time started: ' + timeUsed.start)
  let URL = e.data;
  postMessage({messageType: 'gotURL', timeUsed: timeUsed.start})
  readJSONData(URL)
}
