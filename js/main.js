$(window).on('load', function() {
    console.log("loaded page");

    $("#about-content").load("content/about.html")

    // Add custom elements to the DOM
    customElements.define("itch-game", ItchGame)
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
                <h1>Play on Itch.io</h1>
            </a>
        </div>
        `;
    }
}