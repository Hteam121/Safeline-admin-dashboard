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

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();

      // Fetch students
      const studentCollection = collection(db, "students");
      const studentDocs = await getDocs(studentCollection);
      const studentData = {};
      studentDocs.forEach((doc) => {
        studentData[doc.id] = doc.data();
      });

      // Fetch parents
      const parentCollection = collection(db, "parents");
      const parentDocs = await getDocs(parentCollection);
      const parentData = {};
      parentDocs.forEach((doc) => {
        parentData[doc.id] = doc.data();
      });

      setStudents(Object.entries(studentData));
      setParents(parentData);
    };

    fetchData();
  }, []);

  const filteredStudents = students.filter(([id, student]) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TableContainer>
      <SearchBar
        type="text"
        placeholder="Search by Student Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <DataTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Grade</TableHeader>
            <TableHeader>Parent(s)</TableHeader>
            <TableHeader>Last Picked Up</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(([id, student]) => (
            <tr key={id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.grade || "N/A"}</TableCell>
              <TableCell>
                {student.parent_ids
                  ?.map((parentId) => parents[parentId]?.name || "Unknown")
                  .join(", ") || "No Parents"}
              </TableCell>
              <TableCell>{student.last_picked_up || "No Data"}</TableCell>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </TableContainer>
  );
};

export default StudentTable;
