import { PieChart, PieValueType } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { Recipe } from "../../models/Recipe";
import "./chart.css";

type Props = {
  recipes: Recipe[];
};

const Chart: React.FC<Props> = ({ recipes }) => {
  const [recipesChartData, setRecipesChartData] = useState<PieValueType[]>([]);
  useEffect(() => {
    const authorsCount: Record<string, number> = {};
    // console.log(recipes);

    recipes.forEach((recipe) => {
      console.log(recipe.author);

      if (authorsCount[recipe.author.id]) {
        authorsCount[recipe.author.id]++;
      } else {
        authorsCount[recipe.author.id] = 1;
      }
    });

    const chartData: PieValueType[] = [];
    for (const key in authorsCount) {
      chartData.push({ id: key, value: authorsCount[key], label: key });
    }

    setRecipesChartData(chartData);
  }, [recipes]);

  return (
    <center className="chart-container">
      <h1>The number of recipes added by each author</h1>
      <PieChart
        series={[
          {
            data: recipesChartData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={1200}
        height={400}
      />
    </center>
  );
};

export default Chart;
