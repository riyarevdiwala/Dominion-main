import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function StartedButton ({ boardId }) {
  return (
    <Link to={'/auth/login'} className='get-started-btn'>
        Get Started
        <HiArrowNarrowRight className='arrow' /> 
    </Link>
  )
}
