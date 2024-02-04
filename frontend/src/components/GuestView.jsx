import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/style.css";
import ReactPaginate from "react-paginate";
import { Table, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

const GuestView = () => {
  const [guests, setGuests] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getGuests();
  }, [page, startDate, endDate]); // useEffect dijalankan sekali saat komponen dipasang

  const displayToast = (message, type = 'failed') => {
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const getGuests = async () => {
    try {
      let url = `http://localhost:5000/guests?search_query=${keyword}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`;
      const response = await axios.get(url);
      setGuests(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.error("Error fetching guests:", error.message);
      if (error.response.status === 404) {
        // Server responds with a 404 status code, display toast notification
        displayToast("Data Tidak ditemukan", 'error');
      }
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

  

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setKeyword(query);
  };

  const handleDeleteGuest = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      try {
        // Lakukan permintaan DELETE ke endpoint /guests/:id
        await axios.delete(`http://localhost:5000/guests/${id}`);
        // Refresh data setelah penghapusan
        getGuests();
        toast.success("Data deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error deleting guest:", error.message);
      }
    }
  };
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-centered">
          <form className="mt" onSubmit={searchData}>
            <label className="mt-5 mb-3 is-size-2">List Tamu</label>
            <div className="field">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find something here..."
                />
              </div>
            </div>
            <div className="field has-addons">
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-info">
                  Search
                </button>
              </div>
            </div>
          </form>

          <div style={{ overflowX: "auto" }}>
            <table className="table is-striped is-bordered is-fullwidth mt-2 is-size-7">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tanggal</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Orang yang Dituju</th>
                  <th>Keperluan</th>
                  <th>No Kendaraan</th>
                  <th>No KTP</th>
                  <th>Catatan</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id}>
                    <td>{guest.id}</td>
                    <td>
                      {guest.formattedTanggal &&
                        guest.formattedTanggal.split(" ").join("-")}
                    </td>
                    <td>{guest.nama}</td>
                    <td>{guest.alamat}</td>
                    <td>{guest.orang_yang_dituju}</td>
                    <td>{guest.keperluan}</td>
                    <td>{guest.no_kendaraan}</td>
                    <td>{guest.no_ktp}</td>
                    <td>{guest.catatan}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteGuest(guest.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-container">
            <p>
              Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
            </p>
            <p className="has-text-centered has-text-danger">{msg}</p>
            <nav
              className="pagination is-centered"
              key={rows}
              role="navigation"
              aria-label="pagination"
            >
              <ReactPaginate
                previousLabel={"< Prev"}
                nextLabel={"Next >"}
                pageCount={Math.min(10, pages)}
                onPageChange={changePage}
                containerClassName={"pagination-list"}
                pageLinkClassName={"pagination-link"}
                previousLinkClassName={"pagination-previous"}
                nextLinkClassName={"pagination-next"}
                activeLinkClassName={"pagination-link is-current"}
                disabledLinkClassName={"pagination-link is-disabled"}
              />
            </nav>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GuestView;
