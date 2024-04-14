import { DataTable } from "./DataTable";
import { columns } from "./columns";

import AddItemButton from "./AddItemButton";
import fakeItems from "./fakeItems";

import "./store-page.css";

const StorePage = () => {
  return (
    <div id="store-page" className="p-5 grow">
      <AddItemButton />
      <DataTable columns={columns} data={fakeItems} />
    </div>
  );
};

export default StorePage;
