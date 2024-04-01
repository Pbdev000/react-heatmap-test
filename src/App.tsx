import React, { useMemo, useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

import { HighchartsWidget, HandsontableWidget } from "./widgets";

import * as productDataSource from './dataSources/products.json';
import * as regionDataSource from "./dataSources/regions.json";
import * as versionDataSource from "./dataSources/versions.json";
import { MapDataContext } from "./providers/MapDataContext";
import { getMapContextData } from "./utils/helper";

function App() {
  const [sourceData, setSourceData] = useState(versionDataSource);
  const [dataType, setDataType] = useState('version');

  const changeDataType = (e:React.MouseEvent<HTMLButtonElement>) => {
    switch(e.currentTarget.id || '') {
      case 'version':
        setSourceData(versionDataSource);
        break;
      case 'product':
        setSourceData(productDataSource);
        break;
      case 'region':
        setSourceData(regionDataSource);
        break;
    }
    setDataType(e.currentTarget.id);
  }

  const mapContextData = useMemo(() => {
    return getMapContextData(sourceData);
  }, [sourceData])

  return (
    <Box className="App">
      <MapDataContext.Provider value={mapContextData}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h1"
              noWrap
              component="div"
              sx={{ fontSize: 20, flexGrow: 1 }}
            >
              Developer Assessment
            </Typography>
            <Box>
              <Typography
                variant="overline"
                component="span"
                sx={{ marginRight: 3 }}
              >
                Data Source:
              </Typography>
              <Button variant={(dataType === 'version') ? "contained" : "text"} size="small" id="version" onClick={changeDataType}>
                Versions
              </Button>
              <Button variant={(dataType === 'product') ? "contained" : "text"} size="small" sx={{ margin: "0 15px" }} id="product" onClick={changeDataType}>
                Products
              </Button>
              <Button variant={(dataType === 'region') ? "contained" : "text"} size="small" id="region" onClick={changeDataType}>
                Regions
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ paddingTop: 3 }} maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                Highcharts Heatmap
              </Typography>
              <Alert severity="warning">
                Please modify the highcharts-widget so that it returns a heatmap
                using &nbsp;
                <Link
                  href="https://www.npmjs.com/package/highcharts"
                  target="_blank"
                >
                  highcharts
                </Link>
                .
              </Alert>
                <HighchartsWidget />
            </Grid>
            <Grid item lg={12}>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                Handsontable Heatmap
              </Typography>
              <Alert severity="warning">
                Please modify the handsontable-widget so that it returns a heatmap
                using &nbsp;
                <Link
                  href="https://www.npmjs.com/package/handsontable"
                  target="_blank"
                  underline="hover"
                >
                  handsontable
                </Link>
              </Alert>
              <HandsontableWidget />
            </Grid>
          </Grid>
        </Container>
      </MapDataContext.Provider>
    </Box>
  );
}

export default App;
