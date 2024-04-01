import { 
  useContext, 
  useEffect, 
  useState 
} from "react";

import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_heatmap from 'highcharts/modules/heatmap';
import {
  Box,
  Paper,
  TableContainer,
} from "@mui/material";


import { MapDataContext } from '../../providers/MapDataContext';
import { MapDataProps } from "../../providers/MapDataContext.props";

HC_heatmap(Highcharts);


export const HighchartsWidget = () => {
  const sourceContext:MapDataProps = useContext(MapDataContext);
  
  const [options, setOptions] = useState<Options>({
    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
        backgroundColor: '#121212', 
        style: {
          color: '#ffffff'
        }
    },
  
  
    title: {
        text: '',
        style: {
            color: '#ffffff',
            fontSize: '1em'
        },
        verticalAlign: 'bottom'
    },
  
    xAxis: {
        opposite: true,
        categories: [],
        labels: {
          style: {
            color: '#ffffff'
          },
        }
    },
  
    yAxis: {
        categories: [],
        labels: {
          style: {
            color: '#ffffff',
            opacity: 1
          }
        },
        reversed: false,
        title: undefined
    },
  
    accessibility: {
        point: {
            descriptionFormat: '{(add index 1)}. ' +
                '{series.xAxis.categories.(x)} sales ' +
                '{series.yAxis.categories.(y)}, {value}.'
        }
    },
  
    colorAxis: {
        minColor: '#FFFFFF',
        maxColor: '#FF0000',
        labels: {
          style: {
            color: '#ffffff'
          }
        },
        reversed: false
    },
  
    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        itemMarginTop: 35,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280,
    },
    series: [{
        name: '',
        type: 'heatmap',
        borderWidth: 0.2,
        borderColor: '#ffffff',
        data: [],
        dataLabels: {
            enabled: false
        }
    }],
  
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: {
                    labels: {
                        format: '{substr value 0 1}'
                    }
                }
            }
        }]
    }
  });

  useEffect(() => {
    if (options && options.series && options.series.length > 0 && sourceContext.tableData) {
      const updatedOptions = JSON.parse(JSON.stringify(options));
      updatedOptions.series[0].data = sourceContext.tableData;
      updatedOptions.xAxis.categories = sourceContext.xAxisHeaders;
      updatedOptions.yAxis.categories = sourceContext.yAxisHeaders;
      updatedOptions.title = sourceContext.tableType + " HeatMap";
      console.log(sourceContext.yAxisHeaders);
      setOptions(updatedOptions);
    }
  }, [sourceContext])
  return (
    <Box>
      <TableContainer component={Paper}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </TableContainer>
    </Box>
  );
};
