import Link from "next/link";

export default function Page () {
    return (
        <div>
            <p> Customer Page </p>
            <Link href="/dashboard/invoices">Go to Invoices</Link>
            <a href="/dashboard/invoices">Go to Invoices but worse</a>
        </div> 
    )
}