import React, { useState, useEffect } from "react";
import { Box, Grid, Image, Text, CheckBox, Calendar } from "grommet";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const IncidentShowScreen = props => {
  const [report, setReport] = useState(null);

  const { userId, reportId } = props.match.params;

  const [viewport, setViewport] = useState({
    latitude: 47.119706917599885,
    longitude: -124.112312312,
    zoom: 15,
    width: "100vw",
    height: "100vh"
  });

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
            rows={["xsmall", "xsmall", "medium", "medium", "medium", "small"]}
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
                  height: 0.8
                }}
              ></div>
              <h3> Details </h3>
              <Text>{report.description}</Text>
            </Box>

            <Box gridArea="chat" align="center" margin={{ top: "10%" }}>
              <Calendar
                size="small"
                date={new Date().toISOString()}
                onSelect={date => {}}
                fit="contain"
              />
              {/* <Card
                img="https://picsum.photos/id/54/400/300"
                title="What I learned from my visit to The Upside Down"
                author="Nancy Wheeler"
              /> */}
            </Box>

            {/* ROW 5 */}
            <Box
              background="dark-2"
              gridArea="location"
              overflow="hidden"
              round={true}
              fit="cover"
            >
              <div>
                <ReactMapGL
                  {...viewport}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  mapStyle="mapbox://styles/akkin13/ckb1qv50i0grp1inr5bx1qkfm"
                  onViewportChange={viewport => setViewport(viewport)}
                >
                  <Marker
                    latitude={parseFloat(report.latitude)}
                    longitude={parseFloat(report.longitude)}
                  >
                    <button class="marker-btn">
                      <img
                        src="https://cdn.imgbin.com/12/4/19/imgbin-auxiliary-police-lawyer-material-people-s-police-UcqivXX1JKh98eQ2xMj1Zyan2.jpg"
                        alt="security guard"
                        style={{ width: 50 }}
                      />
                    </button>
                  </Marker>
                </ReactMapGL>
              </div>
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
