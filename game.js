const drawButton = document.querySelector("button")
const cardDisplay = document.querySelector('div[id="cardDisplay')

const getDeck = async () => {
    return (await axios.get(
        'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    ))
}

const drawCard = () => {
    cardDisplay.innerHTML = '<p>test</p>'
}
getDeck().then((value) => {
    console.log(value)
    deckId = value.deck_id
    drawButton.addEventListener('click', drawCard)
})