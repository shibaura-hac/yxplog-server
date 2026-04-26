import { Navbar } from "../../components/Navbar.tsx";
import SettingsForm from "../../islands/SettingsForm.tsx";

export default function SettingsPage() {
  return (
    <>
      <Navbar operator="" onOperatorChange={() => {}} isError={false} isContestMode={false} onContestModeChange={() => {}} />
      <div className="pt-24 px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Settings</h1>
        <SettingsForm />
      </div>
    </>
  );
}
