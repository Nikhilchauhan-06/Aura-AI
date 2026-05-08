import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { analyzeBusinessData } from '../../lib/DataEngine';
import { DashboardState } from '../../types/dashboard';

interface FileUploadProps {
  onDataAnalyzed: (data: DashboardState) => void;
}

export function FileUpload({ onDataAnalyzed }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    setSuccess(false);
    setError(null);

    const file = acceptedFiles[0];
    
    try {
      let csvContent = "";

      if (file.type === 'text/csv') {
        const text = await file.text();
        csvContent = text;
      } else {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        csvContent = XLSX.utils.sheet_to_csv(worksheet);
      }

      // Analyze with Gemini
      const analyzedData = await analyzeBusinessData(csvContent);
      onDataAnalyzed(analyzedData);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Aura failed to interpret your data. Please ensure the file contains clear business headers.");
    } finally {
      setIsUploading(false);
    }
  }, [onDataAnalyzed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false
  } as any);

  return (
    <div className="glass p-8 rounded-[32px] border-dashed border-white/20 hover:border-blue-500/50 transition-all group">
      <div {...getRootProps()} className="flex flex-col items-center justify-center cursor-pointer min-h-[200px]">
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div 
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-zinc-200 font-bold">Aura is analyzing executive data...</p>
              <p className="text-xs text-zinc-500 mt-2">Correlating trends and identifying anomalies</p>
            </motion.div>
          ) : success ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
              <p className="text-zinc-200 font-bold">Analysis Complete</p>
              <p className="text-xs text-zinc-500 mt-2">Executive dashboard has been updated.</p>
              <button 
                onClick={(e) => { e.stopPropagation(); setSuccess(false); }}
                className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all"
              >
                Upload Another
              </button>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center"
            >
              <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
              <p className="text-zinc-200 font-bold">Analysis Failed</p>
              <p className="text-xs text-zinc-500 mt-2">{error}</p>
              <button 
                onClick={(e) => { e.stopPropagation(); setError(null); }}
                className="mt-6 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold transition-all"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-500">
                <Upload className="w-8 h-8 text-zinc-400 group-hover:text-blue-400" />
              </div>
              <p className="text-zinc-200 font-bold text-lg mb-1">
                {isDragActive ? "Drop the file here" : "Import Business Data"}
              </p>
              <p className="text-zinc-500 text-sm max-w-xs">
                Drag and drop your Excel or CSV files to instantly transform them into AI-powered insights.
              </p>
              <div className="mt-8 flex gap-4">
                 <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full text-[10px] font-bold text-zinc-400">
                   <FileText className="w-3 h-3" /> EXCEL
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full text-[10px] font-bold text-zinc-400">
                   <FileText className="w-3 h-3" /> CSV
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
