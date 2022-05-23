import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <NavLink to='/'>
                <button>
                    Home
                </button>
            </NavLink>
            <NavLink to='/transactions'>
                <button>
                    Transactions
                </button>
            </NavLink>
            <NavLink to='/balances'>
                <button>
                    Balances
                </button>
            </NavLink>
        </div>
    )
}

export default Navigation;
