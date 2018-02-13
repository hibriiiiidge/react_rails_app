import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import List from './List';
import New from './New';
import Show from './Show';

// ReactRouter を使ったコンポーネントの定義
const App = () => (
  <Router>
    <div>
      <AppHeader />
      <Switch>
         <Route exact path='/new' component={ New } />
         <Route exact path='/message/:id' component={ Show }/>
         <Route exact path='/' component={ List }/>
       </Switch>
      <AppFooter />
    </div>
  </Router>
)

//固定ヘッダー
const AppHeader = () => (
  <div>
    <h3>Message App</h3>
    <p>
      <Link to="/">[Home]</Link>
      <Link to="/new">[New Message]</Link>
    </p>
  </div>
)

//固定フッター
const AppFooter = () => (
  <div>
    <p>
      Message App Footer
    </p>
  </div>
)

export default App
