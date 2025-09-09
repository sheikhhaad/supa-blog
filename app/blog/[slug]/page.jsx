'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    let param = useParams()
    console.log(param.slug);
    
  return (
    <div>page</div>
  )
}

export default page