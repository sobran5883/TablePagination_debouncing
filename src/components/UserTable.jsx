import React, { useEffect, useState, useMemo } from "react";
import { Input } from "./ui/Input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/Table";
import { Button } from "./ui/Button";
import { useDebounce } from "../hooks/useDebounce";
import { fetchUsers } from "../utils/api";

const PAGE_SIZE = 5;

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const filteredUsers = useMemo(() => {
    return debouncedSearch
      ? users.filter((user) =>
          `${user.name.first} ${user.name.last}`.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : users;
  }, [debouncedSearch, users]);

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name.first} {user.name.last}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
      </div>
    </div>
  );
}
