var sName = sDesigner = sPublisher = sCategories = sMinPlayers = sMaxPlayers = sMinAge = "";


Vue.component("search",
  {
    template:"#search-template",
    props:["id","title","age", "publish", "publisher", "artists", "design", "description", "image", "minplay", "maxplay", "maxplayers", "minplayers"]
  }
)

Vue.component("game-card",
  {
    template:"#card-template",
    props:["id","title","age", "publish", "publisher", "artists", "design", "description", "image", "minplay", "maxplay", "maxplayers", "minplayers"]
  }
)

var router = new VueRouter({
    mode: 'history',
    routes: []
  });

var app = new Vue({
  el: '#app',
    router,
  data () {
    return {
      games: null
    }
  },
  methods: {
    searchTitle(title) {
      const titleInput  = signupForm.querySelector('input[name=name]');
      const minPlayersInput = signupForm.querySelector('input[name=minplayers]');
      const maxPlayersInput = signupForm.querySelector('input[name=maxplayers]');
      const minAgeInput = signupForm.querySelector('input[name=minage]');
      const yearInput = signupForm.querySelector('input[name=year]');
      var url = window.location;
      var searchUrl = url+"?";

      if (titleInput != "") { searchUrl = searchUrl + "&title=" + titleInput.toLowerCase() }
      if (minPlayersInput != "") { searchUrl = searchUrl + "&minplayers=" + minPlayersInput }
      if (maxPlayersInput != "") { searchUrl = searchUrl + "&maxplayers=" + maxPlayersInput }
      if (minAgeInput != "") { searchUrl = searchUrl + "&minage=" + minAgeInput }
      if (yearInput != "") { searchUrl = searchUrl + "&year=" + yearInput}

      window.location = searchUrl
    },
    doSearch(games) {
      var gameResponse = games;
      console.log("game response:");
      console.log(gameResponse);
      console.log("this.$route.query.title --> " + this.$route.query.title);
      // Title search
      if (this.$route.query.title) {
        gameResponse = gameResponse.filter(x => x.name.toLowerCase().includes(this.$route.query.title))
      }
      // Minimum players
      if (this.$route.query.minplayers) {
        gameResponse = gameResponse.filter(x => x.min_players >= this.$route.query.minplayers)
      }
      // Minimum age
      if (this.$route.query.minage) {
        gameResponse = gameResponse.filter(x => x.min_age >= this.$route.query.minage)
      }
      // Maximum players
      if (this.$route.query.maxplayers) {
        gameResponse = gameResponse.filter(x => x.max_players <= this.$route.query.maxplayers)
      }
      // Publish year
      if (this.$route.query.publish) {
        gameResponse = gameResponse.filter(x => x.year_published == this.$route.query.publish)
      }
      console.log("filtered responses:");
      console.log(gameResponse);

      return gameResponse;
    }
  },
  mounted () {
    parameters = decodeURIComponent(this.$route.query.search)

    if (parameters != '') {
        parameters = "&"+parameters
    }

    console.log("params: "+ parameters)

    axios
      .get('api-response.json')
      .then(response => (this.games = this.doSearch(response.data.games)))
  }
});



