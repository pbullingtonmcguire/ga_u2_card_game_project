const drawButton = document.querySelector("button")
const cardDisplay = document.querySelector('div[id="cardDisplay')
const totalDisplay = document.querySelector('h3[id="totalDisplay"]')
let total = 0

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
        case 'ACE': faceValue = 11
        break
        case 'JACK':
        case 'QUEEN':
        case 'KING': faceValue = 10
        break
        default: faceValue = parseInt(newCard.value)
    }
    console.log(faceValue)
    total += faceValue
    totalDisplay.innerHTML = `Total: ${total}`
    return faceValue
}
getDeck().then((value) => {
    console.log(value)
    deckId = value.data.deck_id
    drawButton.addEventListener('click', () => (drawCard(deckId)))
})