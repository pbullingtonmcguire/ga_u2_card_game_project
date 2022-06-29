const drawButton = document.querySelector('button[id="drawCard"')
const cardDisplay = document.querySelector('div[id="cardDisplay')
const totalDisplay = document.querySelector('h3[id="totalDisplay"]')
const standButton = document.querySelector

let playerTotal = 0

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
    return faceValue
}

const playerDraw = async (deckId) => {
    faceValue = await drawCard(deckId)
    playerTotal += faceValue
    totalDisplay.innerHTML = `Total: ${playerTotal}`
    if (playerTotal === 21) {
        await stand()
    }
    return faceValue
}

const hit = async (deckId) => {
    const cardValue = await playerDraw(deckId)

}

const stand = async () => {
    alert(`Your total is ${playerTotal}`)
}

getDeck().then((value) => {
    console.log(value)
    deckId = value.data.deck_id
    drawButton.addEventListener('click', () => (playerDraw(deckId)))
})