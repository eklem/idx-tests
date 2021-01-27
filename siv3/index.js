
// (async () => {
//   const si = require('search-index')
//   const data = [
//     { _id: 0, Varenummer: 129501, Varenavn: 'Alexandre Penet Grand Cru Brut Nature', Volum: 0.75, Pris: 399.9, Literpris: 533.2, Varetype: ['Champagne extra brut'], Farge: 'Dyp strågul, gyldent skjær.', Lukt: 'Røde epler, sitrus og krydder.', Smak: 'Intens og kompleks mineralitet.', Land: 'Frankrike', Underdistrikt: 'Øvrige', Argang: null, Rastoff: 'Pinot Noir 70%, Chardonnay 30%', Alkohol: 12.2 },
//     { _id: 1, Varenummer: 129601, Varenavn: 'Alexandre Penet Extra-Brut', Volum: 0.75, Pris: 339.9, Literpris: 453.2, Varetype: ['Champagne extra brut'], Farge: 'Lys strågul.', Lukt: 'Floral. Hint av nøtter og sitrus.', Smak: 'Flott syre, god dybde og klassisk preg av brødbakst og mineraler.', Land: 'Frankrike', Underdistrikt: 'Champagne Extra Brut', Argang: null, Rastoff: 'Chardonnay 40%, Pinot Noir 30%, Pinot Meunier 30%', Alkohol: 12 }
//   ]

//   // initialize an index
//   const { PUT, QUERY } = await si()

//   // add documents to the index
//   await PUT(data)

//   // read documents from the index
//   const results = await QUERY ({
//       SEARCH: [ '*' ]
//     }, {
//       DOCUMENTS: true
//     })

//   console.log('results: ' + results)
// })()

(async () => {

  const si = require('../node_modules/search-index/')
  const db = await si({ name: 'nodeQuickstart' })
  
  await db.PUT([
    {
      _id: 1,
      bandName: 'The Beatles',
      description: 'The nice boys of pop'
    }, {
      _id: 'two',
      bandName: 'The Rolling Stones',
      description: 'The bad boys of rock'
    }, {
      _id: 3,
      bandName: 'The Who',
      description: 'Nearly as good as Led Zeppelin'
    }
  ])

  console.log('\nSEARCH-ing ->')
  await db.QUERY(
    {
      SEARCH: ['The']
    }
  ).then(console.log)


  console.log('\nSEARCH-ing ->')
  await db.QUERY(
    {
      SEARCH: ['The', 'Beatles']
    }
  ).then(console.log)


  console.log('\nSEARCH-ing with negation ->')
  await db.QUERY(
    {
      NOT: {
        INCLUDE: {SEARCH: ['The']},
        EXCLUDE: {SEARCH: ['Beatles']}
      }
    }
  ).then(console.log)

  
})()