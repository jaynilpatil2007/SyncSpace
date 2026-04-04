import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskItem from './TaskItem';
import { defaultTasks, teamMembers } from '../lib/data.js';

const STORAGE_KEY = 'team-workspace-tasks';

function SortableTask({ task, onToggle, onDelete, onStatusChange }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="animate-fade-in">
      <TaskItem
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        dragHandleProps={listeners}
      />
    </div>
  );
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultTasks;
    } catch {
      return defaultTasks;
    }
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showCategory, setShowCategory] = useState(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleToggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleStatusChange = (id, status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
      status: 'Now',
      tags: [],
      assignees: [teamMembers[Math.floor(Math.random() * teamMembers.length)].id],
      category: 'Project Tasks',
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    setShowInput(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredTasks = filterStatus === 'All'
    ? tasks
    : tasks.filter(t => t.status === filterStatus);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-white/3 backdrop-blur-md rounded-3xl border border-white/6 shadow-2xl shadow-black/20 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 pb-5 border-b border-white/4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/6 border border-white/8 flex items-center justify-center">
              <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white/90 tracking-tight">Task Board</h2>
              <p className="text-[11px] text-white/25 font-medium mt-0.5">Manage your sprint tasks</p>
            </div>
          </div>

          {/* Progress ring */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11">
              <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <circle
                  cx="22" cy="22" r="18" fill="none" stroke="#34d399" strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(progressPercent / 100) * 113.1} 113.1`}
                  className="transition-all duration-700 ease-out"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(52,211,153,0.3))' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                {progressPercent}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-white/70">{completedCount}/{tasks.length}</span>
              <p className="text-[10px] text-white/25 font-medium">completed</p>
            </div>
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-white/3 rounded-2xl p-1.5 border border-white/4">
            {['All', 'Now', 'Next', 'Later'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  filterStatus === status
                    ? 'bg-white/8 text-white/90 shadow-lg shadow-black/10 border border-white/8'
                    : 'text-white/30 hover:text-white/60 hover:bg-white/3'
                }`}
                id={`filter-${status.toLowerCase()}`}
              >
                {status === 'All' ? 'All Tasks' : status}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowInput(!showInput)}
            className="w-10 h-10 rounded-2xl bg-white/8 hover:bg-white/12 border border-white/8 hover:border-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Add new task"
            id="add-task-btn"
          >
            <svg className={`w-5 h-5 transition-transform duration-300 ${showInput ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        {/* Add task input */}
        {showInput && (
          <form onSubmit={handleAddTask} className="mt-4 animate-fade-in">
            <div className="flex gap-2.5">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-5 py-3 rounded-2xl border border-white/8 bg-white/3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/15 focus:border-white/15 transition-all duration-300"
                autoFocus
                id="new-task-input"
                aria-label="New task title"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-white/8 hover:bg-white/12 border border-white/8 text-white/80 text-sm font-semibold transition-all duration-300 hover:text-white active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={!newTaskTitle.trim()}
                id="submit-task-btn"
              >
                Add Task
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Category header */}
      <div
        className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/2 transition-all duration-200"
        onClick={() => setShowCategory(!showCategory)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-primary-400 shadow-sm shadow-primary-400/30"></div>
          <span className="text-sm font-semibold text-primary-400/80 text-[#F3F4F4]">Project Tasks</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-white/25 font-medium bg-white/4 px-2.5 py-1 rounded-lg border border-white/4">{filteredTasks.length} tasks</span>
          <svg className={`w-4 h-4 text-white/20 transition-transform duration-300 ${showCategory ? 'rotate-0' : '-rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Task list */}
      {showCategory && (
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={filteredTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <SortableTask
                    key={task.id}
                    task={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {filteredTasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-white/25">
              <div className="w-16 h-16 rounded-3xl bg-white/3 border border-white/6 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-white/30">No tasks found</p>
              <p className="text-xs mt-1.5 text-white/15">Click the + button to add a new task</p>
            </div>
          )}

          {/* Quick add at bottom */}
          {!showInput && (
            <button
              onClick={() => setShowInput(true)}
              className="mt-3 w-full flex items-center justify-center gap-2.5 px-4 py-4 rounded-2xl text-white/20 hover:text-white/50 bg-white/1 hover:bg-white/3 border border-dashed border-white/6 hover:border-white/12 transition-all duration-300 group"
              id="quick-add-btn"
            >
              <div className="w-6 h-6 rounded-lg bg-white/4 group-hover:bg-white/8 flex items-center justify-center transition-all duration-300">
                <svg className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <span className="text-sm font-semibold">Add new task</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
