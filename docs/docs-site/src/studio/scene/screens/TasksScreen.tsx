import React, { useState } from 'react';

export const TasksScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  // Form states inside bottom sheet
  const [formText, setFormText] = useState('New project specification');
  const [formState, setFormState] = useState<'idle' | 'focus' | 'filled' | 'error' | 'disabled'>('idle');
  const [formSelect, setFormSelect] = useState('medium');
  const [formSwitch, setFormSwitch] = useState(true);
  const [formCheck, setFormCheck] = useState(true);
  const [formRadio, setFormRadio] = useState('standard');
  const [formSlider, setFormSlider] = useState(65);
  const [formSegment, setFormSegment] = useState('Daily');

  const [tasks, setTasks] = useState([
    { id: '1', title: 'Implement design token pipeline', category: 'Priority', done: true },
    { id: '2', title: 'Verify WCAG AAA contrast for text tiers', category: 'Active', done: false },
    { id: '3', title: 'Refactor mobile navigation components', category: 'Active', done: false },
    { id: '4', title: 'Benchmark theme resolution performance', category: 'Completed', done: true },
    { id: '5', title: 'Update documentation code snippets', category: 'Archived', done: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter !== 'All' && t.category !== activeFilter) return false;
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleConfirmSubmit = () => {
    setIsConfirmOpen(false);
    setIsSheetOpen(false);
    setTasks((prev) => [
      { id: String(Date.now()), title: formText || 'New generated task', category: 'Active', done: false },
      ...prev,
    ]);
    setSnackbarMessage('Task created successfully');
    setTimeout(() => setSnackbarMessage(null), 3000);
  };

  return (
    <div className="scene-screen scene-screen-tasks" data-part="tasks-screen">
      {/* Search Bar */}
      <div className="scene-section">
        <div className="scene-search-bar" data-annotate="--b-color-surface-recessed">
          <svg className="scene-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="scene-input scene-search-input"
            placeholder="Search tasks and specifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="scene-search-clear" onClick={() => setSearchQuery('')}>
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="scene-chips-row" role="tablist" aria-label="Task filters">
        {['All', 'Active', 'Priority', 'Completed', 'Archived'].map((chip) => (
          <button
            key={chip}
            type="button"
            className="scene-chip"
            data-selected={activeFilter === chip}
            data-annotate={chip === 'Active' ? '--b-color-selection-surface' : undefined}
            onClick={() => setActiveFilter(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Task List Header + Action */}
      <div className="scene-section-header">
        <h3 className="scene-section-title">Task items</h3>
        <button
          type="button"
          className="scene-btn scene-btn-soft add-task-btn"
          onClick={() => setIsSheetOpen(true)}
        >
          + Add task
        </button>
      </div>

      {/* Task List */}
      <div className="scene-card scene-card-elevated" data-annotate="--b-color-surface-elevated">
        <div className="scene-list">
          {filteredTasks.length === 0 ? (
            <div className="scene-empty-state">No matching tasks found</div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="scene-list-item">
                <div
                  className="scene-checkbox"
                  data-checked={task.done}
                  role="checkbox"
                  aria-checked={task.done}
                  tabIndex={0}
                  onClick={() => toggleTask(task.id)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleTask(task.id);
                    }
                  }}
                >
                  {task.done && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="scene-item-text" onClick={() => toggleTask(task.id)}>
                  <div
                    className="scene-item-title"
                    style={{ textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.6 : 1 }}
                  >
                    {task.title}
                  </div>
                  <div className="scene-item-sub">Category: {task.category}</div>
                </div>
                <button
                  type="button"
                  className="scene-icon-btn scene-item-menu"
                  aria-label="Task options"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* New Task Bottom Sheet */}
      {isSheetOpen && (
        <div className="scene-modal-backdrop" onClick={() => setIsSheetOpen(false)}>
          <div
            className="scene-sheet-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="New Task Sheet"
          >
            <div className="scene-sheet-drag-handle" />
            <div className="scene-sheet-header">
              <h3 className="scene-section-title">New Task Specification</h3>
              <button
                type="button"
                className="scene-icon-btn sheet-close-btn"
                onClick={() => setIsSheetOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="scene-sheet-content">
              {/* Text Field with States */}
              <div className="scene-form-group">
                <label className="scene-form-label">Task title ({formState})</label>
                <input
                  type="text"
                  className="scene-input"
                  data-state={formState}
                  disabled={formState === 'disabled'}
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="Enter task name..."
                />
                <div className="scene-state-selector">
                  {(['idle', 'focus', 'filled', 'error', 'disabled'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      className="scene-chip"
                      data-selected={formState === st}
                      onClick={() => setFormState(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select */}
              <div className="scene-form-group">
                <label className="scene-form-label">Priority level</label>
                <select
                  className="scene-input scene-select"
                  value={formSelect}
                  onChange={(e) => setFormSelect(e.target.value)}
                >
                  <option value="low">Low priority</option>
                  <option value="medium">Medium priority</option>
                  <option value="high">High priority</option>
                  <option value="critical">Critical priority</option>
                </select>
              </div>

              {/* Segmented Control */}
              <div className="scene-form-group">
                <label className="scene-form-label">Recurrence cadence</label>
                <div className="scene-segmented-control" role="tablist">
                  {['Daily', 'Weekly', 'Monthly'].map((seg) => (
                    <button
                      key={seg}
                      type="button"
                      className="scene-segment-btn"
                      data-active={formSegment === seg}
                      onClick={() => setFormSegment(seg)}
                    >
                      {seg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Switch */}
              <div className="scene-form-row">
                <span className="scene-form-label">Send notification alert</span>
                <div
                  className="scene-switch"
                  role="switch"
                  aria-checked={formSwitch}
                  tabIndex={0}
                  onClick={() => setFormSwitch(!formSwitch)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setFormSwitch(!formSwitch);
                    }
                  }}
                >
                  <div className="scene-switch-thumb" />
                </div>
              </div>

              {/* Checkbox */}
              <div className="scene-form-row">
                <span className="scene-form-label">Assign to milestone sprint</span>
                <div
                  className="scene-checkbox"
                  role="checkbox"
                  aria-checked={formCheck}
                  tabIndex={0}
                  onClick={() => setFormCheck(!formCheck)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setFormCheck(!formCheck);
                    }
                  }}
                >
                  {formCheck && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Radio Group */}
              <div className="scene-form-group">
                <label className="scene-form-label">Execution environment</label>
                <div className="scene-radio-group" role="radiogroup">
                  {['standard', 'isolated', 'production'].map((r) => (
                    <label key={r} className="scene-radio-label">
                      <input
                        type="radio"
                        name="task-env"
                        value={r}
                        checked={formRadio === r}
                        onChange={() => setFormRadio(r)}
                      />
                      <span className="scene-radio-text">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="scene-form-group">
                <div className="scene-form-row">
                  <span className="scene-form-label">Effort estimate</span>
                  <span className="scene-form-val">{formSlider} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formSlider}
                  onChange={(e) => setFormSlider(Number(e.target.value))}
                  className="scene-slider"
                />
              </div>

              {/* Actions */}
              <div className="scene-sheet-actions">
                <button
                  type="button"
                  className="scene-btn scene-btn-outlined"
                  onClick={() => setIsSheetOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="scene-btn scene-btn-primary"
                  onClick={() => setIsConfirmOpen(true)}
                >
                  Create task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {isConfirmOpen && (
        <div className="scene-modal-backdrop" onClick={() => setIsConfirmOpen(false)}>
          <div
            className="scene-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <h4 id="confirm-title" className="scene-modal-title">Confirm submission</h4>
            <p className="scene-modal-body">
              Are you sure you want to add "{formText}" to active sprint tracking?
            </p>
            <div className="scene-modal-actions">
              <button
                type="button"
                className="scene-btn scene-btn-outlined"
                onClick={() => setIsConfirmOpen(false)}
              >
                Go back
              </button>
              <button
                type="button"
                className="scene-btn scene-btn-primary"
                onClick={handleConfirmSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar */}
      {snackbarMessage && (
        <div className="scene-snackbar" role="status" aria-live="polite">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="scene-snack-icon">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{snackbarMessage}</span>
          <button type="button" className="scene-snack-close" onClick={() => setSnackbarMessage(null)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};
