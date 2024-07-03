import { useState } from 'react';

import './todo.css'
interface Iprops {
    name: string,
    age: number,
    obj: {
        name: string,
        old: number,
        address: string
    }
    app_todo: string[]
    SetApp_Todo: (v: string[]) => void
}

const InputTodo = (props: Iprops) => {
    const [new_todo, SetNewCount] = useState('');


    let click = () => {
        let { app_todo, SetApp_Todo } = props;
        // SetToDoList([...todolist, new_todo])
        if (new_todo === null || new_todo === '') {
            alert('dien gia tri vao')
            return
        }
        SetApp_Todo([...app_todo, new_todo])
        SetNewCount('')

    }
    let onchange = (event: any) => {

        let input = event.target.value;

        SetNewCount(input);
    }

    return (
        <>
            <div>


                <label>Add new todo</label>
                <div className="flex-block">
                    <input
                        value={new_todo}
                        onChange={(event) => onchange(event)}
                    ></input>
                    <button onClick={() => click()}>Save</button>
                </div>
                <br />
                {/* <div>
                    <ul>
                        {todolist && todolist.length > 0
                            ?
                            todolist.map((items, index) => {
                                return (
                                    <div key={index}>
                                        <li>{items}</li>

                                    </div>
                                )
                            })
                            :
                            ''
                        }

                    </ul>
                </div> */}

            </div>

        </>
    )
}

export default InputTodo