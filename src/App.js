import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Meetings from './pages/Meetings';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import ExecutiveBoard from './pages/ExecutiveBoard';
import Contact from './pages/Contact';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header>
          <nav className="navbar">
            <div className="logo">
              <Link to="/">SASE CSU</Link>
            </div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/meetings">Meetings</Link></li>
              <li><Link to="/events">Next Event</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/executive-board">Executive Board</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/calendar">Event Calendar</Link></li>
              </ul>
          </nav>
        </header>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/meetings" component={Meetings} />
            <Route path="/events" component={Events} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/executive-board" component={ExecutiveBoard} />
            <Route path="/contact" component={Contact} />
            <Route path="/calendar" component={Calendar} />
          </Switch>
        </main>

        <footer>
          <div className="footer-content">
            <div className="footer-section">
              <h3>SASE CSU Chapter</h3>
              <p>Society of Asian Scientists and Engineers</p>
              <p>Colorado State University</p>
            </div>
            <div className="footer-section">
              <h3>Connect With Us</h3>
              <ul className="social-links">
                <li><a href="https://www.instagram.com/csu.sase?igsh=MWNkY29yN3ZzeTk3bA==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                {/* <li><a href="https://facebook.com/sasecsu" target="_blank" rel="noopener noreferrer">LinkedIn</a></li> */}
                {/* <li><a href="https://discord.gg/sasecsu" target="_blank" rel="noopener noreferrer">Discord</a></li> */}
                <li><a href="https://groupme.com/join_group/63382533/ToeT4AEk" target="_blank" rel="noopener noreferrer">GroupMe</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/meetings">Meeting Schedule</Link></li>
                <li><Link to="/events">Upcoming Events</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Society of Asian Scientists and Engineers - CSU Chapter</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;