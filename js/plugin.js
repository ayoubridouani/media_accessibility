var movie = document.querySelector('.movie');
var tvshow = document.querySelector('.tvshow');
var song = document.querySelector('.song');
var video_template = document.querySelector(".video-template");
var audio_player = document.querySelector(".audio-player");

var video = document.querySelector('.video');
var audio = document.querySelector(".audio");

movie.onclick = function(){
    video.src = "videos/video1.mp4";
    video_template.style.display = "block";
    audio_player.style.display = "none";
    audio.load();
    video.load();
}

tvshow.onclick = function(){
    video.src = "videos/video2.mp4";
    video_template.style.display = "block";
    audio_player.style.display = "none";
    audio.load();
    video.load();
}

song.onclick = function(){
    video_template.style.display = "none";
    audio_player.style.display = "block";
    video.load();
    audio.load();
}

// to play/pause the video
var toggle_play = document.querySelector('.toggle_play');
toggle_play.onclick = function(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    toggle_play.classList.toggle("fa-pause");
    toggle_play.classList.toggle("fa-play");
}

var volume = document.querySelector('.toggle_volume');
var volume_change = document.querySelector('.volume_change');

// to mute/unmute sound
var lastVolume = 10;
volume.onclick = function() {
	if(video.volume) {
        volume_change.value = 0;
		lastVolume = video.volume;
		video.volume = 0;
	} else {
        volume_change.value = lastVolume;
		video.volume = lastVolume;
	}
    volume.classList.toggle("fa-volume-up");
    volume.classList.toggle("fa-volume-mute");
}

// to inc/dec volume value
volume_change.oninput = function() {
    video.volume = volume_change.value;
    if (volume_change.value > 0.7) {
        volume.classList.add('fa-volume-up');
        volume.classList.remove('fa-volume-down');
        volume.classList.remove('fa-volume-mute');
    } else if (volume_change.value < 0.7 && volume_change.value > 0) {
        volume.classList.remove('fa-volume-up');
        volume.classList.add('fa-volume-down');
        volume.classList.remove('fa-volume-mute');
    } else if (volume_change.value == 0) {
        volume.classList.remove('fa-volume-up');
        volume.classList.remove('fa-volume-down');
        volume.classList.add('fa-volume-mute');
    }
    lastVolume = volume_change.value;
}

// to init video information after a success metadata load
video.onloadedmetadata = function() {
    console.log('video metadata loaded!');
    var max_of_steps = Math.floor(video.duration).toString(10);
    video_state.setAttribute('max',max_of_steps);
    total_time.innerHTML = `${neatTime(video.duration)}`;
};

var video_state = document.querySelector('.video_state');
var current_time = document.querySelector('.current_time');
var total_time = document.querySelector('.total_time');

function neatTime(time) {
    //var hours = Math.floor((time % 86400)/3600)
    var minutes = Math.floor((time % 3600)/60);
    var seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds:`0${seconds}`;
    minutes = minutes > 9 ? minutes:`0${minutes}`;
    //hours = hours > 9 ? hours:`0${hours}`;
    return /*${hours}:*/`${minutes}:${seconds}`;
}

// when a user change the current video time
video_state.oninput = function() {
    video.currentTime = video_state.value;
}

video.ontimeupdate = function() {
    video_state.value = video.currentTime;
    current_time.innerHTML = `${neatTime(video.currentTime)}`;
}

// when a user dec the current time by 5s
var angle_double_left = document.querySelector('.fa-angle-double-left');
angle_double_left.onclick = function() {
    video.currentTime -= 5;
}

// when a user inc the current time by 5s
var angle_double_right = document.querySelector('.fa-angle-double-right');
angle_double_right.onclick = function() {
    video.currentTime += 5;
}

// to hide/show subtitles
var captioning = document.querySelector('.captioning');
captioning.onclick = function() {
    if(video.textTracks[0].mode == 'showing'){
        video.textTracks[0].mode = 'hidden';
    }else{
        video.textTracks[0].mode = 'showing'
    }
    captioning.classList.toggle("far");
    captioning.classList.toggle("fas");
}

// to reseize video
function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
var fullscreen = false;
var toggleFullscreen = document.querySelector('.toggleFullscreen');
toggleFullscreen.onclick = function () {
    fullscreen? exitFullscreen() : launchIntoFullscreen(video);
    fullscreen = !fullscreen;
}

// when a video ending
video.onended = function(){
    toggle_play.classList.toggle("fa-pause");
    toggle_play.classList.toggle("fa-play");
}
  
var audio_state = document.querySelector('.audio_state');
var playbackTime = document.querySelector('.playback-time');

audio.onloadedmetadata = function(){
    console.log('audio metadata loaded!');
    var max_of_steps = Math.floor(audio.duration).toString(10);
    audio_state.setAttribute('max',max_of_steps);
    let currentTimeString = neatTime2(audio.currentTime);
    let durationString = neatTime2(audio.duration);
    playbackTime.innerHTML = currentTimeString + " / " + durationString;
}

audio.ontimeupdate = function(){
    let currentTimeString = neatTime2(audio.currentTime);
    let durationString = neatTime2(audio.duration);
    playbackTime.innerHTML = currentTimeString + " / " + durationString;
    audio_state.value = audio.currentTime;
}

audio.onended = function(){
    audio.pause();
    playAudio.style.display = "";
    pauseAudio.style.display = "none";
}

var playAudio = document.querySelector(".play");
var pauseAudio = document.querySelector(".pause");
playAudio.onclick = togglePlay;
pauseAudio.onclick = togglePlay;
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playAudio.style.display = "none";
        pauseAudio.style.display = "";
    } else {
        audio.pause();
        playAudio.style.display = "";
        pauseAudio.style.display = "none";
    }
}

var replayAudio = document.querySelector(".replay");
replayAudio.onclick = function() {
    audio.currentTime = audio.currentTime - 10;
}

var forwardAudio = document.querySelector(".forward");
forwardAudio.onclick = function() {
    audio.currentTime = audio.currentTime + 10;
}

var volumeAudio = document.querySelector(".volume");
var audio_volume_change = document.querySelector(".audio_volume_change");
var lastVolumeAudio = 10;

volumeAudio.onclick = function() {
    if (audio.muted) {
        audio.muted = false;
        volumeAudio.firstElementChild.innerHTML = "volume_up";
        audio_volume_change.value = lastVolumeAudio;
    } else {
        audio.muted = true;
        volumeAudio.firstElementChild.innerHTML = "volume_off";
        audio_volume_change.value = 0;
    }
}

audio_volume_change.oninput = function() {
    audio.volume = audio_volume_change.value;
    if (audio_volume_change.value > 0.7) {
        volumeAudio.firstElementChild.innerHTML = "volume_up";
    } else if (audio_volume_change.value < 0.7 && audio_volume_change.value > 0) {
        volumeAudio.firstElementChild.innerHTML = "volume_down";
    } else if (audio_volume_change.value == 0) {
        volumeAudio.firstElementChild.innerHTML = "volume_off";
    }
    lastVolumeAudio = audio_volume_change.value;
}

audio_state.oninput = function() {
    audio.currentTime = audio_state.value;
}

function neatTime2(s) {
    const minutes = Math.floor(s / 60).toString();
    const seconds = Math.floor(s % 60).toString();
    return minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
}