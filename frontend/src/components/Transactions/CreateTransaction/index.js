import { useState } from "react";
import { createTransaction } from "../../../store/transactions";
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';

const CreateTransaction = () => {
    const [payer, setPayer] = useState('');
    const [points, setPoints] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const transaction = {
            payer,
            points,
            timestamp
        }
        const data = await dispatch(createTransaction(transaction));
        if (data.errors) {
            setErrors(data.errors);
        } else {
            return <Redirect to='/transactions' />
        }
    }

    return (
        <div>
            <h1>Add Transaction</h1>
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
                    Payer:
                </label>
                <input
                    type='text'
                    onChange={e => setPayer(e.target.value)}
                    value={payer}
                />
                <label>
                    Points:
                </label>
                <input
                    type='number'
                    onChange={e => setPoints(e.target.value)}
                    value={points}
                />
                <label>
                    Date and Time:
                </label>
                <input
                    type='datetime-local'
                    onChange={e => setTimestamp(e.target.value)}
                    value={timestamp}
                />
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateTransaction;
