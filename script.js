const songs = [
  { id: 1, name: 'Electric', artist: 'Katy Perry', image: 'assets/images/electric-modified.jpg ', genre: 'pop', source: 'assets/Electric.mp3' },
  { id: 2, name: 'Pressure', artist: 'Martin Garrix', image: 'assets/images/pressure-modified.jpg', genre: 'rock', source: 'assets/Pressure.mp3' },
  { id: 3, name: 'Sorry', artist: 'Alan Walker', image: 'assets/images/sorry-modified.jpg', genre: 'pop', source: 'assets/Sorry.mp3' },
  { id: 4, name: 'Stronger ', artist: 'Martin Walker', image: 'assets/images/stronger-modified.jpg', genre: 'pop', source: 'assets/Stronger.mp3' },
  { id: 5, name: 'Fake', artist: 'Alan Walker', image: 'assets/images/fake-modified.jpg', genre: 'rock', source: 'assets/fake.mp3' },
  { id: 6, name: 'Too ', artist: 'Dimitri Vegas', image: 'assets/images/Too-modified.jpg', genre: 'hip-hop', source: 'assets/too.mp3' },
];

const genreFilter = document.getElementById('genre-filter');
const songList = document.getElementById('song-list');

const currentImage = document.getElementById('current-song-image');
const currentName = document.getElementById('current-song-name');
const currentArtist = document.getElementById('current-artist-name');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');

const checkboxToggle = document.getElementById('theme-toggle')

var hasDarkThemeClass = document.body.classList.contains('dark-theme');
let currentSongIndex = 0;
let playlists = [];
let currentPlaylist = '';

/* Start Display all the song  */
function showSongs() {
  const selectedGenre = genreFilter.value;
  const filteredSongs = (selectedGenre == 'all') ? songs : songs.filter((song) => song.genre == selectedGenre);
  songList.innerHTML = '';

  hasDarkThemeClass = document.body.classList.contains('dark-theme');
  let bgListItem = (hasDarkThemeClass) ? 'dark-bg-color' : '';

  filteredSongs.forEach((song) => {
    const listItem = document.createElement('li');
    listItem.className = `list-item ${bgListItem}`;
    listItem.innerHTML = `${song.name} - ${song.artist}`;
    listItem.onclick = () => playSong(song.id)
    songList.appendChild(listItem)
  })
}

/* Start render current song */
function renderCurrentSong() {

  const currentSong = songs[currentSongIndex];
  currentImage.src = currentSong.image;
  currentName.textContent = currentSong.name;
  currentArtist.textContent = currentSong.artist;

  audioSource.src = currentSong.source;
  audioPlayer.load();
  setTimeout(() => {
    audioPlayer.play();

  }, 200);

}

/*Play the current song*/
function playSong(songId) {
  currentSongIndex = songs.findIndex(song => song.id === songId);
  renderCurrentSong();
}

/*Go to previous song*/
function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  renderCurrentSong();
}

/*Go to next song*/
function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  renderCurrentSong();
}

/*Add the song to play list*/
function addToPlaylist() {
  const currentSong = songs[currentSongIndex];

  if (currentPlaylist != '') {
    const playlist = playlists.find(pl => pl.name === currentPlaylist);
    if (playlist) {

      if (playlist.songs.length === 0) {
        playlist.songs.push(currentSong)
      } else {
        const playlistExist = playlist.songs.some((plist) => plist.name == currentSong.name)
        if (!playlistExist) {
          playlist.songs.push(currentSong)
        } else {
          alert('This song is already added in this Playlist')
        }
      }
      renderPlaylistSongs(playlist)
    }

  }else{
    alert('Please select atleast one playlist')
  }
}

/*Create a  playlist*/
function createPlaylist() {
  const playlistName = document.getElementById('new-playlist');
  if (playlistName.value !='') {

    if (playlists.length === 0) {
      playlists.push({ name: playlistName.value, songs: [] });
    } else {
      const isPlaylistExist = playlists.some(plist => plist.name === playlistName.value)
      if (!isPlaylistExist) {
        playlists.push({ name: playlistName.value, songs: [] });
      } else {
        alert('This name playlist already created!')
      }
    }

    playlistName.value = '';
    renderPlaylists();
  }else{
    alert('Please enter a valid playlist name ')
  }
}

/*Render a playlist*/
function renderPlaylists() {

  const divAllPlaylist = document.getElementById('all-my-playlist');
  divAllPlaylist.innerHTML = '';

  hasDarkThemeClass = document.body.classList.contains('dark-theme');
  let bgListItem = (hasDarkThemeClass) ? 'dark-bg-color' : '';

  playlists.forEach((playlist) => {
    const allPlaylist = document.createElement('li')
    allPlaylist.className = `list-item ${bgListItem}`;

    allPlaylist.textContent = `${playlist.name}`;
    allPlaylist.onclick = () => renderPlaylistSongs(playlist);
    divAllPlaylist.insertAdjacentElement('beforeend', allPlaylist);
  })
}

/*Render a playlist songs*/
function renderPlaylistSongs(playlist) {
  currentPlaylist = playlist.name;

  const currentPlaylistSong = document.getElementById('current-playlist');
  currentPlaylistSong.innerHTML = '';
 

  const currentPlaylistName = document.querySelector('#playlist-heading');
  currentPlaylistName.style.display='block';
  currentPlaylistName.textContent = playlist.name;

  hasDarkThemeClass = document.body.classList.contains('dark-theme');
  let bgListItem = (hasDarkThemeClass) ? 'dark-bg-color' : '';


  playlist.songs.forEach((song) => {
    const listItem = document.createElement('li');
    listItem.className = `list-item ${bgListItem}`;
    listItem.innerHTML = `${song.name} - ${song.artist}`;
    listItem.onclick = () =>playSong(song.id);
    currentPlaylistSong.appendChild(listItem)
  })
}

/*Toggle theme dark light */
function toggleTheme() {
  const cardSection = document.querySelectorAll('.card-section');
  const currentSongDetail = document.querySelector('.current-song-detail');
  const cardShadow = document.querySelectorAll('.card-shadow');

  const songListltem = document.querySelectorAll('.list-item');
  const inputBgColor = document.querySelector('#new-playlist');


  if (checkboxToggle.checked) {
    document.body.classList.add('dark-theme')

    for (let index = 0; index < cardSection.length; index++) {
      cardSection[index].style.backgroundColor = '#263238';
      cardShadow[index].style.boxShadow = '-4px -4px 3px #63696D,4px 4px 4px black';
    }
    songListltem.forEach((element) => {
      element.style.backgroundColor = '#63696D';
    })
    currentSongDetail.style.backgroundColor = '#63696D';
    inputBgColor.style.backgroundColor = '#555656';
  } else {

    document.body.classList.remove('dark-theme')
    for (let index = 0; index < cardSection.length; index++) {
      cardSection[index].style.backgroundColor = '';
      cardShadow[index].style.boxShadow = '';
    }
    songListltem.forEach((element) => {
      element.style.backgroundColor = '';
      element.classList.remove('dark-bg-color')
    })
    currentSongDetail.style.backgroundColor = '';
    inputBgColor.style.backgroundColor = '';
  }

}

//filter the genre and display the song 
genreFilter.addEventListener('change', showSongs)
showSongs();
renderCurrentSong();
renderPlaylists();