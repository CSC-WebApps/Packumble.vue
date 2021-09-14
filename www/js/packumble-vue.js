
$(document).ready(function () {
    var match = new Vue({
        el: "#match",
        data: {
            init: true,
            username: '',
            favoriteLang: '',
            languages: ['c#', 'python', 'javascript'],
            users: [],
            currentName: '',
            currentLang: '',
            currentImg: '',
            matches: [],
            isSwipeLeft: false,
            isSwipeRight: false,
            isFire: false
        },
        methods: {
            startMatching: function () {
                fetch('/start', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "username": this.username,
                        "language": this.favoriteLang
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        this.users = data;
                        this.init = false;

                        return fetch('/see');
                    })
                    .then(response => response.json())
                    .then(card => {
                        this.currentName = card.name;
                        this.currentLang = card.language;
                        this.currentImg = card.imgId;
                    });
            },
            leftButton: function () {
                this.isSwipeLeft = true;
                this.isSwipeRight = false;
                this.isFire = false;
                fetch('/no').then(_ => {
                    // Get next card
                    fetch('/see')
                        .then(response => response.json())
                        .then(card => {
                            syncDelay(300);
                            this.currentName = card.name;
                            this.currentLang = card.language;
                            this.currentImg = card.imgId;
                            this.isSwipeLeft = false;
                        });
                });

            },
            rightButton: function () {
                this.isSwipeLeft = false;
                this.isSwipeRight = false;
                this.isFire = false;
                fetch('/trymatch')
                    .then(response => response.json())
                    .then(data => {
                        if (data.match) {
                            this.isFire = true;
                            this.matches.push({
                                name: this.currentName,
                                language: this.currentLang,
                                imgId: this.currentImg,
                                email: data.email
                            })
                        } else {
                            this.isSwipeRight = true;
                        }

                        // Get next card
                        fetch('/see')
                            .then(response => response.json())
                            .then(newcard => {
                                syncDelay(300);
                                this.currentName = newcard.name;
                                this.currentLang = newcard.language;
                                this.currentImg = newcard.imgId;
                                this.isFire = false;
                                this.isSwipeRight = false;
                            });
                    });

            },
            goBack: function () {
                window.location.reload();
            }
        }
    })

    Vue.component('card', {
        props: {
            name: String,
            language: String,
            imageid: Number,
            email: String,
            isflipped: Boolean,
            ismatched: Boolean
        },
        template:
            `<div id="potentialmatch" class="p-2 card w-50" v-on="ismatched ? {click: flipCard} : {}" v-bind:class="{ 'is-flipped': isflipped }">
                <div class="card-body">
                    <div class="card__face">
                    <h5 class="card-title">{{name}}</h5>
                    <h6 class="card-subtitle mb-2 text-mute">{{language}}</h6>
                    <img v-bind:src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/' + imageid + '.png'">
                    </div>
                    <div class="card__face card__face--back">{{email}}</div>
                </div>
            </div>`,
        methods: {
            flipCard: function () {
                this.isflipped = !this.isflipped;
            }
        }
    })

});

function syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}