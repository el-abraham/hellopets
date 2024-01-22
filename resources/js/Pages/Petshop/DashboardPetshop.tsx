import Layout from "@/Layouts/Layout";
import { PageProps, Product, User, Transaction, Review } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { StarIcon } from "@radix-ui/react-icons";


export default function DetailPetshop({ auth, tab, transactions, reviews }: PageProps<{ tab?: string, transactions: Transaction[], reviews: Review[] }>) {

  return (

    <>
      <Head title="HelloPets" />
      <Layout user={auth.user}>
        <div className="pb-20">

          <div className="container lg:px-40 ">
            <div className="flex justify-center mb-10">
              <div className="flex mt-10 items-center space-x-10 pb-5 px-40 border-b">
                <TabLink href={route("shop.dashboard", { tab: "transactions" })} text="Transactions" selected={tab ? tab == "transactions" : true} />
                <TabLink href={route("shop.dashboard", { tab: "review" })} text="Review" selected={tab ? tab == "review" : false} />
                {/* <div className="text-lg font-medium">Transactions</div>
                            <div className="text-lg ">Review</div> */}
              </div>
            </div>

          </div>
          {
            tab == "review" ?
              <ReviewList reviews={reviews} />
              :
              <TransactionList transactions={transactions} />
          }
        </div>
      </Layout>
    </>
  )
}

type ReviewListType = {
  reviews: Review[]
}

const ReviewList = ({ reviews }: ReviewListType) => {
  return (

    <div className="space-y-5 grid grid-cols-2 max-w-full">
      {
        reviews.length ?
          reviews.map((review, index) => {
            const key = Date.now() + index
            return (

              <Card key={key} className="w-full">
                <CardHeader className="pb-2">
                  <CardTitle>{review.user?.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <StarIcon />
                    <span>{review.rating}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <p>{review.description}</p>
                </CardContent>
              </Card>
            )
          })
          :
          <div className="text-center text-lg opacity-70">Reviews not found</div>
      }
    </div>
  )
}

type TransactionListType = {
  transactions: Transaction[]
}

const TransactionList = ({ transactions }: TransactionListType) => {
  console.log(transactions)
  return (
    < div className="space-y-5" >
      {
        transactions.length ?
          transactions.map((transaction, index) => {
            const key = Date.now() + index
            return <TransactionListItem transaction={transaction} key={key} />
          })
          :
          <div className="text-center text-lg opacity-70">Transaction not found</div>
      }
    </div >

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

type TransactionListItemType = {
  transaction: Transaction
}

const TransactionListItem = ({ transaction }: TransactionListItemType) => {

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

          <div className="w-1/6">
            <label htmlFor="" className="text-xs text-muted-foreground">{displayDateFromString(transaction.created_at)}</label>
            <p className="font-medium">{transaction.no_invoice}</p>
          </div>
          <div className="flex-1">
            <label htmlFor="" className="text-xs text-muted-foreground">Customer Name</label>
            <p className="font-medium">{transaction.user?.name}</p>
          </div>
          <div className="w-28">
            <label htmlFor="" className="text-xs text-muted-foreground">Pet</label>
            <div className="flex ">
              <div className="px-2 rounded bg-primary-theme text-white font-medium">{transaction.product?.name}</div>
            </div>
          </div>
          <div className="w-52">
            <label htmlFor="" className="text-xs text-muted-foreground">Date Reserve</label>
            <p className="font-medium">{displayDateFromUnix(transaction.from_date)} {transaction.to_date ? " - " + displayDateFromUnix(transaction.to_date) : ''} </p>
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