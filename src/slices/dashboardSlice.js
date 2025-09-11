import { createSlice } from '@reduxjs/toolkit';
import initialData from '../data.json';
import { v4 as uuidv4 } from 'uuid';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('dashboardState');
    if (!serializedState) return initialData;
    return JSON.parse(serializedState);
  } catch (err) {
    return initialData;
  }
};

const initialState = loadState();

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    createAndAddWidgetToCategory: (state, action) => {
      const { categoryId, widgetName, widgetText } = action.payload;

      const name = widgetName?.trim() || "Untitled Widget";
      const text = widgetText?.trim() || "";

      if (!name && !text) return;

      const newWidgetId = `widget-${uuidv4()}`;
      state.widgets[newWidgetId] = { id: newWidgetId, name, text };

      const category = state.categories.find(c => c.id === categoryId);
      if (category && !category.widgetIds.includes(newWidgetId)) {
        category.widgetIds.push(newWidgetId);
      }
    },

    addWidgetToCategory: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category && !category.widgetIds.includes(widgetId)) {
        category.widgetIds.push(widgetId);
      }
    },

    removeWidgetFromCategory: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgetIds = category.widgetIds.filter(id => id !== widgetId);
      }
    },

    deleteWidgetGlobally: (state, action) => {
      const { widgetId } = action.payload;
      delete state.widgets[widgetId];
      state.categories.forEach(category => {
        category.widgetIds = category.widgetIds.filter(id => id !== widgetId);
      });
    },

    addCategory: (state, action) => {
      const newCategory = {
        id: `category-${uuidv4()}`,
        title: action.payload.name,
        widgetIds: [],
      };
      state.categories.push(newCategory);
    },
    deleteCategory: (state, action) => {
      const { categoryId } = action.payload;
      state.categories = state.categories.filter(c => c.id !== categoryId);
    },
  },
});

export const persistDashboardState = (state) => {
  try {
    localStorage.setItem('dashboardState', JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save dashboard state:", err);
  }
};

export const {
  createAndAddWidgetToCategory,
  addWidgetToCategory,
  removeWidgetFromCategory,
  deleteWidgetGlobally,
  addCategory,
  deleteCategory
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
