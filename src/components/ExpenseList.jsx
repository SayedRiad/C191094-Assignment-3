import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

let newEntries;

export default function ExpenseList() {

  const { entries, setEntries } = useEntries();
  const expenseEntries = entries.filter((entry) => entry.type === "expense");

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
  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-red-600">Expense</h2>

      {expenseEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="expense-list" className="divide-y">
        {expenseEntries.map((item) => {
          return (
            <li id={item.id} key={item.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{item.title}</span>
                <div>
                  <span className="text-red-600">
                    -{formatMoney(item.value)}
                  </span>
                  <span onClick={()=>updateData(item.id, entries)} className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block">
                    Delete
                  </span>
                  <span onClick={()=>editData(item.id, entries)} className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block">
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
