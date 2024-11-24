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

const ParentTable = () => {
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState({});
  const [guests, setGuests] = useState({});
  const [licensePlates, setLicensePlates] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();

      // Fetch parents
      const parentCollection = collection(db, "parents");
      const parentDocs = await getDocs(parentCollection);
      const parentData = {};
      parentDocs.forEach((doc) => {
        parentData[doc.id] = doc.data();
      });

      // Fetch students
      const studentCollection = collection(db, "students");
      const studentDocs = await getDocs(studentCollection);
      const studentData = {};
      studentDocs.forEach((doc) => {
        studentData[doc.id] = doc.data();
      });

      // Fetch guests
      const guestCollection = collection(db, "guests");
      const guestDocs = await getDocs(guestCollection);
      const guestData = {};
      guestDocs.forEach((doc) => {
        guestData[doc.id] = doc.data();
      });

      // Fetch license plates
      const licenseCollection = collection(db, "license_plates");
      const licenseDocs = await getDocs(licenseCollection);
      const licenseData = {};
      licenseDocs.forEach((doc) => {
        licenseData[doc.id] = doc.data();
      });

      setParents(Object.entries(parentData));
      setStudents(studentData);
      setGuests(guestData);
      setLicensePlates(licenseData);
    };

    fetchData();
  }, []);

  const filteredParents = parents.filter(([id, parent]) =>
    parent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TableContainer>
      <SearchBar
        type="text"
        placeholder="Search by Parent Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <DataTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Students</TableHeader>
            <TableHeader>Guests</TableHeader>
            <TableHeader>License Plates</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredParents.map(([id, parent]) => (
            <tr key={id}>
              <TableCell>{parent.name}</TableCell>
              <TableCell>{parent.email || "N/A"}</TableCell>
              <TableCell>{parent.number || "N/A"}</TableCell>
              <TableCell>
                {parent.student_ids?.map((studentId) => (
                  <div key={studentId}>
                    {students[studentId]?.name || "Unknown"} (Grade:{" "}
                    {students[studentId]?.grade || "N/A"})
                  </div>
                )) || "No Students"}
              </TableCell>
              <TableCell>
                {parent.guest_ids?.map((guestId) => (
                  <div key={guestId}>
                    {guests[guestId]?.name || "Unknown"} (
                    {guests[guestId]?.relationship || "N/A"})
                  </div>
                )) || "No Guests"}
              </TableCell>
              <TableCell>
                {parent.license_plate_ids?.map(
                  (plateId) => licensePlates[plateId]?.plate_number || "Unknown"
                ).join(", ") || "No License Plates"}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </TableContainer>
  );
};

export default ParentTable;
