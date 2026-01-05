// import React, { useEffect, useState } from 'react'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

// const filterData = [
//     {
//         filterType: 'location',
//         array: ["Delhi", "Noida", "Gurugram"]
//     },
//     {
//         filterType:'Industry',
//         array:['Frontend Developer','Backend Developer','Fullstack Developer']
//     },
//     {
//         filterType:'Salary',
//         array:['0-40k','40k-1lakh','1lakh -5lakh']
//     }
// ]

// const FilterCard = () => {
//     const [selectedValue,setSelectedValue]=useState('')
//     const dispatch=useDispatch()
//     const changeHandler=(value)=>{
//       setSelectedValue(value);
//     }
//     useEffect(() => {
//        dispatch(setSearchedQuery(selectedValue))
//     }, [selectedValue]);
//     return (
//         <div className="">
//             <h1 className="font-bold text-lg my-3">Filter card</h1>
//             <hr/>
//             {/* <RadioGroup value={selectedValue} onValueChanged={changeHandler}> */}
//             <RadioGroup value={selectedValue} onValueChange={changeHandler}>
//                 {
//                     filterData.map((data,index)=>(
//                         <div className="">
//                             <span className="font-bold text-lg">{data.filterType}</span>
//                             {
//                                 data.array.map((item,idx)=>
//                                     {
//                                         const itemId=`id${index}-${idx}`
//                                         return(
//                                             <div className="flex items-center space-x-3 my-2">
//                                                 <RadioGroupItem value={item} id={itemId}/>
//                                                 <Label htmlFor={item}>{item}</Label>
//                                             </div>
//                                         )
//                                     }
//                             )
//                             }
//                         </div>
//                     )
//                 )
//                 }
//             </RadioGroup>
//         </div>
//     )
// }

// export default FilterCard

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
        filterType: 'Industry',
        array: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer']
    },
    {
        filterType: 'Salary',
        array: ['0-40k', '40k-1lakh', '1lakh -5lakh']
    }
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg p-5 sm:p-6">

            {/* Title */}
            <h1 className="font-extrabold text-xl text-gray-800 mb-4">
                🔍 Filter Jobs
            </h1>
            <hr className="mb-5" />

            <RadioGroup
                value={selectedValue}
                onValueChange={changeHandler}
                className="space-y-6"
            >
                {filterData.map((data, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition"
                    >
                        {/* Filter Heading */}
                        <span className="block text-base font-semibold text-violet-700 mb-3 capitalize">
                            {data.filterType}
                        </span>

                        {/* Options */}
                        <div className="space-y-3">
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div
                                        key={itemId}
                                        className="flex items-center gap-3 p-2 rounded-lg
                                                   hover:bg-violet-50 cursor-pointer transition"
                                    >
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label
                                            htmlFor={itemId}
                                            className="text-sm sm:text-base text-gray-700 cursor-pointer"
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard
