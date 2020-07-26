let db = searchIndex({ name: 'wineDB' })

const search = function (q) {
  emptyElements(['searchResults'])
  db.SEARCH(...(q.split(' ')))
    .then(function (results) {
      console.log(JSON.stringify(results[0]))
      results.forEach(function (result) {
        console.log(result)
        populateResultsDiv(result)
      })
    })
    .catch(function (err) {
      console.log('Error while searching:')
      console.log(err)
    })
}

// Workaround for a possible bug when ID is generated
const generateID = function (str) {
  return str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}

const populateResultsDiv = function (result) {
  console.dir(result.obj)
  console.log(result.obj)
  const node = document.createElement('div')
  node.innerHTML = '<pre>' + JSON.stringify(result.obj) + '</pre>'
  document.getElementById('searchResults').appendChild(node)
}

// Empty HTML elements
const emptyElements = function (elements) {
  elements.forEach(function (element) {
    document.getElementById(element).innerHTML = ''
    document.getElementById(element).value = ''
  })
}

// Start indexing on button click
document.getElementById("index").onclick = function() {
  const webworker = new Worker("worker-indexing.js");
  webworker.onerror = function (err) {
    console.log('worker is suffering!', err)
  }
  webworker.onmessage = function(e) {
    let result = e.data;
    console.log('Message received from worker' + result.winesIndexed)
    console.log('Re-initiating search-index')
    let db = searchIndex({ name: 'wineDB' })
  }
}

// Start indexing on button click
document.getElementById("initiate").onclick = function() {
  let db = searchIndex({ name: 'wineDB' })
  console.log('Initiating search')
}

// Initiate search on key up
document.getElementById("searchQuery").onkeyup = function() {
  search(document.getElementById("searchQuery").value)
  console.log('Search query: ')
  console.log(document.getElementById("searchQuery").value)
}

// Helper functions for output when in the Browser Developer Tools - console window. Mostly Firefox works for now
let resultsLog = (x) => console.log(x)
let resultsCount = (x) => console.log(x.length)
let resultsDir = (x) => console.dir(x)
