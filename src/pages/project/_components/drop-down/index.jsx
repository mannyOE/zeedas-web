import React, {useState, useEffect, useRef} from 'react';
import {DropdownContainer, DropdownInput, DropdownMenu, DropdownMenuItem} from './style';

const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];

const MAX_NUM_OF_ITEMS_SHOWN = 30;

export const Dropdown = (props) => {
  const {itemKey, searchTerm, onSelect, items, label, name, placeholder} = props;
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [input, setInput] = useState(searchTerm || '');
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const allItemsRef = useRef([]);
  const parentElementRef = useRef(null);
  const scrollSelectedItemInView = (index) => {
    if (!parentElementRef.current){
      return;
    }

    const dropdownMenu = parentElementRef.current;
    const menuItems = allItemsRef.current;

    if (!menuItems){
      return;
    }

    const menuItem = menuItems[index];

    if (!menuItem){
      return;
    }

    const isOutOfUpperView = menuItem.offsetTop < dropdownMenu.scrollTop;
    const isOutOfLowerView = (menuItem.offsetTop + menuItem.clientHeight) > (dropdownMenu.scrollTop + dropdownMenu.clientHeight);

    if (isOutOfUpperView){
      dropdownMenu.scrollTop = menuItem.offsetTop;
    } else if (isOutOfLowerView){
      dropdownMenu.scrollTop = (menuItem.offsetTop + menuItem.clientHeight) - dropdownMenu.clientHeight;
    }
  };

  const setSelectInput = (value, item) => {
    setInput('');
    onSelect(item);
  };

  const handleClickOutside = (event) => {
    if (!parentElementRef.current || parentElementRef.current.contains(event.target)) {
      return;
    }

    if (!filteredItems.length){
      setSelectInput('');
    }

    setShowDropdownMenu(false);
    onSelect(input);
  };

  useEffect(() => {
    scrollSelectedItemInView(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const selectItemInFocusBy = (offset) => {
    const lastIndex = filteredItems.length - 1;
    const nextIndex = selectedIndex + offset;

    if (nextIndex > lastIndex){
      setSelectedIndex(0);
    } else if (nextIndex < 0){
      setSelectedIndex(lastIndex);
    } else {
      setSelectedIndex(nextIndex);
    }
  };

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      if (item[itemKey].indexOf(input) > -1){
        return true;
      }

      return false;
    });

    if (filteredItems.length > 0){
      setSelectedIndex(0);
    }

    setFilteredItems(filteredItems);
  }, [input, items, itemKey]);

  const handleOnKeyDown = (event) => {
    if (keys.indexOf(event.key) === -1){
      return;
    }

    const [arrDown, arrUp, enter, escape] = keys;
    const moves = {
      [arrDown]: 1,
      [arrUp]: -1
    };
    const move = moves[event.key];

    if (move !== undefined){
      event.preventDefault();
      selectItemInFocusBy(move);
    }

    if (event.key === enter) {
      if (filteredItems[selectedIndex]){
        setSelectInput(filteredItems[selectedIndex][itemKey], filteredItems[selectedIndex]);
        setShowDropdownMenu(false);
      }
    }

    if (event.key === escape){
      event.preventDefault();
      setShowDropdownMenu(false);
    }
  };

  const selectItem = (index) => {
    setSelectInput(filteredItems[index][itemKey], filteredItems[index]);
    setSelectedIndex(index);
    setShowDropdownMenu(false);
  };

  const generateMenuOptions = () => {
    return filteredItems.slice(0, MAX_NUM_OF_ITEMS_SHOWN).map((item, index) => {
      return (
        <DropdownMenuItem
          ref={(ref) => allItemsRef.current[index] = ref}
          selected={selectedIndex === index}
          key={`dropdown-menu-item-${index}`}
          onClick={() => selectItem(index)}
        >
          {item[itemKey]}
        </DropdownMenuItem>
      );
    });
  };

  const handleInput = ({target}) => {
    const {value} = target;

    setInput(value);

    if (!showDropdownMenu){
      setShowDropdownMenu(true);
    }
  };

  return (
    <DropdownContainer>
      <DropdownInput
        onKeyDown={handleOnKeyDown}
        showMenu={showDropdownMenu}
        placeholder={placeholder}
        name={name}
        onChange={handleInput}
        value={input}
        onClick={() => setShowDropdownMenu(!showDropdownMenu)}
      />
      {showDropdownMenu && (
        <DropdownMenu ref={parentElementRef}>
          {generateMenuOptions()}
          {filteredItems.length === 0 && (
            <DropdownMenuItem disabled={true}>
            No results found
            </DropdownMenuItem>
          )}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};