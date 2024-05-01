const express = require("express");

const router = express.Router();
module.exports = router;

router.get("/add-job/*", (req, res) => {
  res.json({ jobID: "1" });
  console.log("received: /add-job");
});

router.get("/find-peers/*", (req, res) => {
  res.json({
    peers: [
      {
        peerID: "1",
        ip: "255.255.255.255",
        region: "North America",
        price: 3,
      },
    ],
  });
  console.log("received: /find-peers");
});
router.get("/job-list/*", (req, res) => {
  res.json({
    jobs: [
      {
        jobID: "1",
        fileName: "WhoLetTheDogsOut.mp4",
        fileSize: 4,
        eta: 5, // seconds
        timeQueued: "2024-05-01T23:15:30.000Z",
        status: "active",
      },
    ],
  });
  console.log("received: /job-list");
});
router.get("/job-info/*", (req, res) => {
  res.json({
    fileHash: "blahblah",
    fileName: "WhoLetTheDogsOut.mp4",
    fileSize: 128,
    accumulatedMemory: 78,
    accumulatedCost: 42,
    projectedCost: 60,
    eta: 10,
    timeQueued: "2024-05-01T23:15:30.000Z",
    status: "active",

    /* Added from job-peer */
    ipAddress: "255.255.255.255",
    region: "North America",
    price: 4,
  });
  console.log("received: /job-info");
});
router.get("/start-jobs/*", (req, res) => {
  res.status(200).send("started");
  console.log("received: /start-jobs");
});
router.get("/pause-jobs/*", (req, res) => {
  res.status(200).send("paused");
  console.log("received: /pause-jobs");
});
router.get("/terminate-jobs/*", (req, res) => {
  res.status(200).send("terminated");
  console.log("received: /terminate-jobs");
});
