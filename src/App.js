import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Readme from "./components/Readme.js";
import Home from './pages/Home';
import MenuBar from './pages/Menu';
import MyTabs from './pages/MyTables';
import PhotoDetailView from './pages/DetailView/PhotoDetailView';
import DigestDetailView from './pages/DetailView/DigestDetailView';
import BriefDetailView from './pages/DetailView/BriefDetailView';
import Demo from "./components/Demo.js";
import KeepAlive, { AliveScope }  from "react-activation";

function App() {
  return (
    <AliveScope>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/menu">
            <KeepAlive>
              <MenuBar />
            </KeepAlive>
          </Route>
          <Route path="/PhotoDetail">
            <PhotoDetailView />
          </Route>
          <Route path="/DigestDetail">
            <DigestDetailView />
          </Route>
          <Route path="/BriefDetail">
            <BriefDetailView />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AliveScope>
  );
}

export default App;
