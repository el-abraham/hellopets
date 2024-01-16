import { Button } from "@/Components/ui/button";
import { CalendarIcon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import { Input } from "@/Components/ui/input";
import { Fragment, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { PageProps } from "@/types";


export default function DetailPetshop({ shop, galleries, products }: PageProps<{ shop: any, galleries: any[], products: any[] }>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <div className="container lg:px-40 mt-10">
      <section className="grid grid-rows-2 grid-cols-4 gap-4 h-[400px]">
        {
          galleries.map((gallery, index) => {
            if (index == 0) {
              return (
                <img key={Date.now() + index} src={gallery.path} className="col-span-2 rounded-lg row-span-2 h-full w-full object-cover border" />
              )

            }

            if (index >= 5) {
              return <Fragment key={Date.now() + index}></Fragment>
            }
            return (
              <img key={Date.now() + index} src={gallery.path} className="h-full w-full object-cover rounded-lg border" />

            )
          })
        }
      </section>
      <div className="flex relative mt-10 justify-between">
        <div className="w-7/12 relative">
          <ShopHeader name={shop.name} />
          <div className="mt-10" />
          <PetIcons />
          <div className="mt-20" />
          <ShopAbout description={shop.description} />
          <div className="mt-20" />
          <ShopFacilities />
          <div className="mt-20" />
        </div>

        <div className="w-4/12 rounded-xl self-start border p-8">
          <Select>
            <SelectTrigger className="w-full h-12 text-md font-semibold">
              <SelectValue placeholder="Select a pet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="rabbit">Rabbit</SelectItem>
              <SelectItem value="bird">Bird</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-5" />
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full text-md font-semibold h-12 justify-start text-left",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="mt-8" />

          <Button className="w-full h-12 text-md"> Chat</Button>
          <div className="mt-2" />
          <Button className="w-full text-md font-bold h-12"> Reserve</Button>

        </div>

      </div>
    </div>
  )
}

type ShopHeaderType = {
  name: string,
  rating?: string
}

const ShopHeader = ({ name, rating }: ShopHeaderType) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <div className="flex items-center font-semibold space-x-1">
        <StarFilledIcon className="w-4 h-4" />
        <span>{rating ?? 4.5}</span>
      </div>
    </div>


  )
}

type ShopAboutType = {
  description: string
}

const ShopAbout = ({ description }: ShopAboutType) => {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-2xl">About this place</h2>
      <p className="text-justify">{description}</p>
    </div>
  )
}


const ShopFacilities = () => {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-2xl">Facilities</h2>

      <ul className="grid grid-cols-2 w-full gap-5">
        <FacilityItem />
        <FacilityItem />
        <FacilityItem />
        <FacilityItem />
        <FacilityItem />
      </ul>
    </div>
  )
}

const FacilityItem = () => {
  return (
    <li className="flex items-center space-x-4">
      <div className="h-10 w-10 rounded bg-slate-100"></div>
      <span>Fasilitas 1</span>
    </li>
  )
}

const PetIcon = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 border rounded">

      </div>
      <span className="font-semibold">Dogs</span>
    </div>
  )
}

const PetIcons = () => {
  return (
    <div className="flex w-full justify-between">
      <PetIcon />
      <PetIcon />
      <PetIcon />
      <PetIcon />
      <PetIcon />
    </div>
  )
}