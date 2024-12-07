import { Box, Typography } from "@mui/material";
import UserIcon from "./userIcon";

type User = {
  id: string;
  name: string;
  photo?: string;
};

type AreaProps = {
  title: string;
  users: User[];
  userIconColor: string;
};

export default function Area({ title, users, userIconColor }: AreaProps) {
  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        {title}
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
        {users.map((user) => (
          <UserIcon key={user.id} label={user.name} color={userIconColor} photo={user.photo}/>
        ))}
      </Box>
    </Box>
  );
}
