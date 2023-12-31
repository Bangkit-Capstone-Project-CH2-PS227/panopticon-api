import { generateRoom, Users, memberlogs } from "../models/userModel.js";

const memberList = [];

export const inputRoomToken = async (req, res) => {
  try {
    const { roomToken } = req.body;
    const refreshToken = req.cookies.refreshToken;
    const user = await Users.findOne({ // validate 
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    //cari ada nggk token room di generate room
    const existingRoom = await generateRoom.findOne({
      where: {
        tokenRoom: roomToken,
      },
    });

    //kalau ga ada atau salah
    if (!existingRoom) {
      return res.status(400).json({
        msg: "Room dengan token tersebut tidak ditemukan",
      });
    }

    const userInRoom = memberList.find((member) => member.userId === user.id);
    if (userInRoom) {
      // If the user is already in the room, return an alert
      return res.json({
        msg: "Room Token Sudah Pernah Di inputkan",
        roomToken,
        nameRoom: existingRoom.name_room,
        user: {
          memberList,
        },
      });
    }

    //sementara
    let userStatus = 0; //ini dari mana? ubah jadi nggk const
    const status = userStatus === 1 ? "User terlihat" : "User tidak terlihat"; //diganti loop

    memberList.push({ //(data member room)
      userId: user.id,
      username: user.name, // nama orang yang join (Secara keseluruhan)
      status: status,
      joined_at: new Date(),
      //return an bentuknya waktu timernya hmhmmmm 
    });

    //masukkan ke dalam database
    await memberlogs.create({
      nameRoom: existingRoom.name_room,  
      roomToken: roomToken, 
      member: user.name,
      status: status,
      joined_at: new Date(), 
    });

    res.json({
      msg: "Berhasil masuk room",
      roomToken,
      nameRoom: existingRoom.name_room,
      user: {
        memberList,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
