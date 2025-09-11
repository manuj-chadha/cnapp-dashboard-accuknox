import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, PlusCircle } from "lucide-react";
import {
  createAndAddWidgetToCategory,
  addWidgetToCategory,
  removeWidgetFromCategory,
  deleteWidgetGlobally,
} from "../slices/dashboardSlice";
import ConfirmModal from "./ConfirmModal";

const WidgetItem = ({ widget, isSelected, onToggle, onDelete }) => (
  <div className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg">
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id={`widget-${widget.id}`}
        checked={isSelected}
        onChange={(e) => onToggle(widget.id, e.target.checked)}
        className="h-5 w-5 rounded text-violet-600 bg-transparent border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-violet-500"
      />
      <label
        htmlFor={`widget-${widget.id}`}
        className="font-medium text-slate-800 dark:text-slate-200"
      >
        {widget.name}
      </label>
    </div>
    <button
      onClick={() => onDelete(widget.id)}
      className="text-red-500 hover:text-red-700 p-1 rounded-full"
    >
      <Trash2 size={18} />
    </button>
  </div>
);

const AddWidgetModal = ({ isOpen, onClose, category }) => {
  const dispatch = useDispatch();
  const allWidgets = useSelector((state) => state.dashboard.widgets || {});

  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");
  const [selectedWidgetIds, setSelectedWidgetIds] = useState([]);
  const [widgetToDelete, setWidgetToDelete] = useState(null);

  useEffect(() => {
    setSelectedWidgetIds(category?.widgetIds || []);
  }, [category?.widgetIds]);

  const handleCheckboxChange = useCallback(
    (widgetId, isChecked) => {
      setSelectedWidgetIds((prev) =>
        isChecked ? [...prev, widgetId] : prev.filter((id) => id !== widgetId)
      );

      if (isChecked) {
        dispatch(addWidgetToCategory({ categoryId: category.id, widgetId }));
      } else {
        dispatch(removeWidgetFromCategory({ categoryId: category.id, widgetId }));
      }
    },
    [dispatch, category?.id]
  );

  // Create new widget
  const handleCreateWidget = useCallback(
    (e) => {
      e.preventDefault();
      const name = newWidgetName.trim();
      const text = newWidgetText.trim();

      if (!name) return alert("Widget name cannot be empty!");
      if (!text) return alert("Widget description cannot be empty!");

      dispatch(
        createAndAddWidgetToCategory({
          categoryId: category.id,
          widgetName: name,
          widgetText: text,
        })
      );

      setNewWidgetName("");
      setNewWidgetText("");
    },
    [dispatch, category?.id, newWidgetName, newWidgetText]
  );

  // Global delete
  const handleDeleteGlobally = useCallback(
    (widgetId) => {
      dispatch(deleteWidgetGlobally({ widgetId }));
      setSelectedWidgetIds((prev) => prev.filter((id) => id !== widgetId));
      setWidgetToDelete(null);
    },
    [dispatch]
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20 dark:border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-black/10 dark:border-white/10">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  Add Widget to "{category?.title}"
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">
                  Available Widgets
                </h3>
                <div className="space-y-3 mb-8">
                  {Object.values(allWidgets).map((widget) => (
                    <WidgetItem
                      key={widget?.id}
                      widget={widget}
                      isSelected={selectedWidgetIds.includes(widget?.id)}
                      onToggle={handleCheckboxChange}
                      onDelete={(id) => setWidgetToDelete(id)}
                    />
                  ))}
                </div>

                {/* Create New Widget */}
                <h3 className="font-semibold mb-3 border-t border-black/10 dark:border-white/10 pt-6 text-slate-700 dark:text-slate-300">
                  Create a New Widget
                </h3>
                <form onSubmit={handleCreateWidget} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Widget Name"
                    value={newWidgetName}
                    onChange={(e) => setNewWidgetName(e.target.value)}
                    className="placeholder:text-black/50 dark:placeholder:text-white/50 w-full p-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-violet-500"
                  />
                  <textarea
                    placeholder="Widget Description"
                    value={newWidgetText}
                    onChange={(e) => setNewWidgetText(e.target.value)}
                    rows="3"
                    className="placeholder:text-black/50 dark:placeholder:text-white/50 w-full p-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-violet-500"
                  />
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 shadow-md"
                  >
                    <PlusCircle size={18} />
                    Create and Add Widget
                  </button>
                </form>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-black/10 dark:border-white/10 text-right">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!widgetToDelete}
        onClose={() => setWidgetToDelete(null)}
        onConfirm={() => handleDeleteGlobally(widgetToDelete)}
        title="Delete Widget"
        description={`Are you sure you want to delete "${widgetToDelete ? allWidgets[widgetToDelete]?.name : ''}" globally? This cannot be undone.`}
      />
    </>
  );
};

export default AddWidgetModal;
