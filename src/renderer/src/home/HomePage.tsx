import React, { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import { getColumns } from "./columns";
import "./HomePage.css";
import { generateFileHash, formatFileSize, sizeToBytes } from "./sizeUtils";


  // GetActivities,
  // UploadFile,
  // RemoveActivity,
  // UpdateActivityName,


  function GetActivities() {
    return [];
  }

  
  function UploadFile(base64String: string, name: string, size: string) {
    let concating = base64String + name + size;
    return concating;
  }
  function RemoveActivity(id: number) {
    return id;
  }
  function UpdateActivityName(id: number, newName: string) {
    let id1 = id+newName;
    return id1;
  }

const HomePage = () => {
  interface Activity {
    id: number;
    name: string;
    size: string;
    hash: string;
    status: string;
    showDropdown?: boolean;
    peers?: number;
    isEditing?: boolean;
    isSelected?: boolean;
  }

  enum Status {
    UPLOADED = "Uploaded",
    UPLOADING = "Uploading",
    ERROR = "Error",
    PUBLISHED = "Published",
  }
  
  const [activities, setActivities] = useState<Activity[]>([]);

  const [updateTrigger, setUpdateTrigger] = useState(false);

  const fetchActivities = async () => {
    try {
      const result = await GetActivities();
      setActivities(result);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const isAnyActivitySelected = activities.some(
    (activity) => activity.isSelected
  );
  const totalFiles = activities.length;

  const networkStatus = "Healthy";

  const toggleDropdown = (id: number) => {
    if (id === -1) {
      setActivities((currentActivities) =>
        currentActivities.map((activity) => ({
          ...activity,
          showDropdown: false,
        }))
      );
    } else {
      setActivities((currentActivities) =>
        currentActivities.map((activity) =>
          activity.id === id
            ? { ...activity, showDropdown: !activity.showDropdown }
            : activity
        )
      );
    }
  };

  const updateActivityName = async (id: number, newName: string) => {
    try {
      await UpdateActivityName(id, newName);
      await fetchActivities(); // Refresh the activities list to reflect the updated name
    } catch (error) {
      console.error("Failed to update activity name:", error);
    }
  };

  const toggleEdit = (id: number) => {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === id
          ? { ...activity, isEditing: !activity.isEditing }
          : activity
      )
    );
  };

  const removeAllSelected = async () => {
    const selectedActivities = activities
      .filter((activity) => activity.isSelected)
      .map((activity) => activity.id);
    for (const id of selectedActivities) {
      await RemoveActivity(id);
    }
    await fetchActivities();
  };
  const updateSelection = (id: number, isSelected: boolean) => {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === id ? { ...activity, isSelected } : activity
      )
    );
  };

  const updateAllSelections = (isSelected: boolean) => {
    setActivities((currentActivities) =>
      currentActivities.map((activity) => ({
        ...activity,
        isSelected: isSelected,
      }))
    );
  };

  const addFileToActivities = async (file: File) => {
    const hash = await generateFileHash(file);
    const newActivity: Activity = {
      id: activities.length + 1,
      name: file.name,
      size: formatFileSize(file.size),
      hash: hash,
      status: "Uploaded",
      showDropdown: false,
    };

    setActivities((currentActivities) => [...currentActivities, newActivity]);
  };

  const removeActivity = (id: number) => {
    setActivities((currentActivities) =>
      currentActivities.filter((activity) => activity.id !== id)
    );
  };

  const handleDrop = async (event: React.DragEvent) => {
    document.getElementById("home-page")!.style.backgroundColor = "";
    event.preventDefault();
    const items = event.dataTransfer.items;
    const files: File[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry();
      if (item) {
        const fileEntries = await getFilesRecursively(item);
        files.push(...fileEntries);
      }
    }

    const newActivitiesPromises = files.map(async (file, index) => {
      const hash = await generateFileHash(file);
      return {
        id: activities.length + index + 1,
        name: file.name,
        size: formatFileSize(file.size),
        hash: hash,
        status: "Uploaded",
        showDropdown: false,
      };
    });

    const newActivities = await Promise.all(newActivitiesPromises);

    setActivities((currentActivities) => [
      ...currentActivities,
      ...newActivities,
    ]);
  };

  const getFilesRecursively = async (entry: any): Promise<File[]> => {
    const files: File[] = [];

    if (entry.isFile) {
      const file = await new Promise<File>((resolve) => entry.file(resolve));
      files.push(file);
    } else if (entry.isDirectory) {
      const dirReader = entry.createReader();
      const entries = await new Promise<any[]>((resolve) => {
        dirReader.readEntries(resolve);
      });

      for (const childEntry of entries) {
        const childFiles = await getFilesRecursively(childEntry);
        files.push(...childFiles);
      }
    }

    return files;
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    document.getElementById("home-page")!.style.backgroundColor =
      "rgba(0, 123, 255, 0.1)";
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = (event: React.DragEvent) => {
    if(event){
      //use here
    }
    document.getElementById("home-page")!.style.backgroundColor = "white";
  };

  const totalSizeBytes = activities.reduce((total, activity) => {
    return total + sizeToBytes(activity.size);
  }, 0);

  const totalSizeFormatted = formatFileSize(totalSizeBytes);

  return (
    <div
      id="home-page"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative w-full`}
    >
      <div className="dashboard-overview bg-white p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="file-hosted bg-white p-4 rounded-lg">
            <span className="block text-sm font-medium text-gray-600">
              Files Hosted
            </span>
            <span className="block text-2xl font-bold text-gray-800">
              {totalFiles}
            </span>
          </div>
          <div className="storage-used bg-white p-4 rounded-lg">
            <span className="block text-sm font-medium text-gray-600">
              Total Storage Used
            </span>
            <span className="block text-2xl font-bold text-gray-800">
              {totalSizeFormatted}
            </span>
          </div>
          <div className="network-status bg-white p-4 rounded-lg">
            <span className="block text-sm font-medium text-gray-600">
              Network Status
            </span>
            <span
              className={`block text-2xl font-bold ${
                networkStatus === "Healthy" ? "text-green-600" : "text-red-600"
              }`}
            >
              {networkStatus}
            </span>
          </div>
        </div>
      </div>
      <DataTable
        columns={getColumns(
          toggleDropdown,
          updateActivityName,
          toggleEdit,
          updateSelection,
          updateAllSelections,
          activities
        )}
        data={activities}
        totalSize={totalSizeFormatted}
        onFileAdded={addFileToActivities}
        activities={activities}
      />
      {isAnyActivitySelected && (
        <div
          className={`ml-80 fixed bottom-0 inset-x-0 mx-auto p-4 bg-gray-100 shadow-lg flex items-center justify-between transition-transform duration-300 ease-in-out ${
            isAnyActivitySelected ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mr-3 px-4 py-1">
                {activities.filter((activity) => activity.isSelected).length}
              </span>
              <span className="font-semibold">
                {activities.filter((activity) => activity.isSelected).length}{" "}
                Item selected
              </span>
              <span className="text-sm text-gray-800">
                Total size:{" "}
                {formatFileSize(
                  activities
                    .filter((activity) => activity.isSelected)
                    .reduce(
                      (total, activity) => total + sizeToBytes(activity.size),
                      0
                    )
                )}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 text-sm rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Share link
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 text-sm rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Download
              </button>
              <button
                onClick={removeAllSelected}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 text-sm rounded transition ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            onClick={() => updateAllSelections(false)}
            className="text-gray-800 hover:text-gray-900 transition ease-in-out focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
