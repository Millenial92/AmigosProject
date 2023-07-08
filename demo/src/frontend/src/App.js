import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import { getAllStudents } from "./client";


function App() {
const [ students, setStudents ] = useState([]);

const fetchStudents = () =>
getAllStudents()
.then(res => res.json())
.then(data => {console.log(data);
 setStudents(data);
 })

useEffect ( () => {
console.log("Component is mounted");
fetchStudents();
}, []);

  if (students.length <= 0)
  {
  return "NO DATA";
  }
  return students.map((student,index) => {
  return <p key = {index}> {student.id} , {student.name} </p>;
  })
}
export default App;

