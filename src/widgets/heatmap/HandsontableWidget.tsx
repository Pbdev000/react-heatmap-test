import React, { 
  useRef, 
  useEffect, 
  useState, 
  useContext 
} from 'react';

import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/react';
import { Box, Paper } from '@mui/material';

import { MapDataProps } from '../../providers/MapDataContext.props';
import { MapDataContext } from '../../providers/MapDataContext';
import { getColor } from '../../utils/helper';

import 'handsontable/dist/handsontable.full.css';

export const HandsontableWidget: React.FC = () => {
  const hotTableRef = useRef<any>(null);
  const sourceContext:MapDataProps = useContext(MapDataContext);

  const [gridData, setGridData] = useState<number[][]>([]);
  
  useEffect(() => {
    const handleResize = () => {
      hotTableRef.current?.hotInstance.render();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const maxRow = sourceContext.xAxisHeaders?.length || 0;
    const maxCol = sourceContext.yAxisHeaders?.length || 0;
    const initData = Array.from({ length: maxRow }, () => new Array(maxCol).fill(0));
    if(sourceContext.tableData) {
      console.log(sourceContext.tableData);
      sourceContext.tableData.forEach((item) => {
        initData[item[0]][item[1]] = item[2];
        console.log(item, initData);
      });
      console.log(initData);
    }

    setGridData(initData);
  }, [sourceContext])

  const colorScale = (value: number): string => {
    return getColor(gridData, value);
  };

  const settings: Handsontable.GridSettings = {
    data: gridData,
    colHeaders: true,
    rowHeaders: true,
    colWidths: 100,
    rowHeights: 100,
    columns: gridData[0]?.map((_, index) => ({
      renderer: function (instance, td, row, col, prop, value) {
        // Apply the default text renderer
        Handsontable.renderers.TextRenderer.apply(this, arguments as any);

        // Apply color scale for data cells
        const numericValue = typeof value === 'number' ? value : parseFloat(value);
        td.style.backgroundColor = colorScale(numericValue);
        // td.style.color = 'transparent';
      }
    })),
  };
  return (
    <Box sx={{ width: '100%', height:'1000px', overflow: 'hidden' }}>
      <Paper>
        <HotTable 
          ref={hotTableRef} 
          settings={settings} 
          colHeaders={sourceContext.yAxisHeaders}
          rowHeaders={sourceContext.xAxisHeaders}
        />
      </Paper>
    </Box>
  );
};