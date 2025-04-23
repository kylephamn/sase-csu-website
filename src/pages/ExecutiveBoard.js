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
      major: 'Chemical  Engineering',
      year: 'Junior',
      bio: 'I\'m a chemical engineering student and my life-long dream is to own a duck, bunny, ferret, and a cat!',
      image: getPublicImageUrl('su.webp')
    },
    {
      id: 2,
      name: 'Anisha Kalla',
      position: 'Co-President',
      major: 'Mechanical Engineering',
      year: 'Junior',
      bio: 'My name is Anisha and I am excited to be Co-President of SASE!',
      image: getPublicImageUrl('anisha.webp')
    },
    {
      id: 3,
      name: 'Stefania Miranda',
      position: 'Finance Chair',
      major: 'Physics',
      year: 'Junior',
      bio: 'I\'m a Physics major. I"m from India, grew up in Dubai, and am trained in ballet!',
      image: getPublicImageUrl('stef.webp')
    },
    {
      id: 4,
      name: 'Jasmine Cheng',
      position: 'Fundraising Chair',
      major: 'Electrical Engineering',
      year: 'Sophomore',
      bio: 'My name is Jasmine Cheng, Electrical Engineering major. I\'m a second year student from Fort Collins and I love painting, matcha, and exploring new places!',
      image: getPublicImageUrl('jasm.webp')
    },
    {
      id: 5,
      name: 'Kyle Pham',
      position: 'Event Coordinator Chair',
      major: 'Computer Science',
      year: 'Junior',
      bio: 'Hey I\'m Kyle , a 3rd year Computer Science with a concentration in Software Engineering.',
      image: getPublicImageUrl('kyle.webp')
    },
    {
      id: 6,
      name: 'Kai Meilahn-Kinard',
      position: 'Marketing Chair',
      major: 'Mechanical Engineering',
      year: 'Sophomore',
      bio: 'Hi I\'m Kai and I\'m a Sophomore in mechanical engineering from Eagan, MN.',
      image: getPublicImageUrl('kai.webp')
    },
    {
      id: 7,
      name: 'Mason Maynell',
      position: 'Conference Chair',
      major: 'Mechanical Engineering',
      year: 'Junior',
      bio: 'My name is Mason Maynell, I\'m a junior mechanical engineering student, and I\'ve caught myself on fire only once.',
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