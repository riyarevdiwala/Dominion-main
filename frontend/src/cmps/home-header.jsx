import { Link } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'
import Logo from './logo'


export function HomeHeader ({ boards }) {
    return (
        <header className="home-header">
               <Logo />
                <div className='header-btns'>
                    {/* <Link to={'/auth/login'}><button className="btn-login">Log in</button></Link> */}
                    <Link to={'/auth/login'}><button className='btn-start'>Get started <span className="arrow"><HiOutlineArrowRight /></span></button></Link>
                </div>
        </header>
    )
}