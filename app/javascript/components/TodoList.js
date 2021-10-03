import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
// import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
// import { AiFillEdit } from 'react-icons/ai'


const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const RemoveAllButton = styled.button`
  width: 16%;
  height: 40px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`

const TodoName = styled.span`
  font-size: 27px;
  ${({ is_completed }) => is_completed && `
    opacity: 0.4;
  `}
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UnCheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

function TodoList() {
  const [todos, setTodos] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios.get('/api/v1/todos.json')
      .then(resp => {
        setTodos(resp.data);
      })
      .catch(e => {
        console.error(e);
      })
  }, [])

  const removeAllTodos = () => {
    const confirmation = window.confirm("are you sure ?")
    if (confirmation) {
      axios.delete('/api/v1/destroy_all')
        .then(res => {
          setTodos([])
        })
        .catch((e) => console.error(e))
    }
  }

  const updateIsCompleted = (index, val) => {
    var data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed
    }
    axios.patch(`/api/v1/todos/${val.id}`, data)
      .then(res => {
        const newTodos = [...todos]
        newTodos[index].is_completed = res.data.is_completed
        setTodos(newTodos)
      })
      .catch((e) => console.error(e))
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <>
      <h1>Todo List</h1>
      <SearchAndButtton>
        <SearchForm
          type="text"
          placeholder="Search Todos ..."
          // onChange={(event) => setSearchName(event.target.value)}
          onChange={handleSearchName}
          value={searchName}
        />
        <RemoveAllButton onClick={removeAllTodos}>
          Remove all
        </RemoveAllButton>
      </SearchAndButtton>

      <div>
        {todos.filter((val) => {
          if (searchName === "") {
            return val
          } else if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
            return val
          }
        }).map((val, key) => {
          return (
            <Row key={key}>
              {val.is_completed ? (
                <CheckedBox>
                  <input type="button" value="unComplete" onClick={() => updateIsCompleted(key, val)} />
                </CheckedBox>
              ) : (
                <UnCheckedBox>
                    <input type="button" value="Complete" onClick={() => updateIsCompleted(key, val)} />
                </UnCheckedBox>
              )}
              <TodoName is_completed={val.is_completed}>
                {val.name}
              </TodoName>
              <Link to={`/todos/${val.id}/edit`}>
                  <EditButton>
                    Edit
                  </EditButton>
              </Link>
            </Row>
          )
        })}
      </div>
    </>
  )
}

export default TodoList
