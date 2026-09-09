import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Check, X, RotateCcw, Move, User } from 'lucide-react';
import { Language } from '../types';

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
  lang: Language;
  memberName?: string;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  lang,
  memberName,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const offsetStartRef = useRef({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const CROP_BOX_SIZE = 300; // Visual viewport size in px

  // Reset transformation when a new image is loaded
  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageRef.current = img;
        setZoom(1);
        setRotation(0);
        setOffset({ x: 0, y: 0 });
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  // Update canvas preview
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = CROP_BOX_SIZE;
    canvas.height = CROP_BOX_SIZE;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Center canvas coordinate system
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply User transformations
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    // Calculate image base scale to cover the crop box
    const imgAspect = img.width / img.height;
    let drawW: number;
    let drawH: number;

    if (imgAspect > 1) {
      drawH = CROP_BOX_SIZE;
      drawW = CROP_BOX_SIZE * imgAspect;
    } else {
      drawW = CROP_BOX_SIZE;
      drawH = CROP_BOX_SIZE / imgAspect;
    }

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Also draw mini preview
    const miniCanvas = previewCanvasRef.current;
    if (miniCanvas) {
      const miniCtx = miniCanvas.getContext('2d');
      if (miniCtx) {
        miniCanvas.width = 80;
        miniCanvas.height = 80;
        miniCtx.clearRect(0, 0, 80, 80);
        miniCtx.drawImage(canvas, 0, 0, 80, 80);
      }
    }
  }, [zoom, rotation, offset, CROP_BOX_SIZE]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Mouse & Touch Dragging Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    offsetStartRef.current = { ...offset };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    // Adjust delta based on current rotation
    const rad = (-rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const adjDx = (dx * cos - dy * sin) / zoom;
    const adjDy = (dx * sin + dy * cos) / zoom;

    setOffset({
      x: offsetStartRef.current.x + adjDx,
      y: offsetStartRef.current.y + adjDy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers for mobile phones / tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      offsetStartRef.current = { ...offset };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;

    const rad = (-rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const adjDx = (dx * cos - dy * sin) / zoom;
    const adjDy = (dx * sin + dy * cos) / zoom;

    setOffset({
      x: offsetStartRef.current.x + adjDx,
      y: offsetStartRef.current.y + adjDy,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Reset transformations
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  // Rotate 90 deg clockwise
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Final export of high-resolution square cropped image (600x600 px)
  const handleConfirmCrop = () => {
    const img = imageRef.current;
    if (!img) return;

    const exportCanvas = document.createElement('canvas');
    const EXPORT_SIZE = 600;
    exportCanvas.width = EXPORT_SIZE;
    exportCanvas.height = EXPORT_SIZE;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.translate(EXPORT_SIZE / 2, EXPORT_SIZE / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    // Scale offset up from visual preview (300px) to export (600px)
    const scaleFactor = EXPORT_SIZE / CROP_BOX_SIZE;
    ctx.translate(offset.x * scaleFactor, offset.y * scaleFactor);
    ctx.scale(zoom * scaleFactor, zoom * scaleFactor);

    const imgAspect = img.width / img.height;
    let drawW: number;
    let drawH: number;

    if (imgAspect > 1) {
      drawH = CROP_BOX_SIZE;
      drawW = CROP_BOX_SIZE * imgAspect;
    } else {
      drawW = CROP_BOX_SIZE;
      drawH = CROP_BOX_SIZE / imgAspect;
    }

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Export as high quality JPEG
    const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.92);
    onCropComplete(dataUrl);
    onClose();
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1b365d] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={18} className="text-amber-300" />
            <span className="font-bold text-sm tracking-wide">
              {lang === 'en' ? 'Crop & Center Member Photo' : '调整与框选团队成员照片'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {memberName && (
            <div className="text-xs text-gray-500 font-medium text-center">
              {lang === 'en' ? 'Target Member:' : '正在编辑成员：'}{' '}
              <span className="text-[#1b365d] font-bold">{memberName}</span>
            </div>
          )}

          {/* Interactive Crop Viewport */}
          <div className="flex flex-col items-center">
            <div
              style={{ width: `${CROP_BOX_SIZE}px`, height: `${CROP_BOX_SIZE}px` }}
              className="relative rounded-2xl overflow-hidden shadow-inner border-2 border-[#1b365d] bg-slate-900 cursor-move select-none touch-none group"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Actual Rendering Canvas */}
              <canvas
                ref={canvasRef}
                style={{ width: `${CROP_BOX_SIZE}px`, height: `${CROP_BOX_SIZE}px` }}
                className="w-full h-full block"
              />

              {/* Composition Guidelines Grid (Rule of Thirds) */}
              <div className="absolute inset-0 pointer-events-none border border-white/20">
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white/25 border-dashed" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white/25 border-dashed" />
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/25 border-dashed" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/25 border-dashed" />
                
                {/* Circular face target guide */}
                <div className="absolute inset-3 rounded-full border border-amber-300/40 pointer-events-none" />
              </div>

              {/* Move Indicator Badge */}
              <div className="absolute top-2.5 left-2.5 px-2 py-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold rounded-md flex items-center gap-1 pointer-events-none">
                <Move size={10} />
                <span>{lang === 'en' ? 'Drag to position face' : '按住拖动调整居中'}</span>
              </div>
            </div>
          </div>

          {/* Control Tools: Zoom & Rotate & Live Previews */}
          <div className="space-y-3 bg-[#f8fafd] p-3.5 rounded-xl border border-[#e2e8f3]">
            
            {/* Zoom Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-700 font-semibold">
                <span className="flex items-center gap-1">
                  <ZoomIn size={14} className="text-[#236869]" />
                  {lang === 'en' ? 'Zoom Scale' : '缩放大小'}
                </span>
                <span className="font-mono text-[11px] text-gray-500">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.5, Number((z - 0.1).toFixed(2))))}
                  className="p-1 rounded bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer shadow-2xs"
                  title={lang === 'en' ? 'Zoom Out' : '缩小'}
                >
                  <ZoomOut size={14} />
                </button>

                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-[#236869] cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(3.0, Number((z + 0.1).toFixed(2))))}
                  className="p-1 rounded bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer shadow-2xs"
                  title={lang === 'en' ? 'Zoom In' : '放大'}
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            {/* Rotation & Reset Row with Mini Previews */}
            <div className="flex items-center justify-between pt-1 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRotate}
                  className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 cursor-pointer transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <RotateCw size={13} className="text-[#1b365d]" />
                  <span>{lang === 'en' ? 'Rotate 90°' : '旋转 90°'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2 py-1 bg-white hover:bg-gray-100 text-gray-500 text-xs font-medium rounded-lg border border-gray-200 cursor-pointer transition-colors flex items-center gap-1"
                >
                  <RotateCcw size={12} />
                  <span>{lang === 'en' ? 'Reset' : '重置'}</span>
                </button>
              </div>

              {/* Live Preview Circles */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
                  {lang === 'en' ? 'Preview:' : '预览:'}
                </span>
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-300 shadow-xs bg-slate-100">
                  <canvas ref={previewCanvasRef} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-200/60 rounded-lg transition-colors cursor-pointer"
          >
            {lang === 'en' ? 'Cancel' : '取消'}
          </button>

          <button
            type="button"
            onClick={handleConfirmCrop}
            className="px-5 py-2 bg-[#1b365d] hover:bg-[#2e476f] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Check size={15} />
            <span>{lang === 'en' ? 'Crop & Apply' : '确认裁剪并应用'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
