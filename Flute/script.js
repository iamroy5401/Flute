console.log("Welcome to Flute");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myrange = document.getElementById('myrange');
let masterSname= document.getElementById('masterSname');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Agar Tum Mil Jao", filePath: "songs/1.MP3", coverPath: "logo/c1.jpg" },
    { songName: "Marjawa", filePath: "songs/2.MP3", coverPath: "logo/c2.jpg" },
    { songName: "Main Agar Kahoon", filePath: "songs/3.MP3", coverPath: "logo/c3.jpg" },
    { songName: "Aao Sunao", filePath: "songs/4.MP3", coverPath: "logo/c4.jpg" },
    { songName: "Tum Agar Manaoge", filePath: "songs/5.MP3", coverPath: "logo/c5.jpeg" },
    { songName: "Tum Kya Mile", filePath: "songs/6.MP3", coverPath: "logo/c6.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('sname')[0].innerText = songs[i].songName;
})

// audioElement.play(); 

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myrange.value = progress;
})


myrange.addEventListener('change', ()=>{
    audioElement.currentTime = myrange.value * audioElement.duration / 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    })

}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();     
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSname.innerText = songs[songIndex].songName;  
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 5;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})