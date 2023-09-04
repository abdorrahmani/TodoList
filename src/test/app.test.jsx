import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../View/App.jsx"
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