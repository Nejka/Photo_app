var app = new Vue({
    el: '#app',
    data: {
        ID :"ade562c72c36d48871bada99acb7ebda7fc54637da63ed1f6152d13996c3af38",
        query: 'Hello Vue!',
        photos:[],
        //nastavi id-je
        favorites:[],
        show_photos:[],
        toggle_fav:true,
    },
    methods:{
            get_photos: function(){
                axios
                    .get(
                    `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${this.query}&client_id=${this.ID}`
                    )
                    .then(data => {                    
                        console.log(data.data.results);
                        this.photos = data.data.results.map(result =>result.urls["small"]);
                        this.favorites = JSON.parse(localStorage.getItem("favorites"));
                        this.show_photos = this.photos;
                    })
                    .catch(err => {
                    console.log('Error happened during fetching!', err);
                    })
                },
                save_fav: function(photo){
                    console.log( photo);
                    if (this.favorites.includes(photo)) {
                        this.favorites=this.favorites.filter(el => el!=photo);
                    }
                    else this.favorites.push(photo);

                    console.log("favorites", this.favorites);

                    let JsonFavorites = JSON.stringify(this.favorites);
                    localStorage.setItem("favorites", JsonFavorites);
                },
                //crete function to toggle favorites buton
                toggle_button: function(){
                    if (this.toggle_fav){
                        this.toggle_fav=false;
                        console.log("klicem show favorites", this.toggle_fav);
                        this.favorites = JSON.parse(localStorage.getItem("favorites"));
                        console.log("json favorites", this.favorites);
                        return this.favorites.filter(el=>this.photos.includes(el));
                    }
                    else {
                        this.toggle_fav=true;
                        console.log("klicem show all", this.toggle_fav);
                        return this.photos;
                    }
                },
                clear_favorites(){
                    this.favorites=this.favorites.filter(el=>!this.photos.includes(el));
                }

            },
            computed:{
                fav_title:function(){
                    if (this.toggle_fav) {
                        return "Show favorites";
                    } else {
                        return "Show all"; 
                    }                   
                },
                fav_exist:function(){
                    return this.favorites.filter(el=>this.photos.includes(el)).length>0;
                }
            }
    });        