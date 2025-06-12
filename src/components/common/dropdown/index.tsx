import React from 'react';

interface DropdownOption {
  id: any;
  name: string;
  action: () => void;
}

interface DropdownProps {
  id: any;
  options: DropdownOption[];
  isOpen?: boolean;
  toggleDropdown?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, isOpen, toggleDropdown }) => {
  return (
    <div className="relative inline-block text-left">
      {/* <button onClick={toggleDropdown}>...</button> */}

      {/* {isOpen && ( */}
      <ul className="flex items-center justify-center gap-2">
        {options.map((option) => (
          <li key={option.id} className="py-1">
            <button
              onClick={() => {
                option.action();
                // toggleDropdown();
              }}
              className="flex items-center h-8 w-8 rounded-full p-2 bg-primary/5"
            >
              <img src={option.name} alt="icon" />
              {/* <span className="text-sm font-normal text-[#475467]">{option.name}</span> */}
            </button>
          </li>
        ))}
      </ul>
      {/* )} */}
    </div>
  );
};

export default Dropdown;
