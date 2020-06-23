import React, { useState, useEffect } from "react";
import { Box, Grid, Image, Text, Calendar } from "grommet";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./IncidentShowScreen.css";
const IncidentShowScreen = props => {
  const [report, setReport] = useState(null);

  const { userId, reportId } = props.match.params;

  const [viewport, setViewport] = useState({
    latitude: 49.119706917599885,
    longitude: -122.112312312,
    zoom: 10,
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
        setViewport({
          latitude: parseFloat(data.latitude) - 0.07,
          longitude: parseFloat(data.longitude) + 0.05,
          zoom: 10,
          width: "100vw",
          height: "100vh"
        });
      });
  }, []);
  let srcIncident = "";
  if (report) {
    if (report.incident === "Assault") {
      srcIncident = "./04_Incident/Assault.png";
    } else if (report.incident === "Break and Enter") {
      srcIncident = "./04_Incident/Break_and_Enter.png";
    } else if (report.incident === "General Theft") {
      srcIncident = "./04_Incident/General_Theft.png";
    } else if (report.incident === "Property Damage") {
      srcIncident = "./04_Incident/Property_Damage.png";
    } else if (report.incident === "Public Intoxication") {
      srcIncident = "./04_Incident/Public_Intoxication.png";
    } else if (report.incident === "Vehicle Collision") {
      srcIncident = "./04_Incident/Vehicle_Collision.png";
    } else if (report.incident === "Vehicle Theft") {
      srcIncident = "./04_Incident/Vehicle_Theft.png";
    }

    return (
      <>
        <Box margin={{ horizontal: "5%" }}>
          <Grid
            rows={["xsmall", "medium", "medium", "medium"]}
            columns={["70%", "30%"]}
            areas={[
              ["title", "title"],
              ["image", "image"],
              ["description", "chat"],
              ["location", "location"]
            ]}
            gap="xsmall"
          >
            {/* ROW 1 */}
            <Box background="brand" gridArea="header">
              Header
            </Box>

            {/* ROW 2 */}
            <Box background="light-2" gridArea="title">
              <h2>{report.title}</h2>
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
              <h4>
                {report.incident} Reported by: {report.userEmail.split("@")[0]}
              </h4>
              <Text>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric"
                }).format(Date.parse(report.timestamp))}
              </Text>
              <br />
              <div
                style={{
                  color: "gainsboro",
                  backgroundColor: "gainsboro",
                  height: 0.8
                }}
              ></div>
              <h5> Details </h5>
              <Text>{report.description}</Text>
            </Box>

            <Box gridArea="chat" align="center" margin={{ top: "10%" }}>
              <Calendar
                size="small"
                date={new Date(report.timestamp).toISOString()}
                onSelect={date => { }}
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
              style={{ marginTop: "5%" }}
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
                    <button className="btnIncidentShow"></button>
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
