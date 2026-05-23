"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("General");
  const [chat, setChat] = useState<{role: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, topic }),
    });
    const data = await res.json();
    setChat((prev) => [...prev, { role: "ai", text: data.reply }]);
    setLoading(false);
  };

  const topics = ["General", "Python", "Web Development", "AI & ML", "Data Science", "JavaScript"];

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#667eea,#764ba2)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",fontFamily:"Segoe UI,sans-serif"}}>
      <div style={{width:"100%",maxWidth:"800px",background:"white",borderRadius:"24px",boxShadow:"0 25px 60px rgba(0,0,0,0.3)",overflow:"hidden"}}>
        
        {/* Header */}
        <div style={{background:"linear-gradient(135deg,#1a56db,#7c3aed)",padding:"30px",textAlign:"center"}}>
          <div style={{fontSize:"48px"}}>🎓</div>
          <h1 style={{color:"white",fontSize:"28px",fontWeight:"800",margin:"8px 0 4px"}}>AI Learning Tutor</h1>
          <p style={{color:"rgba(255,255,255,0.8)",margin:"0",fontSize:"14px"}}>Internee.pk — Your Personalized AI Assistant</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px",justifyContent:"center",marginTop:"20px"}}>
            {topics.map((t) => (
              <button key={t} onClick={() => setTopic(t)} style={{padding:"6px 16px",borderRadius:"20px",border:"2px solid rgba(255,255,255,0.5)",background:topic===t?"white":"transparent",color:topic===t?"#1a56db":"white",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div style={{height:"420px",overflowY:"auto",padding:"24px",background:"#f8fafc",display:"flex",flexDirection:"column",gap:"16px"}}>
          {chat.length === 0 && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#94a3b8"}}>
              <div style={{fontSize:"56px",marginBottom:"16px"}}>💬</div>
              <p style={{fontSize:"18px",fontWeight:"600",margin:"0"}}>Start Learning!</p>
              <p style={{fontSize:"14px",margin:"8px 0 0"}}>Select a topic and ask any question</p>
            </div>
          )}
          {chat.map((msg, i) => (
            <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",gap:"10px",alignItems:"flex-start"}}>
              {msg.role==="ai" && <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"linear-gradient(135deg,#1a56db,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>🤖</div>}
              <div style={{maxWidth:"70%",padding:"14px 18px",borderRadius:msg.role==="user"?"20px 20px 4px 20px":"20px 20px 20px 4px",background:msg.role==="user"?"linear-gradient(135deg,#1a56db,#7c3aed)":"white",color:msg.role==="user"?"white":"#1e293b",fontSize:"15px",lineHeight:"1.6",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
                {msg.text}
              </div>
              {msg.role==="user" && <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>🧑</div>}
            </div>
          ))}
          {loading && (
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"linear-gradient(135deg,#1a56db,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>🤖</div>
              <div style={{padding:"14px 18px",background:"white",borderRadius:"20px 20px 20px 4px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",color:"#64748b"}}>Thinking... ✨</div>
            </div>
          )}
          <div ref={chatEndRef}/>
        </div>

        {/* Input */}
        <div style={{padding:"20px 24px",background:"white",borderTop:"1px solid #e2e8f0",display:"flex",gap:"12px",alignItems:"center"}}>
          <input
            style={{flex:1,padding:"14px 20px",borderRadius:"50px",border:"2px solid #e2e8f0",fontSize:"15px",color:"#1e293b",outline:"none"}}
            placeholder={`Ask about ${topic}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key==="Enter" && sendMessage()}
          />
          <button onClick={sendMessage} disabled={loading} style={{background:"linear-gradient(135deg,#1a56db,#7c3aed)",color:"white",padding:"14px 28px",borderRadius:"50px",border:"none",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}>
            {loading ? "..." : "Send →"}
          </button>
        </div>

        {/* Footer */}
        <div style={{textAlign:"center",padding:"12px",background:"#f8fafc",borderTop:"1px solid #e2e8f0",color:"#94a3b8",fontSize:"12px"}}>
          Powered by Google Gemini AI • Internee.pk Learning Platform
        </div>
      </div>
    </div>
  );
}