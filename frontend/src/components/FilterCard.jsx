import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: 'location',
        array: ["Delhi", "Noida", "Gurugram"]
    },
    {
        filterType:'Industry',
        array:['Frontend Developer','Backend Developer','Fullstack Developer']
    },
    {
        filterType:'Salary',
        array:['0-40k','40k-1lakh','1lakh -5lakh']
    }
]

const FilterCard = () => {
    const [selectedValue,setSelectedValue]=useState('')
    const dispatch=useDispatch()
    const changeHandler=(value)=>{
      setSelectedValue(value);
    }
    useEffect(() => {
       dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue]);
    return (
        <div className="">
            <h1 className="font-bold text-lg my-3">Filter card</h1>
            <hr/>
            {/* <RadioGroup value={selectedValue} onValueChanged={changeHandler}> */}
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data,index)=>(
                        <div className="">
                            <span className="font-bold text-lg">{data.filterType}</span>
                            {
                                data.array.map((item,idx)=>
                                    {
                                        const itemId=`id${index}-${idx}`
                                        return(
                                            <div className="flex items-center space-x-3 my-2">
                                                <RadioGroupItem value={item} id={itemId}/>
                                                <Label htmlFor={item}>{item}</Label>
                                            </div>
                                        )
                                    }
                            )
                            }
                        </div>
                    )
                )
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard

// import React, { useState } from 'react';
// import { RadioGroup, RadioGroupItem } from './ui/radio-group';
// import { Label } from './ui/label';
// import { ChevronDown, ChevronUp } from 'lucide-react';

// const filterData = [
//   {
//     filterType: 'Location',
//     array: ['Delhi', 'Noida', 'Gurugram'],
//   },
//   {
//     filterType: 'Industry',
//     array: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
//   },
//   {
//     filterType: 'Salary',
//     array: ['0-40k', '40k-1lakh', '1lakh -5lakh'],
//   },
// ];

// const FilterCard = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (index) => {
//     setOpenDropdown(openDropdown === index ? null : index);
//   };

//   return (
//     <div className="w-full">
//       <h1 className="font-bold text-lg mb-3">Filter Options</h1>
//       <hr className="mb-4" />

//       {/* Mobile View: Dropdown Style */}
//       <div className="flex flex-row items-center md:hidden">
//         {filterData.map((data, index) => (
//           <div key={index} className="mb-3 border border-gray-300 rounded-md">
//             <button
//               onClick={() => toggleDropdown(index)}
//               className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200"
//             >
//               <span className="font-semibold text-base">{data.filterType}</span>
//               {openDropdown === index ? <ChevronUp /> : <ChevronDown />}
//             </button>

//             {openDropdown === index && (
//               <div className="p-3 bg-white">
//                 <RadioGroup>
//                   {data.array.map((item, idx) => (
//                     <div key={idx} className="flex items-center space-x-3 my-2">
//                       <RadioGroupItem value={item} id={`${data.filterType}-${item}`} />
//                       <Label htmlFor={`${data.filterType}-${item}`}>{item}</Label>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Desktop View: Row-wise Filters */}
//       <div className="hidden md:block">
//         <RadioGroup>
//           {filterData.map((data, index) => (
//             <div key={index} className="mb-6">
//               <span className="font-semibold text-base block mb-2 capitalize">{data.filterType}</span>
//               {data.array.map((item, idx) => (
//                 <div key={idx} className="flex items-center space-x-3 my-2">
//                   <RadioGroupItem value={item} id={`${data.filterType}-desktop-${item}`} />
//                   <Label htmlFor={`${data.filterType}-desktop-${item}`}>{item}</Label>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </RadioGroup>
//       </div>
//     </div>
//   );
// };

// export default FilterCard;
