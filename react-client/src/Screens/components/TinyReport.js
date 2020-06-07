import React, { useState } from "react";
import { Box, Grid, Image, Text, CheckBox } from "grommet";

const TinyReport = props => {
    const [checked, setChecked] = useState(true);
    return (
        <div>
            <hr
                style={{
                    color: "gray",
                    backgroundColor: "gray",
                    height: 0.5
                }}
            />
            <Grid
                rows={["small", "xxsmall"]}
                columns={["35%", "55%", "10%"]}
                areas={[
                    ["Picture", "UpperMain", "UpperSide"],
                    ["Picture", "LowerMain", "LowerSide"],
                ]}
                margin={{ vertical: "xsmall", horizontal: "medium" }}
            >


                <Box background="light-3" gridArea="Picture" round="small" overflow="hidden" >
                    <Image
                        fit="cover"
                        src="https://expertphotography.com/wp-content/uploads/2018/07/Aspect-ratio-photography-qantab-beach-Oman-1.jpg"
                    />
                </Box>

                <Box background="light-3" gridArea="UpperMain" pad={{ left: "small" }} fit="contain" >
                    <Text>Title</Text>
                    <Text>Report Type = PI</Text>
                    <Text>Title</Text>
                    <Text>Report Type = PI</Text>

                </Box>
                <Box background="light-3" gridArea="LowerMain">

                    <Text>
                        <Text>By: Jim</Text>
                        <Text margin={{ left: "large" }}>Posted: 2018/02/02</Text>
                    </Text>

                </Box>

                <Box background="light-3" gridArea="UpperSide" align="center" pad="40%">
                    <CheckBox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                    />
                </Box>
                <Box background="light-3" gridArea="LowerSide" round={true} overflow="hidden">
                    <Image
                        fit="cover"
                        src="https://www.nicepng.com/png/detail/801-8016962_collision-icon-orange-png-car-accident-icon.png"
                    />
                </Box>

            </Grid >
        </div>
    )
}

export default TinyReport