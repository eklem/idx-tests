// let si = null

window.SearchIndex({
  name: 'myIndex'
})

const index = async (url) => {
  // initialize an index
  // Promise.all([
  //   window.SearchIndex({
  //     name: 'myIndex'
  //   }),
  //   window.fetch(url).then(res => res.json())
  // ]).then(([thisSi, dump]) => {
  //   // set global variable (in practice you might not want to do this)
  //   si = thisSi
  //   // replicate pregenerated index
  //   si.PUT(dump)
  // }).catch(console.log)

  const { PUT } = await SearchIndex()

  window.fetch(url)
    .then(response => response.json())
    .then(JSONdata => {
      console.log(JSON.stringify(JSONdata))
      PUT(JSONdata)
    })
    .then(PutResponse => {
      console.log('Indexing response: ' + JSON.stringify(PutResponse))
    })
    .catch(function (err) {
      console.log('Error while indexing: \n' + err.message)
    })
}

document.getElementById('index').onclick = function () {
  const url = document.getElementById('indexUrl').value
  console.log('starting indexing...')
  index(url)
}
