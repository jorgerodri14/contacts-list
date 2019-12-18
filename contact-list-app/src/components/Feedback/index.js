import React from 'react'

export default function Feedback({error}){
    return  <div className="feedback-section"> 
                <p className = "feedback__text">{error}</p>
            </div>
}