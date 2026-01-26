import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ExecutiveBoard() {
  const [showInterns, setShowInterns] = useState(false);

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
      major: 'Business Administration',
      year: 'Senior',
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
      bio: 'According to Lilianna, "I am a big back".',
      image: getPublicImageUrl('daniel.webp'),
      linkedin: 'https://www.linkedin.com/in/danielontai//'
    },
    {
      id: 6,
      name: 'Lena Lai',
      position: 'Marketing Chair',
      major: 'Biomedical Sciences',
      year: 'Senior',
      bio: 'I enjoy shopping/thrifting, makeup, going to boba shops, baking desserts, and listening to music/ going to shows! I\'ve been a big fan of Sanrio since I was 6!.',
      image: getPublicImageUrl('lena.webp'),
      linkedin: 'https://www.linkedin.com/in/lena-lai-729602240/'
    },
    {
      id: 7,
      name: 'Joshua Masih',
      position: 'Finance Chair',
      major: 'Computer Science',
      year: 'Senior',
      bio: 'I\'m really into fashion, football (real football) (Visca el Barça),  playing guitar, and I\'m a big Supernatural fan.',
      image: getPublicImageUrl('Joshua.webp'),
      linkedin: 'https://www.linkedin.com/in/joshua-masih/'
    }
  ];

  const internMembers = [
    {
      id: 1,
      name: 'Ti Mo',
      position: 'Co-President Intern',
      major: 'Mechanical Engineering with Aerospace Concentration ',
      year: 'Freshman',
      bio: 'A little about myself is I’m from Thailand, I’ve been living in Colorado for 15 years and I love Colorado. I like going out to eat a lot.',
      image: getPublicImageUrl('intern/TiMo.webp'),
      linkedin: ''
    },
    {
      id: 2,
      name: 'Mi Meh',
      position: 'Co-President Intern',
      major: 'Mechanical Engineering with Aerospace Concentration ',
      year: 'Freshman',
      bio: 'I do photography, I like to hang out with friends/family, I like to play tennis, and I have two cats named Ace and Keke.',
      image: getPublicImageUrl('intern/MiMeh.webp'),
      linkedin: 'https://www.linkedin.com/in/mi-meh-168469377/'
    },
    {
      id: 3,
      name: 'Charlie Hill',
      position: 'Vice President Intern',
      major: 'Aerospace Engineering Master\'s',
      year: 'Graduate Student',
      bio: 'Hello! I\'m Charlie, a first year master\'s student. I enjoy various hobbies from bouldering and soccer to video games, guitar and D&D. I\'m very excited to become more involved with CSU\'s community, the greater SASE community, and meet lots of interesting people!',
      image: getPublicImageUrl('intern/Charlie.webp'),
      linkedin: ''
    },
    {
      id: 4,
      name: 'Kacey Hoang',
      position: 'Fundraising Intern',
      major: 'Civil Engineering',
      year: 'Freshman',
      bio: 'I like to crochet, sketch, take digital camera pictures and nap. I hope to contribute to the growth in the sase community at CSU.',
      image: getPublicImageUrl('intern/Kacey.webp'),
      linkedin: ''
    },
    {
      id: 5,
      name: 'Dylan Stoner',
      position: 'Event Coordination Intern',
      major: 'Computer Science',
      year: 'Freshman',
      bio: 'Some hobbies I have is going to the gym and walking at night and playing video games. What I hope to accomplish in SASE is to learn and get more experience in the real world and to get more connections.',
      image: getPublicImageUrl('intern/dylan.webp'),
      linkedin: 'https://www.linkedin.com/in/dylan-stoner-4b259b398/'
    },
    {
      id: 6,
      name: 'Winny Zhang',
      position: 'Marketing Intern',
      major: 'Computer Science with a concetration in Human Computer Interaction',
      year: 'Sophomore',
      bio: 'I love doing nails, trying new foods, traveling, photo booth, and hang out with friends! Something I hope to accomplish in SASE is gaining hands-on experiences while also meeting new people! ',
      image: getPublicImageUrl('intern/Winny.webp'),
      linkedin: ''
    }
  ];

  const currentMembers = showInterns ? internMembers : boardMembers;

  return (
    <div className="executive-board-page">
      <div className="hero">
        <div className="content">
          <h1>{showInterns ? 'Executive Board Interns' : 'Executive Board'}</h1>
          <p>Meet the dedicated team of students who lead SASE CSU</p>

          <div className="toggle-container">
            <span className={!showInterns ? 'toggle-label active' : 'toggle-label'}>Board</span>
            <div className="toggle-switch" onClick={() => setShowInterns(!showInterns)}>
              <div className={`toggle-slider ${showInterns ? 'active' : ''}`}></div>
            </div>
            <span className={showInterns ? 'toggle-label active' : 'toggle-label'}>Interns</span>
          </div>
        </div>
      </div>

      <div className="section">
        <p className="board-intro">Our executive board works tirelessly to create valuable opportunities for our members and build a supportive community. Feel free to reach out to any of our board members if you have questions or ideas!</p>

        <div className="board-grid">
          {currentMembers.map(boardMember => (
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
        <h2 className="section-title">Join the Executive Board</h2>
        <p>Interested in joining our leadership team? Elections for the upcoming academic year are held each spring semester. Keep an eye out for announcements about available positions and the application process.</p>
        <p>Being part of the executive board is a great way to develop leadership skills, make an impact on the community, and build your resume!</p>
        <Link to="/contact" className="btn">Learn More About Leadership Opportunities</Link>
      </div>
    </div>
  );
}

export default ExecutiveBoard;
