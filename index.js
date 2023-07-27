function createNode(id, parentId, nodeName, orphan = false) {
    const _li = document.createElement('li');
    const _span = document.createElement('span');
    _span.innerText = nodeName;
    _li.id = 'li_' + id;
    _li.appendChild(_span);
    const parent = document.querySelector(
        '[data-parent=node_' + parentId + ']'
    );
    if (orphan || parent == null) {
        const _ul = document.createElement('ul');
        _ul.className = 'node_' + id;
        _ul.setAttribute(
            'data-parent',
            parentId ? 'node_' + parentId : 'orphan'
        );
        _ul.appendChild(_li);
        return _ul;
    }
    parent.classList.add('node_' + id);
    return _li;
}

function createTree(data) {
    const _div = document.createElement('div');
    _div.className = 'main main-horizontal';
    document.querySelector('body').appendChild(_div);

    if (Object.values(data).length <= 0) return;

    // ids of elements created
    const ids = [];

    // create the first parent
    const orhpanParent = data.find(el => el.parentId == null);
    if (!orhpanParent) return;
    _div.appendChild(
        createNode(
            orhpanParent['id'],
            orhpanParent['parentId'],
            orhpanParent['nodeName'],
            true
        )
    );
    ids.push(orhpanParent['id']);

    data.forEach(element => {
        if (element.parentId == null) return;

        const isParentCreated = ids.includes(element.parentId);
        if (isParentCreated) {
            const childEl = createNode(
                element['id'],
                element['parentId'],
                element['nodeName']
            );
            const parent = document.querySelector(
                '[data-parent=node_' + element['parentId'] + ']'
            );
            if (parent) {
                parent.appendChild(childEl);
            } else
                document
                    .querySelector(
                        '.node_' +
                            element['parentId'] +
                            ' #li_' +
                            element['parentId']
                    )
                    .appendChild(childEl);
        } else {
            const parent = data.find(el => el.id === element.parentId);
            ids.push(parent['id']);
            const childElement = createNode(
                element['id'],
                element['parentId'],
                element['nodeName']
            );
            const parentElement = document.querySelector(
                '.node_' + parent['id'] + ' #li_' + parent['id']
            );
            parentElement.appendChild(childElement);
        }
    });
}

// order matters and make sure the parent is before the child
// Example of data
const treeData = [
    { id: 1, parentId: null, nodeName: 'Cars' },
    { id: 2, parentId: 1, nodeName: 'Mahindra' },
    { id: 3, parentId: 1, nodeName: 'Tata' },
    { id: 4, parentId: 1, nodeName: 'Volvo' },
    { id: 5, parentId: 1, nodeName: 'Merc' },

    { id: 6, parentId: 5, nodeName: 'G-CN5-6' },
    { id: 7, parentId: 6, nodeName: 'G-CN5-7' },
    { id: 8, parentId: 6, nodeName: 'G-CN5-8' },
    { id: 9, parentId: 8, nodeName: 'G-CN5-9' },

    { id: 10, parentId: 4, nodeName: 'G-CN5-10' },
    { id: 11, parentId: 10, nodeName: 'G-CN5-11' },
    { id: 12, parentId: 11, nodeName: 'G-CN5-12' },
    { id: 13, parentId: 12, nodeName: 'G-CN5-13' },

    { id: 24, parentId: 10, nodeName: 'G-CN5-24' },
    { id: 25, parentId: 10, nodeName: 'G-CN5-25' },
    { id: 26, parentId: 10, nodeName: 'G-CN5-26' },
    { id: 27, parentId: 10, nodeName: 'G-CN5-27' },

    { id: 14, parentId: 7, nodeName: 'G-CN5-14' },
    { id: 15, parentId: 6, nodeName: 'G-CN5-15' },
    { id: 16, parentId: 1, nodeName: 'BMW' },

    { id: 17, parentId: 7, nodeName: 'G-CN5-17' },
    { id: 18, parentId: 17, nodeName: 'G-CN5-18' },
    { id: 19, parentId: 17, nodeName: 'G-CNS-19' },

    { id: 20, parentId: 19, nodeName: 'G-CNS-20' },
    { id: 21, parentId: 19, nodeName: 'G-CNS-21' },
    { id: 22, parentId: 19, nodeName: 'G-CNS-22' },
    { id: 23, parentId: 19, nodeName: 'G-CNS-23' }
];

createTree(treeData);
