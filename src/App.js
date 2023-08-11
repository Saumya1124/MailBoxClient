import { Fragment } from 'react';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/Login/Login';
import Mail from './components/Mail/Mail';
import PostMail from './components/Mail/PostMail';
import InboxMail from './components/Mail/InboxMail';
import { useSelector } from 'react-redux';
import OpenMail from './components/Mail/OpenMail';

function App() {

      const auth = useSelector(state => state.auth)
      console.log(auth.isLoggin)
      const isLog = localStorage.getItem('isLoggedIn')
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

            {!auth.isLoggin && 
                  <Route path='/login'>
                  <Login />
             </Route>
            }
            
            {isLog  &&
                  <Route path='/mail'>
                        <Mail />
                  </Route>
            }            

            <Route path='/postMail'>
                  <PostMail />
            </Route>

            <Route path='/inbox'>
                  <InboxMail />
            </Route>

            <Route path='/openMail'>
                  <OpenMail />
            </Route>

      </Switch>
        
    </Fragment>
  );
}

export default App;
