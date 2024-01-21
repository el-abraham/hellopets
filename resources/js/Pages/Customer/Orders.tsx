import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import Layout from "@/Layouts/Layout";
import { PageProps, Transaction } from "@/types";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Textarea } from "@/Components/ui/textarea";


export default function Orders({ auth, orders }: PageProps<{ orders: Transaction[] }>) {
  console.log(orders)
  return (

    <>
      <Head title="HelloPets" />
      <Layout user={auth.user}>
        <div className="container lg:px-40 pb-20">
          <div className="flex justify-center mb-10">
            <div className="flex mt-10 items-center space-x-10 pb-5 px-40 border-b">
              <div className={`text-xl font-semibold  text-primary-theme rounded py-1 px-3 `}>My Orders</div>
            </div>
          </div>

          < div className="space-y-5" >
            {
              orders?.length ?
                orders.map((order, index) => {
                  const key = Date.now() + index
                  return <OrderListItem order={order} key={key} />
                })
                :
                <div className="text-center text-lg opacity-70">not found</div>
            }
          </div >
        </div>
      </Layout>
    </>
  )
}

type OrderListItemType = {
  order: Transaction
}

const OrderListItem = ({ order }: OrderListItemType) => {

  function displayDateFromString(dts: string) {
    const date = new Date(dts)
    return format(date, "LLL dd, y HH:mm")
  }

  function displayDateFromUnix(unix: number) {
    const date = new Date(unix)
    return format(date, "LLL dd, y")
  }

  return (
    <Card className="rounded-md">
      <CardContent className="pt-6">
        <div className="flex space-x-10 items-start">

          <div className="w-1/5">
            <label htmlFor="" className="text-xs text-muted-foreground">{displayDateFromString(order.created_at)}</label>
            <p className="font-medium">{order.no_invoice}</p>
          </div>
          <div className="w-1/6">
            <label htmlFor="" className="text-xs text-muted-foreground">Pet House</label>
            <p className="font-medium">{order.shop?.name}</p>
          </div>
          <div className="w-28">
            <label htmlFor="" className="text-xs text-muted-foreground">Pet</label>
            <div className="flex ">
              <div className="px-2 rounded bg-primary-theme text-white font-medium">{order.product?.name}</div>
            </div>
          </div>
          <div className="w-52">
            <label htmlFor="" className="text-xs text-muted-foreground">Date Reserve</label>
            <p className="font-medium">{displayDateFromUnix(order.from_date)} {order.to_date ? " - " + displayDateFromUnix(order.to_date) : ''} </p>
          </div>
          {/* <div className="w-32">
            <label htmlFor="" className="text-xs text-muted-foreground">Status</label>
            <p className="font-medium text-primary-theme">Under Care</p>
          </div> */}
          <div className=" h-12 flex justify-center items-end">
            <Dialog>
              <DialogTrigger>
                <Button>Give a review</Button>

              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Give a review</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm">Rating</label>
                    <RatingStartComponent />
                  </div>
                  <Textarea rows={5} className="resize-none rounded" placeholder="type your review"></Textarea>

                </div>

                <div className="w-full flex justify-end">
                  <Button>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const RatingStartComponent = () => {

  const [rating, setRating] = useState(0)

  const ratingHandle = (index: number) => {
    setRating(index + 1)
  }

  const Start = ({ selected, index }: { selected?: boolean, index: number }) => {
    return (
      <div className="cursor-pointer" onClick={() => ratingHandle(index)}>
        {
          selected ? <StarFilledIcon className="w-5 h-5 text-orange-300" /> : <StarIcon className="w-5 h-5" />
        }
      </div>
    )
  }


  return (
    <div className="flex">
      {
        Array.from({ length: 5 }, (_, idx) => {
          const key = Date.now() + idx;
          return <Start key={key} index={idx} selected={idx + 1 <= rating} />;
        })
      }
    </div>
  )
}