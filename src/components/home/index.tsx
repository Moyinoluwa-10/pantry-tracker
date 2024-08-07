"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import AddItemForm from "./add-item-form";
import { useRouter } from "next/navigation";

const Home = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  let userId: string = "";

  const [user, setUser] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("user");
      return storedValue ? storedValue : "";
    }
    return "";
  });

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setUser("");
      router.push("/sign-in");
    }
    // eslint-disable-next-line
  }, [user]);

  if (typeof window !== "undefined" && user !== "" && user !== null) {
    userId = JSON.parse(user).uid;
  }

  const updateInventory = async () => {
    const inventoryRef = collection(db, "inventory");
    const snapshot = query(inventoryRef, where("user_id", "==", userId));
    const docs = await getDocs(snapshot);
    const inventoryList: any[] = [];
    docs.forEach((doc) => {
      inventoryList.push({ id: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
    // eslint-disable-next-line
  }, []);

  const removeItem = async (id: string) => {
    const docRef = doc(collection(db, "inventory"), id);
    const docsSnap = await getDoc(docRef);
    if (docsSnap.exists()) {
      const { quantity } = docsSnap.data();
      if (quantity > 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    updateInventory();
  };

  const router = useRouter();

  const addItem = async (id: string) => {
    const docRef = doc(collection(db, "inventory"), id);
    const docsSnap = await getDoc(docRef);
    if (docsSnap.exists()) {
      const { quantity } = docsSnap.data();
      await setDoc(docRef, { ...docsSnap.data(), quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    updateInventory();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      width={"100vw"}
      minHeight={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      padding={5}
      bgcolor={"#f0f0f0"}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 400,
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            flexDirection: "column",
            gap: 3,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h3" marginBottom={5}>
            Add Item
          </Typography>
          <AddItemForm userId={userId} onClose={handleClose} />
        </Box>
      </Modal>

      <Button variant="contained" onClick={() => handleLogout()}>
        Logout
      </Button>

      <Button variant="contained" onClick={() => handleOpen()}>
        Add New Item
      </Button>

      <Box border={"1px solid #333"}>
        <Box
          width={"800px"}
          height={"100px"}
          border={"1px solid #333"}
          bgcolor={"#addbcc"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h2" color={"#333"}>
            Inventory Items
          </Typography>
        </Box>

        <Stack width={"800px"} height={"300px"} spacing={2} overflow={"auto"}>
          {inventory.map((item) => {
            return (
              <Box
                key={item.name}
                width={"100%"}
                minHeight={"150px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                bgcolor={"#fff"}
                padding={5}
              >
                <Typography variant="h3" color={"#333"} textAlign={"center"}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Typography>
                <Typography variant="h3" color={"#333"} textAlign={"center"}>
                  {item.quantity}
                </Typography>
                <Stack direction={"row"} spacing={2}>
                  <Button variant="contained" onClick={() => addItem(item.id)}>
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      console.log(item);
                      removeItem(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
