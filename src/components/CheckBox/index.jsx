const Checkbox = (props) => {
  const { ...rest } = props;
  return (
    <input
      type="checkbox"
      className="border border-gray-300 w-[16px] h-[16px]
      checked:bg-white checked:fill-green-400
      checked:border-[#DDEED9] hover:cursor-pointer"
      name=""
      {...rest}
    />
  );
};

export default Checkbox;
