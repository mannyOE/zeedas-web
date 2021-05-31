import React from 'react';

export const EllipsisHorizontalIcon = ({dimension, color}) => {
  const {width, height} = dimension;
  return (
    <svg
      height={height}
      viewBox="0 -192 512 512"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="m320 64c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0"/>
      <path
        fill={color}
        d="m128 64c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0"/>
      <path
        fill={color}
        d="m512 64c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0"/>
    </svg>
  )
}