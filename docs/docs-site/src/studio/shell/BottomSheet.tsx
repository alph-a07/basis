import React from 'react';

export type SnapPoint = 'peek' | 'half' | 'full';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  snapPoint: SnapPoint;
  onSnapChange: (snap: SnapPoint) => void;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  snapPoint,
  onSnapChange,
  children,
}) => {
  if (!isOpen) return null;

  const cycleSnap = () => {
    if (snapPoint === 'peek') onSnapChange('half');
    else if (snapPoint === 'half') onSnapChange('full');
    else onSnapChange('peek');
  };

  return (
    <>
      <div className="sheet-backdrop is-active" onClick={onClose} aria-hidden="true" />
      <aside
        id="studio-controls-sheet"
        className={`studio-controls-sheet snap-${snapPoint}`}
        role="dialog"
        aria-label="Theme Intent Controls"
      >
        <div className="sheet-header" onClick={cycleSnap} role="button" tabIndex={0} aria-label="Cycle sheet snap size">
          <div className="sheet-drag-handle" aria-hidden="true">
            <div className="drag-bar" />
          </div>
          <div className="sheet-title-bar">
            <h2 className="sheet-title">Theme Controls</h2>
            <div className="sheet-snap-indicator">
              <span className="snap-tag">{snapPoint}</span>
              <button
                type="button"
                className="sheet-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close controls sheet"
              >
                &times;
              </button>
            </div>
          </div>
        </div>

        <div className="sheet-content-scrollable">
          {children}
        </div>
      </aside>
    </>
  );
};
