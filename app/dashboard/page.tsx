import { lusitana } from "../ui/fonts";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "../ui/dashboard/latest-invoices";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "../lib/data";
import { Card } from "../ui/dashboard/cards";
export default async function Page() {

    //a scenario of request waterfall exists here
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
    // someone must be calling this async function Page externally, that external function might not be async and will execute
    // other lines of code
    // fetchRevenue is executed in first tick, now wait for it
    // next tick, fetchLatestInvoices is executed. Till the time revenue fetch call is not complete, 
    // next line of code is not executed.
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
    const {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
      } = await fetchCardData(); // wait for fetchLatestInvoices() to finish


      
    return (
        <main>
          <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Dashboard
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Collected" value={totalPaidInvoices} type="collected" />
            <Card title="Pending" value={totalPendingInvoices} type="pending" />
            <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
            <Card
              title="Total Customers"
              value={numberOfCustomers}
              type="customers"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <RevenueChart revenue={revenue}  />
            <LatestInvoices latestInvoices={latestInvoices} />
          </div>
        </main>
      );
}