import React, { useState, useEffect, useRef } from 'react';
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Bot, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// Simple Message Bubble Component
const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';
    return (
        <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            {!isUser && (
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-blue-600" />
                </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                isUser ? "bg-slate-900 text-white" : "bg-white border border-slate-200"
            }`}>
                <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
                    {message.content}
                </ReactMarkdown>
                {/* Simplified tool call display */}
                {message.tool_calls?.map((tool, idx) => (
                    <div key={idx} className="mt-2 text-xs bg-black/5 p-2 rounded">
                        Using tool: <span className="font-mono">{tool.name}</span>
                        {tool.status === 'success' && <span className="text-green-600 ml-2">✓ Done</span>}
                    </div>
                ))}
            </div>
            {isUser && (
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-slate-600" />
                </div>
            )}
        </div>
    );
};

export default function SocialAgent() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState("SocialPublisher"); // SocialPublisher | SocialEngager
    const scrollRef = useRef(null);

    // Initialize or load conversation
    useEffect(() => {
        const initChat = async () => {
            setMessages([]);
            setConversationId(null);
            
            try {
                // List existing conversations for this agent
                const convs = await base44.agents.listConversations({ agent_name: selectedAgent });
                
                let conv;
                if (convs.length > 0) {
                    conv = convs[0];
                } else {
                    conv = await base44.agents.createConversation({
                        agent_name: selectedAgent,
                        metadata: { name: selectedAgent === "SocialPublisher" ? "Social Media Drafts" : "Engagement Strategy" }
                    });
                }
                
                setConversationId(conv.id);
                setMessages(conv.messages || []);
            } catch (error) {
                console.error("Failed to init chat:", error);
            }
        };
        initChat();
    }, [selectedAgent]);

    // Subscribe to updates
    useEffect(() => {
        if (!conversationId) return;

        const unsubscribe = base44.agents.subscribeToConversation(conversationId, (data) => {
            setMessages(data.messages);
            setIsLoading(data.status === 'running');
        });

        return () => unsubscribe();
    }, [conversationId]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || !conversationId) return;

        const content = inputValue;
        setInputValue("");
        setIsLoading(true);

        try {
            await base44.agents.addMessage(
                { id: conversationId }, // Pass conversation object/id
                { role: "user", content }
            );
        } catch (error) {
            console.error("Failed to send message:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl p-4 h-[calc(100vh-80px)] flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">AI Social Agents</h1>
                    <p className="text-slate-500">Select an agent to assist with your social strategy</p>
                </div>
                
                <div className="flex gap-2">
                    <Button 
                        variant={selectedAgent === "SocialPublisher" ? "default" : "outline"}
                        onClick={() => setSelectedAgent("SocialPublisher")}
                        className={selectedAgent === "SocialPublisher" ? "bg-slate-900" : ""}
                    >
                        Publisher
                    </Button>
                    <Button 
                        variant={selectedAgent === "SocialEngager" ? "default" : "outline"}
                        onClick={() => setSelectedAgent("SocialEngager")}
                        className={selectedAgent === "SocialEngager" ? "bg-slate-900" : ""}
                    >
                        Engager
                    </Button>
                </div>

                {/* WhatsApp Link */}
                <a 
                    href={base44.agents.getWhatsAppConnectURL(selectedAgent)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200"
                >
                    Chat on WhatsApp
                </a>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden bg-slate-50 border-slate-200 shadow-sm">
                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                    {messages.length === 0 && (
                        <div className="text-center text-slate-400 mt-20">
                            <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            {selectedAgent === "SocialPublisher" ? (
                                <>
                                    <p>Hello! I can help you draft and publish posts.</p>
                                    <p className="text-sm">Try saying: "Draft a post about our new coffee cups"</p>
                                </>
                            ) : (
                                <>
                                    <p>Hello! I'm your Growth Strategist.</p>
                                    <p className="text-sm">Try saying: "How do I respond to a trending sustainability post?"</p>
                                </>
                            )}
                        </div>
                    )}
                    {messages.map((msg, i) => (
                        <MessageBubble key={i} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mb-4">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mr-3">
                                <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                            </div>
                            <span className="text-sm text-slate-500 self-center">Thinking...</span>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                            disabled={isLoading}
                            autoFocus
                        />
                        <Button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}