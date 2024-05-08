$(window).on('load', function() {
    // Populate the blurb with its text
    $("#games-content").load("/content/games_blurb.html")

    // Add custom elements to the DOM
    customElements.define("itch-game", ItchGame)

    // Load up all the games
    loadGames();
});

class ItchGame extends HTMLElement {
    /*
    Required attributes:
        user: the itch developer's username
        game: the game to display
    */
    constructor() {
        super();

        // get attributes and initialize relevant ids
        this.user = this.getAttribute("user");
        this.game = this.getAttribute("game");
        this.id = "game-" + this.user + "-" + this.game;
        this.content_id = this.id + '-content';

        // request game information from itch
        let thisctx = this;
        Itch.getGameData({
            user: this.user,
            game: this.game,
            onComplete: function(data) {
                thisctx.displayGameInformation(data);
            }
        });
    }

    // Displays information in the 'data' object
    displayGameInformation(data) {
        this.innerHTML = 
        `
        <div class="itch-game">
            <a href="https://${this.user}.itch.io/${this.game}">
                <div ${this.content_id}>
                    <h2>${data.title}</h2>
                    <img src="${data.cover_image}">
                </div>
                <div class="itch-game-popup">
                    <h1>Play on Itch.io</h1>
                </div>
            </a>
        </div>
        `;
    }
}

function loadGames() {
    $.getJSON("/content/games.json", function(games) {
        $.each(games, function(i, game) {
            $("#games-container").append(`<div class=card><itch-game user="willowec" game="${game}"></itch-game></div>`);
        })
    })
}