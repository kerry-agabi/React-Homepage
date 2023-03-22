import React from 'react'
import CardItem from './CardItem'
import './Cards.css'


function Cards() {
  return (
    <div className="cards">
      <h2> Check out the following Articles! </h2>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={require('../images/img-9.jpg')}
              text='Dive into the world of Agent Recruiting in retrospect Artificial intelligence'
              label="Recruitment"
              path="/services"
            />
            <CardItem
              src={require('../images/img-2.jpg')}
              text= 'Enhance your resume to progress proficiently in your career'
              label="Career"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            
            <CardItem
              src={require('../images/img-3.jpg')}
              text= 'Explore the hidden waterfall deep inside the Amazon Jungle'
              label="Holiday"
              path="/services"
            />
            <CardItem
              src={require('../images/img-4.jpg')}
              text= 'Hire contractors or temps to strengthen your workforce.'
              label="Network"
              path="/services"
              
            />
            <CardItem
              src={require('../images/img-7.jpg')}
              text= 'Benefits of contracted work in the 2023 economy'
              label="Contract"
              path="/services"
              Link to={{ pathname: "https://www.hubert.ai/insights/the-ultimate-guide-to-ai-recruiting" }} target="_blank"
              
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards
