const trackName = document.getElementById("track-name");
const trackArtist = document.getElementById("track-artist");
const trackImg = document.getElementById("track-img");
const trackImgSmall = document.getElementById("track-img-small");
const playlistDiv = document.getElementById("playlist");
const playIcon = document.getElementById("play-icon");
const currentTimeEl = document.getElementById("current-time");
const durationTimeEl = document.getElementById("duration-time");
const bar = document.getElementById("seekbar");
const progress = document.getElementById("seekbar-progress");
const thumb = document.getElementById("seekbar-thumb");
const bgOverlay = document.getElementById("bg-overlay");

let audioContext;
let analyser;
let dataArray;
let isShuffle = false;


const trackList = [
    {
        name: "An Thần",
        artist: "Low G, Thắng",
        img: "./images/An Thần.jpeg",
        src: "./music/An Thần.mp3"
    },
    {
        name: "6262",
        artist: "Low G",
        img: "./images/6262.jpeg",
        src: "./music/6262 (prod. Maiki) _ Low G _ Nhà Hoá Học Đống Đa.mp3"
    },
    {
        name: "Bảo tàng",
        artist: "Low G",
        img: "./images/Bảo tàng.jpeg",
        src: "./music/Bảo Tàng (prod. Maiki) _ Low G _ Nhà Hóa Học Đống Đa.mp3"
    },
    {
        name: "Pho real",
        artist: "Low G, Anh Phan, bbno$",
        img: "./images/Pho real.jpeg",
        src: "./music/bbno$, Low G & Anh Phan - pho real.mp3"
    },
    {
        name: "Càng cua",
        artist: "Low G",
        img: "./images/Càng cua.jpeg",
        src: "./music/Càng Cua _ Low G x Last Fire Crew _ Nhà Hóa Học Đống Đa.mp3"
    },
    {
        name: "Cypher Nhà Làm",
        artist: "Low G, ResQ, Chí, Teddie J",
        img: "./images/Cypher nhà làm.jpeg",
        src: "./music/Cypher Nhà Làm.mp3"
    },
    {
        name: "Giọng Ta",
        artist: "Daisy Le Garçon, Low G, BeepBeepChild",
        img: "./images/Giọng ta.jpeg",
        src: "./music/Daisy Le Garçon - Giọng Ta (ft. Low G, BeepBeepChild) _ Official Music Video.mp3"
    },
    {
        name: "Dáng Xấu",
        artist: "Low G",
        img: "./images/Dáng xấu.jpeg",
        src: "./music/Dáng Xấu _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Dáng Xinh",
        artist: "Low G, Trungng",
        img: "./images/Dáng xinh.jpeg",
        src: "./music/Dáng Xinh (prod. Trungng) _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Cách Tán Gái 101",
        artist: "Low G",
        img: "./images/Tán gái 505.jpeg",
        src: "./music/Cách Tán Gái 101 (Japan Remix) _ Low G ft. Ska _ Rap Nhà Làm.mp3"
    },
    {
        name: "Tán Gái 202",
        artist: "Low G",
        img: "./images/Tán gái 505.jpeg",
        src: "./music/Tán Gái 202 _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Tán Gái 303",
        artist: "Low G",
        img: "./images/Tán gái 303.jpeg",
        src: "./music/Tán Gái 303 _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Tán Gái 505",
        artist: "Low G",
        img: "./images/Tán gái 505.jpeg",
        src: "./music/Tán Gái 505 _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Tán Gái 606",
        artist: "Low G",
        img: "./images/Tán gái 606.jpeg",
        src: "./music/Tán Gái 606 _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "FASHION Tán Gái",
        artist: "Low G, Wren Evans",
        img: "./images/FASHION Tán Gái.jpeg",
        src: "./music/FASHION TÁN GÁI (BECK STAGE CYPHER 2021) - Wren Evans ft Low G.mp3"
    },
    {
        name: "Chán Gái 707",
        artist: "Low G",
        img: "./images/Chán gái 707.jpeg",
        src: "./music/Chán Gái 707 _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Simp Gái 808",
        artist: "Low G",
        img: "./images/Simp Gái 808.jpeg",
        src: "./music/Simp Gái 808 _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Love Game",
        artist: "Low G, tlinh",
        img: "./images/Love game.jpeg",
        src: "./music/Low G _ Love Game (ft. tlinh) _ OFFICIAL MUSIC VIDEO.mp3"
    },
    {
        name: "DÂU TẰM",
        artist: "Low G, tlinh",
        img: "./images/HOP ON DA SHOW.jpeg",
        src: "./music/DÂU TẰM _ Low G x tlinh _ OFFICIAL AUDIO.mp3"
    },
    {
        name: "HOP ON DA SHOW",
        artist: "Low G, tlinh",
        img: "./images/HOP ON DA SHOW.jpeg",
        src: "./music/HOP ON DA SHOW _ Low G x tlinh x Last Fire Crew _ OFFICIAL MUSIC VIDEO.mp3"
    },
    {
        name: "Đơn Giản",
        artist: "Low G",
        img: "./images/Đơn giản.jpeg",
        src: "./music/Đơn Giản _ Low G _ Nhà Hóa Học Đống Đa.mp3"
    },
    {
        name: "Flexin  trên Circle K",
        artist: "Low G",
        img: "./images/Flexin  trên Circle K.jpeg",
        src: "./music/Flexin  trên Circle K _ Low G (Lyric video) _ Rap Nhà Làm.mp3"
    },
    {
        name: "Flexin  trên Circle K 2",
        artist: "Low G",
        img: "./images/Flexin trên Circle K 2.jpeg",
        src: "./music/Flexin  Trên Circle K 2 _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Không Thèm",
        artist: "Low G",
        img: "./images/Không Thèm.jpeg",
        src: "./music/Không Thèm (prod. Maiki) _ Low G _ Nhà Hóa Học Đống Đa.mp3"
    },
    {
        name: "Không Thích",
        artist: "Low G",
        img: "./images/Không Thích.jpeg",
        src: "./music/Không Thích _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Không Yêu Em Thì Yêu Ai",
        artist: "Low G, Vũ.",
        img: "./images/Không Yêu Em Thì Yêu Ai.jpeg",
        src: "./music/Không Yêu Em Thì Yêu Ai  _ Vũ. ft. Low G (từ Album  Bảo Tàng Của Nuối Tiếc ).mp3"
    },
    {
        name: "Đừng Để Tiền Rơi",
        artist: "Low G",
        img: "./images/Đừng Để Tiền Rơi.jpeg",
        src: "./music/Low G _ Đừng Để Tiền Rơi _ ‘L2K’ The Album.mp3"
    },
    {
        name: "In Love",
        artist: "Low G, JustaTee",
        img: "./images/Đừng Để Tiền Rơi.jpeg",
        src: "./music/Low G _ In Love (ft. JustaTee) _ ‘L2K’ The Album.mp3"
    },
    {
        name: "Long",
        artist: "Low G",
        img: "./images/Đừng Để Tiền Rơi.jpeg",
        src: "./music/Low G _ Long _ ‘L2K’ The Album.mp3"
    },
    {
        name: "Nét",
        artist: "Low G",
        img: "./images/Nét.jpeg",
        src: "./music/Low G _ Nét _ OFFICIAL MUSIC VIDEO.mp3"
    },
    {
        name: "Nhiều Hơn",
        artist: "Low G",
        img: "./images/Đừng Để Tiền Rơi.jpeg",
        src: "./music/Low G _ Nhiều Hơn _ ‘L2K’ The Album.mp3"
    },
    {
        name: "Peace N’ Love",
        artist: "Low G, My Anh",
        img: "./images/Đừng Để Tiền Rơi.jpeg",
        src: "./music/Low G _ Peace N’ Love (ft. Mỹ Anh) _ ‘L2K’ The Album.mp3"
    },
    {
        name: "Siêu Sao",
        artist: "Low G",
        img: "./images/Đừng Để Tiền Rơi.jpeg",
        src: "./music/Low G _ Siêu Sao _ ‘L2K’ The Album.mp3"
    },
    {
        name: "Tràng Thi",
        artist: "Low G",
        img: "./images/Đừng Để Tiền Rơi.jpeg",
        src: "./music/Low G _ Tràng Thi _ ‘L2K’ The Album.mp3"
    },
    {
        name: "okeokeoke",
        artist: "Low G",
        img: "./images/okeokeoke.jpeg",
        src: "./music/Okeokeoke.mp3"
    },
    {
        name: "Simple Cypher",
        artist: "Low G",
        img: "./images/Simple Cypher.jpeg",
        src: "./music/Simple Cypher.mp3"
    },
    {
        name: "Thủ Đô Cypher",
        artist: "Low G, Raptital, RPT Orijinn, RZ Ma$, RPT MCK, RPT Phongkhin",
        img: "./images/Thủ Đô Cypher.jpeg",
        src: "./music/Thủ Đô Cypher - Beck Stage X Biti s Hunter ( RPT Orijinn, LOW G, RZMas, RPT MCK).mp3"
    },
    {
        name: "Thiên Thần Ác Quỷ",
        artist: "Low G",
        img: "./images/Thiên Thần Ác Quỷ.jpeg",
        src: "./music/Low G - Thiên Thần Ác Quỷ _ A COLORS SHOW.mp3"
    },
    {
        name: "Có em",
        artist: "Low G, Madihu",
        img: "./images/Có em.jpeg",
        src: "./music/Madihu - Có em (Feat. Low G) [Official MV].mp3"
    },
    {
        name: "Có Khi",
        artist: "Low G, Madihu",
        img: "./images/Có Khi.jpeg",
        src: "./music/Madihu - Có Khi (Feat. Low G) _ Official MV.mp3"
    },
    {
        name: "MUỘN PHIỀN",
        artist: "Phương Ly, Low G, VSTRA",
        img: "./images/MUỘN PHIỀN.jpeg",
        src: "./music/MUỘN PHIỀN – PHƯƠNG LY ft. LOW G _ OFFICIAL MV.mp3"
    },
    {
        name: "NGÂN",
        artist: "tlinh, Low G",
        img: "./images/HOP ON DA SHOW.jpeg",
        src: "./music/NGÂN _ Low G x tlinh _ OFFICIAL AUDIO.mp3"
    },
    {
        name: "Ôi Bạn Ơi",
        artist: "Low G, Teddie J",
        img: "./images/Ôi Bạn Ơi.jpeg",
        src: "./music/Ôi Bạn Ơi (Prod. Maiki) _ Low G ft. Teddie J _ Rap Nhà Làm.mp3"
    },
    {
        name: "Phân Thân",
        artist: "Low G",
        img: "./images/Phân Thân.jpeg",
        src: "./music/Phân Thân (prod. Maiki) _ Low G x DCGR _ Nhà Hóa Học Đống Đa.mp3"
    },
    {
        name: "PHONG LONG",
        artist: "Low G, Obito, WOKEUP",
        img: "./images/PHONG LONG.jpeg",
        src: "./music/PHONG LONG 👬 Low G x Obito x WOKEUP _ WCAs 2023.mp3"
    },
    {
        name: "PHÓNG ZÌN ZÌN",
        artist: "tlinh, Low G",
        img: "./images/HOP ON DA SHOW.jpeg",
        src: "./music/PHÓNG ZÌN ZÌN _ Low G x tlinh _ OFFICIAL AUDIO.mp3"
    },
    {
        name: "Quá Sớm",
        artist: "Low G",
        img: "./images/Quá Sớm.jpeg",
        src: "./music/Quá Sớm _ Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Tam Giác",
        artist: "Anh Phan, Low G, Larria",
        img: "./images/Tam Giác.jpeg",
        src: "./music/Tam Giác - Anh Phan ft. Low G & Larria. (M_V).mp3"
    },
    {
        name: "Thơ",
        artist: "Low G",
        img: "./images/Thơ.jpeg",
        src: "./music/Thơ _ @chí-c8chai  ft. Low G _ Rap Nhà Làm.mp3"
    },
    {
        name: "Tiếp Đất",
        artist: "Low G, Thắng, Vantacrow",
        img: "./images/Tiếp Đất.jpeg",
        src: "./music/Tiếp Đất (prod. Vantacrow) _ Low G ft. Thắng _ Rap Nhà Làm.mp3"
    },
    {
        name: "NGƯỜI ĐI BAO",
        artist: "tlinh, Low G",
        img: "./images/NGƯỜI ĐI BAO.jpeg",
        src: "./music/tlinh - NGƯỜI ĐI BAO (ft. Low G ) _ OFFICIAL MUSIC VIDEO.mp3"
    },
    {
        name: "vứt zác (vào trong thùng)",
        artist: "tlinh, Low G",
        img: "./images/vứt zác.jpeg",
        src: "./music/vứt zác (vào trong thùng) - tlinh ft. Low G.mp3"
    },
    {
        name: "CÓ CHUYỆN, CÙNG CHILL",
        artist: "Low G, Wowy, NÂN",
        img: "./images/CÓ CHUYỆN, CÙNG CHILL.jpeg",
        src: "./music/WOWY x LOW G x NÂN x MASEW _ CÓ CHUYỆN, CÙNG CHILL (#CCCC) x BECK S ICE _ OFFICIAL MV.mp3"
    }
];

let trackIndex = 0;
let isPlaying = false;
let isDragging = false;

const audio = new Audio();



function loadTrack(index) {
    const track = trackList[index];
    audio.src = track.src;

    trackName.textContent = track.name;
    trackArtist.textContent = track.artist;

    trackImg.src = track.img;
    trackImgSmall.src = "./images/Lowg Pfp.jpeg";

    updatePlaylistUI();
}

loadTrack(trackIndex);


function playTrack() {
    audio.play();
    isPlaying = true;
    playIcon.classList.replace("fa-play", "fa-pause");

    const overlay = document.getElementById("bg-overlay");
    overlay.style.background = getRandomGradient();
    overlay.style.opacity = "1";

    document.getElementById("footer-wave").style.opacity = "1";
    initAudioAnalyzer();
}



function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playIcon.classList.replace("fa-pause", "fa-play");

    const overlay = document.getElementById("bg-overlay");
    overlay.style.opacity = "0";

    document.getElementById("footer-wave").style.opacity = "0";
}






function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function nextTrack() {
    if (isShuffle) {
        playRandomTrack();
    } else {
        trackIndex = (trackIndex + 1) % trackList.length;
        loadTrack(trackIndex);
        playTrack();
    }
}


function prevTrack() {
    trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(trackIndex);
    playTrack();
}

document.addEventListener("keydown", function(event) {
    const active = document.activeElement;
    if (
        active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.isContentEditable
    ) return;

    if (event.code === "Space") {
        event.preventDefault();
        playpauseTrack();
    }
});

function updateProgressLoop() {
    if (!isDragging && audio.duration) {
        const percent = audio.currentTime / audio.duration;
        updateUI(percent);
    }

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationTimeEl.textContent = formatTime(audio.duration);

    requestAnimationFrame(updateProgressLoop);
}

requestAnimationFrame(updateProgressLoop);

function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}


let dragPercent = 0;

const updateUI = (percent) => {
    percent = Math.max(0, Math.min(1, percent));

    progress.style.width = `${percent * 100}%`;

    const barWidth = bar.offsetWidth;
    const thumbWidth = thumb.offsetWidth;
    thumb.style.left = `${percent * barWidth - thumbWidth / 2}px`;
};

const root = document.body;

const getPercent = (e) => {
    const rect = bar.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
};

bar.addEventListener("mousedown", (e) => {
    isDragging = true;
    root.classList.add("dragging");
    dragPercent = getPercent(e);
    updateUI(dragPercent);
    audio.currentTime = dragPercent * audio.duration;
});


document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    dragPercent = getPercent(e);
    updateUI(dragPercent);
});

document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    root.classList.remove("dragging");
    audio.currentTime = dragPercent * audio.duration;
});

function updatePlaylistUI() {
    playlistDiv.innerHTML = "";

    trackList.forEach((track, i) => {
        const div = document.createElement("div");
        div.className = `flex items-center gap-3 p-2 rounded-lg cursor-pointer bg-gradient-to-r ${
            i === trackIndex ? "from-purple-500" : "to-gray-500"
        }`;

        div.innerHTML = `
    <img src="${track.img}" class="w-10 h-10 object-cover rounded">
    <div>
        <div class="font-semibold truncate overflow-hidden whitespace-nowrap w-40">${track.name}</div>
        <div class="text-sm opacity-60 truncate overflow-hidden whitespace-nowrap w-32">${track.artist}</div>
    </div>
`;


        div.onclick = () => {
            trackIndex = i;
            loadTrack(trackIndex);
            playTrack();
        };

        playlistDiv.appendChild(div);
    });
}

const volumeSlider = document.getElementById("volume-slider");

audio.volume = 1;
volumeSlider.value = 1;

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

function getRandomGradient() {
    const gradients = [
        "linear-gradient(180deg, #000000, #7700A6)",
    ];

    return gradients[Math.floor(Math.random() * gradients.length)];
}

const shuffleBtn = document.getElementById("shuffleBtn");

shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;

    if (isShuffle) {
        shuffleBtn.classList.add("shuffle-active");
    } else {
        shuffleBtn.classList.remove("shuffle-active");
    }
});

function playRandomTrack() {
    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * trackList.length);
    } while (newIndex === trackIndex);

    trackIndex = newIndex;
    loadTrack(trackIndex);
    playTrack();
}

audio.addEventListener("ended", () => {
    if (isShuffle) {
        playRandomTrack();
    } else {
        nextTrack();
    }
});

function initAudioAnalyzer() {
    if (!audioContext) {
        audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);
        analyser.connect(audioContext.destination);
    }

    visualizeWave();
}

function visualizeWave() {
    const bars = document.querySelectorAll("#footer-wave .bar");

    function animate() {
        requestAnimationFrame(animate);

        if (!isPlaying) return;

        analyser.getByteFrequencyData(dataArray);

        const half = Math.floor(dataArray.length / 2);

        for (let i = 0; i < 5; i++) {
            const value = dataArray[i + 2];
            const height = (value / 255) * 30;

            bars[4 - i].style.height = `${Math.max(6, height)}px`;
            bars[5 + i].style.height = `${Math.max(6, height)}px`;
        }
    }

    animate();
}


console.log("soo i made this just for fun");
console.log("- Zii -");


updatePlaylistUI();
