import React from 'react'
import StartedButton from './custom/getstarted-btn'

export default function HomeScreenShot ({ boardId }) {
      return (
            <section className='screenshot-section'>
                  <div className='header layout'>
                        <div className='title'>
                              <span >The Work OS that lets us
                                    shape workflows, <b>our way</b>
                              </span>
                        </div>
                        <p className='info'>Boost the team’s alignment, efficiency, and productivity by customizing any workflow to fit our needs.</p>
                        {/* <StartedButton boardId={boardId} /> */}
                  </div>
                  <div className='screenshot-grid'>
                  </div>
            </section>
      )
}
