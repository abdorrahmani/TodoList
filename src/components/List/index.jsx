import Item from "@/components/Item/index.jsx";

function List() {
    return (
        <>
            <ul className="flex flex-col items-start gap-[12px] self-stretch ">
                <Item/>

                <div className="flex p-[10px] flex-col items-start self-stretch rounded-[4px] text-[#D37A87]">
                    <div className="flex items-center gap-[10px] self-stretch">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="5.14285" width="1.71429" height="12" rx="0.857143" fill="#D37A87"/>
                            <rect y="6.85714" width="1.71429" height="12" rx="0.857143" transform="rotate(-90 0 6.85714)" fill="#D37A87"/>
                        </svg>
                        <span className="text-[13px] font-semibold ">New</span>
                    </div>
                </div>
            </ul>

        </>
    )
}

export default List