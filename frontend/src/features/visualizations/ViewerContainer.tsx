import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Info,
  Sliders,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { VisualizationSpec, InteractiveElement } from '../../types';
import { getVisualizationEntry } from '../../visualization-registry/registry';

interface Props {
  visualization: VisualizationSpec;
  activeStepIndex: number;
  onStepChange: (index: number) => void;
  selectedComponentId?: string;
  onSelectComponent: (id: string) => void;
  isSpeaking?: boolean;
  isThinking?: boolean;
  speechText?: string;
}

export const ViewerContainer: React.FC<Props> = ({
  visualization,
  activeStepIndex,
  onStepChange,
  selectedComponentId,
  onSelectComponent,
  isSpeaking = false,
  isThinking = false,
  speechText = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraKey, setCameraKey] = useState(0);
  const [showInspector, setShowInspector] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const entry = getVisualizationEntry(visualization.templateId);
  const currentStep = visualization.steps[activeStepIndex] || visualization.steps[0];
  const ActiveComponent = entry.component;

  // Selected element metadata
  const selectedElement = visualization.interactiveElements?.find(
    (el) => el.id === selectedComponentId
  );

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleResetCamera = () => {
    setCameraKey((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      onStepChange(activeStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (activeStepIndex < visualization.steps.length - 1) {
      onStepChange(activeStepIndex + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex flex-col bg-navy-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'min-h-[460px] md:min-h-[580px]'
      }`}
    >
      {/* Top Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Title & Badge */}
        <div className="pointer-events-auto flex items-center gap-3 bg-navy-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cyan"></span>
          </span>
          <span className="text-xs font-semibold text-white tracking-wide">
            {visualization.title}
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
            {entry.name}
          </span>
        </div>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={handleResetCamera}
            title="Reset Camera"
            className="p-2 bg-navy-900/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-white/10 backdrop-blur-md transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowInspector(!showInspector)}
            title="Toggle Component Inspector"
            className={`p-2 rounded-xl border backdrop-blur-md transition-all shadow-md ${
              showInspector
                ? 'bg-brand-cyan/20 border-brand-cyan/40 text-brand-cyan'
                : 'bg-navy-900/80 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            title="Fullscreen"
            className="p-2 bg-navy-900/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-white/10 backdrop-blur-md transition-all shadow-md"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Render Canvas or 2D Diagram */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        {entry.renderMode === '3d' ? (
          <Canvas
            key={cameraKey}
            camera={{ position: entry.cameraPosition, fov: 45 }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <ActiveComponent
                selectedComponentId={selectedComponentId}
                onSelectComponent={onSelectComponent}
                playbackSpeed={speed}
                isPlaying={isPlaying}
                isSpeaking={isSpeaking}
                isThinking={isThinking}
                speechText={speechText}
              />
            </Suspense>
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxDistance={25}
              minDistance={1.5}
            />
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <ActiveComponent
              title={visualization.title}
              elements={visualization.interactiveElements}
              selectedComponentId={selectedComponentId}
              onSelectComponent={onSelectComponent}
              activeStepIndex={activeStepIndex}
            />
          </div>
        )}

        {/* Selected Component Floating Inspector Card */}
        {showInspector && selectedElement && (
          <div className="absolute top-16 right-4 z-20 w-72 max-w-[calc(100vw-32px)] bg-navy-900/90 backdrop-blur-lg border border-brand-cyan/30 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedElement.color || '#38bdf8' }}
              />
              <span className="text-[10px] uppercase font-mono tracking-wider text-brand-cyan">
                Selected Component
              </span>
            </div>
            <h4 className="font-bold text-sm text-white">{selectedElement.label}</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {selectedElement.description}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Connected to Lesson</span>
              <button
                onClick={() => onSelectComponent('')}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Current Step Instruction Banner */}
        {currentStep && (
          <div className="absolute bottom-20 left-4 right-4 z-20 pointer-events-none">
            <div className="max-w-xl mx-auto pointer-events-auto bg-navy-900/85 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-bold">
                  Step {activeStepIndex + 1} of {visualization.steps.length}
                </span>
                <span className="text-xs font-semibold text-white">{currentStep.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{currentStep.explanation}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Timeline & Playback Control Bar */}
      <div className="relative z-20 bg-navy-900/95 backdrop-blur-lg border-t border-slate-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Playback & Speed Controls */}
        <div className="flex items-center gap-3">
          {entry.renderMode === '3d' && (
            <>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
                title={isPlaying ? 'Pause Animation' : 'Play Animation'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <div className="flex items-center gap-1 bg-slate-800/70 p-1 rounded-xl">
                {[0.5, 1.0, 2.0].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-1 text-[11px] font-mono rounded-lg transition-all ${
                      speed === s
                        ? 'bg-brand-cyan text-navy-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Component Selection Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 border-l border-slate-800 pl-3">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Interactive Model</span>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevStep}
            disabled={activeStepIndex === 0}
            className={`p-2 rounded-xl flex items-center gap-1 text-xs font-medium border transition-all ${
              activeStepIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev Step</span>
          </button>

          {/* Step Dots */}
          <div className="flex items-center gap-1.5 px-2">
            {visualization.steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onStepChange(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeStepIndex === idx
                    ? 'bg-brand-cyan w-6'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Step ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextStep}
            disabled={activeStepIndex === visualization.steps.length - 1}
            className={`p-2 rounded-xl flex items-center gap-1 text-xs font-medium border transition-all ${
              activeStepIndex === visualization.steps.length - 1
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-500'
                : 'bg-brand-cyan hover:bg-cyan-400 border-transparent text-navy-950 font-bold'
            }`}
          >
            <span className="hidden sm:inline">Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
