var socket = new WebSocket("ws://localhost:8888/ws")

let connect = () => {
    console.log("Attempting Connection...")

    socket.onopen = () => {
        console.log("Successfully Connected")
    }

    socket.onmessage = msg => {
        console.log("收到消息：", msg)
    }

    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event)
    }

    socket.onerror = error => {
        console.log("Socket Error: ", error)
    }
}

let sendMsg = msg => {
    console.log("sending msg: ", msg)
    socket.send(msg)
}

export { connect, sendMsg }