import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidgetFromCategory } from '../slices/dashboardSlice';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Cloud, Server, Box } from 'lucide-react';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const getIcon = (widgetName) => {
  const name = widgetName.toLowerCase();
  const iconWrapper = (icon) => (
    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-slate-300 flex items-center justify-center">
      {icon}
    </div>
  );
  if (name.includes('cloud')) return iconWrapper(<Cloud size={20} />);
  if (name.includes('security')) return iconWrapper(<ShieldCheck size={20} />);
  if (name.includes('project')) return iconWrapper(<Box size={20} />);
  return iconWrapper(<Server size={20} />);
};

const Widget = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeWidgetFromCategory({ categoryId, widgetId: widget.id }));
  };

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="relative rounded-lg p-5 py-8 group bg-white dark:bg-black/50 shadow-md dark:shadow-lg border border-slate-200/80 dark:border-slate-700 hover:shadow-lg transition-shadow"
    >
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Remove widget from category"
      >
        <X size={14} />
      </button>

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">{getIcon(widget.name)}</div>
        <div className="pt-0.5">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{widget.name}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{widget.text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Widget;