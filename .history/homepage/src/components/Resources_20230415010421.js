import React from 'react'
import ResourceItem from './ResourceItem'
import './Resource.css'

function Resources() {
  return (

    
    <div className="card__container">
      <div className="card__wrapper">
        <ul className="card__items">
          <ResourceItem
            src={require('../images/img-9.jpg')}
            text='Dive into the world of Agent Recruiting in retrospect Artificial intelligence'
            label="Recruitment"
            path="https://www.hubert.ai/insights/the-ultimate-guide-to-ai-recruiting"
          />
          <ResourceItem
            src={require('../images/img-2.jpg')}
            text= 'Enhance your resume to progress proficiently in your career'
            label="Career"
            path="https://www.businessnewsdaily.com/3207-resume-writing-tips.html"
          />
        
        </ul>
        <ul className="card__items"> 
          
          <ResourceItem
            src={require('../images/img-3.jpg')}
            text= 'Explore the hidden waterfall deep inside the Amazon Jungle'
            label="Holiday"
            path="https://www.loveholidays.ie/"
          />
          <ResourceItem
            src={require('../images/img-4.jpg')}
            text= 'Hire contractors or temps to strengthen your workforce.'
            label="Network"
            path="https://www.recruiters.ie/becoming-a-contractor-or-a-temp/"
            
          />
          <ResourceItem
            src={require('../images/img-7.jpg')}
            text= 'What to Pack for a Night of Stargazing'
            label="Traveler"
            path="https://www.cntraveler.com/story/stargazing-gear-essentials"
            
          />
          
        </ul>
        <ul className="card__items">
        <ResourceItem
            src={require('../images/img-11.jpg')}
            text= 'Compare salaries for specific roles across different industries'
            label="Salary"
            path="https://www.morganmckinley.com/ie/salary-guide"
            
          />
          <ResourceItem
            src={require('../images/img-10.jpg')}
            text= 'Benefits of contracted work in the 2023 economy'
            label="Contract"
            path="https://energyresourcing.com/blog/7-advantages-of-contract-work#:~:text=Flexibility,employees%20aren't%20able%20to."
            
          />
          <ResourceItem
            src={require('../images/img-6.jpg')}
            text= 'Common Jobs for Expats Living in Asia'
            label="Working-Abroad"
            path="https://www.girlchasingsunshine.com/2018/10/5-common-jobs-for-expats-living-in-asia.html"
            
          />
        </ul>  
      </div>
    </div>
 
  )
}

export default Resources;
