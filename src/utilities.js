
export default function addItemGenerator(setItems, items) {
    return function addItem(title) {
        const newItems = [...items, { title, completed: false }];
        setItems(newItems);
        return newItems
    }
};

