// import React from 'react';
// import Slider from '@mui/material/Slider';

// interface SliderProps {
//   min: number;
//   max: number;
//   step?: number;
//   value: [number, number];
//   onValueChange: (value: [number, number]) => void;
// }

// const RangeSlider: React.FC<SliderProps> = ({ min, max, step = 1, value, onValueChange }) => {
//   const handleChange = (event: Event, newValue: number | number[]) => {
//     if (Array.isArray(newValue)) {
//       onValueChange(newValue);
//     }
//   };

//   return (
//     <Slider
//       value={value}
//       onChange={handleChange}
//       valueLabelDisplay="auto"
//       min={min}
//       max={max}
//       step={step}
//       disableSwap
//     />
//   );
// };

// export default RangeSlider;
