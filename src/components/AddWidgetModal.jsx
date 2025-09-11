import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import {
  createAndAddWidgetToCategory,
  addWidgetToCategory,
  removeWidgetFromCategory,
  deleteWidgetGlobally,
} from "../slices/dashboardSlice";
import ConfirmModal from "./ConfirmModal";

const WidgetItem = ({ widget, categoryId, isSelected, onToggle, onDelete }) => (
  <div className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg">
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id={`widget-${widget.id}`}
          checked={isSelected}
          onChange={(e) => onToggle(categoryId, widget.id, e.target.checked)}
          className="h-5 w-5 rounded text-violet-600 bg-transparent border-slate-400 focus:ring-violet-500"
        />
        <label
          htmlFor={`widget-${widget.id}`}
          className="font-medium text-slate-800 dark:text-slate-200"
        >
          {widget.name}
        </label>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {widget.text}
      </p>
    </div>
    <button
      onClick={() => onDelete(widget.id)}
      className="text-red-500 hover:text-red-700 p-1 rounded-full"
    >
      <Trash2 size={18} />
    </button>
  </div>
);

const AddWidgetForm = ({ categoryId, onCreate }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    onCreate(categoryId, name.trim(), text.trim());
    setName("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <h1 className="w-full y-2 text-black/90 dark:text-white/90 font-extrabold">Create a widget</h1>
      <input
        type="text"
        placeholder="Widget Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 bg-slate-50 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
      />
      <textarea
        placeholder="Widget Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 bg-slate-50 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
      />
      <button
        type="submit"
        className="w-full py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 shadow-md"
      >
        Add Widget
      </button>
    </form>
  );
};

const AddWidgetModal = ({
  isOpen,
  onClose,
  categories = [],
  widgets = {},
  initialCategory = null,
}) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("");
  const [widgetToDelete, setWidgetToDelete] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab((prev) => prev || initialCategory?.id || categories[0]?.id || "");
    }
  }, [isOpen]);

  const activeCategory = categories.find((cat) => cat.id === activeTab);

  const handleCheckboxChange = (categoryId, widgetId, isChecked) => {
    if (isChecked) {
      dispatch(addWidgetToCategory({ categoryId, widgetId }));
    } else {
      dispatch(removeWidgetFromCategory({ categoryId, widgetId }));
    }
  };

  const handleCreateWidget = (categoryId, name, text) => {
    dispatch(createAndAddWidgetToCategory({ categoryId, widgetName: name, widgetText: text }));
  };

  const handleDeleteGlobally = (widgetId) => {
    dispatch(deleteWidgetGlobally({ widgetId }));
    setWidgetToDelete(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[80vw] lg:w-[50vw] 
                        bg-white dark:bg-slate-800 shadow-2xl z-50 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  Personalise your dashboard
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X size={24} className="sm:size-20" />
                </button>
              </div>

              {/* Tabs */}
              <div className="p-2 border-b border-slate-200 dark:border-slate-700">
                <nav className="flex p-1 space-x-2 overflow-x-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeTab === cat.id
                          ? "bg-violet-100 text-violet-700 dark:bg-slate-700 dark:text-white"
                          : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50"
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 pb-20">
                {activeCategory ? (
                  <>
                    {activeCategory.widgetIds.length > 0 ? (
                      <div className="space-y-3">
                        {activeCategory.widgetIds.map((wid) =>
                          widgets[wid] ? (
                            <WidgetItem
                              key={wid}
                              widget={widgets[wid]}
                              categoryId={activeCategory.id}
                              isSelected={activeCategory.widgetIds.includes(wid)}
                              onToggle={handleCheckboxChange}
                              onDelete={setWidgetToDelete}
                            />
                          ) : null
                        )}
                      </div>
                    ) : (
                      <p className="text-center text-slate-500 dark:text-slate-400 py-10">
                        No widgets in this category yet.
                      </p>
                    )}

                    <AddWidgetForm
                      categoryId={activeCategory.id}
                      onCreate={handleCreateWidget}
                    />
                  </>
                ) : (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-10">
                    No categories available.
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirm delete modal */}
      <ConfirmModal
        isOpen={!!widgetToDelete}
        onClose={() => setWidgetToDelete(null)}
        onConfirm={() => handleDeleteGlobally(widgetToDelete)}
        title="Delete Widget"
        description={`Are you sure you want to delete "${
          widgetToDelete ? widgets[widgetToDelete]?.name : ""
        }" globally?`}
      />
    </>
  );
};

export default AddWidgetModal;
