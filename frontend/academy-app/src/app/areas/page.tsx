"use client";

import Area from "@/components/userPerArea/boxArea";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { groupService } from "@/services/groupService";
import userService from "@/services/userService";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Areas() {
  const [areas, setAreas] = useState<any[]>([]);
  const [filteredArea, setFilteredArea] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [newAreaName, setNewAreaName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [userGroups, setUserGroups] = useState<any[]>([]); 

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await groupService.getAllGroups();
        setAreas(response);  // Areas fetched
      } catch (error) {
        console.error("Erro ao buscar áreas:", error);
      }
    };
    fetchAreas();

    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);  // Users fetched
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();

    const fetchUserGroups = async () => {
      try {
        const response = await groupService.getAllUserGroups();
        setUserGroups(response);  // Associations between users and groups
      } catch (error) {
        console.error("Erro ao buscar usuários nos grupos:", error);
      }
    };
    fetchUserGroups();
  }, []);

  // Filter users by the groups they belong to
  const getUsersInGroup = (groupId: string) => {
    return userGroups
      .filter((userGroup) => userGroup.group_id === groupId)
      .map((userGroup) => {
        const user = users.find((user) => user.id === userGroup.user_id);
        return user ? user.name : null;
      })
      .filter((name) => name !== null);
  };

  const addArea = () => {
    const newArea = {
      title: newAreaName || "Nova área",
      userCount: users.length,
      userIconColor: "#B0B0B0",
    };
    setAreas([...areas, newArea]);
    setOpen(false);
    setNewAreaName("");
    setUsers([]);
  };

  const handleAddUser = () => {
    if (selectedUser && !users.includes(selectedUser)) {
      setUsers([...users, selectedUser]);
      setSelectedUser("");
    }
  };

  const handleRemoveUser = (user: User) => {
    setUsers(users.filter((u) => u !== user));
  };

  const filteredAreas =
    filteredArea === "Todos"
      ? areas
      : areas.filter((area) => area.title === filteredArea);

  return (
    <Box
      p={4}
      sx={{ overflowX: "hidden", maxWidth: "100vw", boxSizing: "border-box" }}
    >
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Usuários por Squads
      </Typography>
      <AppBar
        position="static"
        elevation={0}
        sx={{ mb: 4, backgroundColor: "white", width: "100%" }}
      >
        <Toolbar>
          <FormControl variant="outlined" sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel>Filtrar por:</InputLabel>
            <Select
              value={filteredArea}
              onChange={(e) => setFilteredArea(e.target.value)}
              label="Filtrar por"
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {areas.map((area, index) => (
                <MenuItem key={index} value={area.name}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Pesquisar" variant="outlined" sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" }}
        gap={4}
        sx={{ maxWidth: "100%", overflowX: "hidden", boxSizing: "border-box" }}
      >
        {filteredAreas.map((area, index) => {
          const usersInGroup = getUsersInGroup(area.id); // Get users in this area
          return (
            <Area
              key={index}
              title={area.title}
              userCount={usersInGroup.length}
              userIconColor={area.userIconColor}
              users={usersInGroup}  // Passing the users to the Area component
            />
          );
        })}
      </Box>
      <Tooltip title="Adicionar novo time" arrow>
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            backgroundColor: "black",
            "&:hover": { backgroundColor: "gray" },
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{ textAlign: "center", color: "black", marginBottom: "10px" }}
        >
          Adicionar Squad
          <IconButton
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            label="Nome da área"
            fullWidth
            value={newAreaName}
            onChange={(e) => setNewAreaName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Escolha usuários</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {users.map((user, index) => (
                <MenuItem key={index} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title="Adicionar usuário" arrow>
            <Fab
              color="primary"
              onClick={handleAddUser}
              sx={{
                backgroundColor: "#4963bf",
                color: "white",
                mt: 2,
                "&:hover": { backgroundColor: "#2b396b" },
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {users.map((user, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body1">{user.name}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveUser(user)}
                >
                  Remover
                </Button>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={addArea} color="primary">
            Salvar
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
