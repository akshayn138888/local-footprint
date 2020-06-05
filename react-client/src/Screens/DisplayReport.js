import React, { useState, useEffect } from "react";

const DisplayReport = props => {
  const [images, setImages] = useState(null);

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
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (images) {
    let parseData = [];
    for (let [key, value] of Object.entries(images)) {
      //console.log(value);
      for (let [key1, value1] of Object.entries(value)) {
        parseData.push(
          <div>
            <p>{value1.title}</p>

            <img
              src={value1.url}
              alt="red"
              style={{ width: 200, height: 200 }}
            />
            <p>Posted by:{value1.email}</p>
            <p>Description:{value1.description} </p>
          </div>
        );
      }
    }
    console.log(parseData);

    return (
      <div className="App">
        {parseData ? parseData.map(image => image) : ""}
        <h1>Hi there!</h1>
      </div>
    );
  } else {
    return <div className="App">Loading</div>;
  }
};

export default DisplayReport;
