const  container = document.querySelector('.container')
const  title = document.querySelector('.title')
const  cover = document.querySelector('.cover')
const  progressContainer = document.querySelector('.progress-container')
const  progress = document.querySelector('.progress')
const  prevBtn = document.querySelector('.prev')
const  playBtn = document.querySelector('.play')
const  nextBtn = document.querySelector('.next')
const  audio = document.querySelector('.audio')
const end = document.querySelector('#end')
const start = document.querySelector('#start')
const volume = document.getElementById('volume')



const songs = [
    'Ending - Isak Danielson',
    'Heather - Conan Gray',
    'Osmonlarda - Xamdam Sobirov',
    'U okna - HammAli & Navai',
    'Xcho - Эскизы',
  ]

  let songIndex = 0
  playSong(songs[songIndex])


  function playSong(song){
      title.textContent = song
      audio.src = `./musics/${song}.mp3`
      cover.src = `./album/${song}.jpg`
  }

  function playMusic(){
      const isPlay = container.classList.contains('play')


    if(isPlay){
        pause()
    } else {
        play()
    }

  }
//   play music
  function play(){
      container.classList.add('play')
      playBtn.innerHTML =" <i class='fas fa-pause'></i>"
      audio.play()
  }
//   pause Song
  function pause(){
    container.classList.remove('play')
    playBtn.innerHTML = " <i class='fas fa-play'></i>"
    audio.pause()
}
// next music
function next() {
    songIndex++ 
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    playSong(songs[songIndex])
    play()
}
// pervious music
function prev() {
    songIndex-- 
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    playSong(songs[songIndex])
    play()
}
// progess
function progess(e){
    const duration = e.srcElement.duration
    const curTime = e.srcElement.currentTime
    const presentageWidth =(curTime / duration) * 100
    progress.style.width = `${presentageWidth}%`

    // end time
    let endMinutes = Math.floor(duration / 60 )
    let endSecondes = Math.floor(duration % 60)
    end.textContent = `${endMinutes}: ${(endSecondes = endSecondes < 10 ? '0' + endSecondes : endSecondes)}`


    let startMinutes = Math.floor(curTime / 60 )
    let startSecondes = Math.floor(curTime % 60)
    start.textContent = `${startMinutes}: ${(startSecondes = startSecondes < 10 ? '0' + startSecondes : startSecondes)}`

}
// setProgress
function setProgress(e){
    const width = this.clientWidth
    const widthX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (widthX /width) * duration

}

// changeVolume
function changeVolume(e){
    const volumeMusic = +volume.value / +volume.max
    audio.volume = volumeMusic
}

playBtn.addEventListener('click', playMusic)
nextBtn.addEventListener('click', next)
prevBtn.addEventListener('click', prev)
audio.addEventListener('timeupdate', progess)
audio.addEventListener('ended', next)
volume.addEventListener('input', changeVolume)
progressContainer.addEventListener('click', setProgress)
