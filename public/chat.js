const socket = io()


//DOM Elements
let message = document.getElementById('message')
let username = document.getElementById('username')
let btn_send = document.getElementById('send')
let output = document.getElementById('output')
let action = document.getElementById('actions')

btn_send.addEventListener('click', () => {
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    })
    console.log(username.value, message.value)
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value)
})

socket.on('chat:message', (data) => { //socket.on está escuchando 
    action.innerHTML = ''
    output.innerHTML += `
    <p>
        <strong>${data.username}</strong>: ${data.message}
    </p>
    `
})

socket.on('chat:typing', (data) => {
    action.innerHTML = `<p><em>${data}</em> is typing...</p>`
})