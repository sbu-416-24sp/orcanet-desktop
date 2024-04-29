import {
  ClearHistory,
  FindPeers,
  GetHistory,
  RemoveFromHistory,
  StartJobs, AddJob,
} from "@shared/types";
import { FilePeers, HistoryJob, JobID,  } from "@shared/models";
import { portNumber } from "@shared/constants";
import { net } from "electron";

export const findPeers: FindPeers = async (fileHash: string) => {
  return new Promise<FilePeers>((resolve, reject) => {
    const request = net.request({
      method: "GET",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: `/get-peers/fileHash:${fileHash}`,
      redirect: "follow",
    });

    let responseBody = "";

    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const filePeers = JSON.parse(responseBody);
          resolve(filePeers);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });

    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });

    request.on("close", () => {
      console.log("Last transaction has occurred");
    });

    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};

export const startJobs: StartJobs = async (jobIDs: JobID[]) => {
  return new Promise<boolean>((resolve, reject) => {
    const request = net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/start-jobs",
      redirect: "follow",
    });

    let responseBody = "";

    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });

    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });

    request.on("close", () => {
      console.log("Last transaction has occurred");
    });

    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify(jobIDs), "utf-8");
    request.end();
  });
};

export const pauseJobs: StartJobs = async (jobIDs: JobID[]) => {
  return new Promise<boolean>((resolve, reject) => {
    const request = net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/pause-jobs",
      redirect: "follow",
    });

    let responseBody = "";

    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });

    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });

    request.on("close", () => {
      console.log("Last transaction has occurred");
    });

    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify(jobIDs), "utf-8");
    request.end();
  });
};

export const terminateJobs: StartJobs = async (jobIDs: JobID[]) => {
  return new Promise<boolean>((resolve, reject) => {
    const request = net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/terminate-jobs",
      redirect: "follow",
    });

    let responseBody = "";

    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });

    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });

    request.on("close", () => {
      console.log("Last transaction has occurred");
    });

    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify(jobIDs), "utf-8");
    request.end();
  });
};


export const getHistory: GetHistory = async () => {
  return new Promise<HistoryJob[]>((resolve, reject) => {
    const request = net.request({
      method: "GET",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/get-history",
      redirect: "follow",
    });

    let responseBody = "";

    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const history = JSON.parse(responseBody);
          resolve(history.jobs);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });

    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });

    request.on("close", () => {
      console.log("Last transaction has occurred");
    });

    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};

export const removeFromHistory: RemoveFromHistory = async (jobID: JobID) => {
  return new Promise<boolean>((resolve, reject) => {
    const request = net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/remove-from-history",
      redirect: "follow",
    });

    let responseBody = "";

    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });

    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });

    request.on("close", () => {
      console.log("Last transaction has occurred");
    });

    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify(jobID));
    request.end();
  });
};

export const clearHistory: ClearHistory = async () => {
  return new Promise<boolean>((resolve, reject) => {
    const request = net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/clear-history",
      redirect: "follow",
    });

    let responseBody = "";

    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });

    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });

    request.on("close", () => {
      console.log("Last transaction has occurred");
    });

    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};

export const addJob: AddJob = async (fileHash: string, peerID: string) => {
  return new Promise<{jobID: JobID}>((resolve, reject) => {
    const request = net.request({
      method: "PUT",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: `/add-job`,
      redirect: "follow",
    });

    let responseBody = "";

    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const jobID = JSON.parse(responseBody);
          resolve(jobID);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });

    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });

    request.on("close", () => {
      console.log("Last transaction has occurred");
    });

    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify({fileHash, peerID}), "utf-8");
    request.end();
  });
}

