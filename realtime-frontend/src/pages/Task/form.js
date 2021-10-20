import { useEffect, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import api from "../../services/api";

const initialValues = {
  name: "",
  description: "",
};

export default function TaskForm({ visible, onClose, id }) {
  const [values, setValues] = useState(initialValues);

  const fetchRecord = async () => {
    try {
      if (id) {
        const { data } = await api.get(`/tasks/${id}`);
        setValues(JSON.parse(data));
      } else {
        setValues(initialValues);
      }
    } catch (error) {
      alert("error: " + JSON.stringify(error.response));
    }
  };

  useEffect(() => {
    if (visible) {
      fetchRecord();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleSubmit = async () => {
    try {
      if (id) {
        await api.put(`/tasks/${id}`, values);
      } else {
        await api.post(`/tasks`, values);
      }
      onClose();
    } catch (error) {
      if (error?.response?.data?.errors?.description) {
        alert(
          "error: " + JSON.stringify(error.response.data.errors.description)
        );
      }
      if (error?.response?.data?.errors?.name) {
        alert("error: " + JSON.stringify(error.response.data.errors.name));
      }
      if (
        !error?.response?.data?.errors?.name ||
        error?.response?.data?.errors?.description
      ) {
        alert("error: " + JSON.stringify(error));
      }
    }
  };

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {id ? `Editando tarefa #${id}` : "Nova tarefa"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                value={values.name}
                name="name"
                placeholder="Nome"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                value={values.description}
                name="description"
                placeholder="Descrição"
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="blue" mr={3} onClick={() => handleSubmit()}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
