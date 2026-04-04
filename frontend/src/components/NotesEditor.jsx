import { useState, useEffect, useRef, useCallback } from 'react';
import { defaultNotesHTML } from '../lib/data.js';

const STORAGE_KEY = 'team-workspace-notes';

const toolbarGroups = [
  {
    label: 'Text Style',
    buttons: [
      { command: 'bold', icon: 'B', label: 'Bold (Ctrl+B)', style: 'font-bold' },
      { command: 'italic', icon: 'I', label: 'Italic (Ctrl+I)', style: 'italic' },
      { command: 'underline', icon: 'U', label: 'Underline (Ctrl+U)', style: 'underline' },
      { command: 'strikeThrough', icon: 'S', label: 'Strikethrough', style: 'line-through' },
    ],
  },
  {
    label: 'Alignment',
    buttons: [
      {
        command: 'justifyLeft',
        iconSvg: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M3 6h18M3 12h12M3 18h16" />
          </svg>
        ),
        label: 'Align Left',
      },
      {
        command: 'justifyCenter',
        iconSvg: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M3 6h18M6 12h12M4 18h16" />
          </svg>
        ),
        label: 'Align Center',
      },
      {
        command: 'insertUnorderedList',
        iconSvg: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
          </svg>
        ),
        label: 'Bullet List',
      },
      {
        command: 'insertOrderedList',
        iconSvg: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M8 6h13M8 12h13M8 18h13" />
            <text x="2" y="8" fontSize="7" fill="currentColor" fontWeight="600">1</text>
            <text x="2" y="14" fontSize="7" fill="currentColor" fontWeight="600">2</text>
            <text x="2" y="20" fontSize="7" fill="currentColor" fontWeight="600">3</text>
          </svg>
        ),
        label: 'Numbered List',
      },
    ],
  },
  {
    label: 'Insert',
    buttons: [
      {
        command: 'outdent',
        iconSvg: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M18 6H6M18 18H6M18 12h-8M6 9l-3 3 3 3" />
          </svg>
        ),
        label: 'Outdent',
      },
      {
        command: 'indent',
        iconSvg: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M18 6H6M18 18H6M18 12h-8M6 9l3 3-3 3" />
          </svg>
        ),
        label: 'Indent',
      },
      {
        command: 'formatBlock-pre',
        iconSvg: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        ),
        label: 'Code Block',
      },
      {
        command: 'insertHorizontalRule',
        iconSvg: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M3 12h18" />
          </svg>
        ),
        label: 'Divider',
      },
      {
        command: 'removeFormat',
        iconSvg: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83a1.125 1.125 0 011.59 0l6.375 6.375a1.125 1.125 0 010 1.59L10.83 19.17a1.125 1.125 0 01-1.59 0z" />
          </svg>
        ),
        label: 'Clear Formatting',
      },
    ],
  },
];

export default function NotesEditor() {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const saveTimerRef = useRef(null);

  const updateWordCount = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      setWordCount(words.length);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (editorRef.current) {
        editorRef.current.innerHTML = saved || defaultNotesHTML;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        updateWordCount();
      }
    } catch {
      if (editorRef.current) {
        editorRef.current.innerHTML = defaultNotesHTML;
      }
    }
  }, []);

  

  const saveNotes = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setIsSaving(true);
    saveTimerRef.current = setTimeout(() => {
      if (editorRef.current) {
        localStorage.setItem(STORAGE_KEY, editorRef.current.innerHTML);
      }
      setTimeout(() => setIsSaving(false), 600);
    }, 500);
    updateWordCount();
  }, []);

  const updateActiveFormats = useCallback(() => {
    const formats = new Set();
    const commands = ['bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList', 'justifyLeft', 'justifyCenter'];
    commands.forEach(cmd => {
      if (document.queryCommandState(cmd)) formats.add(cmd);
    });
    setActiveFormats(formats);
  }, []);

  const execCommand = (command) => {
    if (command.startsWith('formatBlock-')) {
      const tag = command.split('-')[1];
      document.execCommand('formatBlock', false, tag);
    } else {
      document.execCommand(command, false, null);
    }
    editorRef.current?.focus();
    updateActiveFormats();
    saveNotes();
  };

  return (
    <div className="bg-white/3 backdrop-blur-md rounded-3xl border border-white/6 shadow-2xl shadow-black/20 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-6 pb-5 border-b border-white/4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/6 border border-white/8 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white/90 tracking-tight">Team Notes</h2>
              <p className="text-[11px] text-white/25 font-medium mt-0.5">Collaborative workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/25 font-medium bg-white/4 px-2.5 py-1 rounded-lg border border-white/4">
              {wordCount} words
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/3 border border-white/6">
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isSaving ? 'bg-amber-400/80 animate-pulse shadow-sm shadow-amber-400/30' : 'bg-emerald-400/80 shadow-sm shadow-emerald-400/20'}`}></div>
              <span className={`text-[11px] font-semibold transition-colors duration-300 ${isSaving ? 'text-amber-300/80' : 'text-emerald-300/70'}`}>
                {isSaving ? 'Saving...' : 'Saved'}
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-white/2 rounded-2xl border border-white/4 flex-wrap" role="toolbar" aria-label="Text formatting">
          {toolbarGroups.map((group, gi) => (
            <div key={gi} className="flex items-center">
              {gi > 0 && <div className="w-px h-7 bg-white/6 mx-1.5" />}
              <div className="flex items-center gap-0.5">
                {group.buttons.map((btn) => {
                  const isActive = activeFormats.has(btn.command);
                  return (
                    <button
                      key={btn.command}
                      onClick={() => execCommand(btn.command)}
                      className={`relative w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all duration-200 group/btn ${
                        isActive
                          ? 'bg-white/10 text-white/90 shadow-sm'
                          : 'text-white/30 hover:bg-white/6 hover:text-white/70 hover:scale-105'
                      } ${btn.style || ''}`}
                      aria-label={btn.label}
                      id={`toolbar-${btn.command}`}
                    >
                      {btn.iconSvg || btn.icon}
                      {/* Tooltip */}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-xl text-white/80 text-[10px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-opacity duration-200 z-50 border border-white/6">
                        {btn.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor content */}
      <div className="flex-1 overflow-y-auto p-6 pt-5 text-[#F3F4F4]">
        <div
          ref={editorRef}
          contentEditable
          className="notes-content"
          onInput={saveNotes}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Team notes editor"
          id="notes-editor"
        />
      </div>

      {/* Footer bar */}
      <div className="px-6 py-3 border-t border-white/4 bg-white/1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-white/20 font-medium">
            <kbd className="px-1.5 py-0.5 bg-white/4 border border-white/6 rounded text-[10px] font-mono text-white/30">Ctrl+B</kbd> Bold
          </span>
          <span className="text-[11px] text-white/20 font-medium">
            <kbd className="px-1.5 py-0.5 bg-white/4 border border-white/6 rounded text-[10px] font-mono text-white/30">Ctrl+I</kbd> Italic
          </span>
          <span className="text-[11px] text-white/20 font-medium">
            <kbd className="px-1.5 py-0.5 bg-white/4 border border-white/6 rounded text-[10px] font-mono text-white/30">Ctrl+U</kbd> Underline
          </span>
        </div>
        <span className="text-[11px] text-white/15 font-medium">
          Rich Text Editor
        </span>
      </div>
    </div>
  );
}
