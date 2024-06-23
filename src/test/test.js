let SayBye = (user) => {
    if (user) {
        alert(`Bye Bye , ${user} !`)
        return

    }
    else {
        alert(`Bye Bye !`)

    }

}

let SayHi = (user) => {
    if (user) {
        alert(`Hello , ${user} !`)
        return;

    }
    else {
        alert(`Hello !`)

    }

}


export {
    SayBye, SayHi
}