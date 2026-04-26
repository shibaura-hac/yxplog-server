import { Navbar } from "../../components/Navbar.tsx";
import StatusView from "../../islands/StatusView.tsx";
import QsoChart from "../../islands/QsoChart.tsx";

export default function StatusPage() {
  return (
    <>
      <Navbar operator="" onOperatorChange={() => {}} isError={false} isContestMode={false} onContestModeChange={() => {}} />
      <div className="pt-24 px-8 max-w-6xl mx-auto pb-12">
        <h1 className="text-3xl font-bold mb-8">Server Status</h1>
        <StatusView />
        <QsoChart />
      </div>
    </>
  );
}
