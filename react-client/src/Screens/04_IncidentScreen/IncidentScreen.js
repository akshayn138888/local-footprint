import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Box, Grid, Image, Text, CheckBox } from "grommet";

import TinyReport from '../../components/TinyReport'
import IncidentMapScreen from "../../components/IncidentMapScreen"
import DisplayReport from '../../components/IncidentDisplayReports'


const GridAreasAlternative = (props) => {
    return (
        <Grid
            rows={["xsmall", "xlarge", "small"]}
            columns={["45%", "55%"]}
            areas={[
                ["header", "header"],
                ["reports", "map"],
                ["footer", "footer"]
            ]}
            gap="small"
        >
            <Box background="brand" gridArea="header">
                Header
            </Box>

            <Box background="light-2" gridArea="map">
                <IncidentMapScreen />
            </Box>

            <Box background="light-2" gridArea="reports" overflow="auto">
                <DisplayReport />
            </Box>

            <Box background="dark-2" gridArea="footer">
                Footer
            </Box>
        </Grid>
    );
};

storiesOf("Grid", module).add("Areas prop alternative", () => (
    <GridAreasAlternative />
));

export default GridAreasAlternative

