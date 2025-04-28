import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Gallery() {
  const { t } = useLanguage();
  
  // Helper function to get the public URL path
  const getPublicImageUrl = (imageName) => {
    return `${process.env.PUBLIC_URL}/images/${imageName}`;
  };

  const images = [
    {
      id: 1,
      title: 'National Conference 2023',
      src: getPublicImageUrl('ATL_CSU_Mines.webp'),
      description: 'Colorado State and Colorado School of Mines sharing a meal in Atlanta, GA.'
    },
    {
      id: 2,
      title: 'SASE Logo',
      src: getPublicImageUrl('logo-photo.webp'),
      description: 'Some of NC24\'s attendees with the large SASE logo.'
    },
    {
      id: 3,
      title: 'National Conference 2024',
      src: getPublicImageUrl('BOS_CSU_UCM.webp'),
      description: 'Colorado State and University of California Merced sharing a meal in Boston, MA.'
    },
    {
      id: 4,
      title: 'Closing Ceremony',
      src: getPublicImageUrl('closing-ceremony.webp'),
      description: 'Students participating in the closing ceremonies for NC24 led by SASE leadership.'
    },
    {
      id: 5,
      title: 'Community Service Day',
      src: getPublicImageUrl('sase_claws_2.webp'),
      description: 'SASE members volunteering at a local park.'
    }
  ];

  return (
    <div className="gallery-page">
      <div className="hero">
        <div className="content">
          <h1>{t('gallery.hero.title')}</h1>
          <p>{t('gallery.hero.description')}</p>
        </div>
      </div>
      
      <div className="section">
        <p className="gallery-intro">{t('gallery.intro')}</p>
        
        <div className="gallery-grid">
          {images.map(image => (
            <div key={image.id} className="gallery-item">
              <img 
                src={image.src} 
                alt={image.title} 
                className="gallery-image" 
                onError={(e) => {
                  console.log("Image failed to load:", image.title);
                  e.target.src = "https://placehold.co/400x300/f5f5f7/1d1d1f?text=SASE+CSU";
                }}
              />
              <div className="gallery-caption">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">{t('gallery.share.title')}</h2>
        <p>{t('gallery.share.description')}</p>
        <Link to="/contact" className="btn">{t('gallery.share.cta')}</Link>
      </div>
    </div>
  );
}

export default Gallery;