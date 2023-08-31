const { createStore } = require('redux');
const { Provider } = require('react-redux');
const { render, fireEvent, screen } = require('@testing-library/react');
const reducer = require('../store/sliceList.jsx').default;
const { addNewItem } = require('../store/sliceList.jsx');
const App = require('@/View/App.jsx').default;

function renderWithRedux(
    ui,
    { initialState, store = createStore(reducer, initialState) } = {}
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store,
    };
}

describe('addNewItem تابع', () => {
    it('باید تودو جدید به لیست اضافه کند', () => {
        const initialState = {
            lists: [
                {
                    title: 'Todo',
                    items: [],
                },
            ],
        };

        const { getByPlaceholderText, getByText, store } = renderWithRedux(
            <App />,
            { initialState }
        );

        const inputElement = getByPlaceholderText('Add a todo...');
        const addButton = getByText('Add');

        fireEvent.change(inputElement, { target: { value: 'تست تودو' } });
        fireEvent.click(addButton);

        const state = store.getState();
        const addedTodo = state.lists[0].items[0];

        expect(addedTodo.content).toBe('تست تودو');
    });
});
