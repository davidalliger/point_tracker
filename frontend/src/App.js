import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import ReadTransactions from './components/Transactions/ReadTransactions';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBalances } from './store/balances';
import { getTransactions } from './store/transactions';

function App() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(getTransactions());
      await dispatch(getBalances());
      setLoaded(true);
    })();
  }, [dispatch]);

  return (
    <div id="app">
      {ready && (
        <>
          <Navigation />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/transactions'>
              <ReadTransactions />
            </Route>
            <Route path='/transactions/new'>
              <CreateTransaction />
            </Route>
            <Route path='/balances'>
              <ReadBalances />
            </Route>
            {/* <Route path='/balances/new'>
              <CreateBalance />
            </Route> */}
            <Route path='/spend'>
              <Spend />
            </Route>
            <Route path='/balances/updated'>
              <UpdatedBalances />
            </Route>
            <Route path='/not-found'>
              <PageNotFound />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
