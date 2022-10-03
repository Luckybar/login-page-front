const domain = "http://localhost:9000/";

function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function login(acc, pwd) {
    return fetch(domain + 'user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: acc,
            password: pwd
        })
    }).then(r => {
        return r.text();
    })
}

function checkAccountExist(username) {
    return fetch(domain + 'user/checkuser?' + new URLSearchParams({
        Username: username
    }), {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
    }).then(r => {
        return r.text();
    });
}

function createAccount(username, password, age, mail) {
    console.log(username, password, age, mail);
    return fetch(domain + 'user/register', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            age: age,
            email: mail
        }),
    }).then(r => {
        return r.text();
    });
}

function getUserTask(id) {
    return fetch(domain + 'task/gettask?' + new URLSearchParams({
        userid: id
    }), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(r => {
       return r.json();
    });
}

function createTaskOne(userId, taskContent) {
    return fetch(domain + 'task/addtask', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            finish: false,
            taskDate: Date.now(),
            taskContent: taskContent
        }),
    }).then(r => {
        return r.text();
    });
}

function createTaskMany(taskContent) {
    return fetch(domain + 'task/addtaskmany', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: taskContent
        }),
    }).then(r => {
        return r.text();
    });
}

function updateTask(taskContent) {
    return fetch(domain + 'task/updatetask', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: taskContent
        }),
    }).then(r => {
        return r.text();
    });
}

function deleteTask(deleteList) {
    return fetch(domain + 'task/deletetask', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            task: deleteList
        })
    }).then(r => {
        return r.text();
    });
}
