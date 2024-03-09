import Image from "next/image";
import { Inter } from "next/font/google";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import DatePicker from "@/components/DatePicker";

const inter = Inter({ subsets: ["latin"] });

interface RangeDate { 
  startDate: Date
  endDate: Date
}

export default function Home() {

  const [value, setValue] = useState<DateValueType>(null); 
    
    const handleValueChange = (newValue: DateValueType) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
    } 

  return (
    <>
      Home
    </>
    
  );
}
