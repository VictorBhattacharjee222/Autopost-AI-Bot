import React, { useState } from 'react';
import { askQuestion } from './api';

const AskForm = () => {
  const [username, setUsername] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const answer = await askQuestion(username, question);
      setResponse(answer);
    } catch (error) {
      setResponse('❌ Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      fontFamily: 'Inter, sans-serif',
      background: 'radial-gradient(circle at top center, #1c1c1c 0%, #000000 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '2rem',
      animation: 'fadeSlideIn 1s ease'
    }}>
      {/* Navbar */}
      <header style={{
        width: '100%',
        maxWidth: '1280px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        padding: '1rem 0',
        animation: 'fadeIn 1.5s ease'
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>drop.io</h2>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '1rem', fontWeight: 500 }}>
          {['Community', 'Enterprise', 'Resources', 'Pricing'].map(item => (
            <a key={item} href="#" style={{ color: '#ccc', textDecoration: 'none', transition: '0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Title + Subtitle */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        animation: 'fadeInUp 1.2s ease'
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 600 }}>
          drop.io is <em style={{ fontStyle: 'italic', fontWeight: 300 }}>free</em> all weekend
        </h1>
        <p style={{ color: '#aaa', marginTop: '0.75rem' }}>
          Ask questions & post AI-generated answers on social platforms. Try it now.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '640px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        borderRadius: '18px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        animation: 'scaleIn 0.9s ease'
      }}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{
            padding: '0.85rem',
            borderRadius: '10px',
            background: '#111',
            border: '1px solid #333',
            color: 'white',
            fontSize: '1rem',
            transition: '0.3s',
            outline: 'none',
          }}
        />
        <textarea
          placeholder="Ask a question..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required
          style={{
            padding: '0.85rem',
            borderRadius: '10px',
            background: '#111',
            border: '1px solid #333',
            color: 'white',
            fontSize: '1rem',
            minHeight: '120px',
            resize: 'vertical',
            transition: '0.3s',
            outline: 'none',
          }}
        />
        <button type="submit" disabled={loading} style={{
          padding: '0.9rem',
          borderRadius: '10px',
          border: 'none',
          background: loading ? 'gray' : 'linear-gradient(to right, #00c6ff, #0072ff)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease-in-out',
          transform: loading ? 'scale(0.98)' : 'scale(1)',
        }}>
          {loading ? 'Generating...' : 'Ask & Tweet'}
        </button>
      </form>

      {/* AI Response */}
      {response && (
        <div style={{
          marginTop: '3rem',
          maxWidth: '720px',
          backgroundColor: '#111',
          padding: '2rem',
          borderRadius: '18px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          animation: 'fadeInUp 1s ease',
        }}>
          <strong style={{ fontSize: '1.2rem', color: 'white' }}>AI Response:</strong>
          <p style={{ marginTop: '1rem', color: '#ccc', lineHeight: '1.6' }}>{response}</p>
        </div>
      )}

      {/* Keyframe Animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AskForm;
