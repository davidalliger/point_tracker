import { useState } from "react";

const CreateTransaction = () => {
    const [payer, setPayer] = useState('');
    const [points, setPoints] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Add Transaction</h1>
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
                    Date:
                </label>
                <input
                    type='date'
                    onChange={e => setDate(e.target.value)}
                    value={date}
                />
                <label>
                    Time:
                </label>
                <input
                    type='time'
                    onChange={e => setTime(e.target.value)}
                    value={time}
                />
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}
