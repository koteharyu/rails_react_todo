import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'
import TodoList from './TodoList'
import './App.css';


const SNabvr = styled.nav`
  background: #dbffed;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SLogo = styled.div`
  font-weight: bold;
  font-size: bold;
  letter-spacing: 3px;
`;

const SNavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`;

const SNavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: .7;
  &:hover{
    opacity: 1;
  }
`;

const SWrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`;


function App() {
  return (
    <>
      <SNabvr>
        <SLogo>
          TODO
        </SLogo>
        <SNavItems>
          <SNavItem>
            <Link to="/todos">
              Todos
            </Link>
          </SNavItem>
          <SNavItem>
            <Link to="/todos/new">
              Add New Todo
            </Link>
          </SNavItem>
        </SNavItems>
      </SNabvr>
      <SWrapper>
        <Switch>
          <Route exact path="/todos">
            <TodoList />
          </Route>
          <Route exact path="/todos/new">
            <AddTodo />
          </Route>
          <Route path="/todos/:id/edit">
            <EditTodo />
          </Route>
        </Switch>
      </SWrapper>
    </>
  )
}

export default App
