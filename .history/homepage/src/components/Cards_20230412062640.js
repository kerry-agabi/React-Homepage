import React from 'react'
import CardItem from './CardItem'
import './Cards.css'


function Cards() {
  return (
    
    
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={require('../images/img-9.jpg')}
              text='Dive into the world of Agent Recruiting in retrospect Artificial intelligence'
              label="Recruitment"
              path="https://www.hubert.ai/insights/the-ultimate-guide-to-ai-recruiting"
            />
            <CardItem
              src={require('../images/img-2.jpg')}
              text= 'Enhance your resume to progress proficiently in your career'
              label="Career"
              path="https://www.businessnewsdaily.com/3207-resume-writing-tips.html"
            />
          </ul>
          <ul className="cards__items">
            
            <CardItem
              src={require('../images/img-3.jpg')}
              text= 'Explore the hidden waterfall deep inside the Amazon Jungle'
              label="Holiday"
              path="https://www.loveholidays.ie/"
            />
            <CardItem
              src={require('../images/img-4.jpg')}
              text= 'Hire contractors or temps to strengthen your workforce.'
              label="Network"
              path="https://www.recruiters.ie/becoming-a-contractor-or-a-temp/"
              
            />
            <CardItem
              src={require('../images/img-7.jpg')}
              text= 'What to Pack for a Night of Stargazing'
              label="Traveler"
              path="https://www.cntraveler.com/story/stargazing-gear-essentials"
              
              
            />
          </ul>
        </div>
      </div>
    </div>
    
  );
}

export default Cards
