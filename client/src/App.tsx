import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Header } from 'semantic-ui-react';
import { loadFlights } from './store';
import * as selectors from './store/selectors';
import './App.scss';
import { getMovies } from './api/getMovies';

function App() {
  const dispatch = useDispatch();
  const flights = useSelector(selectors.getFlightsAll);

  useEffect(() => {
    dispatch(loadFlights());
    getMovies('Star') // .env example
  }, [dispatch]);

  return (
    <div className="App">
      <Header className="App-header" as="h2">Second Header</Header>
      <pre>
        <ul className="App-List">
          {flights.departure.map(flight => (
            <li key={flight.ID}>
              <code className="App-Code">
                {JSON.stringify(
                  flight,
                  [
                    'ID', 'term', 'status', 'gateNo',
                    'airportToID.city', 'actual',
                    'codeShareData', 'codeShare',
                  ],
                  2,
                )}
              </code>
              {ReactHtmlParser(flight.airline.en.about)}
            </li>
          ))}
        </ul>
      </pre>
    </div>
  );
}

export default App;
