import './todo.css'
interface Iprops {
    name: string,
    age: number,
    obj: {
        name: string,
        old: number,
        address: string
    }
}
const InputTodo = (props: Iprops) => {
    console.log('check props', props)
    let { name, age } = props
    return (
        <>
            <div>
                <label>Add new todo</label>
                <div className="flex-block">
                    <input></input>
                    <button>Save</button>
                </div>
                <div>
                    {name} - {age}
                </div>
            </div>

        </>
    )
}

export default InputTodo