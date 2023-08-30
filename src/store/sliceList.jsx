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
                    content:"Start with meditation, exercise & breakfast for a productive day"
                },
                    {  id: "2",
                        content:"Read to learn something new every day"
                    },
                    {  id: "3",
                        content:"Learn something fresh & relevant"
                    },
                ] },

            { title: "Doing 💪",color:{titleColor :"#795B19" , bg:"#FFFBF2"  , taskColor:"#DECCA4"},
                items: [
                    {id:"4",
                        content:"Engage & question in meetings",
                    },
                    {  id:"5",
                        content:"Use time-blocking for effective days"
                    }
                ] },
            { title: "Done 🎉" ,color:{titleColor :"#286C1A",bg:"#F4F9F3" , taskColor:"#BCD7B6"},
                items: [
                {
                    id:"6",
                    content:"Finished online course - check!",},
                    {
                        id:"7",
                        content:"Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating"

                    }
                      ]}
        ]
    }

const slice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        // LISTS HANDLERS -----------------------
        addNewItem: (state, { payload }) => {
            {
                state.lists[payload.index].items.push({
                    id: idGenerator(),
                    content: payload.value
                })
            }
            localStorage.setItem("@lists", JSON.stringify({ ...state }))
        },
        editItem: (state, { payload }) => {
            state.lists[edit.listIndex].items[edit.itemIndex].content = payload
            localStorage.setItem("@lists", JSON.stringify({ ...state }))
        },
        deleteItem: (state, { payload }) => {
            {
                state.lists[payload.listIndex].items.splice(payload.index, 1)
            }
            localStorage.setItem("@lists", JSON.stringify(state))
        },
        // DRAG AND DROP HANDLERS -------------
        moveCard: (state, { payload }) => {
            const stateCopy = state;
            const item = state.lists[payload.fromList].items[payload.fromIndex];

            stateCopy.lists[payload.fromList].items.splice(payload.fromIndex, 1)
            stateCopy.lists[payload.toList].items.splice(payload.toIndex, 0, item)

            state = stateCopy
            localStorage.setItem("@lists", JSON.stringify(state))
        }
    }
})

export const { addNewItem, deleteItem, editItem, moveCard } = slice.actions

export const state = ({ lists }) => lists

export default slice.reducer
