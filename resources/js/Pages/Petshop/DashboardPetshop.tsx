import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"

export default function DetailPetshop({ auth, tab }: PageProps<{ tab?: string }>) {

  const selected = "transactions";

  return (

    <>
      <Head title="HelloPets" />
      <Layout user={auth.user}>
        <div className="container lg:px-40 pb-20">
          <div className="flex justify-center mb-10">
            <div className="flex mt-10 items-center space-x-10 pb-5 px-40 border-b">
              <TabLink href={route("shop.dashboard", { tab: "transactions" })} text="Transactions" selected={tab ? tab == "transactions" : true} />
              <TabLink href={route("shop.dashboard", { tab: "review" })} text="Review" selected={tab ? tab == "review" : false} />
              {/* <div className="text-lg font-medium">Transactions</div>
                            <div className="text-lg ">Review</div> */}
            </div>
          </div>

          {
            tab == "review" ?
              <ReviewList />
              :
              <TransactionList />
          }
        </div>
      </Layout>
    </>
  )
}

const ReviewList = () => {
  return (

    <div className="space-y-5">
      <TransactionListItem />
    </div>
  )
}

const TransactionList = () => {
  return (

    <div className="space-y-5">
      <TransactionListItem />
      <TransactionListItem />
      <TransactionListItem />
      <TransactionListItem />
    </div>

  )
}

type TabLinkType = {
  selected?: boolean;
  text: string;
  href: string;
}

const TabLink = ({ selected, text, href }: TabLinkType) => {
  return (
    <Link href={href}>
      <div className={`text-lg font-medium ${selected ? 'text-white bg-primary-theme rounded py-1 px-3 ' : 'cursor-pointer'}`}>{text}</div>
    </Link>
  )
}

const TransactionListItem = () => {
  return (
    <Card className="rounded-md">
      <CardContent className="pt-6">
        <div className="flex space-x-10 items-start">

          <div className="w-1/6">
            <label htmlFor="" className="text-xs text-muted-foreground">Date Transaction</label>
            <p className="font-medium">No. 821IVAOI123</p>
          </div>
          <div className="flex-1">
            <label htmlFor="" className="text-xs text-muted-foreground">Customer Name</label>
            <p className="font-medium">Daniel Abraham</p>
          </div>
          <div className="w-28">
            <label htmlFor="" className="text-xs text-muted-foreground">Pet</label>
            <div className="flex ">
              <div className="px-2 rounded bg-primary-theme text-white font-medium">Dog</div>
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-xs text-muted-foreground">Date Reserve</label>
            <p className="font-medium">14 Feb 2024 - 17 Feb 2024</p>
          </div>
          <div className="w-32">
            <label htmlFor="" className="text-xs text-muted-foreground">Status</label>
            <p className="font-medium text-primary-theme">Under Care</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}