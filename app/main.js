import axios from 'axios';
//getData from stream dnjson 
window.onload = async () => {
  const app = document.getElementById('app')
  const response = await axios.get('http://localhost:3000/start', {
    responseType: 'stream'
  })

  const ndjson = response.data.split('\n').filter(Boolean)
  const parsedData = ndjson.map(line => JSON.parse(line));

  app.innerHTML = `<pre>${JSON.stringify(parsedData, null, 2)}</pre>`
}