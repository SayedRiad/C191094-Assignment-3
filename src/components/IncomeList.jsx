import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

let newEntries;

export default function IncomeList() {
 
   const { entries, setEntries } = useEntries();

  function updateData(id,entries){
    console.log(id)
    document.getElementById(id).style.display="none";
     newEntries = entries.filter((entry) =>entry.id !== id)
     setEntries(newEntries)
     console.log(entries)
   }

  function editData(id ,entries){
    const name= prompt('income-catagory')
    const amount =parseFloat(prompt('ammount'))
    
    const editEntries = entries.filter((entry) =>entry.id === id)
    editEntries[0].title=name;
    editEntries[0].value=amount;
    console.log(editEntries)
    newEntries = entries.map((entry) =>entry)
    setEntries(newEntries)
    
  }

  const incomeEntries = entries.filter((entry) => entry.type === "income");

  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-green-600">Income</h2>
      {incomeEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="income-list" className="divide-y">
        {incomeEntries.map((income) => {
          return (
            <li id={income.id} key={income.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{income.title}</span>

                <div>
                  <span className="text-green-600">
                    {formatMoney(income.value)}
                  </span>
                  <span onClick={()=>updateData(income.id, entries)} className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block">
                    Delete
                  </span>
                  <span onClick={()=>editData(income.id,entries)} className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block">
                    Edit
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
