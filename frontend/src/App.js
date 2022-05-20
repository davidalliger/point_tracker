import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import ReadTransactions from './components/Transactions/ReadTransactions';


function App() {
  return (
    <div id="app">
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
        <Route path='/balances/new'>
          <CreateBalance />
        </Route>
        <Route path='/balances/new'>
          <UpdatedBalances />
        </Route>
        <Route path='/not-found'>
          <PageNotFound />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
