import React, { useEffect, useState } from "react";
import GraphComponent from "../graph";
import SmallTable from "./table/smTable";
import InventoryTable from "../../inventory/inventory-table";
import { deleteData } from "../../../../utility";
import { toast } from "react-toastify";
import { getAllRaffles } from "../../../../service/raffleService";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../../../config/firebase.config";

export const fetchUser = async (collectionName: string, limitCount: number = 5) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, limit(limitCount)); // Limit the results to `limitCount`
  
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map(doc => ({
    id: doc.id,  // Include document ID in the result
    ...doc.data() // Include document data
  }));
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DashboardProps {}
// types/raffle.d.ts
export interface RaffleItem {
  id: string;
  title: string;
  image: string;
  qty: number;
}

const Dashboard: React.FC<DashboardProps> = () => {
const [inventoryData, setInventoryData] = useState<any[]>([]);

  useEffect(() => {
    getTopInventory();
  }, []);

  const getTopInventory = async () => {
    try {
      // Fetch top 5 items from the "Prize_Database" collection
      const topInventory = await fetchUser("prize_database", 5); // Limit to 5 items
      setInventoryData(topInventory);
    } catch (error) {
      console.error("Error fetching top inventory data:", error);
      toast.error("Failed to fetch top inventory data.");
    }
  };

  // Handle item deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteData("prize_database", id, (message: string) => {
        toast(message);
      });
      setInventoryData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Error deleting item. Please try again.");
    }
  };
   const [raffles, setRaffles] = useState<RaffleItem[]>([]);

  useEffect(() => {
    const fetchRaffles = async () => {
      const data = await getAllRaffles(4);
      setRaffles(data);
    };
    fetchRaffles();
  }, []);

  // Assuming you want the top 7 best-sellers (you can adjust the logic here)
  const bestSellers = inventoryData.slice(0, 5); // Take the top 7 items as best sellers

    return (
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-6 mt-6">
            <div className="xl:col-span-2">
                <GraphComponent />
            </div>
            <div className="xl:col-span-1">
                <SmallTable options={raffles} />
            </div>
            <div className="xl:col-span-3">
                <div className="best-inventory-table">
                    <InventoryTable
                        items={inventoryData}
                        heading="Inventory List"
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
	);
};

export default Dashboard;



// interface smTableDataType {
//     id: number;
//     title: string;
//     qty: string;
//     low: string;
//     image: string
// }
// const smTableData : Array<smTableDataType> = [
//     {
//         id: 1,
//         title: "Iphone 6",
//         qty: "100",
//         low: "Low",
//         image: "/images/icon/5.svg",
//     },
//     {
//         id: 2,
//         title: "Iphone 6",
//         qty: "100",
//         low: "Low",
//         image: "/images/icon/5.svg",
//     },
//     {
//         id: 3,
//         title: "Iphone 6",
//         qty: "100",
//         low: "Low",
//         image: "/images/icon/5.svg",
//     },
//     {
//         id: 4,
//         title: "Iphone 6",
//         qty: "100",
//         low: "Low",
//         image: "/images/icon/5.svg",
//     },
// ]