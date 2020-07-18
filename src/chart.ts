import * as fs from "fs";
import { Report } from "./report";
import { CanvasRenderService, ChartJsFactory } from "chartjs-node-canvas";
import { Chart, ChartConfiguration } from "chart.js";
import { Data } from "./data";

const width = 400;
const height = 400;

export async function renderSeverity(report: Report, fileName: string) {
    const fatalCount = report.severity.get("fatal") ?? 0;
    const errorCount = report.severity.get("error") ?? 0;
    const warningCount = report.severity.get("warning") ?? 0;

    const chartJsFactory: ChartJsFactory = () => Chart;
    const canvasRenderService = new CanvasRenderService(width, height, () => {}, undefined, chartJsFactory);
    const configuration: ChartConfiguration = {
        type: "bar",
        data: {
            labels: ["Warning", "Error", "Fatal"],
            datasets: [
                {
                    data: [warningCount, errorCount, fatalCount],
                    backgroundColor: ["rgba(0, 128, 0, 0.2)", "rgba(255, 0, 0, 0.2)", "rgba(128, 0, 0, 0.2)"],
                    borderColor: ["rgba(0, 128, 0, 1)", "rgba(255, 0, 0, 1)", "rgba(128, 0, 0, 1)"],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            title: {
                display: true,
                fontSize: 18,
                text: "Severity",
            },
            legend: {
                display: false,
            },
        },
    };
    const image = await canvasRenderService.renderToBuffer(configuration);
    fs.writeFileSync(fileName, image);
}

export async function renderPriority(report: Report, fileName: string) {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const values = keys.map((x) => report.priority.get(x) ?? 0);

    const chartJsFactory: ChartJsFactory = () => Chart;
    const canvasRenderService = new CanvasRenderService(width, height, () => {}, undefined, chartJsFactory);
    const configuration: ChartConfiguration = {
        type: "bar",
        data: {
            labels: keys,
            datasets: [
                {
                    data: values,
                    backgroundColor: "rgba(187, 143, 206, 0.2)",
                    borderColor: "rgba(187, 143, 206, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            title: {
                display: true,
                fontSize: 18,
                text: "Priority",
            },
            legend: {
                display: false,
            },
        },
    };
    const image = await canvasRenderService.renderToBuffer(configuration);
    fs.writeFileSync(fileName, image);
}

export async function renderData(data: Data[], fileName: string) {
    const takeData = data.slice(0 <= data.length - 10 ? data.length - 10 : 0, data.length);
    const labels = data.map((x) => x.date);

    const chartJsFactory: ChartJsFactory = () => Chart;
    const canvasRenderService = new CanvasRenderService(width, height, () => {}, undefined, chartJsFactory);
    const configuration: ChartConfiguration = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "All",
                    borderColor: "rgba(35, 87, 177, 1)",
                    backgroundColor: "rgba(35, 87, 177, 0.2)",
                    lineTension: 0,
                    data: takeData.map((x) => x.all),
                },
                {
                    label: "Warning",
                    borderColor: "rgba(0, 128, 0, 1)",
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    lineTension: 0,
                    data: takeData.map((x) => x.warning),
                },
                {
                    label: "Error",
                    borderColor: "rgba(255, 0, 0, 1)",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    lineTension: 0,
                    data: takeData.map((x) => x.error),
                },
                {
                    label: "Fatal",
                    borderColor: "rgba(128, 0, 0, 1)",
                    backgroundColor: "rgba(128, 0, 0, 0.2)",
                    lineTension: 0,
                    data: takeData.map((x) => x.fatal),
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            title: {
                display: true,
                fontSize: 18,
                text: "Transition",
            },
        },
    };
    const image = await canvasRenderService.renderToBuffer(configuration);
    fs.writeFileSync(fileName, image);
}
