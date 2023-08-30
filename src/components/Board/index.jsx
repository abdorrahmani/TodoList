import List from "@/components/List/index.jsx";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {moveCard , state} from "@/store/sliceList.jsx";

function Board() {
    const { lists } = useSelector(state)

    const dispatch = useDispatch()

    const handleDropEnd = result => {
        const { destination, source } = result

        if (destination) {
            dispatch(
                moveCard({
                    fromList: Number(source.droppableId),
                    toList: Number(destination.droppableId),
                    fromIndex: source.index,
                    toIndex: destination.index
                })
            )
        }
    }

    return (
        <>
            <DragDropContext onDragEnd={handleDropEnd}>
                <div className="flex gap-[20px]">
                    {lists.map((data, index) =>
                        <List key={index} data={data} listIndex={index} />
                    )
                    }
                </div>

            </DragDropContext>

        </>
    )
}

export default Board