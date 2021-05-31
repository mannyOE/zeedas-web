import React, {useState, useEffect, useRef, useCallback} from 'react';
import { Text } from './style';

export const Textarea = (props) => {
  const {value, handleChange, handleEnter, placeholder} = props;
  const [currentValue, setCurrentValue] = useState(value);
  const ref = useRef(null);
  const firstUpdate = useRef(true);

  const resize = () => {
    if (!ref.current){
      return;
    }
    ref.current.style.height = `0`;
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }
  const wrappedResize = useCallback(resize, []);
  const wrappedHandleChange = useCallback(handleChange, []);

  useEffect(() => {
    wrappedResize();
  }, [wrappedResize]);

  useEffect(() => {
    if (firstUpdate.current){
      firstUpdate.current = false;
      return;
    }
    wrappedResize();

    wrappedHandleChange(currentValue);
  }, [wrappedResize, wrappedHandleChange, currentValue]);

  const onChange = (event) => {
    setCurrentValue(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter'){
      if(handleEnter){
        event.preventDefault();
        event.stopPropagation();
        handleEnter(currentValue);
        setCurrentValue('');
      }
    }
  }

  return <Text ref={ref} value={currentValue} placeholder={placeholder} onChange={onChange} onKeyDown={handleKeyDown} />
} 