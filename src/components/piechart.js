import { PieChart } from "react-minimal-pie-chart";
import { useState, useContext } from "react";
import { BudgetContext } from "../context/budgetContext";

const PieChartContainer = () => {
  const [rotate, setRotate] = useState(false);
  const { budget, updateBudget } = useContext(BudgetContext);
  const myNewData = [
    { title: "Dogs", value: 90, color: "red" },
    { title: "Cats", value: 50, color: "purple" },
    { title: "Dragons", value: 20, color: "blue" }
  ];
  const triggerAnimation = () => {
    setRotate(true);
    updateBudget(myNewData);
  };

  return (
    <>
      <button onClick={() => triggerAnimation()}>new section</button>
      <div
        className={rotate && "rotate"}
        style={{ display: "flex", placeItems: "center" }}
        onAnimationEnd={() => setRotate(false)}
      >
        {/* <PieChart
          // your data
          data={budget}
          // width and height of the view box
          viewBoxSize={[100, 100]}
        /> */}
      </div>
    </>
  );
};

export default PieChartContainer;
