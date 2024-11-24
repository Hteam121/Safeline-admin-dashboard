import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const TableContainer = styled.div`
  padding: 20px;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const GuestTable = () => {
  const [guests, setGuests] = useState([]);
  const [parents, setParents] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();

      // Fetch guests
      const guestCollection = collection(db, "guests");
      const guestDocs = await getDocs(guestCollection);
      const guestData = {};
      guestDocs.forEach((doc) => {
        guestData[doc.id] = doc.data();
      });

      // Fetch parents
      const parentCollection = collection(db, "parents");
      const parentDocs = await getDocs(parentCollection);
      const parentData = {};
      parentDocs.forEach((doc) => {
        parentData[doc.id] = doc.data();
      });

      setGuests(Object.entries(guestData));
      setParents(parentData);
    };

    fetchData();
  }, []);

  const filteredGuests = guests.filter(([id, guest]) =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TableContainer>
      <SearchBar
        type="text"
        placeholder="Search by Guest Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <DataTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Relationship</TableHeader>
            <TableHeader>Parent</TableHeader>
            <TableHeader>Access Timeout Date</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredGuests.map(([id, guest]) => (
            <tr key={id}>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.relationship || "N/A"}</TableCell>
              <TableCell>{parents[guest.parent_id]?.name || "Unknown"}</TableCell>
              <TableCell>{guest.access_timeout_date || "No Data"}</TableCell>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </TableContainer>
  );
};

export default GuestTable;
