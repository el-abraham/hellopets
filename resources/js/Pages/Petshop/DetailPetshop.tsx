import { Button } from "@/Components/ui/button";
import { CalendarIcon, Component1Icon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"

import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import { Input } from "@/Components/ui/input";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Gallery, PageProps, Product, Review, Shop } from "@/types";
import { Head, router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";




export default function DetailPetshop({ shop, galleries, products, auth, reviews }: PageProps<{ shop: Shop, galleries: Gallery[], products: Product[], reviews: Review[] }>) {

  return (
    <>

      <Head title="HelloPets" />
      <Layout user={auth.user}>
        <div className="container lg:px-20 xl:px-40 mt-10 pb-10">
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
              <ShopHeader name={shop.name} rating={(reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1).toString()} />
              <div className="mt-10" />
              <PetIcons pets={products} />
              <div className="mt-20" />
              <ShopAbout description={shop.description} />
              <div className="mt-20" />
              <ShopFacilities facilities={shop.facilities} />
              <div className="mt-20" />
              <ShopInfo address={shop.alamat} telp={shop.no_telp} />
              <div className="mt-20" />
            </div>
            <OrderSection shopId={shop.id} className="w-4/12 rounded-xl self-start border p-8" products={products} />

          </div>
          <ShopReviews reviews={reviews} />
        </div>
      </Layout>

    </>
  )
}

type OrderSectionType = {
  shopId: number,
  className?: string,
  products: Product[]
}

const OrderSection = ({ products, className, shopId }: OrderSectionType) => {
  const [date, setDate] = useState<DateRange | undefined>()
  const [selectedPet, setSelectedPet] = useState('');

  const onSelectPet = (value: string) => {
    // console.log(products.find(val => val.id == Number(value))!.name)
    // setSelectedPet(products.find(val => val.id == Number(value))!.name)
    setSelectedPet(value)
  }

  const postReserve = useCallback(() => {
    router.post('/shop-transaction', {
      shopId,
      productId: selectedPet,
      date
    }, { forceFormData: true })
  }, [selectedPet, date])

  // useEffect(() => {
  //   console.log(date)
  // }, [date])

  return (
    <div className={`${className ?? ''}`}>
      <Select value={selectedPet} onValueChange={onSelectPet}>
        <SelectTrigger className="w-full h-12 text-sm font-semibold">
          <SelectValue placeholder="Select a pet" />
        </SelectTrigger>
        <SelectContent>
          {
            products.map((product, index) => {
              const key = Date.now() + index
              return <SelectItem key={key} value={product.id.toString()}>{product.name}</SelectItem>
            })
          }
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
                "w-full text-sm font-semibold h-12 justify-start text-left",
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
              disabled={(dt) => dt < new Date(Date.now() - (24 * 60 * 60 * 1000))}
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

      <Dialog>
        <DialogTrigger className="w-full text-white bg-primary-theme rounded-md text-md font-bold h-12">Reserve</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
              <Button onClick={postReserve}>Oke</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

type ShopInfoType = {
  address: string;
  telp: string
}

const ShopInfo = ({ address, telp }: ShopInfoType) => {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-2xl">Info</h2>

      <div className="flex">
        <p className="w-20">No. Telp : </p>
        <p className="font-medium">+62 {telp} </p>
      </div>

      <div className="flex">
        <p className="w-20">Address : </p>
        <p className="font-medium">{address} </p>
      </div>
    </div>

  )
}

type ShopReviewsType = {
  reviews: Review[]
}


const ShopReviews = ({ reviews }: ShopReviewsType) => {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-2xl text-center">Rating & Reviews</h2>

      <div className="grid grid-cols-2 w-full gap-5">
        {
          reviews.length != 0 ?
            reviews.map((review, index) => {
              const key = Date.now() + index;
              return (
                <Card key={key}>
                  <CardHeader className="pb-2">
                    <CardTitle>{review.user?.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      {/* <span>Rating : </span> */}
                      <StarIcon />
                      <span>{review.rating}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <p>{review.description}</p>
                  </CardContent>
                </Card>

              )
            }) :
            <div className="text-center text-lg opacity-70">Reviews not found</div>
        }
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
        {
          rating ?
            <>
              <StarFilledIcon className="w-4 h-4" />
              <span>{rating}</span>
            </>

            : <></>
        }
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

type ShopFacilitiesType = {
  facilities: string[]
}

const ShopFacilities = ({ facilities }: ShopFacilitiesType) => {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-2xl">Facilities</h2>

      <ul className="grid grid-cols-2 w-full gap-5">
        {
          facilities.map((facility, index) => {
            const key = Date.now() + index;
            return <FacilityItem key={key} name={capitalizeFirstLetter(facility)} />
          })
        }
      </ul>
    </div>
  )
}

type FacilityItemType = {
  name: string
}

const FacilityItem = ({ name }: FacilityItemType) => {
  return (
    <li className="flex items-center space-x-4">
      {/* <div className="h-10 w-10 rounded bg-slate-100"></div> */}
      <Component1Icon />
      <span>{name}</span>
    </li>
  )
}

type PetIconType = {
  name: string
}

const PetIcon = ({ name }: PetIconType) => {
  return (
    <div className="flex flex-col items-center">
      <div className="px-3 py-1.5 border rounded">
        <span className="font-semibold">{name}</span>

      </div>
    </div>
  )
}

type PetIconsType = {
  pets: Product[]
}

const PetIcons = ({ pets }: PetIconsType) => {
  return (
    <div className="grid w-full grid-cols-5 place-content-center">
      {
        pets.map((pet, index) => {
          const key = Date.now() + index;
          return <PetIcon key={key} name={pet.name} />
        })
      }
    </div>
  )
}