import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@/App.css';

function AllCheckouts() {
  const [checkouts, setCheckouts] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // 'active', 'inactive', 'all'

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

  // Filter checkouts based on the selected status
  const filteredCheckouts = checkouts.filter((checkout) => {
    if (filterStatus === 'all') return true; // Show all
    return checkout.checkout_status === (filterStatus === 'active'); // TRUE for active, FALSE for inactive
  });

  // Sort checkouts by return date (most recent at the top)
  const sortedCheckouts = filteredCheckouts.sort((a, b) => {
    const dateA = new Date(a.latest_return_day);
    const dateB = new Date(b.latest_return_day);
    return dateB - dateA; // Most recent first
  });

  return (
    <div className="table-container">
      <h2>All Checkouts</h2>

      {/* Center-aligned dropdown for active/inactive/all */}
      <div className="filter-container">
        <label htmlFor="status-filter">Filter by Status: </label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Show All</option>
          <option value="active">Show Active</option>
          <option value="inactive">Show Inactive</option>
        </select>
      </div>

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
            {sortedCheckouts.map((checkout) => (
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
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default AllCheckouts;


