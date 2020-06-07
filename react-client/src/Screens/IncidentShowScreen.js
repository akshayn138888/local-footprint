import React, { useState } from 'react'
import { Box, Grid, Image, Text, CheckBox } from "grommet";

const IncidentShowScreen = props => {

    console.log(props.match.params)

    return (
        <>

            <Grid
                rows={["xsmall", "12%", "38%", "large", "large", "small"]}
                columns={["70%", "30%"]}
                areas={[
                    ["header", "header"],
                    ["title", "title"],
                    ["image", "image"],
                    ["description", "chat"],
                    ["location", "location"],
                    ["footer", "footer"]
                ]}
                gap="medium"
            >

                {/* ROW 1 */}
                <Box background="brand" gridArea="header">
                    Header
                </Box>

                {/* ROW 2 */}
                <Box background="light-2" gridArea="title">
                    cat
            </Box>

                {/* ROW 3 */}
                <Box background="light-2" gridArea="image" overflow="auto">
                    dog
            </Box>

                {/* ROW 4 */}
                <Box background="dark-2" gridArea="description">
                    Description
            </Box>

                <Box background="dark-2" gridArea="chat">
                    Chat
            </Box>

                {/* ROW 5 */}
                <Box background="dark-2" gridArea="location">
                    Location
                </Box>

                {/* ROW 6 */}
                <Box background="dark-2" gridArea="footer">
                    Footer
                </Box>
            </Grid>
        </>
    )
}

export default IncidentShowScreen
