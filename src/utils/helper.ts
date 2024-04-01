import { HeatmapProps } from "../widgets"

const getMapContextData = (sourceData: HeatmapProps) => {
    const yAxis:string[] = sourceData.tableHeaders.slice(1, sourceData.tableHeaders.length);
    const xAxis:string[] = sourceData.tableData.map(item => String(item[0]));
    const tableData:Array<Array<number>> = [];
    sourceData.tableData.forEach((item, index1) => {
        item.slice(1, item.length).forEach(
        (data, index2) => {
            tableData.push([index1, index2, (+data)]);
        })
    })
    
    return {
        xAxisHeaders: xAxis,
        yAxisHeaders: yAxis,
        tableData: tableData,
        tableType: sourceData.tableHeaders[0]
    }
}

const getColor = (tableData: (number)[][], value: number) => {
    const dataList = tableData.flat();
    const minData = Math.min(...dataList) < 0 ? Math.min(...dataList) : 0;
    const maxData = Math.max(...dataList);
    const ratio = 1 - (value - minData) / (maxData - minData);
    const greenBlueHex = Math.floor(ratio * 255);
    return `rgb(255, ${greenBlueHex}, ${greenBlueHex})`;
}

export {
    getMapContextData,
    getColor
};
