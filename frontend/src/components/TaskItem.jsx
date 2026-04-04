import { teamMembers, statusColors } from '../lib/data.js';

export default function TaskItem({ task, onToggle, onDelete, onStatusChange, dragHandleProps }) {
  const status = statusColors[task.status] || statusColors.Now;
  const assignees = teamMembers.filter(m => task.assignees?.includes(m.id));

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 hover:-translate-y-px ${
        task.completed
          ? 'bg-white/2 border-white/4'
          : 'bg-white/3 border-white/6 hover:border-white/12 hover:bg-white/5 hover:shadow-lg hover:shadow-black/20'
      }`}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${status.text}40, transparent)` }}
      />

      <div className="p-4 sm:p-5">
        {/* Row 1: Drag + Checkbox + Title + Status */}
        <div className="flex items-center gap-3">
          {/* Drag handle */}
          <div
            {...dragHandleProps}
            className="shrink-0 cursor-grab active:cursor-grabbing text-white/10 hover:text-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Drag to reorder"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="4" cy="3" r="1.5" />
              <circle cx="12" cy="3" r="1.5" />
              <circle cx="4" cy="8" r="1.5" />
              <circle cx="12" cy="8" r="1.5" />
              <circle cx="4" cy="13" r="1.5" />
              <circle cx="12" cy="13" r="1.5" />
            </svg>
          </div>

          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className={`shrink-0 w-5.5 h-5.5 rounded-lg border-[1.5px] flex items-center justify-center transition-all duration-300 ${
              task.completed
                ? 'bg-emerald-500/80 border-emerald-400/60 shadow-md shadow-emerald-500/20'
                : 'border-white/15 hover:border-white/30 hover:bg-white/4 hover:scale-110'
            }`}
            aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
            id={`task-toggle-${task.id}`}
          >
            {task.completed && (
              <svg className="w-3 h-3 text-white animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Title */}
          <span
            className={`flex-1 text-[15px] leading-snug font-medium transition-all duration-300 ${
              task.completed ? 'line-through text-white/25 decoration-white/15' : 'text-white/85'
            }`}
          >
            {task.title}
          </span>

          {/* Status badge */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full cursor-pointer border outline-none appearance-none transition-all duration-200 hover:brightness-110"
              style={{
                backgroundColor: status.bg,
                color: status.text,
                borderColor: status.border,
              }}
              aria-label={`Task status: ${task.status}`}
              id={`task-status-${task.id}`}
            >
              <option value="Now">Now</option>
              <option value="Next">Next</option>
              <option value="Later">Later</option>
            </select>
            <svg className="w-4 h-4 text-white/15 group-hover:text-white/25 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>

        {/* Row 2: Tags + Assignees + Delete */}
        <div className="flex items-center justify-between mt-4 pl-13">
          {/* Tags */}
          <div className="flex items-center gap-2">
            {task.tags?.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold border transition-transform duration-200 hover:scale-110"
                style={{ backgroundColor: tag.bg, color: tag.textColor, borderColor: tag.border }}
              >
                {tag.label}
              </span>
            ))}
            {task.assignees?.length > 2 && (
              <span className="text-white/20 hover:text-white/40 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </span>
            )}
          </div>

          {/* Assignees + Delete */}
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2">
              {assignees.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="w-7 h-7 rounded-full flex items-center justify-center ring-2 ring-dark-800 shadow-sm transition-all duration-200 hover:scale-110 hover:z-10 hover:-translate-y-0.5"
                  style={{ backgroundColor: member.color, color: member.textColor }}
                  title={member.name}
                >
                  <span className="text-[9px] font-bold">{member.initials}</span>
                </div>
              ))}
            </div>

            {/* Delete */}
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg text-white/10 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label={`Delete task: ${task.title}`}
              id={`task-delete-${task.id}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
