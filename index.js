var clientId = "RIfeIKabPB";
var listId = "GmwfdYrDXe";


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
  mounted () {
    parameters = decodeURIComponent(this.$route.query.search)

    if (parameters != '') {
        parameters = "&"+parameters
    }

    console.log("params: "+ parameters)

    axios
      .get('https://api.boardgameatlas.com/api/search?client_id='+clientId+'&list_id='+listId+'&limit=100')
      .then(response => (this.games = response.data.games))
  }
});



