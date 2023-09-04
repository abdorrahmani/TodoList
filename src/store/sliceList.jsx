import { createSlice } from "@reduxjs/toolkit"
import {idGenerator} from "@/components/idGnerator.jsx";



export const edit = {
    listIndex: 0,
    itemIndex: 0,
    value: ""
}

const localStorageState = localStorage.getItem("@lists")

const initialState = localStorageState
    ? JSON.parse(localStorageState)
    : {
        lists: [
            { title: "Todo" ,color:{titleColor :"#6E1E29", bg:"#FEF4F3"  , taskColor:"#D4AFB4"},
                items: [
                {  id: "1",
                    completed:false,
                    content:"Start with meditation, exercise & breakfast for a productive day"
                },
                    {  id: "2",
                        completed:false,
                        content:"Read to learn something new every day"
                    },
                    {  id: "3",
                        completed:false,
                        content:"Learn something fresh & relevant"
                    },
                ] },

            { title: "Doing 💪",color:{titleColor :"#795B19" , bg:"#FFFBF2"  , taskColor:"#DECCA4"},
                items: [
                    {id:"4",
                        completed:false,
                        content:"Engage & question in meetings",
                    },
                    {  id:"5",
                        completed:false,
                        content:"Use time-blocking for effective days"
                    }
                ] },
            { title: "Done 🎉" ,color:{titleColor :"#286C1A",bg:"#F4F9F3" , taskColor:"#BCD7B6"},
                items: [
                {
                    id:"6",
                    completed:true,
                    content:"Finished online course - check!",},
                    {
                        id:"7",
                        completed:true,
                        content:"Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating"

                    }
                      ]}
        ]
    }

const slice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        // LISTS HANDLERS
        addNewItem: (state, { payload }) => {
            {
                state.lists[payload.listIndex].items.push({
                    id: idGenerator(),
                    completed:false,
                    content: payload.inputValue
                })
            }
            localStorage.setItem("@lists", JSON.stringify({ ...state }))
        },
        editItem: (state, { payload }) => {
            const { listIndex, index, value } = payload;

            state.lists[listIndex].items[index].content = value;

            localStorage.setItem("@lists", JSON.stringify({ ...state }));
        },
        deleteItem: (state, { payload }) => {
            {
                state.lists[payload.listIndex].items.splice(payload.index, 1)
            }
            localStorage.setItem("@lists", JSON.stringify(state))
        },
        checkItem: (state, { payload }) => {
            let { listIndex, index } = payload;
            const itemsArray = state.lists[listIndex].items;
            const currentItem = itemsArray[index];

            const updateItemStatus = (item, completed) => {
                item.completed = completed;
            };

            // moving item
            const moveItemToList = (state, sourceListIndex, destinationListIndex, itemIndex) => {
                const sourceList = state.lists[sourceListIndex];
                const destinationList = state.lists[destinationListIndex];
                const itemToMove = sourceList.items[itemIndex];
                sourceList.items.splice(itemIndex, 1);
                destinationList.items.push(itemToMove);
            };

            updateItemStatus(currentItem, !currentItem.completed);

            if (listIndex === 0) { // "Todo"
                moveItemToList(state, 0, 2, index); // from Todo
            } else if (listIndex === 1) { // "Doing"
                moveItemToList(state, 1, 2, index); // From doing
            } else if (listIndex === 2) { // "Done"
                if (!currentItem.completed) {
                    moveItemToList(state, 2, 0, index); // From done
                }
            }
            localStorage.setItem("@lists", JSON.stringify({ ...state }));
        },
        // DRAG AND DROP HANDLERS
        moveCard: (state, { payload }) => {
            const stateCopy = state;
            let { fromIndex, toList } = payload;
            const item = state.lists[payload.fromList].items[payload.fromIndex];

            if (toList==2) {
                item.completed = !item.completed;
                if (!item.completed) {
                    item.completed =true
                }
            }else {
                item.completed =false
            }


            stateCopy.lists[payload.fromList].items.splice(payload.fromIndex, 1)
            stateCopy.lists[payload.toList].items.splice(payload.toIndex, 0, item)

            state = stateCopy
            localStorage.setItem("@lists", JSON.stringify(state))
        }
    }
})

export const { addNewItem, deleteItem, editItem,checkItem, moveCard } = slice.actions

export const state = ({ lists }) => lists

export default slice.reducer
