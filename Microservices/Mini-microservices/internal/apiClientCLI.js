
const createPrompt = require("prompt-sync")
const prompt = createPrompt({sigint: true})

let store = []
let id = null

const getPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    const data = await response.json()

    if (data.ok) {
        store = []
        const { content } = data

        console.log(`0: New Post`)

        for (let i = 0; i < content.length; i++) {
            store.push(content[i])
            console.log(`${i+1}: ${content[i].title}`)
        }

        console.log(`${store.length > 0 ? store.length+1 : 1}: Exit`)
    }
}

const getComments = async (_id) => {
    id = _id
    const response = await fetch(`http://localhost:3002/posts/${_id}/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    const data = await response.json()

    if (data.ok) {
        store = []

        const { content } = data

        console.log(`0: New Comment`)

        for (let i = 0; i < content.length; i++) {
            store.push(content[i])
            console.log(`${i+1}: ${content[i].content}`)
        }

        console.log(`${store.length > 0 ? store.length+1 : 1}: Exit`)
    } else {
        console.log(data)
    }
}

const savePost = async (title) => {

    const response = await fetch(`http://localhost:3001/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({title})
    });

    const data = await response.json()

    console.log(data)
}

const saveComment = async (id, content) => {

    const response = await fetch(`http://localhost:3002/posts/${id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({content})
    });

    const data = await response.json()

    console.log(data)
}

const showNewPostMenu = async () => {
    console.clear()
    const title = prompt('title: ')

    if (title === '') {
        return console.log('title cannot be empty')
    }

    await savePost(title)
}

const showNewCommentMenu = async () => {
    if (!id) {
        return
    }

    const content = prompt("content: ")
    await saveComment(id, content)
}

let appIsRunning = true

async function main() {
    while (appIsRunning) {
        await getPosts()

        const post = prompt('post: ')
        const idx = +post

        if (isNaN(idx)) {
            console.log('Invalid input')
            continue
        }

        if (idx === 0) {
            await showNewPostMenu()
        } else if (idx === (store.length > 0 ? store.length+1 : 1)) {
            break
        } else if (idx < store.length+1) {
            await getComments(idx)

            const comment = prompt('comment: ')
            const commentIndex = +comment

            if (isNaN(commentIndex)) {
                console.log('Invalid input')
                continue
            }

            if (commentIndex === 0) {
                await showNewCommentMenu()
            }
        }

    }
}



try {
    main().then(() => console.log("exit: 0"))
} catch (err) {
    throw err
}