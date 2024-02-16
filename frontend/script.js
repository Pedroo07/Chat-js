const login = document.querySelector('.login')
const loginForm = document.querySelector('.login_form')
const loginInput = document.querySelector('.login_input')

const chat = document.querySelector('.chat')
const chatForm = document.querySelector('.chat_form')
const chatInput = document.querySelector('.chat_input')
const chatMsg = document.querySelector('.chat_messages')

const colors = [
    "aqua",
    "blueviolet",
    "darkgoldenrod",
    "chocolate",
    "pink",
    "mediumspringgreen",
    "maroon"
]
const user = {
    id: "",
    name: "",
    color: ""
}



let websocket

const createdMessageSelf = (content) => {
    const div = document.createElement('div')
    div.classList.add('send_message')
    div.innerHTML = content
    return div
}
const createdMessageGet = (content, sender, senderColor) => {
    const div = document.createElement('div')
    const span =  document.createElement('span')
    span.style.color = senderColor
    span.classList.add('sender')
    div.classList.add('get_message')

    div.appendChild(span)

    span.innerHTML  = sender
    div.innerHTML += content

    return div
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}
const processMessage = ({ data }) => {
    const { userId, userColor, userName, content } = (JSON.parse(data))

    const VerifiedMessage = userId == user.id ? createdMessageSelf(content) : createdMessageGet(content, userName,userColor)

    chatMsg.appendChild(VerifiedMessage)
}

const handleSubmit = (event) => {
    event.preventDefault()

    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = 'none'
    chat.style.display = "flex"

    websocket = new WebSocket('ws://localhost:8080')
    websocket.onmessage = processMessage

}
const handleSendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message))
    chatInput.value = ''
}

loginForm.addEventListener('submit', handleSubmit)
chatForm.addEventListener('submit', handleSendMessage)