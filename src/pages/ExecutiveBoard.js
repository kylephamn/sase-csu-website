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
      name: 'Kyle Pham',
      position: 'Co-President & Webmaster',
      major: 'Computer Science: Software Engineering',
      year: 'Senior',
      bio: 'I am on the USLI team and will be joining Lockheed Martin Space full-time, once I graduate.',
      image: getPublicImageUrl('kyle.webp'),
      linkedin: 'https://www.linkedin.com/in/kylephamn/'
    },
    {
      id: 2,
      name: 'Aedyn Simon',
      position: 'Co-President',
      major: 'Computer Science',
      year: 'Senior',
      bio: 'I play drums for the CSU jazz bands as well as for my personal funk and punk/rock bands.',
      image: getPublicImageUrl('aedyn.webp'),
      linkedin: 'https://www.linkedin.com/in/aedynsimon/'
    },
    {
      id: 3,
      name: 'Isa Fontana',
      position: 'Vice President',
      major: 'Computer Engineering: Aerospace Systems',
      year: 'Senior',
      bio: 'I dance and I run a TEDx program! Worked on rockets the past two summers!',
      image: getPublicImageUrl('isa.webp'),
      linkedin: 'https://www.linkedin.com/in/isafontana/'
    },
    {
      id: 4,
      name: 'Lilianna Nono',
      position: 'Fundraising Chair',
      major: 'Electrical Engineering',
      year: 'Sophomore',
      bio: 'I like food and I LOVE SHOPPING. I travel A LOT!!',
      image: getPublicImageUrl('lilianna.webp'),
      linkedin: 'https://www.linkedin.com/in/lilianna-nono-9ab500325/'
    },
    {
      id: 5,
      name: 'Daniel Ontai',
      position: 'Event Coordinator Chair',
      major: 'Data Science',
      year: 'Junior',
      bio: 'According to Lilianna, “I am a big back”.',
      image: getPublicImageUrl('daniel.webp'),
      linkedin: 'https://www.linkedin.com/in/danielontai//'
    },
    {
      id: 6,
      name: 'Kai Meilahn-Kinard',
      position: 'Marketing Chair',
      major: 'Mechanical Engineering',
      year: 'Sophomore',
      bio: 'I enjoy shopping/thrifting, makeup, going to boba shops, baking desserts, and listening to music/ going to shows! I\'ve been a big fan of Sanrio since I was 6!.',
      image: getPublicImageUrl('lena.webp'),
      linkedin: 'https://www.linkedin.com/in/lena-lai-729602240/'
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