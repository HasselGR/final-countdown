import { useState, useEffect } from 'react';
import { Input } from './components/input.component';
import './App.css';

function App() {
  const [storiesLibrary, setStoriesLibrary] = useState({
    name:'',
    date:'',
    time:'00:00',
  })
  const [story, setStory] = useState({
    name:'',
    date:'',
    time:'00:00',
  })

  const [countdown, setCountdown] = useState({
    days:'',
    hours:'',
    minutes:'',
    seconds:'',
  })

  const handleChange = (event) => {
    
    setStory(oldEvent => ({
      ...oldEvent,
      [event.target.name]: event.target.value,
    }))
  }
  

  const timer =  () =>{
    const countdownDate = new Date (`${storiesLibrary.date} ${storiesLibrary.time}:00`).getTime();
    console.log('countdownDate', countdownDate);
    const period = setInterval( () => {
      const now = new Date().getTime()

      const waiting = countdownDate - now;


      const days = Math.floor(waiting / (1000 * 60 * 60 * 24));
      const hours = Math.floor((waiting % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((waiting % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((waiting % (1000 * 60)) / 1000);

      setCountdown(({
        days:days,
        hours:hours,
        minutes:minutes,
        seconds:seconds,
      }))
      
      if (waiting < 0 ){
        clearInterval(period)
        alert('Done')
      }

    }, 1000)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    const today = new Date();
    const eventDay =  new Date(story.date);
    if (eventDay < today){
      alert('you cant make a countdown to the past you dumdum');
      return;
    }
    for (const property in story){
      if (story[property] === ''){
        alert(`${property} field is empty `)
        return;
      }
    }
    setStoriesLibrary(({
      name:story.name,
      date:story.date,
      time:story.time,
    }))
    console.log(storiesLibrary)
    timer();
  }

  return (
    <div className="App">
      <h1>final-countdown</h1>
      <form onSubmit={handleSubmit}>
        <h2>Name of the event:</h2>
        <Input name="name" value={story.name} change={handleChange} />
        <br></br>
        <h2>Name of the event</h2>
        <Input name="date" value={story.date} change={handleChange} />
        <br></br>
        <h2>Time of the event</h2>
        <Input name="time" value={story.time} change={handleChange} />
        <button type='submit'>Start Countdown</button>
      </form>
      <div>
      

      </div>
    </div>
  );
}

export default App;
