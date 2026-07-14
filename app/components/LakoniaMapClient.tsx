"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LakoniaMapClient() {
  return (
    <MapContainer
      center={[49.8397, 24.0297]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "70vh",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}