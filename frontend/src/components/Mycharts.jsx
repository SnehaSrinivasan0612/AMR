import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import "../assets/mycharts.css";
import "../assets/kpicard.css"
import { useUserStore } from "../store/user.js";
import getMonthlyData from "../data/LineChartDataSetter.js";
import sourceData from "../data/sourceData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const Mycharts = () => {
  const values = useUserStore((state) => state.values);
  console.log('Raw values from store:', values);
  
  const monthlyData = getMonthlyData(values);
  console.log('Processed monthly data:', monthlyData);
  
  const labelsArr = monthlyData.map((data) => data.label);
  const amountArr = monthlyData.map((data) => data.amount);
  console.log('Labels array:', labelsArr);
  console.log('Amounts array:', amountArr);

  if (!values || values.length === 0) {
    return (
      <div className="Mycharts">
        <div className="dataCard revenueCard">
          <p>No bill data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="Mycharts">
      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: labelsArr,
            datasets: [
              {
                label: "Amount (in Rupees)",
                data: amountArr,
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              }
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Energy Bill",
                font: {
                  size: 16
                }
              },
              legend: {
                position: 'top',
                labels: {
                  font: {
                    size: 12
                  }
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  maxRotation: 45,
                  minRotation: 45,
                  font: {
                    size: 11
                  }
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    size: 11
                  }
                }
              }
            }
          }}
        />
      </div>

      <div className="dataCard customerCard">
      <Doughnut
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(75,192,192,255)",
                  "rgba(153,102,255,255)"
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(75,192,192,255)",
                  "rgba(153,102,255,255)"
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Bill Splitup",
              },
            },
          }}
        />
      </div>

      <div className="dataCard categoryCard" style={{padding:"0em"}}>
          <div className="card">
            <h3 className="card-title">Cost per Unit</h3>
            <p className="card-subtitle">In Rupees</p>
            <div className="card-content">
              <span className="card-cost">3.15</span>
              <span className="card-unit"> rs/unit</span>
            </div>
            <div className="card-trend">
              <span className="card-trend-icon">↑</span>
              <p className="card-trend-text">0.03rs from last month</p>
            </div>
          </div>
      </div>
    </div>
  );
};