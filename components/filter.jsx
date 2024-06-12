'use client'
import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from 'next/navigation'
import { Slider } from "@/components/ui/slider"


const filter = ({props,category}) => {
  let valueToken 
  const navigate = useRouter( )
  const indoor = (props)=>{
    props? navigate.push(`?page=${props}&category=indoor`) : navigate.push(`?category=indoor`)
  }
  const Outdoor = (props)=>{
    props? navigate.push(`?page=${props}&category=outdoor`) : navigate.push('?category=outdoor')
  }
  const Herbs = (props)=>{
    props? navigate.push(`?page=${props}&category=herbs`) : navigate.push('?category=herbs')
  }
  const Rare = (props)=>{
    props? navigate.push(`?page=${props}&category=rare`) : navigate.push('?category=rare')
  }
  const Gifts = (props)=>{
    props? navigate.push(`?page=${props}&category=gifts`) : navigate.push('?category=gifts')
  }
  const Accesories = (props)=>{
    props? navigate.push(`?page=${props}&category=accessories`) : navigate.push('?category=accessories')
  } 

  const priceHandler = (value)=>{
    if(value==='clear'){
     navigate.push('/products')
  } else {

    if(value==='999'){
      valueToken = 999
    } 
    if(value==='999-1499'){
      valueToken = `${999}-${1499}`
    }
    if(value==='1499-above'){
      valueToken=`${999}-above`
    }
    console.log(valueToken)
     props? navigate.push(`?page=${props}${category? `&category=${category}&price=${valueToken}` : `&price=${valueToken}` }`): category ?
     navigate.push(`?category=${category}&price=${valueToken}`) :  navigate.push(`?price=${valueToken}`);
    }
  }

  return (
      <ScrollArea  className="h-auto rounded-md  p-4 border border-solid border-[rgba(0, 0, 0, 0.5)]">
      {/* First Category   */}
      <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <h2 className='font-bold' > Filters </h2>
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent >
              <div className='p-2'onClick={()=>indoor(props)} >
              <Link href={'#'} >Indoor</Link>
              </div>
              <div className='p-2'onClick={()=>Outdoor(props)} >
              <Link href={'#'} >Outdoor</Link>
              </div>
              <div className='p-2' onClick={()=>Herbs(props)}>
              <Link href={'#'} >Herbs</Link>
              </div>
              <div className='p-2'onClick={()=>Rare(props)} >
              <Link href={'#'} >Rare and Exotic Plants</Link>
              </div>
              <div className='p-2' onClick={()=>Gifts(props)} >
              <Link href={'#'} >Gift Plants</Link>
              </div>
              <div className='p-2'onClick={()=>Accesories(props)} >
              <Link href={'#'} >Accessories</Link>
              </div>
              <div className='p-2'onClick={()=>navigate.push(`${props?`?page=${props}`:"/products"} `)} >
              <Link href={'#'} >Clear All</Link>
              </div>
            </AccordionContent>
          </AccordionItem>
      </Accordion>

      {/* Second Category   */}
      <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent >
            <RadioGroup defaultValue="" value={"value"}  onValueChange={priceHandler} >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="999" id="option-one" />
                <Label htmlFor="999">Below 999</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="999-1499" id="option-two" />
                <Label htmlFor="999-1499">999 - 1499</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1499-above" id="option-three" />
                <Label htmlFor="999-above">1499 or above</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clear" id="option-four" />
                <Label htmlFor="clear">Clear</Label>
              </div>
            </RadioGroup>
            </AccordionContent>
          </AccordionItem>
      </Accordion>
      </ScrollArea>

   

  )
}

export default filter