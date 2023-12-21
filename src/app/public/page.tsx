import React from 'react'
import Link from 'next/link';

function Page() {
    return (
        <>
            <h1>public page that everyone can see</h1>
            <Link href="/">Home</Link>
        </>
    )
}

export default Page;