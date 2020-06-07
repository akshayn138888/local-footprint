import React, { useState, useEffect } from "react";
import { Box, Grid, Image, Text, CheckBox } from "grommet";

const IncidentShowScreen = props => {
  const [report, setReport] = useState(null);

  const { userId, reportId } = props.match.params;

  useEffect(() => {
    fetch(
      `https://location-app-5d3d8.firebaseio.com/images/${userId}/${reportId}.json`,
      {
        method: "GET"
      }
    )
      .then(e => e.json())
      .then(data => {
        console.log(data);
        setReport(data);
      });
  }, []);
  if (report) {
    return (
      <>
        <Box margin={{ horizontal: "5%" }}>
          <Grid
            rows={["xsmall", "xsmall", "medium", "large", "large", "small"]}
            columns={["70%", "30%"]}
            areas={[
              ["header", "header"],
              ["title", "title"],
              ["image", "image"],
              ["description", "chat"],
              ["location", "location"],
              ["footer", "footer"]
            ]}
            gap="xsmall"
          >
            {/* ROW 1 */}
            <Box background="brand" gridArea="header">
              Header
            </Box>

            {/* ROW 2 */}
            <Box background="light-2" gridArea="title">
              <h1>{report.title}</h1>
            </Box>

            {/* ROW 3 */}
            <Box
              background="light-2"
              gridArea="image"
              overflow="auto"
              round={true}
            >
              <Image fit="cover" src={report.url} />
            </Box>

            {/* ROW 4 */}
            <Box gridArea="description" margin={{ right: "12%" }}>
              <h2>
                Assault {report.incident} Reported by:{" "}
                {report.userEmail.split("@")[0]}
              </h2>
              <div
                style={{
                  color: "gainsboro",
                  backgroundColor: "gainsboro",
                  height: 1.0
                }}
              ></div>
              <h3> Details </h3>
              <Text>{report.description}</Text>
            </Box>

            <Box background="dark-2" gridArea="chat" round={true}>
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
        </Box>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default IncidentShowScreen;
