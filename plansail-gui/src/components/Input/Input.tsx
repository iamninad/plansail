import InputProps from "./input.type";

const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  onKeyEnter,
}: InputProps) => {
  switch(type) {
    case 'textarea':
      return (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyEnter}
          className="border p-2 w-full rounded-lg shadow-lg hover:shadow-xl"
        ></textarea>
      );
      break;
    default:
      return (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyEnter}
          className="border p-2 w-full rounded-lg shadow-lg hover:shadow-xl"
        ></input>
      );
      break;
  }
  
};

export default Input;
