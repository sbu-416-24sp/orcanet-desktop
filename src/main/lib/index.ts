import { ActivityInfo, PeerInfo } from '@shared/models'
import { GetActivities ,GetPeers} from '@shared/types'
import { dialog } from 'electron'
import { isEmpty } from 'lodash'
import path from 'path'
import { portNumber } from '@shared/constants'
import { net } from 'electron'

// export const getActivities: GetActivities = async () => {
//     return new Promise<ActivityInfo[]>((resolve, reject) => {
//         const request = net.request({
//             method: 'GET',
//             protocol: 'http:',
//             hostname: 'localhost',
//             port: portNumber,
//             path: '/getAllStoredFiles',
//             redirect: 'follow'
//         });

//         let responseBody = '';

//         request.on('response', (response) => {
//             console.info(`STATUS: ${response.statusCode}`);
//             console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

//             response.on('data', (chunk) => {
//                 responseBody += chunk;
//             });

//             response.on('end', () => {
//                 console.log('No more data in response.');
//                 try {
//                     const files = JSON.parse(responseBody);
//                     const activities = files.map(file => ({
//                         ID: undefined,  // You'll need to assign this or modify your server to provide it
//                         Name: file.fileName,
//                         Size: file.fileSize.toString(),
//                         Hash: file.fileHash,
//                         Status: 'Available',  // You might want to adjust this based on your application logic
//                         ShowDropdown: false,  // Determine this based on your application logic
//                         Peers: file.numberChunks  // Adjust according to actual meaning in your context
//                     }));
//                     resolve(activities);
//                 } catch (error) {
//                     console.error('Error parsing response:', error);
//                     reject(error);
//                 }
//             });
//         });

//         request.on('error', (error) => {
//             console.log(`ERROR: ${JSON.stringify(error)}`);
//             reject(error);
//         });

//         request.on('close', () => {
//             console.log('Last Transaction has occurred');
//         });

//         request.setHeader('Content-Type', 'application/json');
//         request.end();
//     });
// }

export const getPeers: GetPeers = async () => {
    return new Promise<PeerInfo[]>((resolve, reject) => {
        const request = net.request({
            method: 'GET',
            protocol: 'http:',
            hostname: 'localhost',
            port: portNumber,
            path: '/get-peers',
            redirect: 'follow'
        });


        let responseBody = '';

        request.on('response', (response) => {
            console.info(`STATUS: ${response.statusCode}`);
            console.info(`HEADERS: ${JSON.stringify(response.headers)}`);

            if (response.statusCode === 404) {
                console.log('Page not found.');
                resolve([]); // Resolving with empty array for 404 response
                return; // Exiting the response handler
            }
            response.on('data', (chunk) => {
                responseBody += chunk;
            });

            response.on('end', () => {
                console.log('No more data in response.');
                console.log('res body', responseBody)
                try {
                    const files = JSON.parse(responseBody);
                    if (!Array.isArray(files)) {
                        throw new TypeError('Received data is not an array');
                    }
                    const peers = files.map(file => ({
                        Location: file.location,
                        Latency: file.latency,
                        PeerID: file.peerId,
                        Connection: file.connection,
                        OpenStreams: file.openStreams,
                    }));
                    resolve(peers);
                } catch (error) {
                    console.error('Error parsing response:', error);
                    resolve([])
                }
            });
        });

        request.on('error', (error) => {
            console.log(`ERROR: ${JSON.stringify(error)}`);
            resolve([]);
        });

        request.on('close', () => {
            console.log('Last Transaction has occurred');
        });

        request.setHeader('Content-Type', 'application/json');
        request.end();
    });
}

// for delete, we can use something similar
// dialog can show options 
//
// export const deleteNote: DeleteNote = async (filename) => {
//     const rootDir = getRootDir()
  
//     const { response } = await dialog.showMessageBox({
//       type: 'warning',
//       title: 'Delete note',
//       message: `Are you sure you want to delete ${filename}?`,
//       buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
//       defaultId: 1,
//       cancelId: 1
//     })
  
//     if (response === 1) {
//       console.info('Note deletion canceled')
//       return false
//     }
  
//     console.info(`Deleting note: ${filename}`)
//     await remove(`${rootDir}/${filename}.md`)
//     return true
//   }