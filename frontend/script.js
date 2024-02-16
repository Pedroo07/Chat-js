const login = document.querySelector('.login')
const loginForm = document.querySelector('.login_form')
const loginInput= document.querySelector('.login_input')
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
    color:  ""
}
const getRandomColor = () => {
    const randomIndex =Math.floor(Math.random() * colors.length
)
return colors[randomIndex]
}

const handleSubmit = (event) => {
event.preventDefault()
user.id = crypto.randomUUID()
user.name = loginInput.value
user.color = getRandomColor()
console.log(user)
}

loginForm.addEventListener('submit', handleSubmit)
