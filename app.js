let vm = Vue.createApp({
  data() {
    return {
      musics:[
        {
          name: "The Lonely Shepherd",
          artist: "Gheorge Zamfir",
          cover: "https://i.scdn.co/image/ab67616d0000b273fecfac11994325a39cd03dec",
          source: "music/The-Lonely-Shepherd.mp3",
        },
        {
          name: "Once Upon a Time in the West",
          artist: "Ennio Morricone",
          cover: "https://i.scdn.co/image/ab67616d0000b2732b23062e3b70cc2725b4f960",
          source: "music/Once-Upon-a-Time-in-the-West.mp3",
        },
        {
          name: "So Was Red",
          artist: "Thomas Newman",
          cover: "https://i.scdn.co/image/ab67616d0000b273e710c1f5b228046932790031",
          source: "music/So-Was-Red.mp3",
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
      duration: null
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
    },
    playSong() {
      this.isPlay = !this.isPlay;
      
      if(this.isPlay) {
        this.$refs.myAudio.play()
      } else {
        this.$refs.myAudio.pause()
      }
      
    },
    prevSong() {
      this.songIndex--;

      if (this.songIndex < 0) {
        this.songIndex = this.musics.length - 1;
      }

      this.loadSong()      
      this.playSong();
    },
    nextSong() {
      this.songIndex++;

      if (this.songIndex > this.musics.length - 1) {
        this.songIndex = 0;
      }
      
      this.loadSong()
      this.playSong();
    },
    updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      const progressPercent = (currentTime / duration) * 100;
      this.progressValue = progressPercent;
    },
    setProgress(e) {
      const width = e.clientY - 256;
      const clickX = e.offsetX;
      const duration = this.$refs.myAudio.duration;
      this.$refs.myAudio.currentTime = (clickX / width) * duration;
    },
    timeCalculate: function(time){
      var current_hour = parseInt(time / 3600) % 24,
      current_minute = parseInt(time / 60) % 60,
      current_seconds_long = time % 60,
      current_seconds = current_seconds_long.toFixed(),
      current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
  
      return current_time;
    },
    currentTimeCalc(){
      this.currentDate = this.timeCalculate(this.$refs.myAudio.currentTime)
    }
  },
  computed: {
    getTime: function(){
      return this.timeCalculate(this.duration)
    },
    title: function(){
      return this.isPlay ? 'Now Playing' : 'Pause'
    }
  },
  mounted(){
    this.loadSong();
  },
}).mount('#app')