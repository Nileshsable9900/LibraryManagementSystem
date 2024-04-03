import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard';
import Allbooks from './Pages/Allbooks';
import { AuthContext } from './Context/AuthContext';

function App() {
  const { user, setUser } = useContext(AuthContext);

  // Function to handle sign-out
  const handleSignOut = () => {
    // Clear user data from context
    setUser(null);
    // Redirect to home page after sign-out
    window.location.href = '/';
  };

  return (
    <Router>
      <Header handleSignOut={handleSignOut} />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            {/* Pass setUser function to Signin component */}
            <Signin setUser={setUser} />
          </Route>
          <PrivateRoute
            exact
            path="/dashboard@member"
            isAuthenticated={user !== null && !user.isAdmin} // Check if user is not an admin
            component={MemberDashboard}
          />
          <PrivateRoute
            exact
            path="/dashboard@admin"
            isAuthenticated={user !== null && user.isAdmin}
            component={AdminDashboard}
          />
          <Route exact path="/books">
            <Allbooks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// PrivateRoute component to protect routes based on authentication
function PrivateRoute({ isAuthenticated, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default App;
