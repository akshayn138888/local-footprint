import React, { useState, useEffect } from "react";

import { Box, Grid, Image, Text, CheckBox } from "grommet";
import { Link } from "react-router-dom";

const DisplayReport = props => {
  const [images, setImages] = useState(null);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://location-app-5d3d8.firebaseio.com/images.json", {
        method: "GET"
      })
        .then(e => e.json())
        .then(data => {
          console.log(data);
          setImages(data);
        });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (images) {
    let parseData = [];
    for (let [key, value] of Object.entries(images)) {
      // Key is the User ID
      for (let [key1, value1] of Object.entries(value)) {
        // Key1 is the report number
        parseData.push(
          <div id={key1}>
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
                  src={value1.url}
                />
              </Box>

              <Box background="light-3" gridArea="UpperMain" pad={{ left: "small" }} fit="contain" >
                <Link to={`/IncidentScreen/${key}/${key1}`} >{value1.title}</Link>
                <Text>{value1.incident}</Text>
              </Box>
              <Box background="light-3" gridArea="LowerMain">

                <Text>
                  <Text>By: {value1.userEmail.split("@")[0]}</Text>
                  <Text margin={{ left: "large" }}>{value1.timestamp}</Text>
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

        );
      }
    }
    console.log(parseData);

    return (
      <>
        {parseData ? parseData.map(image => image) : ""}
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default DisplayReport;
