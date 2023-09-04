import Item from "@/components/Item/index.jsx";
import {Droppable} from "react-beautiful-dnd";
import React, {useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {addNewItem} from "@/store/sliceList.jsx";


function List({ data, listIndex }) {
    const [isCreating, setIsCreating] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch()
    const memoizedIsCreating = useMemo(() => isCreating, [isCreating]);
    const memoizedInputValue = useMemo(() => inputValue, [inputValue]);

    const handleCreateStart = () => {
        setIsCreating(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCreateEnd = () => {
        if (memoizedInputValue) {
            const inputLines = memoizedInputValue.split('\n');
            inputLines.forEach((line) => {
                if (line.trim() !== "") {
                    dispatch(addNewItem({ inputValue: line, listIndex }));
                }
            });

            setInputValue("");
        }
        setIsCreating(false);
    };

    const memoizedItems = useMemo(() => {
        return data.items.map((item, index) => (
            <Item
                key={index}
                listItem={item}
                listIndex={listIndex}
                index={index}
            />
        ));
    }, [data.items, listIndex]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCreateEnd()
        }
    }

    console.log(1);
    return (
        <>

            <div className={`flex w-[340px] h-[700px] px-[20px] py-[20px] pb-[30px] flex-col items-start gap-[20px] shrink-0  rounded-[10px]`}
                 style={{backgroundColor:`${data.color.bg}`}}
          >
                <div className="flex w-[300px] items-start gap-[10px] font-inter">
                    <h2 className={`flex-1  text-[15px] not-italic font-semibold leading-normal`} style={{color:`${data.color.titleColor}`}}>{data.title}</h2>
                    <span className="text-[12px] font-medium" style={{color:`${data.color.taskColor}`}} >{data.items.length} Tasks</span>
                </div>
                <div className="flex flex-col items-start gap-[12px] self-stretch ">
                    <Droppable droppableId={String(listIndex)}>
                        {(provided , snapshot)=> (
                            <>
                                <ul ref={provided.innerRef} {...provided.droppableProps}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    {memoizedItems}
                                    {provided.placeholder}
                                    {(data.title == "Done 🎉") ? "": (
                                        <>
                                            {memoizedIsCreating ? (
                                                <textarea
                                                    className="mt-[12px] w-[300px]"
                                                    type="text"
                                                    value={inputValue}
                                                    onChange={handleInputChange}
                                                    onBlur={handleCreateEnd}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder="What do you want to do?"
                                                    autoFocus
                                                ></textarea>
                                            ):(
                                                <div className="flex p-[10px] flex-col items-start self-stretch rounded-[4px] text-[#D37A87]">
                                                    <div className="flex items-center gap-[10px] self-stretch animate-pulse" onClick={handleCreateStart}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <rect x="5.14285" width="1.71429" height="12" rx="0.857143" fill="#D37A87"/>
                                                            <rect y="6.85714" width="1.71429" height="12" rx="0.857143" transform="rotate(-90 0 6.85714)" fill="#D37A87"/>
                                                        </svg>
                                                        <span className="text-[13px] font-semibold ">New</span>
                                                    </div>
                                                </div>

                                            )

                                            }
                                        </>


                                    )
                                    }

                                </ul>
                            </>

                        )}
                    </Droppable>
                </div>

            </div>

        </>
    )
}

export default React.memo(List);