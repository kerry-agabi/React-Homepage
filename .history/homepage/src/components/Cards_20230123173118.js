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
              label="Adventure"
              path="/services"
            />
            <CardItem
              src={require('../images/img-2.jpg')}
              text= 'Enhance your resume to progress proficiently in your career'
              label="Luxury"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            
            <CardItem
              src={require('../images/img-3.jpg')}
              text= 'Explore the hidden waterfall deep inside the Amazon Jungle'
              label="Adventure"
              path="/services"
            />
            <CardItem
              src={require('../images/img-4.jpg')}
              text= 'Explore the hidden waterfall deep inside the Amazon Jungle'
              label="Adventure"
              path="/services"
              
            />
            <CardItem
              src={require('../images/img-7.jpg')}
              text= 'Explore the hidden waterfall deep inside the Amazon Jungle'
              label="Adventure"
              path="/services"
              
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards