import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/App.css';

function AllCheckouts() {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/checkouts`);
        setCheckouts(response.data);
      } catch (error) {
        console.error('Error fetching checkouts:', error);
      }
    };

    fetchCheckouts();
  }, []);

  return (
    <div className="table-container">
      <h2>All Checkouts</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Book Author</th>
              <th>Username</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map((checkout) => (
              <tr key={checkout.Book.book_id}>
                <td>{checkout.Book.book_title}</td>
                <td>{checkout.Book.book_author}</td>
                <td>{checkout.Reader.username}</td>
                <td>{new Date(checkout.latest_return_day).toLocaleDateString()}</td>
                <td>{checkout.checkout_status ? 'Active' : 'Returned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllCheckouts;
