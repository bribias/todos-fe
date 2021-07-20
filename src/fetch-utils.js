import request from 'superagent';

const URL = 'https://vast-badlands-41470.herokuapp.com';

export async function signup(email, password) {
    const data = await request
        .post(`${URL}/auth/signup`)
        .send({
            email: email,
            password: password
        })
    return data.body.token;
}

export async function login(email, password) {
    const data = await request
        .post(`${URL}/auth/signin`)
        .send({
            email: email,
            password: password
        })
    return data.body.token;
}

export async function getTodos(token) {
    const data = await request
        .get(`${URL}/api/todos`)
        .set('Authorization', token)
    return data.body;
}

export async function addTodos(name, token) {
    const data = await request
        .post(`${URL}/api/todos`)
        .send({
            todo: name,
            completed: false
        })
    .set('Authorization', token)
    return data.body;
}

export async function completeTodo(id, token) {
    const data = await request
        .put(`${URL}/api/todos/${id}`)
        .set('Authorization', token)
    return data.body;
}