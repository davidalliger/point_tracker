import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import ReadTransactions from './components/Transactions/ReadTransactions';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBalances, getTotal } from './store/balances';
import { getTransactions } from './store/transactions';
import Home from './components/Home';
import CreateTransaction from './components/Transactions/CreateTransaction';
import ReadBalances from './components/Balances/ReadBalances';
import SpendPoints from './components/Spend';
import UpdatedBalances from './components/Balances/UpdatedBalances';
import PageNotFound from './components/NotFound';

function App() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(getTransactions());
      await dispatch(getBalances());
      await dispatch(getTotal())
      setLoaded(true);
    })();
  }, [dispatch]);

  return (
    <div id="app">
      {loaded && (
        <>
          <Navigation />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/transactions/new'>
              <CreateTransaction />
            </Route>
            <Route path='/transactions'>
              <ReadTransactions />
            </Route>
            <Route path='/balances/updated'>
              <UpdatedBalances />
            </Route>
            <Route path='/balances'>
              <ReadBalances />
            </Route>
            <Route path='/spend'>
              <SpendPoints />
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
