import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Category from "./Category";
import Header from "./Header";
import AddWidgetModal from "./AddWidgetModal";
import AddCategoryModal from "./AddCategoryModal";
import { addCategory } from "../slices/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { categories, widgets } = useSelector((state) => state.dashboard);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenWidgetModal = (category) => {
    setSelectedCategory(category);
    setIsWidgetModalOpen(true);
  };

  const filteredWidgets = Object.values(widgets).filter(
    (w) =>
      (w.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (w.text?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );
  const filteredWidgetIds = new Set(filteredWidgets.map((w) => w.id));

  return (
    <div className="min-h-screen bg-slate-50 pt-20 dark:bg-gray-950 bg">
      {/* Header with Add Category */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddCategoryClick={() => setIsCategoryModalOpen(true)}
      />

      <main className="p-4 sm:p-6 lg:p-8 space-y-6">
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            allWidgets={widgets}
            filteredWidgetIds={filteredWidgetIds}
            onAddWidgetClick={() => handleOpenWidgetModal(category)}
          />
        ))}
      </main>

      {/* Add Widget Modal */}
      {selectedCategory && (
        <AddWidgetModal
  isOpen={isWidgetModalOpen}
  onClose={() => setIsWidgetModalOpen(false)}
  categories={categories} // full categories array
  widgets={widgets}       // full widgets object
  initialCategory={selectedCategory} // optional: set default active tab
/>

      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <AddCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
