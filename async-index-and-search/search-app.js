// "lazy load"- db may not be immediately initialized
const db = searchIndex({ name: 'searchIndexInBrowser' })

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

// Index some data each time page loads (should add an _id on each object in array)
readJSONData('https://raw.githubusercontent.com/eklem/dataset-vinmonopolet/master/dataset-vinmonopolet-red-and-white.json')

// Listen to key up and initiate a search
document.getElementById("searchQuery").onkeyup = function() {
  search(document.getElementById("searchQuery").value)
  console.log('Search query: ')
  console.log(document.getElementById("searchQuery").value)
}

// Helper functions for output when in the Browser Developer Tools - console window. Mostly Firefox works for now
let resultsLog = (x) => console.log(x)
let resultsCount = (x) => console.log(x.length)
let resultsDir = (x) => console.dir(x)
