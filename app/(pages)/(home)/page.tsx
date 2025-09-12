import Chart from "./chart";
import FilterForm from "./filter-form";

export default async function Home() {

  return (
    <div className="lg:grid grid-cols-3 gap-3">
      <div className="col-span-1">
        <div className="bg-white p-5 rounded-lg h-full border border-slate-200">
          <h2 className="text-slate-700 text-lg font-semibold">Filter</h2>
          <FilterForm />
        </div>
      </div>
      <div className="col-span-2 mt-3 lg:mt-0">
        <div className="bg-white p-5 rounded-lg h-full border border-slate-200">
          <Chart />
        </div>
      </div>
    </div>
  );
}
