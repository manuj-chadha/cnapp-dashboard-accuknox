import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Widget from './Widget';
import { Plus } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const Category = ({ category, allWidgets, filteredWidgetIds, onAddWidgetClick }) => {
  const widgetsForCategory = category.widgetIds
    .map(id => allWidgets[id])
    .filter(Boolean);

  const displayedWidgets = filteredWidgetIds
    ? widgetsForCategory.filter(widget => filteredWidgetIds.has(widget.id))
    : widgetsForCategory;

  return (
    <section className="mb-12">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
          {category.title}
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {displayedWidgets.map((widget) => (
            <Widget key={widget.id} widget={widget} categoryId={category.id} />
          ))}
        </AnimatePresence>

        <motion.div
          layout
          onClick={onAddWidgetClick}
          className="flex flex-col items-center justify-center p-5 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-pointer transition-all hover:border-violet-500 hover:text-violet-500"
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={20} className="mb-1" />
          <span className="font-semibold text-sm">Add Widget</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Category;