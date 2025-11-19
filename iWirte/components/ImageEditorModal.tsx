'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageEditorModal.module.css';

interface ImageEditorModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageElement: HTMLImageElement | null;
  onClose: () => void;
  onApply: (mode: 'size' | 'crop', params: any) => void;
}

export default function ImageEditorModal({
  isOpen,
  imageSrc,
  imageElement,
  onClose,
  onApply,
}: ImageEditorModalProps) {
  const [mode, setMode] = useState<'size' | 'crop'>('size');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [topCrop, setTopCrop] = useState('');
  const [rightCrop, setRightCrop] = useState('');
  const [bottomCrop, setBottomCrop] = useState('');
  const [leftCrop, setLeftCrop] = useState('');
  const [preview, setPreview] = useState<string>(imageSrc);

  const handleSizeChange = () => {
    if (width || height) {
      onApply('size', { width: width ? parseInt(width) : null, height: height ? parseInt(height) : null });
    }
  };

  const handleCropChange = () => {
    const hasValidCrop = topCrop || rightCrop || bottomCrop || leftCrop;
    if (hasValidCrop) {
      onApply('crop', {
        top: topCrop ? parseInt(topCrop) : 0,
        right: rightCrop ? parseInt(rightCrop) : 0,
        bottom: bottomCrop ? parseInt(bottomCrop) : 0,
        left: leftCrop ? parseInt(leftCrop) : 0,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Edit Image</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.content}>
          <div className={styles.preview}>
            <Image
              src={imageSrc}
              alt="Preview"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${mode === 'size' ? styles.active : ''}`}
              onClick={() => setMode('size')}
            >
              Size
            </button>
            <button
              className={`${styles.tab} ${mode === 'crop' ? styles.active : ''}`}
              onClick={() => setMode('crop')}
            >
              Crop
            </button>
          </div>

          {mode === 'size' && (
            <div className={styles.section}>
              <h3>Resize Image</h3>
              <div className={styles.formGroup}>
                <label>Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Leave empty to keep current"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Leave empty to keep current"
                />
              </div>
              <p className={styles.hint}>Leave one or both empty to auto-calculate based on aspect ratio</p>
            </div>
          )}

          {mode === 'crop' && (
            <div className={styles.section}>
              <h3>Crop Edges (% from each side)</h3>
              <div className={styles.cropGrid}>
                <div className={styles.formGroup}>
                  <label>Top (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={topCrop}
                    onChange={(e) => setTopCrop(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className={styles.cropRow}>
                <div className={styles.formGroup}>
                  <label>Left (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={leftCrop}
                    onChange={(e) => setLeftCrop(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Right (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={rightCrop}
                    onChange={(e) => setRightCrop(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className={styles.cropGrid}>
                <div className={styles.formGroup}>
                  <label>Bottom (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={bottomCrop}
                    onChange={(e) => setBottomCrop(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <p className={styles.hint}>Enter percentage values to crop from each edge. Leave empty to not crop that edge.</p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button
            className={styles.applyBtn}
            onClick={mode === 'size' ? handleSizeChange : handleCropChange}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
