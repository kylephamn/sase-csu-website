import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

// Import context
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Import components
import LanguageSelector from './components/LanguageSelector';
import './components/LanguageSelector.css';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Meetings from './pages/Meetings';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import ExecutiveBoard from './pages/ExecutiveBoard';
import Contact from './pages/Contact';
import Calendar from './pages/Calendar';

// Create an AppContent component to use the language context
const AppContent = () => {
  const { t } = useLanguage();
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header>
          <nav className="navbar">
            <div className="logo">
              <Link to="/">{t('global.siteTitle')}</Link>
            </div>
            <ul className="nav-links">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/meetings">{t('nav.meetings')}</Link></li>
              <li><Link to="/events">{t('nav.events')}</Link></li>
              <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
              <li><Link to="/executive-board">{t('nav.executiveBoard')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
              <li><Link to="/calendar">{t('nav.calendar')}</Link></li>
            </ul>
            <LanguageSelector />
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
              <h3>{t('footer.chapter')}</h3>
              <p>{t('footer.organization')}</p>
              <p>{t('footer.university')}</p>
            </div>
            <div className="footer-section">
              <h3>{t('footer.connect')}</h3>
              <ul className="social-links">
                <li><a href="https://www.instagram.com/csu.sase?igsh=MWNkY29yN3ZzeTk3bA==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://discord.gg/yBpQT9XQQQ" target="_blank" rel="noopener noreferrer">Discord</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>{t('footer.quickLinks')}</h3>
              <ul>
                <li><Link to="/meetings">{t('footer.meetingSchedule')}</Link></li>
                <li><Link to="/events">{t('footer.upcomingEvents')}</Link></li>
                <li><Link to="/contact">{t('footer.contactUs')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

// Main App component wraps the content with the LanguageProvider
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;