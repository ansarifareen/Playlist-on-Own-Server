const songs = [
    { title: "Song A", artist: "Artist 1", duration: 300, genres: ["rock", "pop"] },
    { title: "Song B", artist: "Artist 2", duration: 200, genres: ["jazz"] },
    { title: "Song C", artist: "Artist 3", duration: 180, genres: ["rock"] },
    { title: "Song D", artist: "Artist 4", duration: 400, genres: ["pop"] },
    { title: "Song E", artist: "Artist 5", duration: 180, genres: ["jazz", "rock"] },
];

const userPreferences = {
    genres:["pop", "jazz"],
    minDuration: 60,
    maxDuration:300,
    sortCriteria: [
        { key: "duration", order: "asc" },
        { key: "title", order: "desc" }
    ],
    formatTemplate: "{title} by {artist} - {duration min} {duration sec}"
};

const advancedManagePlaylist = ((songs, userPreferences) => {
    //filtering the songs on basis of genre,min and max duration
    const filteredsongs = songs.filter((song => {
        const similarGenre = song.genres.some(genre => userPreferences.genres.includes(genre));
        return (
            similarGenre &&
            song.duration >= userPreferences.minDuration &&
            song.duration <= userPreferences.maxDuration
        );
    }));
    //sorting the songs by keys in asc and desc order 
    const sortedSongs = filteredsongs.sort((a, b) => {
        for (let c of userPreferences.sortCriteria) {
            const { key, order } = c;
            if (a[key] < b[key]) {
                if (order === 'asc') {
                    return -1; // ascending { a before b }
                } else {
                    return 1; //descending { b before A }
                }
            }
            if (a[key] > b[key]) {
                if (order === 'asc') {
                    return 1; //ascending  {place b before a }
                } else {
                    return -1; //descending 
                }
            }
        }
        return 0;
    });
    //formatting on code
    const formattedSongs = sortedSongs.map((song) => {
        const title = song.title;
        const Artist = song.artist;
        const min = Math.floor(song.duration / 60);
        const sec = song.duration % 60;

        return `${title} by ${Artist} ${min} min ${sec} sec`;
    });
    
    // measuring total duratoion of songs in minutes
    const totalDuratioInSec = filteredsongs.reduce((total, current) => total + current.duration, 0)
    const totalDurationInMin = Math.round(totalDuratioInSec / 60);
    
    //measuring average duration of songs in minutes.
    const averageDurationInMin = totalDurationInMin / filteredsongs.length;
    const averageDuration = (totalDurationInMin === 0 && filteredsongs.length === 0) ? 0 : Math.round(averageDurationInMin);


    // shorest and longest song of the filteredSongs
    let longestSong = filteredsongs[0];
    let shortestSong = filteredsongs[0];

    filteredsongs.forEach((song) => {
        if (song.duration > longestSong.duration) {
            longestSong = song;
        }
        if (song.duration < shortestSong.duration) {
            shortestSong = song;
        }
    }) 

   //Genre Count of user preferred songs
    let countGenres = {};
    userPreferences.genres.forEach((el)=>{
        countGenres[el]=0;
    })

    filteredsongs.forEach((i)=>{
         i.genres.forEach((element)=>{
            const required = userPreferences.genres.includes(element);
            if(required){
                    countGenres[element]++;
            }
        })
    })
    console.log(countGenres);


    return {
        formattedSongs,
        totalDuration: `${totalDurationInMin}`,
        averageDuration: `${averageDuration}`,
        longestSong : longestSong ? `${longestSong.title} by ${longestSong.artist}` : "0",
        shortestSong : shortestSong ? `${shortestSong.title} by ${shortestSong.artist}` : "0",
    }

});
const result = advancedManagePlaylist(songs, userPreferences);
console.log(result);
