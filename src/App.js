import "./styles.css";
import { db } from "./utils/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import BudgetProvider from "./context/budgetContext";
import PieChartContainer from "./components/piechart";
import NewBudgetForm from "./components/newBudget";
import NewSectionForm from "./components/newSection";
import BudgetOverview from "./components/budgetOverview";
import SectionList from "./components/sections";
import { Route, Routes, Router, Navigate } from "react-router-dom";

export default function App() {
  const createBudget = async (note) => {
    await setDoc(doc(db, "budgets", note.name), note);
  };

  const createSection = async (note) => {
    await addDoc(collection(db, "budgets", "demoBudget", "sections"), note);
  };
  const demoBudget = {
    name: "demoBudget",
    user: "me"
  };

  const demoSection = {
    name: "demoSection",
    user: "me"
  };

  return (
    //       <Router>

    //       <Route path="/home">
    //       <BudgetOverview />
    //       </Route>

    //     </Router>
    //         <PieChartContainer />
    //         <NewBudgetForm />
    //         <NewSectionForm />
    //         <SectionList />
    <BudgetProvider>
      <Routes>
        <Route path="/" element={<BudgetOverview />} />
        <Route path="/budget" element={<SectionList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BudgetProvider>
  );
}
