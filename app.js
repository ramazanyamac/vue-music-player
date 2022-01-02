let vm = Vue.createApp({
  data() {
    return {
      musics:[
        {
          name: "The Lonely Shepherd",
          artist: "Gheorge Zamfir",
          cover: "https://i.scdn.co/image/ab67616d0000b273fecfac11994325a39cd03dec",
          source: "music/The-Lonely-Shepherd.mp3",
          fav: false,
        },
        {
          name: "Once Upon a Time in the West",
          artist: "Ennio Morricone",
          cover: "https://i.scdn.co/image/ab67616d0000b2732b23062e3b70cc2725b4f960",
          source: "music/Once-Upon-a-Time-in-the-West.mp3",
          fav: false,
        },
        {
          name: "So Was Red",
          artist: "Thomas Newman",
          cover: "https://i.scdn.co/image/ab67616d0000b273e710c1f5b228046932790031",
          source: "music/So-Was-Red.mp3",
          fav: false,
        },
        {
          name: "Leaving Wallbrook/On The Road",
          artist: "Hans Zimmer",
          cover: "https://i.scdn.co/image/ab67616d0000b273bf5889f82cc38018de92724a",
          source: "music/On-The-Road.mp3",
          fav: false,
        },
        {
          name: "Cast Away",
          artist: "Geek Music",
          cover: "https://i.scdn.co/image/ab67616d0000b2733eff8e9536d0f0db4260e03a",
          source: "music/Cast-Away.mp3",
          fav: false,
        },
      ],
      songIndex: 0,
      music: null,
      cover: null,
      name: null,
      artist: null,
      isPlay: false,
      progressValue: null,
      currentDate: null,
      duration: null,
      isRandom: false,
    }
  },
  methods: {
    loadSong() {
      this.music = this.musics[this.songIndex].source;
      this.cover = this.musics[this.songIndex].cover;
      this.name = this.musics[this.songIndex].name;
      this.artist = this.musics[this.songIndex].artist;
      const audio = new Audio(this.musics[this.songIndex].source); 

      audio.onloadedmetadata = () => {
          this.duration = audio.duration;
      }

      this.$refs.myAudio.load()
    },
    playSong() {
      this.isPlay = !this.isPlay;
      
      if(this.isPlay) {
        this.$refs.myAudio.play()
      } else {
        this.$refs.myAudio.pause()
      }
      
    },
    refreshSong(){
      this.isPlay = true;

      if(this.isPlay) {
        var playPromise =  this.$refs.myAudio.play();
        if(playPromise !== undefined){
          playPromise.then(_ => {
            this.$refs.myAudio.pause();
          })
          .catch(error => {
            this.$refs.myAudio.play();
          });
        }
      }
    },
    randomNumber(min, max){
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    prevSong() {
      if(this.random){
        this.songIndex = this.songIndex - this.randomNumber(1,this.musics.length);
      } else {
        this.songIndex--;
      }

      if (this.songIndex < 0) {
        this.songIndex = this.musics.length - 1;
      }

      this.loadSong();
      this.refreshSong();
    },
    nextSong() {
      if(this.random){
        this.songIndex = this.songIndex + this.randomNumber(1,this.musics.length);
      } else {
        this.songIndex++;
      }

      if (this.songIndex > this.musics.length - 1) {
        this.songIndex = 0;
      }
      
      this.loadSong();
      this.refreshSong();
    },
    updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      const progressPercent = (currentTime / duration) * 100;
      this.progressValue = progressPercent;
    },
    setProgress(e) {
      const width = e.target.parentElement.clientWidth;
      const clickX = e.offsetX;
      const duration = this.$refs.myAudio.duration;
      this.$refs.myAudio.currentTime = (clickX / width) * duration;
    },
    timeCalculate(time){
      var current_hour = parseInt(time / 3600) % 24,
      current_minute = parseInt(time / 60) % 60,
      current_seconds_long = time % 60,
      current_seconds = current_seconds_long.toFixed(),
      current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
  
      return current_time;
    },
    currentTimeCalc(){
      this.currentDate = this.timeCalculate(this.$refs.myAudio.currentTime)
    },
    favSong() {
      this.musics = this.musics.map((music, index) => index === this.songIndex ? {...music, fav: !music.fav} : music)
    }
  },
  computed: {
    getTime: function(){
      return this.timeCalculate(this.duration)
    },
    title: function(){
      return this.isPlay ? 'Now Playing' : 'Pause'
    },
    reload: function(){
      return this.isRandom && 'action-btn-active';
    },
    fav: function(){
      return this.musics[this.songIndex].fav && 'action-btn-fav';
    },
  },
  watch: {
    
  },
  mounted(){
    this.loadSong();
  },
}).mount('#app')