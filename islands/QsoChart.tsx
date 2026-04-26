import { useEffect, useRef } from "preact/hooks";
import { createChart, ColorType, IChartApi } from "lightweight-charts";

export default function QsoChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#666",
      },
      grid: {
        vertLines: { color: "rgba(197, 203, 206, 0.2)" },
        horzLines: { color: "rgba(197, 203, 206, 0.2)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: "#570df8", // Primary color
      topColor: "rgba(87, 13, 248, 0.4)",
      bottomColor: "rgba(87, 13, 248, 0.0)",
      lineWidth: 2,
    });

    const fetchData = async () => {
      try {
        const res = await fetch("/api/stats/qso_time");
        const data = await res.json();
        if (data && data.length > 0) {
          areaSeries.setData(data);
        }
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
      }
    };

    fetchData();
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 w-full mt-8">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold mb-2">QSO Activity Over Time</h2>
        <div ref={chartContainerRef} className="w-full h-[300px]" />
      </div>
    </div>
  );
}
