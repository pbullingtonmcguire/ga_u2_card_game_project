const getDeck = async () => {
    console.log(await axios.get(
        'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    ))
}
getDeck()