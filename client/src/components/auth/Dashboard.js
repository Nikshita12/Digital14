import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = (props) => {
  const [users, setUsers] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers({ hits: data });
    };
    fetchData();
  }, [setUsers]);

  return (
    <div>
      <ul>
        {users.hits &&
          users.hits.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
Dashboard.propTypes = {};

export default Dashboard;

/*
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => console.log(json));
  return <div>dashboard</div>;
};

import React, {useState, useEffect } from 'react';
import {Link } from 'react-router-dom';

import Axios from 'axios';
export const Dashboard = (props) => {
    const [users, setUsers] = useState({ hits : []});
    useEffect(() => {

        const fetchData = async ()=> {
            const { data } = await Axios(
                'https://jsonplaceholder.typicode.com/userstml'
            );
        setUsers({ hits : data});
        };
        fetchData();
    }, [setUsers]);


}
*/
