fetch('http://localhost:8080/admin/api/users')
    .then(response => response.json())
    .then(json => {
        getTableHeader(Object.keys(json[0]))
        console.log(json)
        getTableData(json)
    })
    .catch(error => console.error(error));

const getTableHeader = (fields) => {
    const table = document.getElementById('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const fragment = document.createDocumentFragment();
    // почему я не могу написать тут fields.forEach(el => el.charAt[0].toUpperCase())
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
        const tbody= document.createElement('tbody');
        const tr = document.createElement('tr');
        const fragment = document.createDocumentFragment();
        const keys = Object.keys(users[0]);
        // console.log(user['roles'])

        keys.forEach(x => {
            const td = document.createElement('td');
            td.innerText = user[x];
            fragment.appendChild(td);
        })
        tr.appendChild(fragment);
        tbody.appendChild(tr);
        table.appendChild(tbody);
    })
}