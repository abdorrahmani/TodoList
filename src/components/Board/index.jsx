import List from "@/components/List/index.jsx";

function Board() {
    return (
        <>
            <div className="flex w-[340px] h-[700px] px-[20px] py-[20px] pb-[30px] flex-col items-start gap-[20px] shrink-0  rounded-[10px] bg-[#FEF4F3]	">
                <div className="flex w-[300px] items-start gap-[10px] font-inter">
                    <h2 className="flex-1 text-[#6E1E29]  text-[15px] not-italic font-semibold leading-normal">Todo</h2>
                    <span className="text-[#D4AFB4] text-[12px] font-medium">3 Tasks</span>
                </div>
                <List/>
            </div>
        </>
    )
}

export default Board