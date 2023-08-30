import Checkbox from "@/components/CheckBox/index.jsx";
import {Draggable} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {deleteItem} from "@/store/sliceList.jsx";


function Item({index, listIndex, listItem} ) {
    const dispatch = useDispatch()

    const handleDeleteItem = (listIndex, index) => {
        dispatch(deleteItem({ listIndex, index }))
    }

    return (
        <>

            <Draggable key={listItem.id} draggableId={listItem.id} index={index}>
                {
                    (provided) => (<>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                              >
                            <div className="flex px-[10px] py-[12px] flex-col items-start self-stretch bg-white rounded-[4px] border border-[#F3E1DF]">
                                <div className="flex items-center gap-[10px] self-stretch group">
                                    <Checkbox/>
                                    <p className="text-[#3A3A3A] text-[12px] not-italic font-semibold ">Start with meditation, exercise & breakfast for a productive day</p>
                                    <button  onClick={() => handleDeleteItem(listIndex, index)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="hidden group-hover:block" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                            <rect x="12.1218" y="3.63655" width="1.71429" height="12" rx="0.857143" transform="rotate(45 12.1218 3.63655)" fill="#F4C5CB"/>
                                            <rect x="3.63656" y="4.84873" width="1.71429" height="12" rx="0.857143" transform="rotate(-45 3.63656 4.84873)" fill="#F4C5CB"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </>)

                }

            </Draggable>

        </>
    )
}

export default Item