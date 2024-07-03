
// import './App.css';
import { useState } from 'react';
import InputTodo from './todo/todo.component';
import { useNavigate } from 'react-router-dom';


function App() {
  let name: string = 'Nguyen Duy Hai Anh';
  let age: number = 19;

  let obj: {
    name: string,
    old: number,
    address: string
  } = {
    name: 'Hai Anh',
    old: 19,
    address: 'Ha Noi'
  }
  const [app_todo, SetApp_Todo] = useState(['1', '2', '3']);

  const [check_todo_edit, SetEdit_Todo] = useState(-1);

  const [edit_onchange, SetEdit_Onchange] = useState('')

  const Remove_ToDoList = (data: number | string): void => {
    let arr: string[] = [];
    arr = app_todo.filter(items => items !== data)
    SetApp_Todo(arr)
  }

  const Edit_ToDoList = (index: number): void => {
    SetEdit_Todo(index);
    SetEdit_Onchange(app_todo[index])

  }
  const Save_ToDoList = (index: number): void => {
    let arr: string[] = [];
    arr = app_todo
    if (edit_onchange === null || edit_onchange === '') {
      alert('xin vui long dien vao input');
      SetEdit_Todo(-1);

      return
    }
    arr[index] = edit_onchange;
    SetApp_Todo(arr)
    SetEdit_Todo(-1);



  }

  const OnchangeEdit = (event: any): void => {
    let input: string = event.target.value;

    SetEdit_Onchange(input)

  }
  const navigate = useNavigate();

  const ClickToChange = () => {

    return navigate('/hello')
  }
  return (
    <>
      <div>
        Hi !;
      </div>
      <InputTodo
        name={name}
        age={age}
        obj={obj}
        // Logicstic={Logicstic}
        app_todo={app_todo}
        SetApp_Todo={SetApp_Todo}
      />
      <div>
        <ul>
          {app_todo && app_todo.length > 0
            ?
            app_todo.map((items: number | string, index: number) => {
              return (
                <div key={index} style={{ display: 'flex', gap: '10px' }}>
                  {
                    check_todo_edit === index

                      ?
                      <>
                        <input value={edit_onchange} style={{ margin: '5px' }} onChange={(event) => OnchangeEdit(event)}></input>
                        <div>
                          <button onClick={() => Remove_ToDoList(items)}>
                            Delete
                          </button>
                        </div>
                        <div>
                          <button onClick={() => Save_ToDoList(index)}>
                            Save
                          </button>
                        </div>
                      </>
                      :
                      <>
                        <li style={{ cursor: 'pointer', margin: '5px', color: 'red' }}>{items}</li>
                        <div>
                          <button onClick={() => Remove_ToDoList(items)}>
                            Delete
                          </button>
                        </div>
                        <div>
                          <button onClick={() => Edit_ToDoList(index)}>
                            Edit
                          </button>
                        </div>
                      </>

                  }


                </div>
              )
            })
            :
            ''
          }

        </ul>
      </div>
      <div>
        <h3>
          --- CLICK TO CHANGE ---
        </h3>
        <button onClick={() => ClickToChange()}>
          HERE
        </button>
      </div>
    </>
  )
}

export default App
