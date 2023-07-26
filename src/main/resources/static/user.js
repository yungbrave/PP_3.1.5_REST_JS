const currentUserRequestUrl = 'http://localhost:8080/rest/api/users/user'

function rolePut(roles) {
    let i = 0
    let str = ``
    for (let role of roles) {
        str += `<a id="role${i++}">${role.role.replace('ROLE_', '')} </a>`
    }
    return str
}

fetch(currentUserRequestUrl)
    .then(res => res.json())
    .then(user => {
        $('#currentUserName').text(user.name)
        $('#currentUserInfo').append(rolePut(user.roles))
        $('#tdUserId').text(user.id)
        $('#tdUserName').text(user.name)
        $('#tdUserSurname').text(user.surname)
        $('#tdUserRoles').append(rolePut(user.roles))

    })

