import React, { useState, useEffect } from 'react';

import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 51.507222,
    longitude: -0.1275,
    zoom: 3,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/stevehellier/ckc8xh2zu381j1ipetruai1r7'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {logEntries.map((entry) => (
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div
              onClick={() =>
                setShowPopup({
                  // ...showPopup,
                  [entry._id]: true,
                })
              }
            >
              <img
                className='marker'
                style={{
                  width: '24px',
                  height: '24px',
                }}
                src='https://i.imgur.com/y0G5YTX.png'
                alt='marker'
              />
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor='top'
            >
              <div className='popup'>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>{new Date(entry.vistDate).toDateString()}</small>
              </div>
            </Popup>
          ) : null}
        </>
      ))}
    </ReactMapGL>
  );
};

export default App;
