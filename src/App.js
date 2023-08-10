import { Fragment } from 'react';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/Login/Login';
import Mail from './components/Mail/Mail';

function App() {
  return (
    <Fragment>

      <Switch>
            <Route path='/' exact>
                <SignUp />
            </Route>

            <Route path='/signUp'>
                <SignUp />
            </Route>

            <Route path='/login'>
                 <Login />
            </Route>

            <Route path='/mail'>
                  <Mail />
            </Route>
      </Switch>
        
    </Fragment>
  );
}

export default App;
