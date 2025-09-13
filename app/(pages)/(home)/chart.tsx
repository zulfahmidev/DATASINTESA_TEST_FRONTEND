"use client";

import { getGraph } from "@/service/graph";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type DataPoint = {
    resultTime: string;
    availability: number;
};

export default function Chart() {
    const [data, setData] = useState<DataPoint[]>([])
    const params = useSearchParams()

    async function loadGraphData() {
        const response = await getGraph(
            params.get("startDate") || '', 
            params.get("endDate") || '', 
            params.get("enodebId") || '', 
            params.get("cellId") || ''
        )

        if (response.status < 300) {
            let data = response.body as DataPoint[]
            data = groupByDate(data)
            setData(data)
        }
    }

    useEffect(() => {
        loadGraphData()
    }, [])

    const labels = data.map((d) => new Date(d.resultTime).toUTCString());

    const chartData = {
        labels,
        datasets: [
            {
                label: "Availability",
                data: data.map((d) => d.availability),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Availability Over Time",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    return (
        <Line data={chartData} options={options} />
    );
}

function groupByDate(data: DataPoint[]) {
  const map = new Map<string, { total: number; count: number }>();

  data.forEach((d) => {
    const time = new Date(d.resultTime).toLocaleString();
    if (!map.has(time)) {
      map.set(time, { total: d.availability, count: 1 });
    } else {
      const current = map.get(time)!;
      map.set(time, { total: current.total + d.availability, count: current.count + 1 });
    }
  });

  const grouped = Array.from(map.entries()).map(([time, { total, count }]) => ({
    resultTime: time,
    availability: total / count,
  }));

  grouped.sort((a, b) => new Date(a.resultTime).getTime() - new Date(b.resultTime).getTime());

  return grouped;
}