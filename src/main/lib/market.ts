import { FindPeers } from "@shared/types";
import { FilePeers } from "@shared/models";
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
