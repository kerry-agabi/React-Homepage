import React from 'react'
import'./Button.css'
import {Link} from 'react-router-dom'

const STYLES = ['btn--primary', 'btn--outline']
const SIZES = ['btn--medium', 'btn--large']
export const Firstbutton = ({
  children,
  type,
  onClick,
  FirstbuttonStyle,
  FirstbuttonSize
}) => {
  const FirstcheckButtonStyle = STYLES.includes(FirstbuttonStyle)
    ? FirstbuttonStyle
    : STYLES[0]


    const FirstcheckButtonSize = SIZES.includes(FirstbuttonSize) ? FirstbuttonSize : SIZES[0]

    return (

        <Link to='/signup' className='btn-mobile'>
            <Firstbutton className={`btn ${FirstcheckButtonStyle} ${FirstcheckButtonSize}`} onClick={onclick} type={type}>
            {children}
            </Firstbutton>


        </Link>
    )
}
