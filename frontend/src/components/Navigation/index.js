import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <NavLink to='/'>
                Home
            </NavLink>
            <NavLink to='/transactions'>
                Transactions
            </NavLink>
            <NavLink to='/balances'>
                Balances
            </NavLink>
        </div>
    )
}

export default Navigation;
