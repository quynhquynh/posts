import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'
import Posts from './containers/posts'
import Post from './containers/post2'
import PostNew from './containers/new-post'

ReactDOM.render(
    <Provider store={createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path='/' component={Posts} />
                    <Route exact path='/posts/new' component={PostNew} />
                    <Route exact path='/posts/:id' component={Post} />
                    <Redirect exact from='/posts' to='/' />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'))


    registerServiceWorker();

