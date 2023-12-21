import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

async function Page() {
    const session = await getServerSession(options);
   
    return (
        <>
            <h1>Memebers only</h1>         
            <Link href="/">Home</Link>
            <article>
                <span>{`id: ${session?.user?.id}`}</span>
                <span>{`name: ${session?.user?.name}`}</span>
                <span>{`email: ${session?.user?.email}`}</span>
            </article>
        </>
    )
}

export default Page;