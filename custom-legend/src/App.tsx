import { LatLngExpression } from "leaflet"
import { CircleMarker } from "react-leaflet"
import { MapContainer } from "react-leaflet/MapContainer"
import { TileLayer } from "react-leaflet/TileLayer"

const getColor = (d: number) => {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0"
}

const LegendContent = () => {
  const grades = [0, 10, 20, 50, 100, 200, 500, 1000]
  const labels = []
  let from
  let to
  for (let i = 0; i < grades.length; i++) {
    from = grades[i]
    to = grades[i + 1]
    labels.push(
      <>
        <i style={{ background: getColor(from + 1), height: "1em", width: "1em", float: "left" }}></i>
        <span style={{ margin: "0 0.5em" }}>
          {from}
          {to ? ` - ${to}` : "+"}
        </span>
        <br />
      </>
    )
  }
  return labels
}

const Legend = () => {
  return (
    <div
      style={{ backgroundColor: "rgb(255, 255, 255, 0.8)", margin: "10px 10px 25px", padding: "10px" }}
      className="leaflet-bottom leaflet-right"
    >
      <LegendContent />
    </div>
  )
}

function App() {
  const position: LatLngExpression = [51.505, -0.09]
  const sampleData: LatLngExpression[] = [...Array(5)].map(() => {
    return [position[0] + Math.random() * 0.01, position[1] + Math.random() * 0.01]
  })

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "600px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sampleData.map((pos, i) => {
        return <CircleMarker center={pos} radius={10} color={getColor(i * 100)} />
      })}
      <Legend />
    </MapContainer>
  )
}

export default App
