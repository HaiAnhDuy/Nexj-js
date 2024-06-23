
// import './App.css';
import InputTodo from './todo/todo.component';


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
  return (
    <>
      <div>
        Hi !
      </div>
      <InputTodo
        name={name}
        age={age}
        obj={obj}
      />
    </>
  )
}

export default App
