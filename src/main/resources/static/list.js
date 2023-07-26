const mainTable = $(".main-table")
const newUserTableHTML = `
            <h1 id="headerAdminPanel">Admin panel</h1>
            <div id="userTableAndNewUserButtons" class="container-fluid">
                <a id="userTableButton" class="btn btn-secondary" href="#" role="button">User table</a>
                <a id="newUserButton" class="btn btn-outline-secondary" href="#" role="button">New user</a>
            </div>
            <div class="card">
                <div class="card-block">
                    <div class="container-fluid c">
                        <form>
                            <label for="name"><strong>Username</strong></label>
                            <input type="text" class="form-control" id="newUserName"
                                   placeholder="username123">
                            <br/>
                            <label for="surname"><strong>Surname</strong></label>
                            <input type="text" class="form-control" id="newUserSurname"
                                   placeholder="surname">
                            <br/>
                            <label for="password"><strong>Password</strong></label>
                            <input type="password" class="form-control" id="newUserPassword"
                                   placeholder="password">
                            <br/>
                            <div class="form-group">
                                <label for="choose-role"><strong>Role</strong></label>
                                <select multiple class="form-control" size="2" id="selectRole" name="roles1" onchange="chosenRole()" required>
                                    <option value="1">ADMIN</option>
                                    <option value="2">USER</option>
                                </select>
                            </div>
                            <br/>
                            <button id="addNewUserButton" type="submit" class="btn btn-success">Add new user</button>
                        </form>
                    </div>
                </div>
            </div>`
const mainTableHTML = `
            <h1 id="headerAdminPanel">Admin panel</h1>
            <div id="userTableAndNewUserButtons" class="container-fluid">
                <a id="userTableButton" class="btn btn-outline-secondary" href="#" role="button">User table</a>
                <a id="newUserButton" class="btn btn-secondary" href="#" role="button">New user</a>
            </div>
            <div class="card">
                <div class="card-block">
                    <table class="table table-striped">
                        <caption>
                            <h4>All users</h4>
                        </caption>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Role(s)</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody class="usersTableBody">

                        <!-- Модальное окно -->
                        <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Edit user</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container-fluid c">
                                            <label th:for="name"><strong>Username</strong>
                                                <input type="text"
                                                       class="form-control" id="nameInput" name="nameToEdit">
                                            </label>
                                            <br/>
                                            <label th:for="surname"><strong>Surname</strong>
                                                <input type="text"
                                                       class="form-control" id="surnameInput"
                                                       name="surnameToEdit">
                                            </label>
                                            <br/>
                                            <label th:for="password"><strong>Password</strong>
                                                <input type="password"
                                                       class="form-control" id="passwordInput"
                                                       name="passwordToEdit">
                                            </label>
                                            <br/>
                                            <div class="form-group">
                                                <label for="selectRole"><strong>Role</strong></label>
                                                <select multiple class="form-control" size="2"
                                                        id="selectRole" name="roles1" onchange="chosenRole()" required>
                                                    <option value="ADMIN">ADMIN</option>
                                                    <option value="USER">USER</option>
                                                </select>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal" value=>
                                        Close
                                        </button>
                                        <button id="confirmEdit" type="submit" class="btn btn-primary">
                                        Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </tbody>
                    </table>
                </div>
            </div>`
mainTable.append(mainTableHTML)
let currentUserId
const userRoleJSON = {
    id: 2,
    role: "ROLE_USER",
    authority: "ROLE_USER"
}

const adminRoleJSON = {
    id: 1,
    role: "ROLE_ADMIN",
    authority: "ROLE_ADMIN"
}
const requestUrl = 'http://localhost:8080/rest/api/users/admin'
const currentUserRequestUrl = 'http://localhost:8080/rest/api/users/user'
let output = '';

function rolePut(roles, tag = 'td') {
    let str = `<${tag} id="rolesTd">`
    let i = 0
    for (let role of roles) {
        str += `<a id="role${i++}">${role.role.replace('ROLE_', '')} </a>`
    }
    str += `</${tag}>`
    return str
}

function loadCurrentUser(url) {
    fetch(url)
        .then(res => res.json())
        .then(user => {
            $('.main-table').append(`<h1>User information-page</h1>
            <div class="card">
                <div class="card-block">
                    <table class="table table-striped">
                        <caption>
                            <h4>About User</h4>
                        </caption>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Role(s)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.surname}</td>
                            ${rolePut(user.roles)}
                        </tbody>
                    </table>
                </div>
            </div>`)
        })
}

// GET Запрос Юзеров + выведение их в таблице с кнопками
function loadUsersList(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            output = ``
            data.forEach(user => {
                output += `<tr id="trUser${user.id}"><td id="idTd">${user.id}</td>
                            <td id="nameTd">${user.name}</td>
                            <td id="surnameTd">${user.surname}</td>
                            ${rolePut(user.roles)}
                            <td><button id="editButton-${user.name}" type="button" class="btn btn-primary">
                                Edit
                            </button></td>
                            <td><button id="deleteButton-${user.name}" type="button" class="btn btn-danger">
                                Delete
                            </button></td>
                            </tr>`
            })
            $('.usersTableBody').append(output)
        })
}

function loadCurrentUserInfo(url) {
    fetch(url)
        .then(res => res.json())
        .then(user => {
            $('#currentUserName').text(user.name)
            $('#currentUserInfo').append(rolePut(user.roles, 'a'))
        })
}

loadCurrentUserInfo(currentUserRequestUrl)

loadUsersList(requestUrl)

function chosenRole() {
    return $('#selectRole').prop('selectedIndex')
}

function openFilledModal(options, isDeleteButton, currentUserId) {
    $('#userModal').modal(options)
    let nameInput = $('#nameInput')
    let surnameInput = $('#surnameInput')
    let selectRole = $('#selectRole')
    let confirmEdit = $("#confirmEdit")
    let trUser = $(`#trUser${currentUserId}`)
    confirmEdit.html(isDeleteButton ? "Delete" : "Edit")
    confirmEdit.prop('class', isDeleteButton ? "btn btn-danger" : "btn btn-primary")
    nameInput.prop('value', trUser.children('#nameTd').text())
    surnameInput.prop('value', trUser.children('#surnameTd').text())
    nameInput.prop('disabled', isDeleteButton)
    surnameInput.prop('disabled', isDeleteButton)
    $('#passwordInput').prop('disabled', isDeleteButton)
    isDeleteButton ? selectRole.attr('disabled', 'disabled') : selectRole.removeAttr('disabled')
}

function editOrDeleteUser(deleteOrEdit, chosenUserId) {
    if (deleteOrEdit === "Edit") {
        let nameEdit = $('#nameInput')
        let surnameEdit = $('#surnameInput')
        let passwordEdit = $('#passwordInput')
        fetch(requestUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: chosenUserId,
                name: nameEdit.val(),
                surname: surnameEdit.val(),
                password: passwordEdit.val(),
                roles: [
                    chosenRole() === 0 ? adminRoleJSON : userRoleJSON
                ],
                enabled: true,
                authorities: [
                    chosenRole() === 0 ? adminRoleJSON : userRoleJSON
                ],
                username: nameEdit.val(),
                credentialsNonExpired: true,
                accountNonExpired: true,
                accountNonLocked: true
            })
        }).then((r) => {
            if (r.ok) {
                $(`#trUser${chosenUserId}`)
                    .replaceWith(`<tr id="trUser${chosenUserId}">
                    <td id="idTd">${chosenUserId}</td>
                    <td id="nameTd">${nameEdit.val()}</td>
                    <td id="surnameTd">${surnameEdit.val()}</td>
                    ` + rolePut([chosenRole() === 0 ? adminRoleJSON : userRoleJSON]) + `
                    <td>
                        <button id="editButton-${nameEdit.val()}" type="button" class="btn btn-primary">
                            Edit
                        </button>
                    </td>
                    <td>
                        <button id="deleteButton-${nameEdit.val()}" type="button" class="btn btn-danger">
                            Delete
                        </button>
                    </td>
                </tr>`)
            }
        })
    } else if (deleteOrEdit === "Delete") {
        fetch(requestUrl + '/' + chosenUserId, {
            method: 'DELETE'
        }).then((r) => {
                if (r.ok) {
                    $(`#trUser${chosenUserId}`).remove()
                }
            }
        )
    }
}

function addNewUser() {
    let nameAdd = $('#newUserName')
    let surnameAdd = $('#newUserSurname')
    let passwordAdd = $('#newUserPassword')
    return fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameAdd.val(),
            surname: surnameAdd.val(),
            password: passwordAdd.val(),
            roles: [
                chosenRole() === 0 ? adminRoleJSON : userRoleJSON
            ],
            enabled: true,
            authorities: [
                chosenRole() === 0 ? adminRoleJSON : userRoleJSON
            ],
            username: nameAdd.val(),
            credentialsNonExpired: true,
            accountNonExpired: true,
            accountNonLocked: true
        })
    }).then((r) => {
        if (r.ok) {
            mainTable.children().remove()
            mainTable.append(mainTableHTML)
        }
    })
}

document.addEventListener('click', (e) => {
    let clickedButton = e.target.id
    let mainTable = $('.main-table')
    let userTableButton = $('#userTableButton')
    let newUserButton = $('#newUserButton')
    let adminButton = $('#adminButton')
    let userButton = $('#userButton')
    switch (clickedButton.split('-')[0]) {
        case 'userTableButton':
            mainTable.children().remove()
            mainTable.append(mainTableHTML)
            loadUsersList(requestUrl).then(() => {
                newUserButton.prop('class', 'btn btn-secondary')
                userTableButton.prop('class', 'btn btn-outline-secondary')
            })
            break
        case 'newUserButton':
            mainTable.children().remove()
            mainTable.append(newUserTableHTML)
            userTableButton.prop('class', 'btn btn-secondary')
            newUserButton.prop('class', 'btn btn-outline-secondary')
            break
        case 'editButton':
        case 'deleteButton':
            currentUserId = Number(e.target.parentElement.parentElement.id.substring(6))
            const options = {}
            openFilledModal(options, clickedButton.includes('deleteButton'), currentUserId)
            break
        case 'confirmEdit':
            $('#userModal').modal('hide')
            editOrDeleteUser(e.target.textContent, currentUserId)
            break
        case 'addNewUserButton':
            addNewUser().then(() => loadUsersList(requestUrl))
            break
        case 'adminButton':
            mainTable.children().remove()
            mainTable.append(mainTableHTML)
            loadUsersList(requestUrl)
            userButton.prop('class', 'nav-link')
            adminButton.prop('class', 'nav-link active')
            break
        case 'userButton':
            mainTable.children().remove()
            loadCurrentUser(currentUserRequestUrl)
            adminButton.prop('class', 'nav-link')
            userButton.prop('class', 'nav-link active')
            break
    }


})




