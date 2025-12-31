import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ArrowRight, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function ChatMessage({ role, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`flex w-full mb-6 ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[80%] md:max-w-[70%] ${role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          role === 'user' ? 'bg-slate-900 text-white' : 'bg-blue-100 text-blue-700'
        }`}>
          {role === 'user' ? <User size={16} /> : <Bot size={16} />}
        </div>
        <div className={`p-4 rounded-2xl shadow-sm ${
          role === 'user' 
            ? 'bg-slate-900 text-white rounded-br-none' 
            : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
        }`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function OptionButton({ onClick, children, selected }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${
        selected 
          ? 'bg-slate-900 text-white border-slate-900' 
          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-500 hover:text-blue-600'
      }`}
    >
      {children}
    </motion.button>
  );
}

export function ChatInput({ onSend, placeholder = "Type your answer...", type = "text" }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <Input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pr-12 h-14 text-lg rounded-full border-slate-200 focus-visible:ring-blue-500"
        autoFocus
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={!value.trim()}
        className="absolute right-2 w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800"
      >
        <ArrowRight size={18} />
      </Button>
    </form>
  );
}