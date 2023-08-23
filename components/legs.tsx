// 'use client';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// import { Button } from '@/components/ui/button';
// import { useState } from 'react';
// import { useDartContext } from '@/context/dart-context';

// const Legs = () => {
//   const { dispatch } = useDartContext();
//   const [legs, setLegs] = useState<string>('3');

//   const updateLegs = (value: string) => {
//     // setLegs(value);
//     // dispatch({
//     //   type: 'UPDATE_LEGS',
//     //   legs: value,
//     // });
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline">Legs: {legs}</Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>Legs</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuRadioGroup
//           value={legs}
//           onValueChange={(value) => updateLegs(value)}
//         >
//           <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
//           <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
//           <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
//         </DropdownMenuRadioGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default Legs;
