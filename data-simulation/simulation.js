const generateRandomMovieProfile = () => {
  // generateRandomMovieProfile
  // Returns movie profile with values/scores for a random numbe of genres
  // A movie will typically have values/scores for 2-3 genres
  // For this simulation, a movie can have 1-5 genres
  // Sum of values/scores will add up to 100 for each movie
  const movieGenres = [
    'action',
    'animation',
    'comedy',
    'documentary',
    'drama',
    'family',
    'fantasy',
    'horror',
    'international',
    'musical',
    'mystery',
    'romance',
    'sci-fi',
    'thriller',
    'western',
  ];
  const movieProfile = {
    action: 0,
    animation: 0,
    comedy: 0,
    documentary: 0,
    drama: 0,
    family: 0,
    fantasy: 0,
    horror: 0,
    international: 0,
    musical: 0,
    mystery: 0,
    romance: 0,
    sci_fi: 0,
    thriller: 0,
    western: 0,
  };
  const numGenres = Math.ceil(Math.random() * 5); // 1-5 genres
  let score = 100; // sum of all values/scores
  const genres = movieGenres.slice();
  for (let i = 0; i < numGenres; i += 1) {
    const genreId = Math.floor(Math.random() * genres.length);
    const pickedGenre = genres.splice(genreId, 1);
    if (i === numGenres - 1) {
      movieProfile[pickedGenre] = score;
    } else {
      const pickScore = Math.ceil(Math.random() * score);
      movieProfile[pickedGenre] = pickScore;
      score -= pickScore;
    }
  }
  return movieProfile;
};

const generateProgress = (num) => {
  // generateProgress
  // Returns progress value for a movie watching event
  // 80% of the times it will be 1 (finished watching)
  // 20% of the times it will be 0.5 (midway through watching)
  if (num < 0.8) {
    return 1;
  }
  return 0.5;
};

const generateStartTime = (time, progress) => {
  // generateStartTime
  // Returns start time for an event
  // Assumes that a movie will have a duration of 1-3 hours
  const duration = (60 + (Math.random() * 120)) * 60000; // in milliseconds
  const startTime = time - (progress * duration);
  return new Date(startTime);
};

class Movie {
  constructor() {
    this.id = Math.ceil(Math.random() * 10000000); // id is between 1 to 10M
    this.profile = generateRandomMovieProfile();
  }
}

class Event {
  constructor(time) {
    this.movie = new Movie();
    const randomNum = Math.random();
    this.progress = generateProgress(randomNum);
    this.startTime = generateStartTime(time, this.progress);
  }
}

const createEventSeries = () => {
  // createEventSeries
  // Returns an array of movie watching events in chronological order [oldest, ... , recent]
  // Assume events are in serialized manner, i.e. events don't overlap each other
  // Assume that there will be 0-4 events per session, events can be 0 if user logged in
  // but engaged in no movie watching activity (may be filtered by Events service)
  const events = [];
  let eventEndTime = new Date();
  const eventCount = Math.floor(Math.random() * 5); // eventCount is between 0 to 4
  for (let i = 0; i < eventCount; i += 1) {
    const event = new Event(eventEndTime);
    eventEndTime = event.startTime;
    // console.log(event);
    events.push(event);
  }
  return events.reverse(); // reverse the array so events are chronological
};

console.log(createEventSeries());

// const simulateData = () => {
//   // SAMPLE SIZE
//   const sampleSize = 10;
//   let result = [];

//   for (let i = 0; i < sampleSize; i += 1) {
//     let sessionData = {};

//     // userId will be a number between 0 to 1M
//     // for now, 1-5 to account for small db
//     sessionData.userId = Math.ceil(Math.random() * 5);

//     sessionData.events = createEvents();


//     result.push(sessionData);
//   }
//   return result;
// };

// module.exports = { simulateData };