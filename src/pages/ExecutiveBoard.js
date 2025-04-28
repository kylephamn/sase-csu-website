import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function ExecutiveBoard() {
  const { t } = useLanguage();
  
  // Helper function to get the public URL path
  const getPublicImageUrl = (imageName) => {
    return `${process.env.PUBLIC_URL}/profiles/${imageName}`;
  };

  const boardMembers = [
    {
      id: 1,
      name: 'Su San Yar Tun',
      position: 'Co-President',
      major: 'Chemical Engineering',
      year: 'Junior',
      bio: 'I\'m a chemical engineering student and my life-long dream is to own a duck, bunny, ferret, and a cat!',
      image: getPublicImageUrl('su.webp'),
      linkedin: 'https://www.linkedin.com/in/su-san-yar-tun-89014a250/'
    },
    {
      id: 2,
      name: 'Anisha Kalla',
      position: 'Co-President',
      major: 'Mechanical Engineering',
      year: 'Junior',
      bio: 'My name is Anisha and I am excited to be Co-President of SASE!',
      image: getPublicImageUrl('anisha.webp'),
      linkedin: 'https://www.linkedin.com/in/anisha-kalla-8a4b92274/'
    },
    {
      id: 3,
      name: 'Stefania Miranda',
      position: 'Finance Chair',
      major: 'Physics',
      year: 'Junior',
      bio: 'I\'m a Physics major. I"m from India, grew up in Dubai, and am trained in ballet!',
      image: getPublicImageUrl('stef.webp'),
      linkedin: 'https://www.linkedin.com/in/stefania-miranda/'
    },
    {
      id: 4,
      name: 'Jasmine Cheng',
      position: 'Fundraising Chair',
      major: 'Electrical Engineering',
      year: 'Sophomore',
      bio: 'My name is Jasmine Cheng, Electrical Engineering major. I\'m a second year student from Fort Collins and I love painting, matcha, and exploring new places!',
      image: getPublicImageUrl('jasm.webp'),
      linkedin: 'https://www.linkedin.com/in/jasmine-cheng1221/'
    },
    {
      id: 5,
      name: 'Kyle Pham',
      position: 'Event Coordinator Chair & Webmaster',
      major: 'Computer Science',
      year: 'Junior',
      bio: 'Hey I\'m Kyle , a 3rd year Computer Science with a concentration in Software Engineering.',
      image: getPublicImageUrl('kyle.webp'),
      linkedin: 'https://www.linkedin.com/in/kylephamn/'
    },
    {
      id: 6,
      name: 'Kai Meilahn-Kinard',
      position: 'Marketing Chair',
      major: 'Mechanical Engineering',
      year: 'Sophomore',
      bio: 'Hi I\'m Kai and I\'m a Sophomore in mechanical engineering from Eagan, MN.',
      image: getPublicImageUrl('kai.webp'),
      linkedin: 'https://www.linkedin.com/in/kai-meilahn-kinard-a93984282/'
    },
    {
      id: 7,
      name: 'Mason Maynell',
      position: 'Conference Chair',
      major: 'Mechanical Engineering',
      year: 'Junior',
      bio: 'My name is Mason Maynell, I\'m a junior mechanical engineering student, and I\'ve caught myself on fire only once.',
      image: getPublicImageUrl('mason.webp'),
      linkedin: 'https://www.linkedin.com/in/mason-maynell/'
    }
  ];

  return (
    <div className="executive-board-page">
      <div className="hero">
        <div className="content">
          <h1>{t('executiveBoard.hero.title')}</h1>
          <p>{t('executiveBoard.hero.description')}</p>
        </div>
      </div>
      
      <div className="section">
        <p className="board-intro">{t('executiveBoard.intro')}</p>
        
        <div className="board-grid">
          {boardMembers.map(boardMember => (
            <div key={boardMember.id} className="board-member">
              <img 
                src={boardMember.image} 
                alt={boardMember.name} 
                className="member-image" 
                onError={(e) => {
                  console.log("Image failed to load:", boardMember.name);
                  e.target.src = "https://placehold.co/300x300/f5f5f7/1d1d1f?text=SASE+Member";
                }}
              />
              <div className="member-info">
                <h3>
                  {boardMember.name}
                  {boardMember.linkedin && (
                    <a href={boardMember.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-icon" style={{ marginLeft: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                </h3>
                <p className="member-position">{boardMember.position}</p>
                <p className="member-details">{boardMember.major} • {boardMember.year}</p>
                <p className="member-bio">{boardMember.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('executiveBoard.join.title')}</h2>
        <p>{t('executiveBoard.join.paragraph1')}</p>
        <p>{t('executiveBoard.join.paragraph2')}</p>
        <Link to="/contact" className="btn">{t('executiveBoard.join.cta')}</Link>
      </div>
    </div>
  );
}

export default ExecutiveBoard;