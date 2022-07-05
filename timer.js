function timer(time) {
  // Time Goal
  const timeGoal = new Date().getTime() + time;

  const counter = setInterval(() => {
    // Get current Time
    const currentTime = new Date().getTime();
    
    // Get time different
    const timeDifferent = timeGoal - currentTime;

    //Get minutes and seconds rest from time goal
    const minutes = Math.floor(timeDifferent / (1000 * 60));
    const seconds = Math.floor((timeDifferent % (1000 * 60)) / 1000);
     
    console.log(minutes);
    console.log(seconds);
    if (timeDifferent < 0) clearInterval(counter);
  }, 1000);

}

timer(60);
