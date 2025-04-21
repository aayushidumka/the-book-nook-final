import React from "react";

function Books() {
  return (
    <div className="iframe-wrapper">
      <h2>Admin: Book Management</h2>
      <iframe
        src="https://thebooknookadmin.budibase.app/embed/the-book-nook"
        width="100%"
        height="800"
        style={{ border: "none" }}
        allow="clipboard-write; camera; geolocation; fullscreen"
        title="Books"
      ></iframe>
    </div>
  );
}

export default Books;
