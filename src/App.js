import "./App.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";
//const itemsArray = ["2 courgettes", "6 oeufs", "crème fraiche", "gruyère rapé"];

function App() {
  const [newItem, setNewItem] = useState("");
  const [itemsArray, setItemsArray] = useState([]);
  /*   const newItem = {item: "todolis", packed: false, id:}

  function handleClick(item) {
    console.log("click button add")
    
  } */

  const handleRemove = (removeItem) => {
    console.log(removeItem, itemsArray);
    const newArray = itemsArray.filter((item) => item.id !== removeItem);

    setItemsArray(newArray);
    console.log(newArray);
  };

  const handleTaskDone = (itemDone) => {
    console.log(itemDone, itemsArray);
    const newArray = itemsArray.map((item) => {
      if (item.id === itemDone) {
        item.packed = true;
      }
      return item;
    });

    setItemsArray(newArray);
    console.log(newArray);
  };

  const handlAddNewItem = (event) => {
    //{item: "todolis", packed: false, id:}
    setNewItem({
      item: event.target.value,
      display: true,
      packed: false,
      id: uuid(),
    });
  };
  const isMatch = (val1, val2) => {
    return val1.includes(val2);
  };
  const handleSearch = (event) => {
    let newArray = itemsArray;
    if (event.target.value) {
      newArray = itemsArray.map((item) => {
        if (!isMatch(item.item, event.target.value)) {
          item.display = false;
        }
        return item;
      });
    } else {
      newArray = itemsArray.map((item) => {
        item.display = true;
        return item;
      });
    }
    setItemsArray(newArray);
  };
  return (
    <div className="container">
      <h1>My Todo List</h1>
      <input
        className="search"
        type="text"
        placeholder="search"
        onChange={handleSearch}
      />
      <div id="newtask">
        <input
          placeholder="Add Tasks"
          value={newItem ? newItem.item : ""}
          onChange={handlAddNewItem}
        />
        <button
          id="push"
          onClick={() => {
            const arrayCopy = JSON.parse(JSON.stringify(itemsArray));
            arrayCopy.push(newItem);
            setNewItem(null);
            setItemsArray(arrayCopy);
          }}
        >
          Add
        </button>
      </div>
      <div className="todolist">
        {itemsArray
          ? itemsArray.map((item, id) =>
              item.display ? (
                <div id="tasks" key={id}>
                  <span
                    className={item.packed ? "lineThrough" : ""}
                    onClick={(event) => handleTaskDone(item.id)}
                  >
                    {item.item}{" "}
                  </span>
                  <span onClick={(event) => handleRemove(item.id)}>❌</span>
                </div>
              ) : (
                ""
              )
            )
          : ""}
      </div>
    </div>
  );
}

export default App;
