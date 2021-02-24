import axios from 'axios';

const storeAction = function(type, data, state) {
    let mutationType = "items";
    return new Promise((resolve, reject) => {
        switch (type) {
            case 'items':
                axios.get('https://jsonplaceholder.typicode.com/users')
                    .then((response) => {
                        let result = new Object({
                            payload: response.data,
                            type: 'items',
                        });
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                        // this.$notify(error.message, 'error');
                        alert(error);
                    });
                break;
            case 'changeItem':
                let id = data.id;
                let newValue = [...state.items];
                newValue[id - 1] = data;
                mutationType = "items";
                resolve({ payload: newValue, type: mutationType });
                break;
            case 'delete':
                let deleted = [...state.items];
                let index = deleted.findIndex((item) => item.name === data.name);
                deleted.splice(index, 1);
                mutationType = "items";
                resolve({ payload: deleted, type: mutationType });
                break;
            case "addItem":
                let added = [...state.items];
                let newItem = data;
                newItem.id = added.length + 1;
                added.push(newItem);
                mutationType = 'items';
                resolve({ payload: added, type: mutationType });
                break;
        };
    });
};

export default storeAction;