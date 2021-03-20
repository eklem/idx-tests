window.SearchIndex({
  name: 'myIndex'
})

const index = async () => {
  // initialize an index
  const { PUT } = await SearchIndex()

  // add documents to the index
  const putResult = await PUT([{
    _id: '1',
    text: 'the first document'
  }, {
    _id: '2',
    text: 'the second document'
  }])
  console.log('PUT feedback' + JSON.stringify(putResult))
}

document.getElementById('index').onclick = function () {
  console.log('starting indexing...')
  index()
}
