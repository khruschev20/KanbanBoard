import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const socket = io("http://localhost:5000");

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
    socket.on("refreshTasks", fetchTasks);
  }, []);

  const fetchTasks = async () => {
    const { data } = await axios.get("http://localhost:5000/tasks");
    setTasks(data);
  };

  return (
    <Container>
      <Row>
        <Col><h3>To-Do</h3>{tasks.filter(t => t.status === "todo").map(t => <Card key={t.id}>{t.title}</Card>)}</Col>
        <Col><h3>In Progress</h3>{tasks.filter(t => t.status === "in-progress").map(t => <Card key={t.id}>{t.title}</Card>)}</Col>
        <Col><h3>Completed</h3>{tasks.filter(t => t.status === "completed").map(t => <Card key={t.id}>{t.title}</Card>)}</Col>
      </Row>
    </Container>
  );
};

export default KanbanBoard;
