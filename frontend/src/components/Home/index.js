import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
    const totalPoints = useSelector(state => state.balances.totalPoints);

    return (
        <div id='home'>
            <h2>Home</h2>
            <div className='content'>
                <p><span className='bold'>Total Points:</span> {totalPoints}</p>
            </div>
            <div id='button-div'>
                <div>
                    <Link to='/spend'>
                        <button>
                            Spend Points
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to='/transactions'>
                        <button>
                            Transactions
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to='/balances'>
                        <button>
                            View Balances
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;
