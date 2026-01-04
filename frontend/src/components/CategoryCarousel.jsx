import React from 'react'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
const category = [
    'Backend Developer',
    'frontend developer',
    'Graphic Developer',
    'Fullstack developer'
]
const CategoryCarousel = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
      const searchJobHandler=(query)=>{
            dispatch(setSearchedQuery(query))
            navigate("/browse")
        }

    return (
        <div className="max-w-7xl m-auto">
            <Carousel className="w-full md:max-w-xl max-w-[230px] mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3 text-center">
                                <Button onClick={()=>searchJobHandler(cat)} variant='outline'className="rounded-full bg-gray-300">{cat}</Button>
                            </CarouselItem>
                        )
                        )
                    }
                </CarouselContent>
                <CarouselNext/>
                <CarouselPrevious/>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
