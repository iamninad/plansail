import { useState } from "react";
import "./Dashboard.css";
import { v4 as uuidv4 } from "uuid";

// DnD
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Section from "../../components/Section/Section";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import Items from "../../components/Item/Item";

type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
    desc: string;
  }[];
};

const Dashboard = () => {
  const [sections, setSections] = useState<DNDType[]>([
    {
      id: 1,
      title: "Introduced",
      items: [],
    },
    {
      id: 2,
      title: "Development",
      items: [],
    },
    {
      id: 3,
      title: "Testing",
      items: [],
    },
    {
      id: 4,
      title: "Deployment",
      items: [],
    },
  ]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentSectionId, setCurrentSectionId] = useState<UniqueIdentifier>();
  const [sectionName, setSectionName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditSectionModal, setShowEditSectionModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [showOperationToast, setShowOperationToast] = useState(false);
  const [operation, setOperation] = useState("");

  // Dnd Handlers

  const onAddSection = () => {
    if (!sectionName) return;
    const id = `section-${uuidv4()}`;
    setSections([
      ...sections,
      {
        id,
        title: sectionName,
        items: [],
      },
    ]);
    setSectionName("");
    setShowAddSectionModal(false);
    setOperation("Section added");
    setShowOperationToast(true);
  };

  const onAddItem = () => {
    if (!itemName) return;
    const id = `item-${uuidv4()}`;
    const section = sections.find((item) => item.id === currentSectionId);
    if (!section) return;
    section.items.push({
      id,
      title: itemName,
      desc: itemDescription,
    });
    setSections([...sections]);
    setItemName("");
    setItemDescription("")
    setShowAddItemModal(false);
    setOperation("Item added");
    setShowOperationToast(true);
  };

  const onEditSection = () => {
    if (!sectionName) return;
    const id = `section-${uuidv4()}`;
    setSections([
      ...sections,
      {
        id,
        title: sectionName,
        items: [],
      },
    ]);
    setSectionName("");
    setShowEditSectionModal(false);
  };

  const onEditItem = () => {
    if (!itemName) return;
    const id = `item-${uuidv4()}`;
    const section = sections.find((item) => item.id === currentSectionId);
    if (!section) return;
    section.items.push({
      id,
      title: itemName,
      desc: itemDescription,
    });
    setSections([...sections]);
    setItemName("");
    setItemDescription("");
    setShowEditItemModal(false);
  };

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "section") {
      return sections.find((item) => item.id === id);
    }
    if (type === "item") {
      return sections.find((section) =>
        section.items.find((item) => item.id === id)
      );
    }
  }

  const findItemTitle = (id: UniqueIdentifier | undefined) => {
    const section = findValueOfItems(id, "item");
    if (!section) return "";
    const item = section.items.find((item) => item.id === id);
    if (!item) return "";
    return item.title;
  };

  const findItemDescription = (id: UniqueIdentifier | undefined) => {
    const section = findValueOfItems(id, "item");
    if (!section) return "";
    const item = section.items.find((item) => item.id === id);
    if (!item) return "";
    return item.desc;
  };

  // const deleteItem = (id: UniqueIdentifier | undefined) => {
  //   const section = findValueOfItems(id, "item");
  //   if (!section) return "";
  //   const item = section.items.find((item) => item.id === id);
  //   if (!item) return "";
  //   // setSections(section.filter((item)=>item.id !== id));
  // }

  const findSectionTitle = (id: UniqueIdentifier | undefined) => {
    const section = findValueOfItems(id, "section");
    if (!section) return "";
    return section.title;
  };

  const findSectionItems = (id: UniqueIdentifier | undefined) => {
    const section = findValueOfItems(id, "section");
    if (!section) return [];
    return section.items;
  };

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active Section and over Section
      const activeSection = findValueOfItems(active.id, "item");
      const overSection = findValueOfItems(over.id, "item");

      // If the active or over Section is not found, return
      if (!activeSection || !overSection) return;

      // Find the index of the active and over Section
      const activeSectionIndex = sections.findIndex(
        (section) => section.id === activeSection.id
      );
      const overSectionIndex = sections.findIndex(
        (section) => section.id === overSection.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeSection.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overSection.items.findIndex(
        (item) => item.id === over.id
      );
      // In the same Section
      if (activeSectionIndex === overSectionIndex) {
        let newItems = [...sections];
        newItems[activeSectionIndex].items = arrayMove(
          newItems[activeSectionIndex].items,
          activeitemIndex,
          overitemIndex
        );

        setSections(newItems);
      } else {
        // In different Sections
        let newItems = [...sections];
        const [removeditem] = newItems[activeSectionIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overSectionIndex].items.splice(overitemIndex, 0, removeditem);
        setSections(newItems);
      }
    }

    // Handling Item Drop Into a Section
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("section") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over Section
      const activeSection = findValueOfItems(active.id, "item");
      const overSection = findValueOfItems(over.id, "section");

      // If the active or over Section is not found, return
      if (!activeSection || !overSection) return;

      // Find the index of the active and over Section
      const activeSectionIndex = sections.findIndex(
        (section) => section.id === activeSection.id
      );
      const overSectionIndex = sections.findIndex(
        (section) => section.id === overSection.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeSection.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active Section and add it to the over Section
      let newItems = [...sections];
      const [removeditem] = newItems[activeSectionIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overSectionIndex].items.push(removeditem);
      setSections(newItems);
    }
  };

  // This is the function that handles the sorting of the Sections and items when the user is done dragging.
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    // Handling Section Sorting
    if (
      active.id.toString().includes("section") &&
      over?.id.toString().includes("section") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over Section
      const activeSectionIndex = sections.findIndex(
        (section) => section.id === active.id
      );
      const overSectionIndex = sections.findIndex(
        (section) => section.id === over.id
      );
      // Swap the active and over Section
      let newItems = [...sections];
      newItems = arrayMove(newItems, activeSectionIndex, overSectionIndex);
      setSections(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over Section
      const activeSection = findValueOfItems(active.id, "item");
      const overSection = findValueOfItems(over.id, "item");

      // If the active or over Section is not found, return
      if (!activeSection || !overSection) return;
      // Find the index of the active and over Section
      const activeSectionIndex = sections.findIndex(
        (section) => section.id === activeSection.id
      );
      const overSectionIndex = sections.findIndex(
        (section) => section.id === overSection.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeSection.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overSection.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same Section

      if (activeSectionIndex === overSectionIndex) {
        let newItems = [...sections];
        newItems[activeSectionIndex].items = arrayMove(
          newItems[activeSectionIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setSections(newItems);
      } else {
        // In different Sections
        let newItems = [...sections];
        const [removeditem] = newItems[activeSectionIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overSectionIndex].items.splice(overitemIndex, 0, removeditem);
        setSections(newItems);
      }
    }
    // Handling item dropping into Section
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("section") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over Section
      const activeSection = findValueOfItems(active.id, "item");
      const overSection = findValueOfItems(over.id, "section");

      // If the active or over Section is not found, return
      if (!activeSection || !overSection) return;
      // Find the index of the active and over Section
      const activeSectionIndex = sections.findIndex(
        (section) => section.id === activeSection.id
      );
      const overSectionIndex = sections.findIndex(
        (section) => section.id === overSection.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeSection.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...sections];
      const [removeditem] = newItems[activeSectionIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overSectionIndex].items.push(removeditem);
      setSections(newItems);
    }
    setActiveId(null);
  }

  function onKeyEnter(type: string): void {
    switch (type) {
      case "section":
        onAddSection();
        break;
      case "item":
        onAddItem();
    }
  }

  return (
    <div className="dashboard-Section">
      <select
        id="countries"
        className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="board">Board</option>
        <option value="list">Timeline</option>
      </select>

      {/* KANBAN BOARD */}
      <div className="mx-auto max-w-7xl py-10">
        {/* Add Section Modal */}
        <Modal
          showModal={showAddSectionModal}
          setShowModal={setShowAddSectionModal}
        >
          <div className="flex flex-col w-full items-start gap-y-4">
            <h1 className="text-gray-800 text-3xl font-bold">Add Section</h1>
            <Input
              type="text"
              placeholder="Section Title"
              name="sectionname"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              onKeyEnter={(e) => {
                if (e.key === "Enter") onKeyEnter("section");
              }}
            />
            <Button onClick={onAddSection}>Add</Button>
          </div>
        </Modal>
        {/* Add Item Modal */}
        <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
          <div className="flex flex-col w-full items-start gap-y-4">
            <h1 className="text-gray-800 text-3xl font-bold">Add Item</h1>
            <Input
              type="text"
              placeholder="Item Title"
              name="itemname"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyEnter={(e) => {
                if (e.key === "Enter") onKeyEnter("item");
              }}
            />
            <Input
              type="textarea"
              placeholder="Item Description"
              name="itemdescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              onKeyEnter={(e) => {
                if (e.key === "Enter") onKeyEnter("item");
              }}
            />
            <Button onClick={onAddItem}>Add</Button>
          </div>
        </Modal>
        <Modal
          showModal={showEditSectionModal}
          setShowModal={setShowEditSectionModal}
        >
          <div className="flex flex-col w-full items-start gap-y-4">
            <h1 className="text-gray-800 text-3xl font-bold">Edit Section</h1>
            <Input
              type="text"
              placeholder="Section Title"
              name="sectionname"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              onKeyEnter={(e) => {
                if (e.key === "Enter") onKeyEnter("section");
              }}
            />
            <Button onClick={onEditSection}>Edit</Button>
          </div>
        </Modal>
        {/* Add Item Modal */}
        <Modal
          showModal={showEditItemModal}
          setShowModal={setShowEditItemModal}
        >
          <div className="flex flex-col w-full items-start gap-y-4">
            <h1 className="text-gray-800 text-3xl font-bold">Edit Item</h1>
            <Input
              type="text"
              placeholder="Item Title"
              name="itemname"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyEnter={(e) => {
                if (e.key === "Enter") onKeyEnter("item");
              }}
            />
            <Input
              type="textarea"
              placeholder="Item Description"
              name="itemdescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              onKeyEnter={(e) => {
                if (e.key === "Enter") onKeyEnter("item");
              }}
            />
            <Button onClick={onEditItem}>Edit</Button>
          </div>
        </Modal>
        <div className="flex items-center justify-between gap-y-2">
          <h1 className="text-gray-800 text-3xl font-bold">Project Board</h1>
          <Button onClick={() => setShowAddSectionModal(true)}>
            Add Section
          </Button>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-3 gap-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={sections.map((i) => i.id)}>
                {sections.map((section) => (
                  <Section
                    id={section.id}
                    title={section.title}
                    key={section.id}
                    onAddItem={() => {
                      setShowAddItemModal(true);
                      setItemDescription("")
                      setCurrentSectionId(section.id);
                    }}
                  >
                    <SortableContext items={section.items.map((i) => i.id)}>
                      <div className="flex items-start flex-col gap-y-4">
                        {section.items.map((i) => (
                          <Items
                            title={i.title}
                            id={i.id}
                            key={i.id}
                            desc={i.desc}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </Section>
                ))}
              </SortableContext>
              <DragOverlay adjustScale={false}>
                {/* Drag Overlay For item Item */}
                {activeId && activeId.toString().includes("item") && (
                  <Items
                    id={activeId}
                    title={findItemTitle(activeId)}
                    desc={findItemDescription(activeId)}
                  />
                )}
                {/* Drag Overlay For Section */}
                {activeId && activeId.toString().includes("section") && (
                  <Section id={activeId} title={findSectionTitle(activeId)}>
                    {findSectionItems(activeId).map((i) => (
                      <Items
                        key={i.id}
                        title={i.title}
                        id={i.id}
                        desc={i.desc}
                      />
                    ))}
                  </Section>
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>

      {/* Section/Item Added Notification */}
      {showOperationToast && (
        <div
          id="toast-success"
          className="flex fixed left-1/2 bottom-0 items-center w-full max-w-xs p-4 mb-4 left-50 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">
            {operation} successfully.
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span
              className="sr-only"
              onClick={() => setShowOperationToast(false)}
            >
              Close
            </span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              onClick={() => setShowOperationToast(false)}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
