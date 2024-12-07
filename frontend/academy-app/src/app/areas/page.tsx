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

type Group = {
  id: string;
  name: string;
  image: string;
  users: User[];
  color: string;
};

export default function Areas() {
  const [areas, setAreas] = useState<Group[]>([]);
  const [filteredArea, setFilteredArea] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [newAreaName, setNewAreaName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F39C12", "#9B59B6",
    "#1ABC9C", "#E74C3C", "#34495E", "#2ECC71", "#3498DB"
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [groupResponse, userResponse, userGroupResponse] = await Promise.all([
          groupService.getAllGroups(),
          userService.getAllUsers(),
          groupService.getAllUserGroups(),
        ]);
  
        if (!groupResponse || !userResponse || !userGroupResponse) {
          throw new Error("Invalid response from API");
        }
  
        // Mapear os grupos e adicionar a cor correspondente
        const groups = groupResponse.map((group: Group, index: number) => ({
          ...group,
          users: [],
          color: colors[index % colors.length], // Atribui uma cor por índice
        }));
  
        setUsers(userResponse);
  
        userGroupResponse.forEach((userGroup: { group_id: string; user_id: string }) => {
          const group = groups.find((g) => g.id === userGroup.group_id);
          const user = userResponse.find((u: User) => u.id === userGroup.user_id);
          if (group && user) {
            group.users.push(user);
          }
        });
  
        setAreas(groups);
      } catch (error) {
        console.error("Error fetching data:", error.message || error);
      }
    };
  
    fetchAllData();
  }, []);

  const addArea = async () => {
    const nextColor = colors[areas.length % colors.length];

    try {
      // Cria um novo grupo
      const newArea = {
        id: Date.now().toString(),
        name: newAreaName || "Nova área",
        image: "",
        users: addedUsers, // Adiciona os usuários ao Squad
        color: nextColor,
      };
  
      // Adiciona o novo grupo à interface local
      setAreas([...areas, newArea]);
  
      // Registra o grupo no banco de dados
      const createdGroup = await groupService.createGroup({
        name: newArea.name,
        image: newArea.image,
      });
      
      const updatedGroups = await groupService.getAllGroups();

      // Encontra o último grupo na lista
      const lastGroup = updatedGroups[updatedGroups.length - 1]; // Último registro
  
      if (!lastGroup) {
        throw new Error("Não foi possível encontrar o último grupo criado.");
      }
  
      // Vincula os usuários ao último grupo criado
      await Promise.all(
        addedUsers.map((user) =>
          groupService.addUserToGroup({
            group_id: lastGroup.id, // Usa o ID do último grupo criado
            user_id: user.id,
          })
        )
      );
  
      // Fecha o modal e limpa os estados
      setOpen(false);
      setNewAreaName("");
      setAddedUsers([]);
    } catch (error) {
      console.error("Erro ao adicionar grupo e vincular usuários:", error);
    }
  };
  
  const handleAddUser = () => {
    if (selectedUser) {
      const userToAdd = users.find((user) => user.id === selectedUser);
      if (userToAdd && !addedUsers.some((u) => u.id === userToAdd.id)) {
        setAddedUsers([...addedUsers, userToAdd]);
      }
      setSelectedUser("");
    }
  };

  const handleRemoveUser = (user: User) => {
    setAddedUsers(addedUsers.filter((u) => u.id !== user.id)); // Remove o usuário da lista de adicionados
  };

  const filteredAreas =
  filteredArea === "Todos"
    ? areas
    : areas.filter((area) => area.name === filteredArea);

  const filteredUsersBySearch = (users: User[]) =>
    users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

          <TextField
            label="Pesquisar"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => {
              const query = e.target.value;
              setSearchQuery(query);

              // Filtrar os usuários de acordo com o texto digitado
              const matchingUsers = users.filter((user) =>
                user.name.toLowerCase().includes(query.toLowerCase())
              );

              setFilteredUsers(matchingUsers); // Atualiza os usuários possíveis
            }}
            sx={{
              flexGrow: 1,
              position: "relative",
            }}
          />

        </Toolbar>
      </AppBar>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" }}
        gap={4}
        sx={{ maxWidth: "100%", overflowX: "hidden", boxSizing: "border-box" }}
      >
        {filteredAreas.map((area, index) => (
          <Area
            key={index}
            title={area.name}
            userCount={filteredUsersBySearch(area.users).length}
            userIconColor={area.color}
            users={filteredUsersBySearch(area.users)}
          />
        ))}
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
          sx={{ textAlign: "center", color: "black"}}
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
        <DialogContent>
          <TextField
            label="Nome da área"
            fullWidth
            value={newAreaName}
            onChange={(e) => setNewAreaName(e.target.value)}
            sx={{ mb: 2 , mt:2}}
          />
          <FormControl fullWidth sx={{ mb: 2, mt:2 }}>
            <InputLabel >Escolha usuários</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="Adicionar usuário" arrow placement="top">
              <Fab
                color="primary"
                onClick={handleAddUser}
                sx={{
                  backgroundColor: "#4963bf",
                  color: "white",
                  display: "flex",
                  "&:hover": { backgroundColor: "#2b396b" },
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Box>
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
            {addedUsers.map((user, index) => (
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
                <Tooltip title="Remover usuário" arrow placement="top">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      "&:hover": { color: "darkred" },
                    }}
                    onClick={() => handleRemoveUser(user)}
                  >
                    x
                  </Typography>
                </Tooltip>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={addArea} color="primary">
            Salvar
          </Button>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              color: "black",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                color: "gray",
              },
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}