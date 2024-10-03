import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [gitem, setgitem] = useState("");
  const [planner, setPlanner] = useState([]);

  useEffect(() => {
    const groceryData = localStorage.getItem("groceryData");
    if (groceryData) {
      setPlanner(JSON.parse(groceryData));
    }
  }, []); // Mounting phase

  const handleAddClick = (e) => {
    e.preventDefault();
    if (!gitem) {
      alert("Please fill out the field.");
      return;
    }

    const obj = {
      gitem: gitem,
      completed: false, // Initialize completed property
    };
    const plannerArray = [...planner, obj];
    setPlanner(plannerArray);
    localStorage.setItem("groceryData", JSON.stringify(plannerArray));
    setgitem("");

    // Show success toast notification
    toast.success(`${gitem} has been added!`, {
      position: "top-center", // Use string instead
      autoClose: 3000, // Close after 3 seconds
    });
  };

  const handleToggleCompletion = (index) => {
    const plannerCopy = [...planner];
    plannerCopy[index].completed = !plannerCopy[index].completed; // Toggle completed
    setPlanner(plannerCopy);
    localStorage.setItem("groceryData", JSON.stringify(plannerCopy)); // Update localStorage
  };

  const handleDeleteBtn = (index) => {
    const plannerCopy = [...planner];
    plannerCopy.splice(index, 1); // Remove the item at the specified index
    setPlanner(plannerCopy);
    localStorage.setItem("groceryData", JSON.stringify(plannerCopy)); // Update localStorage

    // Show error toast notification
    toast.error('Item has been removed!', {
      position: "top-center", // Use string instead
      autoClose: 3000,
    });
  };

  return (
    <div className="container">
      <h2>Grocery Bud</h2>
      <form>
        <input
          onChange={(e) => setgitem(e.target.value)}
          type="text"
          placeholder="Grocery Item"
          value={gitem}
          required
        />
        <button onClick={handleAddClick}>Add</button>
      </form>
      {planner.map((data, index) => (
        <div key={`card_${index}`} className='grocInfo'>
          <div>
            <input
              type="checkbox"
              checked={data.completed}
              onChange={() => handleToggleCompletion(index)}
            />
            <span style={{ textDecoration: data.completed ? 'line-through' : 'none' }}>
        {data.gitem}
      </span>
          </div>
          <button onClick={() => handleDeleteBtn(index)}>
            <FontAwesomeIcon icon={faTrash} style={{ color: 'black', cursor: 'pointer' }} />
          </button>
        </div>
      ))}
      <ToastContainer /> {/* Ensure this is included */}
    </div>
  );
}
