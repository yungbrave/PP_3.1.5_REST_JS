fetch('http://localhost:8080/admin/api/users')
    .then(response => response.json())
    .then(json => {
        console.log(json)
        getTableHeader(Object.keys(json[0]))
        getTableData(json)
    })
    .catch(error => console.error(error));

const getTableHeader = (fields) => {
    const table = document.getElementById('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < fields.length; i++) {
        fields[i] = fields[i][0].toUpperCase() + fields[i].slice(1, fields[i].length)
    }
    fields.push('Edit', 'Delete')
    fields.forEach(x => {
        const th = document.createElement('th');
        th.innerText = x;
        th.scope = 'col';
        fragment.appendChild(th);
    })
    tr.appendChild(fragment)
    thead.appendChild(tr)
    table.appendChild(thead)
}

const getTableData = users => {
    users.forEach(user => {
        const table = document.getElementById('table');
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');
        const fragment = document.createDocumentFragment();

        const keys = Object.keys(users[0]);

        keys.forEach(x => {
            const td = document.createElement('td');
            if (typeof user[x] == 'string' || typeof user[x] == 'number') {
                td.innerText = user[x];
            } else {
                console.log(user[x])
                td.innerText = user[x].reduce((acc, role) => {
                    return acc + ' ' + role.name.slice(5, role.name.length)
                }, '')
            }
            fragment.appendChild(td);
        })
        tr.appendChild(fragment);
        tbody.appendChild(tr);

        const editButton =
            '<td><button type="button" ' +
            'class="btn btn-primary" data-bs-toggle="modal"\n' +
            'th:data-bs-target="${\'#modalEdit\'+userf.id}">\n' +
            'Edit\n' +
            '</button></td>'
        tr.insertAdjacentHTML('beforeend', editButton)

        const deleteButton =
           ' <form th:method="DELETE" th:action="@{/admin/{id}(id=${userf.getId()})}"> ' +
            ' <input type="submit" class="btn btn-danger" ' +
            ' value="Delete"> ' +
            ' </form> '
        tr.insertAdjacentHTML('beforeend', deleteButton)

        table.appendChild(tbody);
    })
}