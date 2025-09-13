import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlusCircle, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory } from "../slices/dashboardSlice";

const AddCategoryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.dashboard.categories);

  const [categoryName, setCategoryName] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleCreateCategory = (e) => {
    e.preventDefault();
    const name = categoryName.trim();
    if (!name) return alert("Category name cannot be empty!");
    dispatch(addCategory({ name }));
    setCategoryName("");
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory({ categoryId: id }));
    setConfirmDeleteId(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20 dark:border-slate-700 rounded-xl shadow-2xl w-full max-w-md flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-black/10 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Manage Categories
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Add Category Form */}
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full p-2.5 rounded-lg placeholder:text-black/50 dark:placeholder:text-white/50 dark:text-white/90 bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-violet-500"
                />
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 shadow-md"
                >
                  <PlusCircle size={18} />
                  Add Category
                </button>
              </form>

              {/* Existing Categories */}
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                Existing Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex justify-between items-center p-3 bg-black/5 dark:bg-white/5 rounded-lg"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {cat.title}
                    </span>
                    <button
                      onClick={() => setConfirmDeleteId(cat.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
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

          {/* Confirmation Popup */}
          <AnimatePresence>
            {confirmDeleteId && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfirmDeleteId(null)}
              >
                <motion.div
                  className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 max-w-sm w-full text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-slate-800 dark:text-slate-200 mb-4">
                    Are you sure you want to delete this category?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleDeleteCategory(confirmDeleteId)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddCategoryModal;
