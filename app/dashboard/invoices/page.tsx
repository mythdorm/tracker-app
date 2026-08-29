import Link from "next/link";

export default function Page () {
    return (
        <div>
            <p> Invoices Page </p>
            <Link href="/dashboard/customers">Go to Customers</Link>
            <a href="/dashboard/customers">Go to Customers but worse</a>
        </div> 
    )
}