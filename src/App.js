import { Fragment } from 'react';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/Login/Login';
import Mail from './components/Mail/Mail';
import PostMail from './components/Mail/PostMail';

function App() {
  return (
    <Fragment>

      <Switch>
            <Route path='/' exact>
                <SignUp />
                {/* <PostMail /> */}
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

            <Route path='/postMail'>
                  <PostMail />
            </Route>
      </Switch>
        
    </Fragment>
  );
}

export default App;
