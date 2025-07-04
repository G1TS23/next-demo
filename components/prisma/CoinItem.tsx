'use client';

import {Memecoin, User} from "@/app/generated/prisma";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {deleteMemecoin} from "@/lib/coinUtils";
import {ImageWithFallback} from "@/components/prisma/ImageWithFallbackProps";
import {Coins, User as UserIcon} from "lucide-react";

export function CoinItem({memecoin, user}: { memecoin: Memecoin, user: User | null }) {

    return (

        <Link href={`/prisma/coins/${memecoin.id}`}
              className={(memecoin.author.id === user.id ? 'bg-gray-100 ' : '')
                  + 'group/item flex items-center justify-between gap-4 w-10/12 mb-4 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*=\'text-\'])]:text-muted-foreground rounded-md p-2 transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*=\'size-\'])]:size-4'}
        >
            <ImageWithFallback
                src={memecoin.logoUrl}
                alt={memecoin.name}
                width={50}
                height={50}
                className="w-11 h-11 rounded-full shadow-sm object-cover border-2 border-gray-100 dark:border-gray-700"
            />
            <div data-test="memecoin" className="flex flex-col items-start justify-center w-96">
                <div data-test="memecoin-name" className="text-lg font-semibold w-full">{memecoin.name}</div>

                <div data-test="memecoin-symbol" className="flex gap-1 text-sm w-full"><Coins
                    className="w-6 h-6 text-blue-500"/>{memecoin.symbol}</div>
            </div>
            <span data-test="memecoin-author"
                  className="flex gap-1 text-sm text-gray-600 ml-2 w-32"><UserIcon
                className="w-6 h-6 text-green-500"/> {memecoin.author.id === user.id ? <b>Me</b> : memecoin.author.name}</span>
            {memecoin.author.id === user.id ?
                <Button className="group/edit invisible group-hover/item:visible ml-4" variant="destructive"
                        size="icon"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            deleteMemecoin(memecoin.id).then();
                        }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="white" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                    </svg>
                </Button>
                :
                <Button className="group/edit invisible ml-4" variant="destructive" size="icon"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="white" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                    </svg>
                </Button>
            }
        </Link>

    )
}