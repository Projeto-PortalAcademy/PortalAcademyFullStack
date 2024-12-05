import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

interface AddObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddObservation: (observation: { comment: string }) => void;
}


const AddObservationModal: React.FC<AddObservationModalProps> = ({
  isOpen,
  onClose,
  onAddObservation,
}) => {
  const [comment, setComment] = useState("");

  const handleAdd = () => {
    onAddObservation({ comment });
    setComment("");
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-observation-title"
      sx={{
        zIndex: 1400, // Garantir que este modal esteja na frente
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography id="add-observation-title" variant="h6" mb={2}>
          Adicionar comentário/observação
        </Typography>

        <TextField
          label="Descrição"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleAdd}
        >
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
};

export default AddObservationModal;
