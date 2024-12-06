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
import { UserGroupResponse } from "@/services/dto/GroupTypes";
import { GetAllUsersSchema } from "@/services/dto/UserTypesDTO";

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
  const[groupResponse, setGroupResponse] = useState<Group[]>([]);
  const[userResponse, setUserResponse] = useState<GetAllUsersSchema>([]);
  const[userGroupResponse, setUserGroupResponse] = useState<UserGroupResponse[]>([]);


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          setGroupResponse(groupService.getAllGroups()),
          setUserResponse(userService.getAllUsers()),
          setUserGroupResponse(groupService.getAllUserGroups()),
        ]);

        if (!groupResponse || !userResponse || !userGroupResponse) {
          throw new Error("Invalid response from API");
        }

        const groups = {user_id: String};

        setUsers(userResponse);

        userGroupResponse.forEach((userGroup: { group_id: string; user_id: string }) => {
          const group = groups.find((g) => g.id === userGroup.group_id);
          const user = userResponse.data.filter((u: any) => u.id.toString() === userGroup.user_id);

          if (group && user) {
            group.users.push(user);
          }
        });

        setAreas(groups);
      } catch (error: any) {
        console.error("Error fetching data:", error.message || error);
      }
    };

    fetchAllData();
  }, []);

  const addArea = async () => {
    try {
      // Cria um novo grupo
      const newArea = {
        id: Date.now().toString(),
        name: newAreaName || "Nova área",
        image: "",
        users: addedUsers, // Adiciona os usuários ao Squad
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
        addedUsers.map((user: any) =>
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
      const userToAdd = users.find((user: any) => user.id === selectedUser);
      if (userToAdd && !addedUsers.some((u: any) => u.id === userToAdd.id)) {
        setAddedUsers([...addedUsers, userToAdd]);
      }
      setSelectedUser("");
    }
  };

  const handleRemoveUser = (user: User) => {
    setAddedUsers(addedUsers.filter((u:any) => u.id !== user.id)); // Remove o usuário da lista de adicionados
  };

  const filteredAreas =
    filteredArea === "Todos"
      ? areas
      : areas.filter((area: any) => area.name === filteredArea);

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
              onChange={(e: any) => setFilteredArea(e.target.value)}
              label="Filtrar por"
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {areas.map((area: any, index:any) => (
                <MenuItem key={index} value={area.name}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Pesquisar"
            variant="outlined"
            sx={{ flexGrow: 1 }}
          />
        </Toolbar>
      </AppBar>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" }}
        gap={4}
        sx={{ maxWidth: "100%", overflowX: "hidden", boxSizing: "border-box" }}
      >
        {filteredAreas.map((area: any, index: number) => (
          <Area
            title={area.name}
            //userCount={area.users.length}
            userIconColor="#B0B0B0"
            users={area.users}
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
        <DialogContent>
          <TextField
            label="Nome da área"
            fullWidth
            value={newAreaName}
            onChange={(e: any) => setNewAreaName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Escolha usuários</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e: any) => setSelectedUser(e.target.value)}
            >
              {users.map((user: any) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            {groupResponse.map((group: any)=>{
              <Box>
                <DialogTitle>{group.name}</DialogTitle>
              {userGroupResponse.filter((userGroup: any)=>{userGroup.grouId === group.Id })
              .map((filteredUser: any)=>{
                const user = userResponse.find((u: any) => u.id === filteredUser.userId);
                return (
                  <Box key={user?.id} padding="8px" borderBottom="1px solid #ddd">
                    <>{user?.name}</>
                    <>{user?.email}</>
                  </Box>
                );
              })
              }
              </Box>
            })}
          </Box>
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
            {addedUsers.map((user: any, index: number) => (
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
