// components/EditModal.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditModal = ({
  show,
  onHide,
  item,
  fields,
  onChange,
  onSave,
  title = "Editar"
}) => {
  const handleChange = (e, field) => {
    const { value } = e.target;
    onChange({ ...item, [field]: value });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {item && (
          <Form onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}>
            {fields.map((field) => (
              <Form.Group key={field.key} className="mb-3">
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type || "text"}
                  value={item[field.key] || ""}
                  onChange={(e) => handleChange(e, field.key)}
                />
              </Form.Group>
            ))}
            <Button variant="success" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
