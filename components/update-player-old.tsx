// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   CheckoutTypes,
//   Player,
//   PlayerActionTypes,
//   usePlayersContext,
// } from '@/context/players-context';
// import { Edit } from 'lucide-react';
// import { useState } from 'react';

// type UpdatePlayerProps = {
//   player: Player;
// };

// const UpdatePlayer = ({ player }: UpdatePlayerProps) => {
//   const [open, setOpen] = useState<boolean>(false);
//   const [checkoutType, setCheckoutType] = useState<CheckoutTypes>(
//     player.checkoutType
//   );
//   const [dropdownPoints, setDropdownPoints] = useState<string>(
//     player.score.toString()
//   );
//   const [score, setScore] = useState<number>(player.score);
//   const { dispatch } = usePlayersContext();

//   const updatePlayer = () => {
//     dispatch({
//       type: PlayerActionTypes.UPDATE_PLAYER,
//       payload: {
//         playerId: player.id,
//         score,
//         checkoutType,
//       },
//     });

//     setOpen(false);
//   };

//   const onPointsChange = (value: string) => {
//     setScore(parseInt(value));
//     setDropdownPoints(value);
//   };

//   return (
//     <Dialog open={open}>
//       <DialogTrigger asChild>
//         <Edit
//           onClick={() => setOpen(true)}
//           className="cursor-pointer text-orange-400"
//         />
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{player.name} player settings</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="item-center">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button className="w-full" variant="outline">
//                   {checkoutType}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56">
//                 <DropdownMenuLabel>Check-Out Types</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuRadioGroup
//                   value={checkoutType}
//                   onValueChange={(value) =>
//                     setCheckoutType(value as CheckoutTypes)
//                   }
//                 >
//                   <DropdownMenuRadioItem value={CheckoutTypes.DOUBLE_OUT}>
//                     {CheckoutTypes.DOUBLE_OUT}
//                   </DropdownMenuRadioItem>
//                   <DropdownMenuRadioItem value={CheckoutTypes.STRAIGHT_OUT}>
//                     {CheckoutTypes.STRAIGHT_OUT}
//                   </DropdownMenuRadioItem>
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//           <div className="item-center">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button className="w-full" variant="outline">
//                   {score}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>Points</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuRadioGroup
//                   value={dropdownPoints}
//                   onValueChange={(value) => onPointsChange(value)}
//                 >
//                   <DropdownMenuRadioItem value="501">501</DropdownMenuRadioItem>
//                   <DropdownMenuRadioItem value="401">401</DropdownMenuRadioItem>
//                   <DropdownMenuRadioItem value="301">301</DropdownMenuRadioItem>
//                   <DropdownMenuRadioItem value="201">201</DropdownMenuRadioItem>
//                   <DropdownMenuRadioItem value="101">101</DropdownMenuRadioItem>
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button onClick={() => setOpen(false)} variant="secondary">
//             Cancel
//           </Button>
//           <Button type="submit" onClick={updatePlayer}>
//             Update player
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdatePlayer;
