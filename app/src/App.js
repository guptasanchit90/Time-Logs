import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [mode, setMode] = useState('view');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (mode == 'view') {
      fetch('/api/entries')
        .then(response => response.json())
        .then(data => setEntries(data.entries))
    }
  }, [mode]);

  const addEntry = (event) => {
    event.preventDefault();

    // Validate Entry
    if(new Date(event.target.start.value) > new Date(event.target.end.value)) {
      alert('Start Date / Time must be before End Date / Time');
    } else {
      fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: event.target.description.value,
          start: event.target.start.value,
          end: event.target.end.value
        })
      })
        .then(response => response.json())
        .then(data => {
          setMode('view');
        });
    }
  }

  return (
    <div className="App">
      <header>
        <button onClick={() => setMode('view')}>View Entries</button>
        <button onClick={() => setMode('log')}>Log new Entry</button>
      </header>

      <main>
        {mode == 'view' && (
          <table id="entries">
            <thead>
              <tr>
                <th>Description</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.description}</td>
                  <td>{entry.start}</td>
                  <td>{entry.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {mode == 'log' && (
          <form onSubmit={addEntry}>
            <label for="Description">
              Description:
              <input type="textarea" rows={5} name="description" id="description" required />
            </label>

            <br />

            <label for="Start">
              Start:
              <input type="datetime-local" name="start" id="start" required />
            </label>

            <label for="End">
              End:
              <input type="datetime-local" name="end" id="end" required />
            </label>

            <br />
            <button type='submit'>Log Entry</button>
          </form>
        )}
      </main>
    </div>
  );
}

export default App;
