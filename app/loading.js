"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    const [progress, setProgress] = useState(10)

    useEffect(() => {
    const timer1 = setTimeout(() => setProgress(33), 100);
    const timer2 = setTimeout(() => setProgress(66), 500);
    const timer3 = setTimeout(() => setProgress(99), 800);

    // Clear timeouts to prevent memory leaks
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
    },[] )
  return (
    <div>
      <div
      className="flex items-center justify-center h-screen w-6/12 m-auto">
            <SkeletonDemo />
        </div>
        </div>
        )
}

export default Loading

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4 ">
      <Skeleton className="h-12 w-12 rounded-full bg-primary" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]  bg-primary" />
        <Skeleton className="h-4 w-[200px] bg-primary" />
      </div>
    </div>
  )
}