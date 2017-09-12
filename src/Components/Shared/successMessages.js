
const _MSGS = [
    "Roger that!",
    "Okie dokie!",
    "All done!",
    "Success! Hurray!",
    "Successfully implemented.",
    "Congrats. It's done.",
    "It's done.",
    "Okay, it's done.",
]

const getSuccessMsg = () => {
    const rand = Math.floor(Math.random() * (_MSGS.length - 1)) + 1
    return _MSGS[rand]
}

export default getSuccessMsg
