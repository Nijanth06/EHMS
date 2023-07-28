import React from 'react'
import "../styels/homefooter.css"
const HomeFooter = () => {
  return (
    <div className='footer'>
      <div className='footer-container'>
        <div className='footer-content'>
          <div className='footer-content-inner'>
            <p>&copy; 2023 EHMS</p>
            <div className='footer-content-pp'>
              <p>Privacy</p>
              <p>Policy</p>
            </div>
          </div>
          <p>Solution By <span>Team H</span></p>
        </div>
      </div>
    </div>
  )
}

export default HomeFooter