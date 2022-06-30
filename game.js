const drawButton = document.querySelector('button[id="drawCard"')
const standButton = document.querySelector('button[id="stand"')
const restartButton = document.querySelector('button[id="playAgain"]')
const cardDisplay = document.querySelector('div[id="cardDisplay')
const totalDisplay = document.querySelector('h3[id="totalDisplay"]')
const victoryStatus = document.querySelector('p[id="victoryStatus"')

let deckId
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
    totalDisplay.innerHTML = `Your total: ${playerTotal}`
    if (playerTotal > 21) {
        gameOver('You went over 21, tough luck!')
    } else if (playerTotal === 21) {
        drawButton.style.display = 'none'
    }
    return faceValue
}

// const hit = async (deckId) => {
//     const cardValue = await playerDraw(deckId)
    
// }

const stand = async () => {
    gameOver(`Your total is ${playerTotal}`)
}

const playAgain = () => {
    restartButton.style.display = 'none'
    cardDisplay.innerHTML = ''
    playerTotal = 0
    victoryStatus.innerText = ''
    startGame()
}

const toggleHitAndStand = (toggle) => {
    let displayStyle
    if (toggle) {
        displayStyle = 'inline'
    } else {
        displayStyle = 'none'
    }
    drawButton.style.display = displayStyle
    standButton.style.display = displayStyle
}

const gameOver = (message) => {
    toggleHitAndStand(false)
    victoryStatus.innerText = message
    restartButton.style.display = 'inline'
}

const startGame = () => {
    getDeck().then((value) => {
        console.log(value)
        deckId = value.data.deck_id
        toggleHitAndStand(true)
        for (let i = 0; i < 2; i++) {
            playerDraw(deckId)
        }
    })
}

drawButton.addEventListener('click', () => {playerDraw(deckId)})
standButton.addEventListener('click', stand)
restartButton.addEventListener('click', playAgain)

startGame()