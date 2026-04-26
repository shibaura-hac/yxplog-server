import { Navbar } from "../../components/Navbar.tsx";
import ContestManager from "../../islands/ContestManager.tsx";

export default function ContestsPage() {
  // We need to pass dummy values for Navbar if we want it to look consistent, 
  // but for the contests page, operator info might not be needed.
  // Let's just render it with empty defaults for now.
  return (
    <>
      <Navbar operator="" onOperatorChange={() => {}} isError={false} />
      <div className="pt-20">
        <ContestManager />
      </div>
    </>
  );
}
