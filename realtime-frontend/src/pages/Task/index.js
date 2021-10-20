import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  Divider,
  Heading,
} from "@chakra-ui/react";
import api from "../../services/api";
import pusher from "../../services/pusher";
import TaskForm from "./form";

export default function Task() {
  const [recordData, setRecordData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const errorHandler = (error) => {
    alert("error: " + JSON.stringify(error));
  };

  const fetchRecords = async () => {
    try {
      const { data } = await api.get("/tasks");
      setRecordData(data);
    } catch (error) {
      errorHandler(error);
    }
  };

  const channel = pusher.subscribe("channel-task");

  channel.unbind("new-task");

  channel.bind("new-task", (data) => {
    const { task: newTask } = data;

    if (!recordData.find((task) => task.id === newTask.id)) {
      setRecordData([...recordData, newTask]);
    }

    return true;
  });

  channel.unbind("update-task");

  channel.bind("update-task", (data) => {
    const { task: givenTask } = data;

    const tasks = recordData
      .map((task) => (task.id === givenTask.id ? givenTask : task))
      .sort((a, b) => a.id - b.id);

    setRecordData(tasks);

    return true;
  });

  channel.unbind("deleted-task");

  channel.bind("deleted-task", (data) => {
    const { task: givenTask } = data;

    setRecordData(recordData.filter((task) => task.id !== givenTask.id));

    return true;
  });

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) {
      setSelectedRecord(null);
      fetchRecords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleForm = (id) => {
    setSelectedRecord(id);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      await fetchRecords();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Box style={{ padding: 28 }}>
      <Grid style={{ margin: "0 auto", width: 200 }}>
        <Button size="sm" onClick={() => setVisible(true)}>
          Nova tarefa
        </Button>
      </Grid>

      <Divider style={{ margin: "2rem 0" }} />

      <Grid style={{ margin: "0 auto", width: 200 }}>
        <Heading as="h2" size="2xl" style={{ margin: "0 0 2rem" }}>
          Tarefas
        </Heading>
      </Grid>

      {recordData.map((item) => (
        <Container key={item.id} style={{ marginBottom: 10 }}>
          <b>{item.name}</b>
          <Button
            colorScheme="red"
            size="xs"
            style={{ float: "right" }}
            onClick={() => handleDelete(item.id)}
          >
            Deletar
          </Button>
          <Button
            colorScheme="teal"
            size="xs"
            style={{ float: "right", marginRight: 10 }}
            onClick={() => handleForm(item.id)}
          >
            Editar
          </Button>
          <p>{item.description}</p>
        </Container>
      ))}

      <TaskForm
        visible={visible}
        id={selectedRecord}
        onClose={() => setVisible(false)}
      />
    </Box>
  );
}
