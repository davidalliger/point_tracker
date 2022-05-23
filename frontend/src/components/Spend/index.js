import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBalances } from "../../store/balances";
import { Redirect } from 'react-router-dom';

const SpendPoints = () => {
    const totalPoints = useSelector(state => state.balances.totalPoints);
    const [points, setPoints] = useState(null);
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const updates = await dispatch(updateBalances({points}));
        if (updates.errors) {
            setErrors(updates.errors);
        } else {
            return <Redirect to='/balances/updated' updates={updates} />
        }
    }

    useEffect(() => {
        if (errors?.length) {
            setShowErrors(true);
        }
    }, [errors]);

    return (
        <div>
            <h1>Spend Points</h1>
            <p>Total Points: {totalPoints}</p>
            {showErrors && (
                <div>
                    <ul>
                        {errors.map((error, index) => {
                            <li key={index}>
                                {error}
                            </li>
                        })}
                    </ul>
                </div>
            )}
            <form
                onSubmit={handleSubmit}
            >
                <label>
                    Amount:
                </label>
                <input
                    type='number'
                    onChange={e => setPoints(e.target.value)}
                    value={points}
                />
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SpendPoints;
