import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Building, Code, Target, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIInterviewPrepProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIInterviewPrep: React.FC<AIInterviewPrepProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi! I'm your AI Interview Preparation Assistant. 🤖

I can help you prepare for interviews at specific companies by providing:
• Company-specific interview insights
• Top coding questions asked
• Interview tips and strategies
• Technical preparation guidance

Just tell me which company you're preparing for, and I'll provide tailored advice!

Example: "Help me prepare for Google software engineer interview"`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response - In production, this would call Gemini API
    const lowerMessage = userMessage.toLowerCase();
    
    // Company-specific responses
    if (lowerMessage.includes('google')) {
      return `🔍 **Google Interview Preparation**

**Interview Process:**
• Phone/Video screening (45 min)
• 4-5 onsite rounds (technical + behavioral)
• Focus on algorithms, system design, and Googleyness

**Top 3 Coding Questions:**
1. **Two Sum** (Easy) - Array manipulation and hash maps
2. **Longest Substring Without Repeating Characters** (Medium) - Sliding window technique
3. **Merge k Sorted Lists** (Hard) - Divide and conquer, heap operations

**Key Tips:**
• Practice on LeetCode (focus on medium/hard problems)
• Study system design fundamentals
• Prepare STAR format behavioral stories
• Know Google's products and culture

**Technical Focus Areas:**
• Data structures (arrays, trees, graphs)
• Algorithms (sorting, searching, dynamic programming)
• System design (for senior roles)
• Code optimization and complexity analysis`;
    }
    
    if (lowerMessage.includes('microsoft')) {
      return `💻 **Microsoft Interview Preparation**

**Interview Process:**
• Initial screening call
• 4-5 technical rounds
• Focus on problem-solving and collaboration

**Top 3 Coding Questions:**
1. **Reverse Linked List** (Easy) - Pointer manipulation
2. **Binary Tree Level Order Traversal** (Medium) - BFS/Queue usage
3. **Design LRU Cache** (Medium) - Hash map + doubly linked list

**Key Tips:**
• Emphasize teamwork and growth mindset
• Practice system design scenarios
• Know Microsoft's cloud services (Azure)
• Prepare for behavioral questions about leadership

**Technical Focus Areas:**
• Object-oriented programming
• Database design and SQL
• Cloud computing concepts
• Software engineering best practices`;
    }
    
    if (lowerMessage.includes('amazon')) {
      return `📦 **Amazon Interview Preparation**

**Interview Process:**
• Online assessment (OA)
• 4-5 rounds including bar raiser
• Heavy focus on leadership principles

**Top 3 Coding Questions:**
1. **Two Sum** (Easy) - Hash table fundamentals
2. **Number of Islands** (Medium) - DFS/BFS graph traversal
3. **Merge Intervals** (Medium) - Array sorting and merging

**Key Tips:**
• Master Amazon's 16 Leadership Principles
• Practice STAR method for behavioral questions
• Focus on scalability in technical solutions
• Prepare examples of customer obsession

**Technical Focus Areas:**
• Algorithms and data structures
• System design and scalability
• AWS services knowledge
• Operational excellence mindset`;
    }
    
    if (lowerMessage.includes('meta') || lowerMessage.includes('facebook')) {
      return `👥 **Meta Interview Preparation**

**Interview Process:**
• Recruiter call
• Technical phone screen
• 4-5 onsite rounds (coding + system design)

**Top 3 Coding Questions:**
1. **Valid Parentheses** (Easy) - Stack operations
2. **Add Binary** (Easy) - String manipulation
3. **Binary Tree Vertical Order Traversal** (Medium) - Tree traversal with coordinates

**Key Tips:**
• Focus on building connections and impact
• Practice system design for social platforms
• Understand Meta's mission and products
• Prepare for culture fit questions

**Technical Focus Areas:**
• Frontend and backend development
• Database optimization
• Distributed systems
• Mobile development (React Native)`;
    }
    
    // General coding questions
    if (lowerMessage.includes('coding questions') || lowerMessage.includes('leetcode')) {
      return `💡 **Essential Coding Questions for Interviews**

**Easy Level (Master These First):**
• Two Sum
• Valid Parentheses
• Merge Two Sorted Lists
• Maximum Subarray
• Best Time to Buy and Sell Stock

**Medium Level (Core Interview Questions):**
• Longest Substring Without Repeating Characters
• 3Sum
• Container With Most Water
• Rotate Image
• Group Anagrams

**Hard Level (For Senior Positions):**
• Merge k Sorted Lists
• Trapping Rain Water
• Median of Two Sorted Arrays
• Word Ladder
• Serialize and Deserialize Binary Tree

**Practice Strategy:**
1. Start with easy problems to build confidence
2. Focus on understanding patterns, not memorizing
3. Practice explaining your approach out loud
4. Time yourself (aim for 20-30 minutes per problem)
5. Review multiple solutions for each problem`;
    }
    
    // General interview tips
    if (lowerMessage.includes('tips') || lowerMessage.includes('advice')) {
      return `🎯 **General Interview Preparation Tips**

**Before the Interview:**
• Research the company thoroughly
• Practice coding on a whiteboard/paper
• Prepare 3-5 behavioral stories using STAR method
• Review your resume and be ready to discuss projects

**During Technical Rounds:**
• Think out loud - explain your approach
• Ask clarifying questions
• Start with a brute force solution, then optimize
• Test your code with examples
• Discuss time/space complexity

**During Behavioral Rounds:**
• Use specific examples with measurable impact
• Show growth mindset and learning from failures
• Demonstrate leadership and collaboration
• Ask thoughtful questions about the role/team

**Common Mistakes to Avoid:**
• Jumping into coding without understanding the problem
• Not testing your solution
• Giving up too quickly on difficult problems
• Not asking questions about the company/role`;
    }
    
    // Default response
    return `I'd be happy to help you prepare for your interview! 

I can provide specific guidance for companies like:
• **Google** - Algorithm-heavy interviews
• **Microsoft** - Collaboration-focused rounds  
• **Amazon** - Leadership principles emphasis
• **Meta** - System design and social impact
• **Apple** - Product-focused technical discussions

Or I can help with:
• **Coding Questions** - Top problems by difficulty
• **Interview Tips** - Best practices and strategies
• **System Design** - Architecture and scalability
• **Behavioral Prep** - STAR method and stories

What specific area would you like to focus on?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again!',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/•/g, '•')
      .split('\n')
      .map((line, index) => (
        <div key={index} className={line.trim() === '' ? 'h-2' : ''}>
          <span dangerouslySetInnerHTML={{ __html: line }} />
        </div>
      ));
  };

  const quickPrompts = [
    "Help me prepare for Google interview",
    "Top coding questions for FAANG",
    "System design interview tips",
    "Behavioral interview preparation"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Interview Preparation</h2>
              <p className="text-purple-100 text-sm">Get personalized interview guidance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-purple-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-blue-500' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-900'}`}>
                      {message.type === 'user' ? (
                        message.content
                      ) : (
                        <div className="space-y-1">
                          {formatMessage(message.content)}
                        </div>
                      )}
                    </div>
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 max-w-[80%]">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-6 py-3 border-t border-gray-200 bg-white">
            <p className="text-sm text-gray-600 mb-3">Quick start prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(prompt)}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex space-x-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about interview preparation for any company..."
              rows={2}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewPrep;