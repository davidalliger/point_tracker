import { NavLink } from 'react-router-dom';
import './Navigation.css'

const Navigation = () => {
    return (
        <div id='navigation'>
            <div id='nav-buttons'>
                <NavLink activeClassName='active-link' exact={true} to='/'>
                    <button className='nav-button'>
                        Home
                    </button>
                </NavLink>
                <NavLink activeClassName='active-link' to='/transactions'>
                    <button className='nav-button'>
                        Transactions
                    </button>
                </NavLink>
                <NavLink activeClassName='active-link' to='/balances'>
                    <button className='nav-button'>
                        Balances
                    </button>
                </NavLink>
            </div>
            <div id='title'>
                <h1>Point Tracker</h1>
            </div>
        </div>
    )
}

export default Navigation;
