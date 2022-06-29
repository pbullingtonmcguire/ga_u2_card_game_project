const drawButton = document.querySelector("button")
const cardDisplay = document.querySelector('div[id="cardDisplay')

const getDeck = async () => {
    return (await axios.get(
        'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    ))
}

const drawCard = async (deckId) => {
    //console.log(deckId)
    let newCard = await axios.get(
        `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    )
    newCard = newCard.data.cards[0]
    // console.log(newCard)
    cardImage = newCard.images.png
    // console.log(cardImage)
    cardDisplay.innerHTML += `<img src="${cardImage}"></img>` 
    //console.log(cardDisplay.innerHTML)
    let faceValue
    switch(newCard.value) {
        case 'JACK': faceValue = 11
        break
        case 'QUEEN': faceValue = 12
        break
        case 'KING': faceValue = 13
        break
        default: faceValue = newCard.value
    }
    console.log(faceValue)
}
getDeck().then((value) => {
    console.log(value)
    deckId = value.data.deck_id
    drawButton.addEventListener('click', () => (drawCard(deckId)))
})