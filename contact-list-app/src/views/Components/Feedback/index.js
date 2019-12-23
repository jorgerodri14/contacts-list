import React from 'react'

export default function Feedback({message}){
    return  <div className="feedback-section"> 
                <p className = "feedback__text">{message}</p>
            </div>
}