import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import TodosList from './TodosList';
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";
import About from "../../pages/About";
import NoMatch from "../../pages/NoMatch";



const TodoContainer = () => {
    const [todos, setTodos] = useState(getInitialTodos());

    function getInitialTodos() {
        const temp = localStorage.getItem("todos") 
        const savedTodos = JSON.parse(temp)
        return savedTodos || []
    }

    useEffect(() => {
        const temp = JSON.stringify(todos)
        localStorage.setItem("todos", temp)
    }, [todos])

    const handleChange = (id) => {
          setTodos((prevState) => 
               prevState.map(todo => {
                  if(todo.id === id) {
                     return {
                         ...todo,
                         completed: !todo.completed
                     }
                  }
                  return todo;
              })
         )
        }

       const delTodo = id => {
           setTodos([               
                   ...todos.filter(todo => {
                       return todo.id !== id;
                   }),               
            ])
        }

      const  addTodoItem = title => {
            const newTodo = {
                id: uuidv4(),
                title: title,
                completed: false
            };
            setTodos([...todos, newTodo])
        };

       const setUpdate = (updatedTitle, id) => {
           setTodos(todos.map(todo => {
               if(todo.id === id) {
                   todo.title = updatedTitle
               }
               return todo
           })  
           )      
        }

        return (
            <Switch>
            <Route exact path="/">
            <div className="container">
             <div className="inner">
                <Header />
                <InputTodo addTodoProps={addTodoItem} />
                <TodosList 
                todos={todos} 
                handleChangeProps={handleChange} 
                deleteTodoProps={delTodo}
                setUpdate={setUpdate}
                />
             </div>
            </div>
            </Route>
            <Route>
                <About path="/"/>
            </Route>
            <Route path="*">
                <NoMatch />
            </Route>
            </Switch>
        )
    }


export default TodoContainer;