const playBtn = document.getElementById("play-btn")
const pauseBtn = document.getElementById("pause-btn")
const nextBtn = document.getElementById("next-btn")
const prevBtn = document.getElementById("prev-btn")
const song1 = document.getElementById("song1")
const cover = document.getElementById("cover")


// playBtn.addEventListener("click", function() {
//     song1.play()
//     cover.classList.add("dieversity")
// })

// pauseBtn.addEventListener("click", function() {
//     song1.pause()
//     cover.classList.remove("dieversity")
// })

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQBwbUMuuHTSGWvqwP-rmNIp7CQ1ahijyutm0AlNzikwUeA6GNJegpd6IFywo8q3xeBgb2eHwaV_8Zyd0zSu0hJ4FGpnRUGAVOf2_pwWEbn7WOd-M5pqmwU3EU0vkvD0AExWfVhuTzt2-E6Q3IIB5n6z6TxuerqNyJlw';
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    playBtn.onclick = function() {
      player.togglePlay();
    };

    pauseBtn.onclick = function() {
        player.pause();
      };

    nextBtn.onclick = function() {
        player.nextTrack()
    }

    prevBtn.onclick = function() {
        player.previousTrack()
    }

    player.connect();
}
