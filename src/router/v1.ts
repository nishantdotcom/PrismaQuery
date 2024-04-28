import { Router, Request, Response } from "express";
import prisma from "../db/prisma";

const v1Router = Router();

v1Router.get("/", (req, res) => {
  res.status(200).send({
    msg: "Hello from v1",
  });
});
v1Router.post("/user", async (req, res) => {
  console.log("here");
  console.log(req.body);
  const { x, y, age, hobby, language } = req.body;
  // console.log(hobby);
  const userEntry = await prisma.user.create({
    data: {
      firstname: x,
      lastname: y,
      age: age,
      hobby: {
        create: hobby,
      },
      codingLang: {
        create: language,
      },
    },
  });
  console.log(userEntry);

  res.status(200).send({
    msg: "sucessfully added user",
  });
});

v1Router.get("/user/:userId", async (req, res) => {
  const id = req.params.userId;
  const finalid = parseInt(id);

  const profile = await prisma.user.findUnique({
    where: {
      id: finalid,
    },
  });
  console.log(profile);
  if (profile) {
    res.status(200).send({
      msg: `getting all users ${id}`,
      data: profile,
    });
  } else {
    res.status(200).send({
      msg: `No any profile found`,
      data: null,
    });
  }
});
v1Router.get("/profile/age/:age", async (req, res) => {
  const ageval = req.params.age;
  const ageinnumber = parseInt(ageval);
  const findAllProfile = await prisma.user.findMany({
    where: {
      age: ageinnumber,
    },
  });
  console.log(findAllProfile);
  res.status(200).send({
    msg: "getting all profile",
    data: findAllProfile,
  });
});
v1Router.get("/allprofile", async (req, res) => {
  const getAllprofile = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
  });
  const getAllhooby = await prisma.hobby.findMany({});

  res.status(200).send({
    msg: "getting all profile",
    data: getAllprofile,
    data2: getAllhooby,
  });
});

v1Router.post("/updateProfile/:profileId", async (req, res) => {
  const id = req.params.profileId;
  const intId = parseInt(id);
  const { x, y, age } = req.body;

  const updateProfile = await prisma.user.update({
    where: {
      id: intId,
    },
    data: {
      firstname: x,
      lastname: y,
      age: age,
    },
  });
  console.log(updateProfile);
  res.status(200).send({
    msg: "update sucess",
    data: updateProfile,
  });
});
v1Router.delete("/delete/user/:userId", async (req, res) => {
  const id = parseInt(req.params.userId);

  const deletProfile = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  console.log(deletProfile);
  res.status(200).send({
    msg: "delete profile",
    data: deletProfile,
  });
});
v1Router.get("/get-name/:userId", async (req, res) => {
  const id = parseInt(req.params.userId);
  const profilename = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      firstname: true,
      lastname: true,
      hobby: {
        select: {
          hobbyName: true,
        },
      },
    },
  });
  console.log(profilename);
  res.status(200).send({
    msg: "getting data",
    data: profilename,
  });
});

v1Router.get("/getlist", async (req, res) => {
  const profileList = await prisma.user.findMany({
    include: {
      hobby: {
        select: {
          hobbyName: true,
        },
      },
    },
  });

  console.log(profileList);
  res.status(200).send({
    msg: "getting data",
    data: profileList,
  });
});

export default v1Router;
