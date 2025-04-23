import React from 'react';

function ExecutiveBoard() {
  // Helper function to get the public URL path
  const getPublicImageUrl = (imageName) => {
    return `${process.env.PUBLIC_URL}/profiles/${imageName}`;
  };

  const boardMembers = [
    {
      id: 1,
      name: 'Su San Yar Tun',
      position: 'Co-President',
      major: 'Chemical Biological Engineering',
      year: 'Junior',
      bio: 'Su is passionate about promoting diversity in tech and helping fellow students succeed in their academic and professional journeys.',
      image: getPublicImageUrl('su.webp')
    },
    {
      id: 2,
      name: 'Anisha Kalla',
      position: 'Co-President',
      major: 'Mechanical Engineering',
      year: 'Junior',
      bio: 'Anisha is focused on building community connections and creating meaningful opportunities for SASE members.',
      image: getPublicImageUrl('anisha.webp')
    },
    {
      id: 3,
      name: 'Stefania Miranda',
      position: 'Finance Chair',
      major: 'Physics',
      year: 'Junior',
      bio: 'Stefania ensures smooth communication within the organization and manages our documentation and meeting minutes.',
      image: getPublicImageUrl('stef.webp')
    },
    {
      id: 4,
      name: 'Jasmine Cheng',
      position: 'Fundraising Chair',
      major: 'Electrical & Computer Engineering',
      year: 'Sophomore',
      bio: 'Jasmine handles our budget, fundraising efforts, and ensures financial transparency within the organization.',
      image: getPublicImageUrl('jasm.webp')
    },
    {
      id: 5,
      name: 'Kyle Pham',
      position: 'Event Coordinator Chair',
      major: 'Computer Science',
      year: 'Junior',
      bio: 'Kyle coordinates workshops, networking events, and other professional development opportunities for our members.',
      image: getPublicImageUrl('kyle.webp')
    },
    {
      id: 6,
      name: 'Kai Meilahn-Kinard',
      position: 'Marketing Chair',
      major: 'Mechanical Engineering',
      year: 'Sophomore',
      bio: 'Kai manages our social media presence, designs promotional materials, and helps increase our visibility on campus.',
      image: getPublicImageUrl('kai.webp')
    },
    {
      id: 7,
      name: 'Mason Maynell',
      position: 'Conference Chair',
      major: 'Mechanical Engineering',
      year: 'Junior',
      bio: 'Mason plans fun social events to help members connect and build relationships outside of professional settings.',
      image: getPublicImageUrl('mason.webp')
    }
  ];

  return (
    <div className="executive-board-page">
      <div className="hero">
        <div className="content">
          <h1>Executive Board</h1>
          <p>Meet the dedicated team of students who lead SASE CSU</p>
        </div>
      </div>
      
      <div className="section">
        <p className="board-intro">Our executive board works tirelessly to create valuable opportunities for our members and build a supportive community. Feel free to reach out to any of our board members if you have questions or ideas!</p>
        
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
                <h3>{boardMember.name}</h3>
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
        <a href="/#/contact" className="btn">Learn More About Leadership Opportunities</a>
      </div>
    </div>
  );
}

export default ExecutiveBoard;