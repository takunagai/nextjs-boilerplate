"use client";

import type React from "react";
import { useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "./gallery";

export interface GalleryLightboxProps {
  isOpen: boolean;
  currentImage: GalleryItem | null;
  images: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDialogElement> | KeyboardEvent) => void;
}

const modalStyles = ({ open }: { open: boolean }) => {
  return cn(
    "fixed inset-0 bg-black/80 z-50 transition-all duration-200 ease-in-out",
    open ? "opacity-100" : "opacity-0 pointer-events-none"
  );
};

export function GalleryLightbox({
  isOpen,
  currentImage,
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  onKeyDown
}: GalleryLightboxProps) {
  // キーボードナビゲーションを処理するハンドラー
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDialogElement> | KeyboardEvent) => {
      if (onKeyDown) {
        onKeyDown(e);
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    },
    [onClose, onPrevious, onNext, onKeyDown]
  );

  // グローバルキーイベントリスナーを追加・削除
  useEffect(() => {
    if (isOpen) {
      const handleKeyDownGlobal = (e: KeyboardEvent) => handleKeyDown(e);
      window.addEventListener("keydown", handleKeyDownGlobal);
      return () => {
        window.removeEventListener("keydown", handleKeyDownGlobal);
      };
    }
    return undefined;
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  return (
    <dialog
      className={cn(
        modalStyles({ open: isOpen }),
        "w-full h-full max-w-full max-h-full m-0 p-4 md:p-6 flex items-center justify-center overflow-hidden bg-black/80"
      )}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      aria-modal="true"
      aria-label="画像ライトボックス"
      tabIndex={isOpen ? 0 : -1}
      open={isOpen}
    >
      {currentImage && (
        <div 
          className="relative max-w-5xl w-full mx-auto flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          aria-label="画像詳細"
        >
          {/* 閉じるボタン */}
          <button
            className="absolute top-2 right-2 z-[100] p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }
            }}
            type="button"
            aria-label="ライトボックスを閉じる"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* 左ナビゲーションボタン */}
          {images.length > 1 && (
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-[100] p-3 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPrevious();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onPrevious();
                }
              }}
              type="button"
              aria-label="前の画像"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* 右ナビゲーションボタン */}
          {images.length > 1 && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-[100] p-3 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNext();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onNext();
                }
              }}
              type="button"
              aria-label="次の画像"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          <div className="bg-black p-2 rounded-lg shadow-2xl max-h-[90vh] overflow-auto w-full relative pointer-events-auto">
            {currentImage.width && currentImage.height ? (
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={currentImage.width || 1200}
                height={currentImage.height || 800}
                className="max-h-[70vh] object-contain mx-auto"
              />
            ) : (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-h-[70vh] object-contain mx-auto"
              />
            )}
            {(currentImage.title || currentImage.description) && (
              <div className="p-4 text-white">
                {currentImage.title && (
                  <h3 className="text-lg font-semibold mb-1">{currentImage.title}</h3>
                )}
                {currentImage.description && (
                  <p className="text-sm opacity-90">{currentImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
