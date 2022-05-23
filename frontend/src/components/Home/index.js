import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
    const totalPoints = useSelector(state => state.balances.totalPoints);

    return (
        <div id='home'>
            <h1>Point Tracker</h1>
            <p>Total Points: {totalPoints}</p>
            <div id='button-div'>
                <Link to='/spend'>
                    <button>
                        Spend Points
                    </button>
                </Link>
                <Link to='/transactions'>
                    <button>
                        Transactions
                    </button>
                </Link>
                <Link to='/balances'>
                    <button>
                        View Balances
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home;
